"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

const rateCards = [
  {
    category: "Gold Loans",
    rates: [
      { product: "Standard Gold Loan", rate: "11.5% - 13%" },
      { product: "Online Gold Loan", rate: "11% - 12.5%" },
      { product: "Doorstep Gold Loan", rate: "12% - 13.5%" },
    ],
  },
  {
    category: "Property Loans",
    rates: [
      { product: "Loan Against Property", rate: "8.5% - 10%" },
      { product: "Instant Property Loan", rate: "8% - 9.5%" },
      { product: "Loan Against Deposit", rate: "7.5% - 8.5%" },
    ],
  },
  {
    category: "Deposits",
    rates: [
      { product: "Term Deposit", rate: "7.5% - 8.5%" },
      { product: "Recurring Deposit", rate: "7% - 8%" },
      { product: "Savings Deposit", rate: "6.5% - 7%" },
    ],
  },
]

export default function RatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Current Rates</h1>
              <p className="text-xl text-foreground/70 text-balance">Competitive interest rates on all our products</p>
              <p className="text-sm text-foreground/60">Rates are effective from November 2024 and subject to change</p>
            </div>
          </div>
        </section>

        {/* Rates */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rateCards.map((card, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{card.category}</h2>
                  <div className="space-y-3">
                    {card.rates.map((rate, ridx) => (
                      <Card key={ridx} className="border-border/50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-foreground">{rate.product}</p>
                            <p className="text-primary font-bold">{rate.rate} p.a.</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-16 bg-muted/30 border border-border rounded-lg p-6">
              <p className="text-foreground/70 text-sm">
                <strong>Disclaimer:</strong> Interest rates are indicative and subject to change based on market
                conditions, credit profile, and loan tenure. Actual rates will be communicated at the time of
                application. Processing fees, insurance charges, and other applicable fees are additional.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
