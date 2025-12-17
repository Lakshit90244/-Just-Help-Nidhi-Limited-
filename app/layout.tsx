import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// 👇 Import WhatsApp Button Component
import WhatsAppButton from "@/components/WhatsAppButton"
// 👇 Import Auth Provider
import { AuthProvider } from "@/contexts/AuthContext"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "सावरा Just Help Nidhi Limited - Gold Loans, Deposits & More",
  description:
    "Trusted Nidhi Company providing secure financial services. Easy online gold loans, doorstep service, property loans and flexible deposit schemes. Contact: 9785873004, 8529574003",
  generator: "v0.app",
  keywords: ["gold loan", "property loan", "deposits", "nidhi company", "financial services", "सावरा", "just help nidhi"],
  authors: [{ name: "सावरा Just Help Nidhi Limited" }],
  openGraph: {
    title: "सावरा Just Help Nidhi Limited",
    description: "Trusted Nidhi Company providing reliable financial services across India",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <AuthProvider>
          {children}

          {/* 👇 WhatsApp Button Fixed on Screen */}
          <WhatsAppButton />
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  )
}
