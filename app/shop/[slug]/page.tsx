"use client"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { ImageGallery } from '@/app/components/image-gallery';
import { QuantityPicker } from '@/app/components/quantity-picker';
import { SizeSelector } from '@/app/components/size-selector';
import { getProductBySlug } from '@/lib/products';
import { FaShippingFast, FaCheckCircle, FaRedo } from 'react-icons/fa';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Unwrap the params using React.use()
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    // Directly using params.slug
    getProductBySlug(params.slug).then(setProduct);
  }, [params.slug]);

  if (!product) {
    return <p className="text-center py-12 text-xl">Loading product...</p>;
  }

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
              <h1 className="font-bold text-4xl tracking-wide">{product.name}</h1>
              <p className="font-semibold text-2xl text-gray-800">{product.price}</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selector */}
            <SizeSelector 
              sizes={product.sizes || []} 
              onChange={(size) => console.log("Selected size:", size)} 
            />

            {/* Quantity Picker */}
            <QuantityPicker 
              onChange={(quantity) => console.log("Selected quantity:", quantity)} 
            />

            {/* Add to Cart Button */}
            <button className="w-full bg-black text-white py-4 font-semibold tracking-wider hover:bg-gray-900 transition-all">
              ADD TO CART
            </button>

            {/* Product Details */}
            <div className="space-y-6 pt-8 border-t">
              <h2 className="font-semibold text-xl tracking-wide">PRODUCT DETAILS</h2>
              <ul className="space-y-2 list-disc pl-5 text-gray-700">
                {product.details?.map((detail: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

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
