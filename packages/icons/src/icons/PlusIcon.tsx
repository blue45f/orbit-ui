import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PlusIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44771 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20Z" />
    </IconRoot>
  )
}

PlusIcon.displayName = 'PlusIcon'

export default memo(PlusIcon)
export { PlusIcon }
