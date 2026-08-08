"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  image?: string;
  quantity: number;
  stock: number;
};

type CartState = {
  items: CartItem[];
  /** False until the persisted list has been read back from localStorage. */
  hydrated: boolean;
  setHydrated: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      // Quantities are requested, not purchased: a buyer may legitimately ask
      // for more units than current stock, so quantity is never capped by it.
      addItem: (item, quantity = 1) => {
        const qty = Math.max(1, Math.floor(quantity) || 1);
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        });
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, Math.floor(quantity) || 1) }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "nidus-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
