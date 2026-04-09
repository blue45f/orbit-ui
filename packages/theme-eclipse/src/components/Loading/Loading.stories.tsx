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
