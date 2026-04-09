import { ThemeProvider, LottieProvider } from '@orbit-ui/core'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Decorator, Preview } from '@storybook/react'
import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import '@orbit-ui/core/style.css'

import { lightTheme, darkTheme, textStyleTheme, highDensityTheme } from '../src/styles'

const injectGlobalStyles = () => {
  const styleId = 'storybook-modern-ui-fix'
  if (document.getElementById(styleId)) return

  const style = document.createElement('style')
  style.id = styleId
  style.innerHTML = `
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .sb-show-main {
      background-color: transparent !important;
    }

    .sbdocs-wrapper {
      background-color: #f8fafc !important; /* 부드러운 배경색 */
    }

    .sbdocs-content {
      max-width: 1100px !important;
      padding: 48px !important;
    }

    /* 스토리 블록 고도화 */
    .docs-story {
      background-color: #ffffff !important;
      margin-bottom: 4rem !important;
      border-radius: 16px !important;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.06) !important;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02) !important;
    }

    .dark .docs-story {
      background-color: #1e1e1e !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    /* 표(Table) 가독성 극대화 */
    .sbdocs table {
      width: 100% !important;
      border-collapse: separate !important;
      border-spacing: 0 !important;
      border-radius: 12px !important;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.08) !important;
      margin: 2.5rem 0 !important;
    }

    .sbdocs th {
      background-color: #f1f5f9 !important;
      padding: 16px 20px !important;
      font-weight: 600 !important;
      color: #334155 !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    }

    .sbdocs td {
      padding: 14px 20px !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
      color: #475569 !important;
    }

    /* 다크모드 대응 */
    .dark .sbdocs-wrapper { background-color: #0f172a !important; }
    .dark .sbdocs th { background-color: #1e293b !important; color: #cbd5e1 !important; border-color: rgba(255,255,255,0.1) !important; }
    .dark .sbdocs td { color: #94a3b8 !important; border-color: rgba(255,255,255,0.05) !important; }
    .dark .sbdocs table { border-color: rgba(255,255,255,0.1) !important; }
  `
  document.head.appendChild(style)
}

const prependThemeStyles = () => {
  const head = document.head
  const sharedStyles = head.querySelector('link[rel=stylesheet][href*="shared.css"]')
  const resetStyles = head.querySelector('link[rel=stylesheet][href*="reset.css"]')

  if (sharedStyles) {
    const copy = sharedStyles.cloneNode()
    head.prepend(copy)
    sharedStyles.remove()
  }

  if (resetStyles) {
    const copy = resetStyles.cloneNode()
    head.prepend(copy)
    resetStyles.remove()
  }
}

export const useThemeRoot: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light'
  const density = context.globals.density || 'standard'
  
  const themeClass = clsx(textStyleTheme.medium, {
    [lightTheme]: theme === 'light',
    [darkTheme]: theme === 'dark',
    [highDensityTheme]: density === 'high',
  })

  useLayoutEffect(() => {
    prependThemeStyles()
    injectGlobalStyles()
    
    // HTML 태그에 테마 클래스 추가 (문서 배경색 대응)
    document.documentElement.className = theme
  }, [theme])

  return (
    <ThemeProvider mode={theme} themeClass={themeClass}>
      <LottieProvider>
        <div 
          className="storybook-canvas-wrapper" 
          style={{ 
            padding: '4rem 3rem', 
            minHeight: '100vh', 
            boxSizing: 'border-box',
            backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
            backgroundImage: theme === 'light' 
              ? 'radial-gradient(#e2e8f0 1px, transparent 1px)' 
              : 'radial-gradient(#1e293b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3rem',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ 
            width: '100%', 
            maxWidth: '1000px',
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
          }}>
            <Story />
          </div>
        </div>
      </LottieProvider>
    </ThemeProvider>
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
    density: {
      name: 'Density',
      description: 'Global spacing density',
      defaultValue: 'standard',
      toolbar: {
        icon: 'grid',
        items: [
          { value: 'standard', title: 'Standard' },
          { value: 'high', title: 'High Density' },
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
        method: 'alphabetical',
      },
    },
  },
  decorators: [useThemeRoot],
}

export default preview
