import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('renders with default variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
  })

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders with error variant', () => {
    render(<Badge variant="error">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('renders with level1 variant', () => {
    render(<Badge variant="level1">Level 1</Badge>)
    const badge = screen.getByText('Level 1')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('renders with level2 variant', () => {
    render(<Badge variant="level2">Level 2</Badge>)
    const badge = screen.getByText('Level 2')
    expect(badge).toHaveClass('bg-purple-100', 'text-purple-800')
  })

  it('renders with level3 variant', () => {
    render(<Badge variant="level3">Level 3</Badge>)
    const badge = screen.getByText('Level 3')
    expect(badge).toHaveClass('bg-navy-100', 'text-navy-800')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-class')
  })

  it('renders as a span element', () => {
    render(<Badge>Span Badge</Badge>)
    const badge = screen.getByText('Span Badge')
    expect(badge.tagName).toBe('SPAN')
  })

  it('has proper base styling', () => {
    render(<Badge>Styled</Badge>)
    const badge = screen.getByText('Styled')
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-full',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold'
    )
  })
})
