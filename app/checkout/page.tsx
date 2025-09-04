"use client"

import { Button } from "@/components/ui/button"
import { useSafeCart } from "@/lib/safeStore"

export default function CheckoutPage() {
  const cart = useSafeCart()
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <p>Total: ₹{total}</p>
          <Button className="mt-4">Place Order</Button>
        </div>
      )}
    </main>
  )
}
