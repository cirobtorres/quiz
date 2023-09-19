import styles from "./QuizInput.module.css";

interface QuizInputProps {
  type: "text" | "email" | "password" | "number";
  value: string | number;
  onChange: (event: any) => void;
  onBlur?: (
    value: number,
    func: (value: number) => void,
    min: number,
    max: number
  ) => void;
  name?: string;
  label?: string;
  error?: string | string[];
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  max?: number;
  min?: number;
  htmlFor?: "email" | "username" | "password" | "confirmPassword";
  doNotRender?: boolean;
}

export default function QuizInput(props: QuizInputProps): JSX.Element | null {
  return props.doNotRender ? null : (
    <div className={styles.container}>
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
        onBlur={
          props.onBlur &&
          ((event) =>
            props.onBlur?.(
              Number(event.target.value),
              props.onChange,
              props.min || 0,
              props.max || 0
            ))
        }
        className={`${props.error ? styles.inputError : ""} ${styles.input}`}
      />
      {props.error && typeof props.error === "string" ? (
        <p className={styles.textError}>{props.error}</p>
      ) : (
        props.error &&
        Array.isArray(props.error) &&
        props.error.map((error, index) => (
          <p key={index} className={styles.textError}>
            {error}
          </p>
        ))
      )}
      {props.helpText && (
        <span className={styles.textHelp}>{props.helpText}</span>
      )}
    </div>
  );
}
