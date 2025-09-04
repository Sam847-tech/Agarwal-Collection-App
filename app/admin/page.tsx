"use client";

import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export default function AdminPage() {
  const orders = useAppStore((s) => s.orders);

  // Example: load data on mount if needed
  useEffect(() => {
    // You can fetch or sync orders here if required
  }, []);

  if (!orders || orders.length === 0) {
    return <div className="p-4">No orders found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        {orders.map((order, i) => (
          <li key={i} className="border rounded p-3 shadow-sm">
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Customer:</b> {order.customer}</p>
            <p><b>Status:</b> {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
