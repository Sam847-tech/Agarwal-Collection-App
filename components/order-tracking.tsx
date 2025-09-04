"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Package, Truck, MapPin, Phone, MessageCircle } from "lucide-react"
import type { Order } from "@/lib/types"

interface OrderTrackingProps {
  order: Order
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const trackingSteps = [
    {
      id: "pending",
      title: "Order Placed",
      description: "Your order has been received and is being processed",
      icon: Clock,
      completed: ["pending", "confirmed", "processing", "shipped", "delivered"].includes(order.status),
      active: order.status === "pending",
    },
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been confirmed and is being prepared",
      icon: CheckCircle,
      completed: ["confirmed", "processing", "shipped", "delivered"].includes(order.status),
      active: order.status === "confirmed",
    },
    {
      id: "processing",
      title: "Processing",
      description: "Your items are being prepared for shipment",
      icon: Package,
      completed: ["processing", "shipped", "delivered"].includes(order.status),
      active: order.status === "processing",
    },
    {
      id: "shipped",
      title: "Shipped",
      description: "Your order is on its way to you",
      icon: Truck,
      completed: ["shipped", "delivered"].includes(order.status),
      active: order.status === "shipped",
    },
    {
      id: "delivered",
      title: "Delivered",
      description: "Your order has been delivered successfully",
      icon: CheckCircle,
      completed: order.status === "delivered",
      active: order.status === "delivered",
    },
  ]

  const getStepColor = (step: (typeof trackingSteps)[0]) => {
    if (step.completed) return "text-green-600 bg-green-100 border-green-200"
    if (step.active) return "text-primary bg-primary/10 border-primary/20"
    return "text-muted-foreground bg-muted border-border"
  }

  const getLineColor = (index: number) => {
    const currentStep = trackingSteps.find((step) => step.active)
    const currentIndex = currentStep ? trackingSteps.indexOf(currentStep) : -1
    return index < currentIndex ? "bg-green-500" : "bg-border"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trackingSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting line */}
              {index < trackingSteps.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-6 ${getLineColor(index)}`} />
              )}

              <div className="flex gap-4">
                {/* Step icon */}
                <div
                  className={`
                  w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${getStepColor(step)}
                `}
                >
                  <step.icon className="h-5 w-5" />
                </div>

                {/* Step content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-medium ${step.completed || step.active ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </h3>
                    {step.active && (
                      <Badge variant="outline" className="text-xs">
                        Current
                      </Badge>
                    )}
                    {step.completed && !step.active && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                  <p
                    className={`text-sm ${step.completed || step.active ? "text-muted-foreground" : "text-muted-foreground/60"}`}
                  >
                    {step.description}
                  </p>

                  {/* Timestamp for completed steps */}
                  {step.completed && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.createdAt.toLocaleDateString()} • {order.createdAt.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Address */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium">Delivery Address</h4>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="font-medium text-sm">{order.customerInfo.name}</p>
            <p className="text-sm text-muted-foreground">{order.customerInfo.phone}</p>
            <p className="text-sm mt-1">{order.customerInfo.address}</p>
          </div>
        </div>

        {/* Support Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium mb-3">Need Help?</h4>
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 p-3 border border-green-500 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
              onClick={() => {
                const message = `Hi! I need help with my order ${order.id}. Please assist me.`
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">WhatsApp</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
              onClick={() => window.open("tel:+919876543210")}
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Call Us</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
