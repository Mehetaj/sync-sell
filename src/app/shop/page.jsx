"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Marquee from "../../components/marquee";
import ProductCard from "../../components/product-card";
import { fetchProducts } from "../store/features/product-slice";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Marquee />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <p className="font-metal tracking-[0.3em] text-sm">11/03/2024 1:00 PM</p>
        </div>
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, idx) => (
            <ProductCard product={product} key={idx} />
          ))}
        </div>
      </main>
    </div>
  );
}