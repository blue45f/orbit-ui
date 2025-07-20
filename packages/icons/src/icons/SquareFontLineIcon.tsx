import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function SquareFontLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.19995 6.20001C3.19995 4.54316 4.5431 3.20001 6.19995 3.20001H17.8C19.4568 3.20001 20.8 4.54316 20.8 6.20001V17.8C20.8 19.4569 19.4568 20.8 17.8 20.8H6.19995C4.5431 20.8 3.19995 19.4569 3.19995 17.8V6.20001ZM6.19995 5.20001C5.64767 5.20001 5.19995 5.64773 5.19995 6.20001V17.8C5.19995 18.3523 5.64767 18.8 6.19995 18.8H17.8C18.3522 18.8 18.8 18.3523 18.8 17.8V6.20001C18.8 5.64773 18.3522 5.20001 17.8 5.20001H6.19995Z"
      />
      <path d="M15.06 16.33V12.1H16.34V10.34H15.06V7.64001H13.28V16.33H15.06ZM8.23995 15.66C9.11995 15.03 9.88995 14.34 10.58 13.61C11.41 12.79 12.51 11.22 12.51 9.77001V8.37001H7.97995V10.06H10.67C10.56 10.94 9.52995 12.4 8.23995 13.5V15.66Z" />
    </IconRoot>
  )
}

SquareFontLineIcon.displayName = 'SquareFontLineIcon'

export default memo(SquareFontLineIcon)
export { SquareFontLineIcon }
