import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CirclePlayFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9999 2.29996C6.64276 2.29996 2.29993 6.6428 2.29993 12C2.29993 17.3571 6.64276 21.7 11.9999 21.7C17.3571 21.7 21.6999 17.3571 21.6999 12C21.6999 6.64279 17.3571 2.29996 11.9999 2.29996ZM15.6211 12.4329C15.7758 12.3436 15.8711 12.1786 15.8711 11.9999C15.8711 11.8213 15.7758 11.6562 15.6211 11.5669L11.0536 8.92987C10.8989 8.84056 10.7083 8.84056 10.5536 8.92987C10.3989 9.01919 10.3036 9.18425 10.3036 9.36288V14.637C10.3036 14.8156 10.3989 14.9807 10.5536 15.07C10.7083 15.1593 10.8989 15.1593 11.0536 15.07L15.6211 12.4329Z'
    />
  </IconRoot>
  )
}

CirclePlayFillIcon.displayName = 'CirclePlayFillIcon'

export default memo(CirclePlayFillIcon)
export { CirclePlayFillIcon }
