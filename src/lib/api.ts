const API_BASE = '/api'

export async function submitEnterpriseLead(data: {
  name: string
  company: string
  title: string
  contact: string
  challenge?: string
  consent: boolean
}) {
  const res = await fetch(`${API_BASE}/enterprise-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || '提交失败')
  }

  return res.json()
}

export async function submitTalentLead(data: {
  name: string
  position: string
  industry: string
  skills?: string
  contact: string
  consent: boolean
}) {
  const res = await fetch(`${API_BASE}/talent-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || '提交失败')
  }

  return res.json()
}
