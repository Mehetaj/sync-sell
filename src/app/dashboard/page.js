"use client";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { StatsCard } from "../../components/stats-card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/features/product-slice";
import { fetchOrders } from "../store/features/order-slice";
import { fetchUsers } from "../store/features/user-slice";
import { fetchCatalogs } from "../store/features/catalog-slice";

function DashboardPage() {
  const dispatch = useDispatch();
  const [visibleOrders, setVisibleOrders] = useState(5); // Tracks how many orders to show

  const { items: products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);
  const { items: catalog } = useSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
    dispatch(fetchCatalogs());
  }, [dispatch]);

  // Load more orders
  const handleLoadMore = () => {
    setVisibleOrders((prev) => prev + 5); // Show 5 more orders on click
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        {/* Page Title */}
        <div className="border-b pb-4">
          <h1 className="font-metal text-xl sm:text-2xl tracking-wider">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Welcome back to your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard title="PRODUCTS" value={products?.length} icon={DollarSign} />
          <StatsCard title="ORDERS" value={orders?.length} icon={ShoppingBag} />
          <StatsCard title="CUSTOMERS" value={users?.length} icon={Users} />
          <StatsCard title="CATALOG" value={catalog?.length} icon={TrendingUp} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm">
          <h2 className="font-metal text-base sm:text-lg tracking-wider mb-4">
            Recent Orders
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {orders?.slice(0, visibleOrders).map((order) => (
              <div
                key={order._id}
                className="flex items-center gap-3 sm:gap-4 py-2 sm:py-3 border-b last:border-0"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={16} className="sm:size-20" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-metal tracking-wider text-sm sm:text-base truncate">
                    {order.name} (#{order._id})
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {order.createdAt}
                  </p>
                </div>
                <div className="hidden sm:block text-right text-sm text-gray-500">
                  ${order.total?.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleOrders < orders.length && (
            <div className="mt-4 pt-2 border-t text-center">
              <button
                onClick={handleLoadMore}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
