"use client"

import { useState } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, MessageCircle } from "lucide-react"
import { useAppStore } from "@/lib/store"
import type { Order } from "@/lib/types"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const cart = useAppStore((state) => state.cart)
  const clearCart = useAppStore((state) => state.clearCart)
  const addOrder = useAppStore((state) => state.addOrder)

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi")
  const [isProcessing, setIsProcessing] = useState(false)

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 99
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return (
      customerInfo.name.trim() &&
      customerInfo.phone.trim() &&
      customerInfo.address.trim() &&
      customerInfo.city.trim() &&
      customerInfo.state.trim() &&
      customerInfo.pincode.trim()
    )
  }

  const handlePlaceOrder = async () => {
    if (!isFormValid()) return

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total,
      status: "pending",
      paymentMethod,
      customerInfo: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`,
      },
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    }

    addOrder(order)
    clearCart()

    // Redirect to order confirmation
    router.push(`/orders/${order.id}`)
  }

  const handleWhatsAppOrder = () => {
    const orderDetails = cart
      .map(
        (item) =>
          `${item.product.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity} - ₹${(
            item.product.price * item.quantity
          ).toLocaleString()}`,
      )
      .join("\n")

    const message = `Hi! I'd like to place an order:\n\n${orderDetails}\n\nTotal: ₹${total.toLocaleString()}\n\nCustomer Details:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}\n\nPayment: ${paymentMethod.toUpperCase()}\n\nPlease confirm the order and delivery details.`

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <main className="pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
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
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">Complete your order</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={customerInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={customerInfo.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "upi" | "cod")}>
                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">UPI Payment</p>
                            <p className="text-sm text-muted-foreground">Pay instantly using UPI</p>
                          </div>
                          <Badge variant="secondary">Recommended</Badge>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
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
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handlePlaceOrder}
                      disabled={!isFormValid() || isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Place Order - ₹${total.toLocaleString()}`}
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                      onClick={handleWhatsAppOrder}
                      disabled={!isFormValid()}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Order via WhatsApp
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Support
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Truck className="mr-2 h-4 w-4" />
                        Delivery Info
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
