import { CheckIcon, ChevronDownLineIcon } from '@prism-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { vars } from '../../styles'

import { Chip } from './Chip'
import * as styles from './Chip.stories.css'

Chip.displayName = 'Chip'
Chip.Leading.displayName = 'Chip.Leading'
Chip.Trailing.displayName = 'Chip.Trailing'

const meta = {
  title: 'mint/Chips/Chip',
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
          <img src='https://atelier-assets.claykit.com/images/mint/snackbar_snow_2.png' width={24} height={24} alt='' />
        </Chip.Leading>
        배달이
      </Chip>
    )
  },
}

export const 썸네일: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <img src='https://atelier-assets.claykit.com/images/mint/snackbar_snow_2.png' width={30} height={30} alt='' />
        </Chip.Leading>
        <span style={{ paddingLeft: vars.ref.spacing[50] }}>배달이</span>
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
                  <img
                    src='https://atelier-assets.claykit.com/images/mint/graphic_star_full@2x.png'
                    width={24}
                    height={24}
                    alt=''
                  />
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
              <CheckIcon />
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
              <img
                src='https://atelier-assets.claykit.com/images/mint/snackbar_snow_2.png'
                width={24}
                height={24}
                alt=''
              />
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
              <img
                src='https://atelier-assets.claykit.com/images/mint/snackbar_snow_2.png'
                width={30}
                height={30}
                alt=''
              />
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
