import Loading from "@/components/Loading";
import styles from "@styles/Home.module.css";

export default function HomeLoading(): JSX.Element {
  return (
    <div className={`main  ${styles.container}`}>
      <Loading />
    </div>
  );
}
