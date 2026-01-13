'use client'

import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, required, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    const describedBy = [
      error && errorId,
      hint && !error && hintId,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full px-4 py-3 border rounded transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error ? 'border-error' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="mt-1 text-sm text-gray-500">{hint}</p>
        )}
        {error && (
          <p id={errorId} className="mt-1 text-sm text-error" role="alert">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
