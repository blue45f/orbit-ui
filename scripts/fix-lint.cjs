const fs = require('fs')
const files = [
  'packages/theme-eclipse/src/components/Accordion/Accordion.stories.tsx',
  'packages/theme-eclipse/src/components/Accordion/Accordion.tsx',
  'packages/theme-eclipse/src/components/Popover/Popover.stories.tsx',
  'packages/theme-eclipse/src/components/Popover/Popover.tsx',
  'packages/theme-eclipse/src/components/Progress/Progress.stories.tsx',
  'packages/theme-eclipse/src/components/Skeleton/Skeleton.stories.tsx',
  'packages/theme-eclipse/src/components/Skeleton/Skeleton.tsx',
  'packages/theme-eclipse/src/components/Slider/Slider.stories.tsx',
  'packages/theme-eclipse/src/components/Switch/Switch.stories.tsx',
  'packages/theme-eclipse/src/components/Switch/Switch.tsx',
  'packages/theme-eclipse/src/components/Toast/Toast.stories.tsx',
  'packages/theme-eclipse/src/components/Tooltip/Tooltip.stories.tsx',
]

files.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8')
    // Remove unused React import (import React from 'react')
    content = content.replace(/^import React from 'react'\n/gm, '')
    content = content.replace(/^import React, \{/gm, 'import {')
    // Remove unused PropsWithChildren
    content = content.replace(/PropsWithChildren, /g, '')
    content = content.replace(/, PropsWithChildren/g, '')
    // Remove unused forwardRef
    content = content.replace(/forwardRef, /g, '')
    content = content.replace(/, forwardRef/g, '')
    // Remove unused vars import
    content = content.replace(/^import \{ vars \} from '\.\.\/\.\.\/styles'\n/gm, '')

    fs.writeFileSync(file, content, 'utf-8')
  }
})
