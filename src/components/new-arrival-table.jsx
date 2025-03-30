'use client';

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { createSlug } from "../lib/products";




const NewArrivalTable = ({ arrivals, onDelete }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="font-metal tracking-wider text-sm">
            <th className="px-6 py-4 text-left">Product</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Price</th>
            <th className="px-6 py-4 text-left">Launch Date</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {arrivals.map((arrival) => (
            <motion.tr
              key={arrival._id} // Ensure _id is unique
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={arrival.image}
                      alt={arrival.name}
                      width={48} // Fixed width for responsive image
                      height={48} // Fixed height for responsive image
                      className="object-cover rounded"
                    />
                  </div>
                  <span className="font-semibold tracking-wider">{arrival.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{arrival.category}</td>
              <td className="px-6 py-4 text-sm">৳{arrival.price}</td>
              <td className="px-6 py-4 text-sm">{arrival.launchDate}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/dashboard/new-arrival/edit/${createSlug(arrival.name)}`}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => onDelete(arrival._id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewArrivalTable;
