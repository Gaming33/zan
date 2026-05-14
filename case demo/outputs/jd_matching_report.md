# JD Matching Report

## Preflight

- Stage: Stage 4 - JD-To-Theme Matching
- Raw file read: `case demo/inputs/jd_raw/职位-20260514012802-(1-1).xlsx`
- Clean pool used: `case demo/outputs/cleaned_jd_pool.md`
- References read:
  - `case demo/SKILL.md`
  - `case demo/references/jd_cleaning_and_matching.md`
  - `case demo/references/teacher_case_mapping.md`
  - `case demo/references/case_targets_and_jd_brief.md`
  - `case demo/outputs/business_theme_report.md`
  - `case demo/outputs/role_list_diagnosis.md`

## Data Overview

- Raw row count: 963
- Clean candidate count after first pass: 761
- Rejected / excluded count: 202
- Hard duplicates removed: 0 by URL, 0 by job ID
- Soft duplicates removed: 4
- Main companies in clean candidates: 极飞科技、字节跳动、斯坦德机器人、海康机器人、阿里巴巴集团、歌尔、蚂蚁集团、腾讯、百度、拼多多集团-PDD
- Main role families: AI产品、AI平台、AIGC/数字人、AI转型、机器视觉、AI-HR、供应链预测、医疗AI、Agent架构
- Salary signal: retained pool includes 58 records at 100K+, 34 records at 80-100K, 153 records at 60-80K, 176 records at 40-60K.

## Business Theme Matching

### AI产品化与企业级新业务验证

- Teacher source: 新疆立昂科技、嘉环科技、捷希科技、天元通信、中科睿智；对应企业级AI云、私有化部署、政企解决方案、AI诊断系统。
- Best JD evidence:
  1. JD-E05 `CTO/CIO（集团级AI负责人）` | 某大型计算机服务公司 | 170-190K | Score: strong
     - Matching reason: defines enterprise Agent architecture, workflow orchestration, model capability planning, and cross-department deployment.
     - Talent signals: Agent架构、AI产品/解决方案落地、技术战略、产学研合作、对外方法论表达。
  2. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: strong
     - Matching reason: maps directly to communication equipment / manufacturing enterprise AI transformation and AI中台.
     - Talent signals: AI战略、AI中台、产品研发、智能制造、供应链、客户运营。
- Match strength: strong
- Gaps: Need more explicit `私有化部署 / 大模型平台产品` JD from cloud vendors if Demo 02 becomes a final demo.

### 工业视觉、智能制造与物理世界AI落地

- Teacher source: 惠达科技、腾亚精工、万控智造、绿巨能源；无人农场、视觉质检、运维、柔性制造。
- Best JD evidence:
  1. JD-E07 `AI视觉专家` | 智能派科技 | 60-90K | Score: strong
     - Matching reason: directly requires 0->1 vision/AI system delivery in production or business scenarios, with data, training, deployment and operations.
     - Talent signals: 机器视觉、边缘推理、数据闭环、工业交付、算法+工程团队。
  2. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: medium
     - Matching reason: covers intelligent manufacturing, predictive maintenance, intelligent quality inspection, energy optimization and AI platform governance.
- Match strength: strong for industrial vision; medium for smart agriculture specifically.
- Gaps: Need more agriculture-equipment /农机自动驾驶 JD if Demo 01 must be highly faithful to agriculture.

### AIGC内容生产、品牌增长与直播电商效率重构

- Teacher source: 红蜻蜓、珂尔男装、杭州宝熙、杭州恋星、如米妆美、杭州壹元文化。
- Best JD evidence:
  1. JD-E04 `阿里-大模型应用算法负责人-视频AI内容` | 阿里巴巴集团 | 80-110K | Score: strong
     - Matching reason: defines the full automated content workflow from script planning to video generation and publishing.
     - Talent signals: AIGC、LLM/Agent、视频生成、自动化评测、内容工业化、团队管理。
- Match strength: strong
- Gaps: Need more non-algorithm AIGC内容运营/投放负责人 JD to calibrate operator-style roles, not only algorithm leaders.

### 私域会员、智能导购与用户生命周期增长

- Teacher source: 孩子王、粒上皇、小大董、钱赞、皇氏集团、厦门仁御口腔、尊享醇品。
- Best JD evidence:
  1. JD-E05 `CTO/CIO（集团级AI负责人）` | 某大型计算机服务公司 | 170-190K | Score: medium
     - Matching reason: includes Agent in marketing, growth, customer operations, CRM/CDP and marketing automation.
     - Talent signals: 客户经营、营销自动化、推荐/触达、线索/转化。
- Match strength: medium
- Gaps: Need more dedicated `私域增长负责人`、`会员运营总监`、`AI导购产品经理` JD from retail/new consumer companies.

### 医疗、教育等专业服务Copilot

