type QuizAPI = {
  results: QuizProps[];
  paginator: {
    current: number;
    first: number;
    last: number;
    page_size: number;
    total_pages: number;
    previous: number | null;
    next: number | null;
  };
  error: boolean;
};

type QuizProps = {
  id: number;
  subject: string;
  description: string;
  cover: MediaProps;
  slug: string;
  blocked: boolean;
  is_private: boolean;
  created_at: string;
  updated_at: string;
};

type QuestionProps = {
  id: number;
  quiz_id: number;
  text: string;
  get_shuffled_answers: AnswerProps[];
};

type AnswerProps = {
  id: number;
  text: string;
  is_correct: boolean;
};
