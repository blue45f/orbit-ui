import { dirname, join } from 'path'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.mdx',
    '../*.mdx',
    '../../core/src/**/primitives/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  core: {
    builder: getAbsolutePath('@storybook/builder-vite'),
  },
  framework: getAbsolutePath('@storybook/react-vite'),
  docs: {
    autodocs: 'tag',
  },
}

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

export default config
