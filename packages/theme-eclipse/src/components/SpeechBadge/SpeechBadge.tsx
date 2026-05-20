import { ComponentThemeProps, Style, Badge, polymorphic } from '@heejun-com/core'
import clsx from 'clsx'

import { vars } from '../../styles/theme-vars'

const speechBadgeTail = (opts: {
  color: 'pink' | 'blue'
  position: 'leading' | 'trailing'
}) =>
  clsx('absolute w-[9px] h-[5px]', {
    '[color:var(--com-eclipse-bubbleBadge-fillColor-color-pink)]': opts.color === 'pink',
    '[color:var(--com-eclipse-bubbleBadge-fillColor-color-blue)]': opts.color === 'blue',
    'bottom-0 left-[7.7px] scale-x-[-1]': opts.position === 'leading',
    'right-[7.7px] bottom-0': opts.position === 'trailing',
  })

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

        <span className={speechBadgeTail({ position: tailPosition, color })}>
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
