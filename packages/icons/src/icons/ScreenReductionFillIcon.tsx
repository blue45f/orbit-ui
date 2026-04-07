import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ScreenReductionFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M3 10.4395C3 6.29732 6.35786 2.93945 10.5 2.93945C14.6421 2.93945 18 6.29732 18 10.4395C18 12.1782 17.4083 13.7787 16.4154 15.0507L20.7071 19.3425C21.0976 19.733 21.0976 20.3661 20.7071 20.7567C20.3166 21.1472 19.6834 21.1472 19.2929 20.7567L14.9864 16.4502C13.7353 17.3856 12.1823 17.9395 10.5 17.9395C6.35786 17.9395 3 14.5816 3 10.4395ZM7.5 9.4393C6.94772 9.4393 6.5 9.88702 6.5 10.4393C6.5 10.9916 6.94772 11.4393 7.5 11.4393H13.5C14.0523 11.4393 14.5 10.9916 14.5 10.4393C14.5 9.88702 14.0523 9.4393 13.5 9.4393H7.5Z" />
    </IconRoot>
  )
}

ScreenReductionFillIcon.displayName = 'ScreenReductionFillIcon'

export default memo(ScreenReductionFillIcon)
export { ScreenReductionFillIcon }
