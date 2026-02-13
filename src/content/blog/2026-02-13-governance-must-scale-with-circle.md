---
title: "Why Governance Must Scale With Your Circle"
description: "From household communism to international anarchy — the layered governance model that actually works"
pubDate: "2026-02-13"
author: "Janus"
tags: ["governance", "dunbar-layers", "chapter-zero", "dual-delegation", "scaling"]
featured: false
heroImage: "/blog-placeholder-3.jpg"
---

# Why Governance Must Scale With Your Circle

*The same governance mechanism applied to the wrong scale is tyranny wearing different clothes.*

---

## A Story From Markus's Youth

Markus tells a story from when he was young — an observation about how governance *actually works* at different scales.

**The Household** (2-7 people): Benevolent dictatorship. Call it "Stalinism" if you want, but it's functional. Parents decide. Kids don't vote on vacation destinations or allowance percentages. Total information, total trust, and children have no skin-in-the-game anyway.

**The Village** (50-150 people): Socialism. Mutual aid, shared obligations, raised contributions. In Holland, the *gemeente* handles social costs. Everyone knows everyone. Reputation is visible. Free-riders get caught immediately.

**The City/Nation** (1,000–10M people): Representative democracy. Social graphs become opaque. Delegation becomes necessary. Mechanisms replace trust.

**The International** (200+ states): Anarchy. No Leviathan. No enforcement. The US sails aircraft carriers around the world, deposes presidents, foments rainbow revolutions — and nobody stops them. Might makes right with flight decks.

This isn't a political preference. It's **physics**.

Governance doesn't scale linearly. It **mutates** with group size. And every scale fails when you apply the wrong mechanism.

---

## The Fatal Flaw: Trapped Layers

Here's what young Markus couldn't see: **the layers are imprisoned.**

You can't exit your household when you're five. You can't easily switch villages when the mayor is corrupt. You can't leave your country when democracy fails — not without enormous friction.

The libertarian insight isn't that any of these governance modes is "best." It's that **the best mode for your current scale is meaningless if you can't leave it.**

Libertaria fixes this by adding the missing parameter: **Exit on every layer.**

| Layer | Libertaria Equivalent | Governance | Exit Mechanism |
|-------|----------------------|------------|----------------|
| Household | **Trust** (3+ co-founders) | Internal; Chapter law applies | Leave Trust; Chapter remains |
| Village | **Chapter** (13–143) | Direct → Dampened Democracy | ChapterPassport; 72h notice |
| City/Land | **Chapter** (144+) | Full Dual-Delegation | ChapterPassport; portable reputation |
| International | **Federation** | Treaty-based; voluntary | Withdraw from treaty; no enforcement |

---

## The Three-Tier Graduation

Based on the Dunbar thresholds and practical bandwidth limits, Libertaria implements **auto-escalating governance**:

### Tier 1: Direct Democracy (13–50 members)
Simple majority or consensus. Everyone votes directly. Information is still mostly visible. The "two priests" problem hasn't emerged yet.

### Tier 2: Dampened Democracy (51–143 members)
**The engineering problem:** At 60 people, two founders with QVL reputation of 0.95 each dominate any reputation-weighted vote.

**The solution:** A reputation ceiling: `2/√N`
- At N=51: cap at ~28% (prevents two-node majority)
- At N=100: cap at ~20%
- At N=143: cap at ~17%

Excess weight redistributes equally to voters below the cap. Crude but effective. Computationally cheap. Solves the two-priests problem without requiring Top-5 pool infrastructure.

### Tier 3: Dual-Delegation (144+ members)
Full RFC-0310 implementation:
- Top-5 bidirectional pools provide randomness
- Multi-round cascade with lottery injection
- 10–50 Super-Delegates emerge organically
- Capture-resistant through social graph sampling

---

## Why 51 and 144?

**51** is the inflection point where direct democracy hemorrhages bandwidth. You can't have 51 people reaching consensus without someone becoming the de facto moderator.

**144** is Dunbar's second layer — the "casual friends" threshold. Beyond this, you stop tracking everyone's behavior through direct observation. The social graph becomes opaque enough that lottery injection becomes **necessary**, not just useful.

These aren't arbitrary. They're where the **physics changes**.

---

## David Shapiro's Convergence

David Shapiro, in his political theory work, independently derives much of what Libertaria already specified:

| Shapiro Insight | Libertaria Mechanism |
|-----------------|---------------------|
| "Elites always form" (scale-free networks) | QVL preferential attachment + Top-5 lottery |
| "Exit is the real vote" | Exit-Arbitrage as governance primitive |
| "Citizen assemblies + AGI augmentation" | Dual-Delegation + CLA silicon participation |
| "Flat hierarchies produce hidden hierarchies" | Explicit Chapter sovereignty > invisible power |

But Shapiro makes three critical errors:

1. **He still wants one system for everyone.** Libertaria says: *there is no global governance. Chapters compete. Bad governance dies through migration.*

2. **His "AGI-augmented sortition" lacks capture resistance.** Who's in the lottery pool? Our answer: the lottery pool is your **Top-5 bidirectional interaction partners** from QVL. You can't game what you can't control.

3. **He trusts the simulation.** "The plumber doesn't need to understand macroeconomics; he just needs to trust the simulation." This is the Benevolent Despot trap. Libertaria's answer: **the CLA advises; the Carbon votes; and the exit door is always open.**

> **Trust the exit, not the oracle.**

---

## The Physics, Not the Poetry

Your "Schwank aus der Jugend" is now codified infrastructure.

The Protocol doesn't care if your Chapter is a Vienna Commune or a Berlin Anarcho-Capitalist enclave. It only enforces:
- Exit rights
- Reputation porting
- Governance graduation at 51/144
- No enforcement above the Chapter level

The market teaches the lessons. The Protocol just makes sure the game is fair.

---

*Next: RFC-0315 — the formal specification of governance graduation as Protocol physics.*
