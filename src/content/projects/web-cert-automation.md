---
title: One Command to HTTPS — Automating Public TLS Across a University
description: Departments, labs, and clubs each run their own web server, and almost nobody wants to think about TLS. Building a portal and a one-command installer that issue and renew publicly trusted Let's Encrypt certificates on their own — with central visibility over every server. In production since May 2026 — 73 servers enrolled, 109 automatic renewals, zero expiries.
date: 2026-07-01
tags: [TLS, Let's Encrypt, ACME, DNS-01, Automation, DevSecOps]
featured: true
draft: false
---

## Overview

At KAIST, web services are run by whoever happens to own them — a department, a lab, a student
club. The people behind them change often, most have never configured TLS, and every certificate
becomes a support ticket for the security team. The result is predictable: certificates lapse, and
the outage is the first thing anyone notices.

I'm building a system where the server operator runs **one command, once**, and never thinks about
certificates again: a management portal issues an install script, the server generates its own key,
gets a **publicly trusted Let's Encrypt certificate** over ACME, and renews itself from then on.

> Status: **in production** since May 2026 and rolling out. The goal is full coverage before 100-day certificate lifetimes take effect in March 2027.

## Why public certificates

The first design went the other way — a private ACME CA (**step-ca**) issuing internal certificates.
It worked, but it carried a tax that fell on exactly the people the project is meant to help:

- Every server had to **receive and trust a Root CA** before it could get a certificate, which meant
  a bootstrap path, a trust store edit, and a failure mode nobody could debug alone.
- Any client outside that trust store — a phone on cellular, an external auditor, an API consumer —
  still saw a warning. "Secure" was conditional on configuration nobody controlled centrally.
- The CA itself became infrastructure to run, monitor, and eventually rotate.

Switching to **Let's Encrypt** deletes all three. A public CA is already trusted by every browser and
OS on earth, so the entire Root CA distribution and trust-setup phase disappears — and the security
posture gets *better*, not worse, because there's no private trust anchor to protect.

## Architecture

![Web certificate automation — architecture and communication paths](/projects/kaist-cert-automation-flow-en.png)

Two paths, deliberately separated:

- **Service traffic — through the WAF.** User → **gateway WAF** → origin web servers
  (**Nginx / Apache / IIS**), re-encrypted at each hop over 443. Servers inside the data center sit
  behind a second **data-center WAF**; the rest sit directly behind the gateway WAF. The WAFs hold
  the public wildcard certificate (`*.kaist.ac.kr`); each origin server holds its own certificate
  and renews it itself.
- **Certificate issuance — the server talks to Let's Encrypt directly.** Ordering is an *outbound*
  call on 443. Only the ownership check arrives from outside, on port 80, and the gateway WAF passes
  `/.well-known/acme-challenge/` straight through to the origin.

Supporting components: a **management portal** behind institutional SSO that hands out install
scripts and collects status, and a **tracer** on each server that reports what version it's running
and when its certificate expires.

## How issuance works

![Certificate issuance and renewal — communication sequence](/projects/kaist-cert-flow-sequence-en.png)

1. **Fetch the installer** — the admin runs one command; the portal returns the script and an
   enrollment token.
2. **Generate the key** — created on the server and kept there. It never leaves the host, and the
   portal never sees it.
3. **Order and prove** — the server orders from Let's Encrypt, serves the challenge token under
   `/.well-known/acme-challenge/`, and Let's Encrypt validates it over port 80 through the WAF.
4. **Install and schedule** — certificate installed, service reloaded, renewal timer registered.

Steps 1–2 run only when a server is rebuilt. Steps 3–4 repeat on their own, 30 days before expiry.

## Communication ports

| From | To | Port | Purpose |
| --- | --- | --- | --- |
| User | Gateway WAF | 443 | Service |
| Gateway WAF | Data-center WAF | 443 | Forwarding |
| WAF | Origin web server | 443 | Re-encryption |
| Let's Encrypt | Gateway WAF | 80 | Ownership validation |
| Gateway WAF | Origin web server | 80 | Challenge passthrough |
| Web server | Let's Encrypt | 443 | Issuance / renewal |
| Web server | Public DNS | 53 | Name resolution |
| Web server | Management portal | 443 | tracer report |
| Web server | NTP | 123 | Time sync |
| Admin | Management portal | 443 | SSO · dashboard |

## Watching the thing that renews

Automation that silently stops is worse than no automation, because everyone assumes it's still
working. The portal can't reach into servers, so the fleet has to be observable from the outside:

- Each report carries its **version**, so the portal knows what's actually deployed where.
- A tracer that goes **10 days without reporting** (against a weekly schedule) is marked **stale**.
- That fires while the certificate is still valid — catching the *renewer* failing weeks before the
  certificate would have expired.

## Design choices

- **HTTP-01 over DNS-01** as the default: it needs no DNS credentials on the server and no delegation,
  which keeps the install script something a non-specialist can run and read. The cost is real —
  the domain must be reachable from the internet on port 80, and wildcards aren't possible — so
  internal-only services stay on DNS-01 as the exception rather than the rule.
- **Private key generated on the server, never transmitted.** The portal manages *state*, not secrets;
  compromising it does not compromise any service's key.
- **NTP as a dependency, not an assumption.** ACME is timestamp-sensitive, and clock drift produces
  failures that look like everything except a clock problem.

## Since then: from installer to observability

After the first server was enrolled, nearly every improvement had the same shape: **finding things
that were failing but didn't look like failures**. tracer reported success when certbot failed;
servers behind the WAF were counted as "someone else's certificate"; a renewal succeeded while the
web server kept serving the old one. All of these run with clean logs until the expiry date.

So the certificate is now **read in four places and compared by fingerprint**: two reported by
tracer (the issued certificate, and the file the web server config points to) and two observed by
the portal from outside (via the domain, and directly at the server's address). That comparison
finally separates "the front end terminates TLS (fine)" from "renewed but not served (act now)".

Since there's no way into these servers, **tracer updates itself**. The weekly request also carries
the latest version; the swap is hash-checked, test-run, atomic, and guarded by a fleet-wide kill
switch. If any step fails, the weekly renewal still runs. Failures are reported in sentences an
operator can act on, and a `check` pre-flight tests the challenge path without spending Let's
Encrypt's failure quota.

## Servers that can't open port 80: DNS-01 delegation

Plenty of servers can't expose port 80. What blocks automation isn't "internal-only", it's the
validation method. The institutional zone gets **one permanent CNAME per host**; the per-renewal
TXT is written only to a **dedicated delegated subzone**. Only the portal holds DNS write
credentials, and it writes only after checking the name belongs to that tracer, so DNS credentials
never get scattered across dozens of servers.

This is opt-in, not a migration. DNS-01 puts the portal on every renewal's critical path, so HTTP-01
stays the default and DNS-01 is reserved for servers that can open no ports at all, and for Windows.
Internet queries end at a single dedicated nameserver in the DMZ and never reach the internal
network. (tracer support shipped; production rollout pending.)

## Windows

On Windows the hard part comes after issuance: the certificate store, the IIS binding, and the app
pool's private-key ACL, repeated on every renewal. I didn't rebuild that; it's delegated to
**simple-acme**, and what I wrote is the same thin wrapper tracer is around certbot, plus the same
report format. Same portal, same verdict rules. (Awaiting validation on real hardware.)

## Security, by consent, while we're there

The only moment the security team can touch a server is when its operator runs the install command.
So the command comes in three scopes, A (certificate + check + hardening), B (certificate + check)
and C (certificate only), and **the command you run is the scope you consent to**. Checks are the
items from KISA's critical-infrastructure vulnerability assessment guide that can be judged from a
remote report (SSH settings, brute-force protection, firewall, open ports, OS end-of-life, shared
private keys, legacy TLS). Configuration changes happen only during that attended run,
preview-first and reversible with one line. Weekly runs only read, and the portal sends tracer the
**name** of a known action, never a command string, so the central server never becomes a way to
take over the fleet.

## Asset visibility

Upload the ~2,500 registered domains and the portal narrows them stage by stage (resolves, responds,
on-campus HTTPS, owned by the security team), recording why each one dropped out and diffing against
the previous upload. A quarterly spreadsheet exercise became an automatic one, and it quantifies
what must move to automatic renewal before lifetimes shrink to 100 days (Mar 2027) and 47 days
(Mar 2029).

## Where it stands (Nov 2026)

- **73** servers / **86** domains enrolled; 54 report weekly
- **50,000+** external checks since August; **109** confirmed automatic renewals
- **Zero** issued certificates expired or within 30 days of expiry
- No license cost versus commercial alternatives. Built solo with an AI coding agent (Claude):
  300+ commits, ~1,000 tests
- The remaining bottleneck is operators running the installer, not the technology.
