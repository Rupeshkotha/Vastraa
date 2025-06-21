"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface ProductFiltersProps {
  filters: {
    category: string
    subcategory: string
    priceRange: number[]
    size: string
    sortBy: string
  }
  onFiltersChange: (filters: any) => void
}

export default function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all">All Categories</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="door-curtains" id="door-curtains" />
              <Label htmlFor="door-curtains">Door Curtains</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bed-sheets" id="bed-sheets" />
              <Label htmlFor="bed-sheets">Bed Sheets</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sutings-shirtings" id="sutings-shirtings" />
              <Label htmlFor="sutings-shirtings">Sutings & Shirtings</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sutings and Shirtings Subcategory */}
      {filters.category === "sutings-shirtings" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sutings and Shirtings Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={filters.subcategory} onValueChange={(value) => updateFilter("subcategory", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-sutings-shirtings" />
                <Label htmlFor="all-sutings-shirtings">All Sutings and Shirtings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="raymond" id="raymond" />
                <Label htmlFor="raymond">Raymond</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lenin-club" id="lenin-club" />
                <Label htmlFor="lenin-club">Lenin Club</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="arvind-cotton" id="arvind-cotton" />
                <Label htmlFor="arvind-cotton">Arvind Cotton</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Size</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.size} onValueChange={(value) => updateFilter("size", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-sizes" />
              <Label htmlFor="all-sizes">All Sizes</Label>
            </div>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <RadioGroupItem value={size} id={size} />
                <Label htmlFor={size}>{size}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
