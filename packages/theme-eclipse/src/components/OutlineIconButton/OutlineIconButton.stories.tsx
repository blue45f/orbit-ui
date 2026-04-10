import { Flex } from '@heejun-com/core'
import {
  PlusIcon,
  WriteLineIcon,
  StarLineIcon,
  MoreHorizontalIcon,
  SettingLineIcon,
  DownloadIcon,
  ShareIcon,
  RefreshLineIcon,
  FilterIcon,
  GridViewLineIcon,
  ArrowSortIcon,
  ChevronLeftLineIcon,
  ChevronRightLineIcon,
  ListLineIcon,
} from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps, useState } from 'react'

import { OutlineIconButton } from '.'

OutlineIconButton.displayName = 'OutlineIconButton'

const meta = {
  title: 'eclipse/Actions/Buttons/OutlineIconButton',
  component: OutlineIconButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'gray'],
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
} satisfies Meta<typeof OutlineIconButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  render: (prop: ComponentProps<typeof OutlineIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <OutlineIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </OutlineIconButton>
        <OutlineIconButton {...prop} color="gray" size="large">
          <PlusIcon />
        </OutlineIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 사이즈 = {
  render: (prop: ComponentProps<typeof OutlineIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <OutlineIconButton {...prop} color="black" size="small">
          <PlusIcon />
        </OutlineIconButton>
        <OutlineIconButton {...prop} color="black" size="medium">
          <PlusIcon />
        </OutlineIconButton>
        <OutlineIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </OutlineIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 디자인QA = {
  args: {
    color: 'black',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    controls: {
      exclude: ['as', 'children', 'onClick'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, ...rest }: any) => {
    return (
      <OutlineIconButton {...rest} color={color} size={size}>
        <PlusIcon />
      </OutlineIconButton>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 상세 액션 툴바
   Linear 스타일 이슈 상세 페이지 우상단 액션바 — 컴팩트 간격, 미니멀 아이콘
-------------------------------------------------------------------------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Linear_이슈_액션_툴바 = {
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 상세 페이지 액션바 패턴. 우측 상단에 OutlineIconButton 툴바를 배치하여 수정, 즐겨찾기, 공유, 더보기 액션을 제공합니다.',
      },
    },
  },
  render: () => (
    <div
      style={{
        maxWidth: 520,
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #f1f5f9',
          background: '#f8fafc',
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>ORB-1234</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>2026-04-10 · InProgress</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <OutlineIconButton color="black" size="small" aria-label="수정">
            <WriteLineIcon />
          </OutlineIconButton>
          <OutlineIconButton color="black" size="small" aria-label="즐겨찾기">
            <StarLineIcon />
          </OutlineIconButton>
          <OutlineIconButton color="black" size="small" aria-label="공유">
            <ShareIcon />
          </OutlineIconButton>
          <OutlineIconButton color="black" size="small" aria-label="더보기">
            <MoreHorizontalIcon />
          </OutlineIconButton>
        </div>
      </div>
      <div style={{ padding: '16px', fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
        BoxedCheckbox 권한 매트릭스 스토리 추가 및 SolidIconButton 에디터 툴바 패턴 구현. shadcn/ui + Radix UI 벤치마크 기반으로 인터랙티브 데모를 고도화합니다.
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 모노크롬 액션 버튼 그룹
   Vercel 배포 히스토리 스타일 — 모노크롬 팔레트, 컴팩트 밀도
-------------------------------------------------------------------------- */
function VercelDeployActionsRender() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1200)
  }

  const deploys = [
    { id: 'dpl_1', branch: 'main', status: 'ready', time: '2분 전' },
    { id: 'dpl_2', branch: 'feat/token-system', status: 'building', time: '12분 전' },
    { id: 'dpl_3', branch: 'fix/eslint-errors', status: 'error', time: '1시간 전' },
  ]

  const statusColor: Record<string, string> = {
    ready: '#10b981',
    building: '#f59e0b',
    error: '#ef4444',
  }

  return (
    <div style={{ maxWidth: 480, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>배포 히스토리</span>
        <OutlineIconButton
          color="black"
          size="small"
          onClick={handleRefresh}
          aria-label="새로고침"
          disabled={refreshing}
        >
          <RefreshLineIcon />
        </OutlineIconButton>
      </div>
      {deploys.map((d) => (
        <div
          key={d.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderBottom: '1px solid #f8fafc',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: statusColor[d.status],
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#1e293b', fontWeight: 600 }}>{d.branch}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.time}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <OutlineIconButton color="gray" size="small" aria-label="설정">
              <SettingLineIcon />
            </OutlineIconButton>
            <OutlineIconButton color="gray" size="small" aria-label="다운로드">
              <DownloadIcon />
            </OutlineIconButton>
          </div>
        </div>
      ))}
      {refreshing && (
        <div style={{ padding: '8px 16px', fontSize: 11, color: '#6366f1', background: '#f0f0ff', textAlign: 'center' }}>
          새로고침 중...
        </div>
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Vercel_배포_히스토리_액션 = {
  parameters: {
    docs: {
      description: {
        story:
          'Vercel 배포 히스토리 UI 패턴. 컴팩트한 OutlineIconButton으로 각 배포 항목의 설정/다운로드 액션을 제공하고, 새로고침 버튼은 로딩 중 비활성화됩니다.',
      },
    },
  },
  render: () => <VercelDeployActionsRender />,
}

/* --------------------------------------------------------------------------
   비활성화 상태 + 툴팁 패턴
   disabled 상태에서의 시각적 처리 — 활성/비활성 비교
-------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Linear 벤치마크: 필터·정렬·뷰 전환 툴바
   Linear 이슈 목록 상단 툴바 패턴 — 필터/정렬/뷰 전환 아이콘 버튼 조합
-------------------------------------------------------------------------- */
function LinearFilterToolbarRender() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [filterActive, setFilterActive] = useState(false)
  const [sortActive, setSortActive] = useState(false)
  const [issueCount] = useState(24)

  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderBottom: '1px solid #f1f5f9', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', flex: 1 }}>
          이슈 <span style={{ color: '#94a3b8', fontWeight: 400 }}>({issueCount})</span>
        </span>

        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ position: 'relative' }}>
            <OutlineIconButton
              color={filterActive ? 'black' : 'gray'}
              size="small"
              onClick={() => setFilterActive((p) => !p)}
              aria-label="필터"
              aria-pressed={filterActive}
            >
              <FilterIcon />
            </OutlineIconButton>
            {filterActive && (
              <span style={{ position: 'absolute', top: -3, right: -3, width: 7, height: 7, borderRadius: '50%', background: '#6366f1', border: '1.5px solid #fff' }} />
            )}
          </div>
          <OutlineIconButton
            color={sortActive ? 'black' : 'gray'}
            size="small"
            onClick={() => setSortActive((p) => !p)}
            aria-label="정렬"
            aria-pressed={sortActive}
          >
            <ArrowSortIcon />
          </OutlineIconButton>
        </div>

        <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />

        <div style={{ display: 'flex', gap: 1, background: '#f1f5f9', borderRadius: 8, padding: 3 }}>
          <OutlineIconButton
            color={view === 'list' ? 'black' : 'gray'}
            size="small"
            onClick={() => setView('list')}
            aria-label="목록 보기"
          >
            <ListLineIcon />
          </OutlineIconButton>
          <OutlineIconButton
            color={view === 'grid' ? 'black' : 'gray'}
            size="small"
            onClick={() => setView('grid')}
            aria-label="그리드 보기"
          >
            <GridViewLineIcon />
          </OutlineIconButton>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {filterActive && (
          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: '#eef2ff', color: '#6366f1', fontWeight: 600, border: '1px solid #c7d2fe' }}>
            상태: In Progress
          </span>
        )}
        {sortActive && (
          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: '#fef9c3', color: '#a16207', fontWeight: 600, border: '1px solid #fde68a' }}>
            정렬: 우선순위순
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: view === 'list' ? 'column' : 'row', gap: 8, flexWrap: 'wrap' }}>
        {['ORB-101 버튼 컴포넌트 리팩토링', 'ORB-102 다크모드 토큰 추가', 'ORB-103 접근성 검수'].map((issue) => (
          <div
            key={issue}
            style={{
              padding: view === 'list' ? '8px 12px' : '12px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              background: '#fff',
              fontSize: 12,
              color: '#374151',
              flex: view === 'grid' ? '1 1 150px' : undefined,
            }}
          >
            {issue}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        Linear 이슈 툴바 패턴 — 뷰: {view}, 필터: {filterActive ? '적용' : '없음'}, 정렬: {sortActive ? '적용' : '없음'}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Linear_필터_정렬_툴바 = {
  parameters: {
    docs: {
      description: {
        story: 'Linear 이슈 목록 상단 툴바 패턴. 필터/정렬 버튼은 활성 시 blue dot으로 표시하고, 뷰 전환 버튼은 토글 그룹으로 구성됩니다.',
      },
    },
  },
  render: () => <LinearFilterToolbarRender />,
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 블록 편집 컨트롤
   Notion 블록 에디터 패턴 — 드래그 핸들 + 블록 추가 + 액션 버튼 조합
-------------------------------------------------------------------------- */
const NOTION_BLOCKS = [
  { id: 'b1', type: 'heading', content: '디자인 시스템 아키텍처', level: 1 },
  { id: 'b2', type: 'text', content: 'Orbit UI는 3-tier 토큰 기반으로 설계된 React 컴포넌트 라이브러리입니다.' },
  { id: 'b3', type: 'text', content: 'vanilla-extract를 사용하여 빌드 타임에 CSS를 생성합니다.' },
  { id: 'b4', type: 'heading', content: '컴포넌트 구조', level: 2 },
]

function NotionBlockEditorRender() {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif', padding: '16px 0' }}>
      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>
        Notion 블록 에디터 패턴 — 블록에 마우스를 올리면 컨트롤이 표시됩니다
      </div>
      {NOTION_BLOCKS.map((block) => (
        <div
          key={block.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 4, padding: '2px 0', position: 'relative' }}
          onMouseEnter={() => setHoveredBlock(block.id)}
          onMouseLeave={() => setHoveredBlock(null)}
          onClick={() => setSelectedBlock(block.id === selectedBlock ? null : block.id)}
        >
          {/* 드래그 핸들 + 추가 버튼 */}
          <div style={{ display: 'flex', gap: 1, flexShrink: 0, opacity: hoveredBlock === block.id ? 1 : 0, transition: 'opacity 0.15s', marginTop: 2 }}>
            <OutlineIconButton color="gray" size="small" aria-label="블록 추가">
              <PlusIcon />
            </OutlineIconButton>
            <OutlineIconButton color="gray" size="small" aria-label="블록 이동">
              <MoreHorizontalIcon />
            </OutlineIconButton>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                background: selectedBlock === block.id ? 'rgba(99,102,241,0.06)' : hoveredBlock === block.id ? '#f8fafc' : 'transparent',
                cursor: 'text',
                fontSize: block.type === 'heading' ? (block.level === 1 ? 20 : 15) : 14,
                fontWeight: block.type === 'heading' ? 700 : 400,
                color: '#1e293b',
                lineHeight: 1.6,
                borderLeft: selectedBlock === block.id ? '2px solid #6366f1' : '2px solid transparent',
                transition: 'all 0.1s',
              }}
            >
              {block.content}
            </div>
          </div>

          {/* 우측 액션 버튼 */}
          {hoveredBlock === block.id && (
            <div style={{ display: 'flex', gap: 1, flexShrink: 0, marginTop: 2 }}>
              <OutlineIconButton color="gray" size="small" aria-label="수정">
                <WriteLineIcon />
              </OutlineIconButton>
              <OutlineIconButton color="gray" size="small" aria-label="더보기">
                <MoreHorizontalIcon />
              </OutlineIconButton>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Notion_블록_편집_컨트롤 = {
  parameters: {
    docs: {
      description: {
        story: 'Notion 블록 에디터 패턴. 각 블록에 hover 시 드래그 핸들, 블록 추가, 수정 버튼이 표시됩니다. 클릭 시 선택 상태가 표시됩니다.',
      },
    },
  },
  render: () => <NotionBlockEditorRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 사이클 내비게이션
   Linear Sprint/Cycle 네비게이션 패턴 — 이전/다음 기간 이동, 현재 상태 표시
-------------------------------------------------------------------------- */
const CYCLES = [
  { id: 1, name: 'Cycle 42', start: '3월 24일', end: '4월 6일', status: 'completed', issues: 18, done: 18 },
  { id: 2, name: 'Cycle 43', start: '4월 7일', end: '4월 20일', status: 'active', issues: 24, done: 11 },
  { id: 3, name: 'Cycle 44', start: '4월 21일', end: '5월 4일', status: 'upcoming', issues: 0, done: 0 },
]

function CycleNavigationRender() {
  const [currentIdx, setCurrentIdx] = useState(1)
  const cycle = CYCLES[currentIdx]
  const progressPct = cycle.issues > 0 ? Math.round((cycle.done / cycle.issues) * 100) : 0

  const statusConfig: Record<string, { color: string; label: string; bg: string }> = {
    completed: { color: '#10b981', label: '완료', bg: '#f0fdf4' },
    active: { color: '#6366f1', label: '진행 중', bg: '#eef2ff' },
    upcoming: { color: '#94a3b8', label: '예정', bg: '#f8fafc' },
  }

  const sc = statusConfig[cycle.status]

  return (
    <div style={{ maxWidth: 440, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', gap: 8 }}>
          <OutlineIconButton
            color="black"
            size="small"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            aria-label="이전 사이클"
          >
            <ChevronLeftLineIcon />
          </OutlineIconButton>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{cycle.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{cycle.start} → {cycle.end}</div>
          </div>

          <OutlineIconButton
            color="black"
            size="small"
            disabled={currentIdx === CYCLES.length - 1}
            onClick={() => setCurrentIdx((i) => Math.min(CYCLES.length - 1, i + 1))}
            aria-label="다음 사이클"
          >
            <ChevronRightLineIcon />
          </OutlineIconButton>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.color, fontWeight: 700 }}>
              {sc.label}
            </span>
            <span style={{ fontSize: 12, color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>
              {cycle.done} / {cycle.issues || '미정'} 완료
            </span>
          </div>

          <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: sc.color, borderRadius: 3, transition: 'width 0.3s' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
            <span>{progressPct}% 달성</span>
            <span>{currentIdx + 1} / {CYCLES.length}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Linear Cycle 네비게이션 패턴 — 이전/다음 버튼으로 스프린트 기간 탐색
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Linear_사이클_내비게이션 = {
  parameters: {
    docs: {
      description: {
        story: 'Linear Sprint/Cycle 네비게이션 패턴. 이전/다음 OutlineIconButton으로 사이클 기간을 이동하며 진행률과 상태를 확인합니다.',
      },
    },
  },
  render: () => <CycleNavigationRender />,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const 비활성화_상태_비교 = {
  parameters: {
    docs: {
      description: {
        story:
          '활성(enabled)과 비활성(disabled) 상태를 나란히 배치하여 차이를 명확히 합니다. disabled 시 opacity가 감소하고 cursor가 not-allowed로 변경됩니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>활성 상태</div>
        <Flex columnGap="8px" alignItems="center">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <OutlineIconButton key={size} color="black" size={size} aria-label={`${size} 버튼`}>
              <PlusIcon />
            </OutlineIconButton>
          ))}
        </Flex>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>비활성 상태 (disabled)</div>
        <Flex columnGap="8px" alignItems="center">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <OutlineIconButton key={size} color="black" size={size} disabled aria-label={`${size} 비활성 버튼`}>
              <PlusIcon />
            </OutlineIconButton>
          ))}
        </Flex>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>gray color</div>
        <Flex columnGap="8px" alignItems="center">
          <OutlineIconButton color="gray" size="medium" aria-label="gray 활성">
            <SettingLineIcon />
          </OutlineIconButton>
          <OutlineIconButton color="gray" size="medium" disabled aria-label="gray 비활성">
            <SettingLineIcon />
          </OutlineIconButton>
        </Flex>
      </div>
    </div>
  ),
}
