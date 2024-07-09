export interface Comment {
  id: number;
  userId: number;
  content: string;
}

export interface CommentState {
  comments: Comment[];
}

export const initialState: CommentState = {
  comments: [],
};
