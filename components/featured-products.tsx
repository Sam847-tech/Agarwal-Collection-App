"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag } from "lucide-react"
import { mockProducts } from "@/lib/data"
import { useAppStore } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"

export function FeaturedProducts() {
  const addToCart = useAppStore((state) => state.addToCart)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const wishlist = useAppStore((state) => state.wishlist)

  const featuredProducts = mockProducts.filter((product) => product.featured)

  const handleAddToCart = (product: any) => {
    console.log("[v0] Adding to cart:", product.name, product.sizes[0], product.colors[0])

    if (!product.sizes || product.sizes.length === 0) {
      console.log("[v0] Error: Product has no sizes")
      return
    }

    if (!product.colors || product.colors.length === 0) {
      console.log("[v0] Error: Product has no colors")
      return
    }

    // Add with default selections
    addToCart(product, product.sizes[0], product.colors[0])
    console.log("[v0] Successfully added to cart")
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Featured Collection</h2>
          <p className="text-muted-foreground">Handpicked pieces from our premium collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlist.includes(product.id) ? "fill-accent text-accent" : "text-muted-foreground"
                      }`}
                    />
                  </Button>

                  {/* Sale badge */}
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}

                  {/* Quick actions overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button onClick={() => handleAddToCart(product)} className="bg-primary hover:bg-primary/90">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 capitalize">
                    {product.fabric} • {product.category}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Color options */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted-foreground">Colors:</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{
                            backgroundColor:
                              color.toLowerCase() === "maroon"
                                ? "#800000"
                                : color.toLowerCase() === "gold"
                                  ? "#FFD700"
                                  : color.toLowerCase() === "red"
                                    ? "#DC2626"
                                    : color.toLowerCase() === "pink"
                                      ? "#EC4899"
                                      : "#6B7280",
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
