"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background via-primary/5 to-secondary/5 pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div className="inline-block bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-full border border-primary/30">
              <p className="text-sm font-semibold text-primary">✨ Trusted Since Decades</p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent leading-tight text-balance">
              सावरा Just Help Nidhi Limited
            </h1>

            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed text-pretty">
              Trusted Nidhi Company providing instant gold loans, property loans, and flexible deposit schemes. 
              Quick approval, transparent rates, and doorstep service with complete insurance coverage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products/gold-loan">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
                >
                  Apply Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto bg-white/50 backdrop-blur-sm"
              >
                <Phone size={18} className="mr-2" />
                Request Callback
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">100%</p>
                  <p className="text-foreground/70">Trust</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">100%</p>
                  <p className="text-foreground/70">Secure</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">24/7</p>
                  <p className="text-foreground/70">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 h-96 flex items-center justify-center shadow-2xl border border-primary/20 backdrop-blur-sm overflow-hidden">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10"></div>
              <div className="relative text-center space-y-4 z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-5xl">💰</span>
                  </div>
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg">Quick & Secure Loans</p>
                  <p className="text-foreground/70 text-sm">Get instant approval</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
