"use client";

import React, { useState, useEffect } from "react";
import { useManageUser } from "@/services/user/user.api";
import { useDispatch } from "react-redux";
import { setUsers } from "@/redux/user/user.actions";
import { User } from "@/redux/user/user.interface";
import Loading from "./loading";

const UserCrud = () => {
  const { getUsers, addUser, updateUser, deleteUser } = useManageUser();
  const dispatch = useDispatch();
  const { data: users, error, isLoading } = getUsers();
  const addUserMutation = addUser();
  const updateUserMutation = updateUser();
  const deleteUserMutation = deleteUser();

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  const handleAddUser = async () => {
    try {
      const newUser = { name: newUserName, email: newUserEmail };
      await addUserMutation.mutateAsync(newUser);
      setNewUserName("");
      setNewUserEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await updateUserMutation.mutateAsync(editingUser);
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isLoading) {
    return <Loading />; // Next.js will show app/users/loading.tsx automatically
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Next.js will show app/users/error.tsx automatically
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User CRUD Operations</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Name"
          className="border p-2 mr-2"
        />
        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddUser} className="bg-blue-500 text-white p-2">
          Add User
        </button>
      </div>

      {editingUser && (
        <div className="mb-4">
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
            placeholder="Name"
            className="border p-2 mr-2"
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
            placeholder="Email"
            className="border p-2 mr-2"
          />
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white p-2"
          >
            Update User
          </button>
        </div>
      )}

      <table className="border-collapse">
        <thead>
          <tr className="bg-slate-200">
            <th className="border border-slate-300 p-4">Id</th>
            <th className="border border-slate-300">Name</th>
            <th className="border border-slate-300">Email</th>
            <th className="border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td className="border border-slate-300 px-6 w-1">{user.id}</td>
              <td className="border border-slate-300 px-6">{user.name}</td>
              <td className="border border-slate-300 px-20 py-1">
                {user.email}
              </td>
              <td className="border border-slate-300 p-6">
                <div className="flex gap-x-4">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCrud;
