import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CalendarFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 4.20312H15C15 3.65084 15.4477 3.20312 16 3.20312C16.5523 3.20312 17 3.65084 17 4.20312H19.3001C19.8524 4.20312 20.3001 4.65084 20.3001 5.20312V8.39844H3.70007V5.20312C3.70007 4.65084 4.14779 4.20312 4.70007 4.20312H7C7 3.65084 7.44772 3.20312 8 3.20312C8.55228 3.20312 9 3.65084 9 4.20312ZM3.70007 9.99844H20.3001V19.8031C20.3001 20.3554 19.8524 20.8031 19.3001 20.8031H4.70007C4.14779 20.8031 3.70007 20.3554 3.70007 19.8031V9.99844ZM15 18V16H17V18H15ZM17 14V12H15V14H17ZM11 16H13V18H11V16ZM13 12H11V14H13V12ZM7 16H9V18H7V16ZM9 12H7V14H9V12Z"
      />
    </IconRoot>
  )
}

CalendarFillIcon.displayName = 'CalendarFillIcon'

export default memo(CalendarFillIcon)
export { CalendarFillIcon }
