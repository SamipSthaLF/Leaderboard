/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['eslint-config-prettier', '@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  },
  globals: {
    window: true
  },
  env: {
    jest: true
  }
};
