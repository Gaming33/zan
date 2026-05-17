import { cn } from '@/lib/utils'

interface ProcessFlowProps {
  steps: { title: string; description: string }[]
  className?: string
}

export function ProcessFlow({ steps, className }: ProcessFlowProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-5', className)}>
      {steps.map((step, i) => (
        <div key={step.title} className="relative text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-inverse-text">
            {i + 1}
          </div>
          <h4 className="font-semibold text-text-primary">{step.title}</h4>
          <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
