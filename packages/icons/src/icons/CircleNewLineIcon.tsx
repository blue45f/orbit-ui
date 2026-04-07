import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleNewLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.29999C7.74746 4.29999 4.30005 7.7474 4.30005 12C4.30005 16.2526 7.74746 19.7 12 19.7C16.2526 19.7 19.7 16.2526 19.7 12C19.7 7.7474 16.2526 4.29999 12 4.29999ZM2.30005 12C2.30005 6.64283 6.64289 2.29999 12 2.29999C17.3572 2.29999 21.7 6.64283 21.7 12C21.7 17.3571 17.3572 21.7 12 21.7C6.64289 21.7 2.30005 17.3571 2.30005 12Z"
      />
      <path d="M10.3393 16.2551V11.4504H10.4506L13.9838 16.2551H15.6889V7.79998H13.6499V12.5578H13.5385L10.017 7.79998H8.30024V16.2551H10.3393Z" />
    </IconRoot>
  )
}

CircleNewLineIcon.displayName = 'CircleNewLineIcon'

export default memo(CircleNewLineIcon)
export { CircleNewLineIcon }
