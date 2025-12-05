import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function BoxFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M12.481 2.26605L19.5634 6.19276L16.6476 7.87232L9.18846 3.55387L11.5112 2.26605C11.8129 2.09882 12.1794 2.09882 12.481 2.26605Z' />
    <path d='M20.4825 7.50981V16.6823C20.4825 17.0452 20.2859 17.3796 19.9688 17.5561L12.7962 21.5481V11.9372L20.4825 7.50981Z' />
    <path d='M11.1962 21.5482L4.02345 17.5561C3.70636 17.3796 3.50977 17.0452 3.50977 16.6823V7.69656L11.1962 11.9449V21.5482Z' />
    <path d='M4.26296 6.28473L7.55724 4.45828L15.0469 8.79437L11.9896 10.5554L4.26296 6.28473Z' />
  </IconRoot>
  )
}

BoxFillIcon.displayName = 'BoxFillIcon'

export default memo(BoxFillIcon)
export { BoxFillIcon }
