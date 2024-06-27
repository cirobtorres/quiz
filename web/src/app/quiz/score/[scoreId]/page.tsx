import getQuestions from "@/libs/getQuestions";
import Question from "@/models/Question";

export default async function ScorePage() {
  const questionsAPI: QuestionAPI[] = await getQuestions();
  const questions = questionsAPI.map((question) => {
    return Question.create(question);
  });
  const score: {
    quizId: number;
    totalQuestions: number;
    correctAnswers: number;
  }[] = [];
  questions.forEach((questionValue, index, arr) => {
    if (score.length) {
      score.push({
        quizId: questionValue.getQuizId,
        totalQuestions: 1,
        correctAnswers: questionValue.getSelected ? 1 : 0,
      });
    }
    console.log(score);
  });
  return <div>Score</div>;
}
