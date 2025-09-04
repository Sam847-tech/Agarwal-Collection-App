"use client"

import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { CartItemComponent } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"

export default function CartPage() {
  const cart = useAppStore((state) => state.cart)
  const clearCart = useAppStore((state) => state.clearCart)

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 99
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shipping + tax

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />

        <main className="pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/products">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="font-serif text-2xl font-bold">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">
                  {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
                </p>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <CartItemComponent key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Free Shipping Banner */}
                  {subtotal < 2000 && (
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                      <p className="text-sm text-secondary font-medium">
                        Add ₹{(2000 - subtotal).toLocaleString()} more for FREE shipping!
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                    <div className="text-center">
                      <Truck className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Free Shipping</p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Secure Payment</p>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Easy Returns</p>
                    </div>
                  </div>
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
