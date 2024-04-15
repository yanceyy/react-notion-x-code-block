import "./App.css";
import "react-notion-x/src/styles.css";

import { Code } from "../../dist";
import { type CodeBlock, ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import { useCallback, useState } from "react";

import defaultRecordMap from "./record-map.json";

function PersonalizedThemeCode({ block }: { block: CodeBlock }) {
  return (
    <Code
      block={block}
      themes={{
        light: "material-theme-lighter",
        dark: "material-theme-ocean"
      }}
    />
  );
}

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const clickToggle = useCallback(
    () =>
      setDarkMode((isDarkMode) => {
        document.documentElement.className = !isDarkMode ? "dark" : "";
        return !isDarkMode;
      }),
    []
  );

  const recordMap = defaultRecordMap as unknown as ExtendedRecordMap;

  return (
    <div className="flex items-center flex-col dark:bg-gray-600 dark:text-gray-200">
      <div
        className="p-5 w-[720px]"
      >
        <button className="font-sans font-bold text-center uppercase transition-all
          text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10
          hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none
          active:opacity-[0.85] active:shadow-none my-3" onClick={clickToggle}>
          Toggle dark mode
        </button>
        <section>
          <h2 className="text-xl font-bold">Default Themes</h2>
          <p className="my-4">
            By default, code blocks are rendered using the catppuccin-latte theme for light mode and the dracula theme
            for
            dark mode.
          </p>
          <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={isDarkMode}
            components={{
              Code
            }}
          />
        </section>
        <section>
          <h2 className="text-xl font-bold">Specific Themes</h2>
          <p className="my-4">
            Wrapper Code Block: Utilize a higher-order component to set specific themes within the block. For light
            mode,
            use material-theme-lighter; for dark mode, use material-theme-ocean.
          </p>
          <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={isDarkMode}
            components={{
                Code: PersonalizedThemeCode
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
