'use client'

import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../components/AuthSessionProvider'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  
  const router = useRouter()
  const auth = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await auth?.signIn(formData.email, formData.password)
      toast.success('Logged in successfully!')
      router.push('/dashboard') // Redirect to dashboard or wherever you want
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Failed to log in. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="p-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-metal tracking-[0.2em] mb-4">LOGIN</h1>
            <div className="h-[2px] w-16 bg-black mx-auto"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block font-metal text-sm tracking-wider mb-2">
                EMAIL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-12 border border-black bg-transparent font-metal tracking-wider
                    focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="ENTER YOUR EMAIL"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-metal text-sm tracking-wider mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-12 border border-black bg-transparent font-metal tracking-wider
                    focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="ENTER YOUR PASSWORD"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 border-black focus:ring-black rounded-none"
                />
                <label htmlFor="rememberMe" className="font-metal text-sm tracking-wider">
                  REMEMBER ME
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="font-metal text-sm tracking-wider hover:opacity-70 transition-opacity"
              >
                FORGOT PASSWORD?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-4 py-3 bg-black text-white font-metal tracking-wider
                hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
              )}
              SIGN IN
            </button>

            <p className="text-center font-metal text-sm tracking-wider">
              DON&apos;T HAVE AN ACCOUNT?{' '}
              <Link
                href="/register"
                className="underline hover:opacity-70 transition-opacity"
              >
                SIGN UP
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
