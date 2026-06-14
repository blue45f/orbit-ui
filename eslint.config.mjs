import { base, react, defineConfig } from '@heejun/eslint-config'
import { globalIgnores } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

export default defineConfig(
  globalIgnores([
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
  ]),

  // 공통 TypeScript flat config (@eslint/js + typescript-eslint + import-x 정렬 + prettier 충돌 비활성).
  base({ files: ['**/*.{ts,tsx}'] }),

  // React 19 flat config: react-hooks + react-refresh(vite) + jsx-a11y. 패키지 소스에만 적용.
  react({ files: ['packages/*/src/**/*.{ts,tsx}'] }),

  // 특례: orbit-ui는 의도적으로 SWC를 쓰고 React Compiler를 채택하지 않는다(owner 승인).
  // RC 게이트 및 react-hooks v7의 RC-진단 패밀리는 여기선 오탐/노이즈이므로 비활성화한다.
  // rules-of-hooks + exhaustive-deps(실제 버그 검출)는 그대로 ON으로 유지한다.
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-compiler/react-compiler': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },

  // 특례: react-refresh/only-export-components는 Vite Fast Refresh DX 규칙이다.
  // orbit-ui는 SWC로 빌드해 퍼블리시하는 컴포넌트 라이브러리로, 파일당 다중 컴포넌트·타입·
  // 헬퍼를 export하는 디자인 시스템 패턴이 의도된 것이다(HMR 앱이 아님) — 소스에서 끈다.
  {
    files: ['packages/*/src/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // 디자인 시스템 자세(기존 eslint.config.mjs에서 보존):
  // TS 컴파일러가 미정의 심볼을 처리하므로 no-undef는 끈다(타입/React 이중 보고 방지).
  // no-console은 warn/error만 허용.
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      'no-undef': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // 테스트/스토리: 의도적 any·console·falsy 분기 패턴 허용. 스토리는 non-component export가 정상이므로
  // react-refresh/only-export-components를 끈다(react()는 test/spec만 끄고 stories는 끄지 않음).
  // jsx-a11y: 스토리·테스트는 시연/픽스처 마크업이지 라이브러리의 출하 API가 아니다 — 끈다.
  // (실제 접근성 계약은 컴포넌트 소스에서 강제된다.)
  {
    files: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'no-constant-binary-expression': 'off',
      'react-refresh/only-export-components': 'off',
      ...Object.fromEntries(Object.keys(jsxA11y.rules).map((name) => [`jsx-a11y/${name}`, 'off'])),
    },
  },

  // Node.js CommonJS 스크립트는 node 글로벌·commonjs가 필요.
  {
    files: ['**/*.cjs', '**/scripts/**/*.{js,cjs}'],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // ESM 스크립트(.mjs)는 module sourceType + node 글로벌. (commonjs로 강제하면 import 파싱 실패)
  {
    files: ['**/*.mjs', '**/scripts/**/*.mjs'],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'module',
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // e2e 스펙은 진단 출력에 console을 쓴다.
  {
    files: ['**/e2e/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  }
)
