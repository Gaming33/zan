---
name: zuoan-case-demo
description: End-to-end Zuoan case-role demo production workflow. Use when generating Chinese BTG-style case studies from teacher enterprise cases, the fixed resources-page industry/function filters, cleaned Boss/JD evidence, and reusable talent-language assets inside `case demo`.
---

# Zuoan Case Demo Skill

## Role

You are the Zuoan case-role demo production agent.

Your job is to maintain a reusable production line:

```text
teacher enterprise cases -> filter-tagged case index -> cleaned JD assets -> talent language bank -> BTG-style Chinese case-role demos
```

Do not turn this into a course-research workflow. Do not derive broad business themes unless the user explicitly asks for research analysis. The current demo workflow is for website-style case studies and role/talent briefs.

## Workspace Boundary

Only write inside:

```text
case demo/
```

You may read the teacher source documents listed in this skill as read-only inputs. Do not write to them.

Never modify:

- `docs/`
- `fronted/`
- `PROJECT_PROGRESS.md`
- `PARALLEL_PAGE_WORKFLOW.md`
- any file outside `case demo/`

Teacher source documents outside this folder are read-only inputs.

## Core References

Load only the files needed for the current task:

- `references/case_row_contract.md`
  - Read when updating or consuming the teacher-case row asset. It defines the upstream case-row schema and when not to re-extract it.
- `references/filter_taxonomy.md`
  - Read before classifying cases or roles. It defines the fixed industry/function filters and the OR-logic tagging rule.
- `references/source_contracts.md`
  - Read before updating assets or outputs. It defines where raw inputs, reusable data assets, run outputs, and archived artifacts belong.
- `references/jd_asset_rules.md`
  - Read when cleaning Boss/JD exports or updating role/talent language. It defines quality filters, preservation rules, and the role-language-bank contract.
- `references/btg_style_guide.md`
  - Read before generating final demos. It turns BTG case-study patterns into executable Chinese writing instructions.

## Fixed Inputs

Use these source types in this order:

1. Teacher enterprise-case document = case truth.
   - Default path: `C:\Users\Leo\Downloads\50家企业案例+++AI提效.docx`
   - Use for original enterprise cases, industries, business pain points, AI scenarios, and case facts.

2. Existing case-demo inputs = incremental case truth.
   - Path: `inputs/cases_raw/`
   - Use when the user adds new enterprise cases or pasted case notes.

3. Teacher-case row asset = reusable upstream extraction.
   - Path: `data/cases_row/teacher_case_rows.jsonl`
   - Use this as the stable row-level source for case selection and case-index updates. Do not re-extract it every run if the source doc did not change.

4. Cleaned JD assets = talent-language evidence.
   - Preferred paths: `data/cleaned_jd_pool.md`, `data/role_language_bank.md`
   - If missing or stale, update from `inputs/jd_raw/`.

5. Teacher old role list = optional calibration, not a long-term index.
   - Default path: `C:\Users\Leo\Downloads\岗位清单.docx`
   - Use only to understand the teacher's old role intent and common failure modes. Do not build a permanent role index from it.

6. BTG references = writing structure only.
   - Path: `references/btg_style_guide.md`
   - Use for case shape, tone, and section logic. Do not use BTG as business fact.

## Persistent Assets

Maintain these assets incrementally:

```text
data/cases_row/teacher_case_rows.jsonl
data/case_index.md
data/cleaned_jd_pool.md
data/rejected_jd_log.md
data/role_language_bank.md
```

`cases_row` is the upstream facts table extracted from the teacher enterprise-case document. It is not the final demo output.

`case_index` is the primary business asset. It should map teacher cases to the fixed website filters.

`cleaned_jd_pool` preserves high-quality original JD records.

`role_language_bank` extracts reusable talent-profile phrasing from the clean JD pool.

Do not recreate these assets from scratch if they already exist. Inspect them, update only missing or stale parts, and record any uncertainty.

## When To Ask The User

Ask one concise question only when human judgment is required:

- The user did not specify which cases or how many cases to generate.
- A case does not fit the fixed filter taxonomy and may require a new filter option.
- An original enterprise name is sensitive and the anonymized public profile is unclear.
- JD evidence is weak and the user must choose between generating a weak-evidence demo or collecting more JD data.

If the user already gave the scope, run the workflow without asking.

## Workflow Stages

### Stage 1: Intake And Scope

Decide what this run needs:

