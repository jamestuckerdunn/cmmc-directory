import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Company } from '@/types'

interface CompanyCardProps {
  company: Company & {
    company_naics?: { naics_codes: { code: string; title: string } }[]
  }
}

export function CompanyCard({ company }: CompanyCardProps) {
  const levelVariant = {
    1: 'level1',
    2: 'level2',
    3: 'level3',
  }[company.cmmc_level] as 'level1' | 'level2' | 'level3'

  return (
    <Link href={`/directory/${company.id}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={company.name}
                className="w-12 h-12 rounded object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-navy-100 rounded flex items-center justify-center">
                <span className="text-navy-800 font-bold text-lg">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{company.name}</h3>
              <p className="text-sm text-gray-500">
                {company.city}, {company.state}
              </p>
            </div>
          </div>
          {company.is_featured && (
            <Badge variant="warning">Featured</Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {company.description || 'No description available.'}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant={levelVariant}>
            CMMC Level {company.cmmc_level}
          </Badge>
          {company.company_naics?.slice(0, 2).map((cn) => (
            <Badge key={cn.naics_codes.code} variant="default">
              {cn.naics_codes.code}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  )
}
