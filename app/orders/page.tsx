"use client"

import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Package, Search, MessageCircle, ArrowLeft, Clock, CheckCircle, Truck, MapPin } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { useState } from "react"

export default function OrdersPage() {
  const orders = useAppStore((state) => state.orders)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.product.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const handleContactSupport = (orderId: string) => {
    const message = `Hi! I need help with my order ${orderId}. Please assist me.`
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />

        <main className="pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders. Start shopping to see your orders here.
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold">My Orders</h1>
              <p className="text-sm text-muted-foreground">Track and manage your orders</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">Placed on {order.createdAt.toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Summary */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-bold text-lg text-primary">₹{order.total.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Payment</p>
                      <p className="text-sm font-medium capitalize">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  {order.estimatedDelivery && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Delivery Information</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expected delivery: {order.estimatedDelivery.toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/orders/${order.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Track Order
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                      onClick={() => handleContactSupport(order.id)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground">Try searching with a different term.</p>
            </div>
          )}
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
