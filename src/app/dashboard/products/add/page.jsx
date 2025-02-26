'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { ProductForm } from "../../../../components/form/product-form"

export default function AddProductPage() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    // Implement product creation
    console.log('Create product:', data)
    router.push('/dashboard/products')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/products"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-metal text-2xl tracking-wider">Add Product</h1>
          <p className="text-gray-600 mt-1">Create a new product</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}

