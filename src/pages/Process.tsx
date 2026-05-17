import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface ProcessStep {
  number: string
  title: string
  duration: string
  description: string
  deliverables: string[]
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: '提交需求',
    duration: '5 分钟',
    description:
      '通过网站表单或顾问人脉提交合作意向。无需准备完整的 JD，只需描述当前业务挑战和大致方向。',
    deliverables: ['初步需求表单', '基础联系方式'],
  },
  {
    number: '02',
    title: '咨询诊断',
    duration: '1–2 周',
    description:
      '资深顾问与企业一号位/战略负责人深度沟通，理解真实问题。这一步往往会修正原始需求——你以为缺一个 CTO，可能其实需要的是 CPO。',
    deliverables: ['业务诊断纪要', '关键问题清单', '初步交付方案'],
  },
  {
    number: '03',
    title: '翻译 JD',
    duration: '3–5 天',
    description:
      '将企业语言（"我们要做 AI 转型"）翻译成精准的人才画像：哪个行业、哪个职能、什么经验深度、需要什么 AI 能力、阶段目标是什么。',
    deliverables: ['脱敏 JD 文档', '人才画像', '匹配评估标准'],
  },
  {
    number: '04',
    title: '人才匹配',
    duration: '1–3 周',
    description:
      '从 ZAN 高端人才网络中精选 2–3 位候选人，提供匿名画像。我们已经做过初筛和深度访谈，不会浪费你的时间在不合适的人选上。',
    deliverables: ['候选人匿名画像', '推荐理由', '可面谈时间'],
  },
  {
    number: '05',
    title: '落地交付',
    duration: '3–12 个月',
    description:
      '人才以临时高管 / 顾问形式到岗，按约定的目标和节奏推进。ZAN 持续跟进，确保人才与企业的匹配度持续保持，必要时进行调整。',
    deliverables: ['阶段性目标确认', '月度复盘', '风险预警'],
  },
]

export function Process() {
  return (
    <>
      <HeroSection
        title="合作流程"
        subtitle="从你提交需求的那一刻起，到人才真正在你的业务里产生价值。每一步都有清晰的产出和时间预期。"
        variant="dark"
      />

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="五步流程"
              subtitle="不是猎头式的简历推送，也不是咨询式的方法论报告——而是一个完整的对接闭环。"
            />
          </RevealOnScroll>

          <div className="mt-12 space-y-5">
            {steps.map((step) => (
              <RevealOnScroll key={step.number}>
                <article className="rounded-lg border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)] lg:flex lg:gap-8">
                  <div className="flex shrink-0 items-start gap-4 lg:w-56 lg:flex-col lg:items-start lg:gap-2">
                    <span className="text-3xl font-bold leading-none text-accent lg:text-4xl">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold leading-snug text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">预计时长：{step.duration}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex-1 lg:mt-0">
                    <p className="text-sm leading-relaxed text-text-primary">{step.description}</p>
                    <div className="mt-4 border-t border-border pt-4">
                      <h4 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        阶段产出
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="为什么我们坚持人工跟进"
              subtitle="ZAN 不做匹配算法，也不做简历库。真正的人才匹配是判断力问题，不是数据问题。"
            />
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: '判断而非过滤',
                body: '懂行业的顾问知道"VP 级别"在不同公司意味着完全不同的能力组合，简历筛选做不到这一点。',
              },
              {
                title: '关系而非交易',
                body: '我们与每一位候选人建立长期关系，了解他们的真实状态和职业偏好，而不是被动响应招聘需求。',
              },
              {
                title: '陪跑而非交付',
                body: '人才到岗只是开始。ZAN 会持续跟进合作进展，必要时调整方案——失败的合作对双方都是损失。',
              },
            ].map((item) => (
              <RevealOnScroll key={item.title}>
                <div className="rounded-lg border border-border bg-secondary p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTASection type="enterprise" />
    </>
  )
}
