import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ChevronRightFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M8 5.00002C8 4.60142 8.23672 4.24089 8.60247 4.08243C8.96822 3.92398 9.39315 3.99787 9.68394 4.27049L17.1506 11.2705C17.3523 11.4595 17.4667 11.7236 17.4667 12C17.4667 12.2764 17.3523 12.5405 17.1506 12.7296L9.68394 19.7296C9.39315 20.0022 8.96822 20.0761 8.60247 19.9176C8.23672 19.7592 8 19.3986 8 19V5.00002Z' />
  </IconRoot>
  )
}

ChevronRightFillIcon.displayName = 'ChevronRightFillIcon'

export default memo(ChevronRightFillIcon)
export { ChevronRightFillIcon }
