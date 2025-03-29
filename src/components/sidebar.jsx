"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  Package,
  LogOut,
  ShoppingBasketIcon,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "./AuthSessionProvider";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingBag, label: "Products", href: "/dashboard/products" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: Package, label: "Orders", href: "/dashboard/orders" },
  {
    icon: ShoppingBasketIcon,
    label: "New Arrivals",
    href: "/dashboard/new-arrival",
  },
  { icon: BarChart3, label: "Catalog", href: "/dashboard/catalog" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  // Sidebar content component to avoid duplication
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <Link href="/" className="py-6 px-4">
        <h1 className="font-metal text-2xl tracking-wider text-center">SYNC</h1>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-metal tracking-wider relative
                ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
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
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-sm font-metal tracking-wider text-gray-400 hover:text-white transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-black text-white p-4 flex flex-col hidden md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Hamburger Menu Button - Fixed in top right corner */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black text-white md:hidden"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar Overlay - Only visible when menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar - Slides in from right */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-black text-white p-4 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <div className="pt-12">
          <SidebarContent />
        </div>
      </div>

      {/* Content Padding - To push content away from sidebar on desktop */}
      <div className="md:pl-64">{/* Your page content goes here */}</div>
    </>
  );
}
