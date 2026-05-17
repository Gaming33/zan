import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'

export function About() {
  return (
    <>
      <HeroSection title="认识 ZAN" subtitle="一个面向 AI 转型时代的高端人才网络与咨询平台。" />
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">页面内容待填充</p>
      </Container>
    </>
  )
}
