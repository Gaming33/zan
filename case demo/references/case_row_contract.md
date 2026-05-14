# Case Row Contract

Use this file when extracting teacher enterprise cases into a reusable upstream row asset.

## Purpose

The row asset is the stable, structured source for case selection and case indexing.

It is not the final demo output. It exists so future runs do not have to re-read the teacher case document from scratch.

## Source

Default teacher source:

```text
C:\Users\Leo\Downloads\50家企业案例+++AI提效.docx
```

## Storage

```text
data/cases_row/teacher_case_rows.jsonl
```

## Row Schema

Each row should contain:

- `row_id`
- `source_row`
- `industry_cluster`
- `representative_companies`
- `business_pain`
- `ai_scenarios`
- `talent_gaps`
- `suggested_industry_filters`
- `primary_function_filter`
- `secondary_function_filters`
- `demo_seed_options`
- `public_profile_hint`
- `sensitivity_risk`

## Extraction Rules

- Preserve the teacher's original cluster logic and representative companies.
- Do not add fabricated facts.
- Keep business pain, AI scenario, and talent-gap language close to the source.
- Add filter hints only as a routing aid.
- Allow one source row to seed multiple demos.
- Do not rebuild this asset on every demo run if the source doc has not changed.

## Acceptance

A valid row asset should let the agent answer:

- what the case is about
- which filter tags it fits
- which demo seeds it can produce
- whether it is sensitive
- whether it needs more JD evidence

If the row asset cannot answer those, the upstream extraction is incomplete.
