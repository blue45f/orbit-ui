import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
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

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 파일 시스템 경로 패턴
   Tailwind UI Breadcrumb — 파일 탐색기 스타일 경로 + 컨텍스트 액션
-------------------------------------------------------------------------- */
const FS_PATHS = [
  [{ label: 'orbit-ui', icon: '📁' }],
  [{ label: 'orbit-ui', icon: '📁' }, { label: 'packages', icon: '📁' }],
  [{ label: 'orbit-ui', icon: '📁' }, { label: 'packages', icon: '📁' }, { label: 'theme-eclipse', icon: '📁' }],
  [{ label: 'orbit-ui', icon: '📁' }, { label: 'packages', icon: '📁' }, { label: 'theme-eclipse', icon: '📁' }, { label: 'src', icon: '📁' }],
  [{ label: 'orbit-ui', icon: '📁' }, { label: 'packages', icon: '📁' }, { label: 'theme-eclipse', icon: '📁' }, { label: 'src', icon: '📁' }, { label: 'components', icon: '📁' }],
]

export const Tailwind_파일시스템_경로: Story = {
  name: 'Tailwind UI - 파일 시스템 경로 패턴',
  render: function Render() {
    const [pathIdx, setPathIdx] = useState(4)
    const currentPath = FS_PATHS[pathIdx]

    return (
      <div style={{ maxWidth: 560 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>파일 탐색기</div>
        <div style={{
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
          overflow: 'hidden',
        }}>
          {/* 툴바 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
            <button
              onClick={() => setPathIdx((i) => Math.max(0, i - 1))}
              disabled={pathIdx === 0}
              style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #e2e8f0', background: 'transparent', fontSize: 12, cursor: pathIdx === 0 ? 'not-allowed' : 'pointer', color: pathIdx === 0 ? '#cbd5e1' : '#475569' }}
            >
              ←
            </button>
            <button
              onClick={() => setPathIdx((i) => Math.min(FS_PATHS.length - 1, i + 1))}
              disabled={pathIdx === FS_PATHS.length - 1}
              style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #e2e8f0', background: 'transparent', fontSize: 12, cursor: pathIdx === FS_PATHS.length - 1 ? 'not-allowed' : 'pointer', color: pathIdx === FS_PATHS.length - 1 ? '#cbd5e1' : '#475569' }}
            >
              →
            </button>
            <Breadcrumb>
              {currentPath.map((item, i) => (
                <Breadcrumb.Item key={item.label}>
                  <Breadcrumb.Link
                    onClick={() => setPathIdx(i)}
                    style={{ cursor: 'pointer', fontSize: 12, color: i === currentPath.length - 1 ? '#0f172a' : '#64748b', fontWeight: i === currentPath.length - 1 ? 600 : 400 }}
                  >
                    {item.icon} {item.label}
                  </Breadcrumb.Link>
                  {i < currentPath.length - 1 && <Breadcrumb.Separator />}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          {/* 파일 목록 */}
          <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Button', 'Checkbox', 'DataTable', 'Dropdown', 'Modal'].map((name) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', borderRadius: 6, background: '#fff', border: '1px solid #f1f5f9', fontSize: 12, color: '#1e293b' }}>
                <span>📁</span>
                <span style={{ fontWeight: 500 }}>{name}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8' }}>컴포넌트</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>Tailwind UI — 파일 탐색기 스타일 Breadcrumb 패턴</p>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 다단계 설정 경로 패턴
   Radix Breadcrumb primitive — 설정 페이지 계층 탐색 패턴
-------------------------------------------------------------------------- */
const SETTINGS_TREE = {
  label: '설정',
  children: {
    '계정': { label: '계정 설정', children: { '프로필': { label: '프로필 편집' }, '보안': { label: '보안 설정' }, '알림': { label: '알림 설정' } } },
    '팀': { label: '팀 설정', children: { '멤버': { label: '멤버 관리' }, '권한': { label: '권한 설정' } } },
    '결제': { label: '결제 & 플랜', children: { '청구': { label: '청구 정보' }, '히스토리': { label: '결제 기록' } } },
  },
}

export const Radix_설정_계층_탐색: Story = {
  name: 'Radix UI - 다단계 설정 계층 탐색 패턴',
  render: function Render() {
    const [path, setPath] = useState<string[]>([])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getNode = (p: string[]): any => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let node: any = SETTINGS_TREE
      for (const key of p) {
        node = node.children?.[key]
        if (!node) return null
      }
      return node
    }

    const currentNode = getNode(path)
    const hasChildren = currentNode?.children && Object.keys(currentNode.children).length > 0

    return (
      <div style={{ maxWidth: 400 }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>
            <Breadcrumb.Link onClick={() => setPath([])} style={{ cursor: 'pointer', fontSize: 13, color: '#6366f1', fontWeight: 500 }}>
              설정
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          {path.map((key, i) => (
            <Breadcrumb.Item key={key}>
              <Breadcrumb.Separator />
              <Breadcrumb.Link
                onClick={() => setPath(path.slice(0, i + 1))}
                style={{ cursor: 'pointer', fontSize: 13, color: i === path.length - 1 ? '#0f172a' : '#6366f1', fontWeight: i === path.length - 1 ? 700 : 500 }}
              >
                {key}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        {/* 현재 노드 내용 */}
        <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{currentNode?.label ?? '설정'}</div>
          </div>
          {hasChildren ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {Object.entries(currentNode.children).map(([key, child]: [string, unknown]) => (
                <div
                  key={key}
                  onClick={() => setPath([...path, key])}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f8fafc', cursor: 'pointer', background: '#fff' }}
                >
                  <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{key}</span>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>
                    {(child as { label: string }).label} →
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
              {currentNode?.label} 설정 화면
            </div>
          )}
        </div>
        <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>Radix UI Breadcrumb primitive — 계층형 설정 탐색 패턴</p>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Apple HIG: 파일 앱 폴더 계층 탐색 패턴
   Apple Files.app의 폴더 드릴다운 Breadcrumb 패턴
-------------------------------------------------------------------------- */
type AppleFolder = {
  name: string
  items: AppleFolder[]
}

const APPLE_FS: AppleFolder = {
  name: 'iCloud Drive',
  items: [
    {
      name: 'Documents',
      items: [
        { name: 'Design', items: [{ name: 'Orbit UI', items: [] }, { name: 'Figma', items: [] }] },
        { name: 'Code', items: [{ name: 'orbit-ui', items: [] }, { name: 'next-app', items: [] }] },
      ],
    },
    {
      name: 'Desktop',
      items: [{ name: 'Screenshots', items: [] }, { name: 'Recordings', items: [] }],
    },
  ],
}

const AppleFilesDemo = () => {
  const [path, setPath] = useState<string[]>([])

  const getFolder = (p: string[]): AppleFolder => {
    let node = APPLE_FS
    for (const name of p) {
      const found = node.items.find((f) => f.name === name)
      if (found) node = found
    }
    return node
  }

  const current = getFolder(path)
  const breadcrumb = ['iCloud Drive', ...path]

  return (
    <div style={{
      width: 360,
      background: '#f2f2f7',
      borderRadius: 16,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
    }}>
      {/* Top bar */}
      <div style={{ background: '#fff', padding: '10px 16px', borderBottom: '1px solid #e5e5ea' }}>
        <Breadcrumb>
          <Breadcrumb.List>
            {breadcrumb.map((name, i) => (
              <>
                <Breadcrumb.Item key={name}>
                  {i < breadcrumb.length - 1 ? (
                    <Breadcrumb.Link
                      href="#"
                      onClick={(e) => { e.preventDefault(); setPath(breadcrumb.slice(1, i + 1)) }}
                      style={{ fontSize: 13, color: '#007aff' }}
                    >
                      {name}
                    </Breadcrumb.Link>
                  ) : (
                    <Breadcrumb.Page style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e' }}>
                      {name}
                    </Breadcrumb.Page>
                  )}
                </Breadcrumb.Item>
                {i < breadcrumb.length - 1 && (
                  <Breadcrumb.Separator key={`sep-${name}`}>
                    <ChevronRightLineIcon size={10} />
                  </Breadcrumb.Separator>
                )}
              </>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>

      {/* Folder contents */}
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {current.items.length > 0 ? current.items.map((folder) => (
          <div
            key={folder.name}
            onClick={() => setPath([...path, folder.name])}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10,
              background: '#fff', cursor: 'pointer',
              fontSize: 14, color: '#1c1c1e',
            }}
          >
            <span style={{ fontSize: 18 }}>
              {folder.items.length > 0 ? '📁' : '📄'}
            </span>
            <span style={{ flex: 1 }}>{folder.name}</span>
            {folder.items.length > 0 && (
              <ChevronRightLineIcon size={12} />
            )}
          </div>
        )) : (
          <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: '#8e8e93' }}>
            이 폴더는 비어있습니다
          </div>
        )}
      </div>
      <div style={{ padding: '8px 16px', fontSize: 11, color: '#8e8e93' }}>
        Apple HIG — Files.app 폴더 계층 Breadcrumb
      </div>
    </div>
  )
}

export const Apple_HIG_파일_앱_경로: Story = {
  name: 'Apple HIG — Files.app 폴더 계층 탐색 패턴',
  render: () => <AppleFilesDemo />,
}

/* --------------------------------------------------------------------------
   Notion 스타일: 공유 모달 페이지 경로
   Notion share modal에서 페이지 경로를 표시하는 패턴
-------------------------------------------------------------------------- */
const NotionShareModalDemo = () => {
  const [copied, setCopied] = useState(false)
  const shareLinks = [
    { label: '뷰어', icon: '👁' },
    { label: '댓글 허용', icon: '💬' },
    { label: '편집 허용', icon: '✏️' },
  ]
  const [permission, setPermission] = useState('뷰어')

  return (
    <div style={{
      width: 420,
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #e2e8f0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>공유 및 권한</div>
        <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: 8, marginBottom: 12 }}>
          <Breadcrumb>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: '#94a3b8' }}>
                  워크스페이스
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRightLineIcon size={10} />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: '#94a3b8' }}>
                  디자인 시스템
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRightLineIcon size={10} />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Page style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                  컴포넌트 가이드
                </Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb>
        </div>
      </div>

      {/* Permission select */}
      <div style={{ padding: '0 20px 12px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>링크 공유 권한</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {shareLinks.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setPermission(label)}
              style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: 8,
                border: `1.5px solid ${permission === label ? '#6366f1' : '#e2e8f0'}`,
                background: permission === label ? '#f0f1ff' : '#fff',
                color: permission === label ? '#6366f1' : '#64748b',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Link copy */}
      <div style={{ padding: '12px 20px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, padding: '8px 12px', borderRadius: 8,
            border: '1px solid #e2e8f0', background: '#f8fafc',
            fontSize: 12, color: '#94a3b8', overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            https://notion.so/workspace/component-guide-abc123
          </div>
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            style={{
              padding: '8px 14px', borderRadius: 8,
              border: 'none',
              background: copied ? '#10b981' : '#6366f1',
              color: '#fff', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'background 0.2s',
            }}
          >
            {copied ? '복사됨' : '링크 복사'}
          </button>
        </div>
      </div>
    </div>
  )
}

export const Notion_공유_모달_경로: Story = {
  name: 'Notion 공유 모달 — 페이지 경로 표시 패턴',
  render: () => <NotionShareModalDemo />,
}

/* --------------------------------------------------------------------------
   Apple HIG: 설정 앱 스타일 섹션 탐색
   Apple Settings.app의 단계별 뒤로가기 Breadcrumb + 그룹 섹션 패턴
-------------------------------------------------------------------------- */
type SettingSection = {
  title: string
  items: { label: string; value?: string; detail?: boolean }[]
}

const SETTING_SECTIONS: Record<string, SettingSection> = {
  root: {
    title: '설정',
    items: [
      { label: '계정', detail: true },
      { label: '알림', detail: true },
      { label: '접근성', detail: true },
    ],
  },
  계정: {
    title: '계정',
    items: [
      { label: '이름', value: '김희준' },
      { label: '이메일', value: 'hjunkim@example.com' },
      { label: '비밀번호 변경', detail: true },
    ],
  },
  알림: {
    title: '알림',
    items: [
      { label: '모두 허용', value: '켬' },
      { label: '방해 금지 모드', value: '끔' },
      { label: '알림 스타일', value: '배너' },
    ],
  },
  접근성: {
    title: '접근성',
    items: [
      { label: '큰 텍스트', value: '꺼짐' },
      { label: '고대비 모드', value: '꺼짐' },
      { label: '동작 줄이기', value: '꺼짐' },
    ],
  },
}

const AppleSettingsDemo = () => {
  const [stack, setStack] = useState<string[]>(['root'])
  const currentKey = stack[stack.length - 1]
  const section = SETTING_SECTIONS[currentKey] ?? SETTING_SECTIONS.root

  return (
    <div style={{
      width: 320,
      background: '#f2f2f7',
      borderRadius: 16,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
    }}>
      {/* Nav bar */}
      <div style={{
        background: '#fff', padding: '10px 16px',
        borderBottom: '1px solid #e5e5ea',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {stack.length > 1 && (
          <button
            onClick={() => setStack((s) => s.slice(0, -1))}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#007aff', fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 2, padding: 0,
            }}
          >
            {'<'} {SETTING_SECTIONS[stack[stack.length - 2]]?.title}
          </button>
        )}
        <Breadcrumb style={{ flex: 1 }}>
          <Breadcrumb.List>
            {stack.map((key, i) => (
              <>
                <Breadcrumb.Item key={key}>
                  {i < stack.length - 1 ? (
                    <Breadcrumb.Link
                      href="#"
                      onClick={(e) => { e.preventDefault(); setStack(stack.slice(0, i + 1)) }}
                      style={{ fontSize: 12, color: '#007aff' }}
                    >
                      {SETTING_SECTIONS[key]?.title}
                    </Breadcrumb.Link>
                  ) : (
                    <Breadcrumb.Page style={{ fontSize: 14, fontWeight: 700, color: '#1c1c1e' }}>
                      {section.title}
                    </Breadcrumb.Page>
                  )}
                </Breadcrumb.Item>
                {i < stack.length - 1 && (
                  <Breadcrumb.Separator key={`sep-${key}`}>
                    <ChevronRightLineIcon size={10} />
                  </Breadcrumb.Separator>
                )}
              </>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>

      {/* Settings list */}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {section.items.map((item, i) => (
          <div
            key={item.label}
            onClick={() => {
              if (item.detail && SETTING_SECTIONS[item.label]) {
                setStack((s) => [...s, item.label])
              }
            }}
            style={{
              display: 'flex', alignItems: 'center',
              padding: '11px 14px',
              background: '#fff',
              borderRadius: i === 0 ? '10px 10px 2px 2px' : i === section.items.length - 1 ? '2px 2px 10px 10px' : 2,
              cursor: item.detail && SETTING_SECTIONS[item.label] ? 'pointer' : 'default',
              borderBottom: i < section.items.length - 1 ? '1px solid #f2f2f7' : 'none',
            }}
          >
            <span style={{ fontSize: 14, color: '#1c1c1e', flex: 1 }}>{item.label}</span>
            {item.value && (
              <span style={{ fontSize: 13, color: '#8e8e93', marginRight: 4 }}>{item.value}</span>
            )}
            {item.detail && SETTING_SECTIONS[item.label] && (
              <ChevronRightLineIcon size={12} />
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 16px', fontSize: 11, color: '#8e8e93' }}>
        Apple HIG — Settings.app 계층 탐색 패턴
      </div>
    </div>
  )
}

export const Apple_HIG_설정_앱_경로: Story = {
  name: 'Apple HIG — Settings.app 계층 탐색 패턴',
  render: () => <AppleSettingsDemo />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 전자상거래 카테고리 탐색 패턴
   shadcn/ui Breadcrumb — 쇼핑몰 카테고리 계층 + 공유 버튼 패턴
-------------------------------------------------------------------------- */
const CATEGORY_PATH = ['홈', '전자기기', '컴퓨터 & 노트북', '노트북']

export const shadcn_카테고리_탐색: Story = {
  name: 'shadcn/ui - 전자상거래 카테고리 탐색 패턴',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Breadcrumb>
          {CATEGORY_PATH.map((label, i) => (
            <Breadcrumb.Item key={label}>
              {i > 0 && <Breadcrumb.Separator />}
              <Breadcrumb.Link
                style={{
                  fontSize: 13,
                  color: i === CATEGORY_PATH.length - 1 ? '#0f172a' : '#6366f1',
                  fontWeight: i === CATEGORY_PATH.length - 1 ? 700 : 400,
                  cursor: i < CATEGORY_PATH.length - 1 ? 'pointer' : 'default',
                  textDecoration: i < CATEGORY_PATH.length - 1 ? 'underline' : 'none',
                  textUnderlineOffset: 3,
                }}
              >
                {label}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, color: '#475569', cursor: 'pointer' }}>
          공유 ↗
        </button>
      </div>

      {/* 상품 목록 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {['MacBook Pro 16"', 'LG 그램 17', 'Samsung Book Pro', 'Lenovo ThinkPad'].map((product, i) => (
          <div key={product} style={{ borderRadius: 10, border: '1px solid #e2e8f0', padding: 12, background: '#fff' }}>
            <div style={{ width: '100%', height: 80, borderRadius: 8, background: `hsl(${220 + i * 30}, 70%, 95%)`, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              💻
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{product}</div>
            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 700 }}>₩{((i + 1) * 599000).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>shadcn/ui Breadcrumb — 전자상거래 카테고리 탐색 + 공유 버튼 패턴</p>
    </div>
  ),
}

/* ── Linear Design: 이슈 컨텍스트 경로 ── */
const IssueContextBreadcrumbDemo = () => {
  const [path, setPath] = useState(['Orbit UI 팀', '백로그', '이슈 #247'])

  const presets = [
    ['Orbit UI 팀', '백로그', '이슈 #247'],
    ['Orbit UI 팀', '스프린트 #12', '이슈 #312'],
    ['Orbit UI 팀', '완료됨'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>경로 선택</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {presets.map((p) => (
            <button
              key={p.join('-')}
              onClick={() => setPath(p)}
              style={{ textAlign: 'left', padding: '6px 10px', borderRadius: 6, border: `1px solid ${JSON.stringify(p) === JSON.stringify(path) ? '#6366f1' : 'var(--sem-eclipse-color-borderSubtle)'}`, background: JSON.stringify(p) === JSON.stringify(path) ? '#6366f108' : 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}
            >
              {p.join(' / ')}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>결과</div>
        <Breadcrumb>
          <Breadcrumb.List>
            {path.map((segment, i) => (
              <React.Fragment key={segment}>
                <Breadcrumb.Item>
                  {i === path.length - 1 ? (
                    <Breadcrumb.Page>{segment}</Breadcrumb.Page>
                  ) : (
                    <Breadcrumb.Link>{segment}</Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
                {i < path.length - 1 && <Breadcrumb.Separator />}
              </React.Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
    </div>
  )
}

export const Linear_이슈_컨텍스트_경로: Story = {
  name: 'Linear — 이슈 컨텍스트 경로 탐색',
  render: () => <IssueContextBreadcrumbDemo />,
}

/* ── Linear Design: 프로젝트 계층 탐색 ── */
const ProjectHierarchyDemo = () => {
  type Segment = { label: string; sublabel?: string }
  const [segments, setSegments] = useState<Segment[]>([
    { label: 'Orbit UI', sublabel: '조직' },
    { label: 'theme-eclipse', sublabel: '패키지' },
    { label: 'components', sublabel: '디렉토리' },
    { label: 'Button', sublabel: '컴포넌트' },
  ])

  const truncate = () => setSegments((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  const reset = () => setSegments([
    { label: 'Orbit UI', sublabel: '조직' },
    { label: 'theme-eclipse', sublabel: '패키지' },
    { label: 'components', sublabel: '디렉토리' },
    { label: 'Button', sublabel: '컴포넌트' },
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundPrimary)' }}>
        <Breadcrumb>
          <Breadcrumb.List>
            {segments.map((seg, i) => (
              <React.Fragment key={seg.label}>
                <Breadcrumb.Item>
                  {i === segments.length - 1 ? (
                    <Breadcrumb.Page>{seg.label}</Breadcrumb.Page>
                  ) : (
                    <Breadcrumb.Link>{seg.label}</Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
                {i < segments.length - 1 && <Breadcrumb.Separator />}
              </React.Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={truncate} style={{ padding: '5px 12px', fontSize: 12, borderRadius: 5, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundPrimary)', color: 'var(--sem-eclipse-color-foregroundSecondary)', cursor: 'pointer' }}>상위로</button>
        <button onClick={reset} style={{ padding: '5px 12px', fontSize: 12, borderRadius: 5, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundPrimary)', color: 'var(--sem-eclipse-color-foregroundSecondary)', cursor: 'pointer' }}>초기화</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {segments.map((seg, i) => (
          <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: i * 16, fontSize: 12, color: i === segments.length - 1 ? 'var(--sem-eclipse-color-foregroundPrimary)' : 'var(--sem-eclipse-color-foregroundTertiary)' }}>
            <span style={{ color: 'var(--sem-eclipse-color-borderDefault)' }}>{'└'}</span>
            <span style={{ fontWeight: i === segments.length - 1 ? 700 : 400 }}>{seg.label}</span>
            {seg.sublabel && <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)' }}>{seg.sublabel}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_프로젝트_계층_탐색: Story = {
  name: 'Linear — 프로젝트 계층 탐색',
  render: () => <ProjectHierarchyDemo />,
}

/* ── Linear Design: 팀 워크스페이스 네비게이션 ── */
const WorkspaceNavDemo = () => {
  const [activeView, setActiveView] = useState('issues')

  const workspaces = [
    { id: 'orbit', label: 'Orbit UI', views: ['issues', 'projects', 'views', 'members'] },
  ]

  const viewNames: Record<string, string> = {
    issues: '이슈',
    projects: '프로젝트',
    views: '뷰',
    members: '멤버',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      {workspaces.map((ws) => (
        <div key={ws.id}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', marginBottom: 16 }}>
            {ws.views.map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                style={{ padding: '8px 14px', fontSize: 13, fontWeight: activeView === v ? 700 : 400, color: activeView === v ? 'var(--sem-eclipse-color-foregroundPrimary)' : 'var(--sem-eclipse-color-foregroundTertiary)', background: 'none', border: 'none', borderBottom: `2px solid ${activeView === v ? '#6366f1' : 'transparent'}`, cursor: 'pointer', transition: 'color 0.12s' }}
              >
                {viewNames[v]}
              </button>
            ))}
          </div>
          <Breadcrumb>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link>{ws.label}</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>{viewNames[activeView]}</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb>
        </div>
      ))}
    </div>
  )
}

export const Linear_워크스페이스_네비게이션: Story = {
  name: 'Linear — 워크스페이스 네비게이션',
  render: () => <WorkspaceNavDemo />,
}

/* --------------------------------------------------------------------------
   Arco Design — 데이터 탐색 계층 경로 (Cycle 118)
   Arco의 데이터 시각화 탐색 패턴 — 드릴다운 네비게이션
-------------------------------------------------------------------------- */
function ArcoDataDrilldownRender() {
  const paths = [
    [
      { label: '데이터 센터', href: '#' },
      { label: '서울 리전', href: '#' },
    ],
    [
      { label: '데이터 센터', href: '#' },
      { label: '서울 리전', href: '#' },
      { label: '클러스터 A', href: '#' },
    ],
    [
      { label: '데이터 센터', href: '#' },
      { label: '서울 리전', href: '#' },
      { label: '클러스터 A', href: '#' },
      { label: '노드 K8S-001', href: '#' },
    ],
  ]
  const [selectedPath, setSelectedPath] = useState(0)
  const labels = ['리전', '클러스터', '노드']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {labels.map((l, i) => (
          <button
            key={l}
            onClick={() => setSelectedPath(i)}
            style={{
              padding: '4px 12px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
              background: selectedPath === i ? '#6366f1' : 'transparent',
              color: selectedPath === i ? '#fff' : '#64748b',
              border: `1px solid ${selectedPath === i ? '#6366f1' : '#e2e8f0'}`,
            }}
          >
            {l} 뎁스
          </button>
        ))}
      </div>
      <Breadcrumb separator={<ChevronRightLineIcon style={{ width: 14, height: 14, color: '#94a3b8' }} />}>
        <Breadcrumb.Item>
          <HomeLineIcon style={{ width: 14, height: 14 }} />
        </Breadcrumb.Item>
        {paths[selectedPath].map((item) => (
          <Breadcrumb.Item key={item.label}>{item.label}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>현재 위치</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
          {paths[selectedPath][paths[selectedPath].length - 1].label}
        </div>
      </div>
    </div>
  )
}

export const Arco_데이터_드릴다운_경로: Story = {
  name: 'Arco Design — 데이터 드릴다운 경로 (Cycle 118)',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design의 데이터 탐색 드릴다운 패턴. 뎁스 레벨 선택으로 계층 경로가 동적으로 변하며 현재 위치를 강조합니다.',
      },
    },
  },
  render: () => <ArcoDataDrilldownRender />,
}

/* --------------------------------------------------------------------------
   Apple HIG — 설정 앱 계층 탐색 고도화 (Cycle 118)
   HIG의 back-navigation 패턴 — 전체 계층 표시 + 현재 위치 컨텍스트
-------------------------------------------------------------------------- */
function AppleHIGNavigationRender() {
  const tree: Record<string, { label: string; parent: string | null; children: string[] }> = {
    root: { label: '설정', parent: null, children: ['privacy', 'accessibility', 'display'] },
    privacy: { label: '개인 정보 보호', parent: 'root', children: ['location', 'camera'] },
    accessibility: { label: '손쉬운 사용', parent: 'root', children: ['vision', 'motor'] },
    display: { label: '디스플레이', parent: 'root', children: ['brightness', 'textsize'] },
    location: { label: '위치 서비스', parent: 'privacy', children: [] },
    camera: { label: '카메라', parent: 'privacy', children: [] },
    vision: { label: '시각 접근성', parent: 'accessibility', children: [] },
    motor: { label: '동작 및 터치', parent: 'accessibility', children: [] },
    brightness: { label: '밝기 및 텍스트 크기', parent: 'display', children: [] },
    textsize: { label: '텍스트 크기', parent: 'display', children: [] },
  }
  const [current, setCurrent] = useState<string>('privacy')

  function getPath(id: string): string[] {
    const path: string[] = []
    let node: string | null = id
    while (node) {
      path.unshift(node)
      node = tree[node].parent
    }
    return path
  }

  const path = getPath(current)
  const node = tree[current]

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Breadcrumb separator={<ChevronRightLineIcon style={{ width: 12, height: 12, color: '#94a3b8' }} />}>
        {path.map((id) => (
          <Breadcrumb.Item key={id} onClick={() => setCurrent(id)} style={{ cursor: 'pointer' }}>
            {id === 'root' ? <HomeLineIcon style={{ width: 13, height: 13 }} /> : tree[id].label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        {(node.children.length > 0 ? node.children : path.slice(0, -1).map((p) => tree[p].children).flat()).map((childId, i, arr) => (
          <button
            key={childId}
            onClick={() => setCurrent(childId)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '13px 16px', background: '#fff',
              borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 14, color: '#0f172a' }}>{tree[childId].label}</span>
            <ChevronRightLineIcon style={{ width: 14, height: 14, color: '#94a3b8' }} />
          </button>
        ))}
        {node.children.length === 0 && (
          <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            최하위 설정 항목
          </div>
        )}
      </div>
    </div>
  )
}

export const Apple_HIG_계층_설정_탐색: Story = {
  name: 'Apple HIG — 계층 설정 탐색 (Cycle 118)',
  parameters: {
    docs: {
      description: {
        story:
          'Apple HIG의 settings navigation 패턴. Breadcrumb으로 현재 위치 표시, 하위 항목 클릭으로 드릴다운, 경로 클릭으로 역탐색.',
      },
    },
  },
  render: () => <AppleHIGNavigationRender />,
}

/* --------------------------------------------------------------------------
   Arco + Apple — 파일시스템 경로 브레드크럼 (Cycle 118)
   파일 탐색기 경로 + 말줄임 처리 패턴
-------------------------------------------------------------------------- */
function ArcoAppleFilePathRender() {
  const [path, setPath] = useState(['Users', 'heejun', 'Projects', 'orbit-ui', 'packages', 'theme-eclipse', 'src'])
  function navigateTo(index: number) {
    setPath((prev) => prev.slice(0, index + 1))
  }
  function goUp() {
    setPath((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }
  const MAX_VISIBLE = 4
  const isCollapsed = path.length > MAX_VISIBLE
  const visiblePath = isCollapsed ? [path[0], '...', ...path.slice(-MAX_VISIBLE + 2)] : path
  const actualIndices = isCollapsed
    ? [0, -1, ...Array.from({ length: MAX_VISIBLE - 2 }, (_, i) => path.length - MAX_VISIBLE + 2 + i)]
    : Array.from({ length: path.length }, (_, i) => i)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={goUp} disabled={path.length <= 1} style={{ padding: '4px 8px', fontSize: 12, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: path.length > 1 ? 'pointer' : 'not-allowed', color: path.length > 1 ? '#0f172a' : '#94a3b8' }}>
          ← 상위
        </button>
        <Breadcrumb separator="/">
          {visiblePath.map((segment, i) => (
            <Breadcrumb.Item
              key={`${segment}-${i}`}
              onClick={actualIndices[i] !== -1 ? () => navigateTo(actualIndices[i]) : undefined}
              style={{ cursor: actualIndices[i] !== -1 ? 'pointer' : 'default', color: segment === '...' ? '#94a3b8' : undefined }}
            >
              {i === 0 ? <HomeLineIcon style={{ width: 13, height: 13 }} /> : segment}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>절대 경로</div>
        <code style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace' }}>/{path.join('/')}</code>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['components', 'styles', 'templates', 'server'].map((sub) => (
          <button
            key={sub}
            onClick={() => setPath((prev) => [...prev, sub])}
            style={{ padding: '4px 10px', fontSize: 12, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', color: '#475569' }}
          >
            + {sub}/
          </button>
        ))}
      </div>
    </div>
  )
}

export const Arco_Apple_파일시스템_경로: Story = {
  name: 'Arco + Apple — 파일시스템 경로 (Cycle 118)',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design + Apple HIG의 파일탐색기 경로 패턴. 긴 경로 말줄임 처리, 상위 이동, 하위 폴더 추가 인터랙션 포함.',
      },
    },
  },
  render: () => <ArcoAppleFilePathRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI — 다단계 폼 진행 경로 (스텝 브레드크럼)
-------------------------------------------------------------------------- */
function TailwindFormStepBreadcrumbRender() {
  const [currentStep, setCurrentStep] = useState(2)
  const steps = ['기본 정보', '주소 입력', '결제 수단', '주문 확인', '완료']
  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>주문 진행 단계</p>
      <Breadcrumb>
        <Breadcrumb.List>
          {steps.map((step, idx) => (
            <React.Fragment key={step}>
              <Breadcrumb.Item>
                {idx < currentStep ? (
                  <Breadcrumb.Link href="#" onClick={(e) => { e.preventDefault(); setCurrentStep(idx) }}>
                    <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-fillPrimary)', fontWeight: 500 }}>{step}</span>
                  </Breadcrumb.Link>
                ) : idx === currentStep ? (
                  <Breadcrumb.Page>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', borderBottom: '2px solid var(--sem-eclipse-color-fillPrimary)', paddingBottom: 1 }}>{step}</span>
                  </Breadcrumb.Page>
                ) : (
                  <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>{step}</span>
                )}
              </Breadcrumb.Item>
              {idx < steps.length - 1 && (
                <Breadcrumb.Separator>
                  <ChevronRightLineIcon />
                </Breadcrumb.Separator>
              )}
            </React.Fragment>
          ))}
        </Breadcrumb.List>
      </Breadcrumb>
      <div style={{ marginTop: 16, padding: '16px', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-surfaceDefault)' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>{steps[currentStep]}</p>
        <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>단계 {currentStep + 1} / {steps.length} — 완료된 단계를 클릭하면 돌아갈 수 있습니다.</p>
      </div>
    </div>
  )
}

export const Tailwind_다단계_폼_진행_브레드크럼: Story = {
  name: 'Tailwind UI — 다단계 폼 진행 경로 (스텝 브레드크럼)',
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI의 step indicator + breadcrumb 조합 패턴. 완료 단계는 링크로, 현재 단계는 bold underline으로, 미래 단계는 비활성으로 표현. 완료 단계 클릭 시 해당 단계로 이동.',
      },
    },
  },
  render: () => <TailwindFormStepBreadcrumbRender />,
}

/* --------------------------------------------------------------------------
   Ant Design — 코드 리뷰 파일 탐색 (동적 경로 + 파일 변경 수)
-------------------------------------------------------------------------- */
function AntCodeReviewBreadcrumbRender() {
  const [path, setPath] = useState(['src', 'components', 'Button'])
  const tree: Record<string, string[]> = {
    '': ['src', 'docs', 'tests'],
    src: ['components', 'hooks', 'styles'],
    components: ['Button', 'Input', 'Modal'],
    Button: ['Button.tsx', 'Button.test.tsx', 'index.ts'],
    docs: ['getting-started.md', 'api.md'],
    hooks: ['useModal.ts', 'useTheme.ts'],
  }
  const currentKey = path[path.length - 1] ?? ''
  const children = tree[currentKey] ?? []
  return (
    <div style={{ maxWidth: 540, fontFamily: 'monospace, system-ui' }}>
      <div style={{ background: 'var(--sem-eclipse-color-surfaceSubtle)', borderRadius: 8, padding: '10px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#" onClick={(e) => { e.preventDefault(); setPath([]) }}>
                <HomeLineIcon style={{ width: 14, height: 14 }} />
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            {path.map((seg, idx) => (
              <React.Fragment key={seg}>
                <Breadcrumb.Separator><ChevronRightLineIcon /></Breadcrumb.Separator>
                <Breadcrumb.Item>
                  {idx === path.length - 1 ? (
                    <Breadcrumb.Page>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{seg}</span>
                    </Breadcrumb.Page>
                  ) : (
                    <Breadcrumb.Link href="#" onClick={(e) => { e.preventDefault(); setPath(path.slice(0, idx + 1)) }}>
                      <span style={{ fontSize: 12 }}>{seg}</span>
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
              </React.Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children.length > 0 ? children.map((child) => {
          const isFile = child.includes('.')
          return (
            <div key={child} onClick={() => !isFile && setPath([...path, child])} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, cursor: isFile ? 'default' : 'pointer', background: 'transparent', fontSize: 12, color: isFile ? 'var(--sem-eclipse-color-foregroundSecondary)' : 'var(--sem-eclipse-color-foregroundPrimary)' }}>
              <span>{isFile ? '📄' : '📁'}</span>
              <span>{child}</span>
            </div>
          )
        }) : (
          <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)', padding: '8px 10px' }}>파일이 없습니다</p>
        )}
      </div>
    </div>
  )
}

export const Ant_코드_리뷰_파일_탐색: Story = {
  name: 'Ant Design — 코드 리뷰 파일 탐색 (동적 경로)',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design 파일 탐색 Breadcrumb 패턴. 폴더 클릭 시 경로 추가, 상위 경로 클릭 시 되돌아가는 인터랙티브 파일 트리 탐색. 코드 리뷰 UI에서 자주 쓰이는 패턴.',
      },
    },
  },
  render: () => <AntCodeReviewBreadcrumbRender />,
}

/* --------------------------------------------------------------------------
   MUI — 관리자 대시보드 컨텍스트 (섹션 + 아이콘 + 오버플로우)
-------------------------------------------------------------------------- */
function MUIAdminDashboardBreadcrumbRender() {
  const sections = [
    { label: '대시보드', icon: '🏠' },
    { label: '사용자 관리', icon: '👥' },
    { label: '권한 설정', icon: '🔐' },
  ]
  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderRadius: 8, background: 'var(--sem-eclipse-color-surfaceSubtle)', marginBottom: 14 }}>
        <Breadcrumb>
          <Breadcrumb.List>
            {sections.map((sec, idx) => (
              <React.Fragment key={sec.label}>
                <Breadcrumb.Item>
                  {idx === sections.length - 1 ? (
                    <Breadcrumb.Page>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
                        <span>{sec.icon}</span>{sec.label}
                      </span>
                    </Breadcrumb.Page>
                  ) : (
                    <Breadcrumb.Link href="#">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
                        <span>{sec.icon}</span>{sec.label}
                      </span>
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
                {idx < sections.length - 1 && (
                  <Breadcrumb.Separator><ChevronRightLineIcon /></Breadcrumb.Separator>
                )}
              </React.Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
        <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'var(--sem-eclipse-color-surfaceDefault)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>Admin</span>
      </div>
      <div style={{ padding: '16px', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>🔐 권한 설정</p>
        <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>사용자 역할 및 접근 권한을 관리합니다. 변경 사항은 즉시 적용됩니다.</p>
      </div>
    </div>
  )
}

export const MUI_관리자_대시보드_브레드크럼: Story = {
  name: 'MUI — 관리자 대시보드 (섹션 + 아이콘)',
  parameters: {
    docs: {
      description: {
        story: 'Material UI 관리자 UI의 아이콘 포함 Breadcrumb 패턴. 각 경로 항목에 섹션 아이콘을 추가하고 현재 섹션에 Admin 뱃지를 우측에 배치.',
      },
    },
  },
  render: () => <MUIAdminDashboardBreadcrumbRender />,
}
