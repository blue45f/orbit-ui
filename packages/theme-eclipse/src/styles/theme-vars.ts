import { ref , TextStyleBaseSize } from '@heejun-com/core'

import { com } from './component-token'
import { semanticColorVars } from './semantic-token'
import { textStyleVars } from './text-style-token'

// Theme class names (plain CSS classes defined in theme.css)
export const lightTheme = 'eclipse-light'
export const darkTheme = 'eclipse-dark'

// Text style theme classes
export const textStyleTheme = {
  xSmall: 'text-size-xSmall',
  small: 'text-size-small',
  medium: 'text-size-medium',
  large: 'text-size-large',
  xLarge: 'text-size-xLarge',
  xxLarge: 'text-size-xxLarge',
  xxxLarge: 'text-size-xxxLarge',
} satisfies Record<TextStyleBaseSize, string>

// Design token variables object (CSS variable references)
export const vars = {
  ref,
  sem: { color: semanticColorVars, textStyle: textStyleVars },
  com,
}
