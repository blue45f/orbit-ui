import * as SwitchPrimitive from '@radix-ui/react-switch'
import React, { forwardRef } from 'react'
import clsx from 'clsx'
import * as styles from './Toggle.css'

export type ToggleProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={styles.thumb} />
      </SwitchPrimitive.Root>
    )
  }
)

Toggle.displayName = 'Toggle'
