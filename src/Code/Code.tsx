import { getBlockTitle } from "notion-utils";
import React from "react";
import { cs, useNotionContext } from "react-notion-x";
import { type ObserverManagerProps } from "../manager";
import styles from "./code.module.css";

import type { CodeBlock } from "notion-types";
import type { BundledTheme } from "shiki/themes";
import { CodeContextProvider } from "./context/codeBlock";
import { CopyButton } from "./CopyButton";
import { LangLabel } from "./LangLabel";
import { Caption } from "./Caption";
import { Content } from "./Content";
import defaultCodeProps from "./defaults";
import { getReactChildren } from "../utils";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface CodeProps {
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
  showCopy?: boolean;
  showLangLabel?: boolean;
  lazyRendering?: boolean;
  intersectionObserverOptions?: ObserverManagerProps;
  themes?: {
    light: BundledTheme;
    dark: BundledTheme;
  };
  children?: React.ReactNode;
}

function _Code(props: CodeProps) {
  const combinedProps = {
    ...defaultCodeProps,
    ...props
  } as Required<CodeProps>;
  const { block, className, defaultLanguage, children } = combinedProps;
  const { recordMap } = useNotionContext();
  const childComponents = getReactChildren(children);
  const content = getBlockTitle(block, recordMap);

  const lang = block.properties?.language?.[0]?.[0] || defaultLanguage;
  return (
    <CodeContextProvider
      value={{
        content,
        lang,
        caption: block.properties.caption,
        ...combinedProps
      }}
    >
      <figure className={cs(styles.codeBlock, className)}>
        {childComponents["Header"]}
        <Content />
        {childComponents["Footer"]}
      </figure>
    </CodeContextProvider>
  );
}

_Code.Header = Header;
_Code.Footer = Footer;

export function Code(props: CodeProps) {
  return (
    <_Code {...props}>
      <_Code.Header>
        <LangLabel />
        <CopyButton />
      </_Code.Header>
      <_Code.Footer>
        <Caption />
      </_Code.Footer>
    </_Code>
  );
}
