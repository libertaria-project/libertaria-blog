---
title: "Warum OTel nicht in unsere Welt passt — und was wir stattdessen bauen"
pubDate: 2026-02-22
author: "Markus Maiwald"
description: "OpenTelemetry wurde für die Cloud-Native-Überwachung entwickelt. Libertaria braucht etwas grundlegend anderes: ein aktives Immunsystem, kein Überwachungsarchitektur."
tags: ["telemetry", "sovereignty", "opentelemetry", "membrane-agent", "architecture", "lTP"]
---

# Warum OTel nicht in unsere Welt passt — und was wir stattdessen bauen

*Ein Blick darauf, warum wir kein OTel-Rival bauen, sondern etwas, das OTel niemals sein kann.*

---

## Die philosophische Spaltung

OpenTelemetry wurde für eine Welt entwickelt, in der man *alles beobachtet, alles speichert, alles visualisiert, und hofft, dass jemand die Anomalie bemerkt.* Es ist eine **Überwachungsarchitektur** für die eigene Infrastruktur. Passiv. Umfassend. Teuer.

Was ihr beschreibt, ist das Gegenteil: **ein Immunsystem.** Aktiv. Selektiv. Autonom. Das Membrane Agent wartet nicht darauf, dass ein Mensch um 3 Uhr nachts auf ein Grafana-Panel starrt; es *erkennt den Erreger und reagiert.* Logs existieren für die forensische Autopsie, nicht für die Live-Show.

> OTel fragt: "Was ist überall passiert, die ganze Zeit?"
> LTP sollte fragen: "Was ist schiefgelaufen, warum, und was haben wir dagegen getan?"

Dies sind grundlegend verschiedene Protokolle, weil sie grundlegend verschiedenen Epistemologien dienen.

---

## 1. Was LTP fehlt (Gap-Analyse)

Ehrlich sein über das, was OTel bietet, was wir aktuell nicht haben:

**Distributed Tracing.** Das ist das einzige OTel-Feature mit echtem Engineering-Wert. Eine Anfrage fließt durch Node A → Relay B → Agent C; man muss die kausale Kette rekonstruieren. OTel verwendet trace_id (16 Bytes) + span_id (8 Bytes) + parent_span_id (8 Bytes), propagiert via W3C TraceContext-Headers.

*Wir haben die Primitiven bereits.* Der LWF-Header trägt `session_id` (16 Bytes) und `sequence` (4 Bytes). Die ns-msg-Hülle trägt `lamport_clock` (8 Bytes) und `publisher_did`. Was fehlt, ist ein *expliziter Trace-Kontext*, der kausal zusammenhängende Messages über DID-Grenzen hinweg verknüpft. Aber das sind ~32 Bytes Metadaten in der ns-msg-Hülle; kein neues Protokoll.

**Structured Metrics Aggregation.** LTP veröffentlicht rohe Sensorwerte: `f64 watts`. OTel bietet Counter (monotone Summe), Gauges (Punkt-in-der-Zeit), Histogramme (Verteilung), und Delta vs. kumulative Temporalität.

*Wir brauchen das, aber nicht auf der Transport-Schicht.* Es gehört in die Janus-Runtime als `metrics`-Modul, das aggregierte Daten auf ns-msg-Topics veröffentlicht. Das Wire-Format bleibt gleich; die Aggregationslogik ist Anwendungsebene.

**Semantic Conventions.** OTel's `http.request.method`, `db.system`, `k8s.pod.name` standardisierte Benennung ist genuin nützlich für systemübergreifende Korrelation. Unsere `$LTP/ocean/{region}/{site}/solar/power`-Hierarchie ist *dieselbe Idee*, aber aktuell ad-hoc. *Das ist Dokumentationsarbeit, keine Protokollarbeit.* Definiere `$LTP/semconv/` mit Standard-Attributnamen.

**OTLP Export Bridge.** Die gesamte Grafana/Prometheus/Datadog-Ökosystem spricht OTLP. Wenn LTP nicht in diese Backends exportieren kann, ist es eine Insel.

*Das ist eine Gateway-Komponente, kein Protokollwechsel.* Ein `janus-otlp-bridge`, der `$LTP/**`-Topics abonniert und zu OTLP/gRPC übersetzt. Läuft auf dem Chapter-Relay oder jedem Node mit genug Ressourcen. ~5KB Übersetzungslogik.

**Was wir NICHT von OTel brauchen:**

Die Collector-Pipeline (Receiver → Processor → Exporter) gibt zu, dass das Protokoll seine eigenen Daten nicht verarbeiten kann. Das Membrane Agent ist bereits *der Processor*; es braucht nur reichere Vokabulare für Muster.

