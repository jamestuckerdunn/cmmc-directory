import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-accent')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-navy-800')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-2')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('hover:bg-navy-50')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2.5')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    // Should have spinner SVG when loading
    expect(button.querySelector('svg.animate-spin')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Button ref={ref}>With Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('sets correct button type', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')

    rerender(<Button type="reset">Reset</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
  })
})
