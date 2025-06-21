"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Door Curtains",
    description: "Stylish and elegant door curtains",
    image: "/placeholder.jpg",
    href: "/shop?category=door-curtains",
  },
  {
    name: "Bed Sheets",
    description: "Comfortable and high-quality bed sheets",
    image: "/placeholder.jpg",
    href: "/shop?category=bed-sheets",
  },
  {
    name: "Sutings & Shirtings",
    description: "Premium fabrics for suits and shirts",
    image: "/placeholder.jpg",
    href: "/shop?category=sutings-shirtings",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
