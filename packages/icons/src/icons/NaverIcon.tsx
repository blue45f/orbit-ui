import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function NaverIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        d="M14.6017 12.5179L9.1886 4.69922H4.69995V19.2992H9.39825V11.4805L14.8113 19.2992H19.3V4.69922H14.6017V12.5179Z"
        fill={props.color || '#03C75A'}
      />
    </IconRoot>
  )
}

NaverIcon.displayName = 'NaverIcon'

export default memo(NaverIcon)
export { NaverIcon }
