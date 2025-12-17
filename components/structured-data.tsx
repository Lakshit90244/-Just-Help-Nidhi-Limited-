import type { Organization, LocalBusiness, FAQPage } from "schema-dts"

export function OrganizationSchema() {
  const schema: Organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maben Financial Services",
    url: "https://maben.in",
    logo: "https://maben.in/logo.png",
    description: "Member-based financial services offering gold loans, property loans, and deposit schemes",
    sameAs: ["https://facebook.com/maben", "https://twitter.com/maben", "https://linkedin.com/company/maben"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "9785873004, 8529574003",
      email: "bhanumenaria1@gmail.com",
      areaServed: "IN",
      availableLanguage: "en-IN",
    },
  } as any
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessSchema(branch: any) {
  const schema: LocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: branch.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: branch.state,
      postalCode: "000000",
      addressCountry: "IN",
    },
    telephone: branch.phone,
    email: branch.email,
    url: "https://maben.in/branches",
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.latitude,
      longitude: branch.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  } as any
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQSchema(faqs: Array<{ q: string; a: string }>) {
  const schema: FAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  } as any
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
