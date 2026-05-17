import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, subtitle, className, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <div className="mb-3 h-1 w-8 rounded-full bg-accent" />
      <h2 className="text-[clamp(22px,2.5vw,30px)] font-semibold leading-tight tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  )
}
