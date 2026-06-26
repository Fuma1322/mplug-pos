import { create } from "zustand";
import { CartState, CartItem } from "@/types/cart";
import { Product } from "@/types/products";

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    const items = get().items;
    const exists = items.find((i) => i.id === product.id);

    if (exists) {
      set({
        items: items.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
      return;
    }

    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    set({ items: [...items, newItem] });
  },

  removeItem: (id: string) => {
    set({
      items: get().items.filter((i) => i.id !== id),
    });
  },

  increaseQty: (id: string) => {
    set({
      items: get().items.map((i) =>
        i.id === id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    });
  },

  decreaseQty: (id: string) => {
    set({
      items: get().items
        .map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
    });
  },

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
}));