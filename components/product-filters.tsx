"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"
import { categories, occasions, fabrics } from "@/lib/data"

interface FilterState {
  categories: string[]
  occasions: string[]
  fabrics: string[]
  priceRange: [number, number]
  inStock: boolean
}

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  isOpen: boolean
  onToggle: () => void
}

export function ProductFilters({ filters, onFiltersChange, isOpen, onToggle }: ProductFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "categories" | "occasions" | "fabrics", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      occasions: [],
      fabrics: [],
      priceRange: [0, 50000],
      inStock: false,
    })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.occasions.length +
    filters.fabrics.length +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button variant="outline" onClick={onToggle} className="w-full justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={() => toggleArrayFilter("categories", category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-3">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
                  max={50000}
                  min={0}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{filters.priceRange[0].toLocaleString()}</span>
                  <span>₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Fabric */}
            <div>
              <h3 className="font-medium mb-3">Fabric</h3>
              <div className="space-y-2">
                {fabrics.map((fabric) => (
                  <div key={fabric} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fabric-${fabric}`}
                      checked={filters.fabrics.includes(fabric)}
                      onCheckedChange={() => toggleArrayFilter("fabrics", fabric)}
                    />
                    <Label htmlFor={`fabric-${fabric}`} className="text-sm font-normal cursor-pointer">
                      {fabric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <h3 className="font-medium mb-3">Occasion</h3>
              <div className="space-y-2">
                {occasions.map((occasion) => (
                  <div key={occasion} className="flex items-center space-x-2">
                    <Checkbox
                      id={`occasion-${occasion}`}
                      checked={filters.occasions.includes(occasion)}
                      onCheckedChange={() => toggleArrayFilter("occasions", occasion)}
                    />
                    <Label htmlFor={`occasion-${occasion}`} className="text-sm font-normal cursor-pointer">
                      {occasion}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => updateFilter("inStock", checked)}
                />
                <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                  In Stock Only
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
