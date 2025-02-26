'use client';

import Image from "next/image";
import { Edit, Trash2 } from 'lucide-react';
import Link from "next/link";
import { motion } from "framer-motion";



export function ProductTable({ products, onDelete }) {
    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr className="font-metal tracking-wider text-sm">
                        <th className="px-6 py-4 text-left">Product</th>
                        <th className="px-6 py-4 text-left">Category</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Sizes</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {products?.map((product) => (
                        <motion.tr
                            key={product._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hover:bg-gray-50"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 relative">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <span className="font-metal tracking-wider">{product.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm">{product.category || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm">৳{product.price}</td>
                            <td className="px-6 py-4 text-sm">
                                {product.sizes?.length ? product.sizes.join(', ') : 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={`/dashboard/products/edit/${product._id}`}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(product._id)}
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
}
