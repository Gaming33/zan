import type { EnterpriseLeadInput, TalentLeadInput } from '@/types/schemas'

interface ApiSuccess {
  success: true
  message: string
}

interface ApiError {
  error: string
  details?: Record<string, string[]>
}

async function postJson<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const json = await res.json()

  if (!res.ok) {
    const error = json as ApiError
    throw new Error(error.error || '提交失败')
  }

  return json as T
}

export function submitEnterpriseLead(data: EnterpriseLeadInput) {
  return postJson<ApiSuccess>('/api/enterprise-lead', data)
}

export function submitTalentLead(data: TalentLeadInput) {
  return postJson<ApiSuccess>('/api/talent-lead', data)
}
