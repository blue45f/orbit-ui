import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ChevronUpLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.26198 15.8748C4.63464 16.2824 5.26717 16.3107 5.67478 15.938L12 10.1549L18.3252 15.938C18.7328 16.3107 19.3654 16.2824 19.738 15.8748C20.1107 15.4672 20.0824 14.8346 19.6748 14.462L12.6748 8.06196C12.2927 7.71266 11.7073 7.71266 11.3252 8.06196L4.32524 14.462C3.91764 14.8346 3.88931 15.4672 4.26198 15.8748Z"
      />
    </IconRoot>
  )
}

ChevronUpLineIcon.displayName = 'ChevronUpLineIcon'

export default memo(ChevronUpLineIcon)
export { ChevronUpLineIcon }
