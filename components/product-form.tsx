'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductFormData } from "@/lib/products"




interface ProductFormProps {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData) => void
  isLoading?: boolean
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      price: '',
      category: '',
      stock: 0,
      image: ''
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="block font-metal tracking-wider mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block font-metal tracking-wider mb-1">
            Price
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block font-metal tracking-wider mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
          >
            <option value="">Select category</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Accessories">Accessories</option>
            <option value="Outerwear">Outerwear</option>
          </select>
        </div>

        <div>
          <label className="block font-metal tracking-wider mb-1">
            Stock
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block font-metal tracking-wider mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 font-metal tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
      </motion.button>
    </form>
  )
}
