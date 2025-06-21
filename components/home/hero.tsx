"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".hero-subtitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(
        ".hero-image",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1",
      )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="hero-title text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Elevate Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Style
            </span>
          </h1>
          <p className="hero-subtitle text-xl text-gray-600 mb-8 max-w-lg">
            Discover premium clothing that defines your unique style. From casual wear to luxury fashion.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-black hover:bg-gray-800" asChild>
              <Link href="/shop">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>

        <div className="hero-image relative">
          <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Fashion Model"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Brands</div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1K+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
