import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'

export function Services() {
  return (
    <>
      <HeroSection title="我们的服务" subtitle="三大 AI+ 服务方向：AI+战略、AI+产品落地、AI+组织与经营。" />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">页面内容待填充</p>
      </Container>
      <CTASection type="enterprise" />
    </>
  )
}
