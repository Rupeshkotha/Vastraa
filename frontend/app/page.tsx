"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/home/hero"
import FeaturedCategories from "@/components/home/featured-categories"
import BestSellers from "@/components/home/best-sellers"
import Newsletter from "@/components/home/newsletter"
import Footer from "@/components/layout/footer"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  useEffect(() => {
    // GSAP ScrollTrigger animations
    gsap.fromTo(
      ".fade-up",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".fade-up",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    gsap.fromTo(
      ".slide-in-left",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".slide-in-left",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    gsap.fromTo(
      ".slide-in-right",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".slide-in-right",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <Newsletter />
      <Footer />
    </div>
  )
}
