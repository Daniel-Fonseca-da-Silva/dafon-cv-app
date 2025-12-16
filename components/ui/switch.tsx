"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label
        className={cn(
          "relative inline-flex items-center cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "relative w-11 h-6 bg-muted rounded-full peer transition-colors",
            "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2",
            "peer-checked:bg-primary",
            "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
            "after:bg-background after:border after:border-border after:rounded-full",
            "after:h-5 after:w-5 after:transition-all after:duration-200",
            "peer-checked:after:translate-x-full peer-checked:after:border-primary-foreground"
          )}
        />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }

