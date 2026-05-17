import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { SectionHeading } from '@/components/shared/SectionHeading'

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

      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="我们是谁"
              subtitle="ZAN 连接行业老兵与 AI 能力，为企业提供'懂行业 + 会用 AI'的临时高管和顾问。"
            />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              title="为什么是我们"
              subtitle="教授背景 + AI 赋能 + 精选网络，三重差异化优势。"
            />
          </RevealOnScroll>
        </Container>
      </section>

      <CTASection type="both" />
    </>
  )
}
