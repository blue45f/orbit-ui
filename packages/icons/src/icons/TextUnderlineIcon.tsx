import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TextUnderlineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M16.6702 8.46875V4H14.4974V17H16.6702V10.0938H18.7602V8.46875H16.6702Z" />
      <path d="M6.2002 7.1993V5.23438H12.7239V6.97615C12.7239 9.19296 11.188 11.4098 9.66792 13.009C8.76536 13.9749 7.75196 14.8617 6.61189 15.7009L6.67018 12.95C8.87116 11.1607 10.381 8.8144 10.4602 7.1993H6.2002Z" />
      <path d="M20 18H4V20H20V18Z" />
    </IconRoot>
  )
}

TextUnderlineIcon.displayName = 'TextUnderlineIcon'

export default memo(TextUnderlineIcon)
export { TextUnderlineIcon }
