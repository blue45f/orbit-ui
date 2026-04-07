import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function TemplateIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5.25C4 4.69772 4.44772 4.25 5 4.25H9.5C10.0523 4.25 10.5 4.69772 10.5 5.25V14.35C10.5 14.9023 10.0523 15.35 9.5 15.35H5C4.44772 15.35 4 14.9023 4 14.35V5.25ZM6 6.25V13.35H8.5V6.25H6Z"
      />
      <path d="M12 9.75C12 9.19772 12.4477 8.75 13 8.75H19C19.5523 8.75 20 9.19772 20 9.75C20 10.3023 19.5523 10.75 19 10.75H13C12.4477 10.75 12 10.3023 12 9.75Z" />
      <path d="M13 4.25C12.4477 4.25 12 4.69772 12 5.25C12 5.80228 12.4477 6.25 13 6.25H19C19.5523 6.25 20 5.80228 20 5.25C20 4.69772 19.5523 4.25 19 4.25H13Z" />
      <path d="M12 14.25C12 13.6977 12.4477 13.25 13 13.25H19C19.5523 13.25 20 13.6977 20 14.25C20 14.8023 19.5523 15.25 19 15.25H13C12.4477 15.25 12 14.8023 12 14.25Z" />
      <path d="M5 17.75C4.44772 17.75 4 18.1977 4 18.75C4 19.3023 4.44772 19.75 5 19.75H19C19.5523 19.75 20 19.3023 20 18.75C20 18.1977 19.5523 17.75 19 17.75H5Z" />
    </IconRoot>
  )
}

TemplateIcon.displayName = 'TemplateIcon'

export default memo(TemplateIcon)
export { TemplateIcon }
