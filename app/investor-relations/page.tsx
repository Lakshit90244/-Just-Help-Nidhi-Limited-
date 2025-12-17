"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Users, BarChart3 } from "lucide-react"

const irData = [
  {
    period: "Q3 2024",
    totalAssets: "₹450 Crore",
    memberGrowth: "15%",
    npl: "0.5%",
  },
  {
    period: "Q2 2024",
    totalAssets: "₹420 Crore",
    memberGrowth: "12%",
    npl: "0.6%",
  },
  {
    period: "Q1 2024",
    totalAssets: "₹395 Crore",
    memberGrowth: "10%",
    npl: "0.7%",
  },
]

const documents = [
  { title: "Annual Report 2023-24", type: "PDF", size: "2.3 MB" },
  { title: "Board Composition & Governance", type: "PDF", size: "1.1 MB" },
  { title: "Financial Statements Q3 2024", type: "PDF", size: "1.8 MB" },
  { title: "AGM Minutes 2024", type: "PDF", size: "950 KB" },
]

export default function InvestorRelationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Investor Relations</h1>
              <p className="text-xl text-foreground/70 text-balance">
                Financial performance, governance, and corporate information
              </p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Key Financial Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                    <BarChart3 size={16} />
                    Total Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">₹450 Cr</p>
                  <p className="text-xs text-green-600 mt-1">↑ 7.6% YoY</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                    <Users size={16} />
                    Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">25,000+</p>
                  <p className="text-xs text-green-600 mt-1">↑ 15% YoY</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                    <TrendingUp size={16} />
                    ROE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">18.5%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 2.1% YoY</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                    <BarChart3 size={16} />
                    NPL Ratio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">0.5%</p>
                  <p className="text-xs text-green-600 mt-1">↓ 0.2% YoY</p>
                </CardContent>
              </Card>
            </div>

            {/* Quarterly Performance */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6">Quarterly Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quarter</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Assets</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Member Growth</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">NPL Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {irData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{row.period}</td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{row.totalAssets}</td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{row.memberGrowth}</td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{row.npl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Documents & Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, idx) => (
                  <Card key={idx} className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.title}</p>
                          <p className="text-sm text-foreground/70">{doc.size}</p>
                        </div>
                      </div>
                      <p className="text-sm text-primary font-medium">Download</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
