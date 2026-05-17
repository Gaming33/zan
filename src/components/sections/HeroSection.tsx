import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

export function HeroSection({ title, subtitle, children, className, variant = 'dark' }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'py-16 lg:py-24',
        variant === 'dark' ? 'bg-primary text-inverse-text' : 'bg-secondary text-text-primary',
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <h1 className="text-[clamp(28px,3.5vw,40px)] font-bold leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
