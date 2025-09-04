// app/page.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts } from "@/lib/mockData"
import { ShoppingBag } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/80 to-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            Welcome to Agarwal Collection
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Discover the finest clothing and accessories at unbeatable prices.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Men", "Women", "Accessories"].map((category) => (
              <Card key={category} className="group cursor-pointer hover:shadow-lg transition">
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  <Link href={`/products?category=${category.toLowerCase()}`}>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-white">
                      Explore {category}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product) => (
              <Card key={product.id} className="hover:shadow-md transition">
                <CardContent className="p-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground mb-2">₹{product.price.toLocaleString()}</p>
                  <Link href={`/products/${product.id}`}>
                    <Button variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
