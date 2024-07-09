import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "@/redux/comment/comment.interface";

const fetchComments = async (): Promise<Comment[]> => {
  const { data } = await axios.get("/api/comments");
  return data;
};

const addComment = async (comment: Partial<Comment>): Promise<Comment> => {
  const { data } = await axios.post("/api/comments", comment);
  return data;
};

const updateComment = async (comment: Partial<Comment>): Promise<Comment> => {
  const { data } = await axios.patch(`/api/comments/${comment.id}`, comment);
  return data;
};

const deleteComment = async (id: number): Promise<void> => {
  await axios.delete(`/api/comments/${id}`);
};

export const useComments = () =>
  useQuery({ queryKey: ["comments"], queryFn: fetchComments });
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addComment"],
    mutationFn: addComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateComment"],
    mutationFn: updateComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};
