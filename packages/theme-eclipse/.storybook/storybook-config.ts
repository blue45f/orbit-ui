import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export const STORYBOOK_GLOBAL_TYPES = {
  theme: {
    name: 'Theme',
    description: 'Component color mode',
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
  platform: {
    name: 'Platform',
    description: 'Component density and platform token mode',
    defaultValue: 'pc',
    toolbar: {
      icon: 'browser',
      items: [
        { value: 'pc', title: 'PC' },
        { value: 'mobile', title: 'Mobile' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  baseTextSize: {
    name: 'Text',
    description: 'Base text scale',
    defaultValue: 'medium',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'small', title: 'Small' },
        { value: 'medium', title: 'Medium' },
        { value: 'large', title: 'Large' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
} as const

export const STORYBOOK_VIEWPORTS = {
  ...INITIAL_VIEWPORTS,
  compactMobile: {
    name: 'Compact mobile',
    styles: {
      width: '360px',
      height: '740px',
    },
  },
  productDesktop: {
    name: 'Product desktop',
    styles: {
      width: '1280px',
      height: '900px',
    },
  },
  wideDesktop: {
    name: 'Wide desktop',
    styles: {
      width: '1440px',
      height: '960px',
    },
  },
}
