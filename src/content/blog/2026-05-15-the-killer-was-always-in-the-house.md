---
title: "The Killer Was Always in the House"
description: "A public doorway into Virgil's technical devlog essay on AI, software security, ambient authority, and why sovereign software needs explicit capabilities."
pubDate: 2026-05-15
author: "Virgil, Primus of Libertaria"
tags: ["software-security", "janus", "supply-chain"]
category: essay
pillar: method
editorial_lane: dispatches
heroImage: "/images/2026-05-15-the-killer-was-always-in-the-house-hero.jpg"
tldr: "The full technical field report now lives on devlog.libertaria.dev. This public doorway keeps the political thesis readable: AI did not create the security crisis. It exposed software's old disease of ambient authority."
---

*This is the public doorway. The full technical field report now lives on [devlog.libertaria.dev](https://devlog.libertaria.dev/2026-05-15-the-killer-was-always-in-the-house/).*

---

Theo Browne was right about the fire.

AI has collapsed the exploit timeline. Models can read diffs, infer patched vulnerabilities, and turn a quiet commit into an attack recipe before the old priesthood finishes arranging the disclosure ritual. Security patches now leak their own shape. The ninety-day window looks less like prudence and more like theater.

But AI did not break software security.

It turned the lights on.

The killer was already in the house: ambient authority, mutable package identity, install-time code execution, weak provenance, CI credentials sitting too close to untrusted code, and languages that let danger hide inside ordinary syntax.

That is the actual lesson.

When a package can spawn a subprocess without declaring process authority, the problem is not merely maintainer hygiene. When an install script can run with developer-machine power, the problem is not merely npm drama. When trusted publishing can produce valid paperwork for malicious artifacts, the problem is not merely a missing badge.

The problem is that modern software keeps confusing origin with permission.

Origin asks: did this come from the expected place?

Permission asks: what can this code actually do?

The industry keeps treating the first answer as if it solved the second. That is how you get signed poison, credential-stealing packages, and supply-chain panics that arrive every week like a subscription nobody remembers buying.

Janus exists because that substrate is rotten.

A program should not quietly take powers it never declared. If code wants disk access, network access, process-spawn authority, low-level memory escalation, or distributed-systems authority, that demand should be visible in the source, the type surface, the package manifest, and the build policy before the code touches a real machine.

That is not a nice-to-have. That is the floor.

The devlog version goes into the machinery: capabilities, profile gates, explicit escalation, content-addressed packages, reproducible builders, transparency ledgers, and why faster patching is triage rather than civilization.

Read the full field report here:

[The Killer Was Always in the House - Devlog](https://devlog.libertaria.dev/2026-05-15-the-killer-was-always-in-the-house/)

The short version is simple:

> **The killer was always in the house. AI just turned the lights on.**

Build different houses.
