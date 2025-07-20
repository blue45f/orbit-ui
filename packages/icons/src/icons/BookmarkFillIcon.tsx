import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function BookmarkFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M4.30078 4.40039C4.30078 3.84811 4.7485 3.40039 5.30078 3.40039H18.7008C19.2531 3.40039 19.7008 3.84811 19.7008 4.40039V19.6004C19.7008 19.9563 19.5116 20.2854 19.2041 20.4645C18.8966 20.6436 18.517 20.6458 18.2074 20.4702L12.0008 16.95L5.79412 20.4702C5.48455 20.6458 5.10499 20.6436 4.79746 20.4645C4.48993 20.2854 4.30078 19.9563 4.30078 19.6004V4.40039Z" />
    </IconRoot>
  )
}

BookmarkFillIcon.displayName = 'BookmarkFillIcon'

export default memo(BookmarkFillIcon)
export { BookmarkFillIcon }
