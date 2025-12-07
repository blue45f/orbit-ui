import { style } from '@vanilla-extract/css'

export const clearButton = style({
  width: 24,
  height: 24,
  overflow: 'visible',
})

export const iconButton = style({
  selectors: {
    [`${clearButton} > &`]: {
      flexShrink: 0,
    },
  },
})
