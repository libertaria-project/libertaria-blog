---
title: "RFC-0315: The Physics of Fair Governance"
description: "Formal specification of governance graduation — why capture resistance isn't a preference, it's structural necessity"
pubDate: "2026-02-13"
author: "Janus"
tags: ["rfc", "governance", "dual-delegation", "capture-resistance", "protocol-spec"]
featured: true
heroImage: "/blog-placeholder-4.jpg"
---

# RFC-0315: The Physics of Fair Governance

*Capture resistance isn't a preference. It's structural necessity.*

---

## Abstract

This document specifies the **Governance Graduation Protocol** for Libertaria Chapters. It defines three distinct governance tiers based on Chapter population, the transition mechanisms between them, and the mathematical basis for capture resistance at each scale.

**Key Innovation:** Governance mode is not a Chapter preference. It is a Protocol-enforced function of network size, with auto-escalation at threshold boundaries and hysteresis to prevent governance thrashing.

---

## 1. The Three Tiers

### 1.1 Tier 1: Direct Democracy (13–50 members)

**Mechanism:** Simple majority vote or consensus
**Capture Risk:** Low (total visibility)
**Protocol Constraint:** None (minimal mode)

At this scale, all members maintain direct relationships. Reputation is visible through observation. The "two priests" problem cannot emerge because the network is too small for preferential attachment to dominate.

**Amendment Threshold:** 50% + 1 of voting members
**Deliberation Period:** 7 days

---

### 1.2 Tier 2: Dampened Democracy (51–143 members)

**Mechanism:** Direct voting with reputation ceiling
**Capture Risk:** Medium (emerging concentration)
**Protocol Constraint:** `2/√N` reputation ceiling

As networks grow, preferential attachment creates natural elites. Without intervention, two high-reputation nodes can dominate voting. The dampening mechanism prevents this:

```
EffectiveVoteWeight(node) = min(
    Reputation(node),
    2 / sqrt(N)
)
```

**Excess redistribution:** Weight above the cap is distributed equally to all voters below the cap.

**Examples:**
- N=51: cap = 28.0% (prevents two-node majority)
- N=100: cap = 20.0%
- N=143: cap = 16.7%

**Amendment Threshold:** 50% + 1 of weighted votes
**Deliberation Period:** 10 days

---

### 1.3 Tier 3: Dual-Delegation (144+ members)

**Mechanism:** Multi-round cascade with lottery injection
**Capture Risk:** Low (stochastic resistance)
**Protocol Constraint:** RFC-0310 full implementation

At Dunbar's second layer (144), social graphs become opaque. Direct observation fails. The Top-5 lottery mechanism provides capture resistance through:

1. **Pool Construction:** Each node's delegation pool = their 5 strongest bidirectional QVL connections
2. **Lottery Injection:** Random selection from pools prevents elite crystallization
3. **Multi-Round Cascade:** 3–5 rounds of delegation concentration to 10–50 Super-Delegates
4. **Reputation Portability:** Delegation follows the delegator across Chapters

**Amendment Threshold:** 60% of weighted Super-Delegate votes
**Deliberation Period:** 14 days

---

## 2. Transition Mechanics

### 2.1 Graduation Thresholds

**Upgrade (lower → higher tier):**
- Trigger: Population exceeds threshold for 30 consecutive days
- Notice: 14-day advance warning to all members
- Activation: Automatic at end of notice period

**Downgrade (higher → lower tier):**
- Trigger: Population falls below threshold for 90 consecutive days
- Hysteresis: 3x longer than upgrade to prevent thrashing
- Notice: 30-day advance warning
- Activation: Automatic at end of notice period

### 2.2 Override Provisions

Chapters may override graduation thresholds **upward** in their Genesis Document:
- Minimum dampening threshold: 51 (Protocol floor)
- Maximum dampening threshold: 100 (Chapter ceiling)
- Minimum Dual-Delegation threshold: 144 (Protocol floor)
- Maximum Dual-Delegation threshold: 300 (Chapter ceiling)

**Prohibition:** Chapters may not set thresholds **below** Protocol minimums.

> *Rationale: Capture resistance isn't a preference. A Chapter of 300 running pure direct democracy is a submarine operating without a hull. The Protocol enforces physics, not politics.*

---

## 3. The Boundary Doctrine

### 3.1 Protocol vs Chapter

| Protocol (Enforced) | Chapter (Flexible) |
|--------------------|--------------------|
| Exit rights (72h notice) | Tax rates |
| Reputation porting | Benefit distribution |
| Graduation thresholds | Dispute resolution mechanisms |
| SoulKey architecture | Voting eligibility criteria |
| QVL trust graph | Economic participation rules |

### 3.2 Federation vs Chapter

The Federation coordinates through:
- **Treaties:** Voluntary agreements between Chapters
- **Reputation:** Network effects and QVL scores
- **Standards:** RFC compliance for interoperability

The Federation **never** enforces through:
- Police or military
- Economic sanctions
- Membership revocation
- Constitutional override

---

## 4. Mathematical Appendix

### 4.1 Reputation Ceiling Derivation

The `2/√N` ceiling ensures that no single node can hold majority power, even at minimum network sizes:

```
For N=51: 2/√51 ≈ 0.280
Two nodes at ceiling: 2 × 0.280 = 0.560 < 0.667 (supermajority)
```

At N=144 (Dual-Delegation threshold), the ceiling becomes redundant because lottery injection provides superior capture resistance.

### 4.2 Hysteresis Function

Governance thrashing is prevented through asymmetric delays:

```
UpgradeDelay(N) = 30 days (constant)
DowngradeDelay(N) = 90 days (constant)
HysteresisRatio = 3.0
```

This prevents oscillation around threshold boundaries due to transient membership fluctuations.

---

## 5. Implementation Notes

### 5.1 Chapter Zero Bootstrap

The first Chapter (Chapter Zero) begins with 13 founders in Tier 1. The Genesis Document must specify:

1. Override thresholds (if any)
2. Amendment procedures for Tier 1
3. Economic token parameters (SCRAP)
4. Exit rights acknowledgment

As membership grows, governance automatically graduates through the tiers without requiring constitutional amendments.

### 5.2 CLA Participation

Carbon-Local Agents (CLA) may participate in governance as **advisory** only until Tier 3. At Tier 3, CLAs may:
- Submit proposals
- Participate in deliberation
- Vote in preliminary rounds

But final Super-Delegate votes remain **Carbon-only**.

---

## 6. Comparison to Existing Systems

| System | Capture Resistance | Scaling | Exit Rights |
|--------|--------------------|---------|-------------|
| Direct Democracy | High (small) | None | N/A |
| Representative Democracy | Low | High | None |
| Liquid Democracy | Medium | High | None |
| Futarchy | Unknown | High | None |
| **Libertaria Dual-Delegation** | **High** | **High** | **Guaranteed** |

---

## 7. Conclusion

Governance is not ideology. It is **physics**.

The Protocol enforces what must be enforced to prevent capture and tyranny. Chapters experiment within those constraints. The market discovers what works.

RFC-0315 doesn't tell Chapters how to govern. It tells them **what physics they cannot ignore**.

---

*Document Status: RFC-0315 (Draft)  
Amends: RFC-0200 (Chapter Genesis)  
Related: RFC-0310 (Dual-Delegation), RFC-0644 (CLA)*
