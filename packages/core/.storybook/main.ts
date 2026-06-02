import { createRequire } from 'node:module'
import { dirname, join } from 'path'

import type { StorybookConfig } from '@storybook/react-vite'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ['../src', '../*.mdx'],
  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-a11y')],
  framework: getAbsolutePath('@storybook/react-vite'),
}

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

export default config
