import Link from "next/link";

import styles from "./Button.module.css";

interface BotaoPropts {
  text: string;
  href?: string;
  onClick?: (e: any) => void;
  backgroundColor?: string;
}

export default function Button(props: BotaoPropts) {
  function renderButton() {
    return (
      <button
        className={`${
          props.backgroundColor ? props.backgroundColor : styles.backgroundColor
        } ${styles.button}`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  }

  return props.href ? (
    <Link href={props.href}>{renderButton()}</Link>
  ) : (
    renderButton()
  );
}
