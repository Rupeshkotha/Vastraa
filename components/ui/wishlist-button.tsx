"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    size?: string
    color?: string
  }
  className?: string
  size?: "sm" | "default" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function WishlistButton({ product, className, size = "default", variant = "ghost" }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleWishlist = async () => {
    setIsLoading(true)
    
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 200))
    
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
    
    setIsLoading(false)
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(
        "transition-all duration-200",
        inWishlist && "text-red-500 hover:text-red-600",
        className
      )}
      onClick={handleToggleWishlist}
      disabled={isLoading}
    >
      <Heart 
        className={cn(
          "h-4 w-4 transition-all duration-200",
          inWishlist && "fill-current"
        )} 
      />
    </Button>
  )
} 