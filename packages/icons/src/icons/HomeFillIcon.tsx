import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function HomeFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M12.5963 3.19721C12.2422 2.93422 11.7577 2.93422 11.4036 3.19721L4.00367 8.69404C3.74969 8.8827 3.59998 9.18042 3.59998 9.4968V19.6454C3.59998 20.1977 4.04769 20.6454 4.59998 20.6454H11V14.8C11 14.2477 11.4477 13.8 12 13.8C12.5523 13.8 13 14.2477 13 14.8V20.6454H19.4C19.9523 20.6454 20.4 20.1977 20.4 19.6454V9.4968C20.4 9.18042 20.2503 8.8827 19.9963 8.69404L12.5963 3.19721Z' />
  </IconRoot>
  )
}

HomeFillIcon.displayName = 'HomeFillIcon'

export default memo(HomeFillIcon)
export { HomeFillIcon }
