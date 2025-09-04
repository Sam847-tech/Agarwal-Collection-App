"use client"

import { useAppStore } from "@/lib/store"
import { mockProducts } from "@/lib/mockData"
import { formatDate, formatTime } from "@/lib/utils"

export default function AdminPage() {
  const orders = useAppStore((state) => state.orders ?? [])
  const totalProducts = mockProducts.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* === Stats Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-xl border bg-card shadow">
          <h2 className="text-lg font-medium">Total Products</h2>
          <p className="text-2xl font-bold mt-2">{totalProducts}</p>
        </div>
        <div className="p-6 rounded-xl border bg-card shadow">
          <h2 className="text-lg font-medium">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">{totalOrders}</p>
        </div>
        <div className="p-6 rounded-xl border bg-card shadow">
          <h2 className="text-lg font-medium">Total Revenue</h2>
          <p className="text-2xl font-bold mt-2">₹{totalRevenue}</p>
        </div>
      </div>

      {/* === Recent Orders === */}
      <div className="rounded-xl border bg-card shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {orders.length === 0 ? (
          <p className="text-muted-foreground">No recent orders</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
