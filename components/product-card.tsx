"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { ProductCardProps } from '@/lib/products'

export default function ProductCard({
  product,
  variant = 'default',
  onQuickView,
  onAddToCart
}: ProductCardProps) {
  const { name, price, image, isNew, isSoldOut, id } = product

  return (
    <motion.div
      whileHover={{ scale: variant === 'compact' ? 1.01 : 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link href={`/shop/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* Main Image */}
          <Image
            src={image}
            alt={name || " "}
            fill
            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />

          {/* Status Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <span className="bg-black text-white px-2 py-1 text-xs font-metal tracking-wider">
                NEW
              </span>
            )}
            {isSoldOut && (
              <span className="bg-red-600 text-white px-2 py-1 text-xs font-metal tracking-wider">
                SOLD OUT
              </span>
            )}
          </div>

          {/* Quick Actions */}
          {variant !== 'compact' && (
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {onQuickView && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onQuickView(product)
                  }}
                  className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5" />
                </button>
              )}
              {onAddToCart && !isSoldOut && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onAddToCart(product)
                  }}
                  className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className={`mt-4 text-center ${variant === 'featured' ? 'space-y-2' : 'space-y-1'}`}>
        <h3 className={`font-metal tracking-wider ${variant === 'featured' ? 'text-lg' : 'text-sm'
          }`}>
          {name}
        </h3>
        <p className={`tracking-wider ${variant === 'compact' ? 'text-xs' : 'text-sm'
          }`}>
          {price}
        </p>
        {variant === 'featured' && product.category && (
          <p className="text-xs text-gray-600 tracking-wider uppercase">
            {product.category}
          </p>
        )}
      </div>
    </motion.div>
  )
}

