import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CartModal } from "./components/cart"
import { CartProvider } from "./components/cart-context"
import App from "./App"
import "./style.css"


ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <CartModal>
          <App />
        </CartModal>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
