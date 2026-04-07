import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function ListFoldedFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.69995 3.80313C3.69995 3.25085 4.14767 2.80313 4.69995 2.80313H19.3C19.8522 2.80313 20.3 3.25085 20.3 3.80313V16.821C20.3 17.315 20.1171 17.7916 19.7866 18.1589L17.6412 20.5426C17.2619 20.964 16.7216 21.2047 16.1546 21.2047H4.69995C4.14767 21.2047 3.69995 20.757 3.69995 20.2047V3.80313ZM7.75 9.20157C7.75 8.64928 8.19772 8.20157 8.75 8.20157H15.25C15.8023 8.20157 16.25 8.64928 16.25 9.20157C16.25 9.75385 15.8023 10.2016 15.25 10.2016H8.75C8.19772 10.2016 7.75 9.75385 7.75 9.20157ZM8.75 12.8031C8.19772 12.8031 7.75 13.2508 7.75 13.8031C7.75 14.3554 8.19772 14.8031 8.75 14.8031H15.25C15.8023 14.8031 16.25 14.3554 16.25 13.8031C16.25 13.2508 15.8023 12.8031 15.25 12.8031H8.75Z"
      />
    </IconRoot>
  )
}

ListFoldedFillIcon.displayName = 'ListFoldedFillIcon'

export default memo(ListFoldedFillIcon)
export { ListFoldedFillIcon }
