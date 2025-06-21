"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { WishlistButton } from "@/components/ui/wishlist-button"

const products = [
  {
    id: "1",
    name: "Elegant Floral Door Curtain",
    price: 1299,
    image: "/placeholder.jpg",
    category: "Door Curtains",
    href: "/product/1",
  },
  {
    id: "2",
    name: "Luxury Cotton Bed Sheet Set",
    price: 2499,
    image: "/placeholder.jpg",
    category: "Bed Sheets",
    href: "/product/2",
  },
  {
    id: "3",
    name: "Raymond Premium Suiting",
    price: 3999,
    image: "/placeholder.jpg",
    category: "Sutings & Shirtings",
    href: "/product/3",
  },
  {
    id: "4",
    name: "Modern Striped Door Curtain",
    price: 1499,
    image: "/placeholder.jpg",
    category: "Door Curtains",
    href: "/product/4",
  },
]

export default function BestSellers() {
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    // Optionally show a toast notification
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <Link href={product.href} className="block relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute top-3 right-3">
                  <WishlistButton product={product} />
                </div>
              </CardContent>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <Link href={product.href}>
                  <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-bold text-xl text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link href="/shop">Explore All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
