import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

import styles from "./QuizInputSelect.module.css";

interface Dictionary {
  value: number;
  label: string;
  slug?: string;
  answers?: any;
}

export default function QuizInputSelect(props: {
  default: Dictionary[];
  quizes?: QuizModel[] | Dictionary[] | any;
  questions?: boolean;
  isMulti?: boolean;
  label?: string;
  creatable?: boolean;
  closeOnSelect?: boolean;
  setValues?: (values: any) => void;
}): JSX.Element {
  function handleOnChange(values: any) {
    if (values) {
      if (!Array.isArray(values)) {
        values = [values];
      }
      props.setValues?.(values);
    } else {
      props.setValues?.([]);
    }
  }

  return (
    <div className={styles.reactSelectContainer}>
      {props.label && <label>{props.label}:</label>}
      {props.creatable ? (
        <CreatableSelect
          closeMenuOnSelect={props.closeOnSelect || false}
          isClearable
          components={makeAnimated()}
          defaultValue={props.isMulti ? [...props.default] : props.default[0]}
          isMulti={props.isMulti}
          options={
            props.questions
              ? props.quizes?.map((question: any) => ({
                  value: question.id,
                  label: question.question_text,
                  question_quiz: question.question_quiz,
                  answers: question.get_shuffled_answers,
                }))
              : props.quizes?.map((quiz: any) => ({
                  value: quiz.id,
                  label: quiz.subject,
                  slug: quiz.slug,
                }))
          }
          onChange={handleOnChange}
        />
      ) : (
        <Select
          closeMenuOnSelect={props.closeOnSelect || false}
          isClearable
          components={makeAnimated()}
          defaultValue={[...props.default]}
          isMulti={props.isMulti}
          options={props.quizes?.map((quiz: any) => ({
            value: quiz.id,
            label: quiz.subject,
          }))}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
