'use client'

import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = id || generatedId
    const errorId = `${checkboxId}-error`
    const descriptionId = `${checkboxId}-description`

    const describedBy = [
      description && descriptionId,
      error && errorId,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              'h-4 w-4 rounded border-gray-300 text-accent',
              'focus:ring-2 focus:ring-accent focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-error',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm leading-6">
            {label && (
              <label htmlFor={checkboxId} className="font-medium text-gray-900 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p id={descriptionId} className="text-gray-500">
                {description}
              </p>
            )}
          </div>
        )}
        {error && (
          <p id={errorId} className="absolute -bottom-5 left-7 text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// CheckboxGroup for multiple related checkboxes
interface CheckboxGroupProps {
  label?: string
  description?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function CheckboxGroup({ label, description, error, children, className }: CheckboxGroupProps) {
  const groupId = useId()

  return (
    <fieldset className={className}>
      {label && (
        <legend className="text-sm font-semibold text-gray-700 mb-2">{label}</legend>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}
      <div className="space-y-2" role="group" aria-labelledby={label ? `${groupId}-label` : undefined}>
        {children}
      </div>
      {error && (
        <p className="mt-2 text-sm text-error" role="alert">{error}</p>
      )}
    </fieldset>
  )
}
