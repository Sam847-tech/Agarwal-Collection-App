"use client";

import { create } from "zustand";

// ---------------- CART STORE ----------------
type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useSafeCart = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((c) => c.id === item.id);
      if (exists) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + item.qty } : c
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
  clearCart: () => set({ cart: [] }),
}));

// ---------------- USER STORE ----------------
type User = {
  id: string;
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useSafeUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// ---------------- ORDERS STORE ----------------
type Order = {
  id: string;
  date: string;
  total: number;
};

type OrdersStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

export const useSafeOrders = create<OrdersStore>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),
}));
