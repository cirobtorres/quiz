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
  get_image_url: string;
  slug: string;
  theme: string;
  private: boolean;
  created_at: Date;
  updated_at: Date;
};

type QuestionAPI = {
  id: number;
  quiz_id: number;
  text: string;
  get_shuffled_answers: AnsterAPI[];
};

type AnswerAPI = {
  id: number;
  text: string;
  is_correct: boolean;
};
