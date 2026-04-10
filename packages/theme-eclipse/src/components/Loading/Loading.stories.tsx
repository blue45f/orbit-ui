import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Loading } from './Loading'
import { Skeleton } from '../Skeleton'

const meta = {
  title: 'eclipse/Feedback/Loading',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => <Loading>데이터를 불러오는 중입니다...</Loading>,
}

export const 크기별: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loading size="small" />
      <Loading size="medium" />
      <Loading size="large" />
    </div>
  ),
}

export const 전체화면: Story = {
  render: function Render() {
    const [isLoading, setIsLoading] = React.useState(false)

    return (
      <div>
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-white dark:bg-slate-50 dark:text-slate-900"
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 3000)
          }}
        >
          전체화면 로딩 시작 (3초)
        </button>
        {isLoading && <Loading fullScreen>시스템 초기화 중...</Loading>}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 스타일: 이슈 목록 스켈레톤 패턴
   Linear의 이슈 목록 로딩 시 보여주는 컴팩트 스켈레톤 패턴
-------------------------------------------------------------------------- */
const LinearIssueRowSkeleton = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 16px',
      borderBottom: '1px solid #f1f5f9',
    }}
  >
    <Skeleton height={8} width={8} style={{ borderRadius: '50%', flexShrink: 0 }} />
    <Skeleton height={20} width={72} style={{ borderRadius: '4px', flexShrink: 0 }} />
    <Skeleton height={14} width="55%" style={{ borderRadius: '4px' }} />
    <div style={{ marginLeft: 'auto' }}>
      <Skeleton height={12} width={52} style={{ borderRadius: '4px' }} />
    </div>
  </div>
)

