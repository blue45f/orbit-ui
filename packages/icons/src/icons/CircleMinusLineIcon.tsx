import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleMinusLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.7008 12.0008C21.7008 6.64362 17.3579 2.30078 12.0008 2.30078C6.64362 2.30078 2.30078 6.64362 2.30078 12.0008C2.30078 17.3579 6.64362 21.7008 12.0008 21.7008C17.3579 21.7008 21.7008 17.3579 21.7008 12.0008ZM12.0008 19.7008C7.74819 19.7008 4.30078 16.2534 4.30078 12.0008C4.30078 7.74819 7.74819 4.30078 12.0008 4.30078C16.2534 4.30078 19.7008 7.74819 19.7008 12.0008C19.7008 16.2534 16.2534 19.7008 12.0008 19.7008ZM12.0008 11.0009H15.8457C16.398 11.0009 16.8457 11.4486 16.8457 12.0009C16.8457 12.5532 16.398 13.0009 15.8457 13.0009H12.0008H8.15588C7.6036 13.0009 7.15588 12.5532 7.15588 12.0009C7.15588 11.4486 7.6036 11.0009 8.15588 11.0009H12.0008Z"
      />
    </IconRoot>
  )
}

CircleMinusLineIcon.displayName = 'CircleMinusLineIcon'

export default memo(CircleMinusLineIcon)
export { CircleMinusLineIcon }
