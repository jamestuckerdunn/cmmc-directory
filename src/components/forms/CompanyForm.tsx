'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { US_STATES, CMMC_LEVELS_EXTENDED, ASSESSMENT_TYPES } from '@/constants'

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
                <Textarea
                  name="description"
                  label="Description"
                  rows={3}
                  placeholder="Brief description of your company and services..."
                  defaultValue={initialData?.description}
                  disabled={isSubmitting}
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
                options={[...US_STATES]}
                placeholder="Select state"
                required
                defaultValue={initialData?.state}
                disabled={isSubmitting}
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
                options={[...CMMC_LEVELS_EXTENDED]}
                placeholder="Select certification level"
                required
                defaultValue={initialData?.cmmc_level?.toString()}
                disabled={isSubmitting}
              />
              <Select
                name="assessment_type"
                label="Assessment Type *"
                options={[...ASSESSMENT_TYPES]}
                placeholder="Select assessment type"
                required
                defaultValue={initialData?.assessment_type}
                disabled={isSubmitting}
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
              Select the NAICS codes that apply to your company&apos;s services.
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
