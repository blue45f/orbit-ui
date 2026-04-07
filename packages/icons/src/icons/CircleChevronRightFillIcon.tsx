import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleChevronRightFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M2.30078 12.0008C2.30078 6.64362 6.64362 2.30078 12.0008 2.30078C17.3579 2.30078 21.7008 6.64362 21.7008 12.0008C21.7008 17.3579 17.3579 21.7008 12.0008 21.7008C6.64362 21.7008 2.30078 17.3579 2.30078 12.0008ZM10.2062 14.5562C9.81565 14.9467 9.81565 15.5799 10.2062 15.9704C10.5967 16.3609 11.2299 16.3609 11.6204 15.9704L14.8829 12.7079C15.2734 12.3174 15.2734 11.6842 14.8829 11.2937L11.6204 8.03117C11.2299 7.64064 10.5967 7.64064 10.2062 8.03117C9.81565 8.42169 9.81565 9.05486 10.2062 9.44538L12.7616 12.0008L10.2062 14.5562Z" />
    </IconRoot>
  )
}

CircleChevronRightFillIcon.displayName = 'CircleChevronRightFillIcon'

export default memo(CircleChevronRightFillIcon)
export { CircleChevronRightFillIcon }
