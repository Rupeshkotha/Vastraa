import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="pt-16">{children}</main>
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
