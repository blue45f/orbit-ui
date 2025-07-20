import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CardLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6 6.19922H4.39999V8.39844H19.6V6.19922ZM19.6 10.3984H4.39999V17.7992H19.6V10.3984ZM20.1168 4.19922C20.943 4.19922 21.6 4.8719 21.6 5.68598V18.3125C21.6 19.1265 20.943 19.7992 20.1168 19.7992H3.88314C3.05701 19.7992 2.39999 19.1265 2.39999 18.3125V5.68598C2.39999 4.8719 3.05701 4.19922 3.88314 4.19922H20.1168ZM6 15C6 14.4477 6.44771 14 7 14H10C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16H7C6.44771 16 6 15.5523 6 15Z"
      />
    </IconRoot>
  )
}

CardLineIcon.displayName = 'CardLineIcon'

export default memo(CardLineIcon)
export { CardLineIcon }
