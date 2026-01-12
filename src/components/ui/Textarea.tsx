'use client'

import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, required, rows = 3, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id || generatedId
    const errorId = `${textareaId}-error`
    const hintId = `${textareaId}-hint`

    const describedBy = [
      error && errorId,
      hint && !error && hintId,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full px-4 py-3 border rounded transition-colors resize-y',
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

Textarea.displayName = 'Textarea'
