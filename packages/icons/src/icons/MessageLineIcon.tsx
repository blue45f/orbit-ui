import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MessageLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.8001 4.19006C2.8001 3.63778 3.24772 3.19 3.80001 3.19L20.2 3.19006C20.7523 3.19006 21.2 3.63778 21.2 4.19006V16.1901C21.2 16.7423 20.7523 17.1901 20.2 17.1901H13.24L8.84 20.5901C8.53816 20.8229 8.13217 20.8582 7.79005 20.6901C7.44793 20.5219 7.23005 20.1813 7.23005 19.8001V17.1901H3.80005C3.24776 17.1901 2.80005 16.7423 2.80005 16.1901L2.8001 4.19006ZM4.80005 5.19006V15.1901H8.23005C8.78233 15.1901 9.23 15.6378 9.23 16.1901V17.7601L12.29 15.4001C12.465 15.2651 12.679 15.1901 12.9 15.1901H19.2V5.19006H4.80005Z'
    />
  </IconRoot>
  )
}

MessageLineIcon.displayName = 'MessageLineIcon'

export default memo(MessageLineIcon)
export { MessageLineIcon }
