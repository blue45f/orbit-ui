import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MessageFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M2.79998 4.20006C2.79998 3.64778 3.24776 3.20001 3.80005 3.20001L20.1999 3.20006C20.7522 3.20006 21.1999 3.64778 21.1999 4.20006V16.2001C21.1999 16.7523 20.7522 17.2001 20.1999 17.2001H13.2399L8.83988 20.5901C8.53804 20.8229 8.13205 20.8682 7.78993 20.7001C7.44781 20.5319 7.22993 20.1813 7.22993 19.8001V17.2001H3.79993C3.24764 17.2001 2.79993 16.7523 2.79993 16.2001L2.79998 4.20006Z' />
  </IconRoot>
  )
}

MessageFillIcon.displayName = 'MessageFillIcon'

export default memo(MessageFillIcon)
export { MessageFillIcon }
