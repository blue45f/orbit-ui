import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ShareIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M5 4H9.5C10.0523 4 10.5 4.44772 10.5 5C10.5 5.55228 10.0523 6 9.5 6H6V18H18V14.5C18 13.9477 18.4477 13.5 19 13.5C19.5523 13.5 20 13.9477 20 14.5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4Z" />
      <path d="M14 4H19C19.5523 4 20 4.44772 20 5V10C20 10.5523 19.5523 11 19 11C18.4477 11 18 10.5523 18 10V7.36401L13.7071 11.6569C13.3166 12.0474 12.6834 12.0474 12.2929 11.6569C11.9024 11.2663 11.9024 10.6332 12.2929 10.2426L16.5356 6H14C13.4477 6 13 5.55228 13 5C13 4.44772 13.4477 4 14 4Z" />
    </IconRoot>
  )
}

ShareIcon.displayName = 'ShareIcon'

export default memo(ShareIcon)
export { ShareIcon }
