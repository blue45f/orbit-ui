import * as SwitchPrimitive from '@radix-ui/react-switch'
import React, { forwardRef } from 'react'
import clsx from 'clsx'

const ROOT_CLASS =
  'inline-flex relative items-center transition-all duration-300 [cubic-bezier(0.4,0,0.2,1)] border border-transparent rounded-full cursor-pointer w-11 h-6 [background-color:var(--sem-eclipse-color-fillSecondary)] data-[state=checked]:[background-color:var(--sem-eclipse-color-systemMainPrimary)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_color-mix(in_srgb,var(--sem-eclipse-color-systemMainPrimary)_25%,transparent)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

const THUMB_CLASS =
  'block translate-x-[3px] transition-transform duration-300 [cubic-bezier(0.4,0,0.2,1)] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] bg-[var(--sem-eclipse-color-surfaceContainer)] w-[18px] h-[18px] [*[data-state=checked]_&]:translate-x-[21px]'

export type ToggleProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, ...props }, ref) => {
    return (
      <SwitchPrimitive.Root ref={ref} className={clsx(ROOT_CLASS, className)} {...props}>
        <SwitchPrimitive.Thumb className={THUMB_CLASS} />
      </SwitchPrimitive.Root>
    )
  }
)

Toggle.displayName = 'Toggle'