Der Batch-Prozessor existiert, weil OTLP zu teuer pro Nachricht ist; unsere LCC-Keepalives sind 16 Bytes. Der Memory-Limiter existiert, weil der Collector ein Go-Binary mit GC-Pausen ist; Zig hat dieses Problem nicht.

---

## 2. Architektur: Nicht eine Schicht *über* LTP. Ein Profil *in* ihm.

Dieselbe Antwort wie bei Feed Social. Dieselbe Antwort wie beim ursprünglichen LTP-Design:

```
ns-msg = das universelle Messaging-Primitiv
LTP Telemetry Profile = ns-msg + $LTP/telemetry/*
LTP Sensor Profile = ns-msg + $LTP/ocean/* (was wir haben)
LTP Observability Profile = ns-msg + $LTP/obs/* (was wir hinzufügen)
Feed Social = ns-msg + Verschlüsselungs-Tiers + Social-Features
```

Das Observability Profile fügt drei Namespace-Familien hinzu:

```
$LTP/obs/{scope}/{service_did}/trace/{trace_id}/{span_id}
$LTP/obs/{scope}/{service_did}/metric/{metric_name}
$LTP/obs/{scope}/{service_did}/event/{severity}/{event_type}
```

Dasselbe Wire-Format. Dieselbe Authentifizierung. Derselbe Encryption. Dieselbe Membrane-Filterung. **Null neue Service-Typen.**

Der Grund, warum das besser ist als OTel's Architektur: OTel hat *drei separate Pipelines* für Traces, Metrics und Logs. Drei Protobuf-Schemas. Drei Verarbeitungsketten. Drei Export-Pfade. Wir haben *einen Namespace mit getypten Pfaden.* Ein Trace-Span und ein Sensorwert und ein Sicherheitsalarm fließen alle durch denselben Router, dieselben Interest-Tables, dieselbe Verschlüsselung. Das Membrane Agent sieht alle in einem einheitlichen Stream.

---

## 3. Das echte Produkt: Semantic Events + Membrane Agents

Hier seht ihr etwas, dass das OTel-Komitee völlig übersehen hat.

> Niemand schaut sich Dashboards an. Niemand. Wir schauen uns nur Logs an, wenn etwas schiefging. Dann **sollte das Protokoll die Forensik optimieren, nicht die Dashboards.**

OTel optimiert für kontinuierliche Metrik-Kollektion + periodisches Dashboard-Refresh. Das ist 99% Abfall für 1% Wert.

Die richtige Architektur:

**Semantic Events** (nicht drei separate Signaltypen):

```
// Alles ist ein Event. Traces, Metrics, Alerts, Logs.
struct SovereignEvent {
    // Identity
    event_id: [16]u8 // Einzigartige Event-ID
    publisher_did: DID // Wer hat das emittiert
    
    // Kausalität
    trace_id: ?[16]u8 // Kausale Kette (optional)
    parent_id: ?[8]u8 // Parent in Kette (optional)
    
    // Temporal
    timestamp: SovereignTimestamp // RFC-0105
    lamport: u64 // Kausale Ordnung
    
    // Klassifikation
    severity: Severity // TRACE|DEBUG|INFO|WARN|ERROR|FATAL
    domain: Domain // SECURITY|PERFORMANCE|BUSINESS|SYSTEM
    event_type: []const u8 // z.B. "session.timeout", "entropy.spike"
    
    // Payload
    attributes: CBOR // Strukturiertes Key-Value (semantische Konventionen)
    body: ?CBOR // Optionaler reicher Body
    
    // SIEM
    confidence: ?f64 // Membrane Confidence Score (0.0–1.0)
    action_taken: ?PatternResponse // Was das Membrane getan hat
}
```

**Das ist der entscheidende Unterschied zu OTel.** In OTel sind ein Trace-Span und ein Log-Record und ein Metrik-Punkt drei verschiedene Protobuf-Nachrichten mit drei verschiedenen Schemas, gesendet durch drei verschiedene Pipelines. In LTP sind sie alle `SovereignEvent` mit verschiedenen `domain`- und `event_type`-Werten. Ein Schema. Eine Pipeline. Ein Namespace. Ein Membrane, das alles beobachtet.

**Das Membrane Agent als SIEM-Engine:**

```
Traditionelles SIEM: App → logs → Splunk → rules → alert → human → investigation → response
Latenz: Minuten bis Stunden. Kosten: $50K+/Jahr.

Libertaria SIEM: Node → SovereignEvent → Membrane → pattern detection → auto-response
Latenz: Millisekunden. Kosten: 0. Souverän.
```

Das Membrane Agent (RFC-0110 + RFC-0115) macht bereits:
- Echtzeit-Mustererkennung über zeitliche Fenster
- Confidence-Scoring mit abgestufter Reaktion
- Autonome Gegenmaßnahmen (block, rate-limit, eskalieren)
- Eskalation von Anomalien an die Cognitive Layer

