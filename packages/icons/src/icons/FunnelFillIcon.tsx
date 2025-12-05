import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function FunnelFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M4.65306 3H19.3469C20.2599 3 21 3.7401 21 4.65306V5.94445C21 6.41307 20.8011 6.85967 20.4528 7.17317L15.141 11.9537C14.9733 12.1047 14.8776 12.3197 14.8776 12.5453V19.3469C14.8776 20.2599 14.1375 21 13.2245 21H10.7755C9.86255 21 9.12245 20.2599 9.12245 19.3469V12.5453C9.12245 12.3197 9.02668 12.1047 8.85897 11.9537L3.54722 7.17317C3.1989 6.85967 3 6.41308 3 5.94445V4.65306C3 3.7401 3.7401 3 4.65306 3Z' />
  </IconRoot>
  )
}

FunnelFillIcon.displayName = 'FunnelFillIcon'

export default memo(FunnelFillIcon)
export { FunnelFillIcon }
