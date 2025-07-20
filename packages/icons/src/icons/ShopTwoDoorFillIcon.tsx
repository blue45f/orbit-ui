import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ShopTwoDoorFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M3.42114 5C3.42114 4.44772 3.86886 4 4.42114 4H19.579C20.1313 4 20.579 4.44772 20.579 5V7.21053C20.579 7.70912 20.2141 8.1225 19.7368 8.19815V8.20312H4.26318V8.19812C3.78595 8.12239 3.42114 7.70906 3.42114 7.21053V5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.26318 9.20312V17.9453H4C3.44772 17.9453 3 18.393 3 18.9453C3 19.4976 3.44772 19.9453 4 19.9453H20C20.5523 19.9453 21 19.4976 21 18.9453C21 18.393 20.5523 17.9453 20 17.9453H19.7368V9.20312H4.26318ZM8 12H11V18H8V12ZM16 12H13V18H16V12Z"
      />
    </IconRoot>
  )
}

ShopTwoDoorFillIcon.displayName = 'ShopTwoDoorFillIcon'

export default memo(ShopTwoDoorFillIcon)
export { ShopTwoDoorFillIcon }
