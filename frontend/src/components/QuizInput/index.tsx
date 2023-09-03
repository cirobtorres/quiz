import styles from "./QuizInput.module.css";

interface QuizInputProps {
  type: "text" | "email" | "password" | "number";
  name: string;
  label: string;
  value: string | number;
  error?: string;
  placeholder?: string;
  required?: boolean;
  max?: number;
  min?: number;
  width?: string;
  htmlFor?: "email" | "username" | "password" | "confirmPassword";
  doNotRender?: boolean;
  container?: string;
  onChange: (event: any) => void;
}

export default function QuizInput(props: QuizInputProps): JSX.Element | null {
  return props.doNotRender ? null : (
    <div className={`${styles.container} ${props.container}`}>
      <label htmlFor={props.htmlFor} className={styles.label}>
        {props.label}
      </label>
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
        className={`${props.error ? styles.inputError : ""} ${props.width} ${
          styles.input
        }`}
      />
      {props.error && <p className={styles.textError}>{props.error}</p>}
    </div>
  );
}
