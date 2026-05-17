// ── 项目 ──
export interface Project {
  id: string
  title: string
  industry: string
  function: string
  status: 'ongoing' | 'completed'
  narrative: string
  requirements: string | null
  outcomes: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProjectFilters {
  industry?: string
  function?: string
  status?: 'ongoing' | 'completed'
}

// ── 文章 ──
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  topic: string
  cover_image: string | null
  published_at: string | null
}

export interface ArticleSummary {
  id: string
  title: string
  slug: string
  excerpt: string | null
  topic: string
  cover_image: string | null
  published_at: string | null
}

// ── 课程 ──
export interface Program {
  id: string
  title: string
  description: string
  format: string | null
  duration: string | null
  cover_image: string | null
}

// ── 表单输入 ──
export interface EnterpriseLeadInput {
  name: string
  company: string
  title: string
  contact: string
  challenge?: string
  consent: boolean
}

export interface TalentLeadInput {
  name: string
  position: string
  industry: string
  skills?: string
  contact: string
  consent: boolean
}
