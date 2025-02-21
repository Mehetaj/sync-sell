'use client';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pagination } from "@/components/pagination";
import { AppDispatch, RootState } from "@/app/store";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { deleteCatalog, fetchCatalogs } from "@/app/store/features/catalog-slice";
import CatalogTable from "@/components/table/catalog-table";

const CatalogPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: catalogItems, loading, error } = useSelector((state: RootState) => state.catalog);

    useEffect(() => {
        dispatch(fetchCatalogs());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteCatalog(id));
            toast.success("Catalog item deleted successfully");
        } catch (err) {
            console.error("Error deleting catalog item:", err);
            toast.error("Failed to delete the catalog item.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="space-y-6 font-metal">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-metal text-2xl tracking-wider">Catalog</h1>
                    <p className="text-gray-600 mt-1">Manage your catalog items</p>
                </div>
                <Link href="/dashboard/catalog/add">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-black text-white px-4 py-2 font-metal tracking-wider flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Item
                    </motion.button>
                </Link>
            </div>

            {/* Catalog Table */}
            <CatalogTable catalogs={catalogItems} onDelete={handleDelete} />

            {/* Pagination */}
            <Pagination
                currentPage={1}
                totalPages={Math.ceil(catalogItems.length / 10)} // Adjust based on actual data
                onPageChange={(page) => console.log("Change page to:", page)}
            />
        </div>
    );
};

export default CatalogPage;
