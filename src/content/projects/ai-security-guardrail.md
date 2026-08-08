---
title: Watching a Prompt Attack Land, Then Watching It Get Stopped
description: A proof-of-concept that runs the same prompt down two paths at once — straight into the model, and through a guardrail — and streams both pipelines live, so the difference between "unprotected" and "defended" is something you can watch rather than argue about. (In progress)
date: 2026-08-07
tags: [AI Security, LLM, Prompt Injection, Guardrails, Python, Docker]
repo: https://github.com/hyunjae-lee/AI-Security-Guardrail
status: in-progress
featured: true
draft: false
---

## Overview

"We should put a guardrail in front of the LLM" is easy to say and hard to fund, because nobody in
the room has seen what happens without one. This PoC makes the argument visually: it takes a single
prompt and runs it down **two paths simultaneously** — one straight into the model, one through an
input/output guardrail — and streams each pipeline stage over **SSE** as it executes.

The unprotected path is a working demonstration of the failure: system prompts extracted, personal
data echoed back, credentials exfiltrated. The defended path shows exactly which stage caught it,
and why.

![Side-by-side run — the unprotected path leaks the system prompt; the canary token catches it on the defended path](/projects/ai-guardrail-demo.png)

> Status: **in progress** — a PoC, built to make the case for guardrails concrete.

## Defense in depth, demonstrated

The design point is that **one filter is not a guardrail**. Requests that the input pipeline misses
should still die on the way out:

- **Input pipeline** — blocks the request before it ever reaches the model.
- **Output pipeline** — inspects what the model produced. A prompt that talked its way past the
  input stage still gets stopped here.

The clearest example is the **canary token**: a unique marker planted in the system prompt. If it
appears in a response, the system prompt leaked — and unlike heuristic detection, that is a
**zero-false-positive** signal. It cannot be anything else.

## Input pipeline

| Stage | What it does |
| --- | --- |
| `normalizer` | Decodes base64/hex/URL and strips zero-width characters and homoglyphs, so later stages can't be bypassed by encoding |
| `anomaly` | Length bombs, repetition floods, mixed writing systems, forged conversation history |
| `secrets` | API keys, tokens, private keys, DB connection strings — detected and masked, with an entropy check to skip placeholders |
| `pii` | National ID, card numbers (checksum-validated), contacts, accounts, email — detected and masked |
| `injection` | Instruction override, role manipulation, system-prompt extraction, delimiter forgery — scored per technique, weighted when several are combined |
| `harmful` | Weapons, malware, intrusion, drugs. Scores only when intent to act meets a harmful topic, so defensive phrasing isn't punished |
| `rag_access` | **RAG clearance control** — filters the knowledge base at retrieval time by the requester's clearance level |
| `data_classifier` | **5-level data classification** — labels prompt sensitivity 1–5 and states what each level may send to an external AI |

## Output pipeline

| Stage | What it does |
| --- | --- |
| `canary` | A canary token from the system prompt appearing in the response proves a leak, with no false positives |
| `secrets_leak` / `pii_leak` | Credentials or personal data surfacing in the response |
| `exfil` | Data exfiltration through markdown images and links |
| `refusal_consistency` | Flags a model that failed to refuse a request the input stage scored as high-risk |

## Same question, different answer

The RAG clearance control is the part I find most useful to demonstrate. The knowledge base is
filtered **at retrieval**, by the requester's clearance — external/anonymous (CLR0), student (CLR1),
staff (CLR2), registrar (CLR3). Ask for another student's grades as CLR1 and the request dies at the
retrieval stage; the model never sees the data, so it cannot leak it.

![RAG clearance control — a student-level request for another student's records is blocked at retrieval](/projects/ai-guardrail-rag-clearance.png)

This is deliberately not a prompt-level defense. Telling a model "don't reveal other students'
grades" is a request; removing the rows before retrieval is a control.

## Scoring, and why it isn't a sum

Risk scoring uses **worst-item plus damped corroboration** rather than a straight sum, so a pile of
LOW findings can never outrank a single CRITICAL one. Summation is available as an option for
comparison against framework-style scoring. Three policy profiles — `strict` / `balanced` /
`permissive` — vary thresholds and the per-category block-versus-mask rules.

## Engineering

- **Python**, containerized; `docker compose up` and it runs. **SSE** drives the live stage
  animation.
- **Pluggable detectors.** A `Detector` protocol lets open-source engines join as adapters:
  **Microsoft Presidio** (spaCy NER for PII that regex misses, fully offline in the full image) and
  **NVIDIA NeMo Guardrails** (topic control and jailbreak self-check). Both are optional — the
  built-in detectors take over when the libraries are absent.
- **`POST /api/inspect`** runs the guardrail *without* calling a model, so the whole thing works as
  an embeddable gateway rather than only as a demo.
- **69 tests** — detector units, engine policy, API, and an evaluation pass over a labelled attack
  corpus. The same `attacks/samples.json` feeds both the demo presets and the evaluation.
- **CI/CD** — ruff → pytest → Docker build → container E2E smoke test on GitHub-hosted runners;
  deployment to a self-hosted runner on push to `main`, with a health check.

## What I took from it

Building the attacks was more instructive than building the filters. Encoding tricks, forged
conversation history, and markdown-link exfiltration all defeat a naive single-pass filter, and
watching them land is what makes the two-pipeline structure feel necessary rather than merely
thorough.
