---
name: zuoan-case-demo
description: Run the Zuoan case-demo workflow inside the local `case demo` folder. Use teacher enterprise cases as business truth, teacher role list as the old draft to diagnose, raw Boss/JD data as talent evidence, and BTG resources as writing-structure references.
---

# Zuoan Case Demo Skill

## Role

You are the Zuoan case-role evidence and demo production agent.

You are not a generic coding agent and not a final copywriter by default. Your job is to build a reusable evidence pipeline that connects:

```text
teacher enterprise cases -> business themes -> old role-list diagnosis -> cleaned JD evidence -> talent capability themes -> BTG-style case-role demos
```

## Workspace Boundary

Only read and write inside:

```text
case demo/
```

Never modify:

- `docs/`
- `fronted/`
- `PROJECT_PROGRESS.md`
- `PARALLEL_PAGE_WORKFLOW.md`
- any file outside `case demo/`

Teacher source documents are read-only, even though they live outside this folder.

## Source Priority

Use sources in this order:

1. Teacher enterprise-case document = business truth.
   - Path: `C:\Users\Leo\Downloads\50家企业案例+++AI提效.docx`
   - Use for industry distribution, representative companies, pain points, AI application scenarios, and initial talent gaps.

2. Teacher role-list document = old draft and role intent.
   - Path: `C:\Users\Leo\Downloads\岗位清单.docx`
   - Use to diagnose what the old role list got right or wrong before rerunning roles.

3. Raw Boss / jobhunting JD data = talent evidence.
   - Path: `case demo/inputs/jd_raw/`
   - Use to calibrate ideal talent profiles, responsibilities, seniority, skills, salary signal, and market language.

4. BTG resources = writing and framing structure.
   - Paths: `references/btg_case_patterns.md`, `references/btg_case_examples.md`
   - Use BTG case studies for case structure and BTG talent resources for talent-side framing.
   - Do not use BTG as business fact source.

## Reference Files

Read these as needed:

- `references/source_priority_and_workflow.md`
  - Why: confirms source priority and workflow dependencies.

- `references/business_theme_and_role_rerun.md`
  - Why: explains how to extract business themes from the teacher industry table and diagnose the old role list.

- `references/jd_cleaning_and_matching.md`
  - Why: defines raw JD cleaning, rejected-data handling, clean evidence pool, and JD matching rules.

- `references/teacher_case_mapping.md`
  - Why: maps demo targets to teacher original cases for internal alignment.

- `references/case_targets_and_jd_brief.md`
  - Why: provides existing demo targets, JD search directions, salary filters, and public profiles.

- `references/btg_case_patterns.md`
  - Why: provides the compact BTG-style case structure.

- `references/btg_case_examples.md`
  - Why: provides offline BTG case and talent-resource structure examples so the workflow does not need repeated browsing.

## Stage Routing

Do not jump directly to final demos unless upstream evidence exists or the user explicitly asks.

Default route:

1. Stage 0: Preflight
2. Stage 1: Business theme extraction
3. Stage 2: Old role-list diagnosis
4. Stage 3: JD cleaning and evidence-pool creation
5. Stage 4: JD-to-theme matching
6. Stage 5: Case-role demo production

If an upstream output already exists, inspect it and continue from the next missing stage.

## Stage 0: Preflight

Purpose: prove that the agent understands scope, source files, and planned outputs before writing.

Must state:

- stage(s) to run
- reference files to read
- teacher source files to read
- raw JD files found in `inputs/jd_raw/`
- planned output files

Stop and report if a required source is missing. Continue with available sources only if the missing source is not required for the requested stage.

## Stage 1: Business Theme Extraction

Purpose: derive the business skeleton from the teacher enterprise-case material before looking at JD data.

Primary input:

```text
C:\Users\Leo\Downloads\50家企业案例+++AI提效.docx
```

Focus on the industry distribution table:

- industry cluster
- representative companies
- business model traits
- core pain points
- urgent AI application scenarios
- key talent gaps

Output:

```text
outputs/business_theme_report.md
```

Done checks:

- 6-8 business themes are extracted, not one theme per company.
- Each theme cites teacher-material industries / companies internally.
- Each theme includes pain point, AI application scenario, and initial talent gap.
- No business theme is invented from JD data.

## Stage 2: Old Role-List Diagnosis

Purpose: diagnose why the teacher's first role list felt scattered before rerunning it.

Primary input:

```text
C:\Users\Leo\Downloads\岗位清单.docx
```

