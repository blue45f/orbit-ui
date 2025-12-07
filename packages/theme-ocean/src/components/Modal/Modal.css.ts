import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '../../styles'

export const root = style({})

export const top = style({
  flexGrow: 1,
  flexShrink: 0,
  paddingTop: vars.ref.spacing[300],
  paddingRight: vars.ref.spacing[250],
  paddingBottom: vars.ref.spacing[200],
  paddingLeft: vars.ref.spacing[250],
  maxHeight: '568px',
  overflowY: 'auto',
})

export const bottom = style({
  flexGrow: 1,
  flexShrink: 0,
  width: '100%',
})

export const bottomWithGradient = style({
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%)',
    pointerEvents: 'none',
    height: '16px',
  },
})

globalStyle(`${bottom} > *`, {
  flexGrow: 1,
})
