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
    'plugin:security/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jest', 'import', 'security'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'no-console': 1,
    'import/extensions': [2, 'always', { ignorePackages: true, pattern: { ts: 'never' } }],
    'no-void': 0,
    'jest/expect-expect': 0,
    'no-return-await': 0,
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 2,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/no-unsafe-member-access': 1,
        '@typescript-eslint/no-unsafe-call': 1,
        'import/prefer-default-export': 0,
        'no-return-await': 0,
        'class-methods-use-this': 0,
      },
      overrides: [
        {
          files: ['*.test.*', '**/test/**'],
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
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
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
