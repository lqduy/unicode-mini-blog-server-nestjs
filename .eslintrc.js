module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-var": "error",
    semi: [2, "always"],
    quotes: [2, "double"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "es5",
      },
    ],
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "no-return-await": "off",
    "@typescript-eslint/return-await": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // `react` first, `next` second, then packages starting with a character
              ["@nestjs", "^nest", "^[a-z]"],
              // Packages starting with `@`
              ["^@src"],
              // Packages starting with `~`
              ["^~"],
              // Imports starting with `../`
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Imports starting with `./`
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Assets imports
              ["^.+\\.(jpg|jpeg|png|gif|webp|svg)$"],
              // Side effect imports
              ["^\\u0000"],
            ],
          },
        ],
      },
    },
  ],
};
