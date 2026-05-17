import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'

export function Programs() {
  return (
    <>
      <HeroSection title="AI 时代的人才训战" subtitle="AI upskilling 课程和训战项目。" />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">页面内容待填充 — 将接入 Supabase 数据</p>
      </Container>
      <CTASection type="talent" />
    </>
  )
}
