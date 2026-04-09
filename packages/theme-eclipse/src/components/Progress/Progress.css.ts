import { keyframes } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '../../styles/theme.css'

const indeterminate = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '50%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(100%)' },
})

export const root = recipe({
  base: {
    position: 'relative',
    borderRadius: '9999px',
    backgroundColor: vars.sem.color.fillSecondary,
    width: '100%',
    overflow: 'hidden',
  },
  variants: {
    size: {
      small: { height: '4px' },
      medium: { height: '8px' },
      large: { height: '12px' },
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})

export const indicator = recipe({
  base: {
    flex: 1,
    transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
    width: '100%',
    height: '100%',
  },
  variants: {
    color: {
      primary: { backgroundColor: vars.sem.color.systemMainPrimary },
      success: { backgroundColor: vars.sem.color.systemMainTertiary }, 
      warning: { backgroundColor: vars.sem.color.systemSubPrimary }, 
    },
    indeterminate: {
      true: {
        width: '50%',
        animation: `${indeterminate} 1.5s infinite linear`,
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})
