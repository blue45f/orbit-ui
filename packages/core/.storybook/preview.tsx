import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Decorator, Preview } from '@storybook/react'

import { ThemeProvider, LottieProvider } from '../src/components/primitives'

// Import global styles
import '../src/styles/globals.css'

export const useThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals.backgrounds?.value === '#333333' ? 'dark' : 'light'
  const themeClass = theme === 'dark' ? 'dark' : ''

  return (
    <ThemeProvider mode={theme} themeClass={themeClass}>
      <LottieProvider>
        <div style={{ margin: '1rem' }}>
          <Story />
        </div>
      </LottieProvider>
    </ThemeProvider>
  )
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        Fold: {
          name: 'Galaxy Fold',
          styles: {
            height: '653px',
            width: '280px',
          },
          type: 'mobile',
        },
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [useThemeProvider],
}

export default preview
