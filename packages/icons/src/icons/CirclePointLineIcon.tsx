import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CirclePointLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 4.29999C7.74746 4.29999 4.30005 7.7474 4.30005 12C4.30005 16.2526 7.74746 19.7 12 19.7C16.2526 19.7 19.7 16.2526 19.7 12C19.7 7.7474 16.2526 4.29999 12 4.29999ZM2.30005 12C2.30005 6.64283 6.64289 2.29999 12 2.29999C17.3572 2.29999 21.7 6.64283 21.7 12C21.7 17.3571 17.3572 21.7 12 21.7C6.64289 21.7 2.30005 17.3571 2.30005 12Z'
    />
    <path d='M9.29614 7.7448V16.1999H11.4465V13.7214H12.8704C14.7512 13.7214 16.0461 12.5436 16.0461 10.7448C16.0461 8.92839 14.8157 7.7448 12.9993 7.7448H9.29614ZM11.4465 9.39714H12.4309C13.3391 9.39714 13.8723 9.86003 13.8723 10.7507C13.8723 11.6296 13.3333 12.0983 12.4192 12.0983H11.4465V9.39714Z' />
  </IconRoot>
  )
}

CirclePointLineIcon.displayName = 'CirclePointLineIcon'

export default memo(CirclePointLineIcon)
export { CirclePointLineIcon }
