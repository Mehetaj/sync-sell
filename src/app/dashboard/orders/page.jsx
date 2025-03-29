"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { deleteOrder, fetchOrders } from "../../store/features/order-slice";
import { Pagination } from "../../../components/pagination";
import { OrderTable } from "../../../components/table/order-table";
import axios from "axios";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrder(id)).unwrap();
      toast.success("Order deleted successfully");
      dispatch(fetchOrders()); // Refetch after delete
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Failed to delete the order.");
    }
  };

  const handleUpdateStatus = async (_id, newStatus) => {
    try {
      const response = await axios.patch(`/api/order/${_id}`, { status: newStatus });

      if (response.status === 200) {
        toast.success(`Order status updated to ${newStatus}`);
        dispatch(fetchOrders()); // Refetch after update
      } else {
        throw new Error("Unexpected response from server");
      }
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
      </div>

      <OrderTable orders={orders} onDelete={handleDelete} onUpdateStatus={handleUpdateStatus} />

      {orders && orders.length > 0 && (
        <Pagination
          currentPage={1} // Ideally, this should be dynamic
          totalPages={Math.max(1, Math.ceil(orders.length / 10))}
          onPageChange={(page) => console.log("Change page to:", page)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
