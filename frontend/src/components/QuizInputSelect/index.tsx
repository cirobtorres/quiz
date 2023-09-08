import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

import styles from "./QuizInputSelect.module.css";

export default function QuizInputSelect(props: {
  quizes: QuizModel[];
  label?: string;
  creatable?: boolean;
}): JSX.Element {
  // https://react-select.com/home

  const options = props.quizes.map((quiz) => ({
    value: quiz.id,
    label: quiz.subject,
  }));

  return (
    <div className={styles.reactSelectContainer}>
      {props.label && <label>{props.label}:</label>}
      {props.creatable ? (
        <CreatableSelect
          closeMenuOnSelect={true}
          components={makeAnimated()}
          defaultValue={[options[1]]}
          isMulti
          options={options}
        />
      ) : (
        <Select
          closeMenuOnSelect={true}
          components={makeAnimated()}
          defaultValue={[options[1]]}
          isMulti
          options={options}
        />
      )}
    </div>
  );
}
