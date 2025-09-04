"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import type { Product } from "@/lib/types"
import { useAppStore } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const addToCart = useAppStore((state) => state.addToCart)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const wishlist = useAppStore((state) => state.wishlist)

  const handleAddToCart = (product: Product) => {
    console.log("[v0] Adding to cart:", product.name, product.sizes[0], product.colors[0])

    if (!product.sizes || product.sizes.length === 0) {
      console.log("[v0] Error: Product has no sizes")
      return
    }

    if (!product.colors || product.colors.length === 0) {
      console.log("[v0] Error: Product has no colors")
      return
    }

    addToCart(product, product.sizes[0], product.colors[0])
    console.log("[v0] Successfully added to cart")
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {products.map((product) => (
          <Card
            key={product.id}
            className={`group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}
          >
            <CardContent className="p-0">
              <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 aspect-[3/4]" : "aspect-[3/4]"}`}>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </Link>

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

                {/* Stock badge */}
                {product.stock <= 5 && product.stock > 0 && (
                  <Badge variant="secondary" className="absolute bottom-3 left-3">
                    Only {product.stock} left
                  </Badge>
                )}

                {product.stock === 0 && (
                  <Badge variant="destructive" className="absolute bottom-3 left-3">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-2 hover:text-primary cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

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

                {/* Occasions */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.occasion.slice(0, 2).map((occasion) => (
                    <Badge key={occasion} variant="outline" className="text-xs">
                      {occasion}
                    </Badge>
                  ))}
                  {product.occasion.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.occasion.length - 2}
                    </Badge>
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
                                    : color.toLowerCase() === "cream"
                                      ? "#F5F5DC"
                                      : color.toLowerCase() === "silver"
                                        ? "#C0C0C0"
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
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="mr-1 h-3 w-3" />
                    Add to Cart
                  </Button>
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
