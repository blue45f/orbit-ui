import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function BatteryEmptyIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H18C18.5523 18 19 17.5523 19 17V7C19 6.44772 18.5523 6 18 6H3ZM4 16V8H17V16H4Z"
      />
      <path d="M22 9.5C22 8.94772 21.5523 8.5 21 8.5C20.4477 8.5 20 8.94772 20 9.5V14.5C20 15.0523 20.4477 15.5 21 15.5C21.5523 15.5 22 15.0523 22 14.5V9.5Z" />
    </IconRoot>
  )
}

BatteryEmptyIcon.displayName = 'BatteryEmptyIcon'

export default memo(BatteryEmptyIcon)
export { BatteryEmptyIcon }
