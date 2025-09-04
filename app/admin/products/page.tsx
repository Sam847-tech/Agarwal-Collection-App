"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Edit, Trash2, Eye, Search, Filter, Grid3X3, List } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockProducts } from "@/lib/data"
import Image from "next/image"

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = () => {
    // Would open add product modal/page
    console.log("Add new product")
  }

  const handleEditProduct = (productId: string) => {
    console.log("Edit product:", productId)
  }

  const handleDeleteProduct = (productId: string) => {
    console.log("Delete product:", productId)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Products"
          subtitle="Manage your product inventory"
          action={{
            label: "Add Product",
            onClick: handleAddProduct,
          }}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
              >
                <option value="all">All Categories</option>
                <option value="sarees">Sarees</option>
                <option value="suits">Suits</option>
                <option value="lehengas">Lehengas</option>
              </select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>

              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Card key={product.id} className={`overflow-hidden ${viewMode === "list" ? "flex" : ""}`}>
                <CardContent className="p-0">
                  <div className={`relative ${viewMode === "list" ? "w-32 h-32" : "aspect-[3/4]"} overflow-hidden`}>
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />

                    {/* Stock badge */}
                    <Badge
                      className={`absolute top-2 left-2 ${
                        product.stock === 0 ? "bg-red-500" : product.stock <= 5 ? "bg-orange-500" : "bg-green-500"
                      }`}
                    >
                      {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
                    </Badge>

                    {/* Actions */}
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="bg-background/80 hover:bg-background">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 capitalize">
                      {product.fabric} • {product.category}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-primary">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.occasion.slice(0, 2).map((occasion) => (
                        <Badge key={occasion} variant="outline" className="text-xs">
                          {occasion}
                        </Badge>
                      ))}
                    </div>

                    {viewMode === "list" && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product.id)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
