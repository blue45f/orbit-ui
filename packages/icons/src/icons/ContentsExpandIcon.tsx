import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ContentsExpandIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M5.5 4.5C5.5 3.94772 5.94772 3.5 6.5 3.5H17.5C18.0523 3.5 18.5 3.94772 18.5 4.5C18.5 5.05228 18.0523 5.5 17.5 5.5H6.5C5.94772 5.5 5.5 5.05228 5.5 4.5Z" />
      <path d="M5.5 19.5C5.5 18.9477 5.94772 18.5 6.5 18.5H17.5C18.0523 18.5 18.5 18.9477 18.5 19.5C18.5 20.0523 18.0523 20.5 17.5 20.5H6.5C5.94772 20.5 5.5 20.0523 5.5 19.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 8C3.94772 8 3.5 8.44772 3.5 9V15C3.5 15.5523 3.94772 16 4.5 16H19.5C20.0523 16 20.5 15.5523 20.5 15V9C20.5 8.44772 20.0523 8 19.5 8H4.5ZM5.5 14V10H18.5V14H5.5Z"
      />
    </IconRoot>
  )
}

ContentsExpandIcon.displayName = 'ContentsExpandIcon'

export default memo(ContentsExpandIcon)
export { ContentsExpandIcon }
