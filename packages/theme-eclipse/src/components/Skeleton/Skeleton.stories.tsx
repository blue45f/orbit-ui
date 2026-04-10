import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@heejun-com/core'

import { Skeleton } from './Skeleton'

const meta = {
  title: 'eclipse/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton은 콘텐츠 로딩 중 자리를 차지하는 플레이스홀더 컴포넌트입니다. ' +
          'shadcn/ui 패턴을 참고해 카드, 리스트, 테이블 등 다양한 레이아웃에 조합 사용합니다.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/* --------------------------------------------------------------------------
   기본 도형 + 카드 조합
-------------------------------------------------------------------------- */
const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '300px',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid var(--sem-eclipse-color-borderSecondary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    {children}
  </div>
)

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ marginBottom: '1.5rem', fontSize: '14px', opacity: 0.6, fontWeight: 600 }}>
          Simple Shapes
        </h4>
        <Flex flexDirection="column" gap="12px">
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="40%" />
          <Skeleton height={100} width="100%" />
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: '1.5rem', fontSize: '14px', opacity: 0.6, fontWeight: 600 }}>
          Example Composition (Card)
        </h4>
        <Card>
          <Skeleton height={150} width="100%" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Skeleton height={40} width={40} style={{ borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton height={12} width="70%" />
              <Skeleton height={10} width="40%" />
            </div>
          </div>
          <Skeleton height={40} width="100%" style={{ marginTop: '0.5rem' }} />
        </Card>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   shadcn/ui 카드 그리드 스켈레톤 패턴
   콘텐츠가 로드되기 전 그리드 레이아웃을 예약하는 패턴
-------------------------------------------------------------------------- */
export const 카드_그리드: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 공식 Skeleton 패턴. 3열 카드 그리드를 스켈레톤으로 표현합니다. ' +
          '이미지 영역 + 아바타 + 텍스트 라인의 조합으로 실제 카드 레이아웃을 미리 잡아줍니다.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        width: '720px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            borderRadius: '14px',
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
          }}
        >
          {/* 썸네일 */}
          <Skeleton height={140} width="100%" style={{ borderRadius: 0 }} />
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* 제목 */}
            <Skeleton height={14} width="75%" />
            {/* 부제목 */}
            <Skeleton height={12} width="55%" />
            {/* 하단 메타 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <Skeleton height={28} width={28} style={{ borderRadius: '50%' }} />
              <Skeleton height={10} width="50%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   리스트 스켈레톤 패턴
   메시지/알림 리스트 등에서 자주 사용되는 형태
-------------------------------------------------------------------------- */
export const 리스트_스켈레톤: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix/shadcn/ui ListItem 로딩 패턴. 아바타 + 텍스트 2줄 구조가 반복됩니다. ' +
          '실무에서는 5~8개 행을 반복해 사용합니다.',
      },
    },
  },
  render: () => (
    <div
      style={{
        width: '420px',
        border: '1px solid #f1f5f9',
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton height={14} width={80} />
        <Skeleton height={24} width={60} style={{ borderRadius: 20 }} />
      </div>
      {/* 리스트 행 */}
      {[80, 65, 90, 72, 55].map((w, i) => (
        <div
          key={i}
          style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: i < 4 ? '1px solid #f8fafc' : 'none',
          }}
        >
          <Skeleton height={40} width={40} style={{ borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton height={12} width={`${w}%`} />
            <Skeleton height={10} width={`${Math.max(w - 20, 30)}%`} />
          </div>
          <Skeleton height={20} width={50} style={{ borderRadius: 10 }} />
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   테이블 스켈레톤 패턴
   DataTable 로딩 상태 대응 패턴 (shadcn/ui DataTable 가이드라인)
-------------------------------------------------------------------------- */
export const 테이블_스켈레톤: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui DataTable 로딩 상태 패턴. 헤더 행은 실선으로 구분하고 ' +
          '각 셀을 다른 너비의 Skeleton으로 채워 실제 데이터 레이아웃을 예약합니다.',
      },
    },
  },
  render: () => {
    const colWidths = ['40px', '15%', '25%', '20%', '15%', '80px']
    return (
      <div
        style={{
          width: '640px',
          border: '1px solid #f1f5f9',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: colWidths.join(' '),
            gap: '0',
            padding: '10px 16px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          {colWidths.map((_, i) => (
            <Skeleton key={i} height={10} width="60%" />
          ))}
        </div>
        {/* 데이터 행 */}
        {[1, 2, 3, 4, 5, 6].map((row) => (
          <div
            key={row}
            style={{
              display: 'grid',
              gridTemplateColumns: colWidths.join(' '),
              gap: '0',
              padding: '12px 16px',
              borderBottom: row < 6 ? '1px solid #f8fafc' : 'none',
              alignItems: 'center',
            }}
          >
            <Skeleton height={14} width={14} style={{ borderRadius: 3 }} />
            <Skeleton height={22} width="70%" style={{ borderRadius: 20 }} />
            <Skeleton height={10} width="80%" />
            <Skeleton height={10} width="60%" />
            <Skeleton height={10} width="55%" />
            <Skeleton height={24} width="100%" style={{ borderRadius: 6 }} />
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   로딩 -> 콘텐츠 전환 인터랙티브 데모
   실무 패턴: isLoading 상태에 따라 Skeleton <-> 실제 컨텐츠 전환
-------------------------------------------------------------------------- */

type Article = {
  title: string
  author: string
  date: string
  tag: string
  tagColor: string
}

const articles: Article[] = [
  { title: 'Design Token 계층 구조 완전 정복', author: 'Heejun Kim', date: '2026-04-08', tag: 'Design', tagColor: '#6366f1' },
  { title: 'Radix UI vs shadcn/ui 비교 분석', author: 'Park Minhye', date: '2026-04-07', tag: 'Dev', tagColor: '#10b981' },
  { title: 'Storybook 8 마이그레이션 가이드', author: 'Lee Sujin', date: '2026-04-06', tag: 'Tool', tagColor: '#f59e0b' },
]

const LoadingTransitionDemo = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const reload = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
            최신 아티클
          </p>
          <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
            {isLoading ? '로딩 중...' : `${articles.length}개 로드됨`}
          </p>
        </div>
        <button
          onClick={reload}
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: 12,
            fontWeight: 600,
            color: '#64748b',
            cursor: 'pointer',
          }}
        >
          다시 로드
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 480 }}>
        {isLoading
          ? [0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Skeleton height={12} width="60%" />
                  <Skeleton height={22} width={52} style={{ borderRadius: 20 }} />
                </div>
                <Skeleton height={10} width="40%" />
              </div>
            ))
          : articles.map((article) => (
              <div
                key={article.title}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
                    {article.title}
                  </p>
                  <span
                    style={{
                      flexShrink: 0,
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      color: article.tagColor,
                      background: `${article.tagColor}1a`,
                    }}
                  >
                    {article.tag}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
                  {article.author} · {article.date}
                </p>
              </div>
            ))}
      </div>
    </div>
  )
}

