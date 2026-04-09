import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { HomeLineIcon, ChevronRightLineIcon, MoreHorizontalIcon } from '@heejun-com/icons'

import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'eclipse/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/* --------------------------------------------------------------------------
   기본: 단순 경로 표시
-------------------------------------------------------------------------- */
export const 기본: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">홈</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRightLineIcon />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/components">컴포넌트</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRightLineIcon />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>브레드크럼</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  ),
}

/* --------------------------------------------------------------------------
   Notion 스타일: 아이콘 포함 경로 네비게이션
   Notion의 페이지 헤더에 표시되는 경로 탐색 패턴
-------------------------------------------------------------------------- */
export const Notion_아이콘_경로: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Page Navigation
        </p>
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HomeLineIcon size={14} />
                <span>워크스페이스</span>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <ChevronRightLineIcon size={12} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/design">디자인 시스템</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <ChevronRightLineIcon size={12} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/design/components">컴포넌트</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <ChevronRightLineIcon size={12} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </div>

      <div>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Short Path
        </p>
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HomeLineIcon size={14} />
                <span>홈</span>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <ChevronRightLineIcon size={12} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Page>현재 페이지</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Notion 스타일: 줄임 처리 (ellipsis) 패턴
   긴 경로를 "..." 으로 줄여 보여주는 Notion 네비게이션 패턴
-------------------------------------------------------------------------- */
export const Notion_긴경로_줄임: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
        깊은 경로는 중간 항목을 줄임 처리합니다. 아이콘을 클릭하면 전체 경로를 볼 수 있습니다.
      </p>
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HomeLineIcon size={14} />
              <span>홈</span>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            <ChevronRightLineIcon size={12} />
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            <ChevronRightLineIcon size={12} />
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/components">컴포넌트</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            <ChevronRightLineIcon size={12} />
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Notion 스타일: 페이지 헤더 통합 패턴
   Notion 문서 페이지 상단에 보이는 전체 헤더 영역 조합 패턴
-------------------------------------------------------------------------- */
export const Notion_페이지_헤더: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '680px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          padding: '12px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fff',
        }}
      >
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '13px' }}>
                <HomeLineIcon size={13} />
                <span>Orbit UI</span>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <ChevronRightLineIcon size={11} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/design" style={{ color: '#64748b', fontSize: '13px' }}>문서</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <ChevronRightLineIcon size={11} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Page style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>컴포넌트 가이드</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
        <div style={{ marginLeft: 'auto' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#94a3b8',
            }}
          >
            <MoreHorizontalIcon size={16} />
          </button>
        </div>
      </div>

      <div style={{ padding: '48px 24px 24px' }}>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          컴포넌트 가이드
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Orbit UI의 컴포넌트를 활용하는 방법과 모범 사례를 소개합니다.
          각 컴포넌트의 Props, 변형, 접근성 지침을 확인하세요.
        </p>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 스타일: 인터랙티브 경로 탐색
   클릭으로 경로를 단계별로 이동하는 Linear 스타일 인터랙션
-------------------------------------------------------------------------- */
const BreadcrumbNavigator = () => {
  const tree = [
    { id: 'root', label: '홈', parent: null },
    { id: 'design', label: '디자인 시스템', parent: 'root' },
    { id: 'components', label: '컴포넌트', parent: 'design' },
    { id: 'navigation', label: '네비게이션', parent: 'components' },
    { id: 'breadcrumb', label: 'Breadcrumb', parent: 'navigation' },
  ]

  const [currentPath, setCurrentPath] = useState<string[]>(['root', 'design', 'components'])

  const navigateTo = (id: string) => {
    const idx = currentPath.indexOf(id)
    if (idx !== -1) {
      setCurrentPath(currentPath.slice(0, idx + 1))
    }
  }

  const addNext = () => {
    const current = currentPath[currentPath.length - 1]
    const next = tree.find((n) => n.parent === current)
    if (next && !currentPath.includes(next.id)) {
      setCurrentPath([...currentPath, next.id])
    }
  }

  const pathItems = currentPath.map((id) => tree.find((n) => n.id === id)!).filter(Boolean)
  const hasNext = tree.some((n) => n.parent === currentPath[currentPath.length - 1] && !currentPath.includes(n.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '520px' }}>
      <div
        style={{
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
        }}
      >
        <Breadcrumb>
          <Breadcrumb.List>
            {pathItems.map((item, i) => (
              <>
                <Breadcrumb.Item key={item.id}>
                  {i < pathItems.length - 1 ? (
                    <Breadcrumb.Link
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigateTo(item.id) }}
                    >
                      {item.label}
                    </Breadcrumb.Link>
                  ) : (
                    <Breadcrumb.Page>{item.label}</Breadcrumb.Page>
                  )}
                </Breadcrumb.Item>
                {i < pathItems.length - 1 && (
                  <Breadcrumb.Separator key={`sep-${item.id}`}>
                    <ChevronRightLineIcon size={12} />
                  </Breadcrumb.Separator>
                )}
              </>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {hasNext && (
          <button
            onClick={addNext}
            style={{
              padding: '7px 14px',
              borderRadius: '7px',
              border: 'none',
              background: '#6366f1',
              color: '#fff',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            다음 뎁스로 이동
          </button>
        )}
        {currentPath.length > 1 && (
          <button
            onClick={() => setCurrentPath(currentPath.slice(0, -1))}
            style={{
              padding: '7px 14px',
              borderRadius: '7px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#64748b',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            뒤로 이동
          </button>
        )}
      </div>
      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
        링크를 클릭하면 해당 위치로 경로가 줄어듭니다.
      </p>
    </div>
  )
}

export const 인터랙티브_경로_탐색: Story = {
  render: () => <BreadcrumbNavigator />,
}
