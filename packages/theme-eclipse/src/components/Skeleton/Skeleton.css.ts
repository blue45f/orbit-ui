import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.4 },
  '100%': { opacity: 1 },
})

export const skeleton = style({
  borderRadius: '8px',
  backgroundColor: vars.sem.color.fillSecondary,
  width: '100%',
  minHeight: '1rem',
  animation: `${pulse} 1.5s ease-in-out infinite`,
})
