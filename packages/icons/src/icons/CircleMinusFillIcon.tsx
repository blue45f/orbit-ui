import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleMinusFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9998 2.2998C6.64264 2.2998 2.2998 6.64264 2.2998 11.9998C2.2998 17.357 6.64264 21.6998 11.9998 21.6998C17.357 21.6998 21.6998 17.357 21.6998 11.9998C21.6998 6.64264 17.357 2.2998 11.9998 2.2998ZM12.0008 11.0009H15.8457C16.398 11.0009 16.8457 11.4486 16.8457 12.0009C16.8457 12.5532 16.398 13.0009 15.8457 13.0009H12.0008H8.15588C7.6036 13.0009 7.15588 12.5532 7.15588 12.0009C7.15588 11.4486 7.6036 11.0009 8.15588 11.0009H12.0008Z'
    />
  </IconRoot>
  )
}

CircleMinusFillIcon.displayName = 'CircleMinusFillIcon'

export default memo(CircleMinusFillIcon)
export { CircleMinusFillIcon }
