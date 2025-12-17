"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Share2 } from "lucide-react"

export default function CalculatorPage() {
  const [loanType, setLoanType] = useState("gold-loan")
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(12.5)
  const [tenure, setTenure] = useState(24)
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Calculate EMI using formula: EMI = [P × r/100 × (1 + r/100)^n] / [(1 + r/100)^n - 1]
  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)
    return Math.round(emi)
  }

  const emi = calculateEMI()
  const totalAmount = emi * tenure
  const totalInterest = totalAmount - principal

  const loanProducts: Record<string, { name: string; defaultRate: number; minAmount: number; maxAmount: number }> = {
    "gold-loan": { name: "Gold Loan", defaultRate: 12.5, minAmount: 10000, maxAmount: 5000000 },
    "online-gold-loan": { name: "Online Gold Loan", defaultRate: 11.5, minAmount: 25000, maxAmount: 3000000 },
    "property-loan": { name: "Property Loan", defaultRate: 9, minAmount: 100000, maxAmount: 50000000 },
    "instant-property-loan": { name: "Instant Property Loan", defaultRate: 8.5, minAmount: 100000, maxAmount: 5000000 },
  }

  const product = loanProducts[loanType]

  const handleProductChange = (newType: string) => {
    setLoanType(newType)
    setRate(loanProducts[newType].defaultRate)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Loan Calculator</h1>
              <p className="text-xl text-foreground/70 text-balance">
                Calculate your EMI and understand your loan costs
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Calculate Your EMI</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Product Selection */}
                    <div className="space-y-3">
                      <Label className="text-foreground font-semibold">Loan Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(loanProducts).map(([key, prod]) => (
                          <button
                            key={key}
                            onClick={() => handleProductChange(key)}
                            className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                              loanType === key
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border text-foreground/70 hover:border-primary/50"
                            }`}
                          >
                            {prod.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Principal Amount */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="principal" className="text-foreground">
                          Loan Amount: ₹{principal.toLocaleString()}
                        </Label>
                        <span className="text-xs text-foreground/70">Max: ₹{product.maxAmount.toLocaleString()}</span>
                      </div>
                      <input
                        id="principal"
                        type="range"
                        min={product.minAmount}
                        max={product.maxAmount}
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        step={10000}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rate" className="text-foreground">
                          Interest Rate: {rate.toFixed(2)}% p.a.
                        </Label>
                      </div>
                      <input
                        id="rate"
                        type="range"
                        min="5"
                        max="20"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        step="0.1"
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <Input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        step="0.1"
                        className="mt-2"
                      />
                    </div>

                    {/* Tenure */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tenure" className="text-foreground">
                          Loan Tenure: {tenure} months
                        </Label>
                        <span className="text-xs text-foreground/70">({(tenure / 12).toFixed(1)} years)</span>
                      </div>
                      <input
                        id="tenure"
                        type="range"
                        min="3"
                        max="60"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        step="1"
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <Input
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>

                    {/* Toggle Breakdown */}
                    <Button variant="outline" onClick={() => setShowBreakdown(!showBreakdown)} className="w-full">
                      {showBreakdown ? "Hide Breakdown" : "Show Breakdown"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="text-foreground text-lg">Your EMI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary mb-2">₹{emi.toLocaleString()}</p>
                    <p className="text-sm text-foreground/70">Monthly Payment</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Loan Amount</span>
                      <span className="font-semibold text-foreground">₹{principal.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="text-foreground/70">Total Interest</span>
                      <span className="font-semibold text-foreground">₹{totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="text-foreground/70">Total Amount</span>
                      <span className="font-bold text-lg text-primary">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Download size={16} className="mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
              </div>
            </div>

            {/* Breakdown */}
            {showBreakdown && (
              <Card className="border-border/50 mt-8">
                <CardHeader>
                  <CardTitle className="text-foreground">Amortization Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-2 text-left text-foreground font-semibold">Month</th>
                          <th className="px-4 py-2 text-right text-foreground font-semibold">EMI</th>
                          <th className="px-4 py-2 text-right text-foreground font-semibold">Principal</th>
                          <th className="px-4 py-2 text-right text-foreground font-semibold">Interest</th>
                          <th className="px-4 py-2 text-right text-foreground font-semibold">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(Math.min(tenure, 12))].map((_, idx) => {
                          const monthlyRate = rate / 12 / 100
                          let balance = principal
                          let totalPaid = 0

                          for (let i = 0; i <= idx; i++) {
                            const interest = balance * monthlyRate
                            const principalPaid = emi - interest
                            balance -= principalPaid
                            if (i === idx) {
                              totalPaid = interest
                              return (
                                <tr key={idx} className="border-b border-border hover:bg-muted/30">
                                  <td className="px-4 py-2 text-foreground">{idx + 1}</td>
                                  <td className="px-4 py-2 text-right text-foreground font-medium">
                                    ₹{emi.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-2 text-right text-foreground">
                                    ₹{Math.round(principalPaid).toLocaleString()}
                                  </td>
                                  <td className="px-4 py-2 text-right text-foreground">
                                    ₹{Math.round(interest).toLocaleString()}
                                  </td>
                                  <td className="px-4 py-2 text-right text-foreground font-semibold">
                                    ₹{Math.round(Math.max(0, balance)).toLocaleString()}
                                  </td>
                                </tr>
                              )
                            }
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-foreground/70 mt-4">
                    Showing first 12 months of {tenure} months. For complete schedule, download PDF.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
