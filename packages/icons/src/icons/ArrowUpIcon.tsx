import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ArrowUpIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M11.0015 7.54556V18.876C11.0015 19.4283 11.4492 19.876 12.0015 19.876C12.5537 19.876 13.0015 19.4283 13.0015 18.876V7.54081L16.9002 11.4395C17.2907 11.8301 17.9239 11.8301 18.3144 11.4395C18.7049 11.049 18.7049 10.4158 18.3144 10.0253L12.7109 4.42187C12.3204 4.03134 11.6873 4.03134 11.2967 4.42187L5.69328 10.0253C5.30276 10.4158 5.30276 11.049 5.69328 11.4395C6.08381 11.8301 6.71697 11.8301 7.1075 11.4395L11.0015 7.54556Z' />
  </IconRoot>
  )
}

ArrowUpIcon.displayName = 'ArrowUpIcon'

export default memo(ArrowUpIcon)
export { ArrowUpIcon }
