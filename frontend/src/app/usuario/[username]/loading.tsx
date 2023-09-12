import Loading from "@/components/Loading";
import styles from "../../Home.module.css";

export default function HomeLoading(): JSX.Element {
  return (
    <div className={`main  ${styles.container}`}>
      <Loading />
    </div>
  );
}
