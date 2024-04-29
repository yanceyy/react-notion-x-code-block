import React from "react";
import { useCodeBlock } from "./context/codeBlock";
import styles from "./code.module.css";

export function LangLabel() {
  const { lang, showLangLabel } = useCodeBlock();
  return showLangLabel && <span className={styles.codeLanLabel}>{lang}</span>;
}
