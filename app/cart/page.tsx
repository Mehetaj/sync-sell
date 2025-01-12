'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMinus, FiPlus, FiX, FiShoppingBag } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'METAL SKULL T-SHIRT',
      price: 29.99,
      quantity: 1,
      image: '/placeholder.svg?height=120&width=120'
    },
    {
      id: '2',
      name: 'CHAIN BRACELET',
      price: 19.99,
      quantity: 2,
      image: '/placeholder.svg?height=120&width=120'
    },
    {
      id: '3',
      name: 'LEATHER JACKET',
      price: 199.99,
      quantity: 1,
      image: '/placeholder.svg?height=120&width=120'
    }
  ])

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.00
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-metal tracking-[0.2em] mb-4">YOUR CART</h1>
          <div className="h-[2px] w-16 bg-black mx-auto"></div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <FiShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-metal tracking-wider mb-8">YOUR CART IS EMPTY</p>
            <Link 
              href="/shop"
              className="inline-block px-8 py-3 bg-black text-white font-metal tracking-wider
                hover:bg-opacity-80 transition-all duration-200"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-6 p-4 border border-black"
                >
                  <div className="w-[120px] h-[120px] flex-shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-metal tracking-wider">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:opacity-70 transition-opacity"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="font-metal tracking-wider mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:opacity-70 transition-opacity"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      
                      <span className="font-metal tracking-wider w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:opacity-70 transition-opacity"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="border border-black p-6 space-y-6">
                <h2 className="font-metal tracking-wider text-xl mb-6">ORDER SUMMARY</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between font-metal tracking-wider">
                    <span>SUBTOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-metal tracking-wider">
                    <span>SHIPPING</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="h-[1px] bg-black"></div>
                  
                  <div className="flex justify-between font-metal tracking-wider text-lg">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="w-full px-4 py-3 bg-black text-white font-metal tracking-wider
                    hover:bg-opacity-80 transition-all duration-200"
                >
                  CHECKOUT
                </button>

                <Link 
                  href="/shop"
                  className="block text-center font-metal tracking-wider text-sm hover:opacity-70 transition-opacity"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
