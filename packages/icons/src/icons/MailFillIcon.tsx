import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MailFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M2.49988 5.20006C2.49988 4.64778 2.9477 4.20001 3.49998 4.20001L20.4999 4.20006C21.0522 4.20006 21.4999 4.64778 21.4999 5.20006V6.36006L12 12.3201L2.49988 6.36006V5.20006Z" />
      <path d="M2.49988 8.72006V18.8001C2.49988 19.3523 2.94759 19.8001 3.49988 19.8001H20.4999C21.0522 19.8001 21.4999 19.3523 21.4999 18.8001V8.72006L12.53 14.3501C12.2057 14.5527 11.7943 14.5527 11.47 14.3501L2.49988 8.72006Z" />
    </IconRoot>
  )
}

MailFillIcon.displayName = 'MailFillIcon'

export default memo(MailFillIcon)
export { MailFillIcon }
