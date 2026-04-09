import { addons } from '@storybook/manager-api'

import brandTheme from './BrandTheme'

addons.setConfig({
  theme: brandTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Internal'],
  },
  enableShortcuts: true,
})
