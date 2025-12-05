import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ArrowRightIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M11.0664 5.66609C10.6759 5.27557 10.6759 4.6424 11.0664 4.25188C11.4569 3.86135 12.0901 3.86135 12.4806 4.25188L19.5223 11.2935C19.9128 11.6841 19.9128 12.3172 19.5223 12.7078L12.4806 19.7494C12.0901 20.1399 11.4569 20.1399 11.0664 19.7494C10.6759 19.3589 10.6759 18.7257 11.0664 18.3352L16.4036 12.998H5.20117C4.64889 12.998 4.20117 12.5503 4.20117 11.998C4.20117 11.4458 4.64889 10.998 5.20117 10.998H16.3983L11.0664 5.66609Z' />
  </IconRoot>
  )
}

ArrowRightIcon.displayName = 'ArrowRightIcon'

export default memo(ArrowRightIcon)
export { ArrowRightIcon }