export const Linear_이슈목록_스켈레톤: Story = {
  render: () => (
    <div style={{ maxWidth: '560px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div
        style={{
          padding: '12px 16px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Skeleton height={14} width={80} style={{ borderRadius: '4px' }} />
        <div style={{ marginLeft: 'auto' }}>
          <Skeleton height={14} width={40} style={{ borderRadius: '4px' }} />
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <LinearIssueRowSkeleton key={i} />
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 스타일: 데이터 로딩 트랜지션
   로딩 -> 데이터 전환 애니메이션 패턴
-------------------------------------------------------------------------- */
const IssueItem = ({ title, id, color }: { title: string; id: string; color: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 16px',
      borderBottom: '1px solid #f1f5f9',
    }}
  >
    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
    <div
      style={{
        padding: '2px 8px',
        borderRadius: '4px',
        background: '#f1f5f9',
        fontSize: '11px',
        fontWeight: 600,
        color: '#64748b',
        flexShrink: 0,
      }}
    >
      In Progress
    </div>
    <span style={{ fontSize: '13px', color: '#1e293b', flex: 1 }}>{title}</span>
    <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{id}</span>
  </div>
)

const LoadingTransitionDemo = () => {
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLoad = () => {
    setLoaded(false)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLoaded(true)
    }, 2000)
  }

  const issues = [
    { title: '다크 모드 토글 구현', id: 'ORB-142', color: '#f59e0b' },
    { title: '접근성 WCAG AA 검토', id: 'ORB-139', color: '#6366f1' },
    { title: '컴포넌트 토큰 고도화', id: 'ORB-135', color: '#10b981' },
    { title: 'Storybook 테마 커스터마이징', id: 'ORB-133', color: '#94a3b8' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '560px' }}>
      <button
        onClick={handleLoad}
        disabled={loading}
        style={{
          padding: '8px 20px',
          borderRadius: '8px',
          border: 'none',
          background: loading ? '#e2e8f0' : '#6366f1',
          color: loading ? '#94a3b8' : '#fff',
          fontWeight: 600,
          fontSize: '13px',
          cursor: loading ? 'not-allowed' : 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        {loading ? '불러오는 중...' : '데이터 다시 불러오기'}
      </button>

      <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div
          style={{
            padding: '12px 16px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            fontSize: '12px',
            fontWeight: 700,
            color: '#64748b',
          }}
        >
          {loading ? '로딩 중...' : loaded ? `이슈 ${issues.length}개` : '이슈 목록'}
        </div>

        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <LinearIssueRowSkeleton key={i} />)
        ) : loaded ? (
          issues.map((issue) => <IssueItem key={issue.id} {...issue} />)
        ) : (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '13px',
            }}
          >
            버튼을 클릭하면 로딩 → 데이터 전환을 확인할 수 있습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export const 로딩_데이터_전환: Story = {
  render: () => <LoadingTransitionDemo />,
}

/* --------------------------------------------------------------------------
   Linear 스타일: 인라인 로딩 상태
   버튼, 입력창 등 인라인 요소에서의 컴팩트 로딩 패턴
-------------------------------------------------------------------------- */
const InlineLoadingDemo = () => {
  const [savingId, setSavingId] = useState<string | null>(null)

  const handleSave = (id: string) => {
    setSavingId(id)
    setTimeout(() => setSavingId(null), 1500)
  }

  const items = [
    { id: 'title', label: '프로젝트 이름', value: 'Orbit UI Design System' },
    { id: 'desc', label: '설명', value: '컴포넌트 라이브러리 및 디자인 토큰 시스템' },
    { id: 'url', label: '문서 URL', value: 'https://orbit-ui.vercel.app' },
  ]

  return (
    <div
      style={{
        maxWidth: '480px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #f1f5f9',
          background: '#f8fafc',
          fontSize: '14px',
          fontWeight: 700,
          color: '#1e293b',
        }}
      >
        프로젝트 설정
      </div>
      {items.map(({ id, label, value }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid #f8fafc',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b', marginBottom: '2px' }}>{label}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{value}</div>
          </div>
          <button
            onClick={() => handleSave(id)}
            disabled={savingId === id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: savingId === id ? '#94a3b8' : '#64748b',
              fontSize: '12px',
              fontWeight: 600,
              cursor: savingId === id ? 'not-allowed' : 'pointer',
              minWidth: '72px',
              justifyContent: 'center',
            }}
          >
            {savingId === id ? (
              <>
                <Loading size="small" />
                <span>저장 중</span>
              </>
            ) : (
              '편집'
            )}
          </button>
        </div>
      ))}
    </div>
  )
}

export const 인라인_로딩_상태: Story = {
  render: () => <InlineLoadingDemo />,
}

/* --------------------------------------------------------------------------
   Notion 스타일: 페이지 블록 스켈레톤
   Notion 페이지 로딩 시 보여주는 블록 단위 스켈레톤 패턴
-------------------------------------------------------------------------- */
const NotionPageSkeleton = () => (
  <div style={{ maxWidth: '680px', padding: '48px 96px' }}>
    <Skeleton height={44} width="65%" style={{ borderRadius: '6px', marginBottom: '24px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
      <Skeleton height={16} width="92%" style={{ borderRadius: '4px' }} />
      <Skeleton height={16} width="85%" style={{ borderRadius: '4px' }} />
      <Skeleton height={16} width="78%" style={{ borderRadius: '4px' }} />
    </div>
    <Skeleton height={180} width="100%" style={{ borderRadius: '8px', marginBottom: '24px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
      <Skeleton height={16} width="88%" style={{ borderRadius: '4px' }} />
      <Skeleton height={16} width="74%" style={{ borderRadius: '4px' }} />
    </div>
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        background: '#f8fafc',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '24px',
      }}
    >
      {[80, 70, 90, 60].map((w, i) => (
        <Skeleton key={i} height={14} width={`${w}%`} style={{ borderRadius: '4px' }} />
      ))}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Skeleton height={16} width="96%" style={{ borderRadius: '4px' }} />
      <Skeleton height={16} width="82%" style={{ borderRadius: '4px' }} />
      <Skeleton height={16} width="70%" style={{ borderRadius: '4px' }} />
    </div>
  </div>
)

export const Notion_페이지_스켈레톤: Story = {
  render: () => (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', maxWidth: '680px' }}>
      <div
        style={{
          padding: '8px 16px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fafafa',
        }}
      >
        <Skeleton height={12} width={48} style={{ borderRadius: '4px' }} />
        <Skeleton height={12} width={8} style={{ borderRadius: '2px' }} />
        <Skeleton height={12} width={64} style={{ borderRadius: '4px' }} />
        <Skeleton height={12} width={8} style={{ borderRadius: '2px' }} />
        <Skeleton height={12} width={96} style={{ borderRadius: '4px' }} />
      </div>
      <NotionPageSkeleton />
    </div>
  ),
}

/* --------------------------------------------------------------------------
   로딩 상태 비교 QA 패널
-------------------------------------------------------------------------- */
export const 디자인_QA: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Spinner Sizes
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Loading size="small" />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Loading size="medium" />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Loading size="large" />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>large</span>
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
          With Message
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Loading size="small">처리 중...</Loading>
          <Loading size="medium">불러오는 중...</Loading>
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 데이터 테이블 로딩 오버레이
   Tailwind UI의 Table with Loading Overlay 패턴
-------------------------------------------------------------------------- */
const TABLE_HEADERS = ['이름', '상태', '역할', '가입일']
const TABLE_ROWS = [
  ['김희준', '활성', '관리자', '2024-01-15'],
  ['이서연', '활성', '멤버', '2024-03-08'],
  ['박지호', '비활성', '멤버', '2024-05-22'],
]

function TailwindTableLoadingRender() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(TABLE_ROWS)

  const refresh = () => {
    setLoading(true)
    setData([])
    setTimeout(() => {
      setLoading(false)
      setData(TABLE_ROWS)
    }, 1800)
  }

  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>팀 멤버</span>
        <button
          onClick={refresh}
          disabled={loading}
          style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600, color: loading ? '#94a3b8' : '#334155', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? '새로고침 중...' : '새로고침'}
        </button>
      </div>
      <div style={{ position: 'relative', borderRadius: 10, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <Loading size="medium" />
              <span style={{ fontSize: 12, color: '#64748b' }}>데이터 불러오는 중...</span>
            </div>
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {TABLE_HEADERS.map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#475569', borderBottom: '1.5px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                  {loading ? '' : '데이터 없음'}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '10px 14px', color: j === 1 ? (cell === '활성' ? '#10b981' : '#ef4444') : '#334155', fontWeight: j === 1 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const Tailwind_테이블_로딩_오버레이: Story = {
  name: 'Tailwind UI - 데이터 테이블 로딩 오버레이 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Table with Loading Overlay 패턴. 반투명 오버레이 + Loading 스피너로 ' +
          '기존 레이아웃을 유지하면서 로딩 상태를 표시합니다. 새로고침 버튼으로 상태 전환을 시뮬레이션합니다.',
      },
    },
  },
  render: () => <TailwindTableLoadingRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 진행률 기반 단계별 로딩
   Arco의 Steps + Spin 패턴 — 멀티스텝 처리 중 각 단계를 명시적으로 표시
-------------------------------------------------------------------------- */
type StepStatus = 'waiting' | 'loading' | 'done' | 'error'
type ProcessStep = { id: string; label: string; desc: string }

const PROCESS_STEPS: ProcessStep[] = [
  { id: 'validate', label: '유효성 검사', desc: '입력값과 권한을 확인합니다' },
  { id: 'upload', label: '파일 업로드', desc: '서버에 파일을 전송합니다' },
  { id: 'process', label: '서버 처리', desc: '데이터를 분석하고 변환합니다' },
  { id: 'notify', label: '완료 알림', desc: '팀 멤버에게 결과를 전송합니다' },
]

function ArcoMultistepLoadingRender() {
  const [stepIdx, setStepIdx] = useState<number | null>(null)
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({})

  const run = () => {
    if (stepIdx !== null) {
      setStepIdx(null)
      setStatuses({})
      return
    }
    setStatuses({})
    let idx = 0

    const next = () => {
      if (idx >= PROCESS_STEPS.length) {
        setStepIdx(PROCESS_STEPS.length)
        return
      }
      const step = PROCESS_STEPS[idx]
      setStepIdx(idx)
      setStatuses((prev) => ({ ...prev, [step.id]: 'loading' }))
      const delay = 700 + Math.random() * 600
      setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [step.id]: 'done' }))
        idx++
        setTimeout(next, 200)
      }, delay)
    }
    next()
  }

  const statusColor: Record<StepStatus, string> = {
    waiting: '#94a3b8',
    loading: '#6366f1',
    done: '#10b981',
    error: '#ef4444',
  }

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>배포 파이프라인</span>
        <button
          onClick={run}
          style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: stepIdx === null ? '#6366f1' : '#f1f5f9', color: stepIdx === null ? '#fff' : '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
        >
          {stepIdx === null ? '실행' : stepIdx < PROCESS_STEPS.length ? '진행 중...' : '초기화'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PROCESS_STEPS.map((step, i) => {
          const status: StepStatus = statuses[step.id] ?? 'waiting'
          const isActive = stepIdx === i
          return (
            <div key={step.id} style={{ display: 'flex', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: `2px solid ${statusColor[status]}`,
                  background: status === 'done' ? statusColor[status] : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  {isActive && status === 'loading' ? (
                    <Loading size="small" />
                  ) : status === 'done' ? (
                    <span style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>✓</span>
                  ) : (
                    <span style={{ fontSize: 12, fontWeight: 700, color: statusColor[status] }}>{i + 1}</span>
                  )}
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 24, background: status === 'done' ? '#10b981' : '#e2e8f0', margin: '4px 0', transition: 'background 0.3s' }} />
                )}
              </div>
              <div style={{ paddingBottom: i < PROCESS_STEPS.length - 1 ? 16 : 0, paddingTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#6366f1' : status === 'done' ? '#10b981' : '#94a3b8', transition: 'color 0.2s' }}>{step.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{step.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
      {stepIdx !== null && stepIdx >= PROCESS_STEPS.length && (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: '#dcfce7', border: '1.5px solid #bbf7d0', fontSize: 13, fontWeight: 700, color: '#16a34a', textAlign: 'center' }}>
          모든 단계 완료!
        </div>
      )}
    </div>
  )
}

