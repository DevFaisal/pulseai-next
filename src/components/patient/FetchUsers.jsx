"use client";
import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

export default function FetchUsers() {
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <h3>Error:</h3>
        <p>{error}</p>
        <button onClick={() => fetchUsers()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="users-container">
        {users.length > 0 ? (
          users.map((user, idx) => (
            <div key={idx} className="user-card p-4 border rounded shadow mb-4">
              <h2 className="text-xl font-bold">{user.first}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.dob}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}
