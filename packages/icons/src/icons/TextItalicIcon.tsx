import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TextItalicIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M6.40246 5.4672L5.89806 7.32882H11.7626C11.1453 9.24746 8.1263 12.7656 4.8415 14.8911L4.36105 15.1539L3.54036 17.9008C5.21364 16.9038 6.7463 15.8504 8.16803 14.703C10.5537 12.8032 13.1576 10.1698 13.8711 7.53632L14.4317 5.4672H6.40246ZM17.6379 9.3086L19.0762 4H17.0119L12.8277 19.4432H14.8919L17.1148 11.239H19.0637L19.5867 9.3086H17.6379Z" />
    </IconRoot>
  )
}

TextItalicIcon.displayName = 'TextItalicIcon'

export default memo(TextItalicIcon)
export { TextItalicIcon }
