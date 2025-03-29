'use client'

import { FaInstagram, FaYoutube, FaTwitter, FaDiscord } from 'react-icons/fa'
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const menuItems = [
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
    { name: "NEW ARRIVALS", href: "/new-arrivals" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-8">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8"
      >
        <h1 className="text-7xl font-metal tracking-[0.15em] text-center relative">
          <span className="absolute -inset-1 blur-sm opacity-30">Blacked Out</span>
          Blacked Out
        </h1>
      </motion.div>

      {/* Navigation Menu */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3 w-full max-w-[280px] my-12"
      >
        {menuItems.map((item) => (
          <motion.div 
            key={item.name} 
            variants={itemVariants}
          >
            <Link 
              href={item.href}
              className="block w-full border border-black py-3 text-center font-metal text-sm tracking-[0.3em] 
                hover:bg-black hover:text-white transition-all duration-300 ease-in-out
                relative overflow-hidden group"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-0 bg-black transform origin-left scale-x-0 
                group-hover:scale-x-100 transition-transform duration-300 ease-out"/>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Links */}
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          <Link 
            href="#"
            className="text-black hover:opacity-60 transition-opacity duration-200 
              transform hover:scale-110 transition-transform duration-200"
          >
            <FaInstagram size={22} />
          </Link>
          <Link 
            href="#"
            className="text-black hover:opacity-60 transition-opacity duration-200 
              transform hover:scale-110 transition-transform duration-200"
          >
            <FaYoutube size={22} />
          </Link>
          <Link 
            href="#"
            className="text-black hover:opacity-60 transition-opacity duration-200 
              transform hover:scale-110 transition-transform duration-200"
          >
            <FaTwitter size={22} />
          </Link>
          <Link 
            href="#"
            className="text-black hover:opacity-60 transition-opacity duration-200 
              transform hover:scale-110 transition-transform duration-200"
          >
            <FaDiscord size={22} />
          </Link>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[10px] text-center space-y-1 tracking-wider text-neutral-500 font-metal"
        >
          <p>© 2024 Blacked Out</p>
          <p>DESIGNED BY Mehataz</p>
        </motion.div>
      </div>
    </div>
  )
}

