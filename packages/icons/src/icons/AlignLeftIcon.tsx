import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function AlignLeftIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z' />
    <path d='M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z' />
    <path d='M5 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H5C4.44772 19 4 18.5523 4 18C4 17.4477 4.44772 17 5 17Z' />
  </IconRoot>
  )
}

AlignLeftIcon.displayName = 'AlignLeftIcon'

export default memo(AlignLeftIcon)
export { AlignLeftIcon }
