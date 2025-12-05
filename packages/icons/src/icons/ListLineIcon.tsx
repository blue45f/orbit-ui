import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ListLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.70007 4.20001C3.70007 3.64773 4.14779 3.20001 4.70007 3.20001H19.3001C19.8524 3.20001 20.3001 3.64773 20.3001 4.20001V19.8C20.3001 20.3523 19.8524 20.8 19.3001 20.8H4.70007C4.14779 20.8 3.70007 20.3523 3.70007 19.8V4.20001ZM5.70007 5.20001V18.8H18.3001V5.20001H5.70007Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.31625 9.86285C8.31625 9.31057 8.76397 8.86285 9.31625 8.86285H14.6839C15.2362 8.86285 15.6839 9.31057 15.6839 9.86285C15.6839 10.4151 15.2362 10.8629 14.6839 10.8629H9.31625C8.76397 10.8629 8.31625 10.4151 8.31625 9.86285Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.31625 14.137C8.31625 13.5847 8.76397 13.137 9.31625 13.137H14.6839C15.2362 13.137 15.6839 13.5847 15.6839 14.137C15.6839 14.6893 15.2362 15.137 14.6839 15.137H9.31625C8.76397 15.137 8.31625 14.6893 8.31625 14.137Z'
    />
  </IconRoot>
  )
}

ListLineIcon.displayName = 'ListLineIcon'

export default memo(ListLineIcon)
export { ListLineIcon }
