import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'

export function EnterpriseContact() {
  return (
    <>
      <HeroSection
        title="企业合作"
        subtitle="告诉我们您的需求，资深顾问将在1个工作日内与您联系。"
      />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">表单组件待实现（Phase 1）</p>
      </Container>
    </>
  )
}
