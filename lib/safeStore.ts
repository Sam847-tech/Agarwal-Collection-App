import { create } from "zustand";

interface CartItem {
  product: { id: string; name: string; price: number };
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface AppState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  clearCart: () => set({ cart: [] }),
}));
