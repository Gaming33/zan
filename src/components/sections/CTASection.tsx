import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'

interface CTASectionProps {
  type: 'enterprise' | 'talent' | 'both'
}

export function CTASection({ type }: CTASectionProps) {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <Container className="text-center">
        <h2 className="text-[clamp(22px,2.5vw,30px)] font-semibold text-inverse-text">
          {type === 'enterprise'
            ? '准备好开启合作了吗？'
            : type === 'talent'
              ? '加入 ZAN 人才网络'
              : '与我们一起探索 AI 时代的无限可能'}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-inverse-text/70">
          {type === 'enterprise'
            ? '告诉我们您的需求，资深顾问将在1个工作日内与您联系。'
            : type === 'talent'
              ? '提交您的信息，加入我们的高端人才社区。'
              : '无论您是企业还是人才，我们都期待与您建立连接。'}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {(type === 'enterprise' || type === 'both') && (
            <Link
              to="/enterprise/contact"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-inverse-text transition-colors hover:bg-accent-hover"
            >
              企业合作
            </Link>
          )}
          {(type === 'talent' || type === 'both') && (
            <Link
              to="/talent/apply"
              className="rounded-md border border-inverse-text px-6 py-3 text-sm font-medium text-inverse-text transition-colors hover:bg-inverse-text/10"
            >
              人才入驻
            </Link>
          )}
        </div>
      </Container>
    </section>
  )
}
