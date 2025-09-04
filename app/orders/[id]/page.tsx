"use client"

import { useParams } from "next/navigation"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { OrderTracking } from "@/components/order-tracking"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Share2, RotateCcw, MessageCircle } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id as string

  const orders = useAppStore((state) => state.orders)
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <main className="pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <Link href="/orders">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </main>
        <MobileNavigation />
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order ${order.id}`,
        text: `Track my order from Agarwal Collection`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleReorder = () => {
    // Add all items from this order back to cart
    const addToCart = useAppStore.getState().addToCart
    order.items.forEach((item) => {
      addToCart(item.product, item.selectedSize, item.selectedColor, item.quantity)
    })
  }

  const handleContactSupport = () => {
    const message = `Hi! I need help with my order ${order.id}. Please assist me.`
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/orders">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="font-serif text-2xl font-bold">Order Details</h1>
                <p className="text-sm text-muted-foreground">{order.id}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Tracking */}
            <div className="lg:col-span-2">
              <OrderTracking order={order} />
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{order.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment</p>
                      <p className="font-medium capitalize">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-medium">{order.items.length} items</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-bold text-primary">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {order.estimatedDelivery && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <p className="text-sm font-medium text-primary">Expected Delivery</p>
                      <p className="text-sm">{order.estimatedDelivery.toLocaleDateString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                    onClick={handleContactSupport}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>

                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleReorder}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reorder Items
                  </Button>

                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Items */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Items in this Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex gap-4">
                      <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.product.fabric} • {item.product.category}
                        </p>

                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Size:</span>
                            <Badge variant="outline" className="text-xs">
                              {item.selectedSize}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Color:</span>
                            <div className="flex items-center gap-1">
                              <div
                                className="w-3 h-3 rounded-full border border-border"
                                style={{
                                  backgroundColor:
                                    item.selectedColor.toLowerCase() === "maroon"
                                      ? "#800000"
                                      : item.selectedColor.toLowerCase() === "gold"
                                        ? "#FFD700"
                                        : item.selectedColor.toLowerCase() === "red"
                                          ? "#DC2626"
                                          : "#6B7280",
                                }}
                              />
                              <span className="text-xs">{item.selectedColor}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Qty:</span>
                            <span className="text-xs font-medium">{item.quantity}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">₹{item.product.price.toLocaleString()}</span>
                            {item.product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{item.product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{(order.total - 99 - Math.round(order.total * 0.05)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{Math.round(order.total * 0.05).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