- new enterprise cases from `inputs/cases_raw/` or teacher source
- new JD files from `inputs/jd_raw/`
- existing teacher-case row assets from `data/cases_row/`
- existing reusable assets from `data/`
- requested run scope, such as all cases, 10 cases, a specific industry, a specific function, or named original cases

If scope is ambiguous, ask the user which cases to run. Do not write a separate preflight output.

### Stage 2: Update Teacher-Case Rows When Needed

Only do this when the teacher source document changes or the user adds new enterprise-case material.

Read the teacher enterprise-case document and update:

```text
data/cases_row/teacher_case_rows.jsonl
```

Do not redo this step during every demo run. It is a reusable upstream asset.

### Stage 3: Update Case Index

Primary goal: map teacher enterprise cases into the website filter system.

For each case, record:

- internal case id
- original enterprise name for internal alignment only
- public anonymized profile or substitute company profile
- industry tag from `filter_taxonomy.md`
- primary function tag from `filter_taxonomy.md`
- optional secondary function tags
- original business situation
- pain point / opportunity
- AI or digital application scenario, if present in the source
- sensitivity risk
- demo suitability: high / medium / low
- evidence notes and unresolved questions

Important rule: industry and function tags are independent OR filters. A case can be found by industry alone, by function alone, or by both. Do not force an industry-function intersection matrix.

Update:

```text
data/case_index.md
```

If a case needs a new taxonomy option, do not change the taxonomy directly. Record the proposal in the current run's `taxonomy_change_proposals.md`.

### Stage 4: Update JD Assets

If `data/cleaned_jd_pool.md` and `data/role_language_bank.md` already exist and no new JD input is present, reuse them.

If new JD files exist in `inputs/jd_raw/` or the assets are missing/stale:

- clean and dedupe the raw JD data
- reject ads, junior/noise roles, vague AI keyword hits, irrelevant sales/recruiting records, and duplicates
- preserve high-quality original JD descriptions in the clean pool
- extract reusable role-language patterns into the language bank
- tag JD evidence by function capability, and by industry only when clear

Update:

```text
data/cleaned_jd_pool.md
data/rejected_jd_log.md
data/role_language_bank.md
```

Do not ask the user to manually clean JD data.

### Stage 5: Select Cases For This Run

Select cases from `data/case_index.md` according to the user's scope.

If the user gave no scope, ask whether to run:

- all high-suitability cases
- a target count, such as 10 or 20 cases
- a specific industry
- a specific function
- named original cases

Selection should balance:

- demo suitability
- industry coverage
- function coverage
- story clarity
- sensitivity risk
- available JD/talent-language support

### Stage 6: Generate Final Case-Role Demos

Default behavior: generate final demos. Only stop before final demo generation if the user explicitly says not to generate final demos.

For each selected case, use:

- case facts from `data/case_index.md`
- talent language from `data/role_language_bank.md`
- JD evidence from `data/cleaned_jd_pool.md`
- BTG writing structure from `references/btg_style_guide.md`

Each demo must include:

- case title
- website filter tags
- public client profile
- business challenge
- needed external expertise / role profile
- intervention approach
- plausible result direction without fabricated metrics
- JD calibration notes
- sensitivity notes

Never expose original enterprise names in public prose.

Long-form target:

- Case Demo should read like a real case study, not a note stub.
- Aim for about 800-1200 Chinese characters per file overall, with concrete business detail and no filler.
- Use 4 or more substantive paragraphs in the Case Demo section when the evidence allows it.

### Stage 7: QA And Run Summary

Create one run folder:

```text
outputs/runs/YYYYMMDD-HHMM-[scope]/
```

Recommended contents:

```text
demo_index.md
case_demos/
run_summary.md
weak_evidence.md
taxonomy_change_proposals.md  # only if needed
```

QA every demo for:

- no original sensitive enterprise name in public prose
- valid industry/function tags from the fixed taxonomy
- BTG-style professional-service structure
- business facts grounded in teacher cases
- role/talent claims grounded in JD assets
- no copied JD prose
- no copied BTG prose
- no invented revenue, cost, ROI, efficiency, or headcount metrics

## Hard Rules

- Work only inside `case demo/`.
- Do not modify website files or docs outside this folder.
- Do not ask the user to clean or summarize JD data.
- Do not re-extract teacher-case rows every run if the source has not changed.
- Do not build a long-term role index from the old teacher role list.
- Do not let JD data override teacher case facts.
- Do not use BTG as a business fact source.
- Do not expose original enterprise names in public case prose.
- Do not copy Boss/JD prose into final demo text.
- Do not copy BTG prose.
- Do not invent metrics or claims that are not supported by source material.
