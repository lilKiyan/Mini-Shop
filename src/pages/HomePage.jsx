import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.slice(0, 4)))
  }, [])

  return (
    <div className="space-y-24 pb-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 md:p-16 text-white">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              هر چیزی که نیاز داری،
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                فقط با یک کلیک
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              از جدیدترین گجت‌ها تا لوازم ضروری روزمره. با ضمانت بازگشت ۷ روزه و پشتیبانی ۲۴ ساعته.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
              >
                شروع خرید
                <span className="text-lg">←</span>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/20"
              >
                محصولات ویژه
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl backdrop-blur animate-float" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl backdrop-blur animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center text-8xl shadow-2xl animate-float" style={{ animationDelay: '0.5s' }}>
                🛍️
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-800 mb-2">محصولات ویژه</h2>
          <p className="text-gray-400">پرطرفدارترین محصولات این هفته</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}
              style={{ opacity: 0 }}
            >
              <div className="text-7xl text-center mb-4 group-hover:scale-110 transition-transform duration-500">
                {product.image}
              </div>
              <h3 className="font-bold text-gray-800 text-center mb-2">{product.title}</h3>
              <p className="text-blue-600 font-black text-center text-lg">
                {product.price.toLocaleString()} تومان
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🚚', title: 'ارسال سریع', desc: 'تحویل در کمتر از ۴۸ ساعت به سراسر ایران', color: 'from-blue-400 to-blue-600' },
            { icon: '🛡️', title: 'ضمانت بازگشت', desc: '۷ روز مهلت بازگشت بدون قید و شرط', color: 'from-purple-400 to-purple-600' },
            { icon: '💬', title: 'پشتیبانی ۲۴/۷', desc: 'هر سوالی داری، ما همیشه آنلاین هستیم', color: 'from-pink-400 to-pink-600' },
          ].map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage