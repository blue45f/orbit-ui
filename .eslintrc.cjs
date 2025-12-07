module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', '@prism-ui/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.css.ts'],
      rules: {
        '@prism-ui/css-concentric-order': 'warn',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx', '*.stories.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/e2e/**/*.ts', '**/e2e/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-require-imports': 'off',

    // React
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],

    // Import
    'import/no-duplicates': 'warn',
    'import/no-unresolved': 'off',
    'import/named': 'off',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    'storybook-static/',
    '*.config.js',
    '*.config.ts',
    '*.config.mjs',
    'pnpm-lock.yaml',
  ],
}
