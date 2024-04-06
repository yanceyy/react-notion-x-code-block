import { getBlockTitle } from "notion-utils";
import React, { useEffect, useState } from "react";
import { cs, useNotionContext, Text } from "react-notion-x";
import { codeToHtml } from "shiki";
import { BundledTheme } from "shiki/themes";

import styles from "./code.module.css";

import type { CodeBlock } from "notion-types";

export const Code: React.FC<{
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
  captionClassName?: string;
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
  className,
  captionClassName
}) => {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const [code, setCode] = useState<string | undefined>(undefined);

  const language = (
    block.properties?.language?.[0]?.[0] || defaultLanguage
  ).toLowerCase();
  const caption = block.properties.caption;

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

  return (
    <figure className={cs(styles.codeBlock, className)}>
      {code == undefined ? (
        <pre>{content}</pre>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: code }} />
      )}
      {caption && (
        <figcaption className={cs(styles.codeCaption, captionClassName)}>
          <Text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
