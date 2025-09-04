"use client"

import { useAppStore } from "@/lib/store"
import { formatDateTime } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const orders = useAppStore((state) => state.orders)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No orders found
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>Order #{order.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {formatDateTime(order.createdAt)}
                </p>
                <p className="font-medium">
                  Customer: {order.customerInfo?.name ?? "Unknown"}
                </p>
                <p>Total: ₹{order.total.toLocaleString()}</p>
                <Badge>{order.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
