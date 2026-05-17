import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FeatureCardsProps {
  cards: { icon?: ReactNode; title: string; description: string }[]
  className?: string
}

export function FeatureCards({ cards, className }: FeatureCardsProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,43,75,0.08)]"
        >
          {card.icon && <div className="mb-4 text-accent">{card.icon}</div>}
          <h3 className="text-xl font-semibold leading-snug text-text-primary">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{card.description}</p>
        </div>
      ))}
    </div>
  )
}
