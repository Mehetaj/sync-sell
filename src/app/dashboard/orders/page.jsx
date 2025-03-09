"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import {
  deleteOrder,
  editOrder,
  fetchOrders,
} from "../../store/features/order-slice";
import { Pagination } from "../../../components/pagination";
import { OrderTable } from "../../../components/table/order-table";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrder(id));
      // Toast is already handled in the slice
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Failed to delete the order.");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await dispatch(editOrder({ id, status: newStatus }));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update the order status.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="space-y-6 font-metal">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-metal text-2xl tracking-wider">Orders</h1>
          <p className="text-gray-600 mt-1">Manage your Orders</p>
        </div>
        <Link href="/dashboard/orders/add">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white px-4 py-2 font-metal tracking-wider flex items-center gap-2"
          >
            <Plus size={20} />
            Add Order
          </motion.button>
        </Link>
      </div>

      <OrderTable
        orders={orders}
        onDelete={handleDelete}
        onUpdateStatus={handleUpdateStatus}
      />

      {orders && orders.length > 0 && (
        <Pagination
          currentPage={1}
          totalPages={Math.ceil(orders.length / 10)}
          onPageChange={(page) => console.log("Change page to:", page)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
