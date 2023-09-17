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

type ResponseProps = {
  instance: {
    id: number;
    preferences_user: QuizUser;
    preferences_quiz: QuizModel[];
    question_number: number;
    time_to_answer: number;
    updated_at: string;
  };
  quizList: QuizModel[];
  questionsList: {
    id: number;
    question_quiz: QuizModel;
    question_text: string;
    get_shuffled_answers: AnswerModel[];
  }[];
};

type PreferencesModel = {
  id: number;
  preferences_user: QuizUser;
  preferences_quiz: QuizModel[];
  question_number: number;
  time_to_answer: number;
  updated_at: string;
};

type QuizUser = {
  id: number;
  username: string;
  avatar: string;
  preferences_user: number;
  get_total_correct_answers: number;
  score: number;
  is_active: boolean;
  is_staff: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
};

type QuizUserPreferences = {
  id: number;
  username: string;
  avatar: string;
  preferences_user: number;
  preferences: ResponseProps;
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

type QuizModel = {
  id: number;
  subject: string;
  slug: string;
  description: string;
  duration: number;
  created_at: string;
};

type QuestionModel = {
  id: number;
  question_quiz: number;
  question_text: string;
  get_shuffled_answers: AnswerModel[];
};

interface QuizIdsProps {
  quizId: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
}

interface ScoreDataProps {
  quizUserId: number;
  quizIds: QuizIdsProps[];
}

type ScoreModel = {
  scorePercentage: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
};
