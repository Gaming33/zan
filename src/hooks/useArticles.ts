import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Article, ArticleListResult } from '@/types'

export function useArticles(filters?: { type?: string; page?: number; pageSize?: number }) {
  return useQuery<ArticleListResult>({
    queryKey: ['articles', filters],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('sort_order', { ascending: false })

      if (filters?.type) query = query.eq('type', filters.type)

      const page = filters?.page ?? 1
      const pageSize = filters?.pageSize ?? 9
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error, count } = await query
      if (error) throw error
      return { items: (data ?? []) as Article[], total: count ?? 0, page, pageSize }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useArticle(id: number | string | undefined) {
  return useQuery<Article>({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single()
      if (error) throw error
      return data as Article
    },
    enabled: id !== undefined && id !== null && id !== '',
  })
}
