import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PhotoIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5002 10.1C14.7822 10.1 14.2002 9.51797 14.2002 8.8C14.2002 8.08203 14.7822 7.5 15.5002 7.5C16.2182 7.5 16.8002 8.08203 16.8002 8.8C16.8002 9.51797 16.2182 10.1 15.5002 10.1Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.3999 4.40039C3.3999 3.84811 3.84762 3.40039 4.3999 3.40039H19.5999C20.1522 3.40039 20.5999 3.84811 20.5999 4.40039V19.6004C20.5999 20.1527 20.1522 20.6004 19.5999 20.6004H4.3999C3.84762 20.6004 3.3999 20.1527 3.3999 19.6004V4.40039ZM5.3999 5.40039V13.9333L8.79171 10.6571C9.18895 10.2734 9.82202 10.2844 10.2057 10.6816L17.8271 18.572L17.7977 18.6004H18.5999V5.40039H5.3999ZM5.3999 18.6004H15.0739L9.46194 12.7903L5.3999 16.7139V18.6004Z"
      />
    </IconRoot>
  )
}

PhotoIcon.displayName = 'PhotoIcon'

export default memo(PhotoIcon)
export { PhotoIcon }
