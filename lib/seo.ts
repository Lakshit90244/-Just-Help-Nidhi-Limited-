export function generateMetadata(page: string) {
  const metadata: Record<string, any> = {
    home: {
      title: "Maben Financial Services - Gold Loans, Property Loans & Deposits",
      description:
        "Secure, member-focused financial services with 66 branches. Easy online gold loans, doorstep service, property loans and flexible deposit schemes. Toll-free: 9785873004,     8529574003",
      keywords: ["gold loan", "property loan", "deposits", "financial services", "nidhi"],
    },
    products: {
      title: "Loan & Deposit Products - Maben Financial Services",
      description:
        "Explore our comprehensive range of gold loans, property loans, and deposit schemes with competitive rates.",
      keywords: ["gold loan", "property loan", "term deposit", "recurring deposit"],
    },
    calculator: {
      title: "Loan EMI Calculator - Calculate Your Monthly Payment",
      description: "Use our free loan calculator to estimate your EMI, total interest, and repayment schedule.",
      keywords: ["emi calculator", "loan calculator", "monthly payment"],
    },
    branches: {
      title: "Find Your Nearest Maben Branch - 66 Locations Across India",
      description: "Locate your nearest Maben Financial Services branch with address, phone, and working hours.",
      keywords: ["branch locator", "nearby branches", "contact us"],
    },
    support: {
      title: "Maben Care - Customer Support, FAQ & Complaint Form",
      description: "Get support with loan calculator, request callback, file complaints, and find answers to FAQs.",
      keywords: ["customer support", "faq", "contact support", "complaints"],
    },
    careers: {
      title: "Careers at Maben Financial Services - Join Our Team",
      description:
        "Explore career opportunities at Maben. Competitive compensation, growth opportunities, and great work culture.",
      keywords: ["careers", "jobs", "employment", "recruitment"],
    },
    ir: {
      title: "Investor Relations - Financial Results & Governance",
      description:
        "Access financial statements, annual reports, board governance information, and company announcements.",
      keywords: ["investor relations", "financial results", "annual report", "governance"],
    },
  }

  return metadata[page] || metadata.home
}

export function generateCanonical(path: string) {
  return `https://maben.in${path}`
}

export function generateOGTags(page: string, imageUrl = "/og-image.jpg") {
  const metadata = generateMetadata(page)
  return {
    "og:title": metadata.title,
    "og:description": metadata.description,
    "og:image": imageUrl,
    "og:type": "website",
    "twitter:card": "summary_large_image",
    "twitter:title": metadata.title,
    "twitter:description": metadata.description,
  }
}
