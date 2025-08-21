import React, { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "cart:v1";

/** Your domain types */
export type Price = {
  sign: string;
  price: number;
  oldPrice?: number;
};

export type Sneakers = {
  id: string;                       // make this required for reliable matching
  cartImage: string;
  imageThumbnails: string[];
  company: string;
  name: string;
  description: string;
  price: Price;
};

export type CartItem = {
  product: Sneakers;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Sneakers, qty?: number) => void;
  removeItem: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;   // total quantity (sum of qty)
  total: number;   // total price
};

const CartCtx = createContext<CartState | null>(null);

function readInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
} 

export function CartProvider({ children }: { children: React.ReactNode }) {
  // 1) items must be CartItem[]
  const [items, setItems] = useState<CartItem[]>(() => readInitialCart());

  const setAndPersist = (updater: (prev: CartItem[]) => CartItem[]) => {
    setItems(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // helper to find index by id
  const findIndexById = (arr: CartItem[], productId: string) =>
    arr.findIndex(ci => ci.product.id === productId);

  const addItem: CartState["addItem"] = (product, qty = 1) => {
    setAndPersist(prev => {
      const i = findIndexById(prev, product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
        }
      return [...prev, { product, qty }];
    });
  };

  const removeItem: CartState["removeItem"] = (productId, qty = 1) => {
    setAndPersist(prev => {
      const i = findIndexById(prev, productId);
      if (i === -1) return prev;
      const nextQty = prev[i].qty - qty;
      if (nextQty <= 0) return prev.filter(ci => ci.product.id !== productId);
      const next = [...prev];
      next[i] = { ...next[i], qty: nextQty };
      return next;
    });
  };

  const setQty: CartState["setQty"] = (productId, qty) => {
    setAndPersist(prev => {
      const i = findIndexById(prev, productId);
      if (i === -1) return prev;
      const next = [...prev];
      next[i] = { ...next[i], qty };
      return next;
    });
  };

  const clear = () => setAndPersist(() => []);

  // 2) items is CartItem[], so reduce over qty and product.price.price
  const { count, total } = useMemo(() => {
    const count = items.reduce((sum, ci) => sum + ci.qty, 0);
    const total = items.reduce(
      (sum, ci) => sum + ci.qty * ci.product.price.price,
      0
    );
    return { count, total };
  }, [items]);

  const value: CartState = { items, addItem, removeItem, setQty, clear, count, total };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

