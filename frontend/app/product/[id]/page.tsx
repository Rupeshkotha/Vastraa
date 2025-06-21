"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const productData = {
  1: {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    category: "Men",
    description:
      "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece features a classic fit that's perfect for any occasion. The soft, breathable fabric ensures all-day comfort while maintaining its shape wash after wash.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk for perfect fit",
      "Reinforced seams for durability",
      "Machine washable",
      "Available in multiple colors",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Navy", value: "navy" },
      { name: "Gray", value: "gray" },
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
}

export default function ProductPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = productData[productId as keyof typeof productData]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(".product-image", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" })

    gsap.fromTo(
      ".product-info",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" },
    )

    gsap.fromTo(
      ".product-feature",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out",
      },
    )
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="product-image">
            <div className="mb-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <Badge className="mb-4">{product.category}</Badge>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-red-500">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <Label className="text-base font-semibold mb-3 block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <Label
                      key={size}
                      htmlFor={size}
                      className="border rounded-lg p-3 cursor-pointer hover:border-gray-400 has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50"
                    >
                      <RadioGroupItem value={size} id={size} className="sr-only" />
                      <span className="font-medium">{size}</span>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <Label className="text-base font-semibold mb-3 block">Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <Label
                      key={color.value}
                      htmlFor={color.value}
                      className="border rounded-lg p-3 cursor-pointer hover:border-gray-400 has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50 flex items-center gap-2"
                    >
                      <RadioGroupItem value={color.value} id={color.value} className="sr-only" />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.value === "white" ? "#f9fafb" : color.value }}
                      />
                      <span className="font-medium">{color.name}</span>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12"
                >
                  -
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12">
                  +
                </Button>
              </div>

              <Button size="lg" className="flex-1 h-12" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="h-12"
                onClick={() => {
                  try {
                    const productId = `${product.id}`;
                    if (isInWishlist && isInWishlist(productId)) {
                      removeFromWishlist(productId);
                      toast({
                        title: "Removed from wishlist",
                        description: `${product.name} has been removed from your wishlist.`,
                      });
                    } else {
                      addToWishlist({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        category: product.category,
                      });
                      toast({
                        title: "Added to wishlist",
                        description: `${product.name} has been added to your wishlist.`,
                      });
                    }
                  } catch (error) {
                    console.error("Error handling wishlist action:", error);
                    toast({
                      title: "Error",
                      description: "There was an error updating your wishlist.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Heart className={`h-5 w-5 ${isInWishlist && isInWishlist(`${product.id}`) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="product-feature flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="product-feature">
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <h4 className="font-semibold mb-1">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </CardContent>
              </Card>

              <Card className="product-feature">
                <CardContent className="p-4 text-center">
                  <RotateCcw className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <h4 className="font-semibold mb-1">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </CardContent>
              </Card>

              <Card className="product-feature">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <h4 className="font-semibold mb-1">Secure Payment</h4>
                  <p className="text-sm text-gray-600">SSL encrypted checkout</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
