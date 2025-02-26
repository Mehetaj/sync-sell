"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"



export function ImageGallery({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square"
          >
            <Image
              src={images[selectedImage]}
              alt={`${name} - View ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority={selectedImage === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-4 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-sm 
              ${selectedImage === index ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'}`}
          >
            <Image
              src={image}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

