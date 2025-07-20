import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function AlertLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M10.9686 9.60077H13.0428L13.0428 14.6203H10.9686L10.9686 9.60077Z" />
      <path d="M10.9042 16.5715C10.9042 15.968 11.4022 15.4933 12.0057 15.4933C12.6093 15.4933 13.1073 15.968 13.1073 16.5715C13.1073 17.175 12.6093 17.6555 12.0057 17.6555C11.4022 17.6555 10.9042 17.175 10.9042 16.5715Z" />
      <path d="M13.7319 4.29999C12.9621 2.96666 11.0376 2.96665 10.2678 4.29999L2.47357 17.8C1.70377 19.1333 2.66602 20.8 4.20562 20.8H19.7941C21.3337 20.8 22.2959 19.1333 21.5261 17.8L13.7319 4.29999ZM4.20562 18.8L11.9998 5.29999L19.7941 18.8H4.20562Z" />
    </IconRoot>
  )
}

AlertLineIcon.displayName = 'AlertLineIcon'

export default memo(AlertLineIcon)
export { AlertLineIcon }
