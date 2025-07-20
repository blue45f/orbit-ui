import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function LeafIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M16.5578 3C16.5578 3 15.0599 4.43375 13.44 5.01179C1.4439 9.29274 6.50316 17.6351 6.66821 17.6626C6.66821 17.6626 7.3409 16.5069 8.24958 15.8476C14.0158 11.6654 15.1877 6.85142 15.1877 6.85142C15.1877 6.85142 13.8938 12.6442 8.76392 16.2486C7.63092 17.0442 6.86374 19.0034 6.53898 20.9615C6.53898 20.9615 7.90423 21.0482 8.24958 20.9615C8.24958 20.9615 8.24958 19.828 8.57975 18.1156C15.7494 18.9578 18.0976 13.2579 18.4043 11.2704C19.1284 6.57639 16.5578 3 16.5578 3Z" />
    </IconRoot>
  )
}

LeafIcon.displayName = 'LeafIcon'

export default memo(LeafIcon)
export { LeafIcon }
