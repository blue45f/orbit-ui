import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ArrowLeftIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M12.9499 5.66609L7.61799 10.998H18.8151C19.3674 10.998 19.8151 11.4458 19.8151 11.998C19.8151 12.5503 19.3674 12.998 18.8151 12.998H7.61278L12.9499 18.3352C13.3405 18.7257 13.3405 19.3589 12.9499 19.7494C12.5594 20.1399 11.9263 20.1399 11.5357 19.7494L4.49407 12.7078C4.10354 12.3172 4.10354 11.6841 4.49407 11.2935L11.5357 4.25188C11.9263 3.86135 12.5594 3.86135 12.9499 4.25188C13.3405 4.6424 13.3405 5.27557 12.9499 5.66609Z" />
    </IconRoot>
  )
}

ArrowLeftIcon.displayName = 'ArrowLeftIcon'

export default memo(ArrowLeftIcon)
export { ArrowLeftIcon }
