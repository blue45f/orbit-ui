import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function BatteryLowIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M8 9H5V15H8V9Z' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 7C2 6.44772 2.44772 6 3 6H18C18.5523 6 19 6.44772 19 7V17C19 17.5523 18.5523 18 18 18H3C2.44772 18 2 17.5523 2 17V7ZM4 8V16H17V8H4Z'
    />
    <path d='M21 8.5C21.5523 8.5 22 8.94772 22 9.5V14.5C22 15.0523 21.5523 15.5 21 15.5C20.4477 15.5 20 15.0523 20 14.5V9.5C20 8.94772 20.4477 8.5 21 8.5Z' />
  </IconRoot>
  )
}

BatteryLowIcon.displayName = 'BatteryLowIcon'

export default memo(BatteryLowIcon)
export { BatteryLowIcon }
