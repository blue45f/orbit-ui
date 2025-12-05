import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function RatingEmptyIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      d='M13.3272 2.97029C12.91 1.67657 11.0796 1.67657 10.6623 2.97029L8.85479 8.57501L2.96582 8.56213C1.6065 8.55916 1.04087 10.3 2.14234 11.0965L6.91418 14.5476L5.08215 20.1443C4.65927 21.4362 6.14008 22.5121 7.23805 21.7107L11.9948 18.2388L16.7515 21.7107C17.8494 22.5121 19.3303 21.4362 18.9074 20.1443L17.0753 14.5476L21.8472 11.0965C22.9486 10.3 22.383 8.55916 21.0237 8.56213L15.1347 8.57501L13.3272 2.97029Z'
      fill={props.color || '#D5D7D9'}
    />
  </IconRoot>
  )
}

RatingEmptyIcon.displayName = 'RatingEmptyIcon'

export default memo(RatingEmptyIcon)
export { RatingEmptyIcon }
