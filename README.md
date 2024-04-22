Enhance your React-Notion-X projects with a versatile code block component.
This component offers out-of-the-box support for multiple programming languages and automatically adapts to light and dark themes,
powered by [Shiki](https://github.com/shikijs/shiki).

<div align="center">
<p>
<img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/yanceyy/react-notion-x-code-block/npm-publish.yml">
<img alt="GitHub deployments" src="https://img.shields.io/github/deployments/yanceyy/react-notion-x-code-block/Production">
</p>
</div>

## Install

You can install the react-notion-x-code-block package using npm, yarn, or pnpm:

```shell
npm install react-notion-x-code-block

yarn add react-notion-x-code-block

pnpm install react-notion-x-code-block
```

## How to use

To use the component, import Code from the package and include it in your NotionRenderer components object:

```tsx
import { Code } from "react-notion-x-code-block";
import { NotionRenderer } from "react-notion-x";

<NotionRenderer
  // ...
  components={{
    Code
  }}
/>;
```

### Adapting to Theme Changes

To ensure the code block styles automatically adjust to your theme mode (light or dark), define CSS style according to the method you use to achieve dark mode.

```css
/* file: style.css */
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
```

Class-based Dark Mode

```css
/* file: style.css */
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* Optional, if you also want font styles */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
```

And then import it to the page:

```tsx
import { Code } from "react-notion-x-code-block";
import { NotionRenderer } from "react-notion-x";

import "./style.css";

<NotionRenderer
  // ...
  components={{
    Code
  }}
/>;
```

### Personalization settings

Since `NotionRenderer` will only accept react components as props, we need to wrapper `Code` component and set specific settings.

**Specific theme**

```tsx
import { type CodeBlock, ExtendedRecordMap } from "notion-types";
import { Code } from "react-notion-x-code-block";

function PersonalizedCode({ block }: { block: CodeBlock }) {
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
```

**Hide copy code button**

```tsx
import { type CodeBlock, ExtendedRecordMap } from "notion-types";
import { Code } from "react-notion-x-code-block";

function PersonalizedCode({ block }: { block: CodeBlock }) {
  return <Code block={block} showCopy={false} />;
}
```

## API

| Property                    | Description                                                                                                                     | Type      | Default                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------- |
| block                       | Receives render code content from `NotionRenderer`                                                                              | CodeBlock | -                                            |
| className                   | Additional class for Code                                                                                                       | string    | -                                            |
| defaultLanguage             | Default programming language if not specified in `block`                                                                        | string    | typescript                                   |
| themes                      | Themes for rendering code                                                                                                       | object    | {light: "catppuccin-latte", dark: "dracula"} |
| IntersectionObserverOptions | Manage the conditions under which the highlighting of a code block should be triggered (Need `lazyLoading` property to be true) | object    | {rootMargin: "0px",threshold: 0.1}           |
| showCopy                    | Whether to show the copy button on the top right corner                                                                         | boolean   | true                                         |
| showLangLabel               | Whether to show the language type label on the top left corner                                                                  | boolean   | true                                         |
| lazyLoading                 | Whether to run highlighting rendering when a code block is within viewport                                                      | boolean   | true                                         |

## Run the Example

1. Install dependencies `pnpm i`
2. Build the package by running `pnpm build`.
3. Navigate to the example package directory with `cd example`.
4. Start the example application using `pnpm dev`.
5. Open your web browser and go to [http://localhost:5173](http://localhost:5173) to view the application.

## Development

1. Execute the command `pnpm watch`. This initiates continuous monitoring of file modifications, enabling automatic compilation.
2. Navigate to the example folder and execute `pnpm dev`. This starts the Vite React project, which automatically refreshes upon any changes made in the main packages.
