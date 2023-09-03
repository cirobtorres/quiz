import styles from "./Statistics.module.css";

interface StatisticsProps {
  value: number | string | undefined;
  text: string;
  dynamicColor?: string;
  dynamicBackgroundColor?: string;
}

export default function Statistics(props: StatisticsProps) {
  return (
    <div className={styles.statistics}>
      <div
        className={styles.score}
        style={{
          backgroundColor: props.dynamicBackgroundColor ?? "#fdd60f",
          color: props.dynamicColor ?? "#333",
        }}
      >
        {props.value}
      </div>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
}
