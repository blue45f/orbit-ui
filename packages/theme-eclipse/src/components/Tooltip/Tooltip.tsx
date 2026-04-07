import { Tooltip as CoreTooltip } from '@orbit-ui/core'
import React from 'react'

export type TooltipProps = React.ComponentPropsWithoutRef<typeof CoreTooltip>

export const Tooltip = Object.assign(CoreTooltip, {})
