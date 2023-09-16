import Select from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

import styles from "./QuizInputSelect.module.css";
import { useEffect, useState } from "react";

interface Dictionary {
  [key: string]: string;
}

export default function QuizInputSelect(props: {
  quizes: QuizModel[];
  default: number[];
  setValues: (values: number[]) => void;
  label?: string;
  creatable?: boolean;
}): JSX.Element {
  // https://react-select.com/home

  function handleOnChange(values: any) {
    if (values) {
      props.setValues(values.map((value: Dictionary) => value.value));
    } else {
      props.setValues([]);
    }
  }

  const options = props.quizes.map((quiz) => ({
    value: quiz.id,
    label: quiz.subject,
  }));

  const defaultValues = props.default.map((value) => ({
    value: value,
    label: options.find((option) => option.value === value)?.label,
  }));

  return (
    <div className={styles.reactSelectContainer}>
      {props.label && <label>{props.label}:</label>}
      {props.creatable ? (
        <CreatableSelect
          closeMenuOnSelect={false}
          components={makeAnimated()}
          defaultValue={[...defaultValues]}
          isMulti
          options={options}
          onChange={handleOnChange}
        />
      ) : (
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          defaultValue={[...defaultValues]}
          isMulti
          options={options}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
