# 🛒 E‑commerce Product Page (React + TS + Vite + Tailwind)

A Frontend Mentor–style product page implemented with **React 19**, **TypeScript**, **Vite 7**, **Tailwind CSS v4**, and **React Router DOM v7**. It features a responsive UI, a thumbnail-driven gallery, a mobile hamburger menu, and a **cart system with persistence**.

> This README focuses on what I built, how I approached it, and what I learned — with small code snippets (not full files).

---

## 🚀 Overview

**Users can:**
- Browse a responsive product page (mobile → desktop).
- Switch the large image by clicking thumbnails / using next/prev on mobile.
- Open a cart popover, add multiple distinct items, adjust quantity, remove items, and **persist cart across reloads**.
- Use a mobile hamburger menu that slides in from the left.
- Get a **404 page** for non‑existent routes.

---

## ✨ Key Features

- **Global Cart Context**: add/remove/setQty/clear + derived `count` and `total`.
- **LocalStorage Persistence**: no `useEffect` needed; persistence happens inside state setters.
- **Cart Modal (Popover)**: toggled via context; includes overlay click‑outside to close.
- **Thumbnail Gallery**: select any thumbnail to update the main image.
- **Mobile Navigation**: animated slide‑in hamburger menu.
- **Routing**: nested routes with a `*` catch‑all 404 page.

---

## 🧱 Tech Stack

- **React** 19 + **TypeScript**
- **Vite** 7
- **Tailwind CSS** 4 (via `@tailwindcss/vite`)
- **React Router DOM** 7

**Scripts** (from `package.json`):
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

---

## 📦 Project Structure (high level)

```
src/
├─ components/
│  ├─ body.tsx              # product detail page UI
│  ├─ cart-context.tsx      # CartProvider + useCart (with localStorage)
│  ├─ cart.tsx              # CartModal + CartButton (popover UI)
│  ├─ header.tsx            # sticky header
│  └─ headerLinks.tsx       # desktop nav + mobile hamburger
├─ layout/
│  └─ mainLayouts.tsx       # shared layout (Header + <Outlet/>)
├─ pages/
│  ├─ collections.tsx
│  ├─ men.tsx
│  ├─ women.tsx
│  └─ notFound.tsx
├─ App.tsx                  # routes (includes 404)
├─ main.tsx                 # providers (Router, CartProvider, CartModal)
└─ style.css
```

---

## 🧠 What I Learned

- **State + Persistence without `useEffect`:** wrapping state updates in a helper that also writes to `localStorage` avoids sync bugs and keeps logic in one place.
- **Composable Contexts:** keeping *cart state* (business data) in one context and *modal visibility* in another made components simpler and reusable.
- **UI Transitions with Tailwind:** `origin-*` + `transform-gpu` + `transition-all` + `duration-*` give smooth, accessible animations.
- **Routing Gotchas:** the `*` route must be defined **last** and inside the right layout boundary to catch unknown paths.
- **Accessibility touches:** `role="dialog"`, `aria-expanded`, `aria-hidden`, and overlay click‑outside behavior improve UX.

---

## 🛠 Implementation Highlights (snippets)

### 1) Cart Context: set & persist (no `useEffect`)
```ts
// cart-context.tsx (excerpt)
const STORAGE_KEY = "cart:v1";

function readInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

const [items, setItems] = useState<CartItem[]>(() => readInitialCart());

const setAndPersist = (updater: (prev: CartItem[]) => CartItem[]) => {
  setItems(prev => {
    const next = updater(prev);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    return next;
  });
};
```

**Add / remove / set quantity**
```ts
// add (merge by id)
const addItem = (product: Sneakers, qty = 1) => {
  setAndPersist(prev => {
    const i = prev.findIndex(ci => ci.product.id === product.id);
    if (i >= 0) {
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    }
    return [...prev, { product, qty }];
  });
};
```

### 2) Cart Modal (overlay + panel + totals)
```tsx
// cart.tsx (excerpt)
<div
  className={`fixed inset-0 z-[60] transition-opacity ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
  onClick={close}
  aria-hidden={!isOpen}
