import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Tooltip } from './Tooltip'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'
import { SolidIconButton } from '../SolidIconButton'

import {
  CircleInfoLineIcon,
  SettingLineIcon,
  NotificationLineIcon,
  StarLineIcon,
  SearchIcon,
} from '@heejun-com/icons'

const meta = {
  title: 'eclipse/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>마우스 오버</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography textStyle="descriptionLarge" className="text-white">
              도움말 메시지입니다.
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  ),
}

// 다양한 위치 데모 (Chakra UI 접근성 강화 패턴)
export const 위치변형: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '16px',
        padding: '80px 60px',
        alignItems: 'center',
        justifyItems: 'center',
      }}>
        {/* Top row */}
        <div />
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Top</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              위쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>
        <div />

        {/* Middle row */}
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Left</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="left">
            <Typography textStyle="descriptionLarge" className="text-white">
              왼쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <div style={{
          width: '80px', height: '80px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '12px', fontWeight: 700,
        }}>
          Center
        </div>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Right</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <Typography textStyle="descriptionLarge" className="text-white">
              오른쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        {/* Bottom row */}
        <div />
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Bottom</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom">
            <Typography textStyle="descriptionLarge" className="text-white">
              아래쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>
        <div />
      </div>
    </Tooltip.Provider>
  ),
}

// 아이콘 버튼 + 툴팁 조합 (접근성 강화)
export const 아이콘버튼조합: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{
        display: 'flex', gap: '12px', padding: '60px 40px',
        alignItems: 'center',
      }}>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="정보 보기"
            >
              <CircleInfoLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              정보 보기
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="설정"
            >
              <SettingLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              설정
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="알림"
            >
              <NotificationLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              알림 (3)
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="즐겨찾기"
            >
              <StarLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              즐겨찾기에 추가
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="검색"
            >
              <SearchIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              검색 (Cmd+K)
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </Tooltip.Provider>
  ),
}

// 딜레이 설정 데모
const DelayDemoRender = () => {
  const [activeDelay, setActiveDelay] = useState(300)

  const delayOptions = [
    { label: '즉시 (0ms)', value: 0 },
    { label: '기본 (300ms)', value: 300 },
    { label: '느림 (700ms)', value: 700 },
    { label: '매우 느림 (1000ms)', value: 1000 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '40px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {delayOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveDelay(opt.value)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: `1.5px solid ${activeDelay === opt.value ? '#6366f1' : '#e2e8f0'}`,
              background: activeDelay === opt.value ? 'rgba(99,102,241,0.08)' : '#fff',
              color: activeDelay === opt.value ? '#6366f1' : '#64748b',
              fontSize: '12px',
              fontWeight: activeDelay === opt.value ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <Tooltip.Provider delayDuration={activeDelay}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {(['primary', 'gray', 'black'] as const).map((color) => (
            <Tooltip key={color}>
              <Tooltip.Trigger asChild>
                <Button color={color} size="medium">
                  <Button.Center>{color}</Button.Center>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Typography textStyle="descriptionLarge" className="text-white">
                  딜레이: {activeDelay}ms
                </Typography>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </Tooltip.Provider>
      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
        버튼 위에 마우스를 올려 딜레이를 체험해보세요
      </p>
    </div>
  )
}

export const 딜레이설정: Story = {
  render: () => <DelayDemoRender />,
}
