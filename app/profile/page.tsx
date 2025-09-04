"use client"

export const dynamic = "force-dynamic"

import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import Link from "next/link"

export default function ProfilePage() {
  const user = useAppStore((state) => state.user) ?? null
  const orders = useAppStore((state) => state.orders) ?? []

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <main className="pb-20 md:pb-8 container mx-auto px-4 py-6">
        <h1 className="font-serif text-2xl font-bold mb-6">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <div className="space-y-2">
                    <p><span className="font-semibold">Name:</span> {user.name}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">You are not logged in.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <ul className="space-y-3">
                    {orders.map((order) => (
                      <li
                        key={order.id}
                        className="flex justify-between border rounded-lg p-3"
                      >
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items
                          </p>
                        </div>
                        <span className="font-semibold">₹{order.total.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No orders found.{" "}
                    <Link href="/products" className="underline">
                      Start shopping
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <MobileNavigation />
    </div>
  )
}
