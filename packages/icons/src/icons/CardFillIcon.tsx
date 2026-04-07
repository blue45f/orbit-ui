import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CardFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 5.68598C21.6 4.8719 20.943 4.19922 20.1168 4.19922H3.88314C3.05701 4.19922 2.39999 4.87189 2.39999 5.68598V8.39844H21.6V5.68598ZM21.6 10.3984H2.39999V18.3125C2.39999 19.1265 3.05701 19.7992 3.88314 19.7992H20.1168C20.943 19.7992 21.6 19.1265 21.6 18.3125V10.3984ZM4.99999 16C4.99999 15.4477 5.44771 15 5.99999 15H8.99999C9.55228 15 9.99999 15.4477 9.99999 16C9.99999 16.5523 9.55228 17 8.99999 17H5.99999C5.44771 17 4.99999 16.5523 4.99999 16Z"
      />
    </IconRoot>
  )
}

CardFillIcon.displayName = 'CardFillIcon'

export default memo(CardFillIcon)
export { CardFillIcon }
