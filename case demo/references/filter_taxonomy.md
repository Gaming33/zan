# Filter Taxonomy

Use this file whenever classifying teacher cases, selected demos, or JD/talent language.

## Industry Filters

These options mirror the resources-page case-study filter. Do not rename them without user approval.

| Filter | Use when the case is mainly about |
|---|---|
| 消费与零售 | Retail, apparel, beauty, mother-baby, food, consumer goods, local lifestyle, membership, private-domain operations, brand growth. |
| 科技与互联网 | Cloud, AI platforms, SaaS, software, internet products, digital platforms, data products, enterprise technology. |
| 制造与供应链 | Manufacturing, industrial equipment, robotics, automotive, agriculture equipment, logistics, warehousing, procurement, production, supply chain. |
| 医疗与健康 | Hospitals, medical devices, specialty care, health services, medical AI, doctor workflow, patient service. |
| 金融与投资 | Banks, insurance, securities, funds, investment firms, fintech, financial operations. |
| 专业服务 | Consulting, HR services, RPO, outsourcing, legal, finance service providers, enterprise service intermediaries. |
| 教育与文化 | Schools, education technology, training, publishing, cultural content, knowledge services. |
| 其他 | Use only when no above industry is a responsible fit. Add a note explaining why. |

## Function Filters

These options mirror the resources-page case-study filter. Do not rename them without user approval.

| Filter | Use when the case is mainly about |
|---|---|
| 增长与市场 | Customer acquisition, brand, sales strategy, content growth, live commerce, channel, private-domain growth, conversion. |
| 战略与商业模式 | New business validation, opportunity assessment, market entry, product-market fit, pricing, service-line design. |
| 组织与人才 | Hiring, team design, interim leaders, capability building, HR transformation, role definition, people analytics. |
| 财务与融资 | Finance operations, CFO support, budgeting, fundraising, M&A, cash flow, multi-site finance control. |
| 运营与供应链 | Procurement, fulfillment, inventory, production, logistics, warehouse, delivery, scheduling, process improvement. |
| 数字化与 AI | AI products, data platforms, automation, AI copilots, model deployment, digital transformation, intelligent tools. |
| 转型与项目管理 | Change management, cross-functional delivery, PMO, transformation office, implementation governance. |

## Tagging Rule

Industry and function are OR filters, not a forced intersection.

For each case:

- assign one primary industry filter
- assign one primary function filter
- add secondary function filters only when they help retrieval
- do not create a matrix just to fill industry/function combinations

Examples:

- A retail private-domain AI shopping assistant:
  - industry: `消费与零售`
  - primary function: `增长与市场`
  - secondary function: `数字化与 AI`

- A manufacturing AI quality-inspection deployment:
  - industry: `制造与供应链`
  - primary function: `运营与供应链`
  - secondary function: `数字化与 AI`

- A cloud private-deployment AI platform case:
  - industry: `科技与互联网`
  - primary function: `数字化与 AI`
  - secondary function: `转型与项目管理`

## Taxonomy Change Rule

If a case does not fit, do not edit this taxonomy directly. Write the proposed addition to the current run's:

```text
taxonomy_change_proposals.md
```

Include:

- proposed new filter
- why existing filters are insufficient
- affected case ids
- risk of making the website filter too granular
