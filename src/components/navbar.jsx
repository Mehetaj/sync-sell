"use client"

import Link from "next/link"
import { FaUser, FaShoppingBag, FaTshirt } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./AuthSessionProvider"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const { user, logOut } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    const handleClickOutside = (e) => {
      const target = e.target 
      if (isMenuOpen && !target.closest("[data-menu-container]")) {
        setIsMenuOpen(false)
      }
    }

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.error("Logout Error:", error)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Don't render the navbar on specific pages
  if (pathname === "/" || pathname.startsWith("/dashboard")) {
    return null
  }

  const menuItems = [
    { name: "SHOP", href: "/shop" },
    { name: "NEW ARRIVAL", href: "/new-arrivals" },
    { name: "CONTACT", href: "/contact" },
    { name: "ABOUT", href: "/about" },
  ]

  return (
    <nav className="py-4 px-4 md:py-6 md:px-8 relative z-50 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Hamburger menu button - only visible on mobile */}
        <div className="flex-1 flex items-center">
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
            data-menu-container
          >
            {isMenuOpen ? <X size={24} className="text-black" /> : <Menu size={24} className="text-black" />}
          </button>
        </div>

        {/* Logo - centered on all screen sizes */}
        <Link href="/" className="flex-1 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-metal tracking-[0.15em]">Blacked Out</h1>
        </Link>

        {/* User/Cart icons - right aligned */}
        <div className="flex-1 flex justify-end gap-4 items-center">
          {user ? (
            <>
              <Link href="/order" className="hidden md:flex hover:opacity-70 transition-opacity duration-300 relative group">
                <FaTshirt size={20} />
                <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  My Orders
                </span>
              </Link>
              <Link href="/cart" className="hidden md:flex hover:opacity-70 transition-opacity duration-300 relative group">
                <FaShoppingBag size={20} />
                <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Cart
                </span>
              </Link>
              <button onClick={handleLogout} className="text-sm hidden md:flex hover:opacity-70 transition-opacity duration-300">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hidden md:flex hover:opacity-70 transition-opacity duration-300 relative group">
              <FaUser size={20} />
              <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop menu - hidden on mobile */}
      <div className="hidden md:flex justify-center gap-8 lg:gap-12 mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm tracking-[0.3em] font-metal hover:opacity-70 transition-opacity duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile menu - with animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            data-menu-container
          >
            {/* Explicit close button at the top right */}
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full bg-black text-white"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-lg tracking-[0.3em] font-metal hover:opacity-70 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* User/Cart links in mobile menu */}
              {user ? (
                <>
                  <Link href="/order" className="hover:opacity-70 transition-opacity duration-300 relative group">
                    <FaTshirt size={20} />
                    <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      My Orders
                    </span>
                  </Link>
                  <Link href="/cart" className="hover:opacity-70 transition-opacity duration-300 relative group">
                    <FaShoppingBag size={20} />
                    <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Cart
                    </span>
                  </Link>
                  <button onClick={handleLogout} className="text-sm hover:opacity-70 transition-opacity duration-300">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="hover:opacity-70 transition-opacity duration-300 relative group">
                  <FaUser size={20} />
                  <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Login
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
