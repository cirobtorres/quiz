type ScoreProps = {
  quiz_id: number;
  total_questions: number;
  correct_answers: number;
};

type PartialScoreProps = {
  id: number;
  quiz: number;
  total: number;
  corrects: number;
  created_at: string;
};

type TotalScoreProps = {
  id: number;
  scores: PartialScoreProps[];
  user: number;
  get_score_percentage: number;
  get_total_questions: number;
  get_correct_answers: number;
};
