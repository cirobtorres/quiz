import QuizCard from "@/components/QuizCard";
import getQuiz from "../../libs/getQuiz";

export default async function QuizCardGrid() {
  const quizArray: QuizAPI = await getQuiz();
  return (
    <div className="my-2">
      <div className="grid grid-cols-4 gap-4">
        {quizArray.results.map((quiz) => {
          return (
            <QuizCard
              key={quiz.id}
              image={{
                src: `/data/web/static${quiz.get_image_url}`,
                alt: quiz.slug,
              }}
              title={quiz.subject}
              description={quiz.description}
              options={{
                theme: quiz.theme,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
