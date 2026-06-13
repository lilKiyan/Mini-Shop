import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const { dispatch } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😢</div>
        <p className="text-gray-400">محصول پیدا نشد</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-blue-500 transition-colors">خانه</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-blue-500 transition-colors">محصولات</Link>
        <span>/</span>
        <span className="text-gray-600">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
          <span className="relative text-[150px] animate-float select-none">
            {product.image}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-yellow-500 text-sm">
                ⭐ ۴.۸ (۱۲۴ نظر)
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-500 leading-relaxed text-justify">
              {product.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">قیمت</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400">تومان</span>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                موجود در انبار
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 cursor-pointer ${
              addedToCart
                ? 'bg-green-500 text-white shadow-green-200'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-200 hover:shadow-xl'
            }`}
          >
            {addedToCart ? '✅ به سبد اضافه شد!' : '🛒 افزودن به سبد خرید'}
          </button>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🚚', text: 'ارسال رایگان' },
              { icon: '🔄', text: 'ضمانت بازگشت' },
              { icon: '📞', text: 'پشتیبانی ۲۴/۷' },
              { icon: '🔒', text: 'پرداخت امن' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-500 text-sm">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage