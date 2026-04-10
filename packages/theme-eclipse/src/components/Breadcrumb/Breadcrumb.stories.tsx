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
