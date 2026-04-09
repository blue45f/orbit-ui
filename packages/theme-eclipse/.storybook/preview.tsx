import { EclipseProvider } from '../src/components/EclipseProvider'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Decorator, Preview } from '@storybook/react'
import { useLayoutEffect } from 'react'

const injectGlobalStyles = () => {
  const styleId = 'storybook-modern-ui-fix'
  if (document.getElementById(styleId)) return

  const style = document.createElement('style')
  style.id = styleId
  style.innerHTML = `
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 0;
    }
    
    .sb-show-main {
      background-color: transparent !important;
    }

    .sbdocs-wrapper {
      background-color: #f8fafc !important;
    }

    .dark .sbdocs-wrapper {
      background-color: #0f172a !important;
    }

    .sbdocs-content {
      max-width: 1100px !important;
      padding: 48px !important;
    }

    /* Table styles for MDX */
    .sbdocs table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 2rem 0 !important;
      border-radius: 8px !important;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
    }

    .sbdocs th {
      background-color: #f1f5f9 !important;
      padding: 12px 16px !important;
      text-align: left !important;
      font-weight: 600 !important;
      border: 1px solid #e2e8f0 !important;
    }

    .sbdocs td {
      padding: 12px 16px !important;
      border: 1px solid #e2e8f0 !important;
      background-color: #ffffff !important;
    }

    .dark .sbdocs th {
      background-color: #1e293b !important;
      border-color: #334155 !important;
      color: #f1f5f9 !important;
    }

    .dark .sbdocs td {
      background-color: #0f172a !important;
      border-color: #334155 !important;
      color: #cbd5e1 !important;
    }
  `
  document.head.appendChild(style)
}

export const useThemeRoot: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light'

  useLayoutEffect(() => {
    injectGlobalStyles()
    document.documentElement.className = theme
    document.body.className = theme
  }, [theme])

  return (
    <EclipseProvider mode={theme}>
      <div 
        className="storybook-canvas-wrapper" 
        style={{ 
          minHeight: '100vh', 
          backgroundColor: 'var(--sem-color-background-primary)',
          color: 'var(--sem-color-foreground-primary)',
          padding: '2rem',
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
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    options: {
      storySort: {
        order: ['0. Intro', 'eclipse', '7. Utils', '8. Internal'],
        method: 'alphabetical',
      },
    },
  },
  decorators: [useThemeRoot],
}

export default preview
