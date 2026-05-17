import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Project, ProjectFilters } from '@/types'

export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (filters?.status) query = query.eq('status', filters.status)
      if (filters?.industry) query = query.eq('industry', filters.industry)
      if (filters?.function) query = query.eq('function', filters.function)

      const { data, error } = await query
      if (error) throw error
      return data as Project[]
    },
    staleTime: 5 * 60 * 1000,
  })
}
