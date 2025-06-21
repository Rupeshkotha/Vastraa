"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { WishlistButton } from "@/components/ui/wishlist-button"

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    size: ["S", "M", "L", "XL"],
    color: "white",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "women",
    size: ["XS", "S", "M", "L"],
    color: "blue",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "unisex",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "blue",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Luxury Leather Handbag",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "accessories",
    size: ["One Size"],
    color: "black",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 5,
    name: "Casual Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "accessories",
    size: ["7", "8", "9", "10", "11"],
    color: "white",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 6,
    name: "Silk Blouse",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "women",
    size: ["XS", "S", "M", "L", "XL"],
    color: "pink",
    rating: 4.8,
    reviews: 91,
  },
]

interface ProductGridProps {
  filters: {
    category: string
    priceRange: number[]
    size: string
    color: string
    sortBy: string
  }
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState(allProducts)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    let filteredProducts = [...allProducts]

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
    }

    if (filters.size) {
      filteredProducts = filteredProducts.filter((product) => product.size.includes(filters.size))
    }

    if (filters.color) {
      filteredProducts = filteredProducts.filter((product) => product.color === filters.color)
    }

    // Price range filter
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // Assuming newer products have higher IDs
        filteredProducts.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    setProducts(filteredProducts)
  }, [filters])

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="product-grid">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {products.length} products</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="product-card group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <WishlistButton 
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: product.size[0],
                      color: product.color,
                    }}
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                  />
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
                <Badge variant="outline" className="mb-2 capitalize">
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

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
