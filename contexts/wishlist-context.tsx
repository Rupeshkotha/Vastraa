"use client"

import { createContext, useReducer, type ReactNode } from "react"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  size?: string
  color?: string
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        return state // Item already exists in wishlist
      }

      const newItems = [...state.items, action.payload]
      return { items: newItems }
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter((item) => item.id !== action.payload)
      return { items: filteredItems }
    }

    case "CLEAR_WISHLIST":
      return { items: [] }

    default:
      return state
  }
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

export const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  const addItem = (item: WishlistItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}