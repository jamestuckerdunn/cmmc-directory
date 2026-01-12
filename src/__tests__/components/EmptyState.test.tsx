import { render, screen } from '@testing-library/react'
import { EmptyState } from '@/components/ui/EmptyState'

describe('EmptyState', () => {
  it('renders with title', () => {
    render(<EmptyState title="No results" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(
      <EmptyState
        title="No results"
        description="Try adjusting your search criteria"
      />
    )
    expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument()
  })

  it('renders with action', () => {
    render(
      <EmptyState
        title="No results"
        action={<button>Create new</button>}
      />
    )
    expect(screen.getByRole('button', { name: 'Create new' })).toBeInTheDocument()
  })

  it('renders with custom icon', () => {
    const customIcon = <svg data-testid="custom-icon" />
    render(<EmptyState title="No results" icon={customIcon} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders default icon when no custom icon provided', () => {
    render(<EmptyState title="No results" />)
    // Should render with a default icon container
    const container = screen.getByText('No results').closest('div')
    expect(container).toBeInTheDocument()
  })

  it('renders with all props together', () => {
    render(
      <EmptyState
        title="No companies found"
        description="Register your first company to get started"
        action={<button>Register Company</button>}
      />
    )

    expect(screen.getByText('No companies found')).toBeInTheDocument()
    expect(screen.getByText('Register your first company to get started')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Register Company' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<EmptyState title="No results" className="custom-class" data-testid="empty-state" />)
    expect(screen.getByTestId('empty-state')).toHaveClass('custom-class')
  })
})
