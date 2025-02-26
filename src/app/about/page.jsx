"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaDiscord, 
  FaSkull 
} from "react-icons/fa"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto text-center space-y-8 mb-16"
      >
        <div className="relative">
          <FaSkull className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl opacity-20" />
          <h2 className="font-metal text-3xl mb-6 tracking-wider">About Us</h2>
          <div className="space-y-4 text-lg tracking-wide">
            <p className="leading-relaxed">
              Born from the depths of darkness and creativity, SynC emerged as a 
              revolutionary force in alternative fashion. Our journey began in the 
              underground scene, where music meets style.
            </p>
            <p className="leading-relaxed">
              Each piece in our collection tells a story of rebellion, 
              self-expression, and uncompromising quality. We craft our garments 
              with the same intensity and passion that fuels the metal scene.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12"
        >
          {[
            { number: "10K+", label: "Satisfied Customers" },
            { number: "666", label: "Products" },
            { number: "13", label: "Countries" },
            { number: "100%", label: "Authentic" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-metal text-2xl">{stat.number}</div>
              <div className="text-sm tracking-wider mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Navigation Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-[280px] mb-12"
      >
        <Link 
          href="/"
          className="block w-full border border-black py-3 text-center font-metal text-sm 
            tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 
            ease-in-out relative overflow-hidden group"
        >
          <span className="relative z-10">RETURN HOME</span>
          <span className="absolute inset-0 bg-black transform origin-left scale-x-0 
            group-hover:scale-x-100 transition-transform duration-300 ease-out"/>
        </Link>
      </motion.div>

      {/* Social Links */}
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { Icon: FaInstagram, link: "#" },
            { Icon: FaYoutube, link: "#" },
            { Icon: FaTwitter, link: "#" },
            { Icon: FaDiscord, link: "#" }
          ].map((social, index) => (
            <Link 
              key={index} 
              href={social.link}
              className="text-black hover:opacity-60 transform hover:scale-110 
                transition-all duration-200"
            >
              <social.Icon size={20} />
            </Link>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[10px] text-center space-y-1 tracking-wider text-neutral-500 font-metal"
        >
          <p>© 2024 SYNC</p>
          <p>DESIGNED BY SYNC CREATIVE</p>
        </motion.div>
      </div>
    </div>
  )
}
