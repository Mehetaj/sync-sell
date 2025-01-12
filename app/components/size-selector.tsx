"use client"

import { useState } from "react"

interface SizeSelectorProps {
  sizes: string[]
  onChange: (size: string) => void
}

export function SizeSelector({ sizes, onChange }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")

  const handleSelect = (size: string) => {
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

