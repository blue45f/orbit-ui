import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TimeLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 4.29999C7.74733 4.29999 4.29993 7.7474 4.29993 12C4.29993 16.2526 7.74733 19.7 11.9999 19.7C16.2525 19.7 19.6999 16.2526 19.6999 12C19.6999 7.7474 16.2525 4.29999 11.9999 4.29999ZM2.29993 12C2.29993 6.64283 6.64276 2.29999 11.9999 2.29999C17.3571 2.29999 21.6999 6.64283 21.6999 12C21.6999 17.3571 17.3571 21.7 11.9999 21.7C6.64276 21.7 2.29993 17.3571 2.29993 12Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 7.19374C12.5522 7.19374 12.9999 7.64145 12.9999 8.19374V11.5437H16.3499C16.9022 11.5437 17.3499 11.9915 17.3499 12.5437C17.3499 13.096 16.9022 13.5437 16.3499 13.5437H11.9999C11.4476 13.5437 10.9999 13.096 10.9999 12.5437V8.19374C10.9999 7.64145 11.4476 7.19374 11.9999 7.19374Z"
      />
    </IconRoot>
  )
}

TimeLineIcon.displayName = 'TimeLineIcon'

export default memo(TimeLineIcon)
export { TimeLineIcon }
