import { reset } from '@heejun-com/core'
import { style } from '@vanilla-extract/css'

export const fieldset = style([
  reset.fieldset,
  {
    border: 'none',
  },
])
