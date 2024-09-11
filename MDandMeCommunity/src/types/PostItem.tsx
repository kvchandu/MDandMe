export type PostItem = {
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: Record<string, any>;
  is_hugged: boolean | null;
};
