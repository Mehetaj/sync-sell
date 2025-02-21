'use client'

import { useState } from "react"
import Link from "next/link"
import { Plus } from 'lucide-react'
import { motion } from "framer-motion"
import { Pagination } from "@/components/pagination"
import { ProductTable } from "@/components/product-table"

// Mock data - replace with actual API call
const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`,
  category: ['T-Shirts', 'Hoodies', 'Accessories', 'Outerwear'][Math.floor(Math.random() * 4)],
  stock: Math.floor(Math.random() * 100),
  image: "/placeholder.svg?height=100&width=100",
  createdAt: new Date().toISOString(),
  isNew: Math.random() > 0.5,
  isSoldOut: Math.random() > 0.8
}))

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage)

  const currentProducts = mockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete product:', id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-metal text-2xl tracking-wider">Products</h1>
          <p className="text-gray-600 mt-1">Manage your products</p>
        </div>
        <Link href="/dashboard/products/add">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white px-4 py-2 font-metal tracking-wider flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </motion.button>
        </Link>
      </div>

      {/* Products Table */}
      <ProductTable 
        products={currentProducts}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

