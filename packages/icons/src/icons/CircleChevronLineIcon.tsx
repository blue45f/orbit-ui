import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleChevronLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9999 4.30002C7.74733 4.30002 4.29993 7.74743 4.29993 12C4.29993 16.2526 7.74733 19.7 11.9999 19.7C16.2525 19.7 19.6999 16.2526 19.6999 12C19.6999 7.74743 16.2525 4.30002 11.9999 4.30002ZM2.29993 12C2.29993 6.64286 6.64276 2.30002 11.9999 2.30002C17.3571 2.30002 21.6999 6.64286 21.6999 12C21.6999 17.3572 17.3571 21.7 11.9999 21.7C6.64276 21.7 2.29993 17.3572 2.29993 12Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.03032 13.7946C8.42084 14.1852 9.05401 14.1852 9.44453 13.7946L11.9999 11.2392L14.5553 13.7946C14.9458 14.1852 15.579 14.1852 15.9695 13.7946C16.3601 13.4041 16.3601 12.7709 15.9695 12.3804L12.707 9.11791C12.3165 8.72739 11.6833 8.72739 11.2928 9.11791L8.03032 12.3804C7.6398 12.7709 7.6398 13.4041 8.03032 13.7946Z'
    />
  </IconRoot>
  )
}

CircleChevronLineIcon.displayName = 'CircleChevronLineIcon'

export default memo(CircleChevronLineIcon)
export { CircleChevronLineIcon }
