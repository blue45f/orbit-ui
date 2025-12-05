import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PauseLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.6665 4.5C8.21879 4.5 8.6665 4.94772 8.6665 5.5V18.5C8.6665 19.0523 8.21879 19.5 7.6665 19.5C7.11422 19.5 6.6665 19.0523 6.6665 18.5V5.5C6.6665 4.94772 7.11422 4.5 7.6665 4.5Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.3332 4.5C16.8855 4.5 17.3332 4.94772 17.3332 5.5V18.5C17.3332 19.0523 16.8855 19.5 16.3332 19.5C15.7809 19.5 15.3332 19.0523 15.3332 18.5V5.5C15.3332 4.94772 15.7809 4.5 16.3332 4.5Z'
    />
  </IconRoot>
  )
}

PauseLineIcon.displayName = 'PauseLineIcon'

export default memo(PauseLineIcon)
export { PauseLineIcon }
