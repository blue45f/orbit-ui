import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CirclePointFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M12.4309 9.39716H11.4465V12.0983H12.4192C13.3333 12.0983 13.8723 11.6296 13.8723 10.7507C13.8723 9.86005 13.3391 9.39716 12.4309 9.39716Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.30005 12C2.30005 6.64283 6.64289 2.29999 12 2.29999C17.3572 2.29999 21.7 6.64283 21.7 12C21.7 17.3571 17.3572 21.7 12 21.7C6.64289 21.7 2.30005 17.3571 2.30005 12ZM9.29614 16.1999V7.74481H12.9993C14.8157 7.74481 16.0461 8.92841 16.0461 10.7448C16.0461 12.5436 14.7512 13.7214 12.8704 13.7214H11.4465V16.1999H9.29614Z"
      />
    </IconRoot>
  )
}

CirclePointFillIcon.displayName = 'CirclePointFillIcon'

export default memo(CirclePointFillIcon)
export { CirclePointFillIcon }
