import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

import styles from "./QuizInputSelect.module.css";
import { useEffect, useState } from "react";

interface Dictionary {
  value: number;
  label: string;
}

export default function QuizInputSelect(props: {
  quizes: QuizModel[];
  default: Dictionary[];
  setValues: (values: Dictionary[]) => void;
  isMulti?: boolean;
  label?: string;
  creatable?: boolean;
}): JSX.Element {
  function handleOnChange(values: any) {
    if (values) {
      props.setValues(values.map((value: Dictionary) => value.value));
    } else {
      props.setValues([]);
    }
  }

  return (
    <div className={styles.reactSelectContainer}>
      {props.label && <label>{props.label}:</label>}
      {props.creatable ? (
        <CreatableSelect
          closeMenuOnSelect={false}
          components={makeAnimated()}
          defaultValue={props.isMulti ? [...props.default] : props.default[0]}
          isMulti={props.isMulti}
          options={props.quizes.map((quiz) => ({
            value: quiz.id,
            label: quiz.subject,
          }))}
          onChange={handleOnChange}
        />
      ) : (
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          defaultValue={[...props.default]}
          isMulti={props.isMulti}
          options={props.quizes.map((quiz) => ({
            value: quiz.id,
            label: quiz.subject,
          }))}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
