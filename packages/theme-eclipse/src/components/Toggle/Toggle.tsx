import {
  ComponentThemeProps,
  BaseToggle,
  BaseToggleProps,
  BaseToggleSpecificProps,
} from '@orbit-ui/core'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

import * as styles from './Toggle.css'

export type ToggleProps = Omit<BaseToggleProps, keyof BaseToggleSpecificProps> &
  ComponentThemeProps<typeof vars.com.switch>

/**
 * ### 💡 알아두기
 * - 기능을 켜거나 끌 때 사용하는 컴포넌트에요.
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/file/7XA6IhjH8PVaCviMAgITnx/%F0%9F%A9%B5-NEW-%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-(%EC%82%AC%EC%9A%A9%EC%A3%BC%EC%9D%98!!%ED%95%9C%EC%B0%BD%EC%9E%91%EC%97%85%EC%A4%91!!!!)?type=design&node-id=2921-315415)
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const { theme, ...rest } = props

  return (
    <BaseToggle
      ref={ref}
      {...rest}
      theme={{ ...vars.com.switch, ...theme }}
      width={38}
      height={24}
      borderWidth={1}
    >
      <BaseToggle.Thumb className={styles.thumb} width={18} height={18} />
    </BaseToggle>
  )
})

/** @deprecated Use Toggle instead */
export const Switch = Toggle
