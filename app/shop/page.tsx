"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProductGrid from "@/components/shop/product-grid"
import ProductFilters from "@/components/shop/product-filters"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

gsap.registerPlugin(ScrollTrigger)

export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 500],
    size: "",
    color: "",
    sortBy: "featured",
  })

  useEffect(() => {
    gsap.fromTo(".shop-header", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    gsap.fromTo(
      ".product-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="shop-header mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Collection</h1>
          <p className="text-xl text-gray-600">Discover our complete range of premium fashion</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="mb-6">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <ProductFilters filters={filters} onFiltersChange={setFilters} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