export const 로딩_전환_인터랙티브: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '실무 패턴: isLoading 상태에 따라 Skeleton과 실제 콘텐츠를 전환합니다. ' +
          '2초 후 자동으로 콘텐츠가 나타납니다. "다시 로드" 버튼으로 반복 시연할 수 있습니다.',
      },
    },
  },
  render: () => <LoadingTransitionDemo />,
}

/* --------------------------------------------------------------------------
   프로필 페이지 스켈레톤
   shadcn/ui Profile page skeleton 패턴
-------------------------------------------------------------------------- */
export const 프로필_페이지: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 프로필 페이지 스켈레톤. 커버 이미지 + 아바타 + 이름/소개 + 스탯 + 버튼 행을 ' +
          'Skeleton으로 재현합니다. 실제 프로필 카드 로딩 UX와 동일한 레이아웃을 예약합니다.',
      },
    },
  },
  render: () => (
    <div
      style={{
        width: '320px',
        borderRadius: '18px',
        border: '1px solid #f1f5f9',
        overflow: 'hidden',
      }}
    >
      {/* 커버 이미지 */}
      <Skeleton height={100} width="100%" style={{ borderRadius: 0 }} />
      <div style={{ padding: '0 20px 20px' }}>
        {/* 아바타 */}
        <div style={{ marginTop: '-24px', marginBottom: '12px' }}>
          <Skeleton
            height={48}
            width={48}
            style={{
              borderRadius: '50%',
              border: '3px solid #fff',
            }}
          />
        </div>
        {/* 이름 + 역할 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
          <Skeleton height={16} width="55%" />
          <Skeleton height={12} width="38%" />
          <Skeleton height={10} width="80%" />
          <Skeleton height={10} width="65%" />
        </div>
        {/* 스탯 */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            padding: '10px 0',
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '14px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
              <Skeleton height={14} width={24} />
              <Skeleton height={10} width={36} />
            </div>
          ))}
        </div>
        {/* 버튼 행 */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton height={34} width="100%" style={{ borderRadius: 8 }} />
          <Skeleton height={34} width={80} style={{ borderRadius: 8 }} />
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 페이지 리스트 로딩 스켈레톤
   Notion sidebar page list — 계층 들여쓰기 + 아이콘 스켈레톤 패턴
-------------------------------------------------------------------------- */
export const Notion_페이지_리스트_스켈레톤 = {
  name: 'Notion - 페이지 리스트 로딩',
  render: () => (
    <div style={{ width: 240, padding: '8px 0' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 12px',
            paddingLeft: i > 1 ? 28 : 12,
          }}
        >
          <Skeleton height={16} width={16} style={{ borderRadius: 4, flexShrink: 0 }} />
          <Skeleton height={12} width={`${60 + Math.floor(i * 17) % 40}%`} />
        </div>
      ))}
      <div style={{ margin: '8px 12px', height: 1, background: '#f1f5f9' }} />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px' }}
        >
          <Skeleton height={16} width={16} style={{ borderRadius: 4, flexShrink: 0 }} />
          <Skeleton height={12} width={`${50 + i * 12}%`} />
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 리스트 테이블 스켈레톤
   Linear issue list — 상태/우선순위/제목/담당자/날짜 컬럼 스켈레톤
