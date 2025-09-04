import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeroBanner } from "@/components/hero-banner"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50">
      <MobileHeader />

      <main className="pb-20 md:pb-0 bg-gradient-to-b from-transparent via-blue-25 to-emerald-25 relative">
        <div className="absolute inset-0 opacity-5 bg-traditional-pattern pointer-events-none"></div>

        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts />
      </main>

      <MobileNavigation />
    </div>
  )
}
