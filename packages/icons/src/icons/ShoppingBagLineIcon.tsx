import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ShoppingBagLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 8.44772 9.55228 8 9 8C8.44771 8 8 8.44772 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9Z' />
    <path d='M8.12602 5C8.57006 3.27477 10.1362 2 12 2C13.8638 2 15.4299 3.27477 15.874 5H19.5C20.0523 5 20.5 5.44772 20.5 6V20C20.5 20.5523 20.0523 21 19.5 21H4.5C3.94772 21 3.5 20.5523 3.5 20V6C3.5 5.44772 3.94772 5 4.5 5H8.12602ZM10.2676 5H13.7324C13.3866 4.4022 12.7403 4 12 4C11.2597 4 10.6134 4.4022 10.2676 5ZM5.5 7V19H18.5V7H5.5Z' />
  </IconRoot>
  )
}

ShoppingBagLineIcon.displayName = 'ShoppingBagLineIcon'

export default memo(ShoppingBagLineIcon)
export { ShoppingBagLineIcon }
