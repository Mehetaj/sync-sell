"use client";

import { useAuth } from "../AuthSessionProvider";
import { useRouter } from "next/navigation";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user || user.email !== "admin@admin.com") {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
