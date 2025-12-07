import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../styles'

export const center = recipe({
  base: { display: 'inline-block' },
  variants: {
    size: {
      small: {
        paddingRight: vars.ref.spacing['25'],
        paddingLeft: vars.ref.spacing['25'],
      },
      medium: {
        paddingRight: vars.ref.spacing['50'],
        paddingLeft: vars.ref.spacing['50'],
      },
      large: {
        paddingRight: vars.ref.spacing['50'],
        paddingLeft: vars.ref.spacing['50'],
      },
    },
  },
})
