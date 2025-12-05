import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MemoFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M5 4H19C19.5523 4 20 4.44772 20 5V12.2294H13.0295C12.5877 12.2294 12.2295 12.5875 12.2295 13.0294V20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4Z' />
    <path d='M20 13.8294V14.1538C20 14.4191 19.8946 14.6734 19.7071 14.861L14.861 19.7071C14.6734 19.8946 14.4191 20 14.1538 20H13.8295V13.8294H20Z' />
  </IconRoot>
  )
}

MemoFillIcon.displayName = 'MemoFillIcon'

export default memo(MemoFillIcon)
export { MemoFillIcon }
