"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { createSlug } from "../lib/products";


export default function NewArrivalCard({ product }) {
    const { name, price, image, launchDate, category } = product;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="group relative"
        >
            <Link href={`/new-arrivals/${createSlug(name)}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {image && (
                        <Image
                            src={image}
                            alt={name || "Product image"}
                            fill
                            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="mt-4 text-center space-y-2">
                {name && (
                    <h3 className="font-bold tracking-wider text-lg">
                        {name}
                    </h3>
                )}
                {price && (
                    <p className="tracking-wider text-sm">
                        ${price}
                    </p>
                )}
                {launchDate && (
                    <p className="text-xs text-gray-600 tracking-wider">
                        Launched: {new Date(launchDate).toLocaleDateString()}
                    </p>
                )}
                {category && (
                    <p className="text-xs text-gray-600 tracking-wider uppercase">
                        {category}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
