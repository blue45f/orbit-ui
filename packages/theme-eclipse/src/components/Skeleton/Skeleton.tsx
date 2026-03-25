import { Skeleton as CoreSkeleton } from '@orbit-ui/core'
import type { ComponentPropsWithoutRef } from 'react'

export type SkeletonProps = ComponentPropsWithoutRef<typeof CoreSkeleton>

export const Skeleton = (props: SkeletonProps) => {
  return <CoreSkeleton {...props} />
}
