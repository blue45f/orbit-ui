import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function NotificationFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M12.0008 2.47656C12.5531 2.47656 13.0008 2.92428 13.0008 3.47656V4.19216C16.7256 4.68176 19.6008 7.86859 19.6008 11.727V17.877H19.7008C20.2531 17.877 20.7008 18.3247 20.7008 18.877C20.7008 19.4292 20.2531 19.877 19.7008 19.877H13.0008V20.5266C13.0008 21.0789 12.5531 21.5266 12.0008 21.5266C11.4485 21.5266 11.0008 21.0789 11.0008 20.5266V19.877H4.30078C3.7485 19.877 3.30078 19.4292 3.30078 18.877C3.30078 18.3247 3.7485 17.877 4.30078 17.877H4.40076V11.727C4.40076 7.86854 7.27603 4.68168 11.0008 4.19215V3.47656C11.0008 2.92428 11.4485 2.47656 12.0008 2.47656Z" />
    </IconRoot>
  )
}

NotificationFillIcon.displayName = 'NotificationFillIcon'

export default memo(NotificationFillIcon)
export { NotificationFillIcon }
