"use client"

import { formatDate, formatTime } from "@/lib/utils"

interface OrderTrackingProps {
  order: {
    id: string
    createdAt: string | Date
    status: string
  }
}

export function OrderTracking({ order }: OrderTrackingProps) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="font-semibold text-lg">Tracking Order #{order.id}</h2>
      <p className="text-sm text-muted-foreground">
        Placed on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
      </p>
      <p className="mt-2">Status: {order.status}</p>
    </div>
  )
}
