"use client";

import { useEffect, useState } from "react";

import styles from "./Loading.module.css";

export default function Loading() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [r, strokeWidth] = width > 768 ? [20, 3] : [7, 1.75];
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <svg className={styles.circular} viewBox="25 25 50 50">
          <circle
            className={styles.path}
            cx="50"
            cy="50"
            r={`${r}`}
            fill="none"
            strokeWidth={`${strokeWidth}`}
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <h1 className={styles.loading}>Carregando</h1>
    </div>
  );
}
