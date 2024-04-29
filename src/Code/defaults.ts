import { BundledTheme } from "shiki/themes";

const defaultCodeSettings = {
  defaultLanguage: "TypeScript",
  themes: {
    light: "catppuccin-latte",
    dark: "dracula"
  },
  intersectionObserverOptions: {
    rootMargin: "0px",
    threshold: 0.1
  },
  showCopy: true,
  showLangLabel: true,
  lazyRendering: true
} as {
  themes: {
    light: BundledTheme;
    dark: BundledTheme;
  };
};

export default defaultCodeSettings;
