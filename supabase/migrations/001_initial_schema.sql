-- ZAN 初始数据库结构
-- 2026-05-17

-- ============================================
-- 表 1: enterprise_leads（企业线索）
-- ============================================
CREATE TABLE enterprise_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  company    TEXT NOT NULL,
  title      TEXT NOT NULL,
  contact    TEXT NOT NULL,
  challenge  TEXT,
  consent    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on enterprise_leads"
  ON enterprise_leads FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 表 2: talent_leads（人才线索）
-- ============================================
CREATE TABLE talent_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  position   TEXT NOT NULL,
  industry   TEXT NOT NULL,
  skills     TEXT,
  contact    TEXT NOT NULL,
  consent    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE talent_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on talent_leads"
  ON talent_leads FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 表 3: projects（项目机会）
-- ============================================
CREATE TABLE projects (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  industry     TEXT NOT NULL,
  function     TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'ongoing'
               CHECK (status IN ('ongoing', 'completed')),
  narrative    TEXT NOT NULL,
  requirements TEXT,
  outcomes     TEXT,
  sort_order   INT DEFAULT 0,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published projects are publicly readable"
  ON projects FOR SELECT
  USING (published = true);

-- ============================================
-- 表 4: articles（洞察文章）
-- ============================================
CREATE TABLE articles (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  topic        TEXT NOT NULL,
  cover_image  TEXT,
  published    BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are publicly readable"
  ON articles FOR SELECT
  USING (published = true);

-- ============================================
-- 表 5: programs（课程项目）
-- ============================================
CREATE TABLE programs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  format       TEXT,
  duration     TEXT,
  cover_image  TEXT,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published programs are publicly readable"
  ON programs FOR SELECT
  USING (published = true);
