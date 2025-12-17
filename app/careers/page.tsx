"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Senior Loan Officer",
    department: "Lending",
    location: "Bangalore",
    salary: "₹6 - 8 Lakh",
    experience: "3-5 years",
    description: "Manage loan applications, customer verification, and disbursement.",
  },
  {
    id: 2,
    title: "Customer Service Executive",
    department: "Operations",
    location: "Multiple",
    salary: "₹3 - 4 Lakh",
    experience: "1-2 years",
    description: "Handle customer inquiries, complaints, and support requests.",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Strategy",
    location: "Bangalore",
    salary: "₹8 - 12 Lakh",
    experience: "4-6 years",
    description: "Develop and manage new financial products and features.",
  },
  {
    id: 4,
    title: "Branch Manager",
    department: "Management",
    location: "Multiple",
    salary: "₹5 - 7 Lakh",
    experience: "5+ years",
    description: "Oversee branch operations and achieve sales targets.",
  },
]

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Join Our Team</h1>
              <p className="text-xl text-foreground/70 text-balance">
                Build a rewarding career with Maben Financial Services
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">🌱 Growth Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Career advancement in a growing fintech company with mentorship and training programs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">💰 Competitive Compensation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Attractive salary packages, performance bonuses, and comprehensive benefits.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">🤝 Work Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Collaborative environment with flexibility and support for work-life balance.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Open Positions */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Open Positions</h2>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-foreground/70 mt-1">{job.department}</p>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">Apply</Button>
                      </div>

                      <p className="text-foreground/70 mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-foreground/70">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                          <DollarSign size={16} />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                          <Briefcase size={16} />
                          {job.experience}
                        </div>
                      </div>
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
