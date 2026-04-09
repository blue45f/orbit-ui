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
