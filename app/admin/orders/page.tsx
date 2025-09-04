"use client";

import { useAppStore } from "@/lib/store"
import { mockOrders } from "@/lib/mockData"

export default function OrdersPage() {
  const storeOrders = useAppStore((state) => state.orders || [])

  // fallback to mock data if no orders in store
  const orders = storeOrders.length > 0 ? storeOrders : mockOrders

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => {
          const date =
            order.createdAt && !isNaN(new Date(order.createdAt).getTime())
              ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—"

          const time =
            order.createdAt && !isNaN(new Date(order.createdAt).getTime())
              ? new Date(order.createdAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""

          return (
            <div
              key={order.id}
              className="p-4 rounded-xl shadow bg-white flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-lg">{order.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {date} {time && `• ${time}`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{order.total}</p>
                <p className="text-sm capitalize">{order.status}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
