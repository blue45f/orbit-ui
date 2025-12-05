import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ListViewLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.69971 3.70088C4.14742 3.70088 3.69971 4.1486 3.69971 4.70088V10.1009C3.69971 10.6532 4.14742 11.1009 4.69971 11.1009H19.2997C19.852 11.1009 20.2997 10.6532 20.2997 10.1009V4.70088C20.2997 4.1486 19.852 3.70088 19.2997 3.70088H4.69971ZM5.69971 9.10088V5.70088H18.2997V9.10088H5.69971Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.69971 12.9001C4.14742 12.9001 3.69971 13.3478 3.69971 13.9001V19.3001C3.69971 19.8524 4.14742 20.3001 4.69971 20.3001H19.2997C19.852 20.3001 20.2997 19.8524 20.2997 19.3001V13.9001C20.2997 13.3478 19.852 12.9001 19.2997 12.9001H4.69971ZM5.69971 18.3001V14.9001H18.2997V18.3001H5.69971Z'
    />
  </IconRoot>
  )
}

ListViewLineIcon.displayName = 'ListViewLineIcon'

export default memo(ListViewLineIcon)
export { ListViewLineIcon }
