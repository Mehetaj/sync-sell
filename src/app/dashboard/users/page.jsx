"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pagination } from "../../../components/pagination";
import UserTable from "../../../components/table/user-table";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import {
  deleteUser,
  fetchUsers,
  updateUserRole,
} from "../../store/features/user-slice"; // Import updateUserRole

const UserPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete the user.");
    }
  };

  const handleRoleUpdate = (userId, newRole) => {
    dispatch(updateUserRole({ userId, newRole }))
      .unwrap()
      .then(() => {
        toast.success("User role updated successfully");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
        toast.error("Failed to update user role.");
      });
  };

  const totalPages = Math.ceil(users?.length / usersPerPage);
  const paginatedUsers = users?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6 font-metal">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-wider">All Users</h1>
          <p className="text-gray-600 mt-1">Manage your users</p>
        </div>
        <Link href="/dashboard/users/add">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white px-4 py-2 flex items-center gap-2 rounded-md"
          >
            <Plus size={20} />
            Add User
          </motion.button>
        </Link>
      </div>

      {/* Users Table with Role Update */}
      <UserTable
        users={paginatedUsers}
        onDelete={handleDelete}
        onUpdateRole={handleRoleUpdate}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserPage;
