"use client"

import { motion } from "framer-motion"
import ProductCard from "../components/product-card"


interface Product {
    id: string
    name: string
    price: number
    image: string
    category: string
    isNew: boolean
    dateAdded: string
  }
  
  

export default function NewArrivals() {
  // Sample products data - in a real app, this would come from an API
  const products: Product[] = [
    {
      id: "1",
      name: "DEATH RIDER JACKET",
      price: 299.99,
      image: "/placeholder.svg?height=500&width=500",
      category: "Outerwear",
      isNew: true,
      dateAdded: "2024-01-10",
    },
    {
      id: "2",
      name: "SKULL CRUSHER TEE",
      price: 49.99,
      image: "/placeholder.svg?height=500&width=500",
      category: "T-Shirts",
      isNew: true,
      dateAdded: "2024-01-09",
    },
    {
      id: "3",
      name: "VOID WALKER BOOTS",
      price: 199.99,
      image: "/placeholder.svg?height=500&width=500",
      category: "Footwear",
      isNew: true,
      dateAdded: "2024-01-08",
    },
    {
      id: "4",
      name: "DARKNESS HOODIE",
      price: 89.99,
      image: "/placeholder.svg?height=500&width=500",
      category: "Hoodies",
      isNew: true,
      dateAdded: "2024-01-07",
    },
    {
      id: "5",
      name: "METAL LORD PANTS",
      price: 129.99,
      image: "/placeholder.svg?height=500&width=500",
      category: "Pants",
      isNew: true,
      dateAdded: "2024-01-06",
    },
    {
      id: "6",
      name: "CHAOS BEANIE",
      price: 34.99,
      image: "/placeholder.svg?height=500&width=500",
      category: "Accessories",
      isNew: true,
      dateAdded: "2024-01-05",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-metal text-center mb-8 tracking-wider">New Arrivals</h2>
          <p className="font-metal text-gray-600 tracking-wide">
            Latest additions to our collection
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard name={product.name} price={product.price} image={product.image} />
            </motion.div>
          ))}
        </motion.div>

        {/* "Load More" Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="font-metal bg-black text-white px-8 py-3 tracking-wider hover:bg-gray-800 transition-colors">
            LOAD MORE
          </button>
        </motion.div>
      </div>
    </div>
  )
}
