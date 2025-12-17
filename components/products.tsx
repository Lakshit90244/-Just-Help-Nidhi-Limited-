"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Fallback static products (shown if no database products)
const fallbackProducts = [
  {
    id: "gold-loan",
    icon: "🏅",
    name: "Gold Loan",
    description: "Instant cash against your gold ornaments",
    type: "Gold Loan",
    features: ["Quick approval", "Transparent rates", "Insurance included"],
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "online-gold-loan",
    icon: "💻",
    name: "Online Gold Loan", 
    description: "Complete process online from home",
    type: "Gold Loan",
    features: ["Home delivery", "Video KYC", "Fast processing"],
    gradient: "from-blue-400 to-cyan-500",
  },
]

// Product type to icon and gradient mapping
const getProductStyle = (type: string, index: number) => {
  const styles = [
    { icon: "🏅", gradient: "from-orange-400 to-red-500" },
    { icon: "💻", gradient: "from-blue-400 to-cyan-500" },
    { icon: "🚗", gradient: "from-green-400 to-emerald-500" },
    { icon: "🏠", gradient: "from-purple-400 to-pink-500" },
    { icon: "⚡", gradient: "from-yellow-400 to-orange-500" },
    { icon: "📊", gradient: "from-indigo-400 to-purple-500" },
  ];
  
  if (type.toLowerCase().includes('gold')) return styles[0];
  if (type.toLowerCase().includes('property')) return styles[3];
  if (type.toLowerCase().includes('deposit')) return styles[5];
  
  return styles[index % styles.length];
};

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        setProducts(result.data);
      } else {
        // Use fallback products if no database products
        setProducts(fallbackProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use fallback products on error
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Our Products
          </h2>
          <p className="text-lg text-foreground/70 text-balance">
            Choose from our comprehensive range of loans and deposit products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const style = getProductStyle(product.type || '', index);
            const features = product.features || [`${product.type} benefits`, 'Competitive rates', 'Quick processing'];
            
            return (
              <Card
                key={product._id || product.id}
                className="hover:shadow-2xl transition-all duration-300 border-border/30 overflow-hidden group hover:border-primary/50 hover:-translate-y-2"
              >
                <div
                  className={`h-24 bg-gradient-to-br ${style.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                ></div>

                <CardHeader className="-mt-12 relative z-10">
                  <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">{style.icon}</div>
                  <CardTitle className="text-xl text-foreground">{product.name}</CardTitle>
                  <CardDescription className="text-foreground/70">{product.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Product Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">Type:</span>
                      <span className="font-medium text-foreground">{product.type}</span>
                    </div>
                    {product.interestRate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Rate:</span>
                        <span className="font-medium text-primary">{product.interestRate}%</span>
                      </div>
                    )}
                    {product.maxAmount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Max Amount:</span>
                        <span className="font-medium text-foreground">₹{product.maxAmount?.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {features.slice(0, 3).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${style.gradient}`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2 pt-4">
                    {/* APPLY BUTTON */}
                    <Link href={`/signup`} className="flex-1">
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 group/btn">
                        <FileText size={16} className="mr-1" />
                        Apply
                      </Button>
                    </Link>

                    {/* CALCULATE BUTTON */}
                    <Link href={`/calculator`} className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent border-primary/30 hover:border-primary/60 hover:bg-primary/10"
                      >
                        <Calculator size={16} className="mr-1" />
                        Calculate
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}
