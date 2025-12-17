"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

const loanProducts = [
  { id: "gold-loan", name: "Gold Loan", maxAmount: 5000000, rate: "12.5%" },
  { id: "property-loan", name: "Property Loan", maxAmount: 50000000, rate: "9%" },
]

export default function ApplyLoanPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [formData, setFormData] = useState({
    amount: 0,
    tenure: 24,
    purpose: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) router.push("/login")
    else setUser(JSON.parse(storedUser))
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => router.push("/dashboard/loans"), 2000)
  }

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Apply for a Loan</h1>
            <p className="text-foreground/70">Quick and easy loan application</p>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Loan Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle size={20} className="text-green-700 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">Application Submitted!</p>
                      <p className="text-sm text-green-800">You'll be redirected to your loans page...</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Label className="text-foreground font-semibold">Select Product</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {loanProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedProduct === product.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold text-foreground">{product.name}</p>
                        <p className="text-sm text-foreground/70">Rate: {product.rate}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProduct && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-foreground">
                        Loan Amount (₹)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        min="10000"
                        max={loanProducts.find((p) => p.id === selectedProduct)?.maxAmount}
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                        placeholder="Enter loan amount"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tenure" className="text-foreground">
                        Tenure (months)
                      </Label>
                      <Input
                        id="tenure"
                        type="number"
                        min="3"
                        max="60"
                        value={formData.tenure}
                        onChange={(e) => setFormData({ ...formData, tenure: Number(e.target.value) })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purpose" className="text-foreground">
                        Purpose
                      </Label>
                      <textarea
                        id="purpose"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        placeholder="Please describe the purpose of this loan"
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Submit Application
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
