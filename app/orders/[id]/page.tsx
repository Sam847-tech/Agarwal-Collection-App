"use client"

import { useParams } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { formatDate, formatTime } from "@/lib/utils"

export default function OrderDetailPage() {
  const { id } = useParams()
  const order = useAppStore((state) =>
    state.orders.find((o) => o.id.toString() === id)
  )

  if (!order) {
    return <p className="p-6">Order not found</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <p className="text-sm text-muted-foreground">
        {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
      </p>
      <p className="mt-4">Total: ₹{order.total}</p>
    </div>
  )
}
