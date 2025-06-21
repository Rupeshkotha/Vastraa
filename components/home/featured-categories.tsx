"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Men's Collection",
    image: "/placeholder.svg?height=400&width=300",
    href: "/shop?category=men",
    description: "Sophisticated styles for the modern man",
  },
  {
    id: 2,
    name: "Women's Collection",
    image: "/placeholder.svg?height=400&width=300",
    href: "/shop?category=women",
    description: "Elegant fashion for every occasion",
  },
  {
    id: 3,
    name: "Accessories",
    image: "/placeholder.svg?height=400&width=300",
    href: "/shop?category=accessories",
    description: "Complete your look with premium accessories",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                index === 0 ? "slide-in-left" : index === 2 ? "slide-in-right" : "fade-up"
              }`}
            >
              <Link href={category.href}>
                <CardContent className="p-0">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-200">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
