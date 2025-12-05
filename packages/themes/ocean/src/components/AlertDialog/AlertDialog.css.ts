import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '../../styles'

const alertTheme = vars.com.alert

export const top = style({
  paddingBottom: alertTheme.topPaddingBottom,
})

export const bottom = style({
  width: '100%',
})

globalStyle(`${bottom} > *`, {
  flexGrow: 1,
})