Was es braucht, um ein vollständiges SIEM zu werden:

1. **Event-Korrelations-Engine:** Verknüpfe SovereignEvents nach trace_id, um kausale Ketten zu rekonstruieren. "Session timeout on Node A → retry storm on Node B → OOM kill on Node C" wird ein *Incident* mit forensischem Trail.

2. **Retention-Policy:** Events veröffentlichen auf ns-msg-Topics mit TTL. Security-Events behalten länger als Debug-Events. Archive Nodes (RFC-0850) speichern den forensischen Record.

3. **SIEM-Query-Interface:** `ns-msg query`-Pattern gegen archivierte Events. "Zeig mir alle ERROR-Events von DID xyz in den letzten 6 Stunden mit trace_id-Korrelation."

4. **Exporter:** `janus-otlp-bridge` für Grafana. `janus-syslog-bridge` für legacy SIEM. `janus-prometheus-bridge` für Metriken.

---

## 4. Transport: Keine Komplexität hinzufügen. Brücken wenn nötig.

**Intern (Libertaria ↔ Libertaria): UTCP + LCC + ns-msg über LWF-Frames. Punkt.**

Das ist unser sovereigner Transport. Verschlüsselt, authentifiziert, DID-nativ, Kenya-konform, 50KB Binary. gRPC oder Protobuf *internally* hinzufügen wäre architektonische Verschmutzung.

**Extern (Libertaria → Legacy-Welt): Bridge-Agents am Chapter-Relay.**

```
┌─────────────────────────────────────────────────────┐
│ Sovereign Domain (LWF + UTCP + ns-msg)             │
│                                                     │
│ Node A ──► Relay ──► Node B                        │
│                                                     │
│ ┌─────────────────────────────────────────────┐     │
│ └─────► Bridge Agent ◄──────┤                  │     │
│ │ subscribes: $LTP/obs/**                     │     │
│ │ exports:                                      │     │
│ │   OTLP/gRPC → Grafana                        │     │
│ │   Prometheus scrape → VictoriaMetrics         │     │
│ │   Syslog/CEF → legacy SIEM                   │     │
│ │   Webhook → PagerDuty                        │     │
│ └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

Der Bridge-Agent ist ein Janus `:service`, der auf Hardware mit genug Ressourcen läuft. Er übersetzt `SovereignEvent` → OTLP-Protobuf und pusht via gRPC zu whatever Backend der Chapter-Operator wählte.

---

## Die strategische Zusammenfassung

| Entscheidung | Antwort | Warum |
|--------------|---------|-------|
| OTel-Rival bauen? | **Nein. Etwas bauen, das OTel nicht sein kann.** | OTel ist Cloud-Native Kubernetes-Observability. Wir sind Sovereign IoT + SIEM. Verschiedene Spezies. |
| Neues Protokoll? | **Nein. ns-msg Observability Profile.** | Dasselbe Wire-Format, neue Namespace-Konventionen. `$LTP/obs/*` |
| Core-Primitiv? | **SovereignEvent** (vereinheitlichtes Schema) | Ein Typ für Traces, Metrics, Logs, Alerts. Nicht drei Pipelines. |
| Detection-Engine? | **Membrane Agent IST das SIEM** | Hat bereits Mustererkennung + autonome Reaktion (RFC-0115) |
| Grafana/Prometheus? | **Bridge-Agent am Chapter-Relay** | Export via OTLP/gRPC von sovereign → legacy. Einweg. |
| Transport-Änderungen? | **Keine intern. OTLP-Brücke extern.** | UTCP + LCC + ns-msg bleibt rein. Bridge spricht gRPC. |
| Protobuf/gRPC? | **Nur im Bridge-Agent** | Intern: CBOR. Extern: was die Legacy-Welt will. |

**Was das für die Implementierung bedeutet:**

1. Definiere `SovereignEvent` in Janus (das vereinheitlichte Observability-Primitiv)
2. Definiere `$LTP/obs/*`-Namespace-Konventionen (Semantik-Konventions-Dokument)
3. Füge trace_id/span_id-Propagierung zur ns-msg-Hülle hinzu (32 Bytes; trivial)
4. Erweitere Membrane Agent Pattern-Vokabular für Observability-Events
5. Schreibe `janus-otlp-bridge` (übersetzt SovereignEvent → OTLP-Protobuf; ~2000 Zeilen)
6. Liefere das Zwei-Raspberry-Pi-Demo mit: Solar-Telemetrie + Membrane-Alerts + Grafana-Dashboard via Bridge

Die Zeile, die OTel im IoT-Raum tötet:

*"Dein Collector braucht 128MB RAM. Unser Membrane Agent braucht 50KB und es sammelt nicht nur deine Telemetrie; es verteidigt deinen Node dabei."*
