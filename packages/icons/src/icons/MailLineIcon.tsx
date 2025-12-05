import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MailLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.49998 4.20001C2.9477 4.20001 2.49988 4.64778 2.49988 5.20006V7.79979V18.8001C2.49988 19.3523 2.94759 19.8001 3.49988 19.8001H20.4999C21.0522 19.8001 21.4999 19.3523 21.4999 18.8001V7.82297C21.5002 7.80757 21.5002 7.79216 21.4999 7.77673V5.20006C21.4999 4.64778 21.0522 4.20006 20.4999 4.20006L3.49998 4.20001ZM19.4999 6.63006V6.20006H4.49988V6.63006L12.0001 11.3201L19.4999 6.63006ZM4.49988 8.99006V17.8001H19.4999V8.99006L12.5301 13.3501C12.2058 13.5527 11.7944 13.5527 11.4701 13.3501L4.49988 8.99006Z'
    />
  </IconRoot>
  )
}

MailLineIcon.displayName = 'MailLineIcon'

export default memo(MailLineIcon)
export { MailLineIcon }
