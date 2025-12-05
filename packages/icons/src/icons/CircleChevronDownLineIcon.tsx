import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleChevronDownLineIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9999 4.29999C7.74733 4.29999 4.29993 7.7474 4.29993 12C4.29993 16.2526 7.74733 19.7 11.9999 19.7C16.2525 19.7 19.6999 16.2526 19.6999 12C19.6999 7.7474 16.2525 4.29999 11.9999 4.29999ZM2.29993 12C2.29993 6.64283 6.64276 2.29999 11.9999 2.29999C17.3571 2.29999 21.6999 6.64283 21.6999 12C21.6999 17.3571 17.3571 21.7 11.9999 21.7C6.64276 21.7 2.29993 17.3571 2.29993 12Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.03032 10.2054C8.42084 9.81486 9.05401 9.81486 9.44453 10.2054L11.9999 12.7608L14.5553 10.2054C14.9458 9.81486 15.579 9.81486 15.9695 10.2054C16.3601 10.5959 16.3601 11.2291 15.9695 11.6196L12.707 14.8821C12.3165 15.2726 11.6833 15.2726 11.2928 14.8821L8.03032 11.6196C7.6398 11.2291 7.6398 10.5959 8.03032 10.2054Z'
    />
  </IconRoot>
  )
}

CircleChevronDownLineIcon.displayName = 'CircleChevronDownLineIcon'

export default memo(CircleChevronDownLineIcon)
export { CircleChevronDownLineIcon }