- Teacher source: 高视医疗、北京中世唐龙、厦门仁御口腔、华图教育、卓越教育。
- Best JD evidence:
  1. JD-E06 `AI医学影像算法专家` | 某中型医疗器械公司 | 30-60K | Score: strong for medical
     - Matching reason: emphasizes clinical workflow,病理图像, productization, data standards, clinical validation, NMPA awareness.
     - Talent signals: 医疗AI、临床需求、算法产品化、工程部署、法规/注册意识。
  2. Education-related evidence exists in the raw scan but needs a second pass to retain stronger AI教育产品 and智能批改 records.
- Match strength: strong for medical; medium/weak for education.
- Gaps: Need more `AI教育产品经理`、`智能批改产品经理`、`教研中台` JD for Demo 08.

### 供应链预测、物流调度与运营优化

- Teacher source: 江苏飞力达、乐禾食品、荷特宝、云货优选。
- Best JD evidence:
  1. JD-E02 `数据&AI专家` | 某大型汽车研发/制造上市公司 | 100-160K | Score: strong
     - Matching reason: explicitly covers sales conversion,销量预测,派单调度,制造和物流供应链智能算法,运筹优化.
     - Talent signals: 需求预测、运筹优化、供应链算法、策略上线、效果负责。
  2. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: medium
     - Matching reason: covers global supply chain demand forecasting, inventory optimization, logistics path planning.
- Match strength: strong
- Gaps: Need more fresh-food /生鲜 /团餐 supply chain operations JD if Demo 10 must be very close to乐禾食品.

### HRTech、人岗匹配与组织效能重构

- Teacher source: RPO与人力外包服务商；教育、人力资源、招聘相关场景。
- Best JD evidence:
  1. JD-E03 `AI领域负责人（HR领域）` | 歌尔 | 40-70K | Score: strong
     - Matching reason: directly describes AI-HR roadmap, intelligent recruiting system, HR data analysis, AI training platform and cross-functional rollout.
     - Talent signals: AI-HR、智能招聘、AI培训、HR数据分析、项目管理、业务/HR/技术协同。
  2. JD-E08 `蚂蚁集团-技术专家-HR技术方向` | 蚂蚁集团 | 30-50K | Score: medium
     - Matching reason: HR technology platform, recruiting, compensation and people systems; stronger for engineering evidence than role-owner evidence.
- Match strength: strong
- Gaps: Need more `人岗匹配算法`、`简历解析产品经理`、`HR SaaS产品负责人` JD from BOSS直聘/北森/Moka if Demo 09 is first batch.

### 企业AI组织转型与项目交付自动化

- Teacher source: 嘉环科技、天元通信、中科睿智、装库科技、万德斯。
- Best JD evidence:
  1. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: strong
     - Matching reason: defines AI transformation roadmap, business scenario reconstruction, AI governance and organization culture.
  2. JD-E05 `CTO/CIO（集团级AI负责人）` | 某大型计算机服务公司 | 170-190K | Score: strong
     - Matching reason: focuses on enterprise Agent implementation, technical strategy, and cross-team delivery.
- Match strength: strong
- Gaps: Need more explicit `政企解决方案架构师` and `项目交付自动化` JD for Demo 11 if it is selected.

## Demo Target Matching

### Demo 01: Smart Agriculture / Unmanned Farm POC

- Teacher mapping: 惠达科技 / 智慧农业装备；岗位清单中的“国内头部智能农机巨头”
- Recommended JD records:
  1. JD-E07 `AI视觉专家` | 智能派科技 | 60-90K | Score: 9
     - Matching reason: machine vision system from data to deployment to operations; strong fit for visual inspection and edge AI.
     - Talent keywords: 机器视觉、边缘推理、工业交付、数据闭环、团队搭建。
- Match strength: medium
- Gap: Need agriculture-specific autonomous equipment evidence.

### Demo 02: AI Cloud / Private Deployment

- Teacher mapping: 新疆立昂科技 / ICT与算力基础设施
- Recommended JD records:
  1. JD-E05 `CTO/CIO（集团级AI负责人）` | 某大型计算机服务公司 | 170-190K | Score: 8
  2. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: 8
- Match strength: strong
- Gap: Add 大模型平台产品 / 私有化部署 solution architect records from cloud vendors.

### Demo 03: Home Furnishing / AI Design Platform

- Teacher mapping: 索菲亚、我乐家居 / 泛家居全屋定制
- Recommended JD records:
  1. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: 6
- Match strength: weak/medium
- Gap: Need stronger 家装/空间设计/CAD/BIM/AI设计中台 JD.

### Demo 04: Specialty Healthcare / Doctor Copilot

- Teacher mapping: 高视医疗、北京中世唐龙、厦门仁御口腔
- Recommended JD records:
  1. JD-E06 `AI医学影像算法专家` | 某中型医疗器械公司 | 30-60K | Score: 9
- Match strength: strong for medical imaging; medium for doctor Copilot product role.
- Gap: Add medical AI product manager / doctor workflow records.

### Demo 05: Mother-Baby Retail / Private-Domain Agent

- Teacher mapping: 孩子王 / 母婴童新零售
- Recommended JD records:
  1. JD-E05 `CTO/CIO（集团级AI负责人）` | 某大型计算机服务公司 | 170-190K | Score: 6
