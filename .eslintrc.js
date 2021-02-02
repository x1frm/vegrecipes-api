module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'jest', 'import'],
  rules: {
    'no-console': 'off',
    'arrow-parens': [2, 'as-needed'],
    'import/extensions': [2, 'never'],
    'jest/expect-expect': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './'],
        paths: ['./'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
};
