import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Schema inlined to avoid cross-file imports — Vercel function bundling has
// proven unreliable for local module resolution. If you change fields here,
// also update src/types/schemas.ts (used by the frontend form).
const enterpriseLeadSchema = z.object({
  name: z.string().min(1, '请输入您的姓名').max(50, '姓名不超过50个字符'),
  company: z.string().max(100, '公司名称不超过100个字符').optional().or(z.literal('')),
  email: z.string().min(1, '请输入邮箱').email('请输入有效的邮箱地址').max(100),
  phone: z.string().max(30, '电话不超过30个字符').optional().or(z.literal('')),
  role: z.string().max(50, '岗位不超过50个字符').optional().or(z.literal('')),
  stage: z.string().max(50).optional().or(z.literal('')),
  challenge: z.string().min(1, '请描述您的核心挑战').max(2000, '描述不超过2000个字符'),
  timeline: z.string().max(50).optional().or(z.literal('')),
})

// In-memory rate limit (per Serverless instance lifetime)
const submissions = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) {
    submissions.set(ip, timestamps)
    return true
  }
  timestamps.push(now)
  submissions.set(ip, timestamps)
  return false
}

function emptyToNull(v: string | undefined): string | null {
  return v && v.length > 0 ? v : null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' })
  }

  const result = enterpriseLeadSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    })
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { error } = await supabase.from('enterprise_leads').insert({
    name: result.data.name,
    company: emptyToNull(result.data.company),
    email: result.data.email,
    phone: emptyToNull(result.data.phone),
    role: emptyToNull(result.data.role),
    stage: emptyToNull(result.data.stage),
    challenge: result.data.challenge,
    timeline: emptyToNull(result.data.timeline),
  })

  if (error) {
    console.error('DB insert error (enterprise):', error.message)
    return res.status(500).json({ error: 'Internal server error' })
  }

  return res.status(200).json({
    success: true,
    message: '感谢您的信任，我们会在 24 小时内与您联系。',
  })
}
