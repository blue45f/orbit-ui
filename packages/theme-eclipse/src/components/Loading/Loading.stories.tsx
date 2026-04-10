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
