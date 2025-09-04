"use client"

import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Package, Heart, MapPin, Phone, Mail, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"

export default function ProfilePage() {
  const orders = useAppStore((state) => state.orders)
  const wishlist = useAppStore((state) => state.wishlist)

  const totalOrders = orders.length
  const completedOrders = orders.filter((order) => order.status === "delivered").length

  const menuItems = [
    { icon: Package, label: "My Orders", href: "/orders", badge: totalOrders },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: wishlist.length },
    { icon: MapPin, label: "Addresses", href: "/addresses" },
    { icon: Settings, label: "Account Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help & Support", href: "/support" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">A</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-serif text-xl font-bold">Agarwal Customer</h2>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-muted-foreground">customer@example.com</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <p className="font-bold text-2xl">{totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-bold text-2xl">{completedOrders}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Menu Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {menuItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                      index < menuItems.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                onClick={() => {
                  const message = "Hi! I need help with my account. Please assist me."
                  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, "_blank")
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp Support
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.open("tel:+919876543210")}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Support
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.open("mailto:support@agarwalcollection.com")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
