import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/',
      '**/node_modules/',
      'dist/',
      '**/dist/',
      'build/',
      '**/build/',
      'coverage/',
      '**/coverage/',
      'storybook-static/',
      '**/storybook-static/',
      'test-results/',
      '**/test-results/',
      'playwright-report/',
      '**/playwright-report/',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.config.mjs',
      '**/*.config.*.timestamp-*',
      '**/*.d.ts',
      '**/pnpm-lock.yaml',
      'packages/eslint-plugin/**',
      'packages/generator/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx,mts,cts,mtsx,ctsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    settings: {
      // 'detect'는 eslint-plugin-react@7.37.5가 ESLint 10에서 제거된
      // context.getFilename()을 호출해 크래시한다. 카탈로그 React 버전을 고정한다.
      react: { version: '19.2' },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // TypeScript compiler handles undefined-symbol resolution; ESLint's no-undef
      // double-reports imported types/React. Disable in favor of tsc.
      'no-undef': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',

      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],

      'import/no-duplicates': 'warn',
      'import/no-unresolved': 'off',
      'import/named': 'off',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  {
    files: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      // 테스트/스토리에서 의도적 falsy 분기 (e.g. `{false && <X />}`)는 패턴.
      'no-constant-binary-expression': 'off',
    },
  },

  {
    // Node.js 스크립트 파일은 node 글로벌이 필요.
    files: ['**/*.cjs', '**/scripts/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['**/e2e/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },

  // prettier 충돌 비활성화는 항상 마지막
  prettierConfig,
]
