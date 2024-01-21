module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "public"],
  parserOptions: { sourceType: "module" },
  rules: {
    "no-unused-vars": "off",
  },
};
