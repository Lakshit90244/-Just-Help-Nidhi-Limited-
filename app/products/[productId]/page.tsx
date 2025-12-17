"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import Link from "next/link"

const productDetails: Record<string, any> = {
  "gold-loan": {
    name: "Gold Loan",
    category: "Gold Loans",
    description: "Instant cash against your gold ornaments with transparent rates and insurance.",
    rate: "11.5% - 13%",
    maxLoan: "₹50 Lakh",
    tenure: "3 - 60 months",
    ltv: "Up to 80%",
    processing: "₹0 - ₹2,500",
    features: [
      "Instant approval and disbursement",
      "Insurance coverage on gold ornaments",
      "No prepayment penalty",
      "Flexible repayment options",
      "Online and offline application",
      "Available 24/7",
    ],
    eligibility: [
      "Indian citizen aged 18-75 years",
      "Must have valid ID proof (Aadhaar, PAN, DL)",
      "Address proof required",
      "Gold ornaments must be hallmarked",
    ],
    documents: ["Valid ID proof", "Address proof", "PAN Card (optional)", "Gold ornaments for valuation"],
    process: [
      { step: 1, title: "Application", desc: "Fill online or offline application form" },
      { step: 2, title: "Verification", desc: "Document verification and gold valuation" },
      { step: 3, title: "Approval", desc: "Instant approval based on gold value" },
      { step: 4, title: "Disbursement", desc: "Money credited to your account" },
    ],
    faqs: [
      { q: "How much can I borrow?", a: "Up to 80% of the market value of your gold ornaments." },
      { q: "What is the processing time?", a: "Usually 30 minutes to 2 hours." },
      { q: "Is my gold safe?", a: "Yes, all gold is insured and kept in secure vaults." },
      { q: "Can I repay early?", a: "Yes, with no additional charges or penalty." },
    ],
  },
  "online-gold-loan": {
    name: "Online Gold Loan",
    category: "Gold Loans",
    description: "Complete digital gold loan process - apply, verify, and get approved online.",
    rate: "11% - 12.5%",
    maxLoan: "₹30 Lakh",
    tenure: "3 - 60 months",
    ltv: "Up to 75%",
    processing: "₹0 - ₹1,500",
    features: [
      " 100% online process",
      "Video KYC verification",
      "Home delivery available",
      "E-sign documents",
      "Instant approval",
      "Competitive rates",
    ],
    eligibility: [
      "Indian resident with valid ID",
      "Age between 21-70 years",
      "Smartphone with camera",
      "Stable internet connection",
    ],
    documents: ["Aadhaar or PAN", "Video KYC", "Bank account details"],
    process: [
      { step: 1, title: "Online Application", desc: "Apply through our website/app" },
      { step: 2, title: "Video KYC", desc: "Complete video verification in 5 minutes" },
      { step: 3, title: "Instant Approval", desc: "Get approved within 30 minutes" },
      { step: 4, title: "Collection & Disbursement", desc: "We collect gold and disburse funds" },
    ],
    faqs: [
      { q: "How do I submit gold online?", a: "Schedule pickup from our website and we collect it." },
      { q: "What about video KYC security?", a: "Your video is encrypted and stored securely." },
      { q: "How long does approval take?", a: "Usually 30 minutes after completing KYC." },
    ],
  },
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = productDetails[productId] || productDetails["gold-loan"]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 mb-8">
              <p className="text-primary font-semibold">{product.category}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{product.name}</h1>
              <p className="text-xl text-foreground/70 text-balance">{product.description}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-background/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="text-xs text-foreground/70 mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold text-primary">{product.rate}</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="text-xs text-foreground/70 mb-1">Max Loan</p>
                  <p className="text-2xl font-bold text-primary">{product.maxLoan}</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="text-xs text-foreground/70 mb-1">Tenure</p>
                  <p className="text-2xl font-bold text-primary">{product.tenure}</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="text-xs text-foreground/70 mb-1">LTV</p>
                  <p className="text-2xl font-bold text-primary">{product.ltv}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, idx: number) => (
                  <Card key={idx} className="border-border/50">
                    <CardContent className="pt-6 flex gap-3">
                      <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-foreground">{feature}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Eligibility Criteria</h2>
              <Card className="border-border/50">
                <CardContent className="pt-6 space-y-3">
                  {product.eligibility.map((criteria: string, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <AlertCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-foreground/70">{criteria}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Required Documents</h2>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {product.documents.map((doc: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-foreground/70">
                        <span className="text-primary">✓</span> {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Application Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {product.process.map((proc: any) => (
                  <Card key={proc.step} className="border-border/50">
                    <CardHeader>
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mb-2">
                        {proc.step}
                      </div>
                      <CardTitle className="text-lg text-foreground">{proc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70">{proc.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {product.faqs.map((faq: any, idx: number) => (
                  <Card key={idx} className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground flex gap-2">
                        <HelpCircle size={20} className="text-primary flex-shrink-0" />
                        {faq.q}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Apply?</h3>
              <p className="text-foreground/70 mb-6 text-balance">
                Get instant approval and cash in your account. No hidden charges, transparent process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                    Apply Now
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Use Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
