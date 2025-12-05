import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CirclePauseLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.30011 12.0001C4.30011 16.2527 7.74752 19.7001 12.0001 19.7001C16.2527 19.7001 19.7001 16.2527 19.7001 12.0001C19.7001 7.74749 16.2527 4.30008 12.0001 4.30008C7.74752 4.30008 4.30011 7.74749 4.30011 12.0001ZM12.0001 21.7001C6.64295 21.7001 2.30011 17.3572 2.30011 12.0001C2.30011 6.64292 6.64295 2.30008 12.0001 2.30008C17.3573 2.30008 21.7001 6.64292 21.7001 12.0001C21.7001 17.3572 17.3573 21.7001 12.0001 21.7001Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.0026 8.00003C10.5549 8.00003 11.0026 8.44775 11.0026 9.00003V15C11.0026 15.5523 10.5549 16 10.0026 16C9.45034 16 9.00262 15.5523 9.00262 15V9.00003C9.00262 8.44775 9.45034 8.00003 10.0026 8.00003Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.0001 8.00003C14.5523 8.00003 15.0001 8.44775 15.0001 9.00003V15C15.0001 15.5523 14.5523 16 14.0001 16C13.4478 16 13.0001 15.5523 13.0001 15V9.00003C13.0001 8.44775 13.4478 8.00003 14.0001 8.00003Z'
    />
  </IconRoot>
  )
}

CirclePauseLineIcon.displayName = 'CirclePauseLineIcon'

export default memo(CirclePauseLineIcon)
export { CirclePauseLineIcon }
