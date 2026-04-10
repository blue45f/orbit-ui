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
  StarLineIcon,
  ShareIcon,
  ChevronLeftLineIcon,
  ChevronRightLineIcon,
  WriteLineIcon,
  MoreHorizontalIcon,
  CheckIcon,
} from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { ComponentProps, useState } from 'react'

import { SolidIconButton } from '.'

SolidIconButton.displayName = 'SolidIconButton'

const meta = {
  title: 'eclipse/Actions/Buttons/SolidIconButton',
  component: SolidIconButton,
  tags: ['autodocs'],
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

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 페이지 헤더 빠른 액션 클러스터
   Linear의 이슈 헤더 우측 액션 버튼군 — 즐겨찾기·공유·수정·더보기
-------------------------------------------------------------------------- */
function QuickActionClusterRender() {
  const [starred, setStarred] = useState(false)
  const [shared, setShared] = useState(false)
  const [editMode, setEditMode] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#fff',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>PRJ-247 · API 레이트리밋 구현</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <SolidIconButton
            color={starred ? 'black' : 'white'}
            size="small"
            onClick={() => setStarred((p) => !p)}
            aria-label="즐겨찾기"
            aria-pressed={starred}
          >
            <StarLineIcon />
          </SolidIconButton>
          <SolidIconButton
            color={shared ? 'black' : 'white'}
            size="small"
            onClick={() => setShared((p) => !p)}
            aria-label="공유"
            aria-pressed={shared}
          >
            <ShareIcon />
          </SolidIconButton>
          <SolidIconButton
            color={editMode ? 'black' : 'white'}
            size="small"
            onClick={() => setEditMode((p) => !p)}
            aria-label="수정"
            aria-pressed={editMode}
          >
            <WriteLineIcon />
          </SolidIconButton>
          <div style={{ width: 1, height: 16, background: '#e2e8f0', margin: '0 2px' }} />
          <SolidIconButton color="white" size="small" aria-label="더보기">
            <MoreHorizontalIcon />
          </SolidIconButton>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Linear 이슈 헤더 패턴 — 즐겨찾기: {starred ? 'ON' : 'OFF'} / 공유: {shared ? 'ON' : 'OFF'} / 수정: {editMode ? 'ON' : 'OFF'}
      </div>
    </div>
  )
}

export const Linear_빠른_액션_클러스터 = {
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 헤더의 빠른 액션 버튼 클러스터 패턴. 즐겨찾기·공유·수정 버튼이 각각 독립적인 토글 상태를 가지며, color prop으로 활성/비활성을 시각화합니다.',
      },
    },
  },
  render: () => <QuickActionClusterRender />,
}

/* --------------------------------------------------------------------------
   Notion Design 벤치마크: 페이지 탐색 이전/다음 버튼
   Notion의 문서 탐색 이전/다음 — 히스토리 기반 방향 네비게이션
-------------------------------------------------------------------------- */
const PAGES = ['개요', '설치 가이드', '컴포넌트 구조', '토큰 시스템', '기여 가이드']

function PageNavigationRender() {
  const [index, setIndex] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: '#f8fafc',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          minHeight: 80,
        }}
      >
        <SolidIconButton
          color="white"
          size="medium"
          disabled={index === 0}
          onClick={() => setIndex((p) => Math.max(0, p - 1))}
          aria-label="이전 페이지"
        >
          <ChevronLeftLineIcon />
        </SolidIconButton>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
            {index + 1} / {PAGES.length}
          </div>
          <div style={{ fontWeight: 600, fontSize: 16, color: '#1e293b' }}>{PAGES[index]}</div>
        </div>
        <SolidIconButton
          color="white"
          size="medium"
          disabled={index === PAGES.length - 1}
          onClick={() => setIndex((p) => Math.min(PAGES.length - 1, p + 1))}
          aria-label="다음 페이지"
        >
          <ChevronRightLineIcon />
        </SolidIconButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
        {PAGES.map((page, i) => (
          <button
            key={page}
            onClick={() => setIndex(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === index ? '#1e293b' : '#e2e8f0',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={page}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Notion 문서 탐색 패턴 — disabled 상태로 경계 처리
      </div>
    </div>
  )
}

export const Notion_페이지_탐색_내비게이션 = {
  parameters: {
    docs: {
      description: {
        story:
          'Notion 문서 탐색 패턴. 이전/다음 SolidIconButton이 페이지 경계에서 disabled 처리되며, 하단 닷 인디케이터로 현재 위치를 표시합니다.',
      },
    },
  },
  render: () => <PageNavigationRender />,
}

/* --------------------------------------------------------------------------
   Linear + Notion 벤치마크: 완료 체크 액션 버튼
   Linear 이슈 완료 체크 + Notion 체크박스 블록 완료 패턴
-------------------------------------------------------------------------- */
type TaskStatus = 'todo' | 'inprogress' | 'done'

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: 'black' | 'white'; next: TaskStatus }> = {
  todo: { label: '할 일', color: 'white', next: 'inprogress' },
  inprogress: { label: '진행 중', color: 'white', next: 'done' },
  done: { label: '완료', color: 'black', next: 'todo' },
}

const TASK_LIST = [
  { id: 1, title: 'SolidIconButton 스토리 추가' },
  { id: 2, title: 'TypeScript 타입 검사 통과' },
  { id: 3, title: 'ESLint 오류 수정' },
  { id: 4, title: 'Storybook 빌드 확인' },
]

function TaskStatusRender() {
  const [statuses, setStatuses] = useState<Record<number, TaskStatus>>({
    1: 'done',
    2: 'inprogress',
    3: 'todo',
    4: 'todo',
  })

  const advance = (id: number) => {
    setStatuses((prev) => ({ ...prev, [id]: STATUS_CONFIG[prev[id]].next }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {TASK_LIST.map((task) => {
        const status = statuses[task.id]
        const config = STATUS_CONFIG[status]
        return (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              background: status === 'done' ? '#f0fdf4' : '#fff',
              borderRadius: 8,
              border: `1px solid ${status === 'done' ? '#bbf7d0' : '#e2e8f0'}`,
              transition: 'all 0.15s',
            }}
          >
            <SolidIconButton
              color={config.color}
              size="small"
              onClick={() => advance(task.id)}
              aria-label={`${task.title} 상태 변경: ${config.label}`}
            >
              <CheckIcon />
            </SolidIconButton>
            <span
              style={{
                fontSize: 14,
                color: status === 'done' ? '#16a34a' : '#1e293b',
                textDecoration: status === 'done' ? 'line-through' : 'none',
                flex: 1,
              }}
            >
              {task.title}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: status === 'done' ? '#16a34a' : status === 'inprogress' ? '#f59e0b' : '#94a3b8',
                background: status === 'done' ? '#dcfce7' : status === 'inprogress' ? '#fef9c3' : '#f1f5f9',
                padding: '2px 8px',
                borderRadius: 10,
              }}
            >
              {config.label}
            </span>
          </div>
        )
      })}
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
        버튼 클릭으로 할 일 → 진행 중 → 완료 순서로 상태 전환
      </div>
    </div>
  )
}

