import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TowelLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 5.5C18.0523 5.5 18.5 5.94772 18.5 6.5V14.5H16.5V6.5C16.5 5.94772 16.9477 5.5 17.5 5.5ZM6.5 5.5H14.6707C14.5602 5.81278 14.5 6.14936 14.5 6.5V14.5V16.5V18.5H5.5V6.5C5.5 5.94772 5.94772 5.5 6.5 5.5ZM16.5 16.5V19.5C16.5 20.0523 16.0523 20.5 15.5 20.5H4.5C3.94772 20.5 3.5 20.0523 3.5 19.5V6.5C3.5 4.84315 4.84315 3.5 6.5 3.5H17.5C19.1569 3.5 20.5 4.84315 20.5 6.5V15.5C20.5 16.0523 20.0523 16.5 19.5 16.5H16.5Z"
      />
    </IconRoot>
  )
}

TowelLineIcon.displayName = 'TowelLineIcon'

export default memo(TowelLineIcon)
export { TowelLineIcon }