- Match strength: weak/medium
- Gap: Need private-domain growth, CRM, AI导购, member lifecycle JD.

### Demo 06: Apparel Retail / AIGC Planning And Fast Marketing

- Teacher mapping: 红蜻蜓、珂尔男装、杭州宝熙、杭州恋星
- Recommended JD records:
  1. JD-E04 `阿里-大模型应用算法负责人-视频AI内容` | 阿里巴巴集团 | 80-110K | Score: 10
- Match strength: strong for AIGC content system; medium for apparel merchandizing specifically.
- Gap: Add apparel商品企划 / 电商内容增长 operator records.

### Demo 07: Beauty Retail / Creator Content And Smart Selection

- Teacher mapping: 如米妆美 / 美妆新零售
- Recommended JD records:
  1. JD-E04 `阿里-大模型应用算法负责人-视频AI内容` | 阿里巴巴集团 | 80-110K | Score: 7
- Match strength: medium
- Gap: Need 美妆达人投放、小红书投放、智能选品 JD.

### Demo 08: Education / AI Essay Review And Interview Coach

- Teacher mapping: 华图教育、卓越教育 / 公考与职业培训
- Recommended JD records:
  - Current raw pool contains education-related signals, but retained high-quality evidence is not yet strong enough.
- Match strength: weak/medium
- Gap: Need AI教育产品、智能批改、教研中台 records.

### Demo 09: RPO / AI Resume Screening And Matching

- Teacher mapping: 规模化RPO与人力外包服务商；教育、人力资源、招聘相关场景
- Recommended JD records:
  1. JD-E03 `AI领域负责人（HR领域）` | 歌尔 | 40-70K | Score: 10
  2. JD-E08 `蚂蚁集团-技术专家-HR技术方向` | 蚂蚁集团 | 30-50K | Score: 8
- Match strength: strong for AI-HR; medium for RPO-specific matching.
- Gap: Need product/algorithm records for人岗匹配 and简历解析.

### Demo 10: Fresh Food Supply Chain / Procurement Forecasting

- Teacher mapping: 乐禾食品、荷特宝、云货优选
- Recommended JD records:
  1. JD-E02 `数据&AI专家` | 某大型汽车研发/制造上市公司 | 100-160K | Score: 9
- Match strength: strong for forecasting/optimization; medium for fresh-food specificity.
- Gap: Need 生鲜采购/补货/损耗 control JD.

### Demo 11: Gov-Enterprise Digitalization / AI Solution Delivery

- Teacher mapping: 嘉环科技、天元通信 / 政企数字化、通信运维、项目交付
- Recommended JD records:
  1. JD-E01 `AI数字化转型总监` | 深圳某大型通信设备研发公司 | 70-100K | Score: 8
  2. JD-E05 `CTO/CIO（集团级AI负责人）` | 某大型计算机服务公司 | 170-190K | Score: 8
- Match strength: strong
- Gap: Need more政企售前解决方案架构师 and交付自动化 evidence.

### Demo 12: Logistics / Multi-Warehouse Dispatch

- Teacher mapping: 江苏飞力达 / 综合物流与制造业供应链
- Recommended JD records:
  1. JD-E02 `数据&AI专家` | 某大型汽车研发/制造上市公司 | 100-160K | Score: 8
- Match strength: medium
- Gap: Need logistics-specific WMS/TMS/路径优化/仓储调度 JD.

## Global Gaps

Targets lacking strong JD evidence:

- Demo 03 Home Furnishing / AI Design Platform
- Demo 05 Mother-Baby Retail / Private-Domain Agent
- Demo 07 Beauty Retail / Creator Content And Smart Selection
- Demo 08 Education / AI Essay Review And Interview Coach
- Demo 12 Logistics / Multi-Warehouse Dispatch

Suggested extra searches:

- `AI设计 产品负责人`, `AIGC 家装 产品经理`, `空间设计 SaaS 产品经理`
- `私域增长负责人`, `会员运营总监`, `AI导购 产品经理`, `CRM 产品经理`
- `美妆 内容增长`, `达人投放负责人`, `小红书投放总监`, `智能选品 产品经理`
- `AI教育 产品经理`, `智能批改 产品经理`, `教研中台 产品经理`
- `物流算法 专家`, `路径优化 算法`, `WMS 产品负责人`, `TMS 产品经理`

## Recommended First Demo Batch

Based on teacher-case representativeness and current JD evidence:

Strong first batch:

1. Demo 02 AI Cloud / Private Deployment
2. Demo 04 Specialty Healthcare / Doctor Copilot
3. Demo 06 Apparel Retail / AIGC Content
4. Demo 09 RPO / AI Resume Screening And Matching
5. Demo 10 Fresh Food Supply Chain / Procurement Forecasting
6. Demo 11 Gov-Enterprise Digitalization / AI Solution Delivery

Keep but mark as needing more JD evidence:

7. Demo 01 Smart Agriculture / Unmanned Farm POC
8. Demo 03 Home Furnishing / AI Design Platform
9. Demo 05 Mother-Baby Retail / Private-Domain Agent
10. Demo 08 Education / AI Essay Review And Interview Coach

