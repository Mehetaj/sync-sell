'use client'

// import { useRouter } from "next/navigation"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { ProductForm } from "@/components/product-form"
import React from "react"



export default function EditProductPage() {
  // const router = useRouter()

  const handleSubmit = async () => {
    console.log("Hello")
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
          {/* <h1 className="font-metal text-2xl tracking-wider">{params.id ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-gray-600 mt-1">{params.id ? 'Update product details' : 'Create a new product'}</p> */}
        </div>
      </div>

      <ProductForm 
        onSubmit={handleSubmit}
      />
    </div>
  )
}
