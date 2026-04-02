import { dirname, join } from 'path'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src', '../*.mdx'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-storysource'),
  ],
  core: {
    builder: getAbsolutePath('@storybook/builder-vite'),
  },
  framework: getAbsolutePath('@storybook/react-vite'),
}

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

export default config
