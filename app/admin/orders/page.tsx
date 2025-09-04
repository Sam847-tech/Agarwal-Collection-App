"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Eye, Search, Filter, Download, MessageCircle, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"

export default function AdminOrdersPage() {
  const orders = useAppStore((state) => state.orders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

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

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    console.log("Update order status:", orderId, newStatus)
  }

  const handleContactCustomer = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleWhatsAppCustomer = (phone: string, orderId: string) => {
    const message = `Hi! This is regarding your order ${orderId} from Agarwal Collection. How can we help you?`
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Orders" subtitle="Manage customer orders and track deliveries" />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders or customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.createdAt.toLocaleDateString()} • {order.createdAt.toLocaleTimeString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "confirmed")}>
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleContactCustomer(order.customerInfo.phone)}>
                              <Phone className="mr-2 h-4 w-4" />
                              Call Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleWhatsAppCustomer(order.customerInfo.phone, order.id)}
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              WhatsApp Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Customer Info */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">Customer</h4>
                        <p className="text-sm">{order.customerInfo.name}</p>
                        <p className="text-sm text-muted-foreground">{order.customerInfo.phone}</p>
                        {order.customerInfo.email && (
                          <p className="text-sm text-muted-foreground">{order.customerInfo.email}</p>
                        )}
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">Items ({order.items.length})</h4>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <p key={index} className="text-sm text-muted-foreground line-clamp-1">
                              {item.product.name} x{item.quantity}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
                          )}
                        </div>
                      </div>

                      {/* Order Total */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">Payment</h4>
                        <p className="text-lg font-bold text-primary">₹{order.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-medium text-sm mb-2">Delivery Address</h4>
                      <p className="text-sm text-muted-foreground">{order.customerInfo.address}</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-4">
                      <Select onValueChange={(value) => handleUpdateStatus(order.id, value)}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirm Order</SelectItem>
                          <SelectItem value="processing">Mark Processing</SelectItem>
                          <SelectItem value="shipped">Mark Shipped</SelectItem>
                          <SelectItem value="delivered">Mark Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancel Order</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhatsAppCustomer(order.customerInfo.phone, order.id)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No orders found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
