import { HoverCard as CoreHoverCard } from '@orbit-ui/core'
import type { ComponentPropsWithoutRef } from 'react'

export type HoverCardProps = ComponentPropsWithoutRef<typeof CoreHoverCard>

export const HoverCard = Object.assign(CoreHoverCard, {})
