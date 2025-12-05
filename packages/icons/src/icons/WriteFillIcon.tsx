import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function WriteFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M16.8355 3.24943C16.5029 2.91686 15.9637 2.91686 15.6312 3.24943L13.3118 5.56631L18.3516 10.6061L20.6677 8.28597C21.0003 7.9534 21.0003 7.4142 20.6677 7.08163L16.8355 3.24943Z' />
    <path d='M12.0809 6.80273L17.2666 11.986L8.51247 20.7426C8.34628 20.9087 8.12034 21.0012 7.88533 20.9993L4.38666 21C3.67068 20.999 3.08825 20.427 3.07045 19.7151L3.07003 19.6815L3.07004 16.1862C3.06812 15.9513 3.16064 15.7255 3.32682 15.5594L12.0809 6.80273Z' />
  </IconRoot>
  )
}

WriteFillIcon.displayName = 'WriteFillIcon'

export default memo(WriteFillIcon)
export { WriteFillIcon }
