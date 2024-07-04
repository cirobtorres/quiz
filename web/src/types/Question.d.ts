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
