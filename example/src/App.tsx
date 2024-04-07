import "./App.css";
import "react-notion-x/src/styles.css";

import { Code } from "../../dist";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import { useCallback, useState } from "react";

import defaultRecordMap from "./record-map.json";

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
    <div
      style={{
        backgroundColor: isDarkMode ? "gray" : "white",
        padding: "20px"
      }}
    >
      <div
        style={{
          textAlign: "center"
        }}
      >
        <button onClick={clickToggle}>Toggle dark mode</button>
      </div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={isDarkMode}
        components={{
          Code
        }}
      />
    </div>
  );
}

export default App;
