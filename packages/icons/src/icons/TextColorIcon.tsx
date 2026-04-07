import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TextColorIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M14.2802 4V8.8125H16.3302V10.5625H14.2802V18H12.1356V4H14.2802Z" />
      <path d="M3.2002 5.32933V7.24925H7.78787C7.70261 8.98859 6.07662 11.7115 3.70634 13.6385L3.64356 16.6009C4.87133 15.6972 5.96268 14.7422 6.93467 13.702C8.57169 11.9798 10.2258 9.59242 10.2258 7.20509V5.32933H3.2002Z" />
      <path d="M16.7998 15C16.2475 15 15.7998 15.4477 15.7998 16V19C15.7998 19.5523 16.2475 20 16.7998 20H19.7998C20.3521 20 20.7998 19.5523 20.7998 19V16C20.7998 15.4477 20.3521 15 19.7998 15H16.7998Z" />
    </IconRoot>
  )
}

TextColorIcon.displayName = 'TextColorIcon'

export default memo(TextColorIcon)
export { TextColorIcon }
