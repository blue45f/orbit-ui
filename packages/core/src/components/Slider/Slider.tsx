import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '../../styles'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  // 다중 thumb 지원: value/defaultValue 길이만큼 Thumb 렌더링
  const thumbCount = (value ?? defaultValue ?? [0]).length

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--sem-eclipse-color-fillSecondary)]">
        <SliderPrimitive.Range className="absolute h-full bg-[var(--sem-eclipse-color-systemMainPrimary)]" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-5 w-5 rounded-full border-2 border-[var(--sem-eclipse-color-systemMainPrimary)] bg-[var(--sem-eclipse-color-surfaceContainer)] transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
