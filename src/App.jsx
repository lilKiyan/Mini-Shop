import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'


function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <NavBar />
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </CartProvider>
      </ThemeProvider>

    </BrowserRouter>
  )
}

export default App
