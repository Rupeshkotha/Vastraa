"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

const bestSellers = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Men",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Women",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Unisex",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Luxury Leather Handbag",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    rating: 4.9,
    reviews: 67,
  },
]

export default function BestSellers() {
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof bestSellers)[0]) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Sellers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pieces that customers can't get enough of
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <Card
              key={product.id}
              className="fade-up group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.originalPrice && <Badge className="absolute top-4 left-4 bg-red-500">Sale</Badge>}
                    </div>
                  </Link>

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <Badge variant="outline" className="mb-2">
                    {product.category}
                  </Badge>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 fade-up">
          <Button size="lg" variant="outline" asChild>
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
