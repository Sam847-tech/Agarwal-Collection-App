"use client";

import { useSafeCart } from "@/lib/safeStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const cart = useSafeCart((state) => state.cart);
  const clearCart = useSafeCart((state) => state.clearCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Start adding items to your cart.</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="space-y-2 mb-4">
        {cart.map((item) => (
          <li key={item.id} className="border rounded p-3 flex justify-between">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{(item.price * item.qty).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="font-bold text-lg mb-4">Total: ₹{total.toLocaleString()}</div>

      <div className="flex gap-3">
        <Button variant="destructive" onClick={clearCart}>
          Clear Cart
        </Button>
        <Link href="/checkout">
          <Button>Checkout</Button>
        </Link>
      </div>
    </main>
  );
}
