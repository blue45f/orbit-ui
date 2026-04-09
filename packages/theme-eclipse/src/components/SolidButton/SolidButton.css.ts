import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../styles'

export const root = style({
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  ':active': {
    transform: 'scale(0.96)',
  },
  ':focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 3px ${vars.sem.color.systemMainPrimary}40`,
  }
})

export const center = recipe({
  base: { 
    display: 'inline-block',
    letterSpacing: '-0.01em',
    fontWeight: 600,
  },
  variants: {
    size: {
      small: {
        paddingRight: vars.ref.spacing['25'],
        paddingLeft: vars.ref.spacing['25'],
        fontSize: '13px',
      },
      medium: {
        paddingRight: vars.ref.spacing['50'],
        paddingLeft: vars.ref.spacing['50'],
        fontSize: '15px',
      },
      large: {
        paddingRight: vars.ref.spacing['50'],
        paddingLeft: vars.ref.spacing['50'],
        fontSize: '17px',
      },
    },
  },
})
