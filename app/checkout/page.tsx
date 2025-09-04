"use client";

import { useSafeCart, useSafeOrders } from "@/lib/safeStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cart = useSafeCart((state) => state.cart);
  const clearCart = useSafeCart((state) => state.clearCart);
  const addOrder = useSafeOrders((state) => state.addOrder);
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    addOrder({ id: Date.now().toString(), date: new Date().toISOString(), total });
    clearCart();
    router.push("/profile");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-bold mb-2">Checkout</h2>
      <p className="mb-4">Order Total: ₹{total.toLocaleString()}</p>
      <Button size="lg" onClick={handleCheckout} disabled={cart.length === 0}>
        Place Order
      </Button>
    </main>
  );
}
