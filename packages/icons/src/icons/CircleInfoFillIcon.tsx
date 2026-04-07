import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleInfoFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.29999 12C2.29999 6.64283 6.64283 2.29999 12 2.29999C17.3571 2.29999 21.7 6.64283 21.7 12C21.7 17.3571 17.3571 21.7 12 21.7C6.64283 21.7 2.29999 17.3571 2.29999 12ZM13.1015 8.02734C13.1015 8.63086 12.6035 9.10547 11.9999 9.10547C11.3964 9.10547 10.8984 8.63086 10.8984 8.02734C10.8984 7.42383 11.3964 6.94336 11.9999 6.94336C12.6035 6.94336 13.1015 7.42383 13.1015 8.02734ZM13.037 16.5H10.957V9.97852H13.037V16.5Z"
      />
    </IconRoot>
  )
}

CircleInfoFillIcon.displayName = 'CircleInfoFillIcon'

export default memo(CircleInfoFillIcon)
export { CircleInfoFillIcon }
