import { layerVars } from './Layer'

type CSSVarObject = Record<string, string>

export const paddingVertical = (value: string): CSSVarObject => ({
  [layerVars.paddingTop]: value,
  [layerVars.paddingBottom]: value,
})

export const paddingHorizontal = (value: string): CSSVarObject => ({
  [layerVars.paddingLeft]: value,
  [layerVars.paddingRight]: value,
})

export const padding = (value: string): CSSVarObject => ({
  [layerVars.paddingTop]: value,
  [layerVars.paddingRight]: value,
  [layerVars.paddingBottom]: value,
  [layerVars.paddingLeft]: value,
})

export type RadiusCorners =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'all'
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'

export const radius = (value: string, corners: RadiusCorners = 'all'): CSSVarObject => {
  const result: CSSVarObject = {}

  if (corners === 'all' || corners === 'top' || corners === 'left' || corners === 'top-left') {
    result[layerVars.radiusTopLeft] = value
  }
  if (corners === 'all' || corners === 'top' || corners === 'right' || corners === 'top-right') {
    result[layerVars.radiusTopRight] = value
  }
  if (
    corners === 'all' ||
    corners === 'bottom' ||
    corners === 'right' ||
    corners === 'bottom-right'
  ) {
    result[layerVars.radiusBottomRight] = value
  }
  if (
    corners === 'all' ||
    corners === 'bottom' ||
    corners === 'left' ||
    corners === 'bottom-left'
  ) {
    result[layerVars.radiusBottomLeft] = value
  }

  return result
}

export const textStyle = (value: {
  textStyleLineHeight?: string
  textStyleSize?: string
  textStyleWeight?: string
  textStyleTracking?: string
  textStyleFace?: string
}): CSSVarObject => {
  const result: CSSVarObject = {}
  if (value.textStyleLineHeight) result['--layer-text-line-height'] = value.textStyleLineHeight
  if (value.textStyleSize) result['--layer-text-size'] = value.textStyleSize
  if (value.textStyleWeight) result['--layer-text-weight'] = value.textStyleWeight
  if (value.textStyleTracking) result['--layer-text-tracking'] = value.textStyleTracking
  if (value.textStyleFace) result['--layer-text-face'] = value.textStyleFace
  return result
}
