"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Settings, ShoppingBag, Heart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-semibold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-gray-900 text-white text-2xl font-medium">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </CardDescription>
                <div className="flex justify-center mt-2">
                  <Badge variant="secondary" className="capitalize">
                    {user.provider} account
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-sm">Member since</p>
                      <p className="text-sm text-gray-600">January 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-sm">Last login</p>
                      <p className="text-sm text-gray-600">Today</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Access your most important features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" asChild>
                    <a href="/orders">
                      <ShoppingBag className="w-6 h-6" />
                      <span>My Orders</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" asChild>
                    <a href="/wishlist">
                      <Heart className="w-6 h-6" />
                      <span>Wishlist</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" asChild>
                    <a href="/settings">
                      <Settings className="w-6 h-6" />
                      <span>Settings</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" asChild>
                    <a href="/support">
                      <User className="w-6 h-6" />
                      <span>Support</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest interactions with our store
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Order #12345 placed</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Added item to wishlist</p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Account created</p>
                      <p className="text-sm text-gray-600">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 