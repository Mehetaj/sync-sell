"use client"
import { useContext, useState, useEffect } from "react";
import { FaShippingFast, FaCheckCircle, FaRedo } from "react-icons/fa";
import { ImageGallery } from "../../../components/image-gallery";
import { SizeSelector } from "../../../components/size-selector";
import { QuantityPicker } from "../../../components/quantity-picker";
import { AuthContext } from "../../../components/AuthSessionProvider";
import { toast } from "react-toastify";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export default function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const [mdxSource, setMdxSource] = useState(null);

  useEffect(() => {
    const compileMdx = async () => {
      if (product.description) {
        try {
          const mdxSource = await serialize(product.description);
          setMdxSource(mdxSource);
        } catch (error) {
          console.error("Error compiling MDX:", error);
        }
      } else {
        setMdxSource(null);
      }
    };

    compileMdx();
  }, [product.description]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
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

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item) =>
        item.product_id === cartItem.product_id && item.size === cartItem.size
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists
      const newQuantity =
        Number.parseInt(existingCart[existingItemIndex].quantity) +
        Number.parseInt(cartItem.quantity);
      existingCart[existingItemIndex].quantity = newQuantity.toString();
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("Item added to cart!");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image Gallery */}
          <div>
            <ImageGallery
              images={[product.image, ...(product.images || [])]} // Display main image followed by additional images
              name={product.name}
            />
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

        {/* Product Description Below */}
        <div className="mt-12 text-gray-600">
          <h2 className="font-bold text-2xl">Product Description</h2>
          <div className="mt-4">
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={mdxComponents} />
            ) : (
              <p className="text-gray-500 italic">No content to preview</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// MDX components for styling the preview
const mdxComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
  p: ({ children }) => <p className="mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <div className="my-4">
      <img
        src={src || "/placeholder.svg"}
        alt={alt || "Product image"}
        className="rounded-md max-w-full h-auto"
      />
    </div>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4 font-mono text-sm">
      {children}
    </pre>
  ),
};
