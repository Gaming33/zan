# JD Asset Rules

Use this file when creating or updating JD assets.

## Goal

Boss/jobhunting JD data supports talent-profile language. It does not define the business case.

The workflow should preserve high-quality original JD descriptions, then extract reusable language that helps generate realistic role profiles.

## Raw Input

Read raw JD files from:

```text
inputs/jd_raw/
```

Accept `.xlsx`, `.csv`, `.txt`, `.md`, `.json`, or mixed copied text.

For Boss Excel exports, prefer the `Data` sheet and these columns:

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

## Reject

Reject or down-rank:

- ads, franchise, traffic-bait, or training-style posts
- vague AI keyword hits without concrete work
- junior execution roles when the demo needs senior experts
- pure sales or BD roles without strategic, product, delivery, or expert capability
- generic HR/recruiter roles unless they are clearly HRTech, recruiting automation, or people analytics
- duplicates by URL, job id, or soft key
- roles whose salary/title/seniority conflict with the intended expert profile

Record rejected items in:

```text
data/rejected_jd_log.md
```

## Clean Pool

For retained records, preserve:

- source file / sheet / row id
- job URL
- job title
- company
- city
- salary
- education / experience
- skills
- full original JD description
- industry signal, if clear
- function capability tags
- AI/tool keywords
- useful market phrasing

Update:

```text
data/cleaned_jd_pool.md
```

## Role Language Bank

Extract reusable patterns into:

```text
data/role_language_bank.md
```

Group by function filter, not by a long role index:

- `增长与市场`
- `战略与商业模式`
- `组织与人才`
- `财务与融资`
- `运营与供应链`
- `数字化与 AI`
- `转型与项目管理`

For each group, capture:

- common seniority signal
- business-context language
- responsibility patterns
- capability requirements
- AI/tool language when present
- phrases that can inspire final copy
- source JD ids

Do not copy JD sentences verbatim into final demos. Use the language bank to calibrate realism, then rewrite.
