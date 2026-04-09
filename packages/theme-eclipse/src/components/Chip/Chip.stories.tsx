import { CheckIcon, ChevronDownLineIcon, StarLineIcon, HeartLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { vars } from '../../styles'

import { Chip } from './Chip'
import * as styles from './Chip.stories.css'

Chip.displayName = 'Chip'
Chip.Leading.displayName = 'Chip.Leading'
Chip.Trailing.displayName = 'Chip.Trailing'

const meta = {
  title: 'eclipse/Actions/Chips/Chip',
  component: Chip,
  args: {},
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Inline SVG placeholder used as a safe, copyright-free image avatar */
const AvatarPlaceholder = ({ size = 24, color = '#6366f1' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="9" r="3.5" fill={color} fillOpacity="0.7" />
    <path d="M5 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const 기본: Story = {
  render: (args) => {
    return <Chip {...args}>Chip</Chip>
  },
}

export const 아이콘: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <CheckIcon />
        </Chip.Leading>
        Chip
        <Chip.Trailing>
          <ChevronDownLineIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
}

export const 이미지: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <AvatarPlaceholder size={24} color="#6366f1" />
        </Chip.Leading>
        Orbit User
      </Chip>
    )
  },
}

export const 썸네일: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <AvatarPlaceholder size={30} color="#8b5cf6" />
        </Chip.Leading>
        <span style={{ paddingLeft: vars.ref.spacing[50] }}>Design System</span>
        <Chip.Trailing>
          <ChevronDownLineIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
}

export const 모든상태: Story = {
  render: () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            <th>Leading O</th>
            <th>Leading X</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Trailing O</th>
            <td>
              <Chip>
                <Chip.Leading>
                  <CheckIcon />
                </Chip.Leading>
                Chip
                <Chip.Trailing>
                  <ChevronDownLineIcon />
                </Chip.Trailing>
              </Chip>
            </td>
            <td>
              <Chip>
                Chip
                <Chip.Trailing>
                  <ChevronDownLineIcon size={18} />
                </Chip.Trailing>
              </Chip>
            </td>
          </tr>
          <tr>
            <th>Trailing X</th>
            <td>
              <Chip>
                <Chip.Leading>
                  <AvatarPlaceholder size={24} color="#6366f1" />
                </Chip.Leading>
                Chip
              </Chip>
            </td>
            <td>
              {' '}
              <Chip>Chip</Chip>
            </td>
          </tr>
        </tbody>
      </table>
    )
  },
}

export const 디자인_QA = {
  args: {
    leading: false,
    trailing: false,
    borderWidth: 1,
    variant: 'default',
    text: 'Chip',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon', 'image', 'thumbnail'],
    },
  },
  // eslint-disable-next-line
  render: ({ leading, trailing, variant, text, ...rest }: any) => {
    if (variant === 'icon') {
      return (
        <Chip {...rest}>
          {leading && (
            <Chip.Leading>
              <StarLineIcon />
            </Chip.Leading>
          )}
          {text}
          {trailing && (
            <Chip.Trailing>
              <ChevronDownLineIcon />
            </Chip.Trailing>
          )}
        </Chip>
      )
    }

    if (variant === 'image') {
      return (
        <Chip {...rest}>
          {leading && (
            <Chip.Leading>
              <AvatarPlaceholder size={24} color="#6366f1" />
            </Chip.Leading>
          )}
          {text}
          {trailing && (
            <Chip.Trailing>
              <ChevronDownLineIcon />
            </Chip.Trailing>
          )}
        </Chip>
      )
    }
    if (variant === 'thumbnail') {
      return (
        <Chip {...rest}>
          {leading && (
            <Chip.Leading>
              <AvatarPlaceholder size={30} color="#8b5cf6" />
            </Chip.Leading>
          )}
          <span style={{ paddingLeft: vars.ref.spacing[50] }}>{text}</span>
          {trailing && (
            <Chip.Trailing>
              <ChevronDownLineIcon />
            </Chip.Trailing>
          )}
        </Chip>
      )
    }

    return (
      <Chip {...rest}>
        {leading && (
          <Chip.Leading>
            <HeartLineIcon />
          </Chip.Leading>
        )}
        {text}
        {trailing && (
          <Chip.Trailing>
            <ChevronDownLineIcon />
          </Chip.Trailing>
        )}
      </Chip>
    )
  },
}
