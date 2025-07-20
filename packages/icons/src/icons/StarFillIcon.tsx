import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function StarFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M13.3271 2.97029C12.9099 1.67657 11.0795 1.67657 10.6623 2.97029L8.85473 8.57501L2.96576 8.56213C1.60644 8.55916 1.04081 10.3 2.14228 11.0965L6.91412 14.5476L5.08209 20.1443C4.65921 21.4362 6.14002 22.5121 7.23799 21.7107L11.9947 18.2388L16.7514 21.7107C17.8494 22.5121 19.3302 21.4362 18.9073 20.1443L17.0753 14.5476L21.8471 11.0965C22.9486 10.3 22.383 8.55916 21.0236 8.56213L15.1347 8.57501L13.3271 2.97029Z" />
    </IconRoot>
  )
}

StarFillIcon.displayName = 'StarFillIcon'

export default memo(StarFillIcon)
export { StarFillIcon }
