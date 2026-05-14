# JD Cleaning And Matching

Use this reference for Stage 3 and Stage 4.

## Goal

Turn raw jobhunting / Boss data into a clean evidence pool. The clean pool must keep high-quality original JD descriptions, filter out low-value records, and support later matching to teacher business themes.

## Input Rule

Accept raw files under:

```text
inputs/jd_raw/
```

Supported shapes:

- `.xlsx`
- `.csv`
- `.txt`
- `.md`
- `.json`
- copied mixed notes

The user does not need to summarize or normalize these files.

## Excel Rule

If an Excel workbook is present, inspect sheet names first. For the current Boss export shape, prefer `Data`.

Use these columns when present:

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

Do not confuse `职位` with `招聘者职位`. `招聘者职位` is the recruiter title.

## Deduping

Apply in this order:

1. Hard-dedupe by `职位访问地址`.
2. Hard-dedupe by `职位自编号`.
3. Soft-dedupe by `职位 + 公司 + 地区 + 最低薪资 + 最高薪资`.

Keep one representative row and record duplicate counts.

## Rejection Rules

Do not allow low-value records into `cleaned_jd_pool`.

Reject or down-rank:

- obvious advertisements,招商, franchise, training, traffic bait
- internship, campus hiring, junior execution roles
- pure sales roles without delivery / product / expert capability
- recruiter or HR jobs unless the theme is HRTech / RPO
- vague descriptions with AI keywords but no concrete responsibilities
- irrelevant keyword hits
- duplicate records
- salary or title obviously inconsistent with high-quality expert profile

Write rejected records to:

```text
outputs/rejected_jd_log.md
```

Do not silently drop them.

## Quality Signals

Prefer JD records with:

- large tech company, AI company, listed company, industry leader, or strong vertical company signal
- high salary for the role family
- senior ownership wording: 负责人、总监、专家、架构师、Lead、Head
- concrete AI / data / product / algorithm / growth responsibility
- clear business scenario
- evidence of delivery, architecture, productization, growth ownership, or team leadership

## Cleaned Pool Output

Write:

```text
outputs/cleaned_jd_pool.md
```

or, if structured output is better:

```text
outputs/cleaned_jd_pool.json
```

Each retained JD must preserve:

- source file
- sheet name when applicable
- source row id
- job URL
- role title
- company
- city
- salary raw values
- normalized salary range
- education
- experience
- skills
- full original JD description
- company type
- likely industry
- role family
- seniority
- business scenario
- responsibility keywords
- capability keywords
- AI / tool / technical keywords
- useful market phrasing
- quality score

## Matching Method

Match clean JD records to business themes and demo targets.

Use source priority:

1. `outputs/business_theme_report.md`
2. `outputs/role_list_diagnosis.md`
3. `references/teacher_case_mapping.md`
4. `references/case_targets_and_jd_brief.md`

Score out of 10:

- 0-3: fit to teacher business pain / theme
- 0-2: role seniority and ownership
- 0-2: AI / technical / data relevance
- 0-2: company quality and market signal
- 0-1: salary signal

Only include 6+ matches by default. If a target has no strong matches, include weak matches only with `弱匹配` and explain.

## Matching Report Output

Write:

```text
outputs/jd_matching_report.md
```

Required sections:

```markdown
# JD Matching Report

## Preflight
- Raw files read:
- Clean pool used:
- References read:

## Data Overview
- Raw row count:
- Clean row count:
- Rejected row count:
- Hard duplicates removed:
- Soft duplicates removed:
- Main companies:
- Main role families:
- Salary distribution:

## Business Theme Matching

### [Theme Name]
- Teacher source:
- Best JD evidence:
- Talent capability signals:
- Match strength:
- Gaps:

## Demo Target Matching

### Demo 01: [Target Name]
- Teacher mapping:
- Recommended JD records:
  1. Role | Company | Salary | City | Score | Source row
     - Matching reason:
     - Talent keywords:
     - Useful market phrasing:
- Talent profile takeaways:
- Gaps:

## Global Gaps
- Targets lacking strong JD evidence:
- Suggested extra searches:
```

Do not paste full JD descriptions into the matching report. Full descriptions belong in `cleaned_jd_pool`.
