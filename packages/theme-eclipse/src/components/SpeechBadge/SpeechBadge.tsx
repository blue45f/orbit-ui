import { ComponentThemeProps, Style, Badge, polymorphic } from '@heejun-com/core'

import { vars } from '../../styles/theme-vars'

import * as styles from './SpeechBadge.css'

export type SpeechBadgeProps = {
  color?: 'pink' | 'blue'
  tailPosition?: 'leading' | 'trailing'

  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Style> &
  ComponentThemeProps<typeof vars.com.bubbleBadge>

export const SpeechBadge = polymorphic<'span', 'span' | 'div', SpeechBadgeProps>(
  (props, ref) => {
    const {
      as = 'span',
      theme,
      color = 'pink',
      tailPosition = 'leading',
      children,
      ...rest
    } = props

    return (
      <Badge
        as={as}
        ref={ref}
        theme={{
          ...vars.com.bubbleBadge,
          ...vars.com.bubbleBadge.variant.color[color],
          ...theme,
        }}
        {...rest}
      >
        <Badge.Trailing>{children}</Badge.Trailing>

        <span className={styles.tail({ position: tailPosition, color })}>
          <SpeechBadgeTail />
        </span>
      </Badge>
    )
  },
  { useForwardRef: true }
)

const SpeechBadgeTail: React.FC = () => {
  return (
    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 5V0H8.2998C6.5 1.5 3.5 3.5 0 5Z" fill="currentColor" />
    </svg>
  )
}
