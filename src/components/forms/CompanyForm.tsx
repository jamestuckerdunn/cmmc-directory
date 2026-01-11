'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const CMMC_LEVELS = [
  { value: '1', label: 'Level 1 - Foundational (15 practices, self-assessment)' },
  { value: '2', label: 'Level 2 - Advanced (110 practices, C3PAO assessment)' },
  { value: '3', label: 'Level 3 - Expert (110+ practices, DIBCAC assessment)' },
]

const ASSESSMENT_TYPES = [
  { value: 'self', label: 'Self-Assessment' },
  { value: 'c3pao', label: 'C3PAO Assessment' },
  { value: 'dibcac', label: 'DIBCAC Assessment' },
]

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

interface CompanyFormProps {
  naicsCodes: { code: string; title: string }[]
  initialData?: {
    id?: string
    name?: string
    description?: string
    website?: string
    email?: string
    phone?: string
    address_line1?: string
    address_line2?: string
    city?: string
    state?: string
    zip_code?: string
    cmmc_level?: number
    assessment_type?: string
    certification_date?: string
    certification_expiry?: string
    c3pao_name?: string
    naics_codes?: string[]
  }
}

export function CompanyForm({ naicsCodes, initialData }: CompanyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch('/api/companies', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          id: initialData?.id,
          cmmc_level: parseInt(data.cmmc_level as string),
          naics_codes: formData.getAll('naics_codes'),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save company')
      }

      const { id } = await response.json()
      router.push(`/companies/${id}`)
      router.refresh()
    } catch (error) {
      setErrors({ submit: (error as Error).message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                label="Company Name *"
                required
                defaultValue={initialData?.name}
              />
              <Input
                name="website"
                label="Website"
                type="url"
                placeholder="https://example.com"
                defaultValue={initialData?.website}
              />
              <Input
                name="email"
                label="Contact Email *"
                type="email"
                required
                defaultValue={initialData?.email}
              />
              <Input
                name="phone"
                label="Phone Number"
                type="tel"
                defaultValue={initialData?.phone}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Brief description of your company and services..."
                  defaultValue={initialData?.description}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  name="address_line1"
                  label="Street Address *"
                  required
                  defaultValue={initialData?.address_line1}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  name="address_line2"
                  label="Address Line 2"
                  placeholder="Suite, Unit, Building, Floor, etc."
                  defaultValue={initialData?.address_line2}
                />
              </div>
              <Input
                name="city"
                label="City *"
                required
                defaultValue={initialData?.city}
              />
              <Select
                name="state"
                label="State *"
                options={US_STATES}
                placeholder="Select state"
                required
                defaultValue={initialData?.state}
              />
              <Input
                name="zip_code"
                label="ZIP Code *"
                required
                defaultValue={initialData?.zip_code}
              />
            </div>
          </CardContent>
        </Card>

        {/* CMMC Certification */}
        <Card>
          <CardHeader>
            <CardTitle>CMMC Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="cmmc_level"
                label="CMMC Level *"
                options={CMMC_LEVELS}
                placeholder="Select certification level"
                required
                defaultValue={initialData?.cmmc_level?.toString()}
              />
              <Select
                name="assessment_type"
                label="Assessment Type *"
                options={ASSESSMENT_TYPES}
                placeholder="Select assessment type"
                required
                defaultValue={initialData?.assessment_type}
              />
              <Input
                name="certification_date"
                label="Certification Date"
                type="date"
                defaultValue={initialData?.certification_date}
              />
              <Input
                name="certification_expiry"
                label="Certification Expiry"
                type="date"
                defaultValue={initialData?.certification_expiry}
              />
              <div className="md:col-span-2">
                <Input
                  name="c3pao_name"
                  label="C3PAO Name (if applicable)"
                  placeholder="Name of the C3PAO that performed assessment"
                  defaultValue={initialData?.c3pao_name}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NAICS Codes */}
        <Card>
          <CardHeader>
            <CardTitle>NAICS Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Select the NAICS codes that apply to your company's services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-200 rounded p-4">
              {naicsCodes.map((code) => (
                <label key={code.code} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    name="naics_codes"
                    value={code.code}
                    className="mt-1"
                    defaultChecked={initialData?.naics_codes?.includes(code.code)}
                  />
                  <span className="text-sm">
                    <strong>{code.code}</strong> - {code.title}
                  </span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {initialData?.id ? 'Update Company' : 'Register Company'}
          </Button>
        </div>
      </div>
    </form>
  )
}