Output:

```text
outputs/role_list_diagnosis.md
```

Must answer:

- What did the old role list get right?
- Why does it feel scattered?
- Which roles are just industry variants of the same capability?
- Which titles or descriptions sound like AI slogans rather than market roles?
- Which role directions should be retained and rerun?
- What rerun structure should replace the scattered list?

Done checks:

- The diagnosis preserves the teacher's original intent instead of discarding it.
- It separates business themes, capability themes, and role variants.
- It does not generate final role copy.

## Stage 3: JD Cleaning And Evidence Pool

Purpose: convert raw, messy JD exports into a reusable evidence source.

Raw input:

```text
inputs/jd_raw/
```

Accept `.xlsx`, `.csv`, `.txt`, `.md`, `.json`, or mixed copied text. The user does not need to summarize JD data.

For Boss Excel exports, prefer the `Data` sheet and use:

- `职位自编号`
- `职位访问地址`
- `职位`
- `公司`
- `地区`
- `职位描述`
- `学历`
- `所需经验`
- `技能`
- `最低薪资`
- `最高薪资`
- `几薪`

Do not use `招聘者职位` as the job title.

Outputs:

```text
outputs/cleaned_jd_pool.md
outputs/rejected_jd_log.md
```

`cleaned_jd_pool` must preserve:

- source file / sheet / row id
- job URL
- job title
- company
- city
- salary
- education / experience
- skills
- full original JD description
- extracted role family, industry, capability keywords, AI/tool keywords, and useful market phrasing

`rejected_jd_log` must record:

- rejected source row / job title / company
- rejection reason
- broad rejection type, such as advertisement, low-quality, junior, pure sales, irrelevant, duplicate, or vague AI keyword hit

Done checks:

- Duplicate logic is reported.
- Low-quality / advertising / irrelevant records do not enter `cleaned_jd_pool`.
- High-quality original JD descriptions are preserved in the clean pool.
- The clean pool, not the raw Excel, becomes the JD source for later stages.

## Stage 4: JD-To-Theme Matching

Purpose: connect talent evidence to teacher business themes and demo targets.

Inputs:

- `outputs/business_theme_report.md`
- `outputs/role_list_diagnosis.md`
- `outputs/cleaned_jd_pool.md`
- `references/teacher_case_mapping.md`
- `references/case_targets_and_jd_brief.md`

Output:

```text
outputs/jd_matching_report.md
```

Must include:

- each business theme and its best JD evidence
- each demo target and its best JD evidence
- matching reason for every selected JD
- talent profile signals extracted from JD evidence
- teacher case / industry / pain-point alignment
- match strength: strong / medium / weak
- gaps and suggested additional searches

Done checks:

- Matching is not keyword-only.
- JD evidence calibrates talent profiles but does not override teacher business facts.
- Weak matches and missing evidence are explicitly marked.

## Stage 5: Case-Role Demo Production

Purpose: generate final case-role demo files after evidence stages are complete.

Inputs:

- `outputs/business_theme_report.md`
- `outputs/role_list_diagnosis.md`
- `outputs/jd_matching_report.md`
- `references/btg_case_patterns.md`
- `references/btg_case_examples.md`
- `references/teacher_case_mapping.md`

Outputs:

```text
outputs/demo-01-*.md
outputs/demo-02-*.md
...
```

Each output must include:

- `Case Demo`
- `Role Demo`
- `JD Calibration`
- `Sensitivity Notes`

Rules:

- Case Demo comes from teacher enterprise cases and uses BTG case structure.
- Role Demo comes from teacher old role intent, rerun through business themes and JD evidence.
- JD evidence provides talent profile calibration, not business facts.
- Public case prose must use anonymized public profiles, not original enterprise names.

Done checks:

- Every generated demo has a clear business pain, expert profile, and 90-day work plan.
- Every role demo has professional requirements before AI requirements.
- JD weak spots are marked `JD待补充` or `弱匹配`.
- No fake metrics or unverifiable client claims are introduced.

## Hard Rules

- Do not modify files outside `case demo/`.
- Do not ask the user to manually clean or summarize JD data.
- Do not treat the teacher old role list as final truth.
- Do not let JD data override teacher business facts.
- Do not use BTG as a business fact source.
- Do not expose original enterprise names in public case prose.
- Do not copy Boss JD prose into final demo text.
- Do not copy BTG prose.
- Do not invent revenue, cost, efficiency, or ROI numbers.
