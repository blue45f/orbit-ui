import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MemoLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M5 4H19C19.5523 4 20 4.44772 20 5V14.1538C20 14.4191 19.8946 14.6734 19.7071 14.861L14.861 19.7071C14.6734 19.8946 14.4191 20 14.1538 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4ZM6 18H12.0294V13.0293C12.0294 12.477 12.4772 12.0293 13.0294 12.0293H18V6H6V18ZM14.0294 17.7102L17.7103 14.0293H14.0294V17.7102Z' />
  </IconRoot>
  )
}

MemoLineIcon.displayName = 'MemoLineIcon'

export default memo(MemoLineIcon)
export { MemoLineIcon }
