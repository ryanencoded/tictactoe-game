module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {},
    settings: {
      'import/resolver': {
        typescript: {}, // this loads <root>/tsconfig.json to eslint
      },
    },
  };