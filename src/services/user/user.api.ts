import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/redux/user/user.interface";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${baseURL}/users`);
  return data;
};

const addUserData = async (user: Partial<User>): Promise<User> => {
  const uniqueID = 0;
  const { data } = await axios.post(`${baseURL}/users`, user);
  return data;
};

const updateUserData = async (user: Partial<User>): Promise<User> => {
  const { data } = await axios.put(`${baseURL}/users/${user.id}`, user);
  return data;
};

const deleteUserData = async (id: number): Promise<void> => {
  await axios.delete(`${baseURL}/users/${id}`);
};

export const useManageUser = () => {
  const queryClient = useQueryClient();
  const getUsers = () => useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  const addUser = () => {
    return useMutation({
      mutationKey: ["addUser"],
      mutationFn: addUserData,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
  };

  const updateUser = () => {
    return useMutation({
      mutationKey: ["updateUser"],
      mutationFn: updateUserData,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
  };

  const deleteUser = () => {
    return useMutation({
      mutationKey: ["deleteUser"],
      mutationFn: deleteUserData,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
  };

  return {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
  };
};
