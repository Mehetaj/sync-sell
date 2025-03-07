"use client";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiX, FiShoppingBag } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCartItem } from "../store/features/cart-slice";
import { QuantityPicker } from "../../components/quantity-picker";
import { AuthContext } from "../../components/AuthSessionProvider";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items: cartItems, error, status } = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const userEmail = user?.email; // Get user email

  const [items, setItems] = useState([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    } else {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      dispatch(fetchCart());
    } else {
      // Filter cart items based on user email
      const filteredItems = cartItems.filter((item) => item.email === userEmail);
      console.log(filteredItems);
      setItems(filteredItems);
    }
  }, [cartItems, userEmail, dispatch]);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const handleQuantityChange = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const shipping = 10.0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-metal tracking-[0.2em] mb-4">
            YOUR CART
          </h1>
          <div className="h-[2px] w-16 bg-black mx-auto"></div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <FiShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-metal tracking-wider mb-8">YOUR CART IS EMPTY</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-black text-white font-metal tracking-wider hover:bg-opacity-80 transition-all duration-200"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {items?.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-6 p-4 border border-black"
                >
                  <div className="w-[120px] h-[120px] flex-shrink-0 relative">
                    <Image
                      src={item?.image || "https://i.ibb.co.com/tTmTHww2/image.png"}
                      alt={item?.name || "cart item image"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-metal tracking-wider">
                        {item.name} ({item?.size})
                      </h3>
                      <button
                        onClick={() => {
                          dispatch(removeCartItem(item._id));
                          setItems(items.filter((i) => i._id !== item._id)); // Remove from local state
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(items.filter((i) => i._id !== item._id))
                          );
                        }}
                        className="p-1 hover:opacity-70 transition-opacity"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="font-metal tracking-wider mt-2">
                      ${Number(item.price)?.toFixed(2)}
                    </p>

                    <QuantityPicker
                      initialQuantity={Number(item?.quantity)}
                      onChange={(newQuantity) => handleQuantityChange(item._id, newQuantity)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="border border-black p-6 space-y-6">
                <h2 className="font-metal tracking-wider text-xl mb-6">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between font-metal tracking-wider">
                    <span>SUBTOTAL</span>
                    <span>${subtotal?.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-metal tracking-wider">
                    <span>SHIPPING</span>
                    <span>${shipping?.toFixed(2)}</span>
                  </div>

                  <div className="h-[1px] bg-black"></div>

                  <div className="flex justify-between font-metal tracking-wider text-lg">
                    <span>TOTAL</span>
                    <span>${total?.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => console.log("Proceeding to checkout with", items)}
                  className="btn-primary"
                >
                  <Link href="/checkout">CHECKOUT</Link>
                </button>

                <Link
                  href="/shop"
                  className="block text-center font-metal tracking-wider text-sm hover:opacity-70 transition-opacity"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
