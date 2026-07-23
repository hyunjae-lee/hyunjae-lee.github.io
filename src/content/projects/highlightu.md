---
title: HighlightU — Automatic Highlight Extraction for Live Streams
description: A web service that auto-extracts highlight clips from Twitch VODs by fusing NLP on chat logs with CNN-based facial-expression analysis.
date: 2019-12-19
tags: [Machine Learning, NLP, Computer Vision, Django]
repo: https://github.com/highlightu
featured: true
draft: false
---

## Overview

HighlightU lets Twitch streamers get highlight clips simply by uploading a broadcast.
The core idea: score **every second** of a video for how "interesting" it is, using two
independent signals — **chat-log analysis (NLP)** and **facial-expression analysis (computer
vision)** — then stitch the top-scoring moments into highlights. Built as a Django web app
with Google OAuth login, payments, and email delivery.

![HighlightU — basic service flow](/projects/highlightu-serviceflow.png)

## My role — Team Leader (Team LAJI, 3 members)

Led a three-person team and owned the highlight-extraction algorithm — designing how the two
AI signals were modeled, scored, and fused into a single per-second "interest" score.

## How it works

- **Chat-log analysis (NLP).** Twitch chat reflects how actively a streamer and viewers
  interact. Chat is tokenized with **NLTK** (English) and **KoNLPy** (Korean) and scored with a
  **TF-IDF** model, so bursts of meaningful interaction raise a moment's score.
- **Facial-expression analysis (CV).** A **self-trained ResNet** CNN classifies each frame into
  five facial expressions; strong emotion (e.g., laughter or anger) signals an interesting
  moment and lifts its score.
- **Fusion.** The two signals are combined per second to rank segments and select highlights.

## Engineering

- **Django** web application; **Google OAuth** for one-click sign-in.
- **Toss** integration for payments; **HTTPS** end-to-end.
- Dashboard, personal archive, and automated email notification when highlights are ready.

## Recognition

- **Bronze Prize — 2019 SW Challenge**, Korea Software Industry Association.
