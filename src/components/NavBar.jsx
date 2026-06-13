import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'


function Navbar() {
  const { cart } = useCart()
  const location = useLocation()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-3 z-50 px-4">
      <div className="max-w-6xl mx-auto glass rounded-3xl shadow-lg shadow-gray-200/50">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              M
            </div>
            <span className="text-xl font-black text-gray-800 hidden sm:block">
              Mini<span className="text-blue-500">Shop</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {[
              { path: '/', label: 'خانه', icon: '🏠' },
              { path: '/products', label: 'محصولات', icon: '🛍️' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden text-lg">{item.icon}</span>
              </Link>
            ))}

            <Link
              to="/cart"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/cart')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 animate-pulse-soft">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar