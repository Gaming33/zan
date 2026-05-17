import type { Program } from '@/types'

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]">
      <h3 className="text-xl font-semibold leading-snug text-text-primary">{program.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{program.description}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
        {program.format && <span>{program.format}</span>}
        {program.duration && <span>{program.duration}</span>}
      </div>
    </div>
  )
}
