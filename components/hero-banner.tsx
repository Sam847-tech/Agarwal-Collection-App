"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function HeroBanner() {
  const router = useRouter()

  const handleShopCollection = () => {
    router.push("/products")
  }

  const handleViewLookbook = () => {
    router.push("/products?featured=true")
  }

  return (
    <section className="relative overflow-hidden traditional-pattern">
      <div className="absolute inset-0 gradient-secondary opacity-90"></div>
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-primary font-semibold text-sm md:text-base">✨ Festive Collection 2024</span>
              </div>
              <h1 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-balance">
                Exquisite
                <span className="text-primary block gradient-primary bg-clip-text text-transparent">
                  Traditional Wear
                </span>
              </h1>
            </div>

            <p className="text-foreground/80 text-base md:text-lg max-w-md mx-auto md:mx-0 text-pretty font-serif">
              Discover our handpicked collection of premium sarees, elegant suits, and stunning lehengas crafted for
              your special moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 btn-traditional shadow-lg"
                onClick={handleShopCollection}
              >
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-traditional bg-transparent"
                onClick={handleViewLookbook}
              >
                View Lookbook
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 pt-4">
              <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                <p className="font-bold text-2xl text-primary">500+</p>
                <p className="text-sm text-muted-foreground font-serif">Designs</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                <p className="font-bold text-2xl text-primary">10K+</p>
                <p className="text-sm text-muted-foreground font-serif">Happy Customers</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                <p className="font-bold text-2xl text-primary">15+</p>
                <p className="text-sm text-muted-foreground font-serif">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl">
              <Image
                src="/placeholder-d973o.png"
                alt="Beautiful traditional Indian wear collection"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-white/20">
                Up to 40% Off
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">Premium Quality</p>
                  <p className="text-xs text-muted-foreground font-serif">Handcrafted Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
