'use client';

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { ProductTable } from "../../../components/table/product-table";
import { Pagination } from "../../../components/pagination";
import { deleteProduct, fetchProducts } from "../../store/features/product-slice";

const Page = () => {
    const dispatch = useDispatch();
    const { items: pdss, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    const handleDelete = async (id) => {
        try {
            await dispatch(deleteProduct(id));
            toast.success("Product deleted successfully");
        } catch (err) {
            console.error("Error deleting product:", err);
            toast.error("Failed to delete the product.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="space-y-6 font-metal">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-metal text-2xl tracking-wider">Products</h1>
                    <p className="text-gray-600 mt-1">Manage your Products</p>
                </div>
                <Link href="/dashboard/products/add">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-black text-white px-4 py-2 font-metal tracking-wider flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Product
                    </motion.button>
                </Link>
            </div>

            <ProductTable products={pdss} onDelete={handleDelete} />

            <Pagination
                currentPage={1}
                totalPages={Math.ceil(pdss?.length / 10)} 
                onPageChange={(page) => console.log("Change page to:", page)}
            />
        </div>
    );
};

export default Page;
