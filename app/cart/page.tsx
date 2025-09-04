"use client"

import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { CartItemComponent } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useSafeCart } from "@/lib/safeStore"
import Link from "next/link"

export default function CartPage() {
  const cart = useSafeCart()
  const clearCart = useAppStore((state) => state.clearCart)

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 99
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <main className="pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
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
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItemComponent key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
            ))}
            <Link href="/products">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
          {/* Summary */}
          <Card className="lg:col-span-1 sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-sm"><span>Tax</span><span>₹{tax}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">₹{total}</span></div>
              <Link href="/checkout"><Button className="w-full">Proceed to Checkout</Button></Link>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pt-4 border-t">
                <div className="text-center"><Truck className="mx-auto h-5 w-5" />Free Shipping</div>
                <div className="text-center"><Shield className="mx-auto h-5 w-5" />Secure</div>
                <div className="text-center"><RotateCcw className="mx-auto h-5 w-5" />Returns</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <MobileNavigation />
    </div>
  )
}