export const Arco_다단계_로딩_파이프라인: Story = {
  name: 'Arco Design - 다단계 처리 파이프라인 로딩 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Steps + Spin 패턴. 각 처리 단계를 명시적으로 표시하고 ' +
          '현재 진행 중인 단계에 Loading 스피너를 삽입합니다. 실행 버튼으로 시뮬레이션합니다.',
      },
    },
  },
  render: () => <ArcoMultistepLoadingRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 낙관적 업데이트 로딩 피드백
   Arco의 Spin + Message 패턴 — 즉각 UI 반영 후 서버 동기화 표시
-------------------------------------------------------------------------- */
type TaskItem = { id: number; label: string; done: boolean; saving: boolean }

function ArcoOptimisticUpdateRender() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, label: '디자인 토큰 정의', done: true, saving: false },
    { id: 2, label: '컴포넌트 스토리 작성', done: false, saving: false },
    { id: 3, label: '접근성 감사 실행', done: false, saving: false },
    { id: 4, label: '문서 배포', done: false, saving: false },
  ])

  const toggle = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done, saving: true } : t)),
    )
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, saving: false } : t)),
      )
    }, 1000)
  }

  const doneCount = tasks.filter((t) => t.done).length

  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>작업 목록</span>
        <span style={{ fontSize: 12, color: '#64748b' }}>{doneCount}/{tasks.length} 완료</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(doneCount / tasks.length) * 100}%`, background: '#6366f1', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #f1f5f9',
              background: task.done ? '#f0fdf4' : '#fff',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
            onClick={() => !task.saving && toggle(task.id)}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              border: `2px solid ${task.done ? '#10b981' : '#d1d5db'}`,
              background: task.done ? '#10b981' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s',
            }}>
              {task.done && <span style={{ fontSize: 11, color: '#fff', fontWeight: 900 }}>✓</span>}
            </div>
            <span style={{ flex: 1, fontSize: 13, color: task.done ? '#94a3b8' : '#1e293b', textDecoration: task.done ? 'line-through' : 'none', transition: 'all 0.2s' }}>
              {task.label}
            </span>
            {task.saving && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Loading size="small" />
                <span style={{ fontSize: 11, color: '#94a3b8' }}>저장 중</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        항목을 클릭해 즉각 반영 후 서버 동기화 로딩을 확인하세요
      </div>
    </div>
  )
}

export const Arco_낙관적_업데이트_로딩: Story = {
  name: 'Arco Design - 낙관적 업데이트 인라인 로딩 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Spin + Message 패턴. 체크박스 클릭 시 즉각 UI를 반영(낙관적 업데이트)하고 ' +
          '서버 동기화 중 인라인 Loading 스피너를 표시합니다. 1초 후 저장 완료 상태로 전환됩니다.',
      },
    },
  },
  render: () => <ArcoOptimisticUpdateRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 카드 스켈레톤 그리드
   shadcn/ui Skeleton 컴포넌트 데모 — 3열 카드 레이아웃 스켈레톤 패턴
-------------------------------------------------------------------------- */
const ShadcnCardSkeletonItem = () => (
  <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' }}>
    <Skeleton height={140} width="100%" style={{ borderRadius: 0, display: 'block' }} />
    <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
        <Skeleton height={32} width={32} style={{ borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Skeleton height={12} width="60%" style={{ borderRadius: 4 }} />
          <Skeleton height={10} width="40%" style={{ borderRadius: 4 }} />
        </div>
      </div>
      <Skeleton height={14} width="85%" style={{ borderRadius: 4 }} />
      <Skeleton height={14} width="70%" style={{ borderRadius: 4 }} />
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <Skeleton height={22} width={52} style={{ borderRadius: 20 }} />
        <Skeleton height={22} width={44} style={{ borderRadius: 20 }} />
        <Skeleton height={22} width={60} style={{ borderRadius: 20 }} />
      </div>
    </div>
  </div>
)

function ShadcnCardSkeletonGridRender() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ width: 540, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>최신 게시물</span>
        <button
          onClick={() => setLoaded((p) => !p)}
          style={{ padding: '5px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600, color: '#334155', cursor: 'pointer' }}
        >
          {loaded ? '스켈레톤 보기' : '콘텐츠 로드'}
        </button>
      </div>
      {loaded ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {['디자인 토큰 가이드', '컴포넌트 설계 원칙', 'Storybook 고도화'].map((title, i) => (
            <div key={i} style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' }}>
              <div style={{ height: 140, background: ['#eef2ff', '#f0fdf4', '#fff7ed'][i], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 32 }}>{'📐📦📖'[i]}</span>
              </div>
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: ['#6366f1', '#10b981', '#f59e0b'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {['HJ', 'SY', 'JH'][i]}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{['김희준', '이서연', '박지호'][i]}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>2일 전</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8, lineHeight: 1.5 }}>컴포넌트 설계의 핵심 원칙과 실무 활용 패턴을 소개합니다.</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[['Design', '#eef2ff', '#6366f1'], ['Token', '#f0fdf4', '#10b981'], ['React', '#fff7ed', '#f59e0b']][i].map((c, j) => (
                    j === 0 ? (
                      <span key={j} style={{ padding: '2px 8px', borderRadius: 20, background: ['#eef2ff', '#f0fdf4', '#fff7ed'][i], color: ['#6366f1', '#10b981', '#f59e0b'][i], fontSize: 11, fontWeight: 600 }}>{c}</span>
                    ) : null
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <ShadcnCardSkeletonItem />
          <ShadcnCardSkeletonItem />
          <ShadcnCardSkeletonItem />
        </div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        shadcn/ui Skeleton 패턴 — 버튼 클릭으로 스켈레톤 ↔ 콘텐츠 전환
      </div>
    </div>
  )
}

export const Shadcn_카드_스켈레톤_그리드: Story = {
  name: 'shadcn/ui - 3열 카드 스켈레톤 그리드 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Skeleton 컴포넌트 데모 패턴. Avatar + 텍스트 + 태그 영역으로 구성된 카드 스켈레톤을 ' +
          '3열 그리드로 배치합니다. 버튼 클릭으로 스켈레톤과 실제 콘텐츠 사이를 전환합니다.',
      },
    },
  },
  render: () => <ShadcnCardSkeletonGridRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 프로필 카드 스켈레톤
   shadcn/ui의 대표 Skeleton 데모 — Avatar + 텍스트 라인 패턴
-------------------------------------------------------------------------- */
const ShadcnProfileSkeleton = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', maxWidth: 360 }}>
    <Skeleton height={56} width={56} style={{ borderRadius: '50%', flexShrink: 0 }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton height={16} width="55%" style={{ borderRadius: 4 }} />
      <Skeleton height={12} width="80%" style={{ borderRadius: 4 }} />
      <Skeleton height={12} width="65%" style={{ borderRadius: 4 }} />
    </div>
  </div>
)

function ShadcnProfileSkeletonRender() {
  const [showReal, setShowReal] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadProfile = () => {
    setLoading(true)
    setShowReal(false)
    setTimeout(() => {
      setLoading(false)
      setShowReal(true)
    }, 1800)
  }

  const profiles = [
    { name: '김희준', role: 'Design Engineer @ Orbit UI', email: 'hjunkim@orbit.dev', color: '#6366f1' },
    { name: '이서연', role: 'Frontend Developer', email: 'sylee@orbit.dev', color: '#10b981' },
    { name: '박지호', role: 'Product Designer', email: 'jhpark@orbit.dev', color: '#f59e0b' },
  ]

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>팀 프로필</span>
        <button
          onClick={loadProfile}
          disabled={loading}
          style={{ padding: '5px 14px', borderRadius: 8, border: 'none', background: loading ? '#e2e8f0' : '#0f172a', color: loading ? '#94a3b8' : '#fff', fontSize: 12, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
        >
          {loading ? '로드 중...' : '프로필 불러오기'}
        </button>
      </div>
      {!showReal || loading ? (
        <>
          <ShadcnProfileSkeleton />
          <ShadcnProfileSkeleton />
          <ShadcnProfileSkeleton />
        </>
      ) : (
        profiles.map((p) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: p.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>
              {p.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>{p.role}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.email}</div>
            </div>
          </div>
        ))
      )}
      {!loading && !showReal && (
        <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
          버튼을 클릭해 shadcn/ui 프로필 스켈레톤 → 실제 데이터 전환을 확인하세요
        </div>
      )}
    </div>
  )
}

export const Shadcn_프로필_스켈레톤: Story = {
  name: 'shadcn/ui - Avatar + 텍스트 라인 프로필 스켈레톤 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui의 대표 Skeleton 데모 패턴. 원형 Avatar 스켈레톤 + 3줄 텍스트 라인 스켈레톤으로 ' +
          '프로필 카드 로딩 상태를 표현합니다. 1.8초 후 실제 프로필 데이터로 전환됩니다.',
      },
    },
  },
  render: () => <ShadcnProfileSkeletonRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 무한 스크롤 로딩 트리거
   shadcn/ui의 Table + Pagination 패턴 — 리스트 하단 점진적 로딩 시뮬레이션
-------------------------------------------------------------------------- */
type FeedItem = { id: number; title: string; author: string; date: string; tag: string; tagColor: string }

const INITIAL_FEED: FeedItem[] = [
  { id: 1, title: '디자인 토큰 3단계 계층 구조 이해하기', author: '김희준', date: '2025-04-01', tag: 'Design', tagColor: '#eef2ff' },
  { id: 2, title: 'Storybook 8.x 마이그레이션 완전 가이드', author: '이서연', date: '2025-04-02', tag: 'Storybook', tagColor: '#f0fdf4' },
  { id: 3, title: 'vanilla-extract로 타입 안전 CSS 작성', author: '박지호', date: '2025-04-03', tag: 'CSS', tagColor: '#fff7ed' },
  { id: 4, title: 'React 19 Actions 패턴 실전 활용', author: '최은아', date: '2025-04-04', tag: 'React', tagColor: '#fef3c7' },
]

const MORE_FEED: FeedItem[] = [
  { id: 5, title: 'WAI-ARIA 접근성 컴포넌트 설계 원칙', author: '김희준', date: '2025-04-05', tag: 'A11y', tagColor: '#fce7f3' },
  { id: 6, title: 'pnpm 모노레포 워크스페이스 최적화', author: '이서연', date: '2025-04-06', tag: 'DevOps', tagColor: '#ede9fe' },
  { id: 7, title: 'TypeScript 5.7 satisfies 연산자 활용', author: '박지호', date: '2025-04-07', tag: 'TypeScript', tagColor: '#dbeafe' },
]

function ShadcnInfiniteScrollRender() {
  const [items, setItems] = useState<FeedItem[]>(INITIAL_FEED)
  const [loadingMore, setLoadingMore] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  const loadMore = () => {
    if (loadingMore || allLoaded) return
    setLoadingMore(true)
    setTimeout(() => {
      setItems((prev) => [...prev, ...MORE_FEED])
      setLoadingMore(false)
      setAllLoaded(true)
    }, 1600)
  }

  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
        아티클 피드 <span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8' }}>({items.length}개)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: item.tagColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#334155', flexShrink: 0 }}>
              {item.id}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 4, lineHeight: 1.4 }}>{item.title}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>{item.author}</span>
                <span style={{ fontSize: 11, color: '#d1d5db' }}>·</span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.date}</span>
                <span style={{ padding: '1px 8px', borderRadius: 20, background: item.tagColor, fontSize: 10, fontWeight: 700, color: '#334155', marginLeft: 'auto' }}>{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!allLoaded ? (
        <button
          onClick={loadMore}
          disabled={loadingMore}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', borderRadius: 10, border: '1.5px dashed #e2e8f0', background: '#fafafa', cursor: loadingMore ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600, color: loadingMore ? '#94a3b8' : '#334155' }}
        >
          {loadingMore ? (
            <>
              <Loading size="small" />
              <span>불러오는 중...</span>
            </>
          ) : '더 보기'}
        </button>
      ) : (
        <div style={{ padding: '10px', textAlign: 'center', fontSize: 12, color: '#94a3b8', border: '1px solid #f1f5f9', borderRadius: 10, background: '#fafafa' }}>
          모든 아티클을 불러왔습니다.
        </div>
      )}
    </div>
  )
}

export const Shadcn_무한_스크롤_로딩: Story = {
  name: 'shadcn/ui - 피드 더 보기 인라인 로딩 트리거 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Table + Pagination 패턴을 피드 더 보기에 응용. ' +
          '하단 버튼 클릭 시 Loading 스피너와 함께 1.6초 후 추가 항목을 로드합니다. ' +
          '모든 항목 로드 후 완료 메시지로 전환됩니다.',
      },
    },
  },
  render: () => <ShadcnInfiniteScrollRender />,
}
