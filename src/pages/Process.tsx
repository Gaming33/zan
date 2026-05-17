import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'

export function Process() {
  return (
    <>
      <HeroSection title="合作流程" subtitle="从提交需求到落地交付的完整旅程。" />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">页面内容待填充</p>
      </Container>
      <CTASection type="enterprise" />
    </>
  )
}
