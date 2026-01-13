'use client'

import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, required, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const errorId = `${selectId}-error`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full px-4 py-3 border rounded transition-colors appearance-none',
            'bg-white bg-no-repeat bg-right',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error ? 'border-error' : 'border-gray-300',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.5em 1.5em',
          }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-error" role="alert">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
