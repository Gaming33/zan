# Rejected JD Log

## Asset Status

- Asset type: reusable JD rejection log
- Raw file scanned: `case demo/inputs/jd_raw/职位-20260514012802-(1-1).xlsx`
- Sheet: `Data`
- Raw row count: 963
- Rejected / excluded count in first cleaning pass: 202
- Hard duplicate count detected: 0 by URL and 0 by job ID in this run
- Soft duplicate count detected: 4 by `职位 + 公司 + 地区 + 最低薪资 + 最高薪资`

## Rejection Types

| Type | Count | Notes |
|---|---:|---|
| low_quality_or_irrelevant | 198 | Low-signal roles, junior/execution roles, HR/recruiter roles unrelated to HRTech, vague AI keyword hits, sales/advertising-like roles. |
| duplicate_soft | 4 | Same title/company/location/salary combination. |

## Rejection Rules Applied

Records were rejected or down-ranked when they matched one or more:

- internship / campus / junior execution role
- pure HR / recruiter role not relevant to HRTech product or AI-HR capability
- pure sales / BD without product, delivery, or expert capability
- advertisement-like title, franchise/招商/training/traffic bait
- vague AI keyword hit without concrete responsibility
- duplicate soft key
- salary/title inconsistent with high-quality expert-profile evidence

## Sample Rejections

| Source row | Title | Company | Reason |
|---:|---|---|---|
| 92 | HR | 某大型汽车研发/制造公司 | HR recruiter role, not HRTech product or AI-HR expert evidence. |
| 93 | hr | 拼多多集团-PDD | HR/recruiter signal, low fit for target capability evidence. |
| 95 | HR沟通使用 | 建发集团 | Likely recruiter/communication record, not usable JD evidence. |
| 98 | HR+双休+五险一金 | 北京某大型人力资源服务公司 | Low-quality recruitment-style title. |
| 99 | 人事行政hr | 大兮科技 | Junior/general HR admin, not high-quality expert profile. |
| 102 | 招聘HR-无限暖暖 | 叠纸游戏 | Recruiter role; not retained unless AI-HR product capability is explicit. |

## Notes For Next Pass

- Some records with HR keywords should be retained only if they describe AI-HR systems, HR product platforms, recruiting automation, or people analytics.
- Some digital-human / AIGC roles are high-quality but may match content-growth themes better than enterprise AI platform themes.
- Some very high salary roles are broad AI transformation roles; keep them as senior talent benchmark but avoid letting them override teacher case facts.
