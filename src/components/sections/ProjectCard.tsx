import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onInteract?: (id: string) => void
}

export function ProjectCard({ project, onInteract }: ProjectCardProps) {
  const statusLabel = project.status === 'ongoing' ? '进行中' : '已完成'

  return (
    <div className="group rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
          {project.industry}
        </span>
        <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
          {project.function}
        </span>
        <span
          className={cn(
            'ml-auto flex items-center gap-1 rounded-full px-3 py-1 text-xs',
            project.status === 'ongoing'
              ? 'bg-accent-light text-accent'
              : 'bg-secondary text-text-secondary',
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel}
        </span>
      </div>
      <p className="text-text-primary leading-relaxed">{project.narrative}</p>
      {project.status === 'ongoing' && onInteract && (
        <button
          onClick={() => onInteract(project.id)}
          className="mt-4 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          我对这个机会感兴趣 →
        </button>
      )}
    </div>
  )
}
