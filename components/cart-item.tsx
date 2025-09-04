"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import type { CartItem } from "@/lib/types"
import { useAppStore } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity)
  const removeFromCart = useAppStore((state) => state.removeFromCart)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const wishlist = useAppStore((state) => state.wishlist)

  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true)
    updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, newQuantity)
    setTimeout(() => setIsUpdating(false), 300)
  }

  const handleRemove = () => {
    removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
  }

  const handleMoveToWishlist = () => {
    toggleWishlist(item.product.id)
    handleRemove()
  }

  const itemTotal = item.product.price * item.quantity

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Link href={`/products/${item.product.id}`}>
              <Image
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="font-medium text-sm line-clamp-2 hover:text-primary cursor-pointer">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.product.fabric} • {item.product.category}
                </p>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleRemove}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            {/* Size and Color */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Size:</span>
                <Badge variant="outline" className="text-xs">
                  {item.selectedSize}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Color:</span>
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full border border-border"
                    style={{
                      backgroundColor:
                        item.selectedColor.toLowerCase() === "maroon"
                          ? "#800000"
                          : item.selectedColor.toLowerCase() === "gold"
                            ? "#FFD700"
                            : item.selectedColor.toLowerCase() === "red"
                              ? "#DC2626"
                              : item.selectedColor.toLowerCase() === "pink"
                                ? "#EC4899"
                                : item.selectedColor.toLowerCase() === "cream"
                                  ? "#F5F5DC"
                                  : item.selectedColor.toLowerCase() === "silver"
                                    ? "#C0C0C0"
                                    : "#6B7280",
                    }}
                  />
                  <span className="text-xs">{item.selectedColor}</span>
                </div>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">₹{item.product.price.toLocaleString()}</span>
                {item.product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{item.product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-medium text-sm w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock || isUpdating}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Item Total and Actions */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="font-bold text-primary">₹{itemTotal.toLocaleString()}</span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleMoveToWishlist} className="text-xs">
                <Heart className="mr-1 h-3 w-3" />
                Move to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
