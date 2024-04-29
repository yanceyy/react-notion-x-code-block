import { createContext, useContext } from "react";
import defaultCodeProps from "../defaults";
import { CodeProps } from "../Code";
import type { CodeBlock, Decoration } from "notion-types";

interface CodeBlockContextInterface
  extends Required<Omit<CodeProps, "block" | "className" | "defaultLanguage">> {
  content: string;
  lang: string;
  block?: CodeBlock;
  caption?: Decoration[];
}

const codeBlockContext = createContext<CodeBlockContextInterface>({
  content: "",
  lang: "",
  ...defaultCodeProps
} as CodeBlockContextInterface);

export const CodeContextProvider = codeBlockContext.Provider;

export function useCodeBlock() {
  return useContext(codeBlockContext);
}
