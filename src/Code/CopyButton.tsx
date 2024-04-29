import { IoMdCopy } from "react-icons/io";
import React, { useCallback, useRef, useState } from "react";
import { useCodeBlock } from "./context/codeBlock";
import styles from "./code.module.css";

export function CopyButton() {
  const { content, showCopy } = useCodeBlock();
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<null | number>(null);

  const clickCopy = useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      timer.current = setTimeout(() => {
        setIsCopied(false);
        timer.current = null;
      }, 1000);
    });
  }, [content]);

  return (
    showCopy && (
      <button onClick={clickCopy} className={styles.codeCopyButton}>
        <IoMdCopy />
        {isCopied ? "Copied" : "Copy"}
      </button>
    )
  );
}
