import { cn } from '@/lib/utils'

interface FilterOption {
  label: string
  value: string
}

interface FilterBarProps {
  options: FilterOption[]
  selected: string
  onChange: (value: string) => void
  className?: string
}

export function FilterBar({ options, selected, onChange, className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-sm transition-colors',
            selected === opt.value
              ? 'border-accent bg-accent-light text-accent'
              : 'border-border bg-surface text-text-secondary hover:text-accent',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
