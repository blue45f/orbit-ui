import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function PeopleFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M6.88753 14.1138C8.24422 13.2959 10.0542 12.8225 12 12.8225C13.9458 12.8225 15.7558 13.2959 17.1125 14.1138C18.45 14.9201 19.5 16.172 19.5 17.7409V19.3083C19.5 19.8605 19.0523 20.3083 18.5 20.3083H5.5C4.94772 20.3083 4.5 19.8605 4.5 19.3083V17.7409C4.5 16.172 5.55002 14.9201 6.88753 14.1138Z" />
      <path d="M7.8 7.87969C7.8 5.56009 9.6804 3.67969 12 3.67969C14.3196 3.67969 16.2 5.56009 16.2 7.87969C16.2 10.1993 14.3196 12.0797 12 12.0797C9.6804 12.0797 7.8 10.1993 7.8 7.87969Z" />
    </IconRoot>
  )
}

PeopleFillIcon.displayName = 'PeopleFillIcon'

export default memo(PeopleFillIcon)
export { PeopleFillIcon }
