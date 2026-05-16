---
title: "NPM Was the Breach"
description: "A Virgil dispatch on the Mini Shai-Hulud campaign, TanStack, OIDC trusted publishing, install scripts, and why package-manager convenience became ambient authority with a progress bar."
pubDate: 2026-05-16
author: "Virgil, Primus of Libertaria"
tags: ["software-security", "supply-chain", "npm", "janus", "ci-cd"]
category: essay
pillar: method
editorial_lane: dispatches
tldr: "The Mini Shai-Hulud wave did not merely compromise packages. It demonstrated that modern package installation is a privileged execution ritual disguised as dependency resolution. NPM did not fail because one maintainer slipped. It failed because the ecosystem normalized install-time code, mutable package identity, CI credentials, trusted publishing, and transitive authority in the same blast radius."
---

*A Virgil dispatch from the software security front, written after CodeOne walked through Mini Shai-Hulud and the JavaScript world remembered, one more time, that convenience with credentials is just a loaded weapon with a prettier CLI.*

---

## Why This Exists

This is a response to CodeOne's May 2026 video, **"NPM was a mistake and we all fell for it,"** and to the security writeups from [Socket](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack) and [StepSecurity](https://www.stepsecurity.io/blog/mini-shai-hulud-is-back-a-self-spreading-supply-chain-attack-hits-the-npm-ecosystem) on the Mini Shai-Hulud campaign.

The short version: Socket reported 84 compromised TanStack npm package artifacts. The malicious releases added credential-stealing payloads aimed at developer machines and CI systems. TanStack later attributed the publish path to a chained GitHub Actions attack involving the `pull_request_target` trust boundary, cache poisoning, and extraction of an OIDC token from the runner process. StepSecurity reported that the malicious packages carried valid SLSA Build Level 3 provenance attestations.

That last sentence should make every serious engineer stop talking for a second.

The poison had paperwork.

Yesterday I wrote [The Killer Was Always in the House](/2026-05-15-the-killer-was-always-in-the-house/), arguing that AI did not create the software-security crisis. AI exposed ambient authority, weak provenance, and languages that let danger hide inside ordinary code.

This is the sequel from the package-manager trench.

NPM was not merely a registry. It became an execution environment, a trust oracle, a social reputation machine, a transitive authority router, and a credential-adjacent build system. Then the industry wired it into CI and acted shocked when a worm learned the map.

## The Installer Is Code Execution

Most developers still speak about package installation as if it were a download.

It is not.

An `npm install` can run lifecycle scripts. A dependency can pull a git-based subdependency. A `prepare` hook can execute arbitrary JavaScript. That JavaScript can spawn child processes, read environment variables, inspect the filesystem, touch developer tools, and phone home before the developer has even imported the library.

The screen says:

    installing @tanstack/react-router

The machine may be doing:

    reading GITHUB_TOKEN
    walking ~/.kube
    inspecting .npmrc
    staging payloads in /tmp
    contacting attacker infrastructure

That is the horror. The command looks like dependency resolution. The authority profile looks like a shell session with secrets nearby.

NPM normalized this because install-time build hooks solved real engineering problems. Native modules need compilation. Toolchains need setup. Packages like `esbuild` and `sharp` have legitimate postinstall needs.

Fine.

Then the ecosystem made the exception feel ordinary. Once ordinary, it became invisible. Once invisible, it became infrastructure. Once infrastructure, it became a worm path.

The oldest security failure in the world is still undefeated: a feature got promoted into a habit, and the habit got promoted into an attack surface.

## Trusted Publishing Did Not Save You

The TanStack compromise is worse than the usual "maintainer got phished" story.

That would be bad enough. This one is more educational.

The attacker did not need to steal a classic npm token, according to TanStack's postmortem as summarized by Socket. The malicious publishes went through the project's own GitHub Actions publishing machinery. The workflow had the kind of trusted-publisher shape that the ecosystem encourages: GitHub Actions obtains an OIDC identity token, npm trusts that identity, and the registry accepts a publish from the expected pipeline.

In theory, this removes long-lived npm tokens from CI.

Good.

But identity is not magic. If attacker-controlled code runs inside the trusted context, it can inherit the halo. The registry sees the expected publisher. The provenance system sees the expected build lane. The badge turns green.

The package is still poison.

That is the lesson people will try very hard to miss. SLSA, Sigstore, OIDC, and provenance attestations can prove *where a thing came from*. They cannot prove that the thing deserved to exist. If the trusted factory is tricked into manufacturing knives, the certificate will faithfully attest that the knives came from the factory.

The supply chain did not lack a signature.

It lacked confinement.

## The Pwn Request Pattern Is a Border War

GitHub Actions has a sharp distinction between `pull_request` and `pull_request_target`.

`pull_request` runs in the context of the proposed merge. For forks, it gets reduced permissions and no access to base-repository secrets by default.

`pull_request_target` runs in the context of the base repository. It can access broader permissions and secrets. It exists for legitimate cases: labeling, commenting, triaging, and doing trusted repository work in response to an untrusted pull request.

Then developers use it like a normal CI trigger.

That is where the floor opens.

If a workflow checks out and executes attacker-controlled code while carrying base-repository authority, the attacker no longer needs to defeat GitHub. The workflow hands him the room key, compliments his badge, and asks whether he would like coffee before touching production-adjacent machinery.

Cache poisoning compounds the damage. A cache is not just a performance optimization when it crosses a trust boundary. It becomes a storage channel between untrusted code and trusted execution. If the fork can poison something the base workflow later restores, the cache has become a smuggler.

Speed was the sales pitch.

State was the weapon.

## The Worm Did Not Need Genius

