import { ThemeProvider, LottieProvider } from '@prism-ui/core'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Decorator, Preview } from '@storybook/react'
import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import '@prism-ui/core/style.css'

import { lightTheme, darkTheme, textStyleTheme } from '../src/styles'

// 스토리북 개발 환경과 빌드 환경에서 코어 스타일 우선순위가 달라지는 이슈를 우회하기 위함
const prependClayRootStyles = () => {
  const head = document.head
  // NOTE: canary는 코어 패키지가 분리되지 않아 초기화 스타일 위치가 다름
  // reset, shared 순으로 재배치
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

export const useClayRoot: Decorator = (Story, context) => {
  const theme = context.globals.backgrounds?.value === '#333333' ? 'dark' : 'light'
  const themeClass = clsx(textStyleTheme.medium, {
    [lightTheme]: theme === 'light',
    [darkTheme]: theme === 'dark',
  })

  useLayoutEffect(() => {
    prependClayRootStyles()
  }, [])

  return (
    //NOTE: themeClass는 필수 prop 에러를 방지하기위해 의미없는 core라는 themeClass를 추가
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
        excludeDecorators: true, // Show code 에서 <No Display Name /> 로 표시되는 문제 해결
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [useClayRoot],
}

export default preview
