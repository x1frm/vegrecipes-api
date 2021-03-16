module.exports = {
  env: {
    node: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jest', 'import'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'no-console': 1,
    'import/extensions': [2, 'always', { ignorePackages: true, pattern: { ts: 'never' } }],
    'no-void': 0,
    'import/prefer-default-export': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
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
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/no-unsafe-member-access': 1,
        '@typescript-eslint/no-unsafe-call': 1,
        'import/prefer-default-export': 0,
        'jest/expect-expect': 0,
      },
      overrides: [
        {
          files: ['*.test.*'],
          rules: {
            'no-underscore-dangle': 0,
            '@typescript-eslint/no-unsafe-member-access': 0,
          },
        },
      ],
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
