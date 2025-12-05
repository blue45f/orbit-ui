import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function AlertFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.2678 4.29999C11.0376 2.96665 12.9621 2.96666 13.7319 4.29999L21.5261 17.8C22.2959 19.1333 21.3337 20.8 19.7941 20.8H4.20562C2.66602 20.8 1.70377 19.1333 2.47357 17.8L10.2678 4.29999ZM10.9686 9.60077L10.9686 14.6203H13.0428L13.0428 9.60077H10.9686ZM10.9042 16.5715C10.9042 17.175 11.4022 17.6555 12.0057 17.6555C12.6093 17.6555 13.1073 17.175 13.1073 16.5715C13.1073 15.968 12.6093 15.4933 12.0057 15.4933C11.4022 15.4933 10.9042 15.968 10.9042 16.5715Z'
    />
  </IconRoot>
  )
}

AlertFillIcon.displayName = 'AlertFillIcon'

export default memo(AlertFillIcon)
export { AlertFillIcon }
