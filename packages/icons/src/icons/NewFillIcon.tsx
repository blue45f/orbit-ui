import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function NewFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.40146 10.0921V17.65H5.2002V4.34998H7.89552L13.4241 11.8341H13.5989V4.34998H16.8002V17.65H14.1233L8.57625 10.0921H8.40146Z'
    />
  </IconRoot>
  )
}

NewFillIcon.displayName = 'NewFillIcon'

export default memo(NewFillIcon)
export { NewFillIcon }
