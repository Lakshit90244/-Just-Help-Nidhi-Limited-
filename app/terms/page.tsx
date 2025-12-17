"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-foreground/70">Last updated: November 2024</p>
          </div>

          <Card className="border-border/50">
            <CardContent className="pt-6 space-y-6 text-foreground/70">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
                <p>By using Maben Financial Services, you accept and agree to be bound by these Terms of Service.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">2. Eligibility</h2>
                <p>You must be at least 18 years old and a resident of India to use our services.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">3. User Responsibilities</h2>
                <p>
                  You agree to use our services only for lawful purposes and not to engage in any conduct that restricts
                  others' use or enjoyment of the services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">4. Loan Terms</h2>
                <p>
                  All loans are subject to approval and are governed by separate loan agreements. Interest rates may
                  vary based on creditworthiness.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">5. Limitation of Liability</h2>
                <p>
                  In no event shall Maben be liable for any indirect, incidental, special, or consequential damages
                  arising from your use of our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">6. Governing Law</h2>
                <p>These terms are governed by and construed in accordance with Indian law.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
