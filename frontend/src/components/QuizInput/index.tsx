import styles from "./QuizInput.module.css";

interface QuizInputProps {
  type: "text" | "email" | "password" | "number";
  value: string | number;
  onChange: (event: any) => void;
  name?: string;
  label?: string;
  error?: string;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  max?: number;
  min?: number;
  htmlFor?: "email" | "username" | "password" | "confirmPassword";
  doNotRender?: boolean;
  container?: string;
  className?: string;
}

export default function QuizInput(props: QuizInputProps): JSX.Element | null {
  return props.doNotRender ? null : (
    <div className={`${styles.container} ${props.container}`}>
      {props.label && (
        <label htmlFor={props.htmlFor} className={styles.label}>
          {props.label}
        </label>
      )}
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        id={props.htmlFor}
        max={props.max}
        min={props.min}
        required={props.required}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange?.(event.target.value)}
        className={`${props.error ? styles.inputError : ""} ${
          props.className
        } ${styles.input}`}
      />
      {props.error && <p className={styles.textError}>{props.error}</p>}
      {props.helpText && (
        <span className={styles.textHelp}>{props.helpText}</span>
      )}
    </div>
  );
}
