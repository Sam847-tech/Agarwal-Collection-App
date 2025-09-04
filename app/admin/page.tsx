"use client";

import { useAppStore } from "@/lib/store"
import { mockProducts, mockOrders } from "@/lib/mockData"

export default function AdminPage() {
  // === Dashboard Data (safe hydration) ===
  const storeOrders = useAppStore((state) => state.orders || [])
  const storeProducts = useAppStore((state) => state.products || [])

  // fallback to mock data if store is empty or undefined
  const orders = storeOrders.length > 0 ? storeOrders : mockOrders
  const products = storeProducts.length > 0 ? storeProducts : mockProducts

  const totalProducts = products?.length ?? 0
  const totalOrders = orders?.length ?? 0
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) ?? 0

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold mt-2">{totalProducts}</p>
        </div>
        <div className="p-6 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">{totalOrders}</p>
        </div>
        <div className="p-6 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold mt-2">₹{totalRevenue}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">₹{order.total}</td>
                  <td className="px-4 py-2 capitalize">{order.status}</td>
                  <td className="px-4 py-2">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
