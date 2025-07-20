import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function CallFillIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5409 15.6398L18.195 13.9283C17.422 13.4249 16.9624 13.1634 16.4386 13.6872L14.9289 15.3033C14.1765 15.9853 13.399 14.8767 11.2411 12.7069C9.08311 10.5372 7.90937 9.74386 8.58162 8.97254L10.1024 7.7403C10.4762 7.36442 10.4985 6.75526 10.153 6.35392L8.28141 3.59452C7.58843 2.81016 6.27339 2.77044 5.53988 3.51099L3.53547 5.16177C2.42204 6.2833 1.86178 10.363 7.69032 16.2233C11.5058 20.0596 14.3375 21.02 16.4103 21.02C17.5025 21.02 18.2806 20.7093 18.6656 20.3222L20.629 18.4014C20.9846 18.0438 21.1812 17.5691 21.1812 17.0629C21.1812 16.5209 20.9492 16.0045 20.5409 15.6398Z"
      />
    </IconRoot>
  )
}

CallFillIcon.displayName = 'CallFillIcon'

export default memo(CallFillIcon)
export { CallFillIcon }
