"use client"

import { useAppStore } from "@/lib/store"
import { formatDate, formatTime } from "@/lib/utils"

export default function OrdersPage() {
  const orders = useAppStore((state) => state.orders)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
            </p>
            <p className="text-sm">Total: ₹{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
