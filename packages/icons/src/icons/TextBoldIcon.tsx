import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TextBoldIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M17.5502 20.5V12.225H20V8.78193H17.5502V3.5H14.1435V20.5H17.5502ZM4.49761 19.1893C6.18182 17.9568 7.6555 16.607 8.97608 15.1789C10.5646 13.5748 12.6699 10.5035 12.6699 7.66686V4.92808H4V8.23418H9.14833C8.9378 9.9557 6.96651 12.8119 4.49761 14.9638V19.1893Z' />
  </IconRoot>
  )
}

TextBoldIcon.displayName = 'TextBoldIcon'

export default memo(TextBoldIcon)
export { TextBoldIcon }
