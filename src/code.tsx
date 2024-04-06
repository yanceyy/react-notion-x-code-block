import { getBlockTitle } from "notion-utils";
import React, { useEffect, useState } from "react";
import { cs, useNotionContext } from "react-notion-x";
import { codeToHtml } from "shiki";
import { BundledTheme } from "shiki/themes";

import styles from "./code.module.css";

import type { CodeBlock } from "notion-types";

export const Code: React.FC<{
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
  themes?: {
    light: BundledTheme;
    dark: BundledTheme;
  };
}> = ({
  block,
  defaultLanguage = "typescript",
  themes = {
    light: "catppuccin-latte",
    dark: "dracula"
  },
  className
}) => {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);

  const [code, setCode] = useState<string | undefined>(undefined);

  const language = (
    block.properties?.language?.[0]?.[0] || defaultLanguage
  ).toLowerCase();

  useEffect(() => {
    async function renderCodeToHtml() {
      const htmlCode = await codeToHtml(content, {
        lang: language,
        themes
      });
      setCode(htmlCode);
    }
    content && renderCodeToHtml();
  }, [content, language, themes]);

  return code ? (
    <div
      className={cs(styles.codeBlock, className)}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  ) : (
    <div className={cs(styles.codeBlock, className)}>
      <pre>{content}</pre>
    </div>
  );
};
