/* ========================================================================
 * Style Type Definitions
 * ======================================================================== */

/* Text Style Types */
export type TextStyleBaseSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge'

export type TextStyleLineHeightToken = string
export type TextStyleSizeToken = string
export type TextStyleWeightToken = string
export type TextStyleTrackingToken = string
export type TextStyleFaceToken = string

export type TextStyleThemeKey =
  | 'textStyleLineHeight'
  | 'textStyleSize'
  | 'textStyleWeight'
  | 'textStyleTracking'
  | 'textStyleFace'

export type TextStyleSuffix = 'Size' | 'LineHeight' | 'Weight' | 'Tracking' | 'Face'

/* Spacing Types */
export type Spacing = '0' | '50' | '100' | '150' | '200' | '250' | '300' | '400' | '500' | '600' | '800' | '1000' | '1200' | '1600'

/* Radius Types */
export type Radius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

/* Color Types */
export type PaletteColor = 
  | `gray${string}`
  | `blue${string}`
  | `purple${string}`
  | `brown${string}`
  | `green${string}`
  | `mint${string}`
  | `orange${string}`
  | `red${string}`
  | `yellow${string}`
  | `pink${string}`
  | 'white'
  | 'black'
  | 'transparent'

export type StateColor =
  | `system${string}`
  | `positive${string}`
  | `warning${string}`
  | `negative${string}`
  | `benefit${string}`

export type ForegroundColor = `foreground${string}` | PaletteColor
export type FillColor = `fill${string}` | PaletteColor
export type LineColor = `border${string}` | `separator${string}` | PaletteColor
export type SeparatorColor = `separator${string}` | PaletteColor
export type BackgroundColor = `background${string}` | `surface${string}` | PaletteColor

/* Layer Types */
export interface BaseLayerTheme {
  fill?: string
  borderColor?: string
  borderWidth?: string
  foreground?: string
  radius?: string
  gap?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
}
