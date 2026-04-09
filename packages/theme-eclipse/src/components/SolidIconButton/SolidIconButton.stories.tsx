import { Flex } from '@heejun-com/core'
import {
  PlusIcon,
  NotificationLineIcon,
  SettingLineIcon,
  SearchIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  AlignLeftIcon,
} from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps, useState } from 'react'

import { SolidIconButton } from '.'

SolidIconButton.displayName = 'SolidIconButton'

const meta = {
  title: 'eclipse/Actions/Buttons/SolidIconButton',
  component: SolidIconButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'white'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof SolidIconButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  render: (prop: ComponentProps<typeof SolidIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <SolidIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton {...prop} color="white" size="large">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton
          {...prop}
          color="white"
          size="large"
          theme={{ enabledFillColor: 'transparent' }}
        >
          <PlusIcon />
        </SolidIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 사이즈 = {
  render: (prop: ComponentProps<typeof SolidIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <SolidIconButton {...prop} color="black" size="small">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton {...prop} color="black" size="medium">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </SolidIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 디자인QA = {
  args: {
    color: 'black',
    size: 'large',
  },
  parameters: {
    controls: {
      exclude: ['as', 'children', 'onClick'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, ...rest }: any) => {
    return (
      <SolidIconButton {...rest} color={color} size={size}>
        <PlusIcon />
      </SolidIconButton>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 에디터 툴바 패턴
   shadcn/ui Toggle 그룹 패턴 — 텍스트 서식 도구바
   에디터에서 서식 버튼을 토글 상태로 관리하는 패턴입니다.
-------------------------------------------------------------------------- */
type FormatKey = 'bold' | 'italic' | 'underline' | 'align'

const FORMAT_BUTTONS: { key: FormatKey; icon: React.ReactElement; label: string }[] = [
  { key: 'bold', icon: <TextBoldIcon />, label: '굵게' },
  { key: 'italic', icon: <TextItalicIcon />, label: '기울임' },
  { key: 'underline', icon: <TextUnderlineIcon />, label: '밑줄' },
  { key: 'align', icon: <AlignLeftIcon />, label: '왼쪽 정렬' },
]

function EditorToolbarRender() {
  const [active, setActive] = useState<Set<FormatKey>>(new Set(['bold']))

  const toggle = (key: FormatKey) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>서식 도구바 (클릭으로 토글)</div>
        <div
          style={{
            display: 'inline-flex',
            gap: 4,
            padding: '6px 8px',
            background: '#f8fafc',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          {FORMAT_BUTTONS.map((btn) => (
            <SolidIconButton
              key={btn.key}
              color={active.has(btn.key) ? 'black' : 'white'}
              size="small"
              onClick={() => toggle(btn.key)}
              aria-label={btn.label}
              aria-pressed={active.has(btn.key)}
            >
              {btn.icon}
            </SolidIconButton>
          ))}
          <div style={{ width: 1, background: '#e2e8f0', margin: '0 4px' }} />
          <SolidIconButton color="white" size="small" aria-label="설정">
            <SettingLineIcon />
          </SolidIconButton>
        </div>
      </div>
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          fontSize: 14,
          color: '#1e293b',
          lineHeight: 1.6,
          fontWeight: active.has('bold') ? 700 : 400,
          fontStyle: active.has('italic') ? 'italic' : 'normal',
          textDecoration: active.has('underline') ? 'underline' : 'none',
          textAlign: active.has('align') ? 'left' : 'center',
        }}
      >
        Orbit UI 디자인 시스템 - 3-Tier 토큰 기반 컴포넌트 라이브러리입니다.
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui Toggle Group 패턴 — active 상태: {Array.from(active).join(', ') || '없음'}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shadcn_에디터_툴바 = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Toggle Group 패턴. 서식 버튼의 활성/비활성 상태를 Set으로 관리하며, color prop으로 active 상태를 시각화합니다.',
      },
    },
  },
  render: () => <EditorToolbarRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 플로팅 액션 버튼 패턴
   Radix DropdownMenu 트리거 패턴 응용 — FAB 확장 메뉴
-------------------------------------------------------------------------- */
const FAB_ACTIONS = [
  { icon: <SearchIcon />, label: '검색', color: '#6366f1' },
  { icon: <NotificationLineIcon />, label: '알림', color: '#f59e0b' },
  { icon: <SettingLineIcon />, label: '설정', color: '#64748b' },
]

function FloatingActionRender() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative', height: 240, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        {open &&
          FAB_ACTIONS.map((action, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                animation: 'none',
                opacity: 1,
                transform: 'translateY(0)',
                transition: `opacity 0.15s ${i * 0.05}s, transform 0.15s ${i * 0.05}s`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#475569',
                  background: '#fff',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  whiteSpace: 'nowrap',
                }}
              >
                {action.label}
              </span>
              <SolidIconButton
                color="white"
                size="small"
                theme={{ enabledFillColor: action.color, enabledForegroundColor: '#fff' }}
                onClick={() => setOpen(false)}
                aria-label={action.label}
              >
                {action.icon}
              </SolidIconButton>
            </div>
          ))}
        <SolidIconButton
          color="black"
          size="large"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
        >
          <PlusIcon />
        </SolidIconButton>
      </div>
      <div style={{ padding: 20, fontSize: 12, color: '#94a3b8' }}>
        Radix DropdownMenu 트리거 패턴 — + 버튼 클릭으로 확장
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Radix_플로팅_액션 = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix DropdownMenu 트리거 패턴 응용. FAB(Floating Action Button) 클릭 시 서브 액션이 위로 펼쳐집니다. aria-expanded로 접근성을 보장합니다.',
      },
    },
  },
  render: () => <FloatingActionRender />,
}

/* --------------------------------------------------------------------------
   알림 뱃지 조합 패턴
   SolidIconButton + CounterBadge 오버레이 — 읽지 않은 알림 표시
-------------------------------------------------------------------------- */
function NotificationBadgeRender() {
  const [count, setCount] = useState(7)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <SolidIconButton
            color="white"
            size="medium"
            onClick={() => setCount(0)}
            aria-label={`알림 ${count}개`}
          >
            <NotificationLineIcon />
          </SolidIconButton>
          {count > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                minWidth: 16,
                height: 16,
                borderRadius: 8,
                background: '#ef4444',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                border: '1.5px solid #fff',
                lineHeight: 1,
              }}
            >
              {count > 99 ? '99+' : count}
            </span>
          )}
        </div>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <SolidIconButton color="white" size="medium" aria-label="설정">
            <SettingLineIcon />
          </SolidIconButton>
        </div>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <SolidIconButton color="white" size="medium" aria-label="검색">
            <SearchIcon />
          </SolidIconButton>
          {true && (
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                border: '1.5px solid #fff',
              }}
            />
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => setCount((prev) => Math.min(prev + 1, 99))}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          알림 추가 (+1)
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          모두 읽음
        </button>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        SolidIconButton + absolute 뱃지 오버레이 패턴 — 벨 클릭 또는 모두 읽음으로 카운트 초기화
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const 알림_뱃지_조합 = {
  parameters: {
    docs: {
      description: {
        story:
          'SolidIconButton 위에 카운트 뱃지를 absolute 오버레이로 배치하는 패턴. 읽지 않은 알림 수를 useState로 관리하고, 버튼 클릭으로 초기화합니다.',
      },
    },
  },
  render: () => <NotificationBadgeRender />,
}
