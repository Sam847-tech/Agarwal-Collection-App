"use client"

import { useAppStore } from "@/lib/store"
import { mockOrders } from "@/lib/mockData"

export default function OrdersPage() {
  // Load orders from store, fallback to mockOrders if store is empty
  const orders = useAppStore((state) =>
    state.orders.length > 0 ? state.orders : mockOrders
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">₹{order.total}</td>
                <td className="px-4 py-2 capitalize">{order.status}</td>
                <td className="px-4 py-2">
                  {/* ✅ Safely handle string or Date */}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
