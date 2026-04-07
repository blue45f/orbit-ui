import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ChevronLeftFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M15.9999 19C15.9999 19.3986 15.7632 19.7592 15.3974 19.9176C15.0316 20.0761 14.6067 20.0022 14.3159 19.7296L6.84926 12.7296C6.64761 12.5405 6.5332 12.2764 6.5332 12C6.5332 11.7236 6.64761 11.4595 6.84926 11.2705L14.3159 4.27048C14.6067 3.99787 15.0316 3.92398 15.3974 4.08243C15.7632 4.24089 15.9999 4.60142 15.9999 5.00002V19Z" />
    </IconRoot>
  )
}

ChevronLeftFillIcon.displayName = 'ChevronLeftFillIcon'

export default memo(ChevronLeftFillIcon)
export { ChevronLeftFillIcon }
