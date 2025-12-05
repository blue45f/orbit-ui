import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../styles'

export const tail = recipe({
  base: {
    position: 'absolute',
    width: '9px',
    height: '5px',
  },
  variants: {
    color: {
      pink: {
        color: vars.com.bubbleBadge.variant.color.pink.fillColor,
      },
      blue: {
        color: vars.com.bubbleBadge.variant.color.blue.fillColor,
      },
    },
    position: {
      leading: {
        bottom: '0px',
        left: '7.7px',
        transform: 'scaleX(-1)',
      },
      trailing: {
        right: '7.7px',
        bottom: '0px',
      },
    },
  },
})
