import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleChevronRightLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.30017 12.0001C4.30017 16.2527 7.74758 19.7001 12.0002 19.7001C16.2528 19.7001 19.7002 16.2527 19.7002 12.0001C19.7002 7.74749 16.2528 4.30008 12.0002 4.30008C7.74758 4.30008 4.30017 7.74749 4.30017 12.0001ZM12.0002 21.7001C6.64301 21.7001 2.30017 17.3572 2.30017 12.0001C2.30017 6.64292 6.64301 2.30008 12.0002 2.30008C17.3573 2.30008 21.7002 6.64292 21.7002 12.0001C21.7002 17.3572 17.3573 21.7001 12.0002 21.7001Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.2056 15.9697C9.81504 15.5792 9.81504 14.946 10.2056 14.5555L12.761 12.0001L10.2056 9.44469C9.81504 9.05416 9.81504 8.421 10.2056 8.03047C10.5961 7.63995 11.2293 7.63995 11.6198 8.03047L14.8823 11.293C15.2728 11.6835 15.2728 12.3167 14.8823 12.7072L11.6198 15.9697C11.2293 16.3602 10.5961 16.3602 10.2056 15.9697Z'
    />
  </IconRoot>
  )
}

CircleChevronRightLineIcon.displayName = 'CircleChevronRightLineIcon'

export default memo(CircleChevronRightLineIcon)
export { CircleChevronRightLineIcon }
