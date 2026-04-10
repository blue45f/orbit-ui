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
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "AppBar는 상단 탐색 바 컴포넌트입니다. 로고, 타이틀, 액션 버튼 슬롯을 제공하며 앱의 주요 탐색 영역으로 사용합니다.",
      },
    },
  },
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

/* --------------------------------------------------------------------------
   Chakra UI — 다크 사이드바 토글 앱바 (접기/펼치기 + 사용자 정보)
-------------------------------------------------------------------------- */
function ChakraSidebarToggleAppBarRender() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const bg = darkMode ? '#0f172a' : '#ffffff'
  const border = darkMode ? '#1e293b' : '#e2e8f0'
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#64748b'
  const iconBg = darkMode ? '#1e293b' : '#f1f5f9'

  return (
    <div style={{ width: '100%', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: bg, borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', height: 52, padding: '0 16px', gap: 10, transition: 'background 0.2s' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: iconBg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.15s' }}
          aria-label="사이드바 토글"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>Orbit</span>
          <span style={{ fontSize: 11, color: textSecondary, background: iconBg, padding: '1px 7px', borderRadius: 10 }}>Beta</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: iconBg, cursor: 'pointer', fontSize: 15 }}
            aria-label="다크모드 전환"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            HJ
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', height: 180 }}>
        <div style={{ width: sidebarOpen ? 200 : 52, background: darkMode ? '#1e293b' : '#f8fafc', borderRight: `1px solid ${border}`, overflow: 'hidden', transition: 'width 0.2s ease', flexShrink: 0 }}>
          {['홈', '프로젝트', '팀', '설정'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', fontSize: 13, color: textPrimary, whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{'●'}</span>
              {sidebarOpen && <span>{item}</span>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: textSecondary, fontSize: 13 }}>
          {sidebarOpen ? '사이드바 열림 — 메인 콘텐츠' : '사이드바 닫힘 — 콘텐츠 영역 최대화'}
        </div>
      </div>
      <p style={{ fontSize: 10, color: '#94a3b8', padding: '4px 16px', textAlign: 'center' }}>Chakra UI 다크모드 + 사이드바 토글 AppBar 패턴</p>
    </div>
  )
}

export const Chakra_다크_사이드바_토글_앱바: Story = {
  name: 'Chakra UI — 다크 사이드바 토글 앱바',
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI의 다크모드 토글 + 사이드바 접기/펼치기 패턴. AppBar를 중심으로 다크/라이트 전환 및 사이드바 너비 트랜지션을 연동. SaaS 앱 레이아웃의 전형적인 패턴.',
      },
    },
  },
  render: () => <ChakraSidebarToggleAppBarRender />,
}

/* --------------------------------------------------------------------------
   Mantine — 다단계 마법사 앱바 (단계 표시 + 뒤로/다음 버튼)
-------------------------------------------------------------------------- */
function MantineWizardAppBarRender() {
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const stepLabels = ['계정 설정', '프로필 입력', '팀 초대', '검토 & 완료']

  return (
    <div style={{ width: '100%', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'var(--sem-eclipse-color-surfaceDefault)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', padding: '0 16px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: step === 1 ? 'var(--sem-eclipse-color-foregroundDisabled)' : 'var(--sem-eclipse-color-foregroundPrimary)', background: 'none', border: 'none', cursor: step === 1 ? 'not-allowed' : 'pointer', padding: '6px 10px', borderRadius: 6 }}
        >
          ← 이전
        </button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{stepLabels[step - 1]}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                style={{ width: i < step ? 24 : 8, height: 4, borderRadius: 2, background: i < step ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)', transition: 'all 0.25s ease' }}
              />
            ))}
          </div>
          <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{step} / {totalSteps}</span>
        </div>
        <button
          onClick={() => setStep(Math.min(totalSteps, step + 1))}
          disabled={step === totalSteps}
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: step === totalSteps ? 'var(--sem-eclipse-color-foregroundDisabled)' : 'var(--sem-eclipse-color-fillPrimary)', background: step === totalSteps ? 'transparent' : 'var(--sem-eclipse-color-fillPrimarySubtle)', border: 'none', cursor: step === totalSteps ? 'not-allowed' : 'pointer', padding: '6px 10px', borderRadius: 6, transition: 'all 0.15s' }}
        >
          {step === totalSteps ? '완료' : '다음 →'}
        </button>
      </div>
      <div style={{ padding: '24px 20px', textAlign: 'center', color: 'var(--sem-eclipse-color-foregroundSecondary)', fontSize: 13 }}>
        <p style={{ fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 6 }}>Step {step}: {stepLabels[step - 1]}</p>
        <p>이 영역에 해당 단계의 폼 컨텐츠가 표시됩니다.</p>
      </div>
    </div>
  )
}

export const Mantine_마법사_스텝_앱바: Story = {
  name: 'Mantine — 다단계 마법사 앱바 (단계 표시)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine Stepper + AppBar 조합 패턴. 온보딩/마법사 플로우에서 현재 단계를 AppBar 내 진행 막대와 단계 레이블로 표현. 이전/다음 버튼이 AppBar 양 끝에 배치.',
      },
    },
  },
  render: () => <MantineWizardAppBarRender />,
}

