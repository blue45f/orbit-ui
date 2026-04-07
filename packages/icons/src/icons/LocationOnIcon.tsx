import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function LocationOnIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        d="M17.2715 6.86795L18.3647 5.15006C20.29 6.88863 21.5 9.40443 21.5 12.2028C21.5 17.4495 17.2467 21.7028 12 21.7028C6.75329 21.7028 2.5 17.4495 2.5 12.2028C2.5 9.40446 3.70993 6.88869 5.63519 5.15012L6.7284 6.86801C5.57629 8.00656 4.79112 9.51559 4.56622 11.2018H7.2187C7.77099 11.2018 8.2187 11.6495 8.2187 12.2018C8.2187 12.7541 7.77099 13.2018 7.2187 13.2018H4.56595C5.01087 16.5446 7.6576 19.1916 11.0003 19.6368V16.9841C11.0003 16.4318 11.448 15.9841 12.0003 15.9841C12.5526 15.9841 13.0003 16.4318 13.0003 16.9841V19.6367C16.3427 19.1912 18.9892 16.5444 19.434 13.2018H16.7812C16.229 13.2018 15.7812 12.7541 15.7812 12.2018C15.7812 11.6495 16.229 11.2018 16.7812 11.2018H19.4338C19.2089 9.51556 18.4237 8.0065 17.2715 6.86795Z"
        fill="url(#paint0_linear_0_7999)"
      />
      <path
        d="M4.20843 0.0599976L10.4335 9.85136C11.0972 10.8954 12.7006 10.8954 13.3644 9.85136L19.5894 0.0599976H4.20843Z"
        fill="url(#paint1_linear_0_7999)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_7999"
          x1="11.899"
          y1="0.866423"
          x2="11.899"
          y2="11.7532"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#222222" stopOpacity="0" />
          <stop offset="1" stopColor="#222222" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_7999"
          x1="11.899"
          y1="0.866423"
          x2="11.899"
          y2="11.7532"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#222222" stopOpacity="0" />
          <stop offset="1" stopColor="#222222" />
        </linearGradient>
      </defs>
    </IconRoot>
  )
}

LocationOnIcon.displayName = 'LocationOnIcon'

export default memo(LocationOnIcon)
export { LocationOnIcon }
