import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CopyFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M4.7002 3.7002C4.14791 3.7002 3.7002 4.14791 3.7002 4.7002V15.7761C3.7002 16.3283 4.14791 16.7761 4.7002 16.7761H15.7761C16.3283 16.7761 16.7761 16.3283 16.7761 15.7761V4.7002C16.7761 4.14791 16.3283 3.7002 15.7761 3.7002H4.7002Z' />
    <path d='M7.22412 19.3V18.36H18.3701V7.22412H19.3C19.8523 7.22412 20.3 7.67184 20.3 8.22412V19.3C20.3 19.8523 19.8523 20.3 19.3 20.3H8.22412C7.67184 20.3 7.22412 19.8523 7.22412 19.3Z' />
  </IconRoot>
  )
}

CopyFillIcon.displayName = 'CopyFillIcon'

export default memo(CopyFillIcon)
export { CopyFillIcon }
