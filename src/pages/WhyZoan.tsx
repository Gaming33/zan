import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Check } from 'lucide-react'

interface ComparisonRow {
  dimension: string
  headhunter: string
  consulting: string
  zan: string
}

const comparison: ComparisonRow[] = [
  {
    dimension: '人才标准',
    headhunter: '职位匹配，看简历关键词',
    consulting: '方法论驱动，看名校与名企背景',
    zan: '行业纵深 + 实战战功 + AI 学习能力',
  },
  {
    dimension: '交付形态',
    headhunter: '推荐永久雇佣的候选人',
    consulting: '产出报告与 PPT，乙方收尾',
    zan: '临时高管/顾问亲自落地，长周期陪跑',
  },
  {
    dimension: '行业理解',
    headhunter: '依赖候选人本身的行业经验',
    consulting: '方法论可复用，行业经验外采',
    zan: '人才本身就是行业老兵，无需"复用"',
  },
  {
    dimension: 'AI 角色',
    headhunter: '不涉及',
    consulting: '工具或方法论的一部分',
    zan: '筛选维度 + 训战工具 + 服务标签',
  },
  {
    dimension: '后续关系',
    headhunter: '撮合后结束',
    consulting: '项目周期结束',
    zan: '长期社群运营，持续匹配与激活',
  },
  {
    dimension: '收费方式',
    headhunter: '按年薪比例一次性',
    consulting: '按项目固定费用',
    zan: '撮合佣金 + 课程产品，与长期价值挂钩',
  },
]

const talentCriteria = [
  {
    title: '行业纵深',
    body: '在某一行业有 10 年以上的真实经营或产品经验，不是浅尝辄止的方法论搬运工。',
  },
  {
    title: '实战战功',
    body: '主导过有规模、有结果的关键项目——拿过城池、打过硬仗，而不仅是看过 PPT。',
  },
  {
    title: '多元业务知识',
    body: '熟悉业务的多个面向（战略 / 产品 / 组织 / 经营），能看到系统性问题。',
  },
  {
    title: 'AI 学习能力',
    body: 'AI 不是硬性门槛，但具备拥抱新技术的开放心态和持续学习能力是必备项。',
  },
]

export function WhyZoan() {
  return (
    <>
      <HeroSection
        title="为什么选择 ZAN"
        subtitle="我们不是更好的猎头，也不是更便宜的咨询——我们是为 AI 时代重新设计的人才交付方式。"
        variant="dark"
      />

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="与传统猎头、传统咨询的差异"
              subtitle="同样面对一个企业的关键阶段，三种服务给出的答案完全不同。"
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-10 overflow-hidden rounded-lg border border-border bg-surface">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary text-text-muted">
                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider">
                        维度
                      </th>
                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider">
                        传统猎头
                      </th>
                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider">
                        传统咨询
                      </th>
                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-accent">
                        ZAN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr
                        key={row.dimension}
                        className={i < comparison.length - 1 ? 'border-b border-border' : ''}
                      >
                        <td className="px-5 py-4 font-medium text-text-primary">
                          {row.dimension}
                        </td>
                        <td className="px-5 py-4 text-text-secondary">{row.headhunter}</td>
                        <td className="px-5 py-4 text-text-secondary">{row.consulting}</td>
                        <td className="bg-accent-light/50 px-5 py-4 text-text-primary">
                          {row.zan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们寻找什么样的人"
              subtitle="ZAN 网络中的人才不是流量明星，也不是社交达人，而是真正在行业里打过仗的人。"
            />
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {talentCriteria.map((c) => (
              <RevealOnScroll key={c.title}>
                <div className="flex gap-4 rounded-lg border border-border bg-secondary p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{c.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们的质量保障"
              subtitle="人才匹配不止是一次性撮合，而是持续的过程。"
            />
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: '深度访谈入库',
                body: '每位入库人才都经过资深顾问的一对一深度访谈，确认行业经验、战功细节、AI 学习意愿。',
              },
              {
                title: '匿名画像推荐',
                body: '推荐人才时先提供匿名画像，让企业基于能力而非品牌做判断，避免社交滤镜干扰。',
              },
              {
                title: '阶段性复盘',
                body: '合作启动后持续陪跑，每月复盘进展，必要时与双方对齐预期或调整方案。',
              },
            ].map((item) => (
              <RevealOnScroll key={item.title}>
                <div className="h-full rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
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
