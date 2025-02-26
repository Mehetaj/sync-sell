'use client';

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';



const CatalogTable = ({ catalogs, onDelete }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr className="text-sm font-medium text-gray-600">
            <th className="px-6 py-4 text-left">Item</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {catalogs.map((catalog) => (
            <motion.tr
              key={catalog._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={catalog.image}
                      alt={catalog.name}
                      width={48}
                      height={48}
                      className="object-cover rounded"
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{catalog.name}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/dashboard/catalog/edit/${catalog._id}`}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => onDelete(catalog._id)}
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

export default CatalogTable;
