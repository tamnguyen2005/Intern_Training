import { Product } from "../types/product.type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
export interface CartItem {
  product: Product;
  quantity: number;
}
interface CartState {
  item: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        item: [],
        addToCart: (product: Product) =>
          set(
            (state) => {
              const existingItem = state.item.find(
                (item) => item.product.id === product.id,
              );
              if (existingItem)
                return {
                  item: state.item.map((i) =>
                    i.product.id === product.id
                      ? { ...i, quantity: i.quantity + 1 }
                      : i,
                  ),
                };
              return { item: [...state.item, { product, quantity: 1 }] };
            },
            false,
            "cart/addToCart",
          ),
        removeFromCart: (productId: number | string) =>
          set(
            (state) => ({
              item: state.item.filter((i) => i.product.id !== productId),
            }),
            false,
            "cart/removeFromCart",
          ),
        updateQuantity: (productId: number | string, quantity: number) =>
          set(
            (state) => {
              if (quantity <= 0)
                return {
                  item: state.item.filter((i) => i.product.id !== productId),
                };
              return {
                item: state.item.map((i) =>
                  i.product.id === productId ? { ...i, quantity: quantity } : i,
                ),
              };
            },
            false,
            "cart/updateQuantity",
          ),
        clearCart: () => set({ item: [] }, false, "cart/clearCart"),
      }),
      { name: "shopping-cart-storage" },
    ),
  ),
);