export const Linear_Notion_태스크_상태_전환 = {
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 완료 체크 + Notion 체크박스 패턴 조합. SolidIconButton의 color prop을 상태에 따라 전환하며, 완료 시 카드 배경과 텍스트 스타일도 함께 변화합니다.',
      },
    },
  },
  render: () => <TaskStatusRender />,
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

/* --------------------------------------------------------------------------
   Cycle 68: Raycast Extensions + Notion Design 벤치마크
-------------------------------------------------------------------------- */

/* Raycast — 빠른 필터 토글 버튼 그룹
   Raycast 리스트 뷰의 필터 바 패턴. 아이콘 버튼으로 필터를 토글하고
   활성 필터는 색상으로 구분. compact 밀도의 버튼 클러스터.
-------------------------------------------------------------------------- */
const QUICK_FILTER_BUTTONS = [
  { id: 'search', Icon: SearchIcon, label: '검색' },
  { id: 'star', Icon: StarLineIcon, label: '즐겨찾기' },
  { id: 'notify', Icon: NotificationLineIcon, label: '알림' },
  { id: 'setting', Icon: SettingLineIcon, label: '설정' },
]

export const Raycast_빠른_필터_토글_그룹 = {
  name: 'Raycast — 빠른 필터 토글 버튼 그룹',
  parameters: {
    docs: {
      description: {
        story: 'Raycast 리스트 필터 바 패턴. SolidIconButton의 color prop을 토글 상태로 전환. 활성: black, 비활성: gray. compact한 버튼 클러스터로 빠른 필터 전환.',
      },
    },
  },
  render: function RaycastFilterGroup() {
    const [active, setActive] = useState<Set<string>>(new Set(['search']))

    const toggle = (id: string) => {
      setActive((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '16px 0', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Raycast 스타일 필터 바 — 토글로 다중 선택 가능</div>
        {/* 버튼 클러스터 */}
        <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 10 }}>
          {QUICK_FILTER_BUTTONS.map(({ id, Icon }) => (
            <SolidIconButton
              key={id}
              color={active.has(id) ? 'black' : 'white'}
              size="small"
              onClick={() => toggle(id)}
            >
              <Icon />
            </SolidIconButton>
          ))}
        </div>
        {/* 라벨 */}
        <div style={{ display: 'flex', gap: 4 }}>
          {QUICK_FILTER_BUTTONS.map(({ id, label }) => (
            <div
              key={id}
              style={{
                width: 32, textAlign: 'center', fontSize: 10, fontWeight: 600,
                color: active.has(id) ? '#0f172a' : '#94a3b8',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </div>
          ))}
        </div>
        {/* 선택 상태 */}
        <div style={{ fontSize: 12, color: '#64748b' }}>
          활성 필터: <strong style={{ color: '#0f172a' }}>{active.size > 0 ? [...active].join(', ') : '없음'}</strong>
        </div>
      </div>
    )
  },
}

/* Notion — 인라인 텍스트 포맷 도구 모음
   Notion 텍스트 선택 시 나타나는 인라인 툴바 패턴.
   B/I/U 포맷 버튼을 SolidIconButton으로 구성한 플로팅 스타일.
-------------------------------------------------------------------------- */
const NOTION_FORMAT_BUTTONS: Array<{ fid: string; FIcon: React.ElementType; label: string }> = [
  { fid: 'bold', FIcon: TextBoldIcon, label: 'B' },
  { fid: 'italic', FIcon: TextItalicIcon, label: 'I' },
  { fid: 'underline', FIcon: TextUnderlineIcon, label: 'U' },
  { fid: 'align', FIcon: AlignLeftIcon, label: 'A' },
  { fid: 'star', FIcon: StarLineIcon, label: 'S' },
]

export const Notion_인라인_텍스트_포맷_도구모음 = {
  name: 'Notion — 인라인 텍스트 포맷 도구 모음',
  parameters: {
    docs: {
      description: {
        story: 'Notion 인라인 툴바 패턴. 텍스트 선택 영역 위에 float되는 포맷 버튼 클러스터. SolidIconButton B/I/U/정렬/즐겨찾기 토글로 다중 포맷 동시 적용.',
      },
    },
  },
  render: function NotionInlineToolbar() {
    const [formats, setFormats] = useState<Set<string>>(new Set())
    const [sampleText, _setSampleText] = useState('Orbit UI 디자인 시스템 — 빌드 한 번, 어디서든 일관된 UX를 제공합니다.')

    const toggle = (id: string) => {
      setFormats((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    const textStyle: React.CSSProperties = {
      fontWeight: formats.has('bold') ? 700 : 400,
      fontStyle: formats.has('italic') ? 'italic' : 'normal',
      textDecoration: formats.has('underline') ? 'underline' : 'none',
      textAlign: formats.has('align') ? 'center' : 'left',
    }

    return (
      <div style={{ padding: '16px 0', fontFamily: 'system-ui, sans-serif', width: 380 }}>
        {/* 툴바 */}
        <div style={{
          display: 'inline-flex', gap: 2, background: '#1e293b',
          padding: '4px 6px', borderRadius: 8, marginBottom: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          {NOTION_FORMAT_BUTTONS.map(({ fid, FIcon }) => (
            <div key={fid} style={{ position: 'relative' }}>
              <SolidIconButton
                color={formats.has(fid) ? 'black' : 'white'}
                size="small"
                onClick={() => toggle(fid)}
              >
                <FIcon />
              </SolidIconButton>
              {fid === 'star' && formats.has(fid) && (
                <div style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#f59e0b', border: '1px solid #1e293b',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* 텍스트 프리뷰 */}
        <div style={{
          padding: '16px 18px', borderRadius: 10, background: '#fff',
          border: '1px solid #e2e8f0', lineHeight: 1.7,
        }}>
          <p style={{ fontSize: 14, color: '#0f172a', margin: 0, ...textStyle, transition: 'all 0.15s' }}>
            {sampleText}
          </p>
        </div>

        {/* 편집 */}
        <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {NOTION_FORMAT_BUTTONS.map(({ fid, label }) => (
            <span
              key={fid}
              style={{
                padding: '2px 7px', borderRadius: 4, fontWeight: 600,
                background: formats.has(fid) ? '#dbeafe' : '#f1f5f9',
                color: formats.has(fid) ? '#1d4ed8' : '#94a3b8',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  },
}

/* Raycast + Notion — 탐색 히스토리 뒤로/앞으로 버튼 패턴
   Raycast/Notion의 내비게이션 히스토리 버튼. 비활성 상태(회색)와
   활성 상태(검정)를 명확히 구분하며 히스토리 스택을 시각화.
-------------------------------------------------------------------------- */
const NAV_HISTORY_PAGES = ['홈', '프로젝트', '이슈 목록', '이슈 #142', '댓글']

export const Raycast_Notion_히스토리_내비게이션 = {
  name: 'Raycast + Notion — 히스토리 내비게이션 버튼',
  parameters: {
    docs: {
      description: {
        story: 'Raycast/Notion 내비게이션 히스토리 패턴. SolidIconButton의 disabled prop으로 이전/다음 버튼 비활성 구분. 히스토리 스택 시각화 + 현재 위치 표시.',
      },
    },
  },
  render: function HistoryNavigation() {
    const [historyIdx, setHistoryIdx] = useState(2)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '16px 0', fontFamily: 'system-ui, sans-serif', width: 360 }}>
        {/* 내비게이션 바 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SolidIconButton
            color="white"
            size="small"
            disabled={historyIdx === 0}
            onClick={() => setHistoryIdx((i) => Math.max(0, i - 1))}
          >
            <ChevronLeftLineIcon />
          </SolidIconButton>
          <SolidIconButton
            color="white"
            size="small"
            disabled={historyIdx === NAV_HISTORY_PAGES.length - 1}
            onClick={() => setHistoryIdx((i) => Math.min(NAV_HISTORY_PAGES.length - 1, i + 1))}
          >
            <ChevronRightLineIcon />
          </SolidIconButton>
          <div style={{
            flex: 1, padding: '6px 12px', borderRadius: 8,
            background: '#f8fafc', border: '1px solid #e2e8f0',
            fontSize: 12, color: '#374151', fontWeight: 500,
          }}>
            {NAV_HISTORY_PAGES[historyIdx]}
          </div>
        </div>

        {/* 히스토리 스택 시각화 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            탐색 히스토리
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {NAV_HISTORY_PAGES.map((page, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => setHistoryIdx(i)}
                  style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                    background: i === historyIdx ? '#0f172a' : i < historyIdx ? '#f1f5f9' : '#fff',
                    color: i === historyIdx ? '#fff' : i < historyIdx ? '#374151' : '#cbd5e1',
                    fontWeight: i === historyIdx ? 700 : 400,
                    border: `1px solid ${i === historyIdx ? '#0f172a' : i < historyIdx ? '#e2e8f0' : '#f1f5f9'}`,
                    transition: 'all 0.15s',
                  } as React.CSSProperties}
                >
                  {page}
                </button>
                {i < NAV_HISTORY_PAGES.length - 1 && (
                  <span style={{ fontSize: 10, color: '#cbd5e1' }}>›</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 카드 호버 액션 버튼 그룹
   shadcn Card 패턴 — 카드 hover 시 우측 상단에 아이콘 버튼 그룹 노출
-------------------------------------------------------------------------- */
type ShadcnCard = { title: string; desc: string; tag: string; tagColor: string }

const SHADCN_CARDS: ShadcnCard[] = [
  { title: 'SolidButton', desc: '주요 액션용 CTA 버튼 컴포넌트', tag: 'Actions', tagColor: '#6366f1' },
  { title: 'TextField', desc: '단일 라인 텍스트 입력 필드', tag: 'Inputs', tagColor: '#10b981' },
  { title: 'DataTable', desc: '정렬/필터 지원 데이터 테이블', tag: 'Data', tagColor: '#f59e0b' },
  { title: 'Tooltip', desc: '호버 시 컨텍스트 정보 표시', tag: 'Feedback', tagColor: '#8b5cf6' },
]

export const Shadcn_카드_호버_액션_버튼 = {
  name: 'shadcn/ui — 카드 호버 액션 버튼 그룹',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Card 패턴. 카드에 마우스를 올리면 우측 상단에 SolidIconButton 그룹(북마크/공유/더보기)이 나타납니다. ' +
          'CSS transition으로 opacity 0 → 1 전환.',
      },
    },
  },
  render: function ShadcnCardHover() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
    const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: 480, fontFamily: 'system-ui, sans-serif' }}>
        {SHADCN_CARDS.map((card, i) => (
          <div
            key={card.title}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0',
              background: '#fff', position: 'relative',
              transition: 'box-shadow 0.15s, border-color 0.15s',
              boxShadow: hoveredIdx === i ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
              borderColor: hoveredIdx === i ? '#c7d2fe' : '#e2e8f0',
            }}
          >
            {/* 액션 버튼 그룹 — hover 시 노출 */}
            <div style={{
              position: 'absolute', top: 10, right: 10,
              display: 'flex', gap: 4,
              opacity: hoveredIdx === i ? 1 : 0,
              transition: 'opacity 0.15s',
            }}>
              <SolidIconButton
                color="white"
                size="small"
                onClick={() => setBookmarked((prev) => {
                  const next = new Set(prev)
                  if (next.has(i)) { next.delete(i) } else { next.add(i) }
                  return next
                })}
                style={{ background: bookmarked.has(i) ? '#eff6ff' : undefined }}
              >
                <StarLineIcon />
              </SolidIconButton>
              <SolidIconButton color="white" size="small">
                <ShareIcon />
              </SolidIconButton>
              <SolidIconButton color="white" size="small">
                <MoreHorizontalIcon />
              </SolidIconButton>
            </div>
            {/* 카드 내용 */}
            <span style={{
              display: 'inline-block', fontSize: 10, fontWeight: 700,
              padding: '2px 8px', borderRadius: 20, marginBottom: 8,
              color: card.tagColor, background: `${card.tagColor}18`,
            }}>
              {card.tag}
            </span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{card.title}</div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{card.desc}</div>
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 다크 네비게이션 바 아이콘 버튼
   Vercel Sidebar — 다크 배경에 흰색 아이콘 버튼 + 활성 상태 하이라이트
-------------------------------------------------------------------------- */
type NavItem = { key: string; Icon: React.FC<{ size?: number }>; label: string }
const VERCEL_NAV_ITEMS: NavItem[] = [
  { key: 'home', Icon: (p) => <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: '홈' },
  { key: 'search', Icon: SearchIcon, label: '검색' },
  { key: 'notif', Icon: NotificationLineIcon, label: '알림' },
  { key: 'star', Icon: StarLineIcon, label: '즐겨찾기' },
  { key: 'settings', Icon: SettingLineIcon, label: '설정' },
]

export const Vercel_다크_사이드바_네비게이션 = {
  name: 'Vercel Design — 다크 사이드바 네비게이션',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Dashboard 사이드바 패턴. 다크 배경(#0f172a)에 SolidIconButton을 배치하고 ' +
          '활성 항목은 흰색 배경 + 검정 아이콘으로 강조합니다. color="black"과 "white" 전환.',
      },
    },
  },
  render: function VercelSidebar() {
    const [active, setActive] = useState('home')

    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', fontFamily: 'system-ui, sans-serif' }}>
        {/* 사이드바 */}
        <div style={{
          width: 56, padding: '12px 8px', borderRadius: 14,
          background: '#0f172a', display: 'flex', flexDirection: 'column', gap: 6,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}>
          {VERCEL_NAV_ITEMS.map(({ key, Icon, label }) => (
            <SolidIconButton
              key={key}
              color={active === key ? 'white' : 'black'}
              size="medium"
              onClick={() => setActive(key)}
              aria-label={label}
              style={{
                background: active === key ? '#fff' : 'transparent',
                color: active === key ? '#0f172a' : '#94a3b8',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <Icon size={16} />
            </SolidIconButton>
          ))}
        </div>

        {/* 현재 선택 표시 */}
        <div style={{ padding: '20px 24px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>현재 섹션</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
            {VERCEL_NAV_ITEMS.find((n) => n.key === active)?.label}
          </div>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 리치 텍스트 에디터 포맷 툴바
   shadcn/ui Editor 패턴 — Bold/Italic/Underline/정렬 토글 버튼 그룹
-------------------------------------------------------------------------- */
type EditorFmtKey = 'bold' | 'italic' | 'underline' | 'left' | 'center' | 'right'
type EditorAlignKey = 'left' | 'center' | 'right'

const EDITOR_FMT_BUTTONS: { key: EditorFmtKey; Icon: React.FC<{ size?: number }>; group: 'text' | 'align' }[] = [
  { key: 'bold', Icon: TextBoldIcon, group: 'text' },
  { key: 'italic', Icon: TextItalicIcon, group: 'text' },
  { key: 'underline', Icon: TextUnderlineIcon, group: 'text' },
  { key: 'left', Icon: AlignLeftIcon, group: 'align' },
  { key: 'center', Icon: (p) => <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, group: 'align' },
  { key: 'right', Icon: (p) => <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, group: 'align' },
]

export const Shadcn_에디터_포맷_툴바 = {
  name: 'shadcn/ui — 에디터 포맷 툴바',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 리치 텍스트 에디터 툴바 패턴. ' +
          'Bold/Italic/Underline(토글 다중 선택) + 정렬(단일 선택) 버튼 그룹. ' +
          '활성 상태는 color="black"으로 강조합니다.',
      },
    },
  },
  render: function EditorFormatToolbar() {
    const [active, setActive] = useState<Set<EditorFmtKey>>(new Set(['bold']))
    const [align, setAlign] = useState<EditorAlignKey>('left')

    const toggleFormat = (key: EditorFmtKey) => {
      setActive((prev) => {
        const next = new Set(prev)
        if (next.has(key)) { next.delete(key) } else { next.add(key) }
        return next
      })
    }

    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 툴바 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px',
          borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff',
          width: 'fit-content',
        }}>
          {/* 텍스트 포맷 그룹 */}
          {EDITOR_FMT_BUTTONS.filter((b) => b.group === 'text').map(({ key, Icon }) => (
            <SolidIconButton
              key={key}
              color={active.has(key) ? 'black' : 'white'}
              size="small"
              onClick={() => toggleFormat(key)}
              aria-pressed={active.has(key)}
            >
              <Icon size={14} />
            </SolidIconButton>
          ))}
          <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 2px' }} />
          {/* 정렬 그룹 */}
          {EDITOR_FMT_BUTTONS.filter((b) => b.group === 'align').map(({ key, Icon }) => (
            <SolidIconButton
              key={key}
              color={align === key ? 'black' : 'white'}
              size="small"
              onClick={() => setAlign(key as EditorAlignKey)}
            >
              <Icon size={14} />
            </SolidIconButton>
          ))}
        </div>

        {/* 미리보기 */}
        <div style={{
          padding: '14px 18px', borderRadius: 10, border: '1px solid #e2e8f0',
          background: '#fafafa', minHeight: 60, maxWidth: 360,
          fontWeight: active.has('bold') ? 700 : 400,
          fontStyle: active.has('italic') ? 'italic' : 'normal',
          textDecoration: active.has('underline') ? 'underline' : 'none',
          textAlign: align,
          fontSize: 14, color: '#0f172a', lineHeight: 1.6,
        }}>
          Orbit UI는 Figma 기반 React 디자인 시스템입니다.
        </div>
      </div>
    )
  },
}

// ============================================================
// Cycle 131 — shadcn/ui + Radix UI 벤치마크 반영
// ============================================================

// shadcn/ui 스타일 — 카드 그리드 호버 시 플로팅 액션 버튼
type ProjectCard131 = { id: number; title: string; lang: string; stars: number; color: string }
const PROJECT_CARDS_131: ProjectCard131[] = [
  { id: 1, title: 'orbit-ui', lang: 'TypeScript', stars: 142, color: '#3b82f6' },
  { id: 2, title: 'vite-plugin', lang: 'JavaScript', stars: 58, color: '#f59e0b' },
  { id: 3, title: 'icons', lang: 'SVG', stars: 31, color: '#10b981' },
]

function ProjectCardHover131() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [starred, setStarred] = useState<Set<number>>(new Set())
  return (
    <div style={{ display: 'flex', gap: 16, padding: '24px' }}>
      {PROJECT_CARDS_131.map((card) => (
        <div
          key={card.id}
          style={{
            position: 'relative', width: 180, borderRadius: 12,
            border: '1px solid #e2e8f0', padding: '20px 16px',
            background: '#fff', cursor: 'pointer', transition: 'box-shadow 150ms ease',
            boxShadow: hovered === card.id ? '0 4px 20px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
          }}
          onMouseEnter={() => setHovered(card.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: card.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>📦</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>{card.title}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{card.lang}</div>
          {hovered === card.id && (
            <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
              <SolidIconButton
                color="white"
                size="small"
                onClick={(e) => { e.stopPropagation(); setStarred((prev) => { const n = new Set(prev); if (n.has(card.id)) { n.delete(card.id) } else { n.add(card.id) } return n }) }}
              >
                <StarLineIcon size={14} />
              </SolidIconButton>
              <SolidIconButton color="black" size="small">
                <ShareIcon size={14} />
              </SolidIconButton>
            </div>
          )}
          <div style={{ marginTop: 12, fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
            <StarLineIcon size={12} />
            {card.stars + (starred.has(card.id) ? 1 : 0)}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Shadcn_카드_호버_플로팅_액션: Story = {
  args: { children: <PlusIcon /> },
  render: () => <ProjectCardHover131 />,
}

// Radix UI 제어 컴포넌트 패턴 — 토글 그룹 (단일/다중 선택)
type AlignKey131 = 'left' | 'center' | 'right' | 'justify'
type FormatKey131 = 'bold' | 'italic' | 'underline'

function RadixToggleGroupRender131() {
  const [align, setAlign] = useState<AlignKey131>('left')
  const [formats, setFormats] = useState<Set<FormatKey131>>(new Set())
  const toggleFormat = (k: FormatKey131) => setFormats((prev) => { const n = new Set(prev); if (n.has(k)) { n.delete(k) } else { n.add(k) } return n })
  const alignButtons: { key: AlignKey131; Icon: React.FC<{ size?: number }> }[] = [
    { key: 'left', Icon: AlignLeftIcon },
    { key: 'center', Icon: AlignLeftIcon },
    { key: 'right', Icon: AlignLeftIcon },
    { key: 'justify', Icon: AlignLeftIcon },
  ]
  const fmtButtons: { key: FormatKey131; Icon: React.FC<{ size?: number }> }[] = [
    { key: 'bold', Icon: TextBoldIcon },
    { key: 'italic', Icon: TextItalicIcon },
    { key: 'underline', Icon: TextUnderlineIcon },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          정렬 (단일 선택)
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 8, padding: 4 }}>
          {alignButtons.map(({ key, Icon }) => (
            <SolidIconButton
              key={key}
              color={align === key ? 'black' : 'white'}
              size="small"
              onClick={() => setAlign(key)}
            >
              <Icon size={14} />
            </SolidIconButton>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          서식 (다중 선택)
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 8, padding: 4 }}>
          {fmtButtons.map(({ key, Icon }) => (
            <SolidIconButton
              key={key}
              color={formats.has(key) ? 'black' : 'white'}
              size="small"
              onClick={() => toggleFormat(key)}
            >
              <Icon size={14} />
            </SolidIconButton>
          ))}
        </div>
      </div>
      <div style={{
        padding: '14px 18px', borderRadius: 10, border: '1px solid #e2e8f0',
        fontWeight: formats.has('bold') ? 700 : 400,
        fontStyle: formats.has('italic') ? 'italic' : 'normal',
        textDecoration: formats.has('underline') ? 'underline' : 'none',
        textAlign: align, fontSize: 14, color: '#0f172a', lineHeight: 1.7,
      }}>
        Orbit UI는 Figma 기반 컴포넌트 시스템입니다. 텍스트 서식 데모.
      </div>
    </div>
  )
}

export const Radix_텍스트_서식_토글_그룹: Story = {
  args: { children: <TextBoldIcon /> },
  render: () => <RadixToggleGroupRender131 />,
}

// Notion 스타일 — 인라인 블록 편집기 호버 액션바
type Block131 = { id: number; text: string; type: 'heading' | 'paragraph' | 'list' }

function NotionBlockEditorRender131() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [blocks, setBlocks] = useState<Block131[]>([
    { id: 1, text: '프로젝트 시작하기', type: 'heading' },
    { id: 2, text: '이 문서는 프로젝트 초기 설정 방법을 설명합니다.', type: 'paragraph' },
    { id: 3, text: 'pnpm install 로 의존성 설치', type: 'list' },
    { id: 4, text: 'pnpm dev 로 개발 서버 실행', type: 'list' },
  ])
  const removeBlock = (id: number) => setBlocks((prev) => prev.filter((b) => b.id !== id))
  return (
    <div style={{ maxWidth: 480, padding: '24px', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
      {blocks.map((block) => (
        <div
          key={block.id}
          style={{ position: 'relative', padding: '6px 0', display: 'flex', alignItems: 'flex-start', gap: 8 }}
          onMouseEnter={() => setHovered(block.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === block.id && (
            <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
              <SolidIconButton color="white" size="small" onClick={() => removeBlock(block.id)}>
                <PlusIcon size={12} />
              </SolidIconButton>
              <SolidIconButton color="white" size="small">
                <MoreHorizontalIcon size={12} />
              </SolidIconButton>
            </div>
          )}
          <div style={{
            flex: 1,
            fontSize: block.type === 'heading' ? 18 : 14,
            fontWeight: block.type === 'heading' ? 700 : 400,
            color: '#0f172a', lineHeight: 1.7,
            paddingLeft: block.type === 'list' ? 16 : 0,
          }}>
            {block.type === 'list' && <span style={{ color: '#94a3b8', marginRight: 8 }}>•</span>}
            {block.text}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Notion_블록_편집기_호버_액션: Story = {
  args: { children: <MoreHorizontalIcon /> },
  render: () => <NotionBlockEditorRender131 />,
}

/* --------------------------------------------------------------------------
   Vercel Design — 컴팩트 대시보드 액션 클러스터
   Vercel의 모노크롬 아이콘 버튼 그룹 — 새로고침/필터/공유/더보기
-------------------------------------------------------------------------- */
function VercelDashboardActionClusterRender() {
  const [refreshing, setRefreshing] = useState(false)
  const [starred, setStarred] = useState(false)
  const [shared, setShared] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1200)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 360 }}>
      {/* 대시보드 헤더 */}
      <div style={{ padding: '12px 16px', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, background: 'var(--sem-eclipse-color-backgroundPrimary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>프로덕션 배포</div>
          <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>orbit-ui.vercel.app · 2분 전</div>
        </div>
        <Flex gap="4px">
          <SolidIconButton
            color="black"
            size="small"
            onClick={handleRefresh}
            style={{ opacity: refreshing ? 0.5 : 1, transition: 'opacity 0.2s' }}
          >
            <SearchIcon />
          </SolidIconButton>
          <SolidIconButton
            color={starred ? 'black' : 'black'}
            size="small"
            onClick={() => setStarred((v) => !v)}
          >
            <StarLineIcon />
          </SolidIconButton>
          <SolidIconButton
            color="black"
            size="small"
            onClick={() => setShared((v) => !v)}
          >
            <ShareIcon />
          </SolidIconButton>
          <SolidIconButton color="black" size="small">
            <MoreHorizontalIcon />
          </SolidIconButton>
        </Flex>
      </div>
      {/* 상태 표시 */}
      <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        {refreshing && '새로고침 중...'}
        {!refreshing && starred && '즐겨찾기에 추가됨'}
        {!refreshing && !starred && shared && '공유 링크 복사됨'}
        {!refreshing && !starred && !shared && 'Vercel 대시보드 액션 클러스터 패턴'}
      </div>
    </div>
  )
}

export const Vercel_대시보드_액션_클러스터: Story = {
  args: { children: <SearchIcon /> },
  name: 'Vercel Design — 컴팩트 대시보드 아이콘 액션 클러스터',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 대시보드의 모노크롬 아이콘 버튼 그룹 패턴. 새로고침(opacity 애니메이션), 즐겨찾기 토글, 공유. 컴팩트 헤더에 액션을 집약하는 Vercel 스타일.',
      },
    },
  },
  render: () => <VercelDashboardActionClusterRender />,
}

/* --------------------------------------------------------------------------
   Ant Design — 테이블 인라인 CRUD 액션
   Ant Design DataTable 행별 아이콘 액션 버튼 패턴
-------------------------------------------------------------------------- */
const ANT_TABLE_ROWS = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자', status: '활성' },
  { id: 2, name: '김민수', email: 'kim@example.com', role: '멤버', status: '활성' },
  { id: 3, name: '이수진', email: 'lee@example.com', role: '뷰어', status: '비활성' },
]

function AntTableCRUDRender() {
  const [rows, setRows] = useState(ANT_TABLE_ROWS)
  const [editId, setEditId] = useState<number | null>(null)

  const handleDelete = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id))
  const handleEdit = (id: number) => setEditId(id === editId ? null : id)

  return (
    <div style={{ minWidth: 480, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, overflow: 'hidden' }}>
      {/* 테이블 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 80px 80px 88px', padding: '8px 16px', background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        <span>이름</span><span>이메일</span><span>역할</span><span>상태</span><span style={{ textAlign: 'right' }}>액션</span>
      </div>
      {rows.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--sem-eclipse-color-foregroundDisabled)', fontSize: 13 }}>모든 멤버가 삭제되었습니다</div>
      ) : (
        rows.map((row, idx) => (
          <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 80px 80px 88px', padding: '10px 16px', borderTop: idx === 0 ? 'none' : '1px solid var(--sem-eclipse-color-borderSubtle)', alignItems: 'center', background: editId === row.id ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'transparent' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{row.name}</span>
            <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{row.email}</span>
            <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{row.role}</span>
            <span style={{ fontSize: 11, color: row.status === '활성' ? '#10b981' : '#94a3b8', fontWeight: 600 }}>{row.status}</span>
            <Flex gap="4px" justifyContent="flex-end">
              <SolidIconButton color="black" size="small" onClick={() => handleEdit(row.id)}>
                <WriteLineIcon />
              </SolidIconButton>
              <SolidIconButton color="black" size="small" onClick={() => handleDelete(row.id)}>
                <CheckIcon />
              </SolidIconButton>
            </Flex>
          </div>
        ))
      )}
    </div>
  )
}

export const Ant_테이블_인라인_CRUD_액션: Story = {
  args: { children: <WriteLineIcon /> },
  name: 'Ant Design — 테이블 행별 인라인 CRUD 아이콘 버튼',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design DataTable 행별 편집/삭제 아이콘 액션 패턴. 편집 클릭 시 행 하이라이트, 삭제 시 행 제거. 모든 행 삭제 시 빈 상태 메시지 표시.',
      },
    },
  },
  render: () => <AntTableCRUDRender />,
}

/* --------------------------------------------------------------------------
   Vercel + Ant Design — 미디어 플레이어 컨트롤
   컴팩트 오디오/비디오 컨트롤 바 — Vercel 스타일 + Ant 기능성
-------------------------------------------------------------------------- */
function VercelAntMediaPlayerRender() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(32)
  const [liked, setLiked] = useState(false)

  const totalSec = 243
  const elapsed = Math.round(totalSec * progress / 100)
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div style={{ width: 360, padding: '14px 16px', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 12, background: 'var(--sem-eclipse-color-backgroundPrimary)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* 트랙 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #ec4899)', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Orbit UI Design Podcast</div>
          <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>Episode 12 — Design Tokens</div>
        </div>
        <SolidIconButton color="black" size="small" onClick={() => setLiked((v) => !v)}>
          <StarLineIcon />
        </SolidIconButton>
      </div>
      {/* 프로그레스 바 */}
      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{ width: '100%', height: 4, accentColor: '#6366f1', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--sem-eclipse-color-foregroundQuaternary)', marginTop: 2 }}>
          <span>{fmt(elapsed)}</span><span>{fmt(totalSec)}</span>
        </div>
      </div>
      {/* 컨트롤 버튼 */}
      <Flex gap="8px" justifyContent="center" alignItems="center">
        <SolidIconButton color="black" size="small" onClick={() => setProgress((v) => Math.max(0, v - 10))}>
          <ChevronLeftLineIcon />
        </SolidIconButton>
        <SolidIconButton color="black" size="medium" onClick={() => setPlaying((v) => !v)}>
          {playing ? <CheckIcon /> : <PlusIcon />}
        </SolidIconButton>
        <SolidIconButton color="black" size="small" onClick={() => setProgress((v) => Math.min(100, v + 10))}>
          <ChevronRightLineIcon />
        </SolidIconButton>
        <SolidIconButton color="black" size="small" onClick={() => setMuted((v) => !v)} style={{ marginLeft: 8 }}>
          <NotificationLineIcon />
        </SolidIconButton>
      </Flex>
      <div style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundDisabled)', textAlign: 'center' }}>
        {playing ? '재생 중' : '일시정지'} · {muted ? '음소거' : '소리 켜짐'} · {liked ? '즐겨찾기 추가됨' : 'Vercel + Ant 미디어 컨트롤'}
      </div>
    </div>
  )
}

export const Vercel_Ant_미디어_플레이어_컨트롤: Story = {
  args: { children: <StarLineIcon /> },
  name: 'Vercel + Ant Design — 컴팩트 미디어 플레이어 컨트롤',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 스타일 + Ant Design 기능성 미디어 플레이어. 이전/재생-일시정지/다음 + 음소거 + 즐겨찾기. range 슬라이더로 진행률 제어, 경과/총 시간 표시.',
      },
    },
  },
  render: () => <VercelAntMediaPlayerRender />,
}

/* --------------------------------------------------------------------------
   Radix UI — 접근성 토글 아이콘 버튼 (aria-pressed / aria-expanded)
-------------------------------------------------------------------------- */
function RadixA11yToggleRender(args: ComponentProps<typeof SolidIconButton>) {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [starred, setStarred] = useState(false)

  return (
    <div style={{ width: 360, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 10 }}>Radix 접근성 토글 버튼 패턴</div>
      {/* Text format toggles with aria-pressed */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          <SolidIconButton
            {...args}
            color={bold ? 'black' : 'white'}
            size="small"
            aria-pressed={bold}
            onClick={() => setBold(b => !b)}
          >
            <TextBoldIcon size={16} />
          </SolidIconButton>
          <SolidIconButton
            {...args}
            color={italic ? 'black' : 'white'}
            size="small"
            aria-pressed={italic}
            onClick={() => setItalic(b => !b)}
          >
            <TextItalicIcon size={16} />
          </SolidIconButton>
          <SolidIconButton
            {...args}
            color={underline ? 'black' : 'white'}
            size="small"
            aria-pressed={underline}
            onClick={() => setUnderline(b => !b)}
          >
            <TextUnderlineIcon size={16} />
          </SolidIconButton>
        </div>
        <div style={{ width: 1, height: 28, background: '#e2e8f0', margin: '0 4px', alignSelf: 'center' }} />
        <SolidIconButton
          {...args}
          color={starred ? 'black' : 'white'}
          size="small"
          aria-pressed={starred}
          onClick={() => setStarred(s => !s)}
        >
          <StarLineIcon size={16} />
        </SolidIconButton>
        <div style={{ marginLeft: 'auto' }}>
          <SolidIconButton
            {...args}
            color="white"
            size="small"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen(m => !m)}
          >
            <MoreHorizontalIcon size={16} />
          </SolidIconButton>
        </div>
      </div>
      {menuOpen && (
        <div style={{ padding: '8px 12px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12, color: '#374151' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#6366f1' }}>ARIA 상태</span>
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Bold: {bold ? 'pressed' : 'not-pressed'} / Italic: {italic ? 'pressed' : 'not-pressed'} / Star: {starred ? 'pressed' : 'not-pressed'}</div>
        </div>
      )}
      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>Radix UI의 aria-pressed, aria-expanded, role=&quot;button&quot; 패턴 적용</div>
    </div>
  )
}

export const Radix_접근성_토글_아이콘_버튼: Story = {
  name: 'Radix UI — 접근성 토글 아이콘 버튼 (aria-pressed)',
  args: { children: <TextBoldIcon /> },
  render: (args) => <RadixA11yToggleRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Primitive 접근성 패턴. SolidIconButton에 aria-pressed, aria-expanded, aria-haspopup을 적용해 스크린리더 친화적 서식 도구를 구현합니다. ' +
          'Radix Toggle/ToggleGroup 컴포넌트의 접근성 원칙을 반영합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Ant Design — 데이터 그리드 인라인 액션 아이콘 버튼
-------------------------------------------------------------------------- */
const ANT_TASKS = [
  { id: 'T-001', title: 'DataTable 정렬 개선', priority: '높음', status: '진행중', assignee: 'Alex' },
  { id: 'T-002', title: 'Modal 접근성 패치', priority: '긴급', status: '검토', assignee: 'Jin' },
  { id: 'T-003', title: 'Chip 색상 토큰 매핑', priority: '보통', status: '완료', assignee: 'Kim' },
  { id: 'T-004', title: 'SearchBar 디바운스', priority: '낮음', status: '대기', assignee: 'Alex' },
]

const ANT_PRIORITY_COLOR: Record<string, string> = { 긴급: '#ef4444', 높음: '#f97316', 보통: '#6366f1', 낮음: '#94a3b8' }
const ANT_STATUS_BG: Record<string, { bg: string; color: string }> = {
  진행중: { bg: '#eef2ff', color: '#4f46e5' },
  검토: { bg: '#fff7ed', color: '#c2410c' },
  완료: { bg: '#f0fdf4', color: '#16a34a' },
  대기: { bg: '#f8fafc', color: '#64748b' },
}

function AntTableInlineActionRender(args: ComponentProps<typeof SolidIconButton>) {
  const [tasks, setTasks] = useState(ANT_TASKS)

  const deleteTask = (id: string) => setTasks(t => t.filter(task => task.id !== id))

  return (
    <div style={{ width: 460, fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>태스크 관리</span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{tasks.length}개</span>
        <div style={{ marginLeft: 'auto' }}>
          <SolidIconButton {...args} color="black" size="small">
            <PlusIcon size={16} />
          </SolidIconButton>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            {['ID', '제목', '우선순위', '상태', '담당자', '액션'].map(col => (
              <th key={col} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => {
            const st = ANT_STATUS_BG[task.status] ?? { bg: '#f8fafc', color: '#64748b' }
            return (
              <tr key={task.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '9px 12px', fontSize: 11, color: '#6b7280', fontFamily: 'monospace', borderBottom: '1px solid #f3f4f6' }}>{task.id}</td>
                <td style={{ padding: '9px 12px', fontSize: 12, color: '#111827', borderBottom: '1px solid #f3f4f6' }}>{task.title}</td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: 10, color: ANT_PRIORITY_COLOR[task.priority], fontWeight: 600 }}>{task.priority}</span>
                </td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, ...st, fontWeight: 500 }}>{task.status}</span>
                </td>
                <td style={{ padding: '9px 12px', fontSize: 11, color: '#4b5563', borderBottom: '1px solid #f3f4f6' }}>{task.assignee}</td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <SolidIconButton {...args} color="white" size="small">
                      <WriteLineIcon size={14} />
                    </SolidIconButton>
                    <SolidIconButton {...args} color="white" size="small" onClick={() => deleteTask(task.id)}>
                      <CheckIcon size={14} />
                    </SolidIconButton>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <div style={{ padding: 32, textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>모든 태스크 완료!</div>
      )}
    </div>
  )
}

export const Ant_데이터_그리드_인라인_액션_아이콘: Story = {
  name: 'Ant Design — 데이터 그리드 인라인 액션 아이콘 버튼',
  args: { children: <WriteLineIcon /> },
  render: (args) => <AntTableInlineActionRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Table 인라인 액션 패턴. 데이터 테이블의 각 행에 SolidIconButton(편집/완료)을 배치합니다. ' +
          '체크 클릭으로 행을 삭제해 Ant의 낙관적 업데이트 UX를 재현합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Radix + Ant — 알림 센터 헤더 아이콘 버튼 클러스터
-------------------------------------------------------------------------- */
const NOTIF_COUNT = 5

function RadixAntNotifCenterRender(args: ComponentProps<typeof SolidIconButton>) {
  const [count, setCount] = useState(NOTIF_COUNT)
  const [muted, setMuted] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div style={{ width: 380, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ padding: '12px 16px', background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827', flex: 1 }}>알림 센터</span>
          {searchOpen && (
            <input
              autoFocus
              placeholder="알림 검색..."
              onBlur={() => setSearchOpen(false)}
              style={{ flex: 1, padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, outline: 'none' }}
            />
          )}
          <div style={{ display: 'flex', gap: 4 }}>
            <SolidIconButton
              {...args}
              color="white"
              size="small"
              aria-pressed={searchOpen}
              onClick={() => setSearchOpen(s => !s)}
            >
              <SearchIcon size={16} />
            </SolidIconButton>
            <SolidIconButton
              {...args}
              color={muted ? 'black' : 'white'}
              size="small"
              aria-pressed={muted}
              onClick={() => setMuted(m => !m)}
              title={muted ? '음소거 해제' : '음소거'}
            >
              <NotificationLineIcon size={16} />
            </SolidIconButton>
            <div style={{ position: 'relative' }}>
              <SolidIconButton
                {...args}
                color="white"
                size="small"
                aria-expanded={panelOpen}
                onClick={() => { setPanelOpen(p => !p); setCount(0) }}
              >
                <SettingLineIcon size={16} />
              </SolidIconButton>
              {count > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>
              )}
            </div>
          </div>
        </div>
        {panelOpen && (
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12, color: '#6b7280' }}>
            <div style={{ fontWeight: 600, color: '#111827', marginBottom: 4 }}>알림 설정</div>
            {['이메일 알림', '슬랙 알림', '푸시 알림'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>{item}</span>
                <span style={{ fontSize: 10, color: muted ? '#ef4444' : '#10b981' }}>{muted ? '비활성' : '활성'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const Radix_Ant_알림_센터_헤더_클러스터: Story = {
  name: 'Radix + Ant Design — 알림 센터 헤더 아이콘 버튼 클러스터',
  args: { children: <NotificationLineIcon /> },
  render: (args) => <RadixAntNotifCenterRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI + Ant Design 복합 패턴. 검색(aria-pressed 토글) + 음소거(aria-pressed) + 설정(aria-expanded + 배지)를 SolidIconButton으로 구성합니다. ' +
          'Ant Design의 Notification 컴포넌트와 Radix Primitive 접근성 패턴을 결합합니다.',
      },
    },
  },
}
