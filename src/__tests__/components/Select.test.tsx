import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from '@/components/ui/Select'

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]

  it('renders correctly', () => {
    render(<Select options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Select label="Choose option" options={options} id="select" />)
    expect(screen.getByLabelText('Choose option')).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<Select options={options} />)
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('renders with placeholder', () => {
    render(<Select options={options} placeholder="Select one" />)
    expect(screen.getByText('Select one')).toBeInTheDocument()
  })

  it('handles onChange events', () => {
    const handleChange = jest.fn()
    render(<Select options={options} onChange={handleChange} />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '2' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('can be controlled with value prop', () => {
    render(<Select options={options} value="2" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveValue('2')
  })

  it('applies custom className', () => {
    render(<Select options={options} className="custom-class" />)
    expect(screen.getByRole('combobox')).toHaveClass('custom-class')
  })

  it('can be disabled', () => {
    render(<Select options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('supports required attribute', () => {
    render(<Select options={options} required />)
    expect(screen.getByRole('combobox')).toBeRequired()
  })

  it('shows error state', () => {
    render(<Select options={options} error="Select an option" />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })
})
