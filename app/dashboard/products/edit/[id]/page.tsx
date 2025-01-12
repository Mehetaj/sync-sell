'use client'


import { useRouter } from "next/navigation"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { ProductFormData } from "@/lib/products"
import { ProductForm } from "@/app/components/product-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter()

  // Mock data - replace with actual API call
  const mockProduct: ProductFormData = {
    name: "SYNC BASIC TEE",
    price: "$49.99",
    category: "T-Shirts",
    stock: 50,
    image: "/placeholder.svg?height=100&width=100"
  }

  const handleSubmit = async (data: ProductFormData) => {
    // Implement product update
    console.log('Update product:', params.id, data)
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
          <h1 className="font-metal text-2xl tracking-wider">Edit Product</h1>
          <p className="text-gray-600 mt-1">Update product details</p>
        </div>
      </div>

      <ProductForm 
        initialData={mockProduct}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

