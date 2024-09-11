import { CommentData } from "./CommentData";

export type PostItem = {
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: { [key: string]: CommentData };
  is_hugged: boolean | null;
};
