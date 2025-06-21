"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/contexts/auth-context"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { UserDropdown } from "@/components/auth/user-dropdown"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistItemsCount = wishlistItems.length

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md",
        isScrolled ? "shadow-sm" : "border-b"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="text-2xl font-bold font-display text-gray-900">
              Sri Rajya Lakshmi Textiles
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex flex-2 justify-center items-center gap-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={cn(
                  "text-base font-medium transition-colors hover:text-gray-900",
                  pathname === item.href ? "text-gray-900 font-semibold" : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Search & Actions */}
          <div className="flex-1 flex justify-end items-center gap-x-2">
            <div className="hidden lg:flex items-center mr-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search..." className="pl-10 w-64 h-10 rounded-full bg-gray-100 focus:bg-white focus:w-80 transition-all duration-300" />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {wishlistItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            
            {user ? (
              <UserDropdown />
            ) : (
              <AuthDialog>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </AuthDialog>
            )}

            <Button variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-6 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={`mobile-${item.name}`}
                        href={item.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-gray-900",
                           pathname === item.href ? "text-gray-900 font-semibold" : "text-gray-700"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="pt-6 border-t">
                      {user ? (
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                             <Avatar className="h-10 w-10">
                               <AvatarImage src={user.image} alt={user.name} />
                               <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div>
                               <p className="font-semibold">{user.name}</p>
                               <p className="text-sm text-gray-500">View Account</p>
                             </div>
                           </div>
                           <Button variant="outline" className="w-full" onClick={signOut}>Sign Out</Button>
                        </div>
                      ) : (
                        <AuthDialog>
                          <Button variant="outline" className="w-full">
                            Sign In / Sign Up
                          </Button>
                        </AuthDialog>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
