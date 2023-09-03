import styles from "./Error.module.css";
import Button from "../Button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  return (
    <div className={`main  ${styles.backGroundContainer}`}>
      <div className={`main  ${styles.container}`}>
        <p className={styles.errorPresentation}>
          Um erro inesperado ocorreu. Tente novamente ou retorne mais tarde
        </p>
        <div className={styles.errorText}>
          {<h1>{error.message}</h1> || (
            <h1>Um erro inesperado ocorreu. Tente mais tarde</h1>
          )}
        </div>
        <Link href="/" className={styles.backToHome}>
          Voltar para home
        </Link>
        <Button
          text="Tentar de novo"
          onClick={reset}
          backgroundColor={styles.backgroundColorButton}
        />
      </div>
    </div>
  );
}
