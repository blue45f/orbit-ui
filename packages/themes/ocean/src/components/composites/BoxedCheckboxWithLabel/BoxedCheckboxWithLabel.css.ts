import { reset } from '@prism-ui/core'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const alignItems = createVar()

export const container = recipe({
  base: [
    reset.div,
    {
      display: 'inline-flex',
      alignItems,
    },
  ],
  variants: {
    fullWidth: {
      true: {
        display: 'flex',
      },
    },
  },
})

export const checkboxWrapper = style({
  flexShrink: 0,
})

export const label = recipe({
  base: [
    reset.label,
    {
      minHeight: 24,
    },
  ],
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    disabled: {
      true: {
        opacity: 0.3,
      },
    },
  },
})

export const labelText = style({
  display: 'inline-block',
  marginLeft: 4,
  verticalAlign: 'middle',
})
