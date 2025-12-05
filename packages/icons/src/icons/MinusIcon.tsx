import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MinusIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3 12C3 11.4477 3.44771 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z'
    />
  </IconRoot>
  )
}

MinusIcon.displayName = 'MinusIcon'

export default memo(MinusIcon)
export { MinusIcon }
