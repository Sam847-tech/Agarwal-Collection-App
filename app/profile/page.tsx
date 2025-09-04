"use client";

import { useSafeUser, useSafeOrders } from "@/lib/safeStore";

export default function ProfilePage() {
  const user = useSafeUser((state) => state.user);
  const orders = useSafeOrders((state) => state.orders);

  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {user ? (
        <div className="mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="text-muted-foreground mb-6">No user logged in.</p>
      )}

      <h3 className="text-xl font-semibold mb-2">Order History</h3>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="border rounded p-3 flex justify-between">
              <span>{new Date(o.date).toLocaleDateString()}</span>
              <span>₹{o.total.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
