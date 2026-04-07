import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CheckIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.222 6.70816C20.6041 7.10693 20.5906 7.73995 20.1919 8.12205L9.96459 17.9221C9.7658 18.1125 9.49726 18.2126 9.22229 18.1988C8.94731 18.1849 8.69023 18.0582 8.51164 17.8487L3.73891 12.2487C3.38067 11.8283 3.43101 11.1972 3.85135 10.8389C4.27168 10.4807 4.90284 10.531 5.26108 10.9514L9.34623 15.7446L18.8081 6.678C19.2069 6.29589 19.8399 6.3094 20.222 6.70816Z"
      />
    </IconRoot>
  )
}

CheckIcon.displayName = 'CheckIcon'

export default memo(CheckIcon)
export { CheckIcon }
