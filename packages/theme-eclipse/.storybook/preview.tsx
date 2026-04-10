import { EclipseProvider } from '../src/components/EclipseProvider'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Decorator, Preview } from '@storybook/react'
import { useLayoutEffect } from 'react'

const injectGlobalStyles = () => {
  const styleId = 'storybook-orbit-ui-premium'
  if (document.getElementById(styleId)) return

  const style = document.createElement('style')
  style.id = styleId
  style.innerHTML = `
    /* ═══════════════════════════════════════════════
       Orbit UI - Premium Storybook Styles
       ═══════════════════════════════════════════════ */

    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.min.css');

    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 0;
      font-family: "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", sans-serif;
    }

    .sb-show-main {
      background-color: transparent !important;
    }

    /* ─── Docs Page Styling ─── */

    .sbdocs-wrapper {
      background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) !important;
    }

    .dark .sbdocs-wrapper {
      background: linear-gradient(180deg, #0c0c18 0%, #0f172a 100%) !important;
    }

    .sbdocs-content {
      max-width: 1100px !important;
      padding: 48px !important;
    }

    /* ─── MDX Typography ─── */

    .sbdocs h1 {
      font-weight: 800 !important;
      letter-spacing: -0.03em !important;
      line-height: 1.2 !important;
    }

    .sbdocs h2 {
      font-weight: 700 !important;
      letter-spacing: -0.02em !important;
      margin-top: 3rem !important;
    }

    .sbdocs h3 {
      font-weight: 600 !important;
      letter-spacing: -0.01em !important;
    }

    .sbdocs p {
      line-height: 1.75 !important;
      color: #475569 !important;
    }

    .dark .sbdocs p {
      color: #94a3b8 !important;
    }

    .sbdocs a {
      color: #6366f1 !important;
      text-decoration: none !important;
      font-weight: 500 !important;
      transition: color 0.15s ease;
    }

    .sbdocs a:hover {
      color: #818cf8 !important;
      text-decoration: underline !important;
    }

    /* ─── Code Blocks ─── */

    .sbdocs pre {
      border-radius: 12px !important;
      border: 1px solid #e2e8f0 !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03) !important;
      font-size: 13px !important;
      line-height: 1.7 !important;
    }

    .dark .sbdocs pre {
      border-color: #1e293b !important;
      background: #0d0d19 !important;
    }

    .sbdocs code {
      font-family: "JetBrains Mono", "Fira Code", "SF Mono", Menlo, monospace !important;
      font-size: 0.875em !important;
    }

    .sbdocs :not(pre) > code {
      background: #f1f5f9 !important;
      color: #6366f1 !important;
      padding: 2px 6px !important;
      border-radius: 6px !important;
      font-weight: 500 !important;
    }

    .dark .sbdocs :not(pre) > code {
      background: #1e1e3a !important;
      color: #a5b4fc !important;
    }

    /* ─── Tables ─── */

    .sbdocs table {
      width: 100% !important;
      border-collapse: separate !important;
      border-spacing: 0 !important;
      margin: 2rem 0 !important;
      border-radius: 12px !important;
      overflow: hidden;
      border: 1px solid #e2e8f0 !important;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04) !important;
    }

    .sbdocs th {
      background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) !important;
      padding: 12px 16px !important;
      text-align: left !important;
      font-weight: 600 !important;
      font-size: 13px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #475569 !important;
      border-bottom: 1px solid #e2e8f0 !important;
    }

    .sbdocs td {
      padding: 12px 16px !important;
      border-bottom: 1px solid #f1f5f9 !important;
      background-color: #ffffff !important;
      font-size: 14px !important;
      color: #334155 !important;
    }

    .sbdocs tr:last-child td {
      border-bottom: none !important;
    }

    .dark .sbdocs table {
      border-color: #1e293b !important;
    }

    .dark .sbdocs th {
      background: linear-gradient(180deg, #131325 0%, #0f172a 100%) !important;
      border-color: #1e293b !important;
      color: #94a3b8 !important;
    }

    .dark .sbdocs td {
      background-color: #0c0c18 !important;
      border-color: #1e293b !important;
      color: #cbd5e1 !important;
    }

    /* ─── Blockquotes ─── */

    .sbdocs blockquote {
      border-left: 3px solid #6366f1 !important;
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.04) 0%, transparent 100%) !important;
      padding: 16px 20px !important;
      border-radius: 0 8px 8px 0 !important;
      margin: 1.5rem 0 !important;
    }

    .sbdocs blockquote p {
      color: #334155 !important;
      margin: 0 !important;
    }

    .dark .sbdocs blockquote {
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.08) 0%, transparent 100%) !important;
    }

    .dark .sbdocs blockquote p {
      color: #cbd5e1 !important;
    }

    /* ─── HR Divider ─── */

    .sbdocs hr {
      border: none !important;
      height: 1px !important;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent) !important;
      margin: 3rem 0 !important;
    }

    .dark .sbdocs hr {
      background: linear-gradient(90deg, transparent, #1e293b, transparent) !important;
    }

    /* ─── Lists ─── */

    .sbdocs ul, .sbdocs ol {
      padding-left: 1.5em !important;
    }

    .sbdocs li {
      line-height: 1.75 !important;
      color: #475569 !important;
      margin-bottom: 0.25rem !important;
    }

    .dark .sbdocs li {
      color: #94a3b8 !important;
    }

    /* ─── Scrollbar ─── */

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .dark ::-webkit-scrollbar-thumb {
      background: #334155;
    }

    .dark ::-webkit-scrollbar-thumb:hover {
      background: #475569;
    }

    /* ─── Selection ─── */

    ::selection {
      background: rgba(99, 102, 241, 0.2);
      color: inherit;
    }

    /* ─── Story Canvas Polish ─── */

    .storybook-canvas-wrapper {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  `
  document.head.appendChild(style)
}

export const useThemeRoot: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light'
  const isFullscreen = context.parameters.layout === 'fullscreen'

  useLayoutEffect(() => {
    injectGlobalStyles()
    const prev = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove(prev)
    document.documentElement.classList.add(theme)
    document.body.classList.remove(prev)
    document.body.classList.add(theme)
  }, [theme])

  return (
    <EclipseProvider mode={theme}>
      <div
        className="storybook-canvas-wrapper"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--sem-eclipse-color-backgroundPrimary)',
          color: 'var(--sem-eclipse-color-foregroundPrimary)',
          padding: isFullscreen ? '0' : '1.5rem 2rem',
          boxSizing: 'border-box'
        }}
      >
        <Story />
      </div>
    </EclipseProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    options: {
      storySort: {
        order: [
          'Intro',
          ['소개', '시작하기', '컴포넌트 개요', '디자인토큰', '아이콘 카탈로그', '이미지 카탈로그', '아키텍처', '테마 가이드'],
          'Templates',
          'eclipse',
          ['Actions', 'Inputs', 'Data Display', 'Feedback', 'Navigation', 'Layout'],
          'Utils',
          'Internal',
        ],
        method: 'alphabetical',
      },
    },
    docs: {
      toc: {
        headingSelector: 'h2, h3',
        title: 'Table of Contents',
      },
      source: {
        excludeDecorators: true,
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  decorators: [useThemeRoot],
}

export default preview
