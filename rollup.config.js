import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import externals from "rollup-plugin-node-externals";
import del from "rollup-plugin-delete";
import pkg from "./package.json" assert { type: "json" };
import styles from "rollup-plugin-styles";

export default [
  {
    input: "./src/index.ts",
    plugins: [
      del({ targets: ["dist/*"] }),
      externals({ deps: true }),
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"]
      }),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }),
      styles({ modules: true })
    ],
    output: {
      format: "es",
      dir: "dist"
    }
  }
];
