"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFiltersProps {
  filters: {
    category: string
    priceRange: number[]
    size: string
    color: string
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
              <RadioGroupItem value="men" id="men" />
              <Label htmlFor="men">Men</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="women" id="women" />
              <Label htmlFor="women">Women</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unisex" id="unisex" />
              <Label htmlFor="unisex">Unisex</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accessories" id="accessories" />
              <Label htmlFor="accessories">Accessories</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

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
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
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

      {/* Color */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.color} onValueChange={(value) => updateFilter("color", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-colors" />
              <Label htmlFor="all-colors">All Colors</Label>
            </div>
            {[
              { value: "black", label: "Black" },
              { value: "white", label: "White" },
              { value: "blue", label: "Blue" },
              { value: "red", label: "Red" },
              { value: "pink", label: "Pink" },
              { value: "green", label: "Green" },
            ].map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <RadioGroupItem value={color.value} id={color.value} />
                <Label htmlFor={color.value} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border border-gray-300`}
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
