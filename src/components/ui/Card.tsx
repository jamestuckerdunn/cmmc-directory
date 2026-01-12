import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, padding = 'md', ...props }: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200', paddings[padding], className)} {...props}>
      {children}
    </div>
  )
}

interface CardSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className, ...props }: CardSubComponentProps) {
  return <div className={cn('pb-4 border-b border-gray-200', className)} {...props}>{children}</div>
}

export function CardTitle({ children, className, ...props }: CardSubComponentProps) {
  return <h3 className={cn('text-lg font-semibold text-gray-900', className)} {...props}>{children}</h3>
}

export function CardContent({ children, className, ...props }: CardSubComponentProps) {
  return <div className={cn('pt-4', className)} {...props}>{children}</div>
}

export function CardFooter({ children, className, ...props }: CardSubComponentProps) {
  return <div className={cn('pt-4 border-t border-gray-100', className)} {...props}>{children}</div>
}
