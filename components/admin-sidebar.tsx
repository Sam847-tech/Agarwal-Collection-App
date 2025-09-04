"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="bg-background">
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-border">
            <div className="flex flex-col">
              <h1 className="font-serif text-xl font-bold text-primary">Agarwal</h1>
              <p className="text-xs text-muted-foreground -mt-1">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.name === "Orders" && (
                    <Badge variant="secondary" className="ml-auto">
                      3
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@agarwal.com</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
