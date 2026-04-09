import { ref, referenceDarkTheme, referenceLightTheme, TextStyleBaseSize } from '@heejun-com/core'
import { style } from '@vanilla-extract/css'

import { com, componentDarkTheme, componentLightTheme } from './component-token'
import { semanticColorVars, semanticDarkTheme, semanticLightTheme } from './semantic-token'
import {
  largeTextStyleTheme,
  mediumTextStyleTheme,
  smallTextStyleTheme,
  textStyleVars,
  xLargeTextStyleTheme,
  xSmallTextStyleTheme,
  xxLargeTextStyleTheme,
  xxxLargeTextStyleTheme,
} from './text-style-token'

export const darkTheme = style([
  {
    vars: {
      ...referenceDarkTheme,
      ...semanticDarkTheme,
      ...componentDarkTheme,
    },
  },
])

export const lightTheme = style([
  {
    vars: {
      ...referenceLightTheme,
      ...semanticLightTheme,
      ...componentLightTheme,
    },
  },
])

export const textStyleTheme = {
  xSmall: style(xSmallTextStyleTheme),
  small: style(smallTextStyleTheme),
  medium: style(mediumTextStyleTheme),
  large: style(largeTextStyleTheme),
  xLarge: style(xLargeTextStyleTheme),
  xxLarge: style(xxLargeTextStyleTheme),
  xxxLarge: style(xxxLargeTextStyleTheme),
} satisfies Record<TextStyleBaseSize, string>

export const vars = {
  ref,
  sem: { color: semanticColorVars, textStyle: textStyleVars },
  com,
}
