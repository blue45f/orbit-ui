import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function DrawingMenuIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.3331 5.28327C5.34233 4.73106 5.79747 4.29089 6.34968 4.30013L17.876 4.49294C18.4282 4.50217 18.8683 4.95731 18.8591 5.50952C18.8499 6.06173 18.3947 6.50189 17.8425 6.49266L6.31623 6.29985C5.76402 6.29061 5.32386 5.83547 5.3331 5.28327Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.37245 12.0482C4.37245 11.4959 4.82016 11.0482 5.37245 11.0482H16.4185C16.9707 11.0482 17.4185 11.4959 17.4185 12.0482C17.4185 12.6005 16.9707 13.0482 16.4185 13.0482H5.37245C4.82016 13.0482 4.37245 12.6005 4.37245 12.0482Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2994 18.1849C20.3176 18.7369 19.8849 19.1991 19.333 19.2174L4.73296 19.6994C4.18098 19.7177 3.71873 19.285 3.70051 18.733C3.68228 18.181 4.11498 17.7187 4.66696 17.7005L19.267 17.2185C19.8189 17.2002 20.2812 17.6329 20.2994 18.1849Z"
      />
    </IconRoot>
  )
}

DrawingMenuIcon.displayName = 'DrawingMenuIcon'

export default memo(DrawingMenuIcon)
export { DrawingMenuIcon }
