# 🛒 Ecommerce Shopping Cart

A Modern ecoommerce product page built with **React + TypeScript + Vite + Tailwind CSS**   
Supports adding multiple products, persistent cart storage (via `localStorage`), a checkout flow, and a custom 404 page.

---

## ✨ Features

- 📦 **Add / Remove Items** – multiple distinct products can be added, not just multiples of one.
- 🔄 **Persistent Storage** – cart contents remain after page reload using `localStorage`.
- 🧮 **Dynamic Totals** – all totals formatted with `.toFixed(2)` for consistent display.
- 🧾 **Checkout Flow** – checkout button clears cart.
- 🗑️ **Cart Management** – remove items, adjust quantities, clear cart.
- 📱 **Responsive Design** – mobile-first with Tailwind utility classes.
- 🌐 **Routing** – React Router v6+ with a fallback **404 page** for non-existent routes.

---

## 🧰 Tech Stack

- **Framework:** React 18 + Vite  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **State Management:** React Context (with `localStorage` persistence)  
- **Routing:** React Router DOM  

---

## 🚀 Quick Start

```bash
# 1. Clone this repository
git clone https://github.com/your-username/react-shopping-cart.git

# 2. Navigate into the project
cd react-shopping-cart

# 3. Install dependencies
pnpm install   # or npm install / yarn install

# 4. Start development server
pnpm run dev

# 5. Build for production
pnpm build

# 6. Preview production build
pnpm preview
```

---

## 📂 Project Structure

```plaintext
src/
├── components/        # Reusable UI components (Cart, Navbar, ProductCard...)
├── context/           # Cart context (CartProvider.tsx)
├── pages/             # Page components (Home, Collections, NotFound...)
├── assets/            # Images and static assets
├── App.tsx            # Main app with routing
├── main.tsx           # Entry point
└── index.css          # Tailwind styles
```

---

## 🛠️ Example Code Snippets

### Cart Context with Persistent Storage

```tsx
import React, { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
};

const STORAGE_KEY = "cart:v1";
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      const updated = exists
        ? prev.map(i => (i.id === item.id ? { ...i, qty: i.qty + item.qty } : i))
        : [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clear = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

---

### 404 Page Example

```tsx
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-orange-500 text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
```

---

## 📸 Screenshots

### 🏠 Homepage
_Show products in a grid with add-to-cart buttons._

### 🛒 Cart Sidebar
_Display items, totals, and checkout button._

### 🚫 404 Page
_Custom fallback page for invalid routes._

---

## 🧑‍💻 Author

- GitHub: [Theezigner](https://github.com/Theezigner)

---


