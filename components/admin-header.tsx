"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Plus } from "lucide-react"

interface AdminHeaderProps {
  title: string
  subtitle?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search..." className="pl-10 w-64" />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Button>

          {/* Action Button */}
          {action && (
            <Button onClick={action.onClick} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
