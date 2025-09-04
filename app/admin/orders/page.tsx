"use client"

import { useAppStore } from "@/lib/store"
import { formatDate, formatTime } from "@/lib/utils"

export default function AdminOrdersPage() {
  const orders = useAppStore((state) => state.orders)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders available</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-lg shadow-sm bg-card"
            >
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
              </p>
              <p className="text-sm">Total: ₹{order.total}</p>
              <p className="text-sm">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
