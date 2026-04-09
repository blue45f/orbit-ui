import { Carousel as CoreCarousel } from '@heejun-com/core'
import type { ComponentPropsWithoutRef } from 'react'

export type CarouselProps = ComponentPropsWithoutRef<typeof CoreCarousel>

export const Carousel: typeof CoreCarousel = Object.assign(CoreCarousel, {})
