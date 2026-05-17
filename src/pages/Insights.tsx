import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'

export function Insights() {
  return (
    <>
      <HeroSection title="洞察与思考" subtitle="AI 趋势、行业分析、转型方法论、人才洞察。" />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">页面内容待填充 — 将接入 Supabase 数据</p>
      </Container>
    </>
  )
}
