"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivals } from "../store/features/new-arrival-slice";
import NewArrivalCard from "../../components/new-arrival-card";

export default function NewArrivals() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state) => state.newArrival
  );

  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <p className="text-center mt-16">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-16 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-metal text-center mb-8 tracking-wider">
            New Arrivals
          </h2>
          <p className="font-metal text-gray-600 tracking-wide">
            Latest additions to our collection
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {products.slice(0, visibleItems).map((product, index) => (
            <motion.div key={product._id || index} variants={item}>
              <NewArrivalCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* "Load More" Button */}
        {products.length > visibleItems && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={loadMore}
              className="font-metal bg-black text-white px-8 py-3 tracking-wider hover:bg-gray-800 transition-colors"
            >
              LOAD MORE
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
