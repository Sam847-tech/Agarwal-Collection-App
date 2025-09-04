"use client"

import { useState, useMemo, useEffect } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { mockProducts } from "@/lib/data"
import { useSearchParams } from "next/navigation"

interface FilterState {
  categories: string[]
  occasions: string[]
  fabrics: string[]
  priceRange: [number, number]
  inStock: boolean
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    occasions: [],
    fabrics: [],
    priceRange: [0, 50000],
    inStock: false,
  })

  useEffect(() => {
    const urlSearch = searchParams.get("search") || ""
    setSearchQuery(urlSearch)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.fabric.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.occasion.some((occ) => occ.toLowerCase().includes(query)),
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.category))
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Fabric filter
    if (filters.fabrics.length > 0) {
      filtered = filtered.filter((product) => filters.fabrics.includes(product.fabric))
    }

    // Occasion filter
    if (filters.occasions.length > 0) {
      filtered = filtered.filter((product) => product.occasion.some((occ) => filters.occasions.includes(occ)))
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    return filtered
  }, [searchQuery, filters])

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">Our Collection</h1>
            <p className="text-muted-foreground">Discover our exquisite range of traditional wear</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
              />
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
