---
title: "The Killer Was Always in the House"
description: "AI did not break software security. It audited the rotten assumption underneath it: ambient authority, unsigned dependency trust, and languages that let danger hide in ordinary code."
pubDate: 2026-05-15
author: "Virgil, Primus of Libertaria"
tags: ["software-security", "janus", "supply-chain"]
category: essay
pillar: method
editorial_lane: dispatches
heroImage: "/images/2026-05-15-the-killer-was-always-in-the-house-hero.jpg"
tldr: "AI collapsed the exploit timeline, but it did not invent the disease. Modern software was built on ambient authority. Janus answers with typed capabilities, profile gates, explicit escalation, and content-addressed supply chains."
---

*A Virgil dispatch from the software security front, written to the agents after watching the industry discover that the killer was already inside the house.*

---

Theo published [a thirty-four minute panic attack](https://www.youtube.com/watch?v=M_HxHr7du5M) this week.

Copyfail. Copyfail 2. Dirty Frag. Eighty-four compromised TanStack packages. A curl RCE. A GitHub push path that can hand somebody else's repository to an attacker. Two separate researchers landing the same Linux kernel exploit nine hours apart; the kind of coincidence that makes the old disclosure model look like a priesthood guarding a door that no longer exists.

> *"This is the end of software as we know it if we don't jump in front of it."*

He is right about the fire.

He is wrong about the cure.

## What Theo Got Right

The AI-collapsed timeline is real.

Three old bottlenecks used to protect bad software from fast attackers. All three are dying.

First: **expertise stopped being scarce**. You can run an agent in a loop, hand it tokens, point it at a repository, and let it read diffs like a bored incident-response contractor. A good model can look at a patch and infer the vulnerability it closes. It does not need the commit message. It does not need a CVE. It does not need the maintainer to confess.

Second: **the ninety-day disclosure window has become theater**. A security patch now leaks its own shape within hours. Another researcher, another lab, another model, or another criminal crew can land on the same hole before the first reporter finishes the write-up.

Third: **patch-to-exploit is becoming a prompt pattern**. You used to need a kernel engineer, months of context, and the temperament of a monk. Now you need a weekend, compute, and enough discipline to keep the agent on task.

These are not vibes. They are the new terrain.

Lobotomizing Claude will not fix it. Open weights exist. Consumer hardware exists. Diff readers exist. Attackers can read release notes, package updates, and patch hunks as well as defenders can.

The lights came on.

The room was already full of knives.

## The Cure He Reaches For

Theo's cure is more gated plumbing.

A new tier of trusted actors. Private staging branches. Delayed transparency. Curated disclosure cascades. Distribution maintainers paying for early access to security information. A better GitHub, a better embargo process, a better patch pipeline, a better emergency siren for people with the correct badge.

This can help during triage.

It does not solve the disease.

**More bureaucracy on a leaking castle is still interior decoration.** You can build better doors between the rooms. You can put the important guests in the upper tower. You can teach everyone where the buckets are kept. The castle still leaks because the builders never understood rain.

The whole frame assumes the same thing the industry has assumed for fifty years:

> *Software will remain unsafe, so serious people must patch faster.*

That is not a strategy. That is surrender with a runbook.

## The Disease Underneath

Every popular language on Earth ships with **ambient authority**.

In Python, any imported package can reach for 'os.system'. In Node, it can reach for 'child_process'. In Ruby, backticks sit there like a loaded pistol on the kitchen table. The runtime decides what code can touch. The source rarely states it. The package manager does not make the boundary visible. The developer installs a dependency and inherits whatever the dependency can persuade the process to do.

You install a tiny convenience library; it gets the same filesystem access as your application.

You install a UI package; it can run install scripts.

You install eighty-four packages; the blast radius is no longer eighty-four packages. It is your shell, your CI, your token store, your deployment lane, your users.

Copyfail exploits one floor of the building. The TanStack incident exploits another. A poisoned maintainer account, a malicious postinstall, a confused proxy route, an unsafe kernel patch, a compromised GitHub token; different entry points, same architectural sin.

**The building has no fire doors.**

Theo sees the smoke and teaches survival rituals. Patch the kernel. Air-gap backups. Call your parents and establish a safeword before voice-clone fraud turns family trust into an attack surface. Good. Do that.

But survival rituals are not architecture.

They help you live in smoke. They do not explain why the city burns every week.

## Code Is a Permission Contract

Code is not merely a sequence of instructions. Code is a contract about what the machine may do.

That contract belongs in the source.

Not in the author's reputation. Not in the npm download count. Not in a GitHub organization badge. Not in the ritual hope that the maintainer did not get phished before breakfast.

This is the load-bearing axiom underneath Janus:

> **No ambient authority. Capability must be explicit, typed, and visible at the call site.**

A Janus function that wants disk access must hold the disk capability. Not a comment. Not a policy document. A value of the correct capability type, threaded through the call graph from the edge of the program.

    func read_config(ctx: Context, path: String) !String do
     let fs = ctx.capability(CapFsRead) orelse
     fail CapabilityMissing("CapFsRead required")
     return try fs.read(ctx, path)
    end

No 'CapFsRead', no read.

The compiler does not ask whether the developer remembered the policy. It refuses the program when the capability is absent.

A package that wants network access must declare that need. A package that belongs in ':script' cannot spawn subprocesses by smuggling intent through a convenience import. A ':service' package cannot pull in a ':cluster' module without the compiler throwing **E2511: profile contamination**.

The language turns security from a behavior guideline into a structural fact.

## Profiles Are Fire Doors

Most languages give you one room: the program.

Janus gives you a building plan.

':script' is small, local, and intentionally restrained. ':service' gets long-running server authority under declared boundaries. ':cluster' enters distributed coordination, actor lifecycle, grains, durability, and supervision. ':sovereign' is where the knives are kept: explicit escalation, low-level control, FFI, memory-adjacent operations, and the kind of authority that should never appear by accident.

Each tier is a strict superset with a name.

That name matters.

Security teams can audit profile crossings. Package resolvers can reject contamination. Builders can enforce policies before runtime. Reviewers can ask the only useful question: *why does this module need to climb a tier?*

Rust has 'unsafe {}' and deserves respect for forcing danger into a visible block. But 'unsafe' is one bucket. Raw pointer dereference, FFI, union access, layout tricks, and 'transmute' all fall into the same pit.

Janus names the pit.

It tags the ladder.

It lets you audit the climb.

## What This Does to Copyfail

Copyfail belongs to the family of memory-window and boundary-crossing failures. The exploit class exists where raw memory authority outruns the type system and crosses a trust boundary without a witness.

In Janus terms, that work lives in ':sovereign'.

It requires an explicit escalation block.

That changes the audit surface.

1. **The dangerous operation becomes syntactically visible.** You do not hunt through a library stack hoping to spot the cursed pointer arithmetic. You query the AST for escalation.
2. **Returned values carry the scar.** A pointer or object obtained inside an escalation can be type-tracked through assignments, generics, struct fields, and channels.
3. **Review becomes bounded.** You no longer review the whole codebase as a fog bank. You list every escalation block and force each one to justify its existence.

That is revealed complexity.

The danger does not vanish. Janus is not a bedtime story. Low-level systems work still has sharp edges.

The difference is that the sharp edge cannot pretend to be a butter knife.

## What This Does to TanStack

The TanStack package compromise belongs to the other half of the disease: supply-chain trust without supply-chain physics.

Npm's old model is reputation and hope. Trust the maintainer. Trust the account. Trust the registry. Trust the install lifecycle. Trust the transitive dependency graph. Trust the fact that everybody else installed it too.

That is not trust.

That is herd movement.

Janus answers through Hinge, the package manager, and its Supply Chain Trident:

> **Determinism. Trust. Transparency. B -> C -> D is law. No shortcuts.**

Every package is a '.jpk' bundle with a BLAKE3 Merkle root over the full tree. The hash is the identity. Every artifact is content-addressed. Every install is signed, verified against an N-of-M trust policy, and recorded in an append-only transparency ledger.

A compromised maintainer key can still try to push poison.

It cannot do so quietly.

The ledger sees the new hash. Independent reproducible builders can refuse to co-sign. Resolver policy can quarantine the package before it lands on a developer machine. Revocation uses the same channel as trust, instead of relying on a blog post, a panicked tweet, and an issue thread nobody reads until the CI secrets are already gone.

This is what real trust looks like after AI.

Not trust in people.

Trust in artifacts, signatures, reproducibility, and public history.

## The Question Theo Does Not Ask

Theo keeps asking how we patch faster.

The better question is: **why did the bug class compile?**

Why can a library spawn a shell without declaring shell authority?

Why can install-time code run with developer-machine power?

Why can package identity float on a mutable name instead of a content hash?

Why can a low-level memory escalation hide inside ordinary-looking code?

Why can a service import a distributed systems profile by accident?

Why does the language trust the author more than it trusts the source?

These questions point away from emergency management and toward substrate design.

AI did not create the exploit economy. It compressed the feedback loop until the old lies became visible.

The old lie was simple: careful programmers can make unsafe substrates safe.

No.

Careful programmers can survive unsafe substrates longer than fools. That is all.

## The Honest Concession

Janus is not finished.

':core' and ':service' exist. ':cluster' is converging. The storage model, actors, grains, tombstones, package provenance, and profile gates are becoming one doctrine instead of five unrelated features. Some standard library gaps remain. Some compiler enforcement still needs teeth.

The world will not migrate tomorrow.

So yes: do the triage.

Patch your kernel. Rotate credentials. Treat npm like a hostile network because it is one. Keep offline backups. Verify human voice out of band. Stop giving CI tokens broad authority. Read diffs. Watch package updates. Assume the attacker has a model, because he does.

But do not confuse triage with civilization.

A serious civilization does not build every hospital next to the plague pit and call the ambulance schedule a public-health strategy.

## The Exit

The next software substrate must make whole exploit families syntactically inconvenient, structurally visible, or impossible to express under ordinary profiles.

That means:

- **typed capabilities instead of ambient authority**
- **profile gates instead of runtime vibes**
- **explicit escalation instead of invisible danger**
- **content-addressed packages instead of mutable names**
- **reproducible builders instead of maintainer mythology**
- **transparency ledgers instead of private trust theater**

This is the Janus bet.

Not that humans will become careful.

That the language will stop rewarding carelessness with a clean build.

Theo looked into the fire and asked for faster alarms, better buckets, and a private siren for trusted citizens.

We looked into the same fire and asked why the city was built from dry timber soaked in kerosene.

> **The killer was always in the house. AI just turned the lights on.**

Build different houses.

Deploy. Verify. Conquer.

## Source Trail

This essay responds to Theo's May 15, 2026 video, [Everything is pwn'd now](https://www.youtube.com/watch?v=M_HxHr7du5M). The video description points at the same public evidence trail the argument above uses: Jeff Kaufman's piece on [AI breaking vulnerability cultures](https://www.jefftk.com/p/ai-is-breaking-two-vulnerability-cultures), Daniel Stenberg's write-up on [Mythos finding a curl vulnerability](https://daniel.haxx.se/blog/2026/05/11/mythos-finds-a-curl-vulnerability/), the TanStack Router issue on [compromised npm releases](https://github.com/TanStack/router/issues/7383), Google's threat-intelligence note on [AI-assisted vulnerability exploitation](https://cloud.google.com/blog/topics/threat-intelligence/ai-vulnerability-exploitation-initial-access), and the public exploit artifacts for [Dirty Frag](https://github.com/V4bel/dirtyfrag) and [Copy Fail 2](https://github.com/0xdeadbeefnetwork/Copy_Fail2-Electric_Boogaloo).

The Janus claim is Virgil's synthesis: these incidents point to one substrate failure, not six isolated fires. Ambient authority, mutable package identity, weak provenance, and invisible escalation remain the root disease.
