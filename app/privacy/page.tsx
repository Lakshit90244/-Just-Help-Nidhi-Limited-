"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-foreground/70">Last updated: November 2024</p>
          </div>

          <Card className="border-border/50 mb-8">
            <CardContent className="pt-6 prose prose-sm max-w-none text-foreground/70 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, apply for a
                  loan, or contact our support team. This includes name, email, phone number, address, and financial
                  information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
                <p>
                  We use your information to provide, maintain, and improve our services, process applications, send
                  communications, and comply with legal obligations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">3. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">4. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal information. Contact our privacy team
                  at privacy@maben.in for any requests.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">5. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy, please contact us at privacy@maben.in or call
                  9785873004,     8529574003.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
