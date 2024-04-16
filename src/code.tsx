import { getBlockTitle } from "notion-utils";
import { IoMdCopy } from "react-icons/io";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cs, useNotionContext, Text } from "react-notion-x";
import { codeToHtml } from "shiki";
import { observerManager } from "./manager";
import styles from "./code.module.css";

import type { CodeBlock } from "notion-types";
import type { BundledTheme } from "shiki/themes";

export const Code: React.FC<{
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
  showCopy?: boolean;
  showLangLabel?: boolean;
  lazyRendering?: boolean;
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
  showLangLabel = true,
  lazyRendering = true
}) => {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<null | number>(null);
  const codeRef = useRef<HTMLDivElement | null>(null);

  const renderCodeToHtml = useCallback(async () => {
    const htmlCode = await codeToHtml(content, {
      lang: (
        block.properties?.language?.[0]?.[0] || defaultLanguage
      ).toLowerCase(),
      themes
    });

    setCode(htmlCode);

    if (codeRef.current) {
      observerManager.unobserve(codeRef.current);
    }
  }, [content, block.properties?.language, defaultLanguage, themes]);

  useEffect(() => {
    // if code is not null (means the highlighted codes has been rendered), we don't want to observe it again
    if (code) return;

    const element = codeRef.current;
    let unobservedElement = null;

    if (lazyRendering) {
      if (element) {
        unobservedElement = observerManager.observe(element, renderCodeToHtml);
      }
    } else {
      renderCodeToHtml();
    }

    return () => {
      unobservedElement?.();
    };
  }, [renderCodeToHtml, lazyRendering, code]);

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
    <figure ref={codeRef} className={cs(styles.codeBlock, className)}>
      {showLangLabel && block.properties?.language ? (
        <span className={styles.codeLanLabel}>
          {block.properties.language[0][0]}
        </span>
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
      {block.properties.caption && (
        <figcaption className={styles.codeCaption}>
          <Text value={block.properties.caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
