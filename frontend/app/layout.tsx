import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
})

export const metadata: Metadata = {
  title: "LUXE - Premium Fashion Store",
  description: "Discover premium clothing and accessories for the modern lifestyle",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main className="pt-16">{children}</main>
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
