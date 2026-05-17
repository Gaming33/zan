import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Article, ArticleSummary } from '@/types'

export function useArticles(topic?: string) {
  return useQuery({
    queryKey: ['articles', topic],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('id, title, slug, excerpt, topic, cover_image, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (topic) query = query.eq('topic', topic)

      const { data, error } = await query
      if (error) throw error
      return data as ArticleSummary[]
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      return data as Article
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}
