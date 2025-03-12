"use client";

import { useAuth } from "../AuthSessionProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || user.email !== "admin@admin.com") {
    return <p>Access Denied</p>;
  }

  return children;
};

export default AdminRoute;
