import QuestionModelFrontend from "@/models/Question";
import styles from "./Index.module.css";

interface IndexProps {
  question: QuestionModelFrontend | null;
  questions: number[];
}

export default function QuestionIndex({ question, questions }: IndexProps) {
  return (
    <div className={styles.navOuterContainer}>
      <span className={styles.questionSpan}>Questão:</span>
      <nav className={styles.navInnerContainer}>
        {questions.map((id, index) => (
          <li
            key={id}
            style={{
              backgroundColor:
                question && question.id === id
                  ? "var(--backgroundColor-A)"
                  : question && questions.indexOf(question.id) > index
                  ? "var(--backgroundColor-C)"
                  : "var(--backgroundColor-D)",
            }}
            className={styles.navItem}
          >
            {index + 1}
          </li>
        ))}
      </nav>
    </div>
  );
}
