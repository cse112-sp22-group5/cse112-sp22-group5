module.exports = {
  plugins: ["jasmine"],
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  globals: {
    global: "writable",
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "error",
  },
};
