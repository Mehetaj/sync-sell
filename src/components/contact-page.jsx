"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaTwitter, FaDiscord } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { addContact } from "../app/store/features/contact-slice";
import { useDispatch, useSelector } from "react-redux";

export default function ContactPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addContact(formData)).unwrap();
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      toast.error(`Failed to send message! ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <h2 className="text-3xl font-metal text-center mb-8 tracking-wider">Contact Us</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-metal text-sm tracking-wider mb-2">NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black bg-transparent font-metal tracking-wider focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-metal text-sm tracking-wider mb-2">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black bg-transparent font-metal tracking-wider focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-metal text-sm tracking-wider mb-2">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black bg-transparent font-metal tracking-wider focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 border border-black font-metal tracking-[0.3em] text-sm hover:bg-black hover:text-white transition-all duration-300 ease-in-out relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? "SENDING..." : "SEND MESSAGE"}</span>
          </button>
        </form>
      </motion.div>

      {/* Social Links */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center justify-center gap-6 mt-12">
        <Link href="#" className="text-black hover:opacity-60 transition-opacity duration-200 transform hover:scale-110 transition-transform duration-200">
          <FaInstagram size={22} />
        </Link>
        <Link href="#" className="text-black hover:opacity-60 transition-opacity duration-200 transform hover:scale-110 transition-transform duration-200">
          <FaYoutube size={22} />
        </Link>
        <Link href="#" className="text-black hover:opacity-60 transition-opacity duration-200 transform hover:scale-110 transition-transform duration-200">
          <FaTwitter size={22} />
        </Link>
        <Link href="#" className="text-black hover:opacity-60 transition-opacity duration-200 transform hover:scale-110 transition-transform duration-200">
          <FaDiscord size={22} />
        </Link>
      </motion.div>

      {/* Copyright */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-[10px] text-center space-y-1 tracking-wider text-neutral-500 font-metal mt-8">
        <p>© 2024 SYNC</p>
        <p>DESIGNED BY SYNC CREATIVE</p>
      </motion.div>
    </div>
  );
}
