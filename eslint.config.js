import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      js,
      "unused-imports": pluginUnusedImports,
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
  pluginReact.configs.flat.recommended,
]);
