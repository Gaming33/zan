import { useMemo, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { ArticleCard } from '@/components/sections/ArticleCard'
import { FilterBar } from '@/components/shared/FilterBar'
import { useArticles } from '@/hooks/useArticles'

export function Insights() {
  const [topic, setTopic] = useState<string>('')

  const { data: articles, isLoading, isError } = useArticles(topic || undefined)
  const { data: allArticles } = useArticles()

  const topicOptions = useMemo(() => {
    const topics = new Set<string>()
    allArticles?.forEach((a) => topics.add(a.topic))
    return [
      { label: '全部主题', value: '' },
      ...Array.from(topics).map((t) => ({ label: t, value: t })),
    ]
  }, [allArticles])

  return (
    <>
      <HeroSection
        title="洞察与思考"
        subtitle="AI 趋势、行业分析、转型方法论、人才洞察 — 来自 ZAN 教授团队与资深顾问的一手观察。"
      />
      <Container className="py-12 lg:py-16">
        {topicOptions.length > 1 && (
          <FilterBar options={topicOptions} selected={topic} onChange={setTopic} />
        )}

        <div className="mt-10">
          {isLoading && (
            <p className="text-text-secondary">加载中…</p>
          )}
          {isError && (
            <p className="text-text-secondary">内容加载失败,请稍后重试。</p>
          )}
          {!isLoading && !isError && articles?.length === 0 && (
            <p className="text-text-secondary">暂无文章,敬请期待。</p>
          )}
          {articles && articles.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
