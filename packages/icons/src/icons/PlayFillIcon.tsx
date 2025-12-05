import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PlayFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M20.3301 11.9953C20.3301 12.3526 20.1395 12.6827 19.8301 12.8613L6.83008 20.3669C6.52068 20.5455 6.13948 20.5455 5.83008 20.3669C5.52068 20.1882 5.33008 19.8581 5.33008 19.5009L5.33008 4.48975C5.33008 4.13248 5.52068 3.80235 5.83008 3.62372C6.13948 3.44509 6.52068 3.44509 6.83008 3.62372L19.8301 11.1293C20.1395 11.3079 20.3301 11.638 20.3301 11.9953Z'
    />
  </IconRoot>
  )
}

PlayFillIcon.displayName = 'PlayFillIcon'

export default memo(PlayFillIcon)
export { PlayFillIcon }
