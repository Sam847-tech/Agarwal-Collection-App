"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // ✅ always call hooks at the top
  const orders = useAppStore((state) => state.orders ?? [])

  // redirect unauthenticated users
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

  return (
    <main className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Orders</CardTitle>
          <Button variant="ghost" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.customerInfo?.name ?? "Unknown Customer"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {/* ✅ Use safe formatDate utility */}
                      {order.createdAt ? formatDate(order.createdAt) : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      ₹{order.total.toLocaleString()}
                    </p>
                    <Badge>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
