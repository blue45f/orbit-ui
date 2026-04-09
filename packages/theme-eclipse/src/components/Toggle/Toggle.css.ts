import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const root = style({
  display: 'inline-flex',
  position: 'relative',
  alignItems: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid transparent',
  borderRadius: '9999px',
  backgroundColor: vars.sem.color.fillSecondary,
  cursor: 'pointer',
  width: '44px',
  height: '24px',
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.sem.color.systemMainPrimary,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vars.sem.color.systemMainPrimary}40`,
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    }
  },
})

export const thumb = style({
  display: 'block',
  transform: 'translateX(3px)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: '9999px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  width: '18px',
  height: '18px',
  selectors: {
    '[data-state="checked"] &': {
      transform: 'translateX(21px)',
    }
  },
})
