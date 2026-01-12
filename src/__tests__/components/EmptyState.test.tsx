import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from '@/components/ui/EmptyState'

describe('EmptyState', () => {
  it('renders with title', () => {
    render(<EmptyState title="No results" description="Try something else" />)
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

  it('renders with action button that has href', () => {
    render(
      <EmptyState
        title="No results"
        description="Try something else"
        action={{ label: 'Create new', href: '/new' }}
      />
    )
    expect(screen.getByRole('button', { name: 'Create new' })).toBeInTheDocument()
  })

  it('renders with action button that has onClick', () => {
    const handleClick = jest.fn()
    render(
      <EmptyState
        title="No results"
        description="Try something else"
        action={{ label: 'Try Again', onClick: handleClick }}
      />
    )

    const button = screen.getByRole('button', { name: 'Try Again' })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders with custom icon', () => {
    const customIcon = <svg data-testid="custom-icon" />
    render(<EmptyState title="No results" description="Try something else" icon={customIcon} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders without icon when not provided', () => {
    render(<EmptyState title="No results" description="Try something else" />)
    // Should render title without icon
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('renders with all props together', () => {
    render(
      <EmptyState
        title="No companies found"
        description="Register your first company to get started"
        action={{ label: 'Register Company', href: '/companies/new' }}
        icon={<svg data-testid="icon" />}
      />
    )

    expect(screen.getByText('No companies found')).toBeInTheDocument()
    expect(screen.getByText('Register your first company to get started')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Register Company' })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
