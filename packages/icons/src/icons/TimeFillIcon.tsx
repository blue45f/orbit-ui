import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TimeFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.29999C6.64276 2.29999 2.29993 6.64283 2.29993 12C2.29993 17.3571 6.64276 21.7 11.9999 21.7C17.3571 21.7 21.6999 17.3571 21.6999 12C21.6999 6.64283 17.3571 2.29999 11.9999 2.29999ZM12.9999 8.19374C12.9999 7.64146 12.5522 7.19374 11.9999 7.19374C11.4476 7.19374 10.9999 7.64146 10.9999 8.19374V12.5437C10.9999 13.096 11.4476 13.5437 11.9999 13.5437H16.3499C16.9022 13.5437 17.3499 13.096 17.3499 12.5437C17.3499 11.9915 16.9022 11.5437 16.3499 11.5437H12.9999V8.19374Z"
      />
    </IconRoot>
  )
}

TimeFillIcon.displayName = 'TimeFillIcon'

export default memo(TimeFillIcon)
export { TimeFillIcon }
