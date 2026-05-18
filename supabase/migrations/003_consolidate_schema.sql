-- supabase/migrations/003_consolidate_schema.sql
-- 巩固 schema 至当前基线
--
-- 变更概要：
--   1. DROP projects / programs（不再使用的表）
--   2. 重建 articles（id 改为 INT/SERIAL，content 字段以 Markdown TEXT 存储）
--   3. 调整 enterprise_leads 字段以匹配 /find-talent 表单
--   4. 调整 talent_leads 字段以匹配 /join 表单
--   5. 当前不收集 PIPL consent 字段；如未来合规审查要求引入需新增迁移

-- ============================================
-- 1. 删除不再使用的表
-- ============================================
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS programs CASCADE;

-- ============================================
-- 2. 重建 articles 表（字段差异较大，整体重建）
-- ============================================
DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  category     TEXT NOT NULL,
  type         TEXT NOT NULL,
  date         TEXT NOT NULL,
  summary      TEXT NOT NULL,
  hero_image   TEXT NOT NULL,
  content      TEXT NOT NULL,
  sort_order   INT DEFAULT 0,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are publicly readable"
  ON articles FOR SELECT
  USING (published = true);

CREATE INDEX articles_published_sort_idx ON articles (published, sort_order DESC);
CREATE INDEX articles_type_idx ON articles (type) WHERE published = true;

-- ============================================
-- 3. 调整 enterprise_leads 字段
-- ============================================
ALTER TABLE enterprise_leads DROP COLUMN IF EXISTS title;
ALTER TABLE enterprise_leads DROP COLUMN IF EXISTS contact;
ALTER TABLE enterprise_leads DROP COLUMN IF EXISTS consent;

ALTER TABLE enterprise_leads ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';
ALTER TABLE enterprise_leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE enterprise_leads ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE enterprise_leads ADD COLUMN IF NOT EXISTS stage TEXT;
ALTER TABLE enterprise_leads ADD COLUMN IF NOT EXISTS timeline TEXT;
ALTER TABLE enterprise_leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

ALTER TABLE enterprise_leads ALTER COLUMN email DROP DEFAULT;
ALTER TABLE enterprise_leads ALTER COLUMN company DROP NOT NULL;

-- ============================================
-- 4. 调整 talent_leads 字段
-- ============================================
ALTER TABLE talent_leads DROP COLUMN IF EXISTS position;
ALTER TABLE talent_leads DROP COLUMN IF EXISTS industry;
ALTER TABLE talent_leads DROP COLUMN IF EXISTS skills;
ALTER TABLE talent_leads DROP COLUMN IF EXISTS contact;
ALTER TABLE talent_leads DROP COLUMN IF EXISTS consent;

ALTER TABLE talent_leads ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE talent_leads ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE talent_leads ADD COLUMN IF NOT EXISTS bio TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

ALTER TABLE talent_leads ALTER COLUMN email DROP DEFAULT;
ALTER TABLE talent_leads ALTER COLUMN bio DROP DEFAULT;

-- ============================================
-- 5. RLS 策略（幂等）
-- ============================================
ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on enterprise_leads" ON enterprise_leads;
CREATE POLICY "Allow public insert on enterprise_leads"
  ON enterprise_leads FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert on talent_leads" ON talent_leads;
CREATE POLICY "Allow public insert on talent_leads"
  ON talent_leads FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 验证 SQL：
--   SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public' ORDER BY table_name;
-- 应返回：articles, enterprise_leads, talent_leads
-- ============================================
