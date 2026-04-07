import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PlayLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3301 11.9953C20.3301 12.3526 20.1395 12.6827 19.8301 12.8614L6.83008 20.3669C6.52068 20.5455 6.13948 20.5455 5.83008 20.3669C5.52068 20.1883 5.33008 19.8581 5.33008 19.5009L5.33008 4.48978C5.33008 4.13251 5.52068 3.80238 5.83008 3.62375C6.13948 3.44512 6.52068 3.44512 6.83008 3.62375L19.8301 11.1293C20.1395 11.3079 20.3301 11.6381 20.3301 11.9953ZM7.33008 6.22183V17.7688L17.3301 11.9953L7.33008 6.22183Z"
      />
    </IconRoot>
  )
}

PlayLineIcon.displayName = 'PlayLineIcon'

export default memo(PlayLineIcon)
export { PlayLineIcon }
