import {
  ComponentThemeProps,
  Badge,
  findComponent,
  setupContext,
  polymorphic,
} from '@heejun-com/core'
import { IconPropsContext } from '@heejun-com/icons'
import { Children } from 'react'

import { vars } from '../../styles/theme-vars'

import * as styles from './AnimatedBadge.css'

export type AnimatedBadgeProps = {
  size?: 'small' | 'large'
  color?: 'white' | 'club' | 'sale'

  children?: React.ReactNode
} & ComponentThemeProps<typeof vars.com.dynamicBadge>

const [AnimatedBadgeProvider, useAnimatedBadgeContext] = setupContext<{
  size: AnimatedBadgeProps['size']
}>('AnimatedBadge')

const AnimatedBadgeRoot = polymorphic<'span', 'span' | 'div', AnimatedBadgeProps>(
  (props, ref) => {
    const { as = 'span', theme, size = 'large', color = 'white', children, ...rest } = props

    const { leading, label } = findComponent({
      childrenArray: Children.toArray(children),
      target: [
        {
          name: 'leading',
          component: AnimatedBadgeLeading,
        },
        {
          name: 'label',
          component: AnimatedBadgeLabel,
        },
      ],
    })

    return (
      <AnimatedBadgeProvider size={size}>
        <Badge
          as={as}
          ref={ref}
          theme={{
            ...vars.com.dynamicBadge,
            ...vars.com.dynamicBadge.variant.size[size],
            ...vars.com.dynamicBadge.variant.color[color],
            ...theme,
          }}
          {...rest}
        >
          {leading && (
            <Badge.Leading className={styles.slotLeading({ size })}>{leading}</Badge.Leading>
          )}
          {label && <Badge.Trailing>{label}</Badge.Trailing>}
        </Badge>
      </AnimatedBadgeProvider>
    )
  },
  { useForwardRef: true }
)

export interface AnimatedBadgeVisualProps {
  children?: React.ReactNode
}

const AnimatedBadgeLeading: React.FC<AnimatedBadgeVisualProps> = ({ children }) => {
  const { size } = useAnimatedBadgeContext('AnimatedBadgeLeading')

  return (
    <IconPropsContext value={{ size: size === 'small' ? 10 : 14 }}>{children}</IconPropsContext>
  )
}

export interface AnimatedBadgeLabelProps {
  children?: React.ReactNode
}

const AnimatedBadgeLabel: React.FC<AnimatedBadgeLabelProps> = ({ children }) => {
  return <>{children}</>
}

export const AnimatedBadge = Object.assign(AnimatedBadgeRoot, {
  Leading: AnimatedBadgeLeading,
  Label: AnimatedBadgeLabel,
})
