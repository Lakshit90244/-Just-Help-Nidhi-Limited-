"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const reasons = [
  {
    icon: "⏰",
    title: "Years of Service",
    description: "Decades of trust and reliability in financial services",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: "🛡️",
    title: "Trust & Security",
    description: "Your money is safe with us, fully insured",
    gradient: "from-green-400 to-green-600",
  },
  {
    icon: "📱",
    title: "24/7 Online Loans",
    description: "Apply anytime, anywhere through our platform",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    icon: "💎",
    title: "Insurance Coverage",
    description: "All gold ornaments insured against loss",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    icon: "✨",
    title: "Hassle-Free Processing",
    description: "Minimal documentation, quick verification",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    icon: "📈",
    title: "Maximum LTV",
    description: "Get the best value for your collateral",
    gradient: "from-cyan-400 to-cyan-600",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-foreground/70 text-balance">
            We're committed to making your financial journey seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <Card
              key={idx}
              className="border-border/30 hover:shadow-xl transition-all duration-300 group hover:border-primary/50 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${reason.gradient}`}></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
              ></div>

              <CardHeader className="relative">
                <div className="text-5xl mb-3 transform group-hover:scale-125 transition-transform origin-left">
                  {reason.icon}
                </div>
                <CardTitle className="text-lg text-foreground">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-foreground/70">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
