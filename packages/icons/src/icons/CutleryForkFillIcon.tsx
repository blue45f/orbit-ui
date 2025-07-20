import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CutleryForkFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.38 11.7187C4.38371 11.2137 3.01001 9.22813 3.01001 7.04219C3.01001 4.50749 4.85702 2.24219 7.38 2.24219C9.90299 2.24219 11.75 4.50748 11.75 7.04219C11.75 9.22813 10.3763 11.2137 8.38 11.7187V20.7578C8.38 21.3101 7.93229 21.7578 7.38 21.7578C6.82772 21.7578 6.38 21.3101 6.38 20.7578V11.7187Z"
      />
      <path d="M14 3C14.5523 3 15 3.44772 15 4V7.54703C15 8.51627 15.4303 9.26077 16 9.66391V4C16 3.44772 16.4477 3 17 3C17.5523 3 18 3.44772 18 4V9.66391C18.5697 9.26077 19 8.51627 19 7.54703V4C19 3.44772 19.4477 3 20 3C20.5523 3 21 3.44772 21 4V7.54703C21 9.52393 19.7978 11.3592 18 11.8637V20.76C18 21.3123 17.5523 21.76 17 21.76C16.4477 21.76 16 21.3123 16 20.76V11.8637C14.2022 11.3592 13 9.52393 13 7.54703V4C13 3.44772 13.4477 3 14 3Z" />
    </IconRoot>
  )
}

CutleryForkFillIcon.displayName = 'CutleryForkFillIcon'

export default memo(CutleryForkFillIcon)
export { CutleryForkFillIcon }
