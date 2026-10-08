import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const noComments = {
  meta: {
    type: "problem",
    docs: { description: "disallow every comment in source files" },
    schema: [],
    messages: { comment: "Comments are not allowed in this codebase." },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          if (comment.type === "Shebang") continue;
          context.report({ loc: comment.loc, messageId: "comment" });
        }
      },
    };
  },
};

const local = { rules: { "no-comments": noComments } };

const houseRules = {
  "local/no-comments": "error",
  "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
};

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: { local },
    rules: houseRules,
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { local },
    rules: houseRules,
  },
  {
    files: ["src/containers/contexts/**/*.{ts,tsx}", "src/routes/router.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
);
