"use client"
import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { AuthContext } from "../../components/AuthSessionProvider"
import { useDispatch, useSelector } from "react-redux"
import { addOrder } from "../store/features/order-slice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function CheckoutPage() {
  const { user } = useContext(AuthContext)
  const userEmail = user?.email || "guest"
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.order)
  const router = useRouter()

  useEffect(() => {
    // Retrieve cart items from localStorage
    const cartData = localStorage.getItem("cart")
    if (cartData) {
      const allItems = JSON.parse(cartData)
      // Filter items for the logged-in user
      const userCart = allItems.filter((item) => item.email === userEmail)
      setItems(userCart)
    }
  }, [userEmail])

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: userEmail,
    address: "",
    city: "",
    zip: "",
    paymentMethod: "credit-card",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
    const shipping = 10.0
    const total = subtotal + shipping

    // Prepare the order data
    const orderData = {
      ...formData,
      items,
      subtotal,
      shipping,
      total,
      orderDate: new Date().toISOString(),
    }

    try {
      // Dispatch the order data to Redux store
      dispatch(addOrder(orderData))

      // Remove only the current user's items from the cart
      const cartData = localStorage.getItem("cart")
      if (cartData) {
        const allItems = JSON.parse(cartData)
        const otherUsersItems = allItems.filter((item) => item.email !== userEmail)
        localStorage.setItem("cart", JSON.stringify(otherUsersItems))
      }

      toast.success("Order placed successfully!")
      router.push("/order-confirmation")
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
      console.error("Order placement error:", error)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
  const shipping = 10.0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="mb-8">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-black text-white font-metal tracking-wider hover:bg-opacity-80 transition-all duration-200"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 border p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <h2 className="text-xl font-semibold mt-6">Payment Method</h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-2 mt-4">
                {items.map((item) => (
                  <div key={item._id || item.product_id} className="flex justify-between text-sm">
                    <span>
                      {item.name} ({item.size}) x{item.quantity}
                    </span>
                    <span>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="h-[1px] bg-gray-200 my-4"></div>
              <div className="flex justify-between mt-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-2">Processing...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-2">{error}</div>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-semibold tracking-wider hover:bg-gray-900 transition-all"
              >
                Place Order
              </button>
            )}
          </form>
        )}
        <div className="text-center mt-4">
          <Link
            href="/cart"
            className="inline-block px-6 py-2 border border-black text-black font-semibold tracking-wider hover:bg-gray-100 transition-all"
          >
            Back to Cart
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

