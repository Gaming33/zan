# CLAUDE.md

## Harness 规则

本项目使用 harness 文档体系约束 AI 开发行为，所有开发活动必须遵守以下规则：

### 规则 1：会话启动时读取 harness

每次新开会话时，在执行任何代码操作之前，先按顺序读取以下文档：

```
README.md → PRD.md → git-instruction.md → UI_GUIDELINES.md → ARCHITECTURE.md → FOLDER_STRUCTURE.md → DATABASE.md → API.md
```

使用 context window 容纳所有文档后再开始开发。如果用户指定的任务涉及特定领域（如只改 UI），至少读取 README.md + 该领域对应的 harness 文档。

### 规则 2：变更同步更新文档

当代码变更涉及以下情况时，必须同步更新对应的 harness 文档：

| 变更类型 | 需要更新的文档 |
|----------|---------------|
| 新增/删除/修改页面 | PRD.md, FOLDER_STRUCTURE.md |
| 修改视觉风格 | UI_GUIDELINES.md |
| 新增依赖或调整技术栈 | git-instruction.md |
| 修改模块划分或数据流向 | ARCHITECTURE.md |
| 新增/删除文件或目录 | FOLDER_STRUCTURE.md |
| 修改表结构或 RLS 策略 | DATABASE.md |
| 新增/修改 API 端点 | API.md |

更新文档后，在对应文档末尾的变更记录表中追加一行（日期 + 变更内容 + 原因）。

---

## 工程技能

以下技能按需调用，仅在触发场景匹配时使用：

### 开发阶段

| 触发场景 | 技能 | 用途 |
|----------|------|------|
| 遇到 bug 或异常行为 | `/diagnose` | 6 步系统化排查：复现→假设→验证→修复 |
| 需要验证 UI 方案再动手 | `/prototype` | 快速搭原型，低成本试错 |
| 写核心业务逻辑 | `/tdd` | 测试驱动：先写测试再写实现 |
| 想看当前模块在全局中的位置 | `/zoom-out` | 跳出一层，展示模块关系图 |

### 规划阶段

| 触发场景 | 技能 | 用途 |
|----------|------|------|
| 设计方案需要讨论和验证 | `/grill-me` | 追问方案细节直到对齐 |
| 方案需要对照已有规范验证 | `/grill-with-docs` | 对照 harness 文档追问，防止偏离 |
| 需要为新功能写 PRD | `/to-prd` | 从对话上下文合成 PRD |
| 需要把计划拆成可执行工单 | `/to-issues` | 拆解为 GitHub Issues |

### 质量保障

| 触发场景 | 技能 | 用途 |
|----------|------|------|
| 感觉代码结构需要优化 | `/improve-codebase-architecture` | 发现重构机会，提升可测试性 |
| 项目初始化完成后 | `/setup-pre-commit` | 配置 Husky + lint-staged 提交检查 |

### 安全与协作

| 触发场景 | 技能 | 用途 |
|----------|------|------|
| 防止误执行危险 git 命令 | `/git-guardrails-claude-code` | 阻止 push、reset --hard 等操作 |
| 会话上下文快满了 | `/handoff` | 压缩当前进展，交接给新会话 |
| 需要管理 GitHub Issues | `/triage` | 排优先级、分类、分配 |

---

## 通用行为准则

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
