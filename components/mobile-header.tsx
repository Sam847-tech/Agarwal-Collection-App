"use client"

import type React from "react"

import { Search, ShoppingBag, Heart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function MobileHeader() {
  const cart = useAppStore((state) => state.cart)
  const wishlist = useAppStore((state) => state.wishlist)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleMobileSearch = () => {
    router.push("/products")
  }

  const handleCartClick = () => {
    router.push("/cart")
  }

  const handleLogoClick = () => {
    router.push("/")
  }

  const handleWishlistClick = () => {
    router.push("/profile")
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary/90 to-accent backdrop-blur supports-[backdrop-filter]:bg-primary/90 border-b border-accent/30 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg border-2 border-primary-foreground/30">
                <span className="text-primary font-bold text-lg">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border border-primary-foreground/50"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-xl font-black text-primary-foreground drop-shadow-sm group-hover:text-accent transition-colors">
                Agarwal
              </h1>
              <p className="text-xs text-primary-foreground/80 -mt-1 font-medium tracking-wide">Collection</p>
            </div>
          </button>
        </div>

        {/* Search Bar - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/70" />
            <input
              type="text"
              placeholder="Search sarees, suits, lehengas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-primary-foreground/30 rounded-lg bg-card backdrop-blur text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/20"
            onClick={handleMobileSearch}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-primary-foreground/20"
            onClick={handleWishlistClick}
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border border-primary-foreground/50">
                {wishlist.length}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-primary-foreground/20"
            onClick={handleCartClick}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border border-primary-foreground/50">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-accent/30 bg-gradient-to-b from-primary/90 to-primary">
          <nav className="px-4 py-3 space-y-2">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products?category=sarees"
              className="block py-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sarees
            </Link>
            <Link
              href="/products?category=suits"
              className="block py-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Suits
            </Link>
            <Link
              href="/products?category=lehengas"
              className="block py-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Lehengas
            </Link>
            <Link
              href="/products?featured=true"
              className="block py-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/products?sale=true"
              className="block py-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sale
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
