import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Container } from '@/components/layout/Container'
import { CTASection } from '@/components/sections/CTASection'
import { useArticle } from '@/hooks/useArticles'

function formatDate(value: string | null): string {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export function InsightDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, isError } = useArticle(slug ?? '')

  if (isLoading) {
    return (
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">加载中…</p>
      </Container>
    )
  }

  if (isError || !article) {
    return (
      <Container className="py-16 lg:py-20">
        <p className="text-text-secondary">文章不存在或已下架。</p>
        <Link to="/insights" className="mt-4 inline-block text-accent hover:text-accent-hover">
          ← 返回洞察列表
        </Link>
      </Container>
    )
  }

  return (
    <>
      <Container className="py-12 lg:py-16">
        <nav className="text-sm text-text-secondary">
          <Link to="/" className="hover:text-accent">首页</Link>
          <span className="mx-2">/</span>
          <Link to="/insights" className="hover:text-accent">洞察</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{article.title}</span>
        </nav>

        <article className="mx-auto mt-8 max-w-[800px]">
          <header className="border-b border-border pb-8">
            <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
              {article.topic}
            </span>
            <h1 className="mt-4 text-[clamp(28px,3vw,38px)] font-bold leading-tight text-text-primary">
              {article.title}
            </h1>
            {article.published_at && (
              <p className="mt-3 text-sm text-text-secondary">
                {formatDate(article.published_at)}
              </p>
            )}
          </header>

          <div className="prose prose-zan mt-10 max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="mt-12 text-2xl font-bold text-text-primary">{children}</h2>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-12 text-2xl font-bold text-text-primary">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 text-xl font-semibold text-text-primary">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mt-5 leading-relaxed text-text-primary">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mt-5 list-disc space-y-2 pl-6 text-text-primary">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mt-5 list-decimal space-y-2 pl-6 text-text-primary">{children}</ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="mt-6 border-l-4 border-accent bg-secondary/40 px-5 py-3 italic text-text-secondary">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm">
                    {children}
                  </code>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 border-t border-border pt-8">
            <Link
              to="/insights"
              className="text-sm text-accent hover:text-accent-hover"
            >
              ← 返回洞察列表
            </Link>
          </footer>
        </article>
      </Container>

      <CTASection type="both" />
    </>
  )
}
