import { create } from '@storybook/theming/create'

export default create({
  base: 'dark',

  // Brand
  brandTitle: 'Orbit UI',
  brandUrl: '/',

  // Colors
  colorPrimary: '#6366f1',
  colorSecondary: '#818cf8',

  // UI
  appBg: '#0f0f1a',
  appContentBg: '#13131f',
  appPreviewBg: '#ffffff',
  appBorderColor: '#1e1e3a',
  appBorderRadius: 12,

  // Text
  textColor: '#e2e8f0',
  textInverseColor: '#0f172a',
  textMutedColor: '#64748b',

  // Toolbar
  barTextColor: '#94a3b8',
  barSelectedColor: '#818cf8',
  barHoverColor: '#a5b4fc',
  barBg: '#0f0f1a',

  // Form
  inputBg: '#1a1a2e',
  inputBorder: '#2d2d5e',
  inputTextColor: '#e2e8f0',
  inputBorderRadius: 8,

  // Typography
  fontBase: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
})
