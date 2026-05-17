#!/usr/bin/env node
// 通过 Supabase Management API 应用 supabase/migrations/ 下的 SQL 文件。
// 仅用于本地开发 / 演示环境的便捷工具。不在生产 CI 中使用。
//
// 使用前提:
//   - .env.local 中已配置 VITE_SUPABASE_URL (用于解析 project ref)
//   - .env.local 中已配置 SUPABASE_ACCESS_TOKEN (Supabase Dashboard → Account → Access Tokens)
//
// 用法:
//   node scripts/apply-migrations.mjs           # 应用全部待执行的迁移
//   node scripts/apply-migrations.mjs --force   # 即使表已存在也执行(谨慎)

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function loadDotenv(path) {
  const text = readFileSync(path, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}

loadDotenv(join(ROOT, '.env.local'))

const URL_ENV = process.env.VITE_SUPABASE_URL
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN
if (!URL_ENV || !TOKEN) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env.local')
  process.exit(1)
}

const refMatch = URL_ENV.match(/^https?:\/\/([a-z0-9]+)\.supabase\.co/i)
if (!refMatch) {
  console.error(`Cannot parse project ref from VITE_SUPABASE_URL: ${URL_ENV}`)
  process.exit(1)
}
const PROJECT_REF = refMatch[1]
const API = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`

async function runSql(sql) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  if (!res.ok) {
    const err = new Error(`Management API ${res.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`)
    err.status = res.status
    err.body = body
    throw err
  }
  return body
}

async function tableExists(name) {
  const result = await runSql(
    `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${name}') AS exists;`,
  )
  return Array.isArray(result) && result[0]?.exists === true
}

async function rowCount(name) {
  const result = await runSql(`SELECT COUNT(*)::int AS n FROM public.${name};`)
  return Array.isArray(result) ? result[0]?.n ?? 0 : 0
}

async function applyFile(file, sql) {
  console.log(`▶ Applying ${file}…`)
  await runSql(sql)
  console.log(`✓ ${file} applied`)
}

async function main() {
  const force = process.argv.includes('--force')
  const migrationsDir = join(ROOT, 'supabase', 'migrations')
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  console.log(`Project: ${PROJECT_REF}`)
  console.log(`Migrations: ${files.join(', ')}`)
  console.log()

  for (const file of files) {
    const path = join(migrationsDir, file)
    const sql = readFileSync(path, 'utf8')

    if (file === '001_initial_schema.sql') {
      const exists = await tableExists('projects')
      if (exists && !force) {
        console.log(`↷ ${file}: tables already exist, skipping (use --force to re-run)`)
        continue
      }
      await applyFile(file, sql)
      continue
    }

    if (file === '002_seed_sample_content.sql') {
      const count = await rowCount('projects')
      if (count > 0 && !force) {
        console.log(`↷ ${file}: projects already has ${count} rows, skipping (use --force to re-seed)`)
        continue
      }
      await applyFile(file, sql)
      continue
    }

    await applyFile(file, sql)
  }

  console.log()
  console.log('Summary:')
  for (const table of ['projects', 'articles', 'programs', 'enterprise_leads', 'talent_leads']) {
    try {
      const n = await rowCount(table)
      console.log(`  ${table}: ${n} rows`)
    } catch (e) {
      console.log(`  ${table}: <missing>`)
    }
  }
}

main().catch((e) => {
  console.error('✗ Failed:', e.message)
  if (e.body) console.error(e.body)
  process.exit(1)
})
