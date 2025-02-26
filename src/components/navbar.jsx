'use client'

import Link from 'next/link'
import { FaUser, FaShoppingBag } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname();

  // Don't render the navbar on the homepage
  if (pathname === '/' || pathname.startsWith('/dashboard')) {
    return null;
  }

  const menuItems = [
    { name: "SHOP", href: "/shop" },
    { name: "NEW ARRIVAL", href: "/new-arrivals" },
    { name: "CONTACT", href: "/contact" },
    { name: "ABOUT", href: "/about" },
    { name: "PRE ORDER", href: "/pre-order" },
  ];

  return (
    <nav className="py-6 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          {/* Left side - empty for balance */}
        </div>

        <Link href="/" className="flex-1 text-center">
          <h1 className="text-5xl font-metal tracking-[0.15em]">SynC</h1>
        </Link>

        <div className="flex-1 flex justify-end gap-4">
          <Link href="/login" className="hover:opacity-70 transition-opacity">
            <FaUser size={20} />
          </Link>
          <Link href="/cart" className="hover:opacity-70 transition-opacity">
            <FaShoppingBag size={20} />
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-12 mt-8">
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
    </nav>
  );
}
