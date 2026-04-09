/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@heejun-com/core'
import {
  ArrowLeftIcon,
  ShopFillIcon,
  CarFillIcon,
  CartLineIcon,
  HomeLineIcon,
  SearchIcon,
} from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { FilledButton as Button } from '../SolidButton'
import { FilledIconButton } from '../SolidIconButton'
import { Typography } from '../Text'

import { AppBar as AppBarBase } from './AppBar'

// Note: Stories use props like 'arrangement', 'height', and ClearButton 'onClick'
// that are not in the current type definitions. These stories need updating when the API stabilizes.
const AppBar = AppBarBase as typeof AppBarBase & React.FC<any>

const meta = {
  title: 'eclipse/Navigation/AppBar',
  component: AppBar,
  decorators: [
    (Story) => {
      return (
        <div style={{ background: '#f6f6f6', margin: '-1rem', height: '100vh' }}>
          <Story />
        </div>
      )
    },
  ],
  argTypes: {
    height: {
      control: { type: 'number', min: 30, max: 100, step: 1 },
      description: 'AppBar 높이 (px)',
    },
    arrangement: {
      control: 'select',
      options: ['start', 'equal-weight'],
      description: '레이아웃 정렬 방식',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
} satisfies Meta<any>

type Story = StoryObj<typeof meta>

export default meta

export const 기본: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Center>Title</AppBar.Center>
    </AppBar>
  ),
}

export const 뒤로가기버튼: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <FilledIconButton
          color="white"
          size="medium"
          onClick={() => {
            console.info('clicked')
          }}
        >
          <ArrowLeftIcon size={24} />
        </FilledIconButton>
      </AppBar.Leading>
      <AppBar.Center>Title</AppBar.Center>
    </AppBar>
  ),
}

export const 액션버튼: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Center>Title</AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 텍스트중앙제목: Story = {
  render: (args) => (
    <AppBar {...args} arrangement="equal-weight">
      <AppBar.Center>Title</AppBar.Center>
    </AppBar>
  ),
}

