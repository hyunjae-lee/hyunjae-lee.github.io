---
title: Delay-Aware V2X Safe Communications
description: Prototyped low-latency, deterministic V2X messaging on a Linux real-time kernel and benchmarked latency for safety-critical vehicle communication.
date: 2019-02-01
tags: [Real-Time Systems, C, Networking, V2X]
repo: https://github.com/nicesick/Prototyping-Delay-Aware-V2X-Safe-Communications
featured: true
draft: false
---

## Overview

In V2X (vehicle-to-everything) safety communication, a late message is as dangerous as a lost
one — determinism matters as much as throughput. This project prototypes delay-aware messaging
and rigorously benchmarks end-to-end latency under different operating-system scheduling
configurations.

## What I built

- Implemented a **client/server messaging prototype in C over raw Ethernet frames** (MAC-level),
  timestamping each message to cleanly separate **network latency** from processing time.
- Benchmarked latency across a **Linux real-time (PREEMPT_RT) kernel vs a voluntary-preemption
  kernel**, sweeping packet sizes, scheduling priorities, and CPU contention (Hackbench).

## Findings

- The real-time kernel delivered roughly **5–10× lower and far more deterministic latency** than
  the voluntary kernel.
- Determinism held even at greater distance and through obstacles — the latency spikes stayed
  bounded, confirming suitability for safety-critical V2X.

## Stack

C · Linux real-time kernel · raw sockets · Makefile · Python/HTML for analysis.
