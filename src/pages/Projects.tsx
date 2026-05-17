import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'

export function Projects() {
  return (
    <>
      <HeroSection title="项目机会" subtitle="脱敏案例与开放机会，同时服务企业和人才两端。" />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">页面内容待填充 — 将接入 Supabase 数据</p>
      </Container>
      <CTASection type="talent" />
    </>
  )
}
