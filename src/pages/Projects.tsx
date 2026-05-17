import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTASection } from '@/components/sections/CTASection'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { FilterBar } from '@/components/shared/FilterBar'
import { useProjects } from '@/hooks/useProjects'
import type { ProjectFilters } from '@/types'

const STATUS_OPTIONS = [
  { label: '全部', value: '' },
  { label: '进行中', value: 'ongoing' },
  { label: '已完成', value: 'completed' },
]

export function Projects() {
  const [status, setStatus] = useState<string>('')
  const [industry, setIndustry] = useState<string>('')
  const [func, setFunc] = useState<string>('')
  const navigate = useNavigate()

  const filters: ProjectFilters = {
    status: status ? (status as 'ongoing' | 'completed') : undefined,
    industry: industry || undefined,
    function: func || undefined,
  }

  const { data: projects, isLoading, isError } = useProjects(filters)
  const { data: allProjects } = useProjects()

  const { industryOptions, functionOptions } = useMemo(() => {
    const industries = new Set<string>()
    const functions = new Set<string>()
    allProjects?.forEach((p) => {
      industries.add(p.industry)
      functions.add(p.function)
    })
    return {
      industryOptions: [
        { label: '全部行业', value: '' },
        ...Array.from(industries).map((v) => ({ label: v, value: v })),
      ],
      functionOptions: [
        { label: '全部职能', value: '' },
        ...Array.from(functions).map((v) => ({ label: v, value: v })),
      ],
    }
  }, [allProjects])

  const handleInteract = (id: string) => {
    navigate(`/talent/apply?project=${id}`)
  }

  return (
    <>
      <HeroSection
        title="项目机会"
        subtitle="脱敏案例与开放机会，同时服务企业和人才两端。点击感兴趣的机会，加入 ZAN 人才网络。"
      />
      <Container className="py-12 lg:py-16">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium text-text-secondary">状态</h3>
            <FilterBar options={STATUS_OPTIONS} selected={status} onChange={setStatus} />
          </div>
          {industryOptions.length > 1 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-secondary">行业</h3>
              <FilterBar options={industryOptions} selected={industry} onChange={setIndustry} />
            </div>
          )}
          {functionOptions.length > 1 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-secondary">职能</h3>
              <FilterBar options={functionOptions} selected={func} onChange={setFunc} />
            </div>
          )}
        </div>

        <div className="mt-10">
          {isLoading && (
            <p className="text-text-secondary">加载中…</p>
          )}
          {isError && (
            <p className="text-text-secondary">内容加载失败，请稍后重试。</p>
          )}
          {!isLoading && !isError && projects?.length === 0 && (
            <p className="text-text-secondary">暂无符合条件的项目，请调整筛选条件。</p>
          )}
          {projects && projects.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onInteract={handleInteract}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
      <CTASection type="talent" />
    </>
  )
}
