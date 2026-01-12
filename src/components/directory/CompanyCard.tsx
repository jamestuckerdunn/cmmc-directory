import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getLevelBadgeVariant } from '@/constants'
import type { Company } from '@/types'

interface CompanyCardProps {
  company: Company & {
    company_naics?: { naics_codes: { code: string; title: string } }[]
  }
}

export const CompanyCard = memo(function CompanyCard({ company }: CompanyCardProps) {
  const levelVariant = getLevelBadgeVariant(company.cmmc_level)

  const levelColors = {
    1: 'from-blue-500 to-blue-600',
    2: 'from-purple-500 to-purple-600',
    3: 'from-navy-600 to-navy-800',
  }

  return (
    <Link href={`/directory/${company.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
        {/* Top accent bar based on level */}
        <div className={`h-1 -mx-6 -mt-6 mb-4 bg-gradient-to-r ${levelColors[company.cmmc_level as 1 | 2 | 3] || levelColors[1]}`} />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {company.logo_url ? (
              <Image
                src={company.logo_url}
                alt={`${company.name} logo`}
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className={`w-14 h-14 bg-gradient-to-br ${levelColors[company.cmmc_level as 1 | 2 | 3] || levelColors[1]} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                <span className="text-white font-bold text-xl">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-accent transition-colors">
                {company.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-0.5">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{company.city}, {company.state}</span>
              </div>
            </div>
          </div>
          {company.is_featured && (
            <Badge variant="warning" className="flex-shrink-0 ml-2">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {company.description || 'CMMC certified contractor providing secure solutions for defense industry requirements.'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={levelVariant} className="font-medium">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Level {company.cmmc_level}
          </Badge>
          {company.company_naics?.slice(0, 2).map((cn) => (
            <Badge key={cn.naics_codes.code} variant="default" className="text-xs">
              {cn.naics_codes.code}
            </Badge>
          ))}
          {(company.company_naics?.length || 0) > 2 && (
            <Badge variant="default" className="text-xs">
              +{(company.company_naics?.length || 0) - 2} more
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {company.assessment_type === 'c3pao' ? 'C3PAO Assessed' :
             company.assessment_type === 'dibcac' ? 'DIBCAC Assessed' :
             'Self-Assessed'}
          </span>
          <span className="text-accent font-medium text-sm group-hover:underline flex items-center">
            View Profile
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Card>
    </Link>
  )
})
