import { products } from "@/lib/products"
import Marquee from "../components/marquee"
import ProductCard from "../components/product-card"




export default function ShopPage() {
  return (
    <div>
      <Marquee />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <p className="font-metal tracking-[0.3em] text-sm">11/03/2024 1:00 PM</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, idx) => (
            <ProductCard product={product} key={idx}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

