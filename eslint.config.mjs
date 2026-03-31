import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.{ts,tsx}", "index.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // v7 introduced these rules but they flag intentional patterns:
      // - "latest ref" (ref.current = value during render) is documented in React docs
      // - setState in effect body is valid for early returns and initial value sync
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  prettierConfig,
];
