"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { createSlug } from '../lib/products';



export default function ProductCard({ product }) {
  const { name, price, image, category } = product;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link href={`/shop/${createSlug(name)}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* Main Image */}
          <Image
            src={image}
            alt={name || " "}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center space-y-1">
        <h3 className="font-metal tracking-wider text-sm">
          {name}
        </h3>
        <p className="tracking-wider text-sm">
          {price}
        </p>
        {category && (
          <p className="text-xs text-gray-600 tracking-wider uppercase">
            {category}
          </p>
        )}
      </div>
    </motion.div>
  )
}