/>

<div className={[
  "fixed top-16 right-5 z-[70] w-90 rounded-xl bg-white shadow-xl ring-1 ring-black/5",
  "origin-top transform-gpu transition-all duration-200 ease-out",
  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
].join(" ")} role="dialog">
  {/* …items… */}
  <div className="flex justify-between py-3 border-t border-gray-300">
    <span className="font-semibold">Total</span>
    <span className="font-semibold">{items[0]?.product.price.sign}{total.toFixed(2)}</span>
  </div>
</div>
```

### 3) Thumbnail gallery (select main image)
```tsx
// body.tsx (excerpt)
const [selectedThumbnail, setSelectedThumbnail] = useState(0);

<img
  src={sneakers[0].imageThumbnails[selectedThumbnail]}
  className="w-full h-full object-cover"
/>

<div className="hidden md:flex gap-5">
  {sneakers[0].imageThumbnails.map((thumb, i) => (
    <img
      key={i}
      onClick={() => setSelectedThumbnail(i)}
      src={thumb}
      className={`w-20 h-20 rounded cursor-pointer border-2 ${
        selectedThumbnail === i ? "border-orange-500 opacity-50" : "border-transparent"
      }`}
    />
  ))}
</div>
```

### 4) Mobile hamburger (slide‑in)
```tsx
// headerLinks.tsx (excerpt)
<aside
  className={[
    "fixed top-0 left-0 w-64 h-screen bg-white p-5 shadow-xl ring-1 ring-black/5 z-50",
    "origin-left transform-gpu transition-all duration-300 ease-out",
    open ? "opacity-100 scale-x-100 translate-x-0" : "opacity-0 scale-x-0"
  ].join(" ")}
  role="menu"
  aria-hidden={!open}
>
  {/* links */}
</aside>
```

### 5) 404 fallback
```tsx
// App.tsx (excerpt)
<Routes>
  <Route element={<MainLayout/>}>
    <Route path="/" element={<Women />} />
    <Route path="/collection" element={<Collections />} />
    <Route path="/men" element={<Men />} />
    <Route path="/women" element={<Women />} />
    <Route path="*" element={<NotFound />} />  {/* keep last */}
  </Route>
</Routes>
```

---

## 🧪 How I Accomplished This

1. **Scaffolded** a Vite + React + TS project and added Tailwind v4 (via `@tailwindcss/vite`).  
2. Built the **Header**, **Nav**, and **Hamburger** with Tailwind utilities and simple state.  
3. Implemented the **Body** with thumbnail selection and responsive controls.  
4. Created a dedicated **Cart Context** for items and totals, then a **Cart Modal** context for visibility.  
5. **Persisted** the cart by reading/writing to `localStorage` right inside the state setter wrapper.  
6. Wired up **routes** and a **404 catch‑all**.  
7. Polished hover/transition states and ensured a11y attributes on dialogs/menus.

---

## 🧩 Challenges & Solutions

- **Cart persistence without effects:** moved reads to lazy initializer and writes into a single `setAndPersist` helper.
- **Avoiding duplicated UI sources for the cart:** cart layout lives **only** in `CartModal`; pages call `addItem` and optionally `open()` — they don’t inject cart markup.
- **Animation glitches on mobile menu:** ensured the element stays in the DOM and toggles classes with `origin-left`, `scale-x-*`, and `pointer-events-none` for hidden state.

---

## 🛠 Running Locally

```bash
pnpm install
pnpm run dev      # http://localhost:5173
pnpm build
pnpm preview
```

---

## 🔮 Future Improvements

- Add a full **lightbox** for desktop product images.
- Extract a `formatCurrency` util for consistent price formatting.
- Add unit tests for cart logic (Vitest).
- Focus trap & keyboard navigation for the modal.

---

## 🧑‍🎨 Author & Links
- Tech: React, Vite, TypeScript, Tailwind, React Router
- GitHub: [Theezigner](https://github.com/Theezigner/ecommerce-product-page.git)  
- Live Demo: [Ecommerce-product-page](https://ecommerce-product-page-five-sigma.vercel.app/)

---



