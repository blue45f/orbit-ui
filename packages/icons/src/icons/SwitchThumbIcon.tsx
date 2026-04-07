import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function SwitchThumbIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <circle cx="12" cy="12" r="9" />
    </IconRoot>
  )
}

SwitchThumbIcon.displayName = 'SwitchThumbIcon'

export default memo(SwitchThumbIcon)
export { SwitchThumbIcon }
