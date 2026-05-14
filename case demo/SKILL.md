---
name: zuoan-case-demo
description: Generate Zuoan case-role demos from teacher enterprise cases, BTG-style case patterns, and raw Boss/JD data. Use when working inside the local `case demo` folder to produce anonymized public case demos and matching project-based/fractional-expert role demos.
---

# Case Demo Skill

Use this folder only for the Zuoan case-demo workflow. Do not edit sibling project folders.

## Scope

Work only inside `case demo/`.

Do not edit:

- `docs/`
- `fronted/`
- `PROJECT_PROGRESS.md`
- `PARALLEL_PAGE_WORKFLOW.md`

## Goal

Produce demo materials from teacher-provided enterprise cases through a two-stage workflow:

1. Clean and match raw JD data to teacher case targets.
2. Generate BTG-style public case demos and matching project-based / fractional-expert role demos.

The first batch should cover 10-20 case-role pairs. Generate a small batch first, review quality, then scale.

## Inputs

Teacher source documents live outside this folder and are read-only:

- `C:\Users\Leo\Downloads\50家企业案例+++AI提效.docx`
- `C:\Users\Leo\Downloads\岗位清单.docx`
- `C:\Users\Leo\Downloads\企业用户10大核心问题官方回复.docx`
- `C:\Users\Leo\Downloads\关于左安（官网措辞）.docx`

Manual JD inputs should be placed by the user under:

- `case demo/inputs/jd_raw/`

JD inputs may be raw and messy. Accept Markdown, TXT, JSON, pasted jobhunting output, copied Boss job pages, or mixed notes. The user does not need to summarize or normalize them. The agent must clean, extract, and summarize JD language.

Reference files for agents:

- `case demo/references/case_targets_and_jd_brief.md`
- `case demo/references/btg_case_patterns.md`
- `case demo/references/btg_case_examples.md`
- `case demo/references/jd_cleaning_and_matching.md`
- `case demo/references/teacher_case_mapping.md`

Outputs should go under:

- `case demo/outputs/`

## Workflow

### Stage 1: JD cleaning and matching

Run this stage when raw JD files exist under `inputs/jd_raw/`, especially `.xlsx` exports.

1. Confirm scope is limited to `case demo/`.
2. Read this `SKILL.md`.
3. Read `references/case_targets_and_jd_brief.md`.
4. Read `references/teacher_case_mapping.md`.
5. Read `references/jd_cleaning_and_matching.md`.
6. Inspect `inputs/jd_raw/` and list raw input files.
7. Clean and deduplicate raw JD records.
8. Match JD records to demo targets using explicit scoring and reasons.
9. Save `outputs/jd_matching_report.md`.

Do not generate final case-role demos during Stage 1 unless the user explicitly asks.

### Stage 2: Case-role demo generation

Run this stage after `outputs/jd_matching_report.md` exists, or when the user explicitly asks to generate demos.

1. Confirm scope is limited to `case demo/`.
2. Read this `SKILL.md`.
3. Read `references/case_targets_and_jd_brief.md`.
4. Read `references/btg_case_patterns.md`.
5. Read `references/btg_case_examples.md`.
6. Read `references/teacher_case_mapping.md`.
7. Read `outputs/jd_matching_report.md` if available.
8. Read teacher source documents as read-only context.
9. Convert the raw case into a private analysis card.
10. Use matched JD evidence to calibrate talent profile.
11. Generate one public case demo.
12. Generate one matching role demo.
13. Save the pair into `outputs/`.

## Case Demo Contract

Each public case demo must include:

- public title
- anonymized industry profile
- business problem
- why normal hiring / consulting is too slow or too heavy
- expert profile Zuoan should match
- 90-day work plan
- matching role title

Rules:

- Do not expose the original enterprise name.
- Do not claim Zuoan served a public substitute company.
- Do not invent performance numbers.
- Do not copy BTG wording.
- Do not copy Boss JD wording.
- Use concrete business language, not abstract AI-consulting slogans.

## Role Demo Contract

Each role demo must include:

- social title
- formal role name
- business scenario
- problems to solve
- 90-day tasks
- professional requirements
- AI requirements
- preferred backgrounds
- JD language calibration summary

Rules:

- The role must solve a specific business problem.
- Professional experience is the base; AI ability is the leverage.
- Default cooperation mode is project-based / fractional expert.
- Salary from JD references is market calibration only, not a Zuoan promise.

## Output Naming

Use stable names:

```text
outputs/demo-01-smart-agriculture.md
outputs/demo-02-ai-private-deployment.md
...
```

If JD inputs are missing, mark the role section as `JD待补充` and still produce the case analysis.

## Preflight Checklist

Before writing outputs, state:

- stage to run
- demo IDs to process
- teacher files read
- reference files read
- JD raw files found
- outputs planned

If a requested demo has no JD input, continue and mark `JD待补充`.

## Done Criteria

Stage 1 is complete only when:

- `outputs/jd_matching_report.md` exists
- raw JD row count, deduped row count, and duplicate logic are reported
- each requested demo target has matched JD candidates or an explicit gap note
- each JD candidate has a matching reason, not just a keyword hit
- no files outside `case demo/` are modified

Stage 2 is complete only when:

- all requested demo files are saved under `outputs/`
- each file has `Case Demo`, `Role Demo`, `JD Calibration`, and `Sensitivity Notes`
- missing JD inputs are explicitly marked
- original enterprise names are not exposed in public case sections
- no files outside `case demo/` are modified
