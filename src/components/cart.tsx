// CartModal.tsx
import React, { createContext, useContext, useState } from "react";
import { useCart } from "./cart-context";

type ModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  content: React.ReactNode | null;
  setContent: (c: React.ReactNode | null) => void;
};

const ModalCtx = createContext<ModalState | null>(null);

export function CartModal({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const { items, total, removeItem, setQty, clear } = useCart();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return (
    <ModalCtx.Provider
      value={{ isOpen, open, close, toggle, content, setContent }}
    >
      {children}

      {/* optional overlay to click-outside close */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      />

      {/* panel */}
      <div
        className={[
          "fixed top-16 right-5 z-[70] w-90 rounded-xl bg-white shadow-xl ring-1 ring-black/5",
          "origin-top transform-gpu transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
        ].join(" ")}
        role="dialog"
      >
        <div className="px-5 py-3 border-b border-gray-300">
          <h3 className="font-semibold">Cart</h3>
        </div>

        <div className="p-5 space-y-4">
          {content &&
            <div className="mb-5">{content}</div> }
          {items.length === 0 ? (
            <p className="text-center text-lg py-10  text-gray-500">
              Your cart is empty
            </p>
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((ci) => (
                  <li key={ci.product.id} className="flex items-center gap-3">
                    <img
                      src={ci.product.cartImage}
                      alt={ci.product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-800">
                        {ci.product.name}
                      </p>
                      <p className="text-gray-500">
                        {ci.product.price.sign}
                        {ci.product.price.price.toFixed(2)} × {ci.qty} ={" "}
                        <span className="font-semibold text-gray-900">
                          {(ci.product.price.price * ci.qty).toFixed(2)}
                        </span>
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <button
                          onClick={() =>
                            setQty(ci.product.id, Math.max(1, ci.qty - 1))
                          }
                          className="px-1 py-0 border border-gray-400 rounded"
                        >
                          -
                        </button>
                        <span className="min-w-6 text-center">{ci.qty}</span>
                        <button
                          onClick={() => setQty(ci.product.id, ci.qty + 1)}
                          className="px-1 py-0 border border-gray-400 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(ci.product.id, ci.qty)}
                      className="ml-auto text-red-600 text-sm"
                    >
                      <img src="/images/icon-delete.svg" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {items.length > 0 && (
            <div>
              <div className="flex justify-between py-3 border-t border-gray-300">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {items[0]?.product.price.sign}
                  {total.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2 text-sm" onClick={() => { clear(); setContent(null); close(); }}>
                <button className="flex-1 bg-orange-500 text-black rounded py-1 font-semibold">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalCtx.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error("useModal must be used within CartModal");
  return ctx;
}

export function CartButton() {
  const { toggle, isOpen } = useModal();
  return (
    <button
      onClick={toggle}
      className="grid place-items-center w-10 h-10 rounded hover:bg-black/5"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
    >
      <img src="/images/icon-cart.svg" alt="cart" className="w-5 h-5" />
    </button>
  );
}
