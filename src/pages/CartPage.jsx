import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, dispatch } = useCart()
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="inline-block relative">
          <div className="text-9xl mb-8">🛒</div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-lg animate-pulse-soft">
            ۰
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">سبد خرید خالی است</h2>
        <p className="text-gray-400 mb-8">بیا بریم یه چیزی پیدا کنیم که دوستش داشته باشی!</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          مشاهده محصولات
          <span>←</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">سبد خرید</h1>
        <p className="text-gray-400">{totalItems} آیتم در سبد</p>
      </div>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-5 animate-fade-in-up hover:shadow-md transition-all"
            style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
              {item.image}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
              <p className="text-blue-600 font-bold text-sm mt-1">
                {(item.price * item.quantity).toLocaleString()} تومان
              </p>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                className="w-9 h-9 cursor-pointer bg-white rounded-xl flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all font-bold shadow-sm"
              >
                −
              </button>
              <span className="w-10 text-center font-bold text-gray-700">
                {item.quantity}
              </span>
              <button
                onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                className="w-9 h-9 cursor-pointer bg-white rounded-xl flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all font-bold shadow-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
              className="text-gray-300 cursor-pointer hover:text-red-400 transition-all text-xl flex-shrink-0 hover:scale-125"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 sticky bottom-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">جمع کل:</span>
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>
        <button className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 transition-all transform active:scale-95">
          تکمیل خرید
        </button>
      </div>
    </div>
  )
}

export default CartPage