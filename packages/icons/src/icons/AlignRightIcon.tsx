import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function AlignRightIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z' />
    <path d='M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z' />
    <path d='M13 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H13C12.4477 19 12 18.5523 12 18C12 17.4477 12.4477 17 13 17Z' />
  </IconRoot>
  )
}

AlignRightIcon.displayName = 'AlignRightIcon'

export default memo(AlignRightIcon)
export { AlignRightIcon }
