import { reset } from '@ui-forge/core'
import { style } from '@vanilla-extract/css'

export const fieldset = style([
  reset.fieldset,
  {
    border: 'none',
  },
])
