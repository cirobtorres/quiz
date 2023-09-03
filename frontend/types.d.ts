type encodedToken = {
  access: string;
  refresh: string;
};

type Token = {
  token_type: string;
  exp: string;
  iat: string;
  jti: string;
  userData: QuizUser;
};

type QuizUser = {
  id: number;
  username: string;
  avatar: string;
  get_total_correct_answers: number;
  score: number;
  is_active: boolean;
  is_staff: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
};

type Paginator = {
  current: number;
  first: number;
  last: number;
  page_size: number;
  total_pages: number;
  next: number | null;
  previous: number | null;
};

type QuizUserPaginated = {
  results: QuizUser[];
  paginator: Paginator;
};

type AnswerModel = {
  id: number;
  answer_text: string;
  is_correct: boolean;
};

type QuestionModel = {
  id: number;
  question_text: string;
  get_shuffled_answers: AnswerModel[];
};

type QuizModel = {
  id: number;
  subject: string;
  slug: string;
  description: string;
  duration: number;
  created_at: string;
  get_questions: QuestionModel[];
};

type ScoreModel = {
  id: number;
  quiz: QuizModel;
  quiz_user: QuizUser;
  total_questions: number;
  total_correct_answers: number;
  get_score_percentage: number;
  created_at: Date;
};
