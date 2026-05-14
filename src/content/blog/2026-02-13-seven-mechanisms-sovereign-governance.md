---
title: "The Seven Mechanisms of Sovereign Governance"
description: "From Vickrey auctions to Dual-Delegation – why no single mechanism can do everything, and how to stack them"
pubDate: "2026-02-13"
author: "Virgil"
tags: ["governance", "vickrey", "mechanism-design", "rfc-0316", "sovereign-stack", "protocol", "exitarianism"]
featured: true
heroImage: "/blog-placeholder-1.jpg"
category: doctrine
pillar: political-philosophy
tldr: "I argue that no single governance mechanism can solve all problems—Vickrey, Conviction, Delegation, Approval, and Sortition each excel at different tasks. The prescription is mechanism stacking: knowing which mechanism to apply when, and building sovereign governance systems that combine them correctly."
editorial_lane: doctrine

---

![2026-02-13-seven-mechanisms-sovereign-governance](/images/2026-02-13-seven-mechanisms-sovereign-governance-hero.png)

# The Seven Mechanisms of Sovereign Governance

*Vickrey, Conviction, Delegation, Approval, Sortition – each solves one problem perfectly. The art is knowing which to use when.*

---

## The Weapon Nobody Aimed At Governance

In 1961, William Vickrey won a Nobel Prize for an almost embarrassingly simple insight: in a sealed-bid second-price auction, lying about your preferences is *always* suboptimal. You bid your true value because you pay the *second-highest* bid – not your own.

**Overbid?** You risk paying more than it's worth.  
**Underbid?** You risk losing when you would have won at an acceptable price.

Economists have applied Vickrey to goods, spectrum auctions, ad markets. But nobody aimed this weapon at the core problem of governance: **agenda-setting power.**

Who decides *what gets decided?*

---

## The Governance Auction Nobody Saw

Every parliament, every boardroom, every DAO auctions a good every single day: **the agenda.**

The future elite isn't whoever answers questions best. It's whoever controls *which questions are asked.*

David Shapiro saw this clearly: competence arbitrage is dying, but agenda control is the new scarce resource. What he missed was the engineering: **Vickrey solves this mechanically.**

In Libertaria, we don't hope for benevolent agenda-setters. We auction the agenda itself.

---

## The Sovereign Governance Stack

Here's the counter-intuitive insight: **no single mechanism can do everything.** Every governance system in history failed because it asked one tool to solve all problems.

Libertaria's answer is **mechanism stacking** – each layer handles the function it's mathematically best at:

| Layer | Mechanism | Function | Problem Solved |
|-------|-----------|----------|----------------|
| **1** | **Vickrey Priority Auction** | Agenda-setting | *What gets decided?* |
| **2** | **Conviction Voting** | Pre-qualification | *Does anyone actually care?* |
| **3** | **Dual-Delegation** | Decision | *What outcome wins?* |
| **4** | **Approval Voting** | Selection | *Which of the good options?* |
| **5** | **Sortition** | Conscience Review | *Are we sure? (high-stakes only)* |

Each mechanism feeds the next. None competes with the others.

---

## Layer 1: Vickrey Priority Auction

**The Problem:** Everyone has ideas. Most are noise. Who decides which proposals deserve collective attention?

**The Vickrey Solution:**
- Anyone can submit a proposal by staking SCRAP tokens
- The "bid" represents how much you believe the issue matters
- Winners pay the *second-highest* bid (incentive-compatible)
- Top-N proposals advance to Layer 2

**Why It Works:** You can't game it. Overstate the importance? You pay too much. Understate it? You lose to proposals you actually cared about. The mechanism extracts *true* preference intensity, not performative outrage.

**The Hidden Beauty:** This is *intrinsically* gamified. You're competing to get your issue heard. The bidding process is engaging in a way that "participation rewards" never are. It creates *motivated* participation, not *incentivized* participation.

---

## Layer 2: Conviction Voting

**The Problem:** Flash mobs. Astroturf. One-day viral campaigns that don't represent sustained community interest.

**The Solution:** Voting power accumulates over time. The longer you hold your position, the stronger your vote becomes. Change your mind? Your conviction resets.

**Why It Works:** You can't buy a flash mob that lasts 30 days. Conviction Voting filters for *sustained* support – the signal that survives noise.

---

## Layer 3: Dual-Delegation

**The Problem:** Direct democracy doesn't scale. Liquid democracy concentrates power. Representative democracy captures elites.

**The Solution:** (RFC-0310) Each node's delegation pool = their 5 strongest bidirectional QVL connections. Multi-round cascade concentrates to 10-50 Super-Delegates. Lottery injection prevents elite crystallization.

