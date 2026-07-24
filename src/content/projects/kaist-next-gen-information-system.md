---
title: Next-Generation Integrated Information System
description: A 3-year, ~USD 130M institution-wide program at KAIST — I analyzed and systematized the university's most rule-dense domain (curriculum, course registration, classes, graduation) from design through deployment. Recognized with a Special Commendation.
date: 2025-07-01
tags: [Enterprise Systems, System Integration, Academic Affairs, Business Rules, Deployment]
featured: true
draft: false
---

<!--
  Ordering: projects sort by `date`, newest first, on both /projects and the home
  page. To keep a project at the top, give it the most recent date.
  This is a starter you can rewrite — set `draft: true` to hide it while editing.
-->

## Overview

Over **three years**, KAIST ran an institution-wide program — approximately **USD 130M** — to
replace its aging administrative systems with a single next-generation integrated information
system. I was a **core working-level member for the academic domain**: curriculum, course
registration, classes, and graduation — arguably the most rule-dense part of a university, and
the part where a single wrong rule can block a student from graduating.

## How complex is KAIST's academic domain?

Before anything could be built, the rules had to be fully understood. KAIST's academics are
deceptively intricate:

### Curriculum (교과과정)

- Requirements differ by **admission year (catalog year)** — every student graduates under the
  rules in force when they enrolled, so **many rule versions coexist at once**.
- **Common vs. major-specific** requirements, layered with double majors, minors, and
  individually-designed majors — each with its own credit and course rules.
- Prerequisites, course equivalences, and substitutions, defined **independently by each
  department** (CS, EE, Mechanical, …). Across the institution this amounted to
  **1,400+ distinct graduation-requirement rules**.

### Course registration (수강신청)

- Enrollment must simultaneously enforce **prerequisites, credit limits, time conflicts, and
  per-course capacity**.
- Priority and quota rules vary by year and major; add/drop, retakes, and waitlists each mutate
  a student's record.
- Registration windows generate **intense, concurrent load** — where correctness and fairness
  can never be traded away for speed.

### Classes (수업)

- Sections, cross-listed and team-taught courses, and multiple grading schemes (letter, S/U,
  pass/fail).
- **Internships, special lectures (특강), and substitute courses (대체교과목)** may count toward
  requirements — but only under specific, policy-defined conditions.

### Graduation assessment (졸업사정)

- Every student's entire history must be checked against **their** catalog year's rules —
  automatically and correctly.
- Real cases are full of **exceptions**: substitutions, transferred credits, internship credit,
  and case-by-case approvals — plus thesis milestones (proposal, defense, external committees).

## Systematizing the complexity

Understanding the rules was half the work; the other half was turning them into a system the
whole university can trust:

- **Codified 1,400+ requirements** — common and major-specific — into a maintainable rule model
  on the next-generation platform, resolving long-standing policy–system mismatches.
- **Redesigned graduation-assessment logic**, including exception handling and the rules for
  internships, special lectures, and substitute courses, so real academic operations map exactly
  onto the system.
- **Improved thesis-review management** (proposal, defense, external committees), eliminating
  recurring errors.
- Safeguarded **registration and record integrity** across the enrollment lifecycle and the
  migration of years of academic data.

## Verification & deployment

Deeply involved in the module's design, I drove verification and testing against requirements and
edge cases, then saw it through **production deployment to a successful launch** — keeping
registration, grades, and graduation reliable throughout the transition.

## Impact

- Ran the transition-aligned graduation season **without disruption — 2,000+ graduations and
  degree conferrals**.
- Built new **degree certificate / name / number issuance**, improving academic-record accuracy
  and administrative trust while easing the load on partner departments.
- Recognized with a **Special Commendation from KAIST (2025)** for the build.
