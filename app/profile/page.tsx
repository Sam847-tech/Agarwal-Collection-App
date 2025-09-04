"use client"

import { useSafeUser, useSafeOrders } from "@/lib/safeStore"

export default function ProfilePage() {
  const user = useSafeUser()
  const orders = useSafeOrders()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user ? (
        <p className="mb-4">Welcome, {user.name}</p>
      ) : (
        <p className="mb-4">You are not logged in.</p>
      )}
      <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {orders.map((o) => (
            <li key={o.id}>
              Order #{o.id} – Total ₹{o.total}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
