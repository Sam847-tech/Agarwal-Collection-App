"use client"

import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 relative">
      <div className="absolute inset-0 opacity-10 bg-traditional-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-rose-800">Shop by Category</h2>
          <p className="text-rose-600">Explore our curated collections of traditional Indian wear</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-2 border-rose-200 shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 transition-all duration-300 bg-white/90 backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">{category.name}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                      <span>Explore Collection</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
