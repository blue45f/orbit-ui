import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ArrowDiagonalIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M14.8079 5.25977C15.3601 5.25977 15.8079 5.70748 15.8079 6.25977C15.8079 6.81205 15.3601 7.25977 14.8079 7.25977H8.72002C8.72392 7.26354 8.72778 7.26733 8.73158 7.27113L18.4975 17.037C18.888 17.4276 18.888 18.0607 18.4975 18.4512C18.107 18.8418 17.4738 18.8418 17.0833 18.4512L7.31736 8.68534C7.28449 8.65248 7.25215 8.61598 7.2207 8.57646V14.8469C7.2207 15.3992 6.77299 15.8469 6.2207 15.8469C5.66842 15.8469 5.2207 15.3992 5.2207 14.8469V6.25977C5.2207 5.70748 5.66842 5.25977 6.2207 5.25977H14.8079Z" />
    </IconRoot>
  )
}

ArrowDiagonalIcon.displayName = 'ArrowDiagonalIcon'

export default memo(ArrowDiagonalIcon)
export { ArrowDiagonalIcon }