-------------------------------------------------------------------------- */
export const Linear_이슈_리스트_스켈레톤 = {
  name: 'Linear - 이슈 리스트 테이블 로딩',
  render: () => (
    <div style={{ width: '100%', maxWidth: 680 }}>
      {/* 헤더 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24px 24px 1fr 80px 80px',
          gap: 12,
          padding: '8px 12px',
          borderBottom: '2px solid #f1f5f9',
          marginBottom: 4,
        }}
      >
        {['상태', '우선순위', '제목', '담당자', '날짜'].map((col) => (
          <div key={col} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
            {col}
          </div>
        ))}
      </div>
      {/* 행 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '24px 24px 1fr 80px 80px',
            gap: 12,
            padding: '10px 12px',
            borderBottom: '1px solid #f8fafc',
            alignItems: 'center',
          }}
        >
          <Skeleton height={16} width={16} style={{ borderRadius: '50%' }} />
          <Skeleton height={16} width={16} style={{ borderRadius: 4 }} />
          <Skeleton height={12} width={`${50 + (i * 11) % 40}%`} />
          <Skeleton height={20} width={20} style={{ borderRadius: '50%' }} />
          <Skeleton height={12} width={60} />
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 배포 대시보드 스켈레톤
   Vercel deployments page — 프로젝트 카드 그리드 스켈레톤
-------------------------------------------------------------------------- */
export const Vercel_배포_대시보드_스켈레톤 = {
  name: 'Vercel - 배포 대시보드 로딩',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 600 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {/* 프로젝트명 + 상태 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton height={14} width="55%" />
            <Skeleton height={20} width={60} style={{ borderRadius: 20 }} />
          </div>
          {/* 배포 URL */}
          <Skeleton height={10} width="80%" />
          {/* 메타 */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Skeleton height={20} width={20} style={{ borderRadius: '50%' }} />
            <Skeleton height={10} width="50%" />
          </div>
          {/* 하단 구분선 + 액션 */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, display: 'flex', gap: 8 }}>
            <Skeleton height={28} width="50%" style={{ borderRadius: 6 }} />
            <Skeleton height={28} width="50%" style={{ borderRadius: 6 }} />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Cycle 65: Radix UI + Ant Design ───────────────────────────────────────

export const Radix_아바타_그룹_스켈레톤: Story = {
  name: 'Radix UI - 팀 멤버 아바타 그룹 스켈레톤',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI Avatar 스켈레톤 패턴. 원형 Avatar.Fallback 로딩 상태와 텍스트 라인 스켈레톤을 조합합니다. 팀 디렉토리, 협업자 목록 등 사람 정보 로딩에 활용됩니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 340, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>팀 멤버 로딩 중...</div>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
          {/* Avatar circle skeleton */}
          <Skeleton height={40} width={40} style={{ borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton height={13} width="60%" />
            <Skeleton height={10} width="40%" />
          </div>
          <Skeleton height={26} width={60} style={{ borderRadius: 100, flexShrink: 0 }} />
        </div>
      ))}
      {/* Avatar group overflow */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex' }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={32} width={32} style={{ borderRadius: '50%', marginLeft: i > 1 ? -8 : 0, border: '2px solid #fff' }} />
          ))}
        </div>
        <Skeleton height={12} width={80} />
      </div>
    </div>
  ),
}

