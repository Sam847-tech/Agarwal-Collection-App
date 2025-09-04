"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// components
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { mockProducts } from "@/lib/data"
import { useAppStore } from "@/lib/store"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="flex justify-center items-center h-screen">Loading...</p>
  }

  // ✅ Restrict access only to your Gmail
  if (session?.user?.email !== "sambhavarya87@gmail.com") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">🚫 Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <Button onClick={() => signOut({ callbackUrl: "/login" })} className="mt-4">
          Sign Out
        </Button>
      </div>
    )
  }

  // === Dashboard Data ===
  const orders = useAppStore((state) => state.orders)
  const totalProducts = mockProducts.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const recentOrders = orders.slice(0, 5)

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

          {/* Recent Orders + Low Stock */}
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
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
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
                          <Badge>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Low Stock */}
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
                    .filter((p) => p.stock <= 5)
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
                        <Badge>{product.stock} left</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
