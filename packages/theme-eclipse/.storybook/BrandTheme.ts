import { create } from 'storybook/theming'

export default create({
  base: 'dark',

  // Brand
  brandTitle: 'Orbit UI',
  brandUrl: '/',

  // Colors — system blue (primary5 / primary4) instead of Tailwind indigo
  colorPrimary: '#2563eb',
  colorSecondary: '#60a5fa',

  // UI — calm slate, no purple cast
  appBg: '#0f1216',
  appContentBg: '#14181d',
  appPreviewBg: '#ffffff',
  appBorderColor: '#262c34',
  appBorderRadius: 10,

  // Text
  textColor: '#eef2f6',
  textInverseColor: '#181a1c',
  textMutedColor: '#7c8694',

  // Toolbar
  barTextColor: '#9ba5b2',
  barSelectedColor: '#7aa2ff',
  barHoverColor: '#a8c0ff',
  barBg: '#0f1216',

  // Form
  inputBg: '#1a1f25',
  inputBorder: '#2b323b',
  inputTextColor: '#eef2f6',
  inputBorderRadius: 8,

  // Typography
  fontBase:
    '"Pretendard Variable", "Pretendard", system-ui, "Segoe UI", "Noto Sans KR", "Malgun Gothic", sans-serif',
  fontCode:
    '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
})
