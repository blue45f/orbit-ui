import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TowelFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 3.5C4.84315 3.5 3.5 4.84315 3.5 6.5V19.5C3.5 20.0523 3.94772 20.5 4.5 20.5H15.5C16.0523 20.5 16.5 20.0523 16.5 19.5V16.5H19.5C20.0523 16.5 20.5 16.0523 20.5 15.5V6.5C20.5 4.84315 19.1569 3.5 17.5 3.5H6.5ZM18.5 14.5H16.5V6.5C16.5 5.94772 16.9477 5.5 17.5 5.5C18.0523 5.5 18.5 5.94772 18.5 6.5V14.5Z"
      />
      <path
        d="M15.5 15.5V16.5V19.5H4.5V6.5C4.5 5.39543 5.39543 4.5 6.5 4.5H17.5C16.3954 4.5 15.5 5.39543 15.5 6.5V14.5V15.5Z"
        stroke="#181A1C"
        strokeWidth="2"
      />
    </IconRoot>
  )
}

TowelFillIcon.displayName = 'TowelFillIcon'

export default memo(TowelFillIcon)
export { TowelFillIcon }
