// ⚠️ This file is a copy of src/types/schemas.ts for Vercel Serverless Functions.
// Node.js ESM runtime cannot resolve TypeScript files outside the api/ directory,
// so the schema is duplicated here. If you modify one, update both.
import { z } from 'zod'

// ── 企业线索（/find-talent） ──
export const enterpriseLeadSchema = z.object({
  name: z
    .string()
    .min(1, '请输入您的姓名')
    .max(50, '姓名不超过50个字符'),
  company: z
    .string()
    .max(100, '公司名称不超过100个字符')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .min(1, '请输入邮箱')
    .email('请输入有效的邮箱地址')
    .max(100),
  phone: z
    .string()
    .max(30, '电话不超过30个字符')
    .optional()
    .or(z.literal('')),
  role: z
    .string()
    .max(50, '岗位不超过50个字符')
    .optional()
    .or(z.literal('')),
  stage: z
    .string()
    .max(50)
    .optional()
    .or(z.literal('')),
  challenge: z
    .string()
    .min(1, '请描述您的核心挑战')
    .max(2000, '描述不超过2000个字符'),
  timeline: z
    .string()
    .max(50)
    .optional()
    .or(z.literal('')),
})

// ── 顾问申请（/join） ──
export const talentLeadSchema = z.object({
  name: z
    .string()
    .min(1, '请输入您的姓名')
    .max(50, '姓名不超过50个字符'),
  email: z
    .string()
    .min(1, '请输入邮箱')
    .email('请输入有效的邮箱地址')
    .max(100),
  phone: z
    .string()
    .max(30)
    .optional()
    .or(z.literal('')),
  role: z
    .string()
    .max(100, '核心领域不超过100个字符')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .min(1, '请填写个人简介')
    .max(3000, '简介不超过3000个字符'),
})

export type EnterpriseLeadInput = z.infer<typeof enterpriseLeadSchema>
export type TalentLeadInput = z.infer<typeof talentLeadSchema>
