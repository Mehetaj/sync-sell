"use client"

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EyeLoader from './eye-loading'

export default function PageTransition({
  children
}) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  // Update children when pathname changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, 500) // 3 second delay

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
        >
          <EyeLoader />
          <p className="mt-8 font-metal tracking-[0.3em] text-sm">LOADING</p>
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {displayChildren}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

