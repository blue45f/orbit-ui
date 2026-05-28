import { EclipseProvider } from '../src/components/EclipseProvider'
import type { Decorator, Preview } from '@storybook/react'
import { useEffect } from 'react'

import './preview.css'
import { STORYBOOK_GLOBAL_TYPES, STORYBOOK_VIEWPORTS } from './storybook-config'

type ThemeMode = 'light' | 'dark'
type PlatformMode = 'mobile' | 'pc'
type BaseTextSize = 'small' | 'medium' | 'large'

const asThemeMode = (value: unknown): ThemeMode => (value === 'dark' ? 'dark' : 'light')

const asPlatformMode = (value: unknown): PlatformMode => (value === 'mobile' ? 'mobile' : 'pc')

const asBaseTextSize = (value: unknown): BaseTextSize => {
  if (value === 'small' || value === 'large') {
    return value
  }

  return 'medium'
}

export const useThemeRoot: Decorator = (Story, context) => {
  const theme = asThemeMode(context.globals.theme)
  const platform = asPlatformMode(context.globals.platform)
  const baseTextSize = asBaseTextSize(context.globals.baseTextSize)
  const isFullscreen = context.parameters.layout === 'fullscreen'
  const storyTitle = context.title ?? ''
  const isFullscreenCanvas =
    isFullscreen && (storyTitle.startsWith('Templates') || storyTitle.startsWith('Intro'))

  useEffect(() => {
    const previousTheme = theme === 'dark' ? 'light' : 'dark'

    document.documentElement.classList.remove(previousTheme)
    document.documentElement.classList.add(theme)
    document.documentElement.dataset.eclipseTheme = theme
    document.documentElement.dataset.eclipsePlatform = platform
    document.documentElement.dataset.eclipseTextSize = baseTextSize

    document.body.classList.remove(previousTheme)
    document.body.classList.add(theme)
  }, [baseTextSize, platform, theme])

  const canvasClassName = [
    'storybook-canvas-wrapper',
    isFullscreenCanvas ? 'storybook-canvas-wrapper--fullscreen' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <EclipseProvider mode={theme} platform={platform} baseTextSize={baseTextSize}>
      <div className={canvasClassName}>
        <Story />
      </div>
    </EclipseProvider>
  )
}

const preview: Preview = {
  globalTypes: STORYBOOK_GLOBAL_TYPES,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    viewport: {
      viewports: STORYBOOK_VIEWPORTS,
    },
    options: {
      storySort: {
        order: [
          'Intro',
          [
            '소개',
            '시작하기',
            '컴포넌트 개요',
            '훅',
            '디자인토큰',
            '아이콘 카탈로그',
            '이미지 카탈로그',
            '아키텍처',
            '테마 가이드',
            '커스터마이징',
            '접근성',
            '마이그레이션',
          ],
          'Templates',
          'eclipse',
          [
            'EclipseProvider',
            'Actions',
            ['Buttons', 'Chips', 'Tabs'],
            'Inputs',
            ['Text Fields', 'Selection', 'Pickers', 'Editor'],
            'Data Display',
            'Feedback',
            'Navigation',
            'Layout',
          ],
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
