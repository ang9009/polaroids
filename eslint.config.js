import pluginJs from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/dist/**"],
  },
  {
    files: ["src/**/*.{ts}"],
    plugins: { jsdoc },
    rules: {
      eqeqeq: ["error", "always"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "jsdoc/require-description": "warn",
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
  },
  { languageOptions: { globals: globals.browser } },
  jsdoc.configs["flat/recommended-typescript"],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
