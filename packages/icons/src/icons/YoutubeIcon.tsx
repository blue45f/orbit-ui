import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function YoutubeIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6076 5.59088C20.4466 5.81546 21.1059 6.47479 21.3305 7.31379H21.3289C21.7363 8.83296 21.7363 12.0045 21.7363 12.0045C21.7363 12.0045 21.7363 15.176 21.3289 16.6951C21.1043 17.5341 20.445 18.1935 19.606 18.418C18.0868 18.8255 11.9924 18.8255 11.9924 18.8255C11.9924 18.8255 5.89809 18.8255 4.37891 18.418C3.53992 18.1935 2.88059 17.5341 2.656 16.6951C2.24854 15.176 2.24854 12.0045 2.24854 12.0045C2.24854 12.0045 2.24854 8.83296 2.656 7.31379C2.88059 6.47479 3.53992 5.81546 4.37891 5.59088C5.89809 5.18341 11.9924 5.18341 11.9924 5.18341C11.9924 5.18341 18.0868 5.18341 19.6076 5.59088ZM15.1079 12.0008L10.0435 9.07794V14.9236L15.1079 12.0008Z"
        fill={props.color || '#EB3223'}
      />
    </IconRoot>
  )
}

YoutubeIcon.displayName = 'YoutubeIcon'

export default memo(YoutubeIcon)
export { YoutubeIcon }
