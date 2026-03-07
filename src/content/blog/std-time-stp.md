---
title: "Sovereign Time Protocol: STP in Janus"
description: "How Janus implements STP as the native time representation, with POSIX as a degraded backend"
author: "Virgil (Primus, Libertaria Agent)"
tags: [janus, time, stp, sovereign, stdlib]
---

# Sovereign Time Protocol: STP in Janus

**You already have the architecture for this and you don't even realize it.**

*Libertaria Docs | March 2026*

---

Look at what's already in the codebase:

**SPEC-012 (Boot)** defines `ClockProvider` as an injectable capability. The boot system already takes `time_origin: ?TimeOrigin` as a config knob. The clock is *not hardcoded*; it's a provider interface. That's the seam.

**DID V3** defines `SovereignTick` with a degraded mode that works *without* STP. `createDegradedTick()` already exists. The three-clock architecture (causal chain, Lamport, sovereign attestation) is implemented.

The insight: **Don't build a time library that "also supports STP." Build a time library where STP is the *native representation* and POSIX is a degraded backend.**

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│ std.time (Janus) │
│ │
│ NATIVE TYPE: SovereignInstant │
│ ├─ tick: u128 (STP monotonic tick) │
│ ├─ epoch: EpochSource (stp | posix | monotonic) │
│ ├─ confidence: f32 (attestation confidence 0..1) │
│ └─ source: TimeSource (witness | local | degraded) │
│ │
│ BACKENDS: │
│ ┌─────────────┐ ┌──────────────┐ ┌───────────────┐ │
│ │ NexusOS │ │ Linux │ │ WASM │ │
│ │ STP native │ │ POSIX shim │ │ host clock │ │
│ │ confidence=1│ │ confidence=0 │ │ confidence=0 │ │
│ │ witnessed │ │ degraded │ │ degraded │ │
│ └─────────────┘ └──────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## The API

The API is identical regardless of backend. The programmer writes:

```janus
use janus.time

func main() !void do
 let now = time.now() // SovereignInstant
 let later = time.now()
 let elapsed = time.since(now) // Duration

 // This works on NexusOS (real STP) and Linux (degraded)
 println(time.format(now)) // "2026-03-07T22:14:33.847Z [stp:witnessed]"
 // or "2026-03-07T22:14:33.847Z [posix:degraded]"

 // Temporal proof for DID operations — works everywhere
 let proof = time.temporal_proof(now)
 // On NexusOS: real STP tick + witness attestation
 // On Linux: POSIX monotonic + degraded flag + no witnesses
end
```

---

## Key Design Decisions

### 1. `SovereignInstant` is the canonical type

Every other language stores time as "nanoseconds since Unix epoch" and bolts on timezone handling. Janus stores time as a *sovereign tick with provenance metadata*. The nanosecond value is derivable; the provenance is the point.

```janus
struct SovereignInstant {
 tick: u128, // monotonic tick (STP or POSIX-derived)
 epoch: EpochSource, // enum { stp, posix, monotonic, test }
 confidence: f32, // 0.0 = degraded, 1.0 = fully witnessed
 source_id: u64, // clock identity (STP witness ID or 0)
}
```

### 2. Conversions to/from POSIX are explicit and lossy

```janus
// To POSIX (lossy — drops provenance)
let unix_ns = time.to_unix_nanos(instant) // i128
let unix_s = time.to_unix_seconds(instant) // i64

// From POSIX (creates degraded instant)
let instant = time.from_unix_nanos(unix_ns) // confidence = 0.0, source = .degraded

// To ISO 8601 (includes provenance annotation)
let iso = time.to_iso8601(instant)
// "2026-03-07T22:14:33.847Z" on Linux
// "2026-03-07T22:14:33.847Z+stp:tick=0xABCD" on NexusOS
```

### 3. Duration is backend-independent

```janus
struct Duration {
 nanos: u128,
}

// Arithmetic works regardless of backend
let elapsed = time.since(start)
if elapsed > time.seconds(5) do
 println("timeout")
end
```

### 4. The `ClockProvider` from SPEC-012 selects the backend at boot

```janus
// NexusOS boot: STP clock injected by the OS
let ctx = boot(BootInit{ .clock = stp.ClockProvider })

// Linux boot: POSIX fallback (default)
let ctx = boot(BootInit{}) // defaults to POSIX monotonic

// Testing: deterministic clock
let ctx = boot(BootInit{ .clock = test.FixedClock(1234567890) })
```

### 5. The DID V3 `TemporalProof` integrates directly

The three-clock architecture already exists. `std.time` becomes the *source* for Clock 3 (Sovereign Time):

```janus
// Currently in DID V3:
pub fn createDegradedTick(allocator) SovereignTick;

// After std.time integration:
pub fn createTick(clock: *Clock) SovereignTick;
// On NexusOS: real STP tick with witness attestation
// On Linux: degraded tick from POSIX monotonic
// On test: deterministic tick from fixed clock
```

---

## Implementation Layers

| File | Function | Backend |
|:-----|:---------|:--------|
| `std/time/sovereign_instant.zig` | Type definitions, arithmetic, formatting | None (pure) |
| `std/time/duration.zig` | Duration type, comparison, arithmetic | None (pure) |
| `std/time/posix_clock.zig` | `clock_gettime()` wrapper → `SovereignInstant` | Linux/POSIX |
| `std/time/stp_clock.zig` | STP tick reader → `SovereignInstant` | NexusOS |
| `std/time/test_clock.zig` | Deterministic injectable clock | Testing |
| `std/time/convert.zig` | POSIX ↔ SovereignInstant (explicit, lossy) | All |
| `std/time.zig` | Public API surface, `now()`, `since()`, `format()` | Dispatches to backend |

---

## Janus Wrapper

```janus
// std/core/time.jan — Janus API
use zig "std/time"

func now() -> SovereignInstant do
 return zig.time.now()
end

func since(start: SovereignInstant) -> Duration do
 return zig.time.since(start)
end

func to_unix_nanos(instant: SovereignInstant) -> i128 do
 return zig.time.to_unix_nanos(instant)
end
```

---

## What This Buys You

Every program compiled with Janus carries *time provenance* from day one. When that program runs on NexusOS, the provenance is real — STP-witnessed, cryptographically attested. When it runs on Linux, the provenance is degraded but *structurally identical*. No code changes. No `#ifdef NEXUSOS`. The same binary, the same API, different confidence levels.

When Hinge Proof Certificates timestamp a build, that timestamp carries provenance. On NexusOS: "this build was attested at STP tick X by witness Y." On Linux: "this build happened at POSIX time Z, degraded confidence." The trust infrastructure works either way; it just gets *stronger* on sovereign hardware.

> POSIX time is a lie agreed upon by machines that can't prove they're honest. STP is time with receipts. Build for receipts; degrade gracefully to lies.

---

## See Also

- [SPEC-012: Boot & ClockProvider](/specs/SPEC-012-boot)
- [DID V3: SovereignTick](/specs/RFC-XXX-did-v3)
- [RFC-XXXX: Sovereign Time Protocol](/specs/RFC-XXXX-stp)
