"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Download, Eye } from "lucide-react"
import Link from "next/link"

const mockLoans = [
  {
    id: 1,
    loanId: "LOAN-2024-001",
    productName: "Gold Loan",
    amount: 500000,
    tenure: "24 months",
    ratePerAnnum: 12.5,
    emi: 21987,
    startDate: "2024-08-15",
    maturityDate: "2026-08-15",
    status: "Active",
    paidEmi: 8,
    dueEmi: "2024-12-15",
  },
  {
    id: 2,
    loanId: "LOAN-2024-002",
    productName: "Online Gold Loan",
    amount: 300000,
    tenure: "12 months",
    ratePerAnnum: 11.5,
    emi: 25587,
    startDate: "2024-09-01",
    maturityDate: "2025-09-01",
    status: "Active",
    paidEmi: 3,
    dueEmi: "2024-12-01",
  },
]

export default function LoansPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) router.push("/login")
    else setUser(JSON.parse(storedUser))
  }, [router])

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Loans</h1>
            <p className="text-foreground/70">Track your active loans and manage payments</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">Total Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">₹8,00,000</p>
                <p className="text-xs text-foreground/70 mt-1">Across 2 loans</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">Next EMI Due</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-accent">₹47,574</p>
                <p className="text-xs text-foreground/70 mt-1">Due on 2024-12-15</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">Total Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">₹2,35,350</p>
                <p className="text-xs text-foreground/70 mt-1">11 EMIs paid</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Loans */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Active Loans</h2>
              <Link href="/dashboard/apply-loan">
                <Button className="bg-primary hover:bg-primary/90">Apply New Loan</Button>
              </Link>
            </div>

            {mockLoans.map((loan) => (
              <Card key={loan.id} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{loan.productName}</h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {loan.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/70">ID: {loan.loanId}</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">₹{loan.amount.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-xs text-foreground/70">Monthly EMI</p>
                      <p className="font-semibold text-foreground">₹{loan.emi.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Interest Rate</p>
                      <p className="font-semibold text-foreground">{loan.ratePerAnnum}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">EMIs Paid</p>
                      <p className="font-semibold text-foreground">{loan.paidEmi} / 24</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Due Date</p>
                      <p className="font-semibold text-foreground">{loan.dueEmi}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-xs text-foreground/70">Repayment Progress</p>
                      <p className="text-xs font-semibold text-foreground">{Math.round((loan.paidEmi / 24) * 100)}%</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(loan.paidEmi / 24) * 100}%` }} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <TrendingUp size={16} className="mr-2" />
                      Pay EMI
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download size={16} className="mr-2" />
                      Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
