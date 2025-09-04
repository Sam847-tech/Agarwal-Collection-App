"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, Share2, ArrowLeft, MessageCircle, Phone, Minus, Plus } from "lucide-react"
import { mockProducts } from "@/lib/data"
import { useAppStore } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const product = mockProducts.find((p) => p.id === productId)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const addToCart = useAppStore((state) => state.addToCart)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const wishlist = useAppStore((state) => state.wishlist)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Set default selections
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0])
  }
  if (!selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0])
  }

  const handleAddToCart = () => {
    console.log("[v0] Adding to cart from product detail:", product.name, selectedSize, selectedColor, quantity)

    if (selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor, quantity)
      console.log("[v0] Successfully added to cart from product detail")
    } else {
      console.log("[v0] Error: Missing size or color selection")
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering:\n\n${product.name}\nPrice: ₹${product.price.toLocaleString()}\nSize: ${selectedSize}\nColor: ${selectedColor}\nQuantity: ${quantity}\n\nPlease let me know the availability and next steps.`
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleCallUs = () => {
    window.open("tel:+919876543210", "_self")
  }

  const handleSizeGuide = () => {
    alert("Size Guide:\nS: 32-34 inches\nM: 36-38 inches\nL: 40-42 inches\nXL: 44-46 inches\nXXL: 48-50 inches")
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-4">
          {/* Back Button */}
          <div className="mb-4">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={product.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Sale badge */}
                {product.originalPrice && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 hover:bg-background"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlist.includes(product.id) ? "fill-accent text-accent" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 hover:bg-background"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground capitalize">
                  {product.fabric} • {product.category}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-2xl text-primary">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              {/* Occasions */}
              <div>
                <h3 className="font-medium mb-2">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.occasion.map((occasion) => (
                    <Badge key={occasion} variant="outline">
                      {occasion}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 1 && (
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              <div>
                <h3 className="font-medium mb-2">Color: {selectedColor}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? "border-primary" : "border-border"
                      }`}
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
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || !selectedSize || !selectedColor}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={handleBuyNow}
                    disabled={product.stock === 0 || !selectedSize || !selectedColor}
                  >
                    Buy Now
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Order on WhatsApp
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCallUs}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleSizeGuide}>
                    Size Guide
                  </Button>
                </div>
              </div>

              {/* Product Description */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
