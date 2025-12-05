import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function FacebookCircleIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      d='M12 2.59766C17.1915 2.59766 21.4 6.80618 21.4 11.9977C21.4 16.7327 17.8989 20.65 13.3443 21.3023V15.1672H15.3925L15.7823 12.6262H13.3443V10.9773C13.3443 10.2822 13.6849 9.60451 14.7769 9.60451H15.8853V7.44122C15.8853 7.44122 14.8794 7.26953 13.9176 7.26953C11.9097 7.26953 10.5973 8.48647 10.5973 10.6896V12.6262H8.3653V15.1672H10.5973V21.2937C6.07111 20.6165 2.59998 16.7124 2.59998 11.9977C2.59998 6.80618 6.8085 2.59766 12 2.59766Z'
      fill={props.color || '#1877F2'}
    />
  </IconRoot>
  )
}

FacebookCircleIcon.displayName = 'FacebookCircleIcon'

export default memo(FacebookCircleIcon)
export { FacebookCircleIcon }
