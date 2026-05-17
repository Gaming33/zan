import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'
import type { Program } from '@/types'

const programs: Program[] = [
  {
    id: 'p1',
    title: 'AI+战略：CEO 视角的 AI 转型路径',
    description:
      '面向一号位与战略负责人的高强度工作坊。用一周时间走完"识别业务杠杆点 — 评估 AI 价值 — 制定阶段路线图"的完整闭环。课程围绕真实案例展开，每位学员带着自己企业的问题来。',
    format: '线下工作坊',
    duration: '5 天集训',
    cover_image: null,
  },
  {
    id: 'p2',
    title: 'AI+产品：从场景到产品的实战课',
    description:
      '面向有产品或业务背景的 VP+ 学员。聚焦"如何把 AI 能力沉淀为可复用的产品形态"，覆盖场景识别、数据底座、模型选型、产研协同四个关键环节，配套行业案例库与教练点评。',
    format: '线上 + 线下混合',
    duration: '6 周',
    cover_image: null,
  },
  {
    id: 'p3',
    title: 'AI+组织：组织设计与人才结构的重构',
    description:
      '面向 CHO、组织发展负责人与一号位。从组织架构、人才标准、绩效机制、文化变革四个维度，理解 AI 时代的组织如何重新成型。课程包含真实组织诊断练习与同业小组互访。',
    format: '线上直播 + 同业互访',
    duration: '8 周',
    cover_image: null,
  },
  {
    id: 'p4',
    title: 'AI 时代的高管学习社群',
    description:
      'ZAN 网络内的常态化学习与交流机制。包括每月一次的主题深度分享、季度线下闭门会、年度行业前沿考察。仅对入网人才开放，是 ZAN 长期价值的核心载体。',
    format: '社群运营',
    duration: '长期',
    cover_image: null,
  },
]

const philosophy = [
  {
    title: '训战一体',
    body: '不只是讲方法论，每一门课都对接真实业务问题。学员的"作业"就是企业的实际项目。',
  },
  {
    title: '同侪互助',
    body: '小班制、高门槛入学。同学本身就是宝贵的资源——不同行业的 VP+ 之间的横向视角往往胜过任何讲师。',
  },
  {
    title: '可派出导向',
    body: '课程最终的目标是让人才达到"可派出"水平——既懂业务，又会用 AI，能直接进入企业落地。',
  },
]

export function Programs() {
  return (
    <>
      <HeroSection
        title="AI 时代的人才训战"
        subtitle="ZAN 的课程不是为了卖知识，而是为了让行业老兵补齐 AI 能力，达到可以直接进入企业落地的水平。"
        variant="dark"
      />

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="为什么 ZAN 做课程"
              subtitle="课程既是人才训战工具，也是 ZAN 的独立产品线。"
            />
          </RevealOnScroll>

          <div className="mt-8 max-w-3xl">
            <RevealOnScroll>
              <p className="text-lg leading-relaxed text-text-primary">
                行业老兵不缺业务洞察，缺的是
                <span className="text-accent">把 AI 能力沉淀为日常工作方式</span>
                的实操经验。ZAN 的课程就是为了补齐这一环——让人才不只是"听过 AI"，而是
                <span className="text-accent">"会用 AI 解决业务问题"</span>。
              </p>
              <p className="mt-5 text-lg leading-relaxed text-text-primary">
                每一位完成课程的学员都会自动进入 ZAN 的可派出人才池，获得真实项目机会的优先匹配权。
              </p>
            </RevealOnScroll>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {philosophy.map((p) => (
              <RevealOnScroll key={p.title}>
                <div className="h-full rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <h3 className="text-lg font-semibold text-text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="课程与项目"
              subtitle="围绕三大 AI+ 方向，以及面向网络成员的长期学习机制。"
            />
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <RevealOnScroll key={program.id}>
                <article className="flex h-full flex-col rounded-lg border border-border bg-secondary p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <h3 className="text-xl font-semibold leading-snug text-text-primary">
                    {program.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {program.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                    {program.format && (
                      <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
                        {program.format}
                      </span>
                    )}
                    {program.duration && (
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary">
                        {program.duration}
                      </span>
                    )}
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTASection type="talent" />
    </>
  )
}
