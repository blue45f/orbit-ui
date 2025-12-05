import { ChevronRightLineIcon, CircleInfoLineIcon } from '@ui-forge/icons'
import type { Meta, StoryObj } from '@storybook/react'

import { TextButton } from '../GhostButton'
import { Typography } from '../Text'

import { SectionTitle } from './SectionTitle'

SectionTitle.displayName = 'SectionTitle'
SectionTitle.Title.displayName = 'SectionTitle.Title'
SectionTitle.Description.displayName = 'SectionTitle.Description'
SectionTitle.Trailing.displayName = 'SectionTitle.Trailing'

const meta = {
  title: 'mint/Lists/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>
      </SectionTitle>
    </div>
  ),
}

export const 툴팁_아이콘: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>
          List Header <CircleInfoLineIcon />
        </SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>
      </SectionTitle>
    </div>
  ),
}

export const 텍스트_버튼: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>

        <SectionTitle.Trailing>
          <TextButton color='black' size='small'>
            <TextButton.Center>Link Action</TextButton.Center>
            <TextButton.Trailing>
              <ChevronRightLineIcon />
            </TextButton.Trailing>
          </TextButton>
        </SectionTitle.Trailing>
      </SectionTitle>
    </div>
  ),
}

export const 광고_뱃지: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>
        <SectionTitle.Trailing>{/* TODO: 뱃지 구현 후 뱃지 추가*/}뱃지 없음</SectionTitle.Trailing>
      </SectionTitle>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    title: 'List Header',
    description: 'Description',
    longTitle: false,
    hasTooltip: false,
    hasADBadge: false,
    hasLinkActionButton: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title 영역에 표시할 텍스트',
    },
    longTitle: {
      control: 'boolean',
      description: 'Title을 두 줄로 표시할지 여부 (true일 경우 긴 텍스트로 자동 변경)',
    },
    description: {
      control: 'text',
      description: 'Description 영역에 표시할 텍스트',
    },
    hasTooltip: {
      control: 'boolean',
      description: 'Title 뒤에 툴팁 아이콘 표시 여부',
    },
    hasADBadge: {
      control: 'boolean',
      description: 'Trailing 영역에 광고 뱃지 표시 여부',
    },
    hasLinkActionButton: {
      control: 'boolean',
      description: 'Trailing 영역에 LinkActionButton 표시 여부',
    },
  },
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ title, longTitle, description, hasTooltip, hasADBadge, hasLinkActionButton }: any) => {
    const displayTitle = longTitle ? '이것은 정말 길고 길고 긴~~~~~~~~~~ 타이틀이랍니다' : title

    return (
      <div style={{ width: 375 }}>
        <SectionTitle>
          <SectionTitle.Title>
            <Typography>{displayTitle}</Typography>
            {hasTooltip && <CircleInfoLineIcon />}
          </SectionTitle.Title>
          {description && <SectionTitle.Description>{description}</SectionTitle.Description>}
          {(hasADBadge || hasLinkActionButton) && (
            <SectionTitle.Trailing>
              {hasLinkActionButton && (
                <TextButton color='black' size='small'>
                  <TextButton.Center>Link Action</TextButton.Center>
                  <TextButton.Trailing>
                    <ChevronRightLineIcon />
                  </TextButton.Trailing>
                </TextButton>
              )}
              {hasADBadge && <div>AD Badge</div>}
            </SectionTitle.Trailing>
          )}
        </SectionTitle>
      </div>
    )
  },
}
