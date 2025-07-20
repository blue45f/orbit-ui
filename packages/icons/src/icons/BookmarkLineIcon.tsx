import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function BookmarkLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.30005 4.39999C4.30005 3.84771 4.74776 3.39999 5.30005 3.39999H18.7C19.2523 3.39999 19.7 3.84771 19.7 4.39999V19.6C19.7 19.9559 19.5109 20.285 19.2034 20.4641C18.8958 20.6432 18.5163 20.6454 18.2067 20.4698L12 16.9496L5.79339 20.4698C5.48382 20.6454 5.10426 20.6432 4.79673 20.4641C4.4892 20.285 4.30005 19.9559 4.30005 19.6V4.39999ZM6.30005 5.39999V17.8832L11.5067 14.9302C11.8127 14.7566 12.1874 14.7566 12.4934 14.9302L17.7 17.8832V5.39999H6.30005Z"
      />
    </IconRoot>
  )
}

BookmarkLineIcon.displayName = 'BookmarkLineIcon'

export default memo(BookmarkLineIcon)
export { BookmarkLineIcon }
