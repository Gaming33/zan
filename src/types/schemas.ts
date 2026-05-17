import { z } from 'zod'

export const enterpriseLeadSchema = z.object({
  name: z.string().min(1, '请输入姓名').max(50, '姓名不超过50个字符'),
  company: z.string().min(1, '请输入公司名称').max(100, '公司名称不超过100个字符'),
  title: z.string().min(1, '请输入职位').max(50, '职位不超过50个字符'),
  contact: z.string().min(1, '请输入联系方式').max(100),
  challenge: z.string().max(1000, '描述不超过1000个字符').optional(),
  consent: z.literal(true, { message: '请阅读并同意隐私政策' }),
})

export const talentLeadSchema = z.object({
  name: z.string().min(1, '请输入姓名').max(50, '姓名不超过50个字符'),
  position: z.string().min(1, '请输入职位').max(100, '职位不超过100个字符'),
  industry: z.string().min(1, '请输入所在行业').max(50, '行业不超过50个字符'),
  skills: z.string().max(200, '能力描述不超过200个字符').optional(),
  contact: z.string().min(1, '请输入联系方式').max(100),
  consent: z.literal(true, { message: '请阅读并同意隐私政策' }),
})

export type EnterpriseLeadForm = z.infer<typeof enterpriseLeadSchema>
export type TalentLeadForm = z.infer<typeof talentLeadSchema>
