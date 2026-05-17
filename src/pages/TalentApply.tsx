import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'

export function TalentApply() {
  return (
    <>
      <HeroSection
        title="人才入驻申请"
        subtitle="提交您的信息，加入我们的高端人才社区。"
      />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">表单组件待实现（Phase 1）</p>
      </Container>
    </>
  )
}
