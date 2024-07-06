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
  get_score: number;
  created_at: Date;
};

type TotalScoreProps = {
  id: number;
  scores: PartialScoreProps[];
  user: number;
  get_score: number;
  get_total: number;
  get_corrects: number;
};
