---
title: Automated Internal PKI for Web Certificates
description: Designing and building a private ACME CA (step-ca) that issues and renews KAIST web-server TLS certificates hands-off — no expiry outages, no manual requests. (In progress)
date: 2026-07-01
tags: [PKI, TLS, Automation, step-ca, DevSecOps]
status: in-progress
featured: true
draft: false
---

## Overview

Internal web servers all need TLS certificates — and keeping them issued and renewed by hand
means repeated requests to the network team and, inevitably, expiry-driven outages. I'm
designing and building an **automated internal PKI**: a private **ACME certificate authority
(step-ca)** that issues and renews each server's certificate automatically, so the admin runs
**one command once** and the rest is hands-off.

> Status: **in design & build** with the KAIST Information Security Team.

## Architecture

![Web certificate automation — overall architecture and communication paths](/projects/kaist-cert-automation-flow.png)

Two independent paths, by design:

- **Service traffic — through the WAF.** User → **gateway WAF** → **data-center WAF** → origin
  web servers (**Nginx / Apache / IIS**), re-encrypted at each hop over 443. The WAFs hold the
  public wildcard certificate (`*.kaist.ac.kr`); each origin server holds its own dedicated,
  auto-renewing certificate.
- **Certificate issuance & renewal — direct, bypassing the WAF.** Servers talk **straight to
  step-ca** over the internal network. Only the very first bootstrap traverses the gateway WAF,
  because a brand-new server doesn't yet trust the internal CA and must receive the Root CA
  securely over the public certificate.

Supporting components: an **onboarding API** on step-ca for automatic registration (issuance
policy scoped to `*.kaist.ac.kr`), a **CA-dedicated resolver** that maps each domain to its real
origin, and a **cert-setup** installer distributed to servers (only the first install is manual).

## How issuance works

![Certificate issuance and renewal — communication sequence](/projects/kaist-cert-flow-sequence.png)

1. **Receive Root CA** — once, via the gateway WAF, trusted over the public certificate.
2. **Request issuance** — the server talks directly to step-ca (WAF-independent).
3. **Resolve origin** — the CA resolves the domain's real server location via the dedicated resolver.
4. **Verify & issue** — the CA reaches the web server on port 80 to prove ownership, then issues.

Step 1 happens only once; steps 2–4 then repeat automatically for every renewal.

## Communication ports

| From | To | Port | Purpose |
| --- | --- | --- | --- |
| User | Gateway WAF | 443 | Service |
| Gateway WAF | Data-center WAF | 443 | Forwarding |
| WAF | Origin web server | 443 | Re-encryption |
| Web server | step-ca | 443 | Issuance / renewal |
| step-ca | CA resolver | 53 | Name resolution |
| step-ca | Web server | 80 | Ownership check |
| step-ca | NTP | 123 | Time sync |
| Admin range | step-ca | 22 | Operations |

## Design choices

- **WAF-bypass issuance path** keeps automation traffic off the service path, while a **one-time
  bootstrap through the WAF** solves the "new server doesn't trust the internal CA yet" problem.
- **Issuance policy pinned to `*.kaist.ac.kr`** constrains what the internal CA can ever mint.
- **NTP + short-lived certificates** keep the ACME flow correct and reduce blast radius.

## Outcome (targeted)

- **One command per server, then zero maintenance** — no repeated requests to the network team.
- **No certificate-expiry outages**, with renewal fully automated.
