import { create } from "zustand"

export type Order = {
  id: string
  customer: string
  status: string
  total: number
}

type AppState = {
  orders: Order[]
  addOrder: (order: Order) => void
  removeOrder: (id: string) => void
  clearOrders: () => void
}

export const useAppStore = create<AppState>((set) => ({
  orders: [],

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  removeOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),

  clearOrders: () => set({ orders: [] }),
}))
