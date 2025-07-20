import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleInfoLineIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M13.1016 8.02734C13.1016 8.63086 12.6035 9.10547 12 9.10547C11.3965 9.10547 10.8984 8.63086 10.8984 8.02734C10.8984 7.42383 11.3965 6.94336 12 6.94336C12.6035 6.94336 13.1016 7.42383 13.1016 8.02734Z" />
      <path d="M13.0371 16.5H10.957V9.97852H13.0371V16.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9998 2.2998C6.64264 2.2998 2.2998 6.64264 2.2998 11.9998C2.2998 17.357 6.64264 21.6998 11.9998 21.6998C17.357 21.6998 21.6998 17.357 21.6998 11.9998C21.6998 6.64264 17.357 2.2998 11.9998 2.2998ZM4.2998 11.9998C4.2998 7.74721 7.74721 4.2998 11.9998 4.2998C16.2524 4.2998 19.6998 7.74721 19.6998 11.9998C19.6998 16.2524 16.2524 19.6998 11.9998 19.6998C7.74721 19.6998 4.2998 16.2524 4.2998 11.9998Z"
      />
    </IconRoot>
  )
}

CircleInfoLineIcon.displayName = 'CircleInfoLineIcon'

export default memo(CircleInfoLineIcon)
export { CircleInfoLineIcon }
