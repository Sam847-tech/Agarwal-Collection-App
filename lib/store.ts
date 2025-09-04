"use client"

import { create } from "zustand"
import type { CartItem, Product, Order, User } from "./types"

interface AppState {
  // Cart state
  cart: CartItem[]
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void

  // User state
  user: User | null
  setUser: (user: User | null) => void

  // Orders state
  orders: Order[]
  addOrder: (order: Order) => void

  // Wishlist state
  wishlist: string[]
  toggleWishlist: (productId: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Cart state
  cart: [],
  addToCart: (product, size, color, quantity = 1) => {
    console.log("[store] addToCart:", { productId: product.id, size, color, quantity })

    const { cart } = get()
    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color,
    )

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      })
    } else {
      set({
        cart: [...cart, { product, selectedSize: size, selectedColor: color, quantity }],
      })
    }
  },

  removeFromCart: (productId, size, color) => {
    set({
      cart: get().cart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color),
      ),
    })
  },

  updateCartQuantity: (productId, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, size, color)
      return
    }

    set({
      cart: get().cart.map((item) =>
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item,
      ),
    })
  },

  clearCart: () => set({ cart: [] }),

  // User state
  user: null,
  setUser: (user) => set({ user }),

  // Orders state
  orders: [],
  addOrder: (order) => set({ orders: [...get().orders, order] }),

  // Wishlist state
  wishlist: [],
  toggleWishlist: (productId) => {
    const { wishlist } = get()
    if (wishlist.includes(productId)) {
      set({ wishlist: wishlist.filter((id) => id !== productId) })
    } else {
      set({ wishlist: [...wishlist, productId] })
    }
  },
}))
