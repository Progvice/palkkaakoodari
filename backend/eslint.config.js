import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

const compat = new FlatCompat();

export default [
  js.configs.recommended, // Enable recommended JS rules
  {
    plugins: { "@typescript-eslint": tseslint },
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      globals: {
        process: "readonly", // Adds Node.js process global
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "quotes": ["warn", "double"],
      "semi": ["warn", "always"],
      "no-var": "error"
    }
  }
];
