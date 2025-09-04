"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package, ShoppingCart, Users, IndianRupee, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { mockProducts } from "@/lib/data"
import { useAppStore } from "@/lib/store"

export default function AdminDashboard() {
  const orders = useAppStore((state) => state.orders)

  // Calculate metrics
  const totalProducts = mockProducts.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length

  const metrics = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: totalProducts.toString(),
      change: "+2",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Customers",
      value: "156",
      change: "+5.1%",
      changeType: "positive" as const,
      icon: Users,
    },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Dashboard" subtitle="Welcome back! Here's what's happening with your store." />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <Card key={metric.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <metric.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    {metric.changeType === "positive" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ml-1 ${
                        metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.customerInfo.name}</p>
                          <p className="text-xs text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">₹{order.total.toLocaleString()}</p>
                          <Badge
                            variant="outline"
                            className={
                              order.status === "pending"
                                ? "border-yellow-500 text-yellow-700"
                                : order.status === "confirmed"
                                  ? "border-blue-500 text-blue-700"
                                  : order.status === "delivered"
                                    ? "border-green-500 text-green-700"
                                    : "border-gray-500 text-gray-700"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Low Stock Alert</CardTitle>
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProducts
                    .filter((product) => product.stock <= 5)
                    .slice(0, 5)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              product.stock === 0
                                ? "border-red-500 text-red-700"
                                : product.stock <= 3
                                  ? "border-orange-500 text-orange-700"
                                  : "border-yellow-500 text-yellow-700"
                            }
                          >
                            {product.stock} left
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Package className="h-6 w-6" />
                  Add New Product
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <ShoppingCart className="h-6 w-6" />
                  Process Orders
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
