import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "src/assets/fontawesome"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // Intentional patterns: context modules colocate the context object with
    // its provider, and cardInterface exports a compound-component namespace.
    // The fast-refresh-only hint does not apply to these.
    files: [
      "src/containers/contexts/**/*.{ts,tsx}",
      "src/interfaces/cardInterface.tsx",
      "src/routes/router.tsx",
    ],
    rules: { "react-refresh/only-export-components": "off" },
  },
);
