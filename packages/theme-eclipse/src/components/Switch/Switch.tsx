import { Switch as CoreSwitch } from '@orbit-ui/core'
import { forwardRef } from 'react'

export type SwitchProps = React.ComponentPropsWithoutRef<typeof CoreSwitch>

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  return (
    <CoreSwitch
      ref={ref}
      {...props}
      className={`data-[state=checked]:bg-[var(--sem-color-fill-primary)] ${props.className || ''}`}
    />
  )
})
