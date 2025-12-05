import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PipIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M18.5 3.5C19.0523 3.5 19.5 3.94772 19.5 4.5V9C19.5 9.55229 19.0523 10 18.5 10C17.9477 10 17.5 9.55229 17.5 9L17.5 5.5L5.5 5.5L5.5 17.5H9C9.55229 17.5 10 17.9477 10 18.5C10 19.0523 9.55229 19.5 9 19.5H4.5C3.94771 19.5 3.5 19.0523 3.5 18.5L3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5L18.5 3.5Z' />
    <path d='M12.5 13.5C12.5 12.9477 12.9477 12.5 13.5 12.5H19.5C20.0523 12.5 20.5 12.9477 20.5 13.5V19.5C20.5 20.0523 20.0523 20.5 19.5 20.5H13.5C12.9477 20.5 12.5 20.0523 12.5 19.5V13.5Z' />
  </IconRoot>
  )
}

PipIcon.displayName = 'PipIcon'

export default memo(PipIcon)
export { PipIcon }
