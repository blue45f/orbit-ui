import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TextStrikethroughIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M4.7998 7.44884V5.5201H12.829V7.66383C12.829 8.27878 12.733 8.89374 12.5628 9.5H15.0117V4H17.076V9.5H21V11.5H17.076V20H15.0117V11.5H11.7383C11.023 12.831 10.0427 14.0632 9.06777 15.0889C7.95693 16.2777 6.70967 17.3691 5.3065 18.4019L5.38295 15.556L5.7922 15.2838C7.07935 14.2374 8.22129 12.8653 9.07587 11.5H3V9.5H10.1239C10.4457 8.72845 10.6363 8.0202 10.6643 7.44884H4.7998Z" />
    </IconRoot>
  )
}

TextStrikethroughIcon.displayName = 'TextStrikethroughIcon'

export default memo(TextStrikethroughIcon)
export { TextStrikethroughIcon }