export const 로고제목: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Center>
        <ShopFillIcon size={24} /> 마트
      </AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 흰색배경: Story = {
  render: (args) => (
    <AppBar
      {...args}
      theme={{
        fillColor: 'white',
        foregroundColor: 'black',
      }}
    >
      <AppBar.Center>Title</AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 투명배경: Story = {
  render: (args) => (
    <AppBar
      {...args}
      theme={{
        fillColor: 'transparent',
        foregroundColor: 'green',
      }}
    >
      <AppBar.Center>Title</AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const IOS높이: Story = {
  render: (args) => (
    <AppBar {...args} height={44}>
      <AppBar.Center>iOS</AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const Android높이: Story = {
  render: (args) => (
    <AppBar {...args} height={56}>
      <AppBar.Center>Android</AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 아이콘_제목: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Center>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>아이콘 사용 예제</span>
          <CarFillIcon size={24} />
        </div>
      </AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 검색필드: Story = {
  render: function WithSearchFieldComponent(args) {
    const [value, setValue] = useState('')

    return (
      <AppBar {...args}>
        <AppBar.Center>
          <TextField
            style={{ width: '100%' }}
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {/* @ts-expect-error onClick not in ClearButton types */}
            <TextField.ClearButton visibility="onPopulated" onClick={() => setValue('')} />
          </TextField>
        </AppBar.Center>
        <AppBar.Trailing>
          <HomeLineIcon size={24} />
          <SearchIcon size={24} />
          <CartLineIcon size={24} />
        </AppBar.Trailing>
      </AppBar>
    )
  },
}

export const 긴_제목_말줄임: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Center>
        <Typography textStyle="titleLarge" maxLines={1}>
          Title 영역보다 내용이 길어지면 어떻게 될까용용죽겠지
        </Typography>
      </AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 가중치_동일: Story = {
  render: (args) => (
    <AppBar {...args} arrangement="equal-weight">
      <AppBar.Center>Hello, World!</AppBar.Center>
      <AppBar.Trailing>
        <HomeLineIcon size={24} />
        <SearchIcon size={24} />
        <CartLineIcon size={24} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 커스텀_테마: Story = {
  render: (args) => (
    <AppBar
      {...args}
      theme={{
        fillColor: 'green',
        foregroundColor: 'white',
      }}
    >
      <AppBar.Center>Hello, World!</AppBar.Center>
    </AppBar>
  ),
}

export const 디자인QA: Story = {
  args: {
    height: undefined,
    arrangement: undefined,
    title: 'Title',
    titleType: 'text',
    trailingActionCount: 3,
    fillColor: undefined,
    foregroundColor: undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  argTypes: {
    title: {
      control: 'text',
      description: 'Center 영역에 표시할 제목 텍스트',
    },
    titleType: {
      control: 'select',
      options: ['text', 'logo', 'icon', 'search', 'long'],
      description: '제목 타입',
    },
    trailingActionCount: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Trailing 영역 액션 버튼 개수',
    },
    fillColor: {
      control: 'color',
      description: '배경색 (white, transparent, 또는 커스텀 색상)',
    },
    foregroundColor: {
      control: 'color',
      description: '전경색 (텍스트/아이콘 색상)',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {
      height,
      arrangement,
      title,
      titleType,
      trailingActionCount,
      fillColor,
      foregroundColor,
      ...rest
    } = args

    const themeProps =
      fillColor || foregroundColor
        ? {
            ...(fillColor && { fillColor }),
            ...(foregroundColor && { foregroundColor }),
          }
        : undefined

    const trailingIcons = [
      <HomeLineIcon key="home" size={24} />,
      <SearchIcon key="search" size={24} />,
      <CartLineIcon key="cart" size={24} />,
      <CarFillIcon key="car" size={24} />,
      <ShopFillIcon key="shop" size={24} />,
    ]

    const renderCenter = () => {
      switch (titleType) {
        case 'logo':
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShopFillIcon size={24} />
              <Typography textStyle="titleLarge" maxLines={1}>
                {title}
              </Typography>
            </div>
          )
        case 'icon':
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography textStyle="titleLarge" maxLines={1}>
                {title}
              </Typography>
              <CarFillIcon size={24} />
            </div>
          )
        case 'search':
          return (
            <TextField style={{ width: '100%' }} placeholder="Search..." defaultValue="">
              <TextField.ClearButton visibility="onPopulated" />
            </TextField>
          )
        case 'long':
          return (
            <Typography textStyle="titleLarge" maxLines={1}>
              {title} 영역보다 내용이 길어지면 어떻게 될까요? 말줄임표로 처리되어야 합니다.
            </Typography>
          )
        default:
          return (
            <Typography textStyle="titleLarge" maxLines={1}>
              {title}
            </Typography>
          )
      }
    }

    const containerStyle =
      themeProps?.fillColor === 'transparent'
        ? {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '16px',
            borderRadius: '8px',
          }
        : undefined

    const WrappedAppBar = (
      <div>
        <AppBar {...rest} height={height} arrangement={arrangement} theme={themeProps}>
          <AppBar.Leading>
            <FilledIconButton
              theme={{
                ...args.theme,
                enabledFillColor: args.fillColor,
                enabledForegroundColor: args.foregroundColor,
              }}
              color="white"
              size="medium"
              onClick={() => {
                console.info('clicked')
              }}
            >
              <ArrowLeftIcon size={24} />
            </FilledIconButton>
          </AppBar.Leading>
          <AppBar.Center>{renderCenter()}</AppBar.Center>
          {trailingActionCount > 0 && (
            <AppBar.Trailing>{trailingIcons.slice(0, trailingActionCount)}</AppBar.Trailing>
          )}
        </AppBar>
        {[...Array(100)].map((_, index) => (
          <div key={index} style={{ height: 30, background: '#f6f6f6' }}>
            {index} 번 요소
          </div>
        ))}
      </div>
    )

    if (containerStyle) {
      return <div style={containerStyle}>{WrappedAppBar}</div>
    }

    return WrappedAppBar
  },
}

/* --------------------------------------------------------------------------
   브레드크럼 + 액션버튼 (Ant Design PageHeader 패턴)
   뒤로가기 + 현재 위치 경로 + 우측 액션 버튼
-------------------------------------------------------------------------- */
export const 브레드크럼_액션: Story = {
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <FilledIconButton color="white" size="medium" onClick={() => { console.info('back') }}>
          <ArrowLeftIcon size={24} />
        </FilledIconButton>
      </AppBar.Leading>
      <AppBar.Center>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>홈</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>/</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>상품 관리</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>/</span>
            <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: 600 }}>상품 상세</span>
          </div>
          <Typography textStyle="titleLarge" maxLines={1}>
            상품 상세 정보
          </Typography>
        </div>
      </AppBar.Center>
      <AppBar.Trailing>
        <Button color="primary" size="small">
          <Button.Center>저장</Button.Center>
        </Button>
      </AppBar.Trailing>
    </AppBar>
  ),
}

/* --------------------------------------------------------------------------
   탭 내비게이션 AppBar (Ant Design Tabs + Header 패턴)
   상단 AppBar 아래에 탭 내비게이션이 이어지는 패턴
-------------------------------------------------------------------------- */
const TabNavAppBarRender = (args: React.ComponentPropsWithoutRef<typeof AppBar>) => {
  const tabs = ['전체', '진행 중', '완료', '취소'] as const
  const [activeTab, setActiveTab] = useState<string>('전체')

  return (
    <div>
      <AppBar {...args}>
        <AppBar.Leading>
          <FilledIconButton color="white" size="medium" onClick={() => { console.info('back') }}>
            <ArrowLeftIcon size={24} />
          </FilledIconButton>
        </AppBar.Leading>
        <AppBar.Center>주문 목록</AppBar.Center>
        <AppBar.Trailing>
          <SearchIcon size={24} />
        </AppBar.Trailing>
      </AppBar>
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? '#6366f1' : '#64748b',
              borderBottom: activeTab === tab ? '2px solid #6366f1' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ padding: '16px', background: '#f8fafc', minHeight: '120px' }}>
        <Typography textStyle="descriptionLarge" style={{ color: '#94a3b8' }}>
          [{activeTab}] 탭 콘텐츠 영역
        </Typography>
      </div>
    </div>
  )
}

export const 탭내비게이션: Story = {
  render: (args) => <TabNavAppBarRender {...args} />,
}
