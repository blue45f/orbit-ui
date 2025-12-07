import { style } from '@vanilla-extract/css'

import { vars } from '../../styles'

export const captionWrapper = style({
  gap: vars.ref.spacing['50'],
})

export const caption = style({
  whiteSpace: 'nowrap',
})

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
