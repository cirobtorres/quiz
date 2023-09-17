import QuestionModelFrontend from "@/models/Question";
import styles from "./Index.module.css";

interface IndexProps {
  span?: string;
  question: QuestionModelFrontend | null;
  questions: number[];
}

export default function QuestionIndex({
  span,
  question,
  questions,
}: IndexProps) {
  return (
    <div className={styles.navOuterContainer}>
      {span && <span className={styles.questionSpan}>{span}</span>}
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
