"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PiggyBank, Download, Eye } from "lucide-react"
import Link from "next/link"

const mockDeposits = [
  {
    id: 1,
    depositId: "DEP-2024-001",
    productName: "Term Deposit",
    amount: 500000,
    tenure: "24 months",
    ratePerAnnum: 8.0,
    startDate: "2024-08-15",
    maturityDate: "2026-08-15",
    status: "Active",
    accruedInterest: 80000,
    maturityAmount: 580000,
  },
  {
    id: 2,
    depositId: "DEP-2024-002",
    productName: "Recurring Deposit",
    amount: 50000,
    monthlyAmount: 5000,
    tenure: "12 months",
    ratePerAnnum: 7.5,
    startDate: "2024-09-01",
    maturityDate: "2025-09-01",
    status: "Active",
    accruedInterest: 3500,
    maturityAmount: 63500,
  },
]

export default function DepositsPage() {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">My Deposits</h1>
            <p className="text-foreground/70">Manage your savings and deposit accounts</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">Total Deposited</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">₹5,50,000</p>
                <p className="text-xs text-foreground/70 mt-1">2 active deposits</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">Total Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">₹83,500</p>
                <p className="text-xs text-foreground/70 mt-1">Accrued till date</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">Maturity Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">₹6,33,500</p>
                <p className="text-xs text-foreground/70 mt-1">Total expected returns</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Deposits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Active Deposits</h2>
              <Link href="/dashboard/open-deposit">
                <Button className="bg-primary hover:bg-primary/90">Open New Deposit</Button>
              </Link>
            </div>

            {mockDeposits.map((deposit) => (
              <Card key={deposit.id} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{deposit.productName}</h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {deposit.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/70">ID: {deposit.depositId}</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">₹{deposit.amount.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-xs text-foreground/70">Interest Rate</p>
                      <p className="font-semibold text-foreground">{deposit.ratePerAnnum}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Accrued Interest</p>
                      <p className="font-semibold text-foreground">₹{deposit.accruedInterest.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Maturity Date</p>
                      <p className="font-semibold text-foreground">{deposit.maturityDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Maturity Value</p>
                      <p className="font-semibold text-foreground">₹{deposit.maturityAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Tenure progress */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-xs text-foreground/70">Time Remaining</p>
                      <p className="text-xs font-semibold text-foreground">20 months</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "33%" }} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <PiggyBank size={16} className="mr-2" />
                      Renew
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
