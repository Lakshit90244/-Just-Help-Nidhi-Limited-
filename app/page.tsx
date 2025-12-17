'use client';

import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import WhyChooseUs from "@/components/why-choose-us"
import NewsCSR from "@/components/news-csr"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <Header />
        <Hero />
        <Products />
        <WhyChooseUs />
        <NewsCSR />
        <Footer />
      </main>
    </ProtectedRoute>
  )
}
