export * from './Layer'

// Shorthand utilities for layer styling
import * as shorthandUtils from './shorthand'
export const layerUtils = shorthandUtils

// Re-export individual shorthand functions
export {
  paddingVertical,
  paddingHorizontal,
  padding,
  radius,
  textStyle,
  type RadiusCorners,
} from './shorthand'
