Enhance your React-Notion-X projects with a versatile code block component.
This component offers out-of-the-box support for multiple programming languages and automatically adapts to light and dark themes,
powered by [Shiki](https://github.com/shikijs/shiki).

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
import "./style.css";

<NotionRenderer
  // ...
  components={{
    Code
  }}
/>;
```
