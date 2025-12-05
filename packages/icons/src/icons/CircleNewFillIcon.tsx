import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleNewFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.30005 12C2.30005 6.64283 6.64289 2.29999 12 2.29999C17.3572 2.29999 21.7 6.64283 21.7 12C21.7 17.3571 17.3572 21.7 12 21.7C6.64289 21.7 2.30005 17.3571 2.30005 12ZM10.3393 11.4504V16.2551H8.30024V7.79999H10.017L13.5385 12.5578H13.6499V7.79999H15.6889V16.2551H13.9838L10.4506 11.4504H10.3393Z'
    />
  </IconRoot>
  )
}

CircleNewFillIcon.displayName = 'CircleNewFillIcon'

export default memo(CircleNewFillIcon)
export { CircleNewFillIcon }
