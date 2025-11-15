import {
  ComponentThemeProps,
  IndicatorBadge,
  IndicatorBadgeProps,
  IndicatorBadgeSpecificProps,
  polymorphic,
} from '@orbit-ui/core'

import { vars } from '../../styles/theme.css'

const MAX_COUNT = 99

type CounterBadgeProps = Omit<IndicatorBadgeProps, keyof IndicatorBadgeSpecificProps> &
  ComponentThemeProps<typeof vars.com.countBadge> & { children: number }

export const CounterBadge = polymorphic<'span', 'span' | 'div', CounterBadgeProps>(
  (props, ref) => {
    const { as = 'span', theme, children, ...rest } = props
    const isOver = children > MAX_COUNT

    return (
      <IndicatorBadge
        as={as}
        ref={ref}
        theme={{ ...vars.com.countBadge, ...theme }}
        {...rest}
        width={isOver ? 29 : 18}
        height={18}
      >
        {isOver ? `${MAX_COUNT}+` : children}
      </IndicatorBadge>
    )
  },
  { useForwardRef: true }
)
