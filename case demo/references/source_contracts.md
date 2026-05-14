# Source Contracts

Use this file before updating assets or run outputs.

## Folder Roles

```text
inputs/
  cases_raw/       raw or incremental teacher-style case notes
  jd_raw/          raw Boss/jobhunting JD exports

references/        stable instructions and style references for the agent

data/              reusable assets updated across runs
  taxonomy_map.json
  cases_row/teacher_case_rows.jsonl
  case_index.md
  cleaned_jd_pool.md
  rejected_jd_log.md
  role_language_bank.md

outputs/
  runs/            final demo run folders
  _archive/        obsolete or superseded analysis artifacts
```

## Source Priority

1. Teacher enterprise cases define business facts.
2. `data/taxonomy_map.json` defines the canonical industry/capability values and teacher-cluster mapping.
3. `data/cases_row/teacher_case_rows.jsonl` is the reusable upstream row asset.
4. `data/case_index.md` is the active case asset once populated.
5. Cleaned JD assets define role/talent language only.
6. Teacher old role list is optional calibration and should not become a permanent role index.
7. BTG references define writing shape only.

## Taxonomy Map Contract

`data/taxonomy_map.json` is the machine-readable taxonomy source for the case-demo workflow.

It must contain:

- `industries`
- `capabilities`
- `teacher_cluster_mapping`
- optional `demo_seed_overrides`
- `rules`

Do not change the canonical `industries` or `capabilities` lists during a generation run. If a case does not fit, write the proposal to the run's `taxonomy_change_proposals.md`.

## Case Index Contract

`data/case_index.md` should be updated incrementally.

Required fields:

- `case_id`
- `original_enterprise_name_internal`
- `public_client_profile`
- `industry_filter`
- `primary_function_filter`
- `secondary_function_filters`
- `source_case_summary`
- `pain_or_opportunity`
- `ai_or_digital_scenario`
- `sensitivity_risk`
- `demo_suitability`
- `evidence_notes`
- `open_questions`

Original enterprise names are internal alignment data only. Do not place them in final public demo prose.

## Row Asset Contract

`data/cases_row/teacher_case_rows.jsonl` is the upstream facts table extracted from the teacher enterprise-case document.

It should be updated only when the source material changes, not on every demo run.

Each row should map a source case cluster to one or more demo seeds and one or more filter hints.

## Run Output Contract

Every final generation run should create one folder:

```text
outputs/runs/YYYYMMDD-HHMM-[scope]/
```

Recommended files:

- `demo_index.md`: selected cases and their tags
- `case_demos/`: final case-role demo markdown files
- `run_summary.md`: what was generated, reused, and skipped
- `weak_evidence.md`: weak JD support, unclear facts, and suggested collection targets
- `taxonomy_change_proposals.md`: only when needed

Do not overwrite prior run folders.

## Archive Rule

Move obsolete analysis artifacts to `outputs/_archive/` when they no longer represent the active workflow. Do not use archived files as primary inputs unless the user explicitly asks to revisit an older pass.
