import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function FlashOnFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M13.6438 1.40968C14.0813 1.5538 14.3638 1.97812 14.3279 2.43734L13.7959 9.24813H17.781C18.1445 9.24813 18.4794 9.44539 18.6557 9.76332C18.8319 10.0812 18.8217 10.4698 18.6291 10.778L11.5091 22.1727C11.265 22.5634 10.7857 22.7367 10.3482 22.5926C9.91066 22.4485 9.62821 22.0242 9.66407 21.565L10.196 14.7542H6.21094C5.84743 14.7542 5.51255 14.5569 5.33632 14.239C5.16009 13.9211 5.17026 13.5325 5.36288 13.2243L12.4829 1.82956C12.727 1.43893 13.2063 1.26556 13.6438 1.40968Z" />
    </IconRoot>
  )
}

FlashOnFillIcon.displayName = 'FlashOnFillIcon'

export default memo(FlashOnFillIcon)
export { FlashOnFillIcon }
