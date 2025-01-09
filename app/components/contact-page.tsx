'use client'

import { useFormState } from 'react-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube, FaTwitter, FaDiscord } from 'react-icons/fa'
import Link from 'next/link'
import { submitContact } from '@/app/contact/action'

const initialState = {
  error: undefined,
  success: false,
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContact, initialState)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 mb-12"
      >
        <Link href="/">
          <h1 className="text-7xl font-metal tracking-[0.15em] text-center relative">
            <span className="absolute -inset-1 blur-sm opacity-30">SynC</span>
            SynC
          </h1>
        </Link>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-metal text-center mb-8 tracking-wider">Contact Us</h2>
        
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-metal text-sm tracking-wider mb-2">
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-black bg-transparent font-metal tracking-wider
                focus:outline-none focus:ring-2 focus:ring-black"
            />
            {state?.error?.name && (
              <p className="text-red-500 text-sm mt-1">{state.error.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-metal text-sm tracking-wider mb-2">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-black bg-transparent font-metal tracking-wider
                focus:outline-none focus:ring-2 focus:ring-black"
            />
            {state?.error?.email && (
              <p className="text-red-500 text-sm mt-1">{state.error.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block font-metal text-sm tracking-wider mb-2">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-2 border border-black bg-transparent font-metal tracking-wider
                focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {state?.error?.message && (
              <p className="text-red-500 text-sm mt-1">{state.error.message[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 border border-black font-metal tracking-[0.3em] text-sm
              hover:bg-black hover:text-white transition-all duration-300 ease-in-out
              relative overflow-hidden group"
          >
            <span className="relative z-10">SEND MESSAGE</span>
            <span className="absolute inset-0 bg-black transform origin-left scale-x-0 
              group-hover:scale-x-100 transition-transform duration-300 ease-out"/>
          </button>

          {state?.success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-metal tracking-wider text-green-600"
            >
              Message sent successfully!
            </motion.p>
          )}
        </form>
      </motion.div>

      {/* Social Links */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-6 mt-12"
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
        className="text-[10px] text-center space-y-1 tracking-wider text-neutral-500 font-metal mt-8"
      >
        <p>© 2024 SYNC</p>
        <p>DESIGNED BY SYNC CREATIVE</p>
      </motion.div>
    </div>
  )
}
