import Button from "../Button";
import styles from "./ConfirmationBox.module.css";

interface ConfirmationBoxProps {
  text: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  confirmAction: (event: any) => Promise<void>;
}

export default function ConfirmationBox({
  text,
  isOpen,
  setIsOpen,
  confirmAction,
}: ConfirmationBoxProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Button text={text} onClick={() => setIsOpen(true)} />
      <div
        className={`${styles.confirmationWrapper} ${
          isOpen ? styles.confirmationBoxOpen : ""
        }`}
      >
        {isOpen && (
          <div className={styles.confirmationBoxContainer}>
            <p>Deseja continuar?</p>
            <div className={styles.buttonsContainer}>
              <Button text="Confirmar" onClick={confirmAction} />
              <Button
                text="Cancelar"
                onClick={() => setIsOpen(false)}
                backgroundColor={styles.cancelButton}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