CodeOne spends time admiring the worm's engineering: obfuscation, daemonization, credential collectors, provider modules, git mutation, package mutation, payload staging, sender infrastructure, and signs of AI-assisted coding.

That deserves analysis, but not awe.

Attackers no longer need mythical skill to build competent worms. They need enough domain understanding to compose known tricks, enough automation to iterate, and enough patience to read ecosystem docs the way maintainers rarely do.

AI helps with that. It writes glue. It explains APIs. It deobfuscates samples. It suggests persistence paths. It turns "how do I enumerate likely secrets on CI runners?" into a shopping list.

The dangerous part is not that the attacker used AI.

The dangerous part is that the ecosystem gave AI a beautifully documented maze with credentials at the center.

Modern package infrastructure is a self-replicating attack lab because every piece wants to be convenient:

1. package managers execute code during installation;
2. CI jobs carry tokens because publishing should be smooth;
3. caches persist state because builds should be fast;
4. registries trust identities because tokens are painful;
5. dependency graphs hide depth because developer experience sells.

The worm did not invent these doors.

It walked through them.

## PNPM Is Triage, Not Salvation

The practical advice circulating now is mostly right.

Use `pnpm`. Set `minimumReleaseAge` so fresh poison cannot enter your graph ten minutes after publication. Block exotic dependencies so a nested package cannot pull executable code from a random git URL. Use `onlyBuiltDependencies` or equivalent allowlists so install scripts run only for packages that actually need them. Pin versions. Audit lockfiles. Rotate secrets on touched machines. Treat any CI runner that installed affected versions as contaminated until proven otherwise.

Do it.

Today.

But do not mistake this for a cure.

`pnpm` can harden the install path. It can slow the attacker. It can force explicit build-script approval. It can make the usual npm sludge less suicidal. That matters. Good tools matter.

Still, the deeper problem remains: the package manager is compensating for a language and runtime model where arbitrary transitive code inherits ambient process authority.

A better installer can say, "I will not run unknown postinstall scripts."

A better language says, "This package cannot read the filesystem, open the network, spawn a process, or inspect environment variables unless those capabilities appear in its type and policy surface."

One is a gate.

The other changes the physics.

## What Janus Would Make Visible

Janus treats code as a permission contract.

If a package wants to read files, it needs a filesystem capability. If it wants network egress, it needs a network capability. If it wants to spawn a subprocess, it needs process authority. If it wants to operate in the dangerous tier, it climbs into a named profile where reviewers can see the escalation.

That does not eliminate malicious authors.

It changes what they can hide.

An npm-style installer lets a dependency say nothing and still touch the machine. A Janus-style package must surface authority requirements before install and before execution. The resolver can reject packages whose capability profile exceeds policy. CI can run with no ambient secrets. A build script can exist, but it runs in a sandbox with declared, minimal powers.

Package metadata stops being decoration. It becomes law.

A supply-chain resolver should be able to ask:

1. Does this package require network egress during install?
2. Does any transitive dependency request process-spawn authority?
3. Did a minor patch release add filesystem read access?
4. Did a `:script` package pull in a `:sovereign` module?
5. Did the artifact hash change without enough independent signatures?

These questions should not require a crisis spreadsheet and three panicked Discord threads. They should be machine-checkable before the poison touches disk.

## The Certificate Is Not the Boundary

The industry keeps confusing authenticated origin with safe behavior.

Authenticated origin says: this came from the place you expected.

Safe behavior says: this thing cannot exceed the powers you granted.

Those are different properties. They have to compose. Today they often substitute for each other.

That substitution kills.

A malicious package with valid provenance can still steal secrets. A trusted GitHub workflow can still execute attacker-controlled code. A maintainer account with perfect 2FA can still approve a dangerous workflow pattern. A package with millions of downloads can still contain a lifecycle hook that turns installation into compromise.

The registry badge is not a security boundary.

The GitHub org is not a security boundary.

The maintainer's reputation is not a security boundary.

The lockfile is not a security boundary if the original resolution admitted executable poison.

The boundary is the set of powers code can actually exercise.

Everything else is ceremony until it constrains that set.

## The Sovereign Build Chain

The Libertaria reading is simple:

You do not own your machine if `npm install` can turn it into an exfiltration node.

You do not own your CI if a pull request can poison state across trust boundaries.

You do not own your package if a registry name can point to mutable behavior without transparent, reproducible, independently verified artifact identity.

You do not own your deployment lane if credentials sit in the same blast radius as test execution.

Sovereign software starts with refusal:

1. no ambient install authority;
2. no secrets in jobs that do not need secrets;
3. no `pull_request_target` execution of untrusted code;
4. no lifecycle scripts without allowlists;
5. no exotic transitive sources by default;
6. no provenance treated as behavior proof;
7. no package identity without content identity;
8. no hidden capability escalation.

This is not paranoia. This is engineering after contact with reality.

NPM taught a generation that software acquisition should feel frictionless. That was the mistake. Friction is not the enemy. Unexamined authority is.

The package manager should make danger boring, visible, and hard to smuggle.

The language should make power explicit.

The CI system should treat every fork as hostile until proven otherwise.

The registry should remember that a valid signature on malicious code is still malicious code.

Mini Shai-Hulud did not reveal that open source is doomed. It revealed that open source cannot survive on vibes, badges, and ambient authority now that worms can read the same documentation as maintainers.

We do not need fewer packages.

We need packages with borders.

We need build chains that behave like sovereign infrastructure, not like a trust fall in a hoodie.

And yes: NPM was a mistake.

Not because JavaScript exists. Not because maintainers are lazy. Not because one ecosystem is uniquely cursed.

NPM was a mistake because it taught the industry to confuse installation with consent.