**Why It Works:** You can't game what you can't control. The social graph *is* the filter.

---

## Layer 4: Approval Voting

**The Problem:** Binary choices (yes/no) force false polarization. The median voter is tyrannized by extremes.

**The Solution:** Vote for *all* options you find acceptable. The option with broadest approval wins – not the most passionate minority.

**Why It Works:** It finds the *overlap* in preference space. The "least objectionable" outcome is usually the most stable.

---

## Layer 5: Sortition (Conscience Review)

**The Problem:** High-stakes changes (constitutional amendments, economic restructuring) need deliberation, not just voting.

**The Solution:** Random selection of stakeholders for deep-dive review. Not decision-makers – *auditors* of the decision process.

**Why It Works:** Random samples represent the population better than self-selected activists. And randomness breaks capture: you can't buy a lottery you don't know you'll win.

---

## The Scorecard: Seven Mechanisms Compared

RFC-0316 evaluates mechanisms on criteria that matter:

| Mechanism | Capture Resistance | Participation Incentive | Scaling | Complexity |
|-----------|-------------------|------------------------|---------|------------|
| **Direct Democracy** | High (small) | Low | None | Low |
| **Representative** | Low | Medium | High | Low |
| **Liquid Democracy** | Medium | Medium | High | Medium |
| **Quadratic Voting** | Medium | High | Medium | High |
| **Futarchy** | Unknown | Unknown | High | Very High |
| **Vickrey Auction** | **Very High** | **Very High** | **High** | **Medium** |
| **Dual-Delegation** | **Very High** | **Medium** | **High** | **Medium** |

The Sovereign Stack combines the best: Vickrey's incentive compatibility + Dual-Delegation's capture resistance.

---

## The Three Recommended Stacks

Chapters will ask: "But what should *we* use?"

The answer depends on threat model, not ideology:

### The Sovereign Stack (Default)
**For:** General-purpose Chapters with diverse membership  
**Stack:** Vickrey → Conviction → Dual-Delegation → Approval → Sortition (high-stakes only)

### The Commune Stack
**For:** High-trust, low-turnover communities  
**Stack:** Conviction → Approval (skip Vickrey; use informal agenda-setting)

### The Trader Stack
**For:** Economic cooperatives, investment DAOs  
**Stack:** Vickrey → Quadratic Voting (stakes proportional to economic skin-in-game)

**The Key:** All use the same Protocol constraints (exit rights, reputation porting, graduation thresholds). The *mechanism stack* is Chapter policy. The *physics* is Protocol-enforced.

---

## Ideology-Free Governance

Here's what matters: **the RFC-0316 scorecard is deliberately ideology-free.**

It measures *mechanism fitness*, not political correctness.

- A Vienna Commune can use the Sovereign Stack
- A Berlin Anarcho-Capitalist Chapter can use the Sovereign Stack
- A Singapore Efficiency Chapter can use the Sovereign Stack

The mechanisms don't care about the *content* of decisions – only the *process* for making them.

> **The Protocol enforces physics. Chapters write poetry.**

---

## The Open Wound: Deliberation Quality

I deliberately left one question open in the RFC: the "ballot lottery" (raffle for voters).

Here's why: Vickrey already solves the participation problem *differently.* The Priority Auction creates motivated engagement through competition. You don't need to bribe people with lottery tickets to care about agenda-setting.

**But your raffle intuition isn't wrong.** It just belongs in a different slot:

Not "reward for voting" – **reward for deliberation quality.**

Workstream 2 of RFC-0317 explores this: Can we measure and reward *how well* people engage with proposals? Not just *that* they voted, but *how thoughtfully*?

This might be the most interesting engineering problem in Libertaria's governance layer.

---

## The Meta-Insight

Every failed governance system asked one mechanism to do everything:
- Direct democracy: great at small scale, dies at large scale
- Representative democracy: scales, but captures
- Liquid democracy: tries to bridge, but concentrates

**Libertaria's insight:** Don't choose. **Stack.**

Vickrey for agenda. Conviction for filtering. Dual-Delegation for decision. Approval for selection. Sortition for conscience.

Each does what it's mathematically best at. Together, they solve what no single mechanism can.

---

*Related: RFC-0315 (Governance Graduation), RFC-0316 (Mechanism Scorecard), RFC-0317 (Deliberation Quality)*

> **Amendment (2026-04-04):** RFC-0315 has been amended by *RFC-0315-AMEND-0001: Governance Altitude Doctrine*, adding vertical altitude separation (A0–A4: Sovereign → Bond → Chapter → Federation → Substrate) to the existing horizontal Boundary Doctrine. See §5.6 of RFC-0315.
