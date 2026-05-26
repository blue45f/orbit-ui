import { dirname, join } from 'path'

import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../*.mdx',
    '../../core/src/**/primitives/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  core: {
    builder: getAbsolutePath('@storybook/builder-vite'),
  },
  framework: getAbsolutePath('@storybook/react-vite'),
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          onwarn(warning: { code?: string; id?: string }, warn: (warning: unknown) => void) {
            if (warning.code === 'EVAL' && warning.id?.includes('@storybook/core')) {
              return
            }

            warn(warning)
          },
        },
      },
    }),
}

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

export default config
