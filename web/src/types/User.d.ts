type UserProps = {
  id: number;
  email: string;
  username: string;
  email: string;
  get_avatar_url: string | null;
  get_total_score: number;
  is_active: boolean;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
};

type Score = {
  quizId: number;
  totalQuestions: number;
  correctAnswers: number;
};
