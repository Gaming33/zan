export interface Article {
  id: number
  title: string
  category: string
  type: string
  date: string
  summary: string
  hero_image: string
  content: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface ArticleListResult {
  items: Article[]
  total: number
  page: number
  pageSize: number
}

export type { EnterpriseLeadInput, TalentLeadInput } from './schemas'
