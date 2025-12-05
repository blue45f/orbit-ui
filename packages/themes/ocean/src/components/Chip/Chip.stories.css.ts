import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '../../styles'

export const table = style({
  border: `1px solid ${vars.sem.color.borderPrimary}`,
  borderRadius: vars.ref.radius.medium,
})

globalStyle(`${table} th, ${table} td`, {
  padding: vars.ref.spacing[100],
})

globalStyle(`${table} th`, {
  backgroundColor: vars.sem.color.backgroundPrimary,
})
