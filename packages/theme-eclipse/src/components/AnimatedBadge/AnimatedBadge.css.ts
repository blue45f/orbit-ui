import { recipe } from '@vanilla-extract/recipes'

export const slotLeading = recipe({
  variants: {
    size: {
      small: { width: 10, height: 10 },
      large: { width: 14, height: 14 },
    },
  },
})
