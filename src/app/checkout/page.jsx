"use client";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthContext } from "../../components/AuthSessionProvider";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../store/features/order-slice";

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    // Retrieve cart items from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter items for the logged-in user
    const userCart = cartData.filter((item) => item.email === userEmail);
    setItems(userCart);
  }, [userEmail]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      items,
      total: subtotal + shipping,
    };

    dispatch(addOrder(orderData));

    console.log(orderData);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10.0;

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border p-6 shadow-lg"
        >
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
              <span>${(subtotal + shipping).toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Place Order
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/cart" className="btn-primary">
            Back to Cart
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
