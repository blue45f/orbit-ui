import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function LineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      d='M20.7464 11.2726C20.7464 7.35736 16.8215 4.17188 11.9968 4.17188C7.17207 4.17188 3.24634 7.35736 3.24634 11.2726C3.24634 14.7826 6.35903 17.7216 10.5637 18.2777C10.8487 18.3391 11.2364 18.4654 11.3346 18.7092C11.4232 18.9302 11.3925 19.2766 11.3627 19.5003C11.3627 19.5003 11.2601 20.1177 11.2381 20.2493C11.2004 20.4703 11.0627 21.1141 11.9959 20.7212C12.93 20.3274 17.0346 17.7541 18.8703 15.6412C20.1386 14.2511 20.7464 12.8399 20.7464 11.2726Z'
      fill={props.color || '#06C755'}
    />
  </IconRoot>
  )
}

LineIcon.displayName = 'LineIcon'

export default memo(LineIcon)
export { LineIcon }
