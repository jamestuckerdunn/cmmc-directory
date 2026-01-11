'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'Washington D.C.' },
]

const CMMC_LEVELS = [
  { value: '1', label: 'Level 1 - Foundational' },
  { value: '2', label: 'Level 2 - Advanced' },
  { value: '3', label: 'Level 3 - Expert' },
]

interface SearchFiltersProps {
  naicsCodes: { code: string; title: string }[]
  currentFilters: {
    search?: string
    level?: string
    state?: string
    naics?: string
  }
}

export function SearchFilters({ naicsCodes, currentFilters }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(currentFilters.search || '')
  const [level, setLevel] = useState(currentFilters.level || '')
  const [state, setState] = useState(currentFilters.state || '')
  const [naics, setNaics] = useState(currentFilters.naics || '')

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (level) params.set('level', level)
    if (state) params.set('state', state)
    if (naics) params.set('naics', naics)
    router.push(`/directory?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setLevel('')
    setState('')
    setNaics('')
    router.push('/directory')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters()
    }
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Companies</h2>

      <div className="space-y-4">
        <Input
          label="Search"
          placeholder="Company name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Select
          label="CMMC Level"
          options={CMMC_LEVELS}
          placeholder="Any level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <Select
          label="State"
          options={US_STATES}
          placeholder="Any state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <Select
          label="NAICS Code"
          options={naicsCodes.map(n => ({ value: n.code, label: `${n.code} - ${n.title}` }))}
          placeholder="Any NAICS code"
          value={naics}
          onChange={(e) => setNaics(e.target.value)}
        />

        <div className="flex flex-col space-y-2">
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="ghost" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  )
}
