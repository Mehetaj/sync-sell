"use client";

import { useContext, useState } from "react";
import { FaShippingFast, FaCheckCircle, FaRedo } from "react-icons/fa";
import { ImageGallery } from "../../../components/image-gallery";
import { SizeSelector } from "../../../components/size-selector";
import { QuantityPicker } from "../../../components/quantity-picker";
import { addToCart } from "../../../app/store/features/cart-slice";
import { useAppDispatch } from "../../../app/store/hooks";
import { AuthContext } from "../../../components/AuthSessionProvider";

export default function ProductDetails({ product }) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      product_id: product._id,
      name: product.name,
      price: product.price.toString(),
      image: product.image || "",
      size: selectedSize || "",
      quantity: quantity.toString(),
      email: user?.email,
    };

    // console.log(cartItem);
    dispatch(addToCart(cartItem));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image Gallery */}
          <div>
            <ImageGallery images={product.images || []} name={product.name} />
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="font-bold text-4xl tracking-wide">
                {product.name}
              </h1>
              <p className="font-semibold text-2xl text-gray-800">
                ${product.price}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes || []}
              onChange={(size) => setSelectedSize(size)}
            />

            {/* Quantity Picker */}
            <QuantityPicker
              onChange={(newQuantity) => setQuantity(newQuantity)}
            />

            {/* Add to Cart Button */}
            <button
              className="w-full bg-black text-white py-4 font-semibold tracking-wider hover:bg-gray-900 transition-all"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t">
              <div className="flex items-center gap-2">
                <FaShippingFast size={20} />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle size={20} />
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRedo size={20} />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
