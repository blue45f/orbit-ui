import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps, IntellisenseFriendlyString } from '../types'

interface FacebookIconProps extends Omit<IconProps, 'color'> {
  /**
   * - 🚨 토큰 외 색상 사용 시 디자인 협의 후 사용해주세요.
   */
  color?: IntellisenseFriendlyString
}

function FacebookIcon(props: FacebookIconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.58 6.14394V2.69922H14.3911C11.4616 2.69922 9.60901 4.68322 9.60901 7.52158V9.58866H6.42004V13.0321H9.60901V21.2992H13.5945V13.0321H16.7835L17.58 9.58866H13.5945V8.20978C13.5945 6.83338 14.3925 6.14394 15.9856 6.14394H17.58Z'
      fill={props.color || '#181A1C'}
    />
  </IconRoot>
  )
}

FacebookIcon.displayName = 'FacebookIcon'

export default memo(FacebookIcon)
export { FacebookIcon }
