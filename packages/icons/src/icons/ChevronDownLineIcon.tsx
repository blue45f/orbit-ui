import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ChevronDownLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.26198 8.12524C4.63464 7.71764 5.26717 7.68932 5.67478 8.06198L12 13.8451L18.3252 8.06198C18.7328 7.68932 19.3654 7.71764 19.738 8.12524C20.1107 8.53284 20.0824 9.16538 19.6748 9.53804L12.6748 15.938C12.2927 16.2873 11.7073 16.2873 11.3252 15.938L4.32524 9.53804C3.91764 9.16538 3.88931 8.53284 4.26198 8.12524Z'
    />
  </IconRoot>
  )
}

ChevronDownLineIcon.displayName = 'ChevronDownLineIcon'

export default memo(ChevronDownLineIcon)
export { ChevronDownLineIcon }
