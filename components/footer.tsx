"use client"

import Link from "next/link"
import { Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-blue-900 font-bold text-xs leading-none mb-1">सावरा</div>
                  <div className="w-4 h-0.5 bg-blue-900 mb-1"></div>
                  <div className="text-blue-900 font-bold text-[8px] leading-none">HELP</div>
                </div>
                <div className="absolute bottom-1 right-1 text-green-700 text-xs">🌱</div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-yellow-400 leading-tight">सावरा</span>
                <span className="font-semibold text-sm text-background/90 leading-tight">JUST HELP NIDHI LIMITED</span>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Trusted Nidhi Company providing gold loans, property loans, and flexible deposit schemes with transparent rates and reliable service.
            </p>
          </div>

          {/* Quick Links */}
         <div className="space-y-3 flex flex-col items-start">
  <h3 className="font-semibold text-lg">Quick Links</h3>
  <nav className="space-y-2 flex flex-col">
    <Link href="/" className="text-background/80 hover:text-background text-sm transition-colors">
      Home
    </Link>
    <Link href="/products" className="text-background/80 hover:text-background text-sm transition-colors">
      Products
    </Link>
    <Link href="/branches" className="text-background/80 hover:text-background text-sm transition-colors">
      Branch Locator
    </Link>
    <Link href="/support" className="text-background/80 hover:text-background text-sm transition-colors">
      Support
    </Link>
  </nav>
</div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80">Mobile No.:</p>
                  <p className="font-semibold">9785873004, 8529574003</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80">Email</p>
                  <p className="font-semibold">bhanumenaria1@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80">Monday - Friday</p>
                  <p className="font-semibold">9:00 AM - 6:00 PM</p>
                  <p className="text-background/80 mt-1">Saturday</p>
                  <p className="font-semibold">10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 text-sm text-background/80">
           <p>
  © 2025 सावरा Just Help Nidhi Limited. All rights reserved.
  <Link href="https://www.alphaloopit.com" className="ml-1">
    Developed by Alphaloop IT Pvt. Ltd.
  </Link>
</p>

            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/auction-policy" className="hover:text-background transition-colors">
                Auction Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 md:justify-end">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center transition-colors"
              title="Facebook"
            >
              <span>f</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center transition-colors"
              title="Twitter"
            >
              <span>𝕏</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center transition-colors"
              title="LinkedIn"
            >
              <span>in</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
