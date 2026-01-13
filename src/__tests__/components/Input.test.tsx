import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<Input label="Email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('handles onChange events', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('handles onKeyDown events', () => {
    const handleKeyDown = jest.fn()
    render(<Input onKeyDown={handleKeyDown} />)

    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(handleKeyDown).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('custom-class')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    // Password inputs don't have the textbox role
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument()
  })

  it('supports required attribute', () => {
    render(<Input label="Required Field" required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('shows asterisk for required fields with label', () => {
    render(<Input label="Email" required />)
    // The label should indicate required status
    expect(screen.getByText('*')).toBeInTheDocument()
  })
})
