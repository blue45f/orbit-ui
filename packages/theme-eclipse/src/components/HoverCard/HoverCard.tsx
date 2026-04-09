import { HoverCard as CoreHoverCard } from '@heejun-com/core'
import type { ComponentPropsWithoutRef } from 'react'

export type HoverCardProps = ComponentPropsWithoutRef<typeof CoreHoverCard>

export const HoverCard = Object.assign(CoreHoverCard, {})
