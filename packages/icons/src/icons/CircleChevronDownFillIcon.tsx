import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CircleChevronDownFillIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.9999 2.29999C6.64276 2.29999 2.29993 6.64283 2.29993 12C2.29993 17.3571 6.64276 21.7 11.9999 21.7C17.3571 21.7 21.6999 17.3571 21.6999 12C21.6999 6.64283 17.3571 2.29999 11.9999 2.29999ZM9.44453 10.2054C9.05401 9.81486 8.42084 9.81486 8.03032 10.2054C7.6398 10.5959 7.6398 11.2291 8.03032 11.6196L11.2928 14.8821C11.6833 15.2726 12.3165 15.2726 12.707 14.8821L15.9695 11.6196C16.3601 11.2291 16.3601 10.5959 15.9695 10.2054C15.579 9.81486 14.9458 9.81486 14.5553 10.2054L11.9999 12.7608L9.44453 10.2054Z'
    />
  </IconRoot>
  )
}

CircleChevronDownFillIcon.displayName = 'CircleChevronDownFillIcon'

export default memo(CircleChevronDownFillIcon)
export { CircleChevronDownFillIcon }
