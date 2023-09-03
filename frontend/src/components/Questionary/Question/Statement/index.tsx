import styles from "./Statement.module.css";

export default function Statement({
  question_text,
}: {
  question_text: string;
}): JSX.Element {
  return (
    <div className={styles.statement}>
      <h1 className={styles.text}>{question_text}</h1>
    </div>
  );
}
