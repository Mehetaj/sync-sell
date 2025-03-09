'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, ShoppingBag, Users, Settings, BarChart3, Package, LogOut, ShoppingBasketIcon } from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingBag, label: 'Products', href: '/dashboard/products' },
  { icon: Users, label: 'Users', href: '/dashboard/users' },
  { icon: Package, label: 'Orders', href: '/dashboard/orders' },
  { icon: ShoppingBasketIcon, label: 'New Arrivals', href: '/dashboard/new-arrival' },
  { icon: BarChart3, label: 'Catalog', href: '/dashboard/catalog' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-black text-white p-4 flex flex-col">
      {/* Logo */}
      <div className="py-6 px-4">
        <h1 className="font-metal text-2xl tracking-wider text-center">SYNC</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-metal tracking-wider relative
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                transition-colors group`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-3 px-4 py-3 text-sm font-metal tracking-wider text-gray-400 hover:text-white transition-colors mt-auto">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  )
}

