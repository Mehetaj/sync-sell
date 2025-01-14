'use client'

import { motion } from 'framer-motion'

export default function Marquee() {
  const text = "WELCOME TO SYNC PREMIUM STORE - DESIGNED BY SYNC CREATIVE - "
  const repeatedText = text.repeat(4)

  return (
    <div className="bg-black text-white overflow-hidden py-1 font-metal">
      <motion.div
        animate={{
          x: [0, -50 * text.length],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap text-xs tracking-wider"
      >
        {repeatedText}
      </motion.div>
    </div>
  )
}
