import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps, IntellisenseFriendlyString } from '../types'

interface KakaoIconProps extends Omit<IconProps, 'color'> {
  /**
   * - 🚨 토큰 외 색상 사용 시 디자인 협의 후 사용해주세요.
   */
  color?: IntellisenseFriendlyString
}

function KakaoIcon(props: KakaoIconProps) {
  return (
  <IconRoot {...props}>
    <path
      d='M11.9942 4.16797C7.05809 4.16797 3.05688 7.33046 3.05688 11.2338C3.05688 13.7736 4.7512 15.9995 7.29604 17.2449C7.10872 17.9418 6.61933 19.7729 6.52145 20.1644C6.39995 20.6504 6.69864 20.6436 6.89609 20.5137C7.04966 20.4108 9.34474 18.8498 10.3353 18.1764C10.8737 18.2557 11.4272 18.2979 11.9942 18.2979C16.9303 18.2979 20.9315 15.1354 20.9315 11.2338C20.9315 7.33215 16.9303 4.16797 11.9942 4.16797Z'
      fill={props.color || '#FAE100'}
    />
  </IconRoot>
  )
}

KakaoIcon.displayName = 'KakaoIcon'

export default memo(KakaoIcon)
export { KakaoIcon }
