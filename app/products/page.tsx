"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const productCategories = [
  {
    id: "gold-loans",
    title: "Gold Loans",
    description: "Quick and easy access to cash against your gold",
    products: [
      {
        id: "gold-loan",
        name: "Gold Loan",
        description: "Instant cash against your gold ornaments",
        rate: "11.5% - 13%",
        maxLoan: "₹50 Lakh",
        tenure: "3 - 60 months",
      },
      {
        id: "online-gold-loan",
        name: "Online Gold Loan",
        description: "Complete process online from home",
        rate: "11% - 12.5%",
        maxLoan: "₹30 Lakh",
        tenure: "3 - 60 months",
      },
      {
        id: "doorstep-gold-loan",
        name: "Doorstep Gold Loan",
        description: "We come to your location",
        rate: "12% - 13.5%",
        maxLoan: "₹25 Lakh",
        tenure: "3 - 60 months",
      },
    ],
  },
  {
    id: "property-loans",
    title: "Property Loans",
    description: "Flexible loans against your property",
    products: [
      {
        id: "property-loan",
        name: "Loan Against Property",
        description: "Secure loans against your property",
        rate: "8.5% - 10%",
        maxLoan: "₹1 Crore",
        tenure: "12 - 240 months",
      },
      {
        id: "instant-property-loan",
        name: "Instant Property Loan",
        description: "Quick property loan approval",
        rate: "8% - 9.5%",
        maxLoan: "₹50 Lakh",
        tenure: "12 - 180 months",
      },
    ],
  },
  {
    id: "deposits",
    title: "Deposit Schemes",
    description: "Secure and flexible deposit options",
    products: [
      {
        id: "term-deposit",
        name: "Term Deposit",
        description: "Fixed term deposits with attractive returns",
        rate: "7.5% - 8.5%",
        minAmount: "₹5,000",
        tenure: "6 - 60 months",
      },
      {
        id: "recurring-deposit",
        name: "Recurring Deposit",
        description: "Regular monthly deposit scheme",
        rate: "7% - 8%",
        minAmount: "₹500/month",
        tenure: "12 - 120 months",
      },
      {
        id: "savings-deposit",
        name: "Savings Deposit",
        description: "Flexible savings with insurance",
        rate: "6.5% - 7%",
        minAmount: "₹1,000",
        tenure: "Flexible",
      },
    ],
  },
]

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Our Products</h1>
              <p className="text-xl text-foreground/70 text-balance">
                Explore our comprehensive range of financial products designed for your needs
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {productCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{category.title}</h2>
                  <p className="text-lg text-foreground/70">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products.map((product) => (
                    <Card key={product.id} className="border-border/50 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg text-foreground">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          {product.rate && (
                            <div className="flex justify-between">
                              <span className="text-foreground/70">Interest Rate:</span>
                              <span className="font-semibold text-foreground">{product.rate}</span>
                            </div>
                          )}
                          {"maxLoan" in product && product.maxLoan && (
                            <div className="flex justify-between">
                              <span className="text-foreground/70">Max Loan:</span>
                              <span className="font-semibold text-foreground">{product.maxLoan}</span>
                            </div>
                          )}
                          {"minAmount" in product && product.minAmount && (
                            <div className="flex justify-between">
                              <span className="text-foreground/70">Min Amount:</span>
                              <span className="font-semibold text-foreground">{product.minAmount}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-foreground/70">Tenure:</span>
                            <span className="font-semibold text-foreground">{product.tenure}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Link href="/signup" className="flex-1">
                            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                              Apply Now
                            </Button>
                          </Link>
                          <Link href={`/products/${product.id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
