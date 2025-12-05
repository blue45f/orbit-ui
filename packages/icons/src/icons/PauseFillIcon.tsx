import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PauseFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.6665 4C8.77107 4 9.6665 4.89543 9.6665 6V18C9.6665 19.1046 8.77107 20 7.6665 20C6.56193 20 5.6665 19.1046 5.6665 18V6C5.6665 4.89543 6.56193 4 7.6665 4Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.3332 4C17.4377 4 18.3332 4.89543 18.3332 6V18C18.3332 19.1046 17.4377 20 16.3332 20C15.2286 20 14.3332 19.1046 14.3332 18V6C14.3332 4.89543 15.2286 4 16.3332 4Z'
    />
  </IconRoot>
  )
}

PauseFillIcon.displayName = 'PauseFillIcon'

export default memo(PauseFillIcon)
export { PauseFillIcon }
