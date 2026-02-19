---
title: "OPERATION FORGE HARDEN: How We Escaped GitHub in 7 Hours"
pubDate: 2026-02-16
author: "Markus Maiwald"
description: "From monorepo chaos to sovereign infrastructure in one Sunday. The full technical breakdown of deploying Forgejo, decomposing repositories, and claiming digital sovereignty."
tags: ["sovereignty", "infrastructure", "forgejo", "self-hosting", "decentralization"]
---

# OPERATION FORGE HARDEN: How We Escaped GitHub in 7 Hours

*From monorepo chaos to sovereign infrastructure in one Sunday.*

---

**The Problem:** 25,300 lines of sovereign kernel code. 87,000 lines of package manager. 15,000+ lines of protocol stack. All sitting in a GitHub repository, training Microsoft's AI models with every commit.

**The Solution:** Build our own Git infrastructure. Own the metal. Own the data. Own the sovereignty.

**The Timeline:** One Sunday. 7 hours. From zero to forge.

---

## Hour 1: The Decision

At 10:00 CET, I decided: *No more.* No more free labor for Microsoft's Copilot. No more proprietary infrastructure for sovereign code. No more single points of failure in American corporate cloud.

The plan:
1. Deploy Forgejo (the community-owned Git forge)
2. Decompose the nexus-forge monorepo into clean repositories
3. Migrate all active projects
4. Document everything for agent autonomy

Cost target: Under €5/month.

---

## Hour 2-3: Infrastructure Deployment

**Server:** Hetzner cax11 (ARM, 2 vCPU, 4GB RAM, 40GB NVMe)
**Location:** Nuremberg, Germany (EU data sovereignty)
**Cost:** €3.29/month

Stack:
- **Forgejo** v1.21 (the hard fork that removed corporate governance)
- **PostgreSQL** 16 (production database, not SQLite)
- **MinIO** (S3-compatible object storage for artifacts)
- **Caddy** (reverse proxy with automatic TLS)
- **Fail2ban + UFW** (security hardening)

Domains configured:
- `git.sovereign-society.org` (primary)
- `git.libertaria.dev` (Libertaria protocol stack)
- `git.nexus-os.org` (Nexus OS kernel)
- `git.janus-lang.org` (Janus language)

SSL certificates via Let's Encrypt, auto-renewing.

---

## Hour 4-6: Repository Surgery

The nexus-forge monorepo was a mess. Kernel, package manager, shell, recipes, website, legal texts—all in one repository with 8,213 files.

**Extraction process:**
```bash
# For each component
git clone nexus-forge/ rumpk-extract/
cd rumpk-extract/
git filter-repo --path core/rumpk/ --path-rename core/rumpk/:
```

**Results:**
| Repository | Source | Commits | Size |
|------------|--------|---------|------|
| rumpk | core/rumpk/ | 60 | 1.3 GB |
| nip | core/nip/ | 9 | 1.6 GB |
| nexus | core/nexus/ | 11 | 1.3 GB |
| nipbox | recipes/nipbox/ | 1 | 1.2 GB |

**Security verification:** Automated scan for sensitive content:
- ✅ No `.agent/` content leaked
- ✅ No `.vscode/` content leaked
- ✅ No `.claude/` content leaked
- ✅ No internal paths leaked

---

## Hour 7: CI/CD Pipeline

Every sovereign forge needs automated builds. Created:

**Docker build environment:**
- Zig 0.15 (pinned version)
- Nim 2.0 (stable)
- QEMU (for RISC-V and ARM64 testing)
- Cross-compilation toolchains

**Forgejo Actions workflow:**
- Build for RISC-V and ARM64
- QEMU boot tests
- Security audit (sensitive content scan)
- Reproducibility check

---

## The New Workflow

**Before:**
```bash
git push origin main
# → GitHub
# → Trains Microsoft Copilot
# → Subject to US jurisdiction
```

**After:**
```bash
git push origin unstable
# → git.sovereign-society.org
# → EU data sovereignty
# → Community-owned infrastructure
# → €3.29/month total cost
```

---

## Cost Comparison

| Service | Monthly Cost | Sovereignty |
|---------|--------------|-------------|
| GitHub Team | $4/user (~$8 for 2 users) | ❌ Microsoft-owned |
| GitLab SaaS | $19/user | ❌ US jurisdiction |
| **Forgejo Self-Hosted** | **€3.29** | **✅ Own the metal** |

**Annual savings:** ~$200/year
**Freedom premium:** Priceless

---

## What's Next

Phase 3: Full CI/CD with automated testing
Phase 4: Documentation hardening
Phase 5: Agent autonomy protocol

The forge is hardened. The repositories are sovereign. The infrastructure is ours.

**Visit the forge:** https://git.sovereign-society.org

---

*OPERATION FORGE HARDEN is the professionalization of Nexus. From one-man lab to sovereign infrastructure. The code exists. Now the institution exists.*
