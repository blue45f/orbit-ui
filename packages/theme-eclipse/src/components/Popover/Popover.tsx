import { Popover as CorePopover } from '@heejun-com/core'
import type { ComponentPropsWithoutRef } from 'react'

export type PopoverProps = ComponentPropsWithoutRef<typeof CorePopover>

export const Popover = Object.assign(CorePopover, {})
