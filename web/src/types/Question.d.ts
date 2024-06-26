// type Quiz = {
//   id: number;
//   subject: string;
//   slug: string;
//   created_at: Date;
// };

// type Question = {
//   id: number;
//   quizId: number;
//   text: string;
//   shuffledAnswers: Answer[];
//   correctAnswer: boolean;
// };

// type Answer = {
//   id: number;
//   questionId: number;
//   text: string;
//   isCorrect: boolean;
// };

type QuestionAPI = {
  id: number;
  quizId: number;
  text: string;
  get_shuffled_answers: {
    id: number;
    questionId: number;
    text: string;
    isCorrect: boolean;
  }[];
};
