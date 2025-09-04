"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSafeCart } from "@/lib/safeStore"

export default function HomePage() {
  const cart = useSafeCart()
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Agarwal Collection</h1>
      <p className="mb-6">You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart.</p>
      <Link href="/products">
        <Button>Shop Now</Button>
      </Link>
    </main>
  )
}
