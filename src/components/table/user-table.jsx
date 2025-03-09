'use client';

import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const UserTable = ({ users, onDelete, onUpdateRole }) => {
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    const initialRoles = users.reduce((acc, user) => ({ ...acc, [user._id]: user.role }), {});
    setSelectedRoles(initialRoles);
  }, [users]);

  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
    onUpdateRole(userId, newRole); // Call the onUpdateRole passed from parent
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr className="text-sm font-medium text-gray-600">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <motion.tr
              key={user._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm">{user.name || 'N/A'}</td>
              <td className="px-6 py-4 text-sm">{user.email}</td>
              <td className="px-6 py-4 text-sm">{user.role || 'N/A'}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-3">
                  <select
                    value={selectedRoles[user._id] || 'user'}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
