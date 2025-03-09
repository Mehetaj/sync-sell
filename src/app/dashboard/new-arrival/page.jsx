"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pagination } from "../../../components/pagination";
import NewArrivalTable from "../../../components/new-arrival-table";
import {
  deleteNewArrival,
  fetchNewArrivals,
} from "../../../app/store/features/new-arrival-slice";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

const NewArrivalPage = () => {
  const dispatch = useDispatch();
  const {
    items: newArrivals,
    loading,
    error,
  } = useSelector((state) => state.newArrival);

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteNewArrival(id));

      toast.success("New arrival deleted successfully");
    } catch (err) {
      console.error("Error deleting new arrival:", err);
      toast.error("Failed to delete the new arrival.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6 font-metal">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-metal text-2xl tracking-wider">New Arrivals</h1>
          <p className="text-gray-600 mt-1">Manage your products</p>
        </div>
        <Link href="/dashboard/new-arrival/add">
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

      {/* New Arrivals Table */}
      <NewArrivalTable arrivals={newArrivals} onDelete={handleDelete} />

      {/* Pagination */}
      <Pagination
        currentPage={1}
        totalPages={Math.ceil(newArrivals.length / 10)} // Adjust based on actual data
        onPageChange={(page) => console.log("Change page to:", page)}
      />
    </div>
  );
};

export default NewArrivalPage;
