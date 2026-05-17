import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full rounded-md border border-border bg-surface px-4 text-base text-text-primary outline-none transition-[border-color,box-shadow] placeholder:text-text-secondary/50 disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent/15",
        "aria-invalid:border-error aria-invalid:ring-error/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
