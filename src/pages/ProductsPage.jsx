import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('همه')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = ['همه', ...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.includes(searchTerm)
    const matchesCategory = selectedCategory === 'همه' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-2">محصولات</h1>
        <p className="text-gray-400">{filteredProducts.length} محصول پیدا شد</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="چی می‌خوای پیدا کنی؟"
            className="w-full bg-white border border-gray-200 rounded-2xl py-3 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product, index) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={`group bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden animate-fade-in-up`}
            style={{ opacity: 0, animationDelay: `${index * 0.05}s` }}
          >
            {index === 0 && <div className="ribbon">ویژه</div>}

            <div className="text-7xl text-center mb-4 group-hover:scale-110 transition-transform duration-500">
              {product.image}
            </div>
            <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full mb-2">
              {product.category}
            </span>
            <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-blue-600 font-black text-lg">
              {product.price.toLocaleString()} تومان
            </p>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg">محصولی با این مشخصات پیدا نشد</p>
        </div>
      )}
    </div>
  )
}

export default ProductsPage