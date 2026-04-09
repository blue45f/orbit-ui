import { CommandComponent as CoreCommand } from '@heejun-com/core'
import type { ComponentPropsWithoutRef } from 'react'

export type CommandProps = ComponentPropsWithoutRef<typeof CoreCommand>

export const Command = Object.assign(CoreCommand, {})
