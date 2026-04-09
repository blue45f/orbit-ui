import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const container = style({
  border: `1px solid ${vars.sem.color.borderSecondary}`,
  borderRadius: '12px',
  boxShadow: vars.sem.color.shadowLevel1,
  backgroundColor: vars.sem.color.surfaceContainer,
  padding: '1rem',
  width: 'fit-content',
})

export const day_selected = style({
  borderRadius: '8px !important',
  backgroundColor: `${vars.sem.color.systemMainPrimary} !important`,
  fontWeight: 'bold',
  color: `${vars.sem.color.foregroundInverted} !important`,
})

export const day_today = style({
  borderRadius: '8px',
  backgroundColor: vars.sem.color.fillSecondary,
  fontWeight: 'bold',
  color: vars.sem.color.systemMainPrimary,
})

export const day = style({
  transition: 'all 0.2s ease',
  borderRadius: '8px',
  selectors: {
    '&:hover:not([aria-selected])': {
      backgroundColor: vars.sem.color.fillHovered,
    },
  },
})
