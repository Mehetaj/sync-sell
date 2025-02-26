"use client"

import { useState } from "react"


export function SizeSelector({ sizes, onChange }) {
  const [selectedSize, setSelectedSize] = useState("")

  const handleSelect = (size) => {
    setSelectedSize(size)
    onChange(size)
  }

  return (
    <div className="grid gap-2">
      <div className="font-metal tracking-wider">SELECT SIZE</div>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSelect(size)}
            className={`py-3 font-metal tracking-wider border ${
              selectedSize === size
                ? "bg-black text-white"
                : "border-black hover:bg-black hover:text-white"
            } transition-colors`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

