import Script from 'next/script'

interface OrganizationJsonLdProps {
  name: string
  url: string
  logo?: string
  description?: string
  contactPoint?: {
    type: string
    email?: string
    telephone?: string
  }
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  description,
  contactPoint,
}: OrganizationJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: contactPoint.type,
        ...(contactPoint.email && { email: contactPoint.email }),
        ...(contactPoint.telephone && { telephone: contactPoint.telephone }),
      },
    }),
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface LocalBusinessJsonLdProps {
  name: string
  description?: string
  url?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  priceRange?: string
  image?: string
}

export function LocalBusinessJsonLd({
  name,
  description,
  url,
  telephone,
  email,
  address,
  priceRange,
  image,
}: LocalBusinessJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    ...(description && { description }),
    ...(url && { url }),
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...(address.streetAddress && { streetAddress: address.streetAddress }),
        ...(address.addressLocality && { addressLocality: address.addressLocality }),
        ...(address.addressRegion && { addressRegion: address.addressRegion }),
        ...(address.postalCode && { postalCode: address.postalCode }),
        ...(address.addressCountry && { addressCountry: address.addressCountry || 'US' }),
      },
    }),
    ...(priceRange && { priceRange }),
    ...(image && { image }),
  }

  return (
    <Script
      id="local-business-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQPageJsonLdProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQPageJsonLd({ questions }: FAQPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ServiceJsonLdProps {
  name: string
  description: string
  provider: string
  areaServed?: string
  serviceType?: string
}

export function ServiceJsonLd({
  name,
  description,
  provider,
  areaServed,
  serviceType,
}: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    ...(areaServed && { areaServed }),
    ...(serviceType && { serviceType }),
  }

  return (
    <Script
      id="service-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebSiteJsonLdProps {
  name: string
  url: string
  description?: string
  potentialAction?: {
    queryInput: string
    target: string
  }
}

export function WebSiteJsonLd({
  name,
  url,
  description,
  potentialAction,
}: WebSiteJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    ...(description && { description }),
    ...(potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: potentialAction.target,
        'query-input': potentialAction.queryInput,
      },
    }),
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
