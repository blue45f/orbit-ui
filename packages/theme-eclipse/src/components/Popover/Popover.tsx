import { Popover as CorePopover } from '@orbit-ui/core'
import type { ComponentPropsWithoutRef } from 'react'

export type PopoverProps = ComponentPropsWithoutRef<typeof CorePopover>

export const Popover = Object.assign(CorePopover, {})
