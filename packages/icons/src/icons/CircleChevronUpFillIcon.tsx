import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleChevronUpFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9999 2.30002C6.64276 2.30002 2.29993 6.64286 2.29993 12C2.29993 17.3572 6.64276 21.7 11.9999 21.7C17.3571 21.7 21.6999 17.3572 21.6999 12C21.6999 6.64286 17.3571 2.30002 11.9999 2.30002ZM9.44453 13.7946C9.05401 14.1851 8.42084 14.1851 8.03032 13.7946C7.6398 13.4041 7.6398 12.7709 8.03032 12.3804L11.2928 9.11791C11.6833 8.72738 12.3165 8.72738 12.707 9.11791L15.9695 12.3804C16.3601 12.7709 16.3601 13.4041 15.9695 13.7946C15.579 14.1851 14.9458 14.1851 14.5553 13.7946L11.9999 11.2392L9.44453 13.7946Z'
    />
  </IconRoot>
  )
}

CircleChevronUpFillIcon.displayName = 'CircleChevronUpFillIcon'

export default memo(CircleChevronUpFillIcon)
export { CircleChevronUpFillIcon }
