import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Compass, Boxes, Network } from 'lucide-react'
import type { ReactNode } from 'react'

interface ServiceBlock {
  icon: ReactNode
  tag: string
  title: string
  description: string
  scenarios: string[]
  capabilities: string[]
}

const services: ServiceBlock[] = [
  {
    icon: <Compass className="h-7 w-7" />,
    tag: 'AI+战略',
    title: '从战略意图到 AI 落地路径',
    description:
      '面向 CEO 和董事会层级的战略议题：AI 转型如何与现有业务咬合、组织如何承接、关键里程碑如何切分。我们派出懂行业又懂 AI 的临时高管，与一号位并肩，把"我们要 AI"翻译成"我们这家公司、在这个阶段、应该做这几件事"。',
    scenarios: [
      '集团级 AI 转型路线图制定',
      '业务单元的 AI 价值评估与排序',
      '关键决策（自研 / 投资 / 合作）的尽调与判断',
    ],
    capabilities: ['战略规划', '业务诊断', 'AI 价值评估', '一号位陪跑'],
  },
  {
    icon: <Boxes className="h-7 w-7" />,
    tag: 'AI+产品落地',
    title: '从想法到产品，让 AI 真正长在业务里',
    description:
      '面向具体业务场景的 AI 产品化交付：用户运营、供应链、研发提效、营销获客、客服自动化。我们提供具备实战经验的临时 CPO / CDO / 产品负责人，把 AI 能力沉淀为可复用的产品和流程，而非一次性的 PoC。',
    scenarios: [
      'AI 驱动的用户运营与增长产品',
      '产研协作流程的 AI 重构',
      '供应链 / 风控 / 营销环节的 AI 嵌入',
    ],
    capabilities: ['AI 产品规划', '数据底座搭建', '场景化模型选型', '产研协同'],
  },
  {
    icon: <Network className="h-7 w-7" />,
    tag: 'AI+组织与经营',
    title: '让组织和经营在 AI 时代重新成型',
    description:
      'AI 不止是技术问题，更是组织和经营问题。我们覆盖两个维度：组织层面（架构、人才、治理、文化）让团队具备 AI 时代的协作方式；经营层面（策略、营收、成本、商业模式）让 AI 真正反映在财务报表上。',
    scenarios: [
      '组织架构与人才结构重塑',
      'AI 时代的绩效与治理机制',
      '经营模型与商业模式的 AI 重构',
    ],
    capabilities: ['组织设计', '人才结构', '治理与文化', '经营模型'],
  },
]

export function Services() {
  return (
    <>
      <HeroSection
        title="我们的服务"
        subtitle="三大 AI+ 方向，覆盖企业从战略意图到组织变革的完整链路。每一项服务都由懂行业、会用 AI 的高阶独立人才落地交付。"
        variant="dark"
      />

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="服务方向"
              subtitle="不是泛 AI 咨询，而是围绕你的行业纵深做精准落地。"
            />
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <RevealOnScroll key={service.tag}>
                <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <div className="flex items-center gap-3">
                    <span className="text-accent">{service.icon}</span>
                    <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-border pt-5">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      典型场景
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-sm text-text-primary">
                      {service.scenarios.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      能力标签
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {service.capabilities.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-secondary"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTASection type="enterprise" />
    </>
  )
}
