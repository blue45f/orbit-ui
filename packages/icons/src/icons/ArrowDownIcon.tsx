import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ArrowDownIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path d='M11.0015 16.4593V5.12891C11.0015 4.57662 11.4492 4.12891 12.0015 4.12891C12.5537 4.12891 13.0015 4.57662 13.0015 5.12891V16.4641L16.9002 12.5654C17.2907 12.1748 17.9239 12.1748 18.3144 12.5654C18.7049 12.9559 18.7049 13.589 18.3144 13.9796L12.7109 19.583C12.3204 19.9735 11.6873 19.9735 11.2967 19.583L5.69328 13.9796C5.30276 13.589 5.30276 12.9559 5.69328 12.5654C6.08381 12.1748 6.71697 12.1748 7.1075 12.5654L11.0015 16.4593Z' />
  </IconRoot>
  )
}

ArrowDownIcon.displayName = 'ArrowDownIcon'

export default memo(ArrowDownIcon)
export { ArrowDownIcon }
