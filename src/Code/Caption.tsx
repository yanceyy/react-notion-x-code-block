import React from "react";
import { useCodeBlock } from "./context/codeBlock";
import styles from "./code.module.css";
import { Text } from "react-notion-x";

export function Caption() {
  const { caption, block } = useCodeBlock();
  return (
    caption &&
    block && (
      <figcaption className={styles.codeCaption}>
        <Text value={caption} block={block} />
      </figcaption>
    )
  );
}
