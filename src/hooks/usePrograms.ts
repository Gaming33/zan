import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Program } from '@/types'

export function usePrograms() {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Program[]
    },
    staleTime: 5 * 60 * 1000,
  })
}
