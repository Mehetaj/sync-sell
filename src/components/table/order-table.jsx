"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";

export function OrderTable({ orders, onDelete, onUpdateStatus }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const dropdownRefs = useRef({});

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md">
        <p>No orders found</p>
      </div>
    );
  }

  const toggleRow = (orderId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const toggleStatusDropdown = (e, orderId) => {
    e.stopPropagation();
    setOpenStatusDropdown(openStatusDropdown === orderId ? null : orderId);
  };

  // Format date function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openStatusDropdown &&
        dropdownRefs.current[openStatusDropdown] &&
        !dropdownRefs.current[openStatusDropdown].contains(event.target)
      ) {
        setOpenStatusDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openStatusDropdown]);

  // Get status color classes
  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Processing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "Shipped":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "Delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  // Get status dot color
  const getStatusDotColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Processing":
        return "bg-blue-500";
      case "Shipped":
        return "bg-purple-500";
      case "Delivered":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => toggleRow(order._id)}
                >
                  <td className="px-6 py-4 text-sm dark:text-gray-300">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-gray-300">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-gray-300">
                    $
                    {typeof order.total === "number"
                      ? order.total.toFixed(2)
                      : "0.00"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusClasses(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3 items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRow(order._id);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        {expandedRows[order._id] ? (
                          <ChevronUp
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        ) : (
                          <ChevronDown
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        )}
                      </button>

                      {/* Custom Status Dropdown */}
                      <div
                        className="relative"
                        ref={(el) => (dropdownRefs.current[order._id] = el)}
                      >
                        <button
                          onClick={(e) => toggleStatusDropdown(e, order._id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <span className="sr-o">Change status</span>
                          <span
                            className={`w-4 h-4 rounded-full ${getStatusDotColor(
                              order.status
                            )}`}
                          ></span>
                        </button>

                        {openStatusDropdown === order._id && (
                          <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateStatus(order._id, "Pending");
                                  setOpenStatusDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Pending
                                {order.status === "Pending" && (
                                  <Check size={16} className="ml-auto" />
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateStatus(order._id, "Processing");
                                  setOpenStatusDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Processing
                                {order.status === "Processing" && (
                                  <Check size={16} className="ml-auto" />
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateStatus(order._id, "Shipped");
                                  setOpenStatusDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Shipped
                                {order.status === "Shipped" && (
                                  <Check size={16} className="ml-auto" />
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateStatus(order._id, "Delivered");
                                  setOpenStatusDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Delivered
                                {order.status === "Delivered" && (
                                  <Check size={16} className="ml-auto" />
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateStatus(order._id, "Cancelled");
                                  setOpenStatusDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Cancelled
                                {order.status === "Cancelled" && (
                                  <Check size={16} className="ml-auto" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(order._id);
                        }}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors text-red-600 dark:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
                <AnimatePresence>
                  {expandedRows[order._id] && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td
                        colSpan={5}
                        className="px-6 py-4 bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 dark:text-white">
                              <MapPin size={16} /> Shipping Details
                            </h3>
                            <div className="text-sm space-y-1 dark:text-gray-300">
                              <p>{order.name}</p>
                              <p>{order.address}</p>
                              <p>
                                {order.city}, {order.zip}
                              </p>
                            </div>

                            <h3 className="text-sm font-semibold mt-4 mb-2 flex items-center gap-2 dark:text-white">
                              <CreditCard size={16} /> Payment Information
                            </h3>
                            <div className="text-sm space-y-1 dark:text-gray-300">
                              <p>
                                Method:{" "}
                                {order.paymentMethod.charAt(0).toUpperCase() +
                                  order.paymentMethod.slice(1)}
                              </p>
                              <p>
                                Total: $
                                {typeof order.total === "number"
                                  ? order.total.toFixed(2)
                                  : "0.00"}
                              </p>
                            </div>

                            <h3 className="text-sm font-semibold mt-4 mb-2 flex items-center gap-2 dark:text-white">
                              <Calendar size={16} /> Order Dates
                            </h3>
                            <div className="text-sm space-y-1 dark:text-gray-300">
                              <p>
                                Created:{" "}
                                {order.createdAt
                                  ? formatDate(order.createdAt)
                                  : "N/A"}
                              </p>
                              <p>
                                Updated:{" "}
                                {order.updatedAt
                                  ? formatDate(order.updatedAt)
                                  : "N/A"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 dark:text-white">
                              <Package size={16} /> Order Items (
                              {order.items?.length || 0})
                            </h3>
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                                  >
                                    <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                      {item.image ? (
                                        <Image
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.name}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                          <Package size={24} />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium text-sm dark:text-white">
                                        {item.name}
                                      </h4>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-1">
                                        <p>Quantity: {item.quantity}</p>
                                        {item.size && <p>Size: {item.size}</p>}
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  No items in this order
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="divide-y dark:divide-gray-700">
          {orders.map((order) => (
            <div key={order._id} className="p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleRow(order._id)}
              >
                <div>
                  <h3 className="font-medium dark:text-white">{order.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusClasses(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      $
                      {typeof order.total === "number"
                        ? order.total.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(order._id);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    {expandedRows[order._id] ? (
                      <ChevronUp
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    )}
                  </button>

                  {/* Custom Status Dropdown - Mobile */}
                  <div
                    className="relative"
                    ref={(el) =>
                      (dropdownRefs.current[`mobile-${order._id}`] = el)
                    }
                  >
                    <button
                      onClick={(e) =>
                        toggleStatusDropdown(e, `mobile-${order._id}`)
                      }
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <span className="sr-only">Change status</span>
                      <span
                        className={`w-4 h-4 rounded-full ${getStatusDotColor(
                          order.status
                        )}`}
                      ></span>
                    </button>

                    {openStatusDropdown === `mobile-${order._id}` && (
                      <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(order._id, "Pending");
                              setOpenStatusDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            Pending
                            {order.status === "Pending" && (
                              <Check size={16} className="ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(order._id, "Processing");
                              setOpenStatusDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Processing
                            {order.status === "Processing" && (
                              <Check size={16} className="ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(order._id, "Shipped");
                              setOpenStatusDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Shipped
                            {order.status === "Shipped" && (
                              <Check size={16} className="ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(order._id, "Delivered");
                              setOpenStatusDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Delivered
                            {order.status === "Delivered" && (
                              <Check size={16} className="ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(order._id, "Cancelled");
                              setOpenStatusDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Cancelled
                            {order.status === "Cancelled" && (
                              <Check size={16} className="ml-auto" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(order._id);
                    }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedRows[order._id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t dark:border-gray-700"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 dark:text-white">
                          <MapPin size={16} /> Shipping Details
                        </h3>
                        <div className="text-sm space-y-1 dark:text-gray-300">
                          <p>{order.name}</p>
                          <p>{order.address}</p>
                          <p>
                            {order.city}, {order.zip}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 dark:text-white">
                          <CreditCard size={16} /> Payment Information
                        </h3>
                        <div className="text-sm space-y-1 dark:text-gray-300">
                          <p>
                            Method:{" "}
                            {order.paymentMethod.charAt(0).toUpperCase() +
                              order.paymentMethod.slice(1)}
                          </p>
                          <p>
                            Total: $
                            {typeof order.total === "number"
                              ? order.total.toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 dark:text-white">
                          <Calendar size={16} /> Order Dates
                        </h3>
                        <div className="text-sm space-y-1 dark:text-gray-300">
                          <p>
                            Created:{" "}
                            {order.createdAt
                              ? formatDate(order.createdAt)
                              : "N/A"}
                          </p>
                          <p>
                            Updated:{" "}
                            {order.updatedAt
                              ? formatDate(order.updatedAt)
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 dark:text-white">
                          <Package size={16} /> Order Items (
                          {order.items?.length || 0})
                        </h3>
                        <div className="space-y-3">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                              >
                                <div className="w-14 h-14 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                  {item.image ? (
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      <Package size={20} />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm dark:text-white">
                                    {item.name}
                                  </h4>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-0.5">
                                    <p>Quantity: {item.quantity}</p>
                                    {item.size && <p>Size: {item.size}</p>}
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No items in this order
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
