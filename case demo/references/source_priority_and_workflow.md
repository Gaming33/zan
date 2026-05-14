# Source Priority And Workflow

Use this reference before any extraction, cleaning, matching, or demo writing.

## Source Priority

1. Teacher enterprise-case document = business truth.
   - File: `C:\Users\Leo\Downloads\50家企业案例+++AI提效.docx`
   - Use for industry distribution, representative companies, business pain points, AI application scenarios, and initial talent gaps.

2. Teacher role-list document = old role draft and role intent.
   - File: `C:\Users\Leo\Downloads\岗位清单.docx`
   - Use to understand the teacher's first attempt, role naming direction, and what needs to be diagnosed or rerun.
   - Do not treat it as final truth.

3. Raw Boss / jobhunting JD data = talent evidence.
   - Folder: `inputs/jd_raw/`
   - Use to calibrate high-quality talent profiles, responsibilities, seniority, company signal, salary band, and market language.
   - Preserve original JD descriptions in the cleaned evidence layer.

4. BTG resources = writing and framing structure.
   - Files: `references/btg_case_patterns.md`, `references/btg_case_examples.md`
   - Use case studies for case structure.
   - Use talent resources patterns for talent-profile framing.
   - Do not use BTG as business fact source.

## Required Reasoning Order

Never start from JD data alone.

Use this order:

1. Extract business themes from teacher enterprise-case material.
2. Diagnose why the teacher old role list is scattered or weak.
3. Clean JD evidence and preserve high-quality original descriptions.
4. Match JD evidence to business themes and teacher cases.
5. Rerun role demos from teacher role intent, calibrated by JD evidence.
6. Write BTG-style case demos from teacher cases.

## Output Dependency

- `business_theme_report.md` should inform JD matching.
- `role_list_diagnosis.md` should inform role reruns.
- `cleaned_jd_pool.*` should preserve original JD descriptions and extracted signals.
- `jd_matching_report.md` should explain why each JD supports a case or talent profile.
- final `demo-xx-*.md` files should depend on all available upstream reports.

## Agent Boundary

- The agent is a case-role demo production agent, not a code-development agent.
- The agent may use scripts or tools to inspect files, but its deliverables are analysis and markdown/json artifacts under `outputs/`.
- The agent must not ask the user to manually summarize JD data.
- The agent must not modify files outside `case demo/`.
