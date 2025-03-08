"use client"

import Link from "next/link"
import { FaUser, FaShoppingBag } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { useContext, useState } from "react"
import { AuthContext } from "./AuthSessionProvider"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const { user, logOut } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    { name: "PRE ORDER", href: "/pre-order" },
  ]

  return (
    <nav className="py-4 px-4 md:py-6 md:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Hamburger menu button - only visible on mobile */}
        <div className="flex-1 flex items-center">
          <button onClick={toggleMenu} className="md:hidden focus:outline-none" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo - centered on all screen sizes */}
        <Link href="/" className="flex-1 text-center">
          <h1 className="text-4xl md:text-5xl font-metal tracking-[0.15em]">SynC</h1>
        </Link>

        {/* User/Cart icons - right aligned */}
        <div className="flex-1 flex justify-end gap-4">
          {user ? (
            <>
              <Link href="/cart" className="hover:opacity-70 transition-opacity">
                <FaShoppingBag size={20} />
              </Link>
              <button onClick={handleLogout} className="text-sm hover:opacity-70 transition-opacity">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:opacity-70 transition-opacity">
              <FaUser size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Desktop menu - hidden on mobile */}
      <div className="hidden md:flex justify-center gap-12 mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm tracking-[0.3em] font-metal hover:opacity-70 transition-opacity"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile menu - only visible when toggled */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-6">
          <div className="flex flex-col items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg tracking-[0.3em] font-metal hover:opacity-70 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

