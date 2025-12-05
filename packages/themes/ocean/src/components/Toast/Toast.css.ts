import { layerUtils, layerVars } from '@ui-forge/core'
import { style } from '@vanilla-extract/css'

import { vars } from '../../styles'

const baseToastTheme = vars.com.snackbar

export const container = style({
  vars: {
    [layerVars.fill]: baseToastTheme.fillColor,
    [layerVars.foreground]: baseToastTheme.foregroundColor,
    [layerVars.gap]: baseToastTheme.gap,
    ...layerUtils.radius(baseToastTheme.radius),
    ...layerUtils.paddingVertical(baseToastTheme.paddingVertical),
    ...layerUtils.paddingHorizontal(baseToastTheme.paddingHorizontal),
  },
})
