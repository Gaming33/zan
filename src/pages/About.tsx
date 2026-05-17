import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'

const stats = [
  { value: '500+', label: '高质量人才入库' },
  { value: '20+', label: '覆盖行业领域' },
  { value: '10年+', label: '人才平均行业纵深' },
  { value: '1对1', label: '顾问深度跟进' },
]

const principles = [
  {
    title: '行业纵深为本',
    body: '我们相信，AI 不会替代行业理解，只会放大它的价值。所有合作首先建立在对行业的真实理解之上。',
  },
  {
    title: '人是关键变量',
    body: '咨询报告解决不了执行问题，标准化产品解决不了复杂决策。在关键阶段，真正起作用的永远是合适的人。',
  },
  {
    title: '关系优于交易',
    body: '我们与每一位企业和人才建立长期关系，而不是把任何一次合作当成一次性的撮合生意。',
  },
]

export function About() {
  return (
    <>
      <HeroSection
        title="认识 ZAN"
        subtitle="ZAN（左安 / Zuo An Nexus）是面向 AI 转型时代的高端人才网络与咨询平台。我们相信，AI 时代真正稀缺的不是技术，而是懂行业、能落地、又愿意拥抱 AI 的关键个人。"
        variant="dark"
      />

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们的愿景"
              subtitle="成为 AI 时代的人才基础设施。"
            />
          </RevealOnScroll>
          <div className="mt-8 max-w-3xl">
            <RevealOnScroll>
              <p className="text-lg leading-relaxed text-text-primary">
                AI 不会替代人，但会重新分配机会。在这场重新洗牌中，真正稀缺的不是会写代码的人，而是
                <span className="text-accent">懂业务、打过仗、愿意学习 AI 的行业老兵</span>
                。
              </p>
              <p className="mt-5 text-lg leading-relaxed text-text-primary">
                ZAN 的目标是把这群人组织起来——通过内容吸引、通过课程培养、通过项目激活——让他们在 AI 时代继续创造价值，让企业在关键阶段能找到他们。
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们的故事"
              subtitle="从教授的人脉网络开始，到 AI 时代的人才基础设施。"
            />
          </RevealOnScroll>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <RevealOnScroll>
              <div className="rounded-lg border border-border bg-secondary p-7">
                <h3 className="text-xl font-semibold text-text-primary">起点</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  ZAN 起源于一位高校教授多年积累的产业人脉。在为企业做战略咨询的过程中，我们反复观察到一个现象：企业不缺方法论，缺的是能把方法论落地的人；不缺 AI 工具，缺的是懂自己业务又会用 AI 的人。
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="rounded-lg border border-border bg-secondary p-7">
                <h3 className="text-xl font-semibold text-text-primary">演化</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  传统的咨询交付方式（报告 + PPT）越来越难以满足企业在 AI 时代的真实需求。我们决定做一件更难但更有价值的事：组织一个高端独立人才网络，让他们以临时高管或顾问的身份直接进入企业，与一号位并肩作战。
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们的原则"
              subtitle="ZAN 的所有判断和决策，都建立在这三条原则之上。"
            />
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <RevealOnScroll key={p.title}>
                <div className="h-full rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <h3 className="text-lg font-semibold text-text-primary">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <div className="text-center">
              <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-accent" />
              <h2 className="text-[clamp(22px,2.5vw,30px)] font-semibold text-inverse-text">
                我们的网络
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-inverse-text/70">
                ZAN 持续吸纳来自不同行业、不同职能、有真实战功的高阶独立人才。
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <RevealOnScroll key={stat.label}>
                <div className="rounded-lg border border-inverse-text/10 bg-primary-light p-6 text-center">
                  <div className="text-3xl font-bold text-accent lg:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-inverse-text/70">{stat.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTASection type="both" />
    </>
  )
}
