import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PickupIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9938 2.4C16.2822 2.40005 19.7581 5.86747 19.7582 10.1447C19.7582 13.9608 17.068 17.326 12.3099 21.4367C12.1284 21.5936 11.8597 21.5936 11.6782 21.4367C6.92013 17.326 4.22998 13.9607 4.22998 10.1447C4.23 5.86744 7.70611 2.4 11.9938 2.4ZM14.8677 10.1898C14.9782 8.45604 13.5452 7.02658 11.8072 7.13604C10.3735 7.22623 9.21089 8.38683 9.1197 9.8163C9.00997 11.5501 10.4429 12.9795 12.1809 12.8701C13.6147 12.7799 14.7773 11.6193 14.8677 10.1898Z'
    />
  </IconRoot>
  )
}

PickupIcon.displayName = 'PickupIcon'

export default memo(PickupIcon)
export { PickupIcon }
