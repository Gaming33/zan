import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { talentLeadSchema } from '../src/types/schemas.ts'

const submissions = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  submissions.set(ip, timestamps)
  return timestamps.length >= MAX_REQUESTS
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' })
  }

  const result = talentLeadSchema.safeParse(req.body)
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

  const { error } = await supabase.from('talent_leads').insert(result.data)

  if (error) {
    console.error('DB insert error:', error.message)
    return res.status(500).json({ error: 'Internal server error' })
  }

  return res.status(200).json({ success: true })
}
