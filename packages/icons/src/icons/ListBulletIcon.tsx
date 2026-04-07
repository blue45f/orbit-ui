import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ListBulletIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M5 7C5.55228 7 6 6.55228 6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7Z" />
      <path d="M9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7H19C19.5523 7 20 6.55228 20 6C20 5.44772 19.5523 5 19 5H9Z" />
      <path d="M9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H9Z" />
      <path d="M8 18C8 17.4477 8.44772 17 9 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H9C8.44772 19 8 18.5523 8 18Z" />
      <path d="M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12Z" />
      <path d="M5 19C5.55228 19 6 18.5523 6 18C6 17.4477 5.55228 17 5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19Z" />
    </IconRoot>
  )
}

ListBulletIcon.displayName = 'ListBulletIcon'

export default memo(ListBulletIcon)
export { ListBulletIcon }
