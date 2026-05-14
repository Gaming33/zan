# JD Cleaning And Matching

Use this reference in Stage 1 before generating any case-role demos.

## Raw Input Rule

The user may provide raw jobhunting / Boss exports without manual cleanup. Accept `.xlsx`, `.csv`, `.txt`, `.md`, `.json`, or pasted mixed notes under `inputs/jd_raw/`.

If an Excel workbook is present, inspect sheet names first. For the current Boss export shape, prefer the `Data` sheet.

## Required Fields

When present, use these columns exactly:

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

Do not confuse `职位` with `招聘者职位`. `招聘者职位` is the recruiter title and should not be used as the job title.

## Cleaning Rules

1. Keep source row identifiers for audit.
2. Drop fully empty rows.
3. Hard-dedupe by `职位访问地址` when present.
4. Hard-dedupe by `职位自编号` when present.
5. Soft-dedupe by `职位 + 公司 + 地区 + 最低薪资 + 最高薪资`.
6. Preserve one representative row and record duplicate count.
7. Normalize salary into a readable range such as `50-80K`, but keep original numeric values.
8. Treat salary as market calibration only, never as a Zuoan promise.

## Quality Filter

Prefer JD records that satisfy at least two:

- high salary for the role family
- clear AI / data / product / algorithm / growth responsibilities
- senior ownership wording such as 负责人、总监、专家、架构师、Lead、Head
- strong company signal: large tech company, AI company, industry leader, listed company, strong vertical player
- concrete business scenario, not generic AI enthusiasm

Down-rank:

- internship, campus hiring, junior execution roles
- pure sales roles without delivery or product ownership
- recruiter / HR jobs unless the target is HRTech or RPO
- vague descriptions without concrete responsibilities
- obviously irrelevant keyword hits

## Matching Method

Match each cleaned JD to demo targets using scoring, not keyword hit alone.

Recommended score out of 10:

- 0-3: semantic fit to target business problem
- 0-2: role seniority and ownership
- 0-2: AI / technical / data relevance
- 0-2: company quality and market signal
- 0-1: salary signal

Only include records scoring 6+ in a target shortlist unless the target has very few matches. For weak matches, mark `弱匹配` and explain why.

Each selected JD must include a reason:

```text
Selected because this JD defines [capability] for [business scenario], which helps calibrate the talent profile for [target].
```

## Stage 1 Output Contract

Write exactly one report:

```text
outputs/jd_matching_report.md
```

Required sections:

```markdown
# JD Matching Report

## Preflight
- Raw files read:
- Sheets read:
- Reference files read:

## Data Overview
- Raw row count:
- Clean row count:
- Hard duplicates removed:
- Soft duplicates removed:
- Main companies:
- Main role families:
- Salary distribution:

## Target Matching Summary

### Demo 01: [target name]
- Teacher mapping:
- Match strength: strong / medium / weak
- Recommended JD records:
  1. Role | Company | Salary | City | Score
     - Matching reason:
     - Talent keywords:
     - Useful JD language:
- Talent profile takeaways:
- Gaps:

## Global Gaps
- Targets lacking strong JD evidence:
- Suggested extra searches:
```

Do not paste full JD descriptions into the report. Summarize the evidence and keep source row IDs / URLs for traceability.
