import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ContentsReductionIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5H19.5C20.0523 3.5 20.5 3.94772 20.5 4.5C20.5 5.05228 20.0523 5.5 19.5 5.5H4.5C3.94772 5.5 3.5 5.05228 3.5 4.5Z' />
    <path d='M3.5 19.5C3.5 18.9477 3.94772 18.5 4.5 18.5H19.5C20.0523 18.5 20.5 18.9477 20.5 19.5C20.5 20.0523 20.0523 20.5 19.5 20.5H4.5C3.94772 20.5 3.5 20.0523 3.5 19.5Z' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.5 8C6.94772 8 6.5 8.44772 6.5 9V15C6.5 15.5523 6.94772 16 7.5 16H16.5C17.0523 16 17.5 15.5523 17.5 15V9C17.5 8.44772 17.0523 8 16.5 8H7.5ZM8.5 14V10H15.5V14H8.5Z'
    />
  </IconRoot>
  )
}

ContentsReductionIcon.displayName = 'ContentsReductionIcon'

export default memo(ContentsReductionIcon)
export { ContentsReductionIcon }
