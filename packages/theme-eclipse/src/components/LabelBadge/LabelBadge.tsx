import { ComponentThemeProps, Style, Badge, findComponent, polymorphic } from '@orbit-ui/core'
import { IconPropsContext } from '@orbit-ui/icons'
import { Children } from 'react'

import { vars } from '../../styles/theme.css'

export type LabelBadgeProps = {
  color?: 'gray' | 'benefit' | 'sale'

  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Style> &
  ComponentThemeProps<typeof vars.com.inlineBadge>

const LabelBadgeRoot = polymorphic<'span', 'span' | 'div', LabelBadgeProps>(
  (props, ref) => {
    const { as = 'span', theme, color = 'gray', children, ...rest } = props

    const { leading, trailing } = findComponent({
      childrenArray: Children.toArray(children),
      target: [
        {
          name: 'leading',
          component: LabelBadgeVisual,
        },
        {
          name: 'trailing',
          component: LabelBadgeLabel,
        },
      ],
    })

    return (
      <Badge
        as={as}
        ref={ref}
        theme={{
          ...vars.com.inlineBadge,
          ...vars.com.inlineBadge.variant.color[color],
          ...theme,
        }}
        {...rest}
      >
        {leading && <Badge.Leading>{leading}</Badge.Leading>}
        {trailing && <Badge.Trailing>{trailing}</Badge.Trailing>}
      </Badge>
    )
  },
  { useForwardRef: true }
)

export interface LabelBadgeVisualProps {
  children?: React.ReactNode
}

const LabelBadgeVisual: React.FC<LabelBadgeVisualProps> = ({ children }) => {
  return <IconPropsContext value={{ size: 10 }}>{children}</IconPropsContext>
}

export interface LabelBadgeLabelProps {
  children?: React.ReactNode
}

const LabelBadgeLabel: React.FC<LabelBadgeLabelProps> = ({ children }) => {
  return <>{children}</>
}

export const LabelBadge = Object.assign(LabelBadgeRoot, {
  Visual: LabelBadgeVisual,
  Label: LabelBadgeLabel,
})
