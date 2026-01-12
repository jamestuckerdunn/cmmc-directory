'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { US_STATES, CMMC_LEVELS } from '@/constants'

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
  const [search, setSearch] = useState(currentFilters.search || '')
  const [level, setLevel] = useState(currentFilters.level || '')
  const [state, setState] = useState(currentFilters.state || '')
  const [naics, setNaics] = useState(currentFilters.naics || '')

  function handleApplyFilters() {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (level) params.set('level', level)
    if (state) params.set('state', state)
    if (naics) params.set('naics', naics)
    router.push(`/directory?${params.toString()}`)
  }

  function handleClearFilters() {
    setSearch('')
    setLevel('')
    setState('')
    setNaics('')
    router.push('/directory')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleApplyFilters()
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
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button variant="ghost" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  )
}