export const Ant_통계_카드_스켈레톤: Story = {
  name: 'Ant Design - 통계 대시보드 카드 스켈레톤',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Skeleton 패턴. 통계 카드의 숫자/라벨/트렌드 영역을 Skeleton으로 대체해 로딩 상태를 표현합니다. 대시보드, 리포트 페이지 초기 로딩에 활용됩니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>통계 로딩 중...</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff' }}>
            {/* Label */}
            <Skeleton height={10} width="55%" style={{ marginBottom: 12 }} />
            {/* Big number */}
            <Skeleton height={28} width="70%" style={{ marginBottom: 8 }} />
            {/* Trend line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Skeleton height={10} width={16} style={{ borderRadius: '50%' }} />
              <Skeleton height={10} width="40%" />
            </div>
          </div>
        ))}
      </div>
      {/* Mini bar chart skeleton */}
      <div style={{ padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff' }}>
        <Skeleton height={12} width="30%" style={{ marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
          {[40, 70, 55, 85, 60, 90, 75].map((h, i) => (
            <Skeleton key={i} height={h * 0.6} width="13%" style={{ borderRadius: '4px 4px 0 0' }} />
          ))}
        </div>
      </div>
    </div>
  ),
}

export const Ant_폼_스켈레톤: Story = {
  name: 'Ant Design - 폼 필드 스켈레톤',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Form Skeleton 패턴. 라벨 + 입력 필드 구조를 Skeleton으로 표현해 폼 데이터 로딩 상태를 처리합니다. 프로필 편집, 설정 페이지 로딩에 활용됩니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Skeleton height={18} width="30%" />
        <Skeleton height={32} width={72} style={{ borderRadius: 8 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { labelWidth: '20%', fieldWidth: '100%' },
          { labelWidth: '25%', fieldWidth: '100%' },
          { labelWidth: '15%', fieldWidth: '60%' },
          { labelWidth: '30%', fieldWidth: '80%' },
          { labelWidth: '20%', fieldWidth: '100%', multiline: true },
        ].map((field, i) => (
          <div key={i}>
            <Skeleton height={11} width={field.labelWidth} style={{ marginBottom: 8 }} />
            <Skeleton height={field.multiline ? 80 : 38} width={field.fieldWidth} style={{ borderRadius: 8 }} />
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, marginTop: 4, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Skeleton height={36} width={80} style={{ borderRadius: 8 }} />
        <Skeleton height={36} width={100} style={{ borderRadius: 8 }} />
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 웨이브 애니메이션 콘텐츠 로딩
   MUI Skeleton의 wave variant — 가로 방향 shimmer 애니메이션 패턴
-------------------------------------------------------------------------- */
export const MUI_웨이브_애니메이션_스켈레톤: Story = {
  name: 'MUI - 웨이브 애니메이션 콘텐츠 로딩',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Skeleton wave variant 패턴. MUI는 pulse(기본)와 wave 두 가지 애니메이션을 제공합니다. ' +
          '뉴스피드, 블로그, 소셜 카드 로딩에 적합하며 shimmer 효과가 시각적으로 진행 중임을 나타냅니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
        MUI Wave Skeleton — 뉴스피드 로딩
      </div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: 'flex', gap: 14, padding: '14px',
            borderRadius: 12, border: '1px solid #f1f5f9', background: '#fff',
          }}
        >
          {/* 썸네일 */}
          <Skeleton
            height={72}
            width={72}
            style={{ borderRadius: 8, flexShrink: 0 }}
          />
          {/* 텍스트 블록 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
            <Skeleton height={13} width="85%" />
            <Skeleton height={11} width="70%" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <Skeleton height={20} width={20} style={{ borderRadius: '50%' }} />
              <Skeleton height={10} width="35%" />
              <Skeleton height={18} width={48} style={{ borderRadius: 20, marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
      ))}
      {/* MUI-style 인라인 텍스트 스켈레톤 */}
      <div
        style={{
          padding: '14px 16px', borderRadius: 12, border: '1px solid #f1f5f9',
          background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', marginBottom: 2 }}>Typography Skeleton</div>
        <Skeleton height={18} width="45%" style={{ borderRadius: 4 }} />
        <Skeleton height={12} width="100%" />
        <Skeleton height={12} width="92%" />
        <Skeleton height={12} width="78%" />
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 대시보드 위젯 스켈레톤
   Chakra UI SkeletonText + SkeletonCircle 조합 패턴
-------------------------------------------------------------------------- */
export const Chakra_대시보드_위젯_스켈레톤: Story = {
  name: 'Chakra UI - 대시보드 위젯 스켈레톤',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI SkeletonText + SkeletonCircle 조합 패턴. ' +
          '대시보드 위젯의 아이콘/수치/설명 영역을 Skeleton으로 예약합니다. ' +
          'startColor/endColor 그라데이션 효과를 simulate합니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, width: 460, fontFamily: 'system-ui, sans-serif' }}>
      {[
        { accent: '#6366f1', label: '총 사용자' },
        { accent: '#10b981', label: '이번 달 매출' },
        { accent: '#f59e0b', label: '대기 중인 이슈' },
        { accent: '#ef4444', label: '에러율' },
      ].map(({ accent, label }) => (
        <div
          key={label}
          style={{
            padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0',
            background: '#fff', display: 'flex', flexDirection: 'column', gap: 12,
          }}
        >
          {/* 아이콘 + 레이블 행 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Skeleton
              height={36}
              width={36}
              style={{ borderRadius: 8, flexShrink: 0, background: `${accent}22` }}
            />
            <Skeleton height={11} width="60%" />
          </div>
          {/* 큰 수치 */}
          <Skeleton height={28} width="55%" style={{ borderRadius: 6 }} />
          {/* 트렌드 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Skeleton height={16} width={16} style={{ borderRadius: '50%', background: `${accent}33` }} />
            <Skeleton height={10} width="50%" />
          </div>
          {/* 미니 프로그레스 */}
          <Skeleton height={4} width="100%" style={{ borderRadius: 100 }} />
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 미디어 카드 비율 보존 스켈레톤
   MUI Skeleton variant="rectangular" — 종횡비를 유지하는 이미지 플레이스홀더
-------------------------------------------------------------------------- */
export const MUI_미디어_카드_스켈레톤: Story = {
  name: 'MUI - 미디어 카드 비율 보존 스켈레톤',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Skeleton rectangular variant 패턴. ' +
          '이미지/비디오 영역은 실제 비율(16:9, 4:3, 1:1)을 미리 잡아 레이아웃 시프트를 방지합니다. ' +
          'MUI 공식 가이드에서 권장하는 CLS(Cumulative Layout Shift) 방지 패턴입니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 420, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        비율 보존 미디어 스켈레톤
      </div>
      {/* 16:9 비디오 카드 */}
      <div style={{ borderRadius: 14, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Skeleton height="100%" width="100%" style={{ borderRadius: 0 }} />
          </div>
          {/* 재생 버튼 오버레이 스켈레톤 */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Skeleton height={44} width={44} style={{ borderRadius: '50%', opacity: 0.6 }} />
          </div>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton height={14} width="75%" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Skeleton height={24} width={24} style={{ borderRadius: '50%' }} />
            <Skeleton height={10} width="40%" />
            <Skeleton height={18} width={50} style={{ borderRadius: 20, marginLeft: 'auto' }} />
          </div>
        </div>
      </div>
      {/* 4:3 이미지 갤러리 그리드 */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', marginBottom: 8 }}>4:3 갤러리 그리드</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ position: 'relative', paddingTop: '75%', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <Skeleton height="100%" width="100%" style={{ borderRadius: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
