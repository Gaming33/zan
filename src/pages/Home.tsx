import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeatureCards } from '@/components/sections/FeatureCards'
import { ProcessFlow } from '@/components/sections/ProcessFlow'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GraduationCap, Cpu, Users } from 'lucide-react'

const features = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: '教授背景，学术底蕴',
    description:
      '依托高校教授的行业研究与人脉网络，ZAN 的人才推荐有学术严谨性背书，而非纯粹商业逻辑。',
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'AI 赋能，时代前沿',
    description:
      '所有服务围绕 AI+ 展开。我们不只是匹配人才，更通过训战体系让人才具备 AI 落地能力。',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '精选网络，质量优先',
    description:
      '严格筛选行业老兵，每位人才都有10年以上纵深经验与实战战功，而非简历搬运。',
  },
]

const processSteps = [
  { title: '提交需求', description: '企业填写简短表单，描述挑战' },
  { title: '咨询诊断', description: '资深顾问一对一深度沟通' },
  { title: '翻译 JD', description: '将企业需求转化为精准人才画像' },
  { title: '人才匹配', description: '从高质量网络中筛选最合适人选' },
  { title: '落地交付', description: '人才到岗，持续跟进确保成效' },
]

const showcaseProjects = [
  {
    industry: '制造业',
    function: 'AI+战略',
    narrative:
      '某头部制造企业在数字化转型中遇到增长瓶颈，计划启动 AI 驱动的供应链优化项目，希望寻找一位具备制造业深耕经验和 AI 落地能力的临时 CDO。',
  },
  {
    industry: '消费品',
    function: 'AI+产品',
    narrative:
      '某国内头部消费品牌在用户增长见顶的背景下，计划通过 AI 技术重构用户运营体系，寻找一位既懂消费者洞察又能主导 AI 产品落地的临时顾问。',
  },
  {
    industry: '金融',
    function: 'AI+组织',
    narrative:
      '某大型金融集团启动组织智能化升级，需要一位兼具金融行业深度理解和 AI 组织变革经验的高级顾问，推动从架构到文化的全面转型。',
  },
]

export function Home() {
  return (
    <>
      <HeroSection
        title="为企业关键阶段，连接懂行业 + 会用 AI 的高阶人才"
        subtitle="ZAN（左安）是一个面向 AI 转型时代的高端人才网络与咨询平台。"
        variant="dark"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/enterprise/contact"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-inverse-text transition-colors hover:bg-accent-hover"
          >
            企业合作
          </a>
          <a
            href="/talent/apply"
            className="rounded-md border border-inverse-text px-6 py-3 text-sm font-medium text-inverse-text transition-colors hover:bg-inverse-text/10"
          >
            人才入驻
          </a>
        </div>
      </HeroSection>

      {/* 我们是谁 */}
      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们是谁"
              subtitle="ZAN 连接行业老兵与 AI 能力，为企业提供'懂行业 + 会用 AI'的临时高管和顾问。我们不是传统猎头，也不是传统咨询——我们是 AI 时代的人才基础设施。"
            />
          </RevealOnScroll>
        </Container>
      </section>

      {/* 为什么是我们 */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="为什么是我们"
              subtitle="教授背景 + AI 赋能 + 精选网络，三重差异化优势。"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <FeatureCards cards={features} className="mt-10" />
          </RevealOnScroll>
        </Container>
      </section>

      {/* 我们怎么做 */}
      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们怎么做"
              subtitle="从需求到交付，五步精准对接。"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <ProcessFlow steps={processSteps} className="mt-10" />
          </RevealOnScroll>
        </Container>
      </section>

      {/* 标杆项目 */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="标杆项目"
              subtitle="我们正在为这些企业寻找 AI 时代的关键人才。"
            />
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showcaseProjects.map((project) => (
              <RevealOnScroll key={project.industry + project.function}>
                <div className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
                      {project.industry}
                    </span>
                    <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
                      {project.function}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-primary">
                    {project.narrative}
                  </p>
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
