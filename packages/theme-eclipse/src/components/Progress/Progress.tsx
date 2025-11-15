import { Progress as CoreProgress } from '@orbit-ui/core'
import React, { forwardRef } from 'react'

import { vars } from '../../styles'

export type ProgressProps = React.ComponentPropsWithoutRef<typeof CoreProgress>

export const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  return (
    <CoreProgress
      ref={ref}
      {...props}
      className={`h-2 ${props.className || ''}`}
      style={{
        backgroundColor: vars.sem.color.backgroundPrimary,
        ...props.style,
      }}
    />
  )
})
