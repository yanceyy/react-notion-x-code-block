import { getBlockTitle } from "notion-utils";
import { IoMdCopy } from "react-icons/io";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cs, useNotionContext, Text } from "react-notion-x";
import { codeToHtml } from "shiki";
import styles from "./code.module.css";

import type { CodeBlock } from "notion-types";
import type { BundledTheme } from "shiki/themes";

export const Code: React.FC<{
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
  showCopy?: boolean;
  showLangLabel?: boolean;
  themes?: {
    light: BundledTheme;
    dark: BundledTheme;
  };
}> = ({
  block,
  className,
  defaultLanguage = "typescript",
  themes = {
    light: "catppuccin-latte",
    dark: "dracula"
  },
  showCopy = true,
  showLangLabel = true
}) => {
  const { recordMap } = useNotionContext();

  const content = getBlockTitle(block, recordMap);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [isCopied, setIsCopied] = useState(false);

  const timer = useRef<null | number>(null);

  const caption = block.properties.caption;

  const providedLangType = block.properties?.language?.[0]?.[0];
  const lang = (providedLangType || defaultLanguage).toLowerCase();

  useEffect(() => {
    async function renderCodeToHtml() {
      const htmlCode = await codeToHtml(content, {
        lang,
        themes
      });
      setCode(htmlCode);
    }
    content && renderCodeToHtml();
  }, [content, lang, themes]);

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
    <figure className={cs(styles.codeBlock, className)}>
      {showLangLabel && providedLangType ? (
        <span className={styles.codeLanLabel}>{providedLangType}</span>
      ) : null}
      {showCopy ? (
        <button onClick={clickCopy} className={styles.codeCopyButton}>
          <IoMdCopy />
          {isCopied ? "Copied" : "Copy"}
        </button>
      ) : null}
      {!code ? (
        <pre>{content}</pre>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: code }} />
      )}
      {caption && (
        <figcaption className={styles.codeCaption}>
          <Text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
