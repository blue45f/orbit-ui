import { Slider as CoreSlider } from '@orbit-ui/core'
import React, { forwardRef } from 'react'

export type SliderProps = React.ComponentPropsWithoutRef<typeof CoreSlider>

export const Slider = forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  return <CoreSlider ref={ref} {...props} />
})