/* --------------------------------------------------------------------------
   Arco Design — 다중 환경 전환 앱바 (환경 드롭다운 + 배포 상태)
-------------------------------------------------------------------------- */
function ArcoEnvSwitchAppBarRender() {
  const [env, setEnv] = useState<'production' | 'staging' | 'development'>('production')
  const envConfig = {
    production: { label: 'Production', color: '#10b981', dot: '#059669' },
    staging: { label: 'Staging', color: '#f59e0b', dot: '#d97706' },
    development: { label: 'Development', color: '#6366f1', dot: '#4f46e5' },
  }
  const [open, setOpen] = useState(false)
  const current = envConfig[env]

  return (
    <div style={{ width: '100%', fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
      <div style={{ background: 'var(--sem-eclipse-color-surfaceDefault)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', display: 'flex', alignItems: 'center', height: 48, padding: '0 16px', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>orbit-app</span>
        <div style={{ width: 1, height: 20, background: 'var(--sem-eclipse-color-borderSubtle)' }} />
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(!open)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-surfaceSubtle)', cursor: 'pointer', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: current.dot, display: 'inline-block' }} />
            {current.label}
            <span style={{ fontSize: 10 }}>▼</span>
          </button>
          {open && (
            <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 100, background: 'var(--sem-eclipse-color-surfaceDefault)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 160, overflow: 'hidden' }}>
              {(Object.keys(envConfig) as Array<keyof typeof envConfig>).map((key) => (
                <button
                  key={key}
                  onClick={() => { setEnv(key); setOpen(false) }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: env === key ? 'var(--sem-eclipse-color-surfaceSubtle)' : 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', textAlign: 'left' }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: envConfig[key].dot, flexShrink: 0 }} />
                  {envConfig[key].label}
                  {env === key && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>현재</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: current.color, background: `${current.color}18`, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: current.dot, display: 'inline-block', animation: env === 'production' ? 'none' : undefined }} />
          {env === 'production' ? '운영 중' : env === 'staging' ? '검증 중' : '개발 중'}
        </div>
      </div>
      <div style={{ padding: '16px 20px', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'var(--sem-eclipse-color-surfaceSubtle)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
        선택된 환경: <strong style={{ color: current.color }}>{current.label}</strong> — URL: {env === 'production' ? 'app.orbit-ui.com' : env === 'staging' ? 'staging.orbit-ui.com' : 'localhost:3000'}
      </div>
    </div>
  )
}

export const Arco_다중_환경_전환_앱바: Story = {
  name: 'Arco Design — 다중 환경 전환 앱바 (환경 드롭다운)',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design의 환경 전환 패턴. Production/Staging/Development를 AppBar 내 드롭다운으로 전환, 각 환경에 색상 상태 도트와 뱃지를 표시. DevOps/SaaS 대시보드에서 자주 쓰이는 패턴.',
      },
    },
  },
  render: () => <ArcoEnvSwitchAppBarRender />,
}

// ──────────────────────────────────────────────────────────────────────────────
// Cycle 174: Vercel Design + MUI
// ──────────────────────────────────────────────────────────────────────────────

function VercelDeploymentAppBarRender() {
  const [env, setEnv] = useState<'production' | 'preview' | 'development'>('production')
  const envConfig = {
    production: { label: 'Production', color: '#16a34a', bg: '#dcfce7' },
    preview: { label: 'Preview', color: '#d97706', bg: '#fef3c7' },
    development: { label: 'Development', color: '#3b82f6', bg: '#dbeafe' },
  }
  const cfg = envConfig[env]

  return (
    <div style={{ width: 420 }}>
      <AppBar>
        <AppBar.Leading>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </AppBar.Leading>
        <AppBar.Center>
          <span style={{ fontSize: 14, fontWeight: 600 }}>blue45f / orbit-ui</span>
        </AppBar.Center>
        <AppBar.Trailing>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['production', 'preview', 'development'] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEnv(e)}
                style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${env === e ? envConfig[e].color : '#e2e8f0'}`, background: env === e ? envConfig[e].bg : 'transparent', color: env === e ? envConfig[e].color : '#64748b', fontSize: 10, fontWeight: 600, cursor: 'pointer', transition: 'all 150ms' }}
              >
                {envConfig[e].label}
              </button>
            ))}
          </div>
        </AppBar.Trailing>
      </AppBar>
      <div style={{ padding: '14px 16px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', borderRadius: '0 0 10px 10px', border: '1px solid #e2e8f0', borderTop: 'none' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: cfg.color }} />
          <span style={{ fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{cfg.label} 배포 완료</span>
          <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>2분 전</span>
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>49a55fd — feat(stories): Cycle 173 Linear + Tailwind</div>
      </div>
    </div>
  )
}

export const Vercel_배포_환경_전환_앱바: Story = {
  name: 'Vercel Design — 배포 환경 전환 앱바 (Production/Preview/Development)',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 배포 대시보드 AppBar 패턴. Production/Preview/Development 환경 탭 전환, 활성 환경 컬러 강조, 최근 배포 상태 표시.',
      },
    },
  },
  render: () => <VercelDeploymentAppBarRender />,
}

function MUIBreadcrumbAppBarRender() {
  const [page, setPage] = useState(2)
  const crumbs = ['홈', '컴포넌트', 'AppBar', '스토리']
  const activeCrumbs = crumbs.slice(0, page + 1)

  return (
    <div style={{ width: 480 }}>
      <AppBar>
        <AppBar.Leading>
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} style={{ background: 'none', border: 'none', cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.4 : 1, padding: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </AppBar.Leading>
        <AppBar.Center>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
            {activeCrumbs.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i > 0 && <span style={{ color: '#cbd5e1', fontSize: 10 }}>›</span>}
                <button
                  onClick={() => setPage(i)}
                  style={{ background: 'none', border: 'none', cursor: i === activeCrumbs.length - 1 ? 'default' : 'pointer', color: i === activeCrumbs.length - 1 ? '#0f172a' : '#64748b', fontWeight: i === activeCrumbs.length - 1 ? 600 : 400, fontSize: 13, padding: '2px 4px', borderRadius: 4 }}
                >
                  {crumb}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </AppBar.Center>
        <AppBar.Trailing>
          <button
            onClick={() => setPage(Math.min(crumbs.length - 1, page + 1))}
            disabled={page === crumbs.length - 1}
            style={{ padding: '4px 10px', borderRadius: 6, background: page === crumbs.length - 1 ? '#f1f5f9' : '#6366f1', color: page === crumbs.length - 1 ? '#94a3b8' : '#fff', border: 'none', fontSize: 12, fontWeight: 600, cursor: page === crumbs.length - 1 ? 'not-allowed' : 'pointer', transition: 'all 150ms' }}
          >
            {page === crumbs.length - 1 ? '마지막' : '다음 →'}
          </button>
        </AppBar.Trailing>
      </AppBar>
      <div style={{ padding: 20, background: '#fff', borderRadius: '0 0 10px 10px', border: '1px solid #e2e8f0', borderTop: 'none', fontSize: 14, color: '#64748b' }}>
        현재 위치: <strong style={{ color: '#0f172a' }}>{activeCrumbs[activeCrumbs.length - 1]}</strong> 페이지
      </div>
    </div>
  )
}

export const MUI_브레드크럼_네비게이션_앱바: Story = {
  name: 'MUI — 브레드크럼 네비게이션 앱바 (계층 이동)',
  parameters: {
    docs: {
      description: {
        story: 'MUI Breadcrumbs + AppBar 조합 패턴. 계층 탐색 시 브레드크럼 동적 생성, 뒤로가기 버튼, 다음 단계 진행 버튼. 관리자 패널이나 문서 시스템에서 활용.',
      },
    },
  },
  render: () => <MUIBreadcrumbAppBarRender />,
}

function VercelMUISearchAppBarRender() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const items = ['AppBar', 'Avatar', 'Breadcrumb', 'Calendar', 'Checkbox', 'DataTable', 'Divider', 'Dropdown', 'Editor', 'Loading', 'Modal', 'Progress', 'Slider', 'Switch', 'TextField', 'Toggle']
  const filtered = query.length > 0 ? items.filter((i) => i.toLowerCase().startsWith(query.toLowerCase())) : []

  return (
    <div style={{ width: 440, position: 'relative' }}>
      <AppBar>
        <AppBar.Leading>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Orbit UI</span>
          </div>
        </AppBar.Leading>
        <AppBar.Center>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="컴포넌트 검색..."
              style={{ width: '100%', padding: '5px 10px 5px 30px', borderRadius: 7, border: `1px solid ${focused ? '#6366f1' : '#e2e8f0'}`, background: '#f8fafc', fontSize: 12, outline: 'none', boxSizing: 'border-box', transition: 'border-color 150ms' }}
            />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
        </AppBar.Center>
        <AppBar.Trailing>
          <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 5, border: '1px solid #e2e8f0', color: '#94a3b8', fontFamily: 'monospace' }}>⌘K</span>
        </AppBar.Trailing>
      </AppBar>
      {focused && filtered.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0 0 10px 10px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 10 }}>
          {filtered.slice(0, 5).map((item) => (
            <div key={item} onMouseDown={() => setQuery(item)} style={{ padding: '9px 16px', cursor: 'pointer', fontSize: 13, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#94a3b8" strokeWidth="2"/></svg>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Vercel_MUI_검색_앱바: Story = {
  name: 'Vercel + MUI — 인라인 검색 앱바 (컴포넌트 자동완성)',
  parameters: {
    docs: {
      description: {
        story: 'Vercel + MUI 검색 AppBar 패턴. 입력 시 컴포넌트 이름 자동완성 드롭다운, 포커스 시 border 색 전환, ⌘K 단축키 뱃지 표시.',
      },
    },
  },
  render: () => <VercelMUISearchAppBarRender />,
}
