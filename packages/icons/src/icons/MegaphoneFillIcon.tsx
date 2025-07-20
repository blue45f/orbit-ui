import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function MegaphoneFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M19.8008 3.59961V18.8723C19.8008 19.2411 19.5978 19.5799 19.2726 19.7539C18.9475 19.928 18.5529 19.9089 18.2461 19.7043L14.6796 17.3267H10.2554V20.7811C10.2554 21.3333 9.80772 21.7811 9.25543 21.7811C8.70315 21.7811 8.25543 21.3333 8.25543 20.7811V17.3267H4.80078C4.2485 17.3267 3.80078 16.879 3.80078 16.3267V6.14493C3.80078 5.59265 4.2485 5.14493 4.80078 5.14493H14.68L18.2461 2.76756C18.5529 2.56299 18.9475 2.54392 19.2726 2.71794C19.5978 2.89196 19.8008 3.23082 19.8008 3.59961Z" />
    </IconRoot>
  )
}

MegaphoneFillIcon.displayName = 'MegaphoneFillIcon'

export default memo(MegaphoneFillIcon)
export { MegaphoneFillIcon }
