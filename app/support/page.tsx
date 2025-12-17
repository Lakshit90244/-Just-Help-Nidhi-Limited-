"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MessageCircle, FileText, HelpCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "How quickly can I get a gold loan?",
    answer: "Gold loans are approved within 30 minutes to 2 hours, depending on the completeness of documentation.",
  },
  {
    question: "What is the maximum loan amount I can avail?",
    answer:
      "The maximum loan amount depends on the market value of your gold. We offer up to 80% LTV on gold ornaments.",
  },
  {
    question: "Is my gold insured?",
    answer: "Yes, all gold ornaments are insured against loss, theft, and damage during the loan period.",
  },
  {
    question: "What documents are required?",
    answer: "You need ID proof, address proof, and in some cases, PAN card. Gold ornaments need to be hallmarked.",
  },
  {
    question: "Can I prepay my loan?",
    answer: "Yes, you can prepay your loan anytime without any penalty charges.",
  },
  {
    question: "How do I apply for a deposit?",
    answer: "You can apply online through our website or visit your nearest branch with minimum deposit amount.",
  },
]

export default function SupportPage() {
  const [callbackForm, setCallbackForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "morning",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setCallbackForm({ name: "", phone: "", email: "", preferredTime: "morning" })
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">सावरा Care & Support</h1>
              <p className="text-xl text-foreground/70 text-balance">
                We're here to help you with any questions or concerns
              </p>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Call Us</CardTitle>
                  <Phone className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">9785873004,     8529574003</p>
                  <p className="text-sm text-foreground/70">Toll-free, Mon-Sat 9AM-6PM</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Email Us</CardTitle>
                  <Mail className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">bhanumenaria1@gmail.com</p>
                  <p className="text-sm text-foreground/70">Response within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Chat</CardTitle>
                  <MessageCircle className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">Live Chat</p>
                  <p className="text-sm text-foreground/70">Available 24/7</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Visit Us</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">66 Branches</p>
                  <p className="text-sm text-foreground/70">Find nearest branch</p>
                </CardContent>
              </Card>
            </div>

            {/* Request Callback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Request a Callback</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    {submitted && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2 text-sm text-green-700">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        Thank you! We'll call you soon.
                      </div>
                    )}

                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-foreground">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={callbackForm.name}
                        onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-foreground">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={callbackForm.phone}
                        onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={callbackForm.email}
                        onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="time" className="text-foreground">
                        Preferred Time
                      </Label>
                      <select
                        id="time"
                        value={callbackForm.preferredTime}
                        onChange={(e) => setCallbackForm({ ...callbackForm, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      >
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                        <option value="evening">Evening (3 PM - 6 PM)</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Request Callback
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Complaint Form */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">File a Complaint</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="complaint-type" className="text-foreground">
                        Complaint Type
                      </Label>
                      <select
                        id="complaint-type"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      >
                        <option>Select type</option>
                        <option>Service Quality</option>
                        <option>Staff Behavior</option>
                        <option>Product Issue</option>
                        <option>Others</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="complaint-details" className="text-foreground">
                        Details
                      </Label>
                      <textarea
                        id="complaint-details"
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        placeholder="Please describe your complaint..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90">
                      Submit Complaint
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <Card key={idx} className="border-border/50">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <HelpCircle className="text-primary mt-1" size={20} />
                        <CardTitle className="text-lg text-foreground">{faq.question}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70">{faq.answer}</p>
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
