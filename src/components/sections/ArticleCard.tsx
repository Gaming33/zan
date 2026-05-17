import type { ArticleSummary } from '@/types'
import { Link } from 'react-router-dom'

interface ArticleCardProps {
  article: ArticleSummary
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      className="group block rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]"
    >
      <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
        {article.topic}
      </span>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-text-primary group-hover:text-accent">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
          {article.excerpt}
        </p>
      )}
    </Link>
  )
}
