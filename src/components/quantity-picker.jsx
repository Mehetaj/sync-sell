"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";


export function QuantityPicker({ initialQuantity = 1, onChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="font-metal tracking-wider">QUANTITY</div>
      <div className="flex items-center border border-black">
        <button
          onClick={decrement}
          className="p-2 hover:bg-black hover:text-white transition-colors"
          disabled={quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-metal">{quantity}</span>
        <button
          onClick={increment}
          className="p-2 hover:bg-black hover:text-white transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
