"use client"

import { Home, Grid3X3, ShoppingBag, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MobileNavigation() {
  const cart = useAppStore((state) => state.cart)
  const orders = useAppStore((state) => state.orders)
  const pathname = usePathname()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  const pendingOrdersCount = orders.filter(
    (order) =>
      order.status === "pending" ||
      order.status === "confirmed" ||
      order.status === "processing" ||
      order.status === "shipped",
  ).length

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/products", icon: Grid3X3, label: "Categories" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", badge: cartItemsCount },
    { href: "/orders", icon: Package, label: "Orders", badge: pendingOrdersCount },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
