import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function LockerLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M9 8.39997C9 8.01337 9.3134 7.69997 9.7 7.69997H14.3C14.6866 7.69997 15 8.01337 15 8.39997C15 8.78657 14.6866 9.09997 14.3 9.09997H9.7C9.3134 9.09997 9 8.78657 9 8.39997Z" />
      <path d="M8.2 11.8C8.86274 11.8 9.4 12.3372 9.4 13C9.4 13.4441 9.15867 13.832 8.79998 14.0394V14.7C8.79998 15.0313 8.53135 15.3 8.19998 15.3C7.86861 15.3 7.59998 15.0313 7.59998 14.7V14.0394C7.24131 13.8319 7 13.4441 7 13C7 12.3372 7.53726 11.8 8.2 11.8Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70007 4.19995C3.70007 3.64767 4.14779 3.19995 4.70007 3.19995H19.3001C19.8524 3.19995 20.3001 3.64767 20.3001 4.19995V19.8C20.3001 20.3522 19.8524 20.8 19.3001 20.8H4.70007C4.14779 20.8 3.70007 20.3522 3.70007 19.8V4.19995ZM5.70007 5.19995V18.8H18.3001V5.19995H5.70007Z"
      />
    </IconRoot>
  )
}

LockerLineIcon.displayName = 'LockerLineIcon'

export default memo(LockerLineIcon)
export { LockerLineIcon }
