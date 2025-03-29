"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "../../components/AuthSessionProvider";

const OrderPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/order?email=${user?.email}`); // Replace with your actual API endpoint
        console.log(response);
        setOrderData(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!orderData) {
    return <div className="text-center text-gray-500">No orders found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <div className="mb-4 p-4 border rounded-lg bg-gray-100">
        <p>
          <strong>Name:</strong> {orderData?.name}
        </p>
        <p>
          <strong>Email:</strong> {orderData?.email}
        </p>
        <p>
          <strong>Address:</strong> {orderData?.address}, {orderData?.city} -{" "}
          {orderData?.zip}
        </p>
        <p>
          <strong>Payment Method:</strong> {orderData?.paymentMethod}
        </p>
        <p>
          <strong>Status:</strong> {orderData?.status}
        </p>
        <p>
          <strong>Total:</strong> ${orderData?.total}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-2">Items Ordered</h2>
      <div className="space-y-4">
        {orderData?.items?.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="object-cover rounded"
            />
            <div>
              <p>
                <strong>{item.name}</strong>
              </p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
