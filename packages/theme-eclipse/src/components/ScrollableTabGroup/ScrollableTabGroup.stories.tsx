import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ScrollableTabGroup } from './ScrollableTabGroup'

ScrollableTabGroup.displayName = 'ScrollableTabGroup'
ScrollableTabGroup.Tab.displayName = 'ScrollableTabGroup.Tab'
ScrollableTabGroup.TabLeading.displayName = 'ScrollableTabGroup.TabLeading'
ScrollableTabGroup.TabCenter.displayName = 'ScrollableTabGroup.TabCenter'
ScrollableTabGroup.TabTrailing.displayName = 'ScrollableTabGroup.TabTrailing'

const meta = {
  title: 'eclipse/Actions/Tabs/ScrollableTabGroup',
  component: ScrollableTabGroup,
  tags: ['autodocs'],
  argTypes: {
    onTabChange: { action: 'changed' },
  },
} satisfies Meta<typeof ScrollableTabGroup>

type Story = StoryObj<typeof meta>

export default meta

const categories = [
  { id: 'all', label: 'All', icon: '🏠', count: null, desc: 'Browse all available items across every category.' },
  { id: 'featured', label: 'Featured', icon: '⭐', count: null, desc: 'Hand-picked featured items curated by our team.' },
  { id: 'new', label: 'New Arrivals', icon: '✨', count: 12, desc: 'Freshly added items in the last 7 days.' },
  { id: 'design', label: 'Design', icon: '🎨', count: null, desc: 'UI kits, templates, and design resources.' },
  { id: 'dev', label: 'Development', icon: '💻', count: null, desc: 'Code libraries, APIs, and developer tools.' },
  { id: 'motion', label: 'Motion', icon: '🎬', count: null, desc: 'Animation presets and motion design files.' },
  { id: 'icons', label: 'Icons', icon: '🔷', count: null, desc: 'Icon packs in SVG, PNG, and Lottie format.' },
  { id: 'fonts', label: 'Typography', icon: '✍️', count: null, desc: 'Premium fonts and type system configurations.' },
  { id: 'color', label: 'Color', icon: '🎭', count: null, desc: 'Color palettes, gradients, and token systems.' },
  { id: 'promo', label: 'On Sale', icon: '🔥', count: 5, desc: 'Limited-time deals — grab them before they\'re gone!' },
]

const ScrollableTabGroupDemo = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = categories[activeIdx]

  return (
    <div style={{ width: '360px', border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)', borderRadius: '16px', overflow: 'hidden', background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)' }}>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {categories.map((cat) => (
          <ScrollableTabGroup.Tab key={cat.id} value={cat.id}>
            <ScrollableTabGroup.TabLeading>
              <span style={{ fontSize: '14px' }}>{cat.icon}</span>
            </ScrollableTabGroup.TabLeading>
            <ScrollableTabGroup.TabCenter>{cat.label}</ScrollableTabGroup.TabCenter>
            {cat.count !== null && (
              <ScrollableTabGroup.TabTrailing>
                <span style={{
                  background: '#ef4444', color: '#fff',
                  borderRadius: '100px', padding: '1px 6px',
                  fontSize: '10px', fontWeight: '700',
                }}>{cat.count}</span>
              </ScrollableTabGroup.TabTrailing>
            )}
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>

      {/* Content panel */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '24px' }}>{current?.icon}</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>{current?.label}</div>
            <div style={{ fontSize: '12px', color: 'var(--sem-eclipse-color-foregroundTertiary, #94a3b8)' }}>{current?.count !== null ? `${current?.count} items` : 'All items'}</div>
          </div>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)', lineHeight: '1.6', padding: '12px', borderRadius: '8px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
          {current?.desc}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              flex: '1 1 calc(50% - 4px)', minWidth: '120px',
              height: '72px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${['#6366f1','#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444'][i]}18 0%, ${['#8b5cf6','#3b82f6','#06b6d4','#059669','#d97706','#dc2626'][i]}18 100%)`,
              border: `1px solid ${['#6366f1','#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444'][i]}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: '600', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)',
            }}>
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const 기본 = {
  render() {
    return <ScrollableTabGroupDemo />
  },
} satisfies Story

export const 디자인QA = {
  args: {
    tabCount: 10,
    defaultValue: 'tab4',
  },
  argTypes: {
    tabCount: {
      control: 'number',
      min: 5,
      max: 10,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render({ tabCount, defaultValue }: any) {
    return (
      <div style={{ width: '320px', height: '700px', border: '1px solid #ccc' }}>
        <ScrollableTabGroup defaultValue={defaultValue}>
          {Array.from({ length: tabCount }).map((_, index) => (
            <ScrollableTabGroup.Tab key={index} value={`tab-${index}`}>
              {index % 2 === 0 && (
                <ScrollableTabGroup.TabLeading>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </ScrollableTabGroup.TabLeading>
              )}
              <ScrollableTabGroup.TabCenter>Tab {index + 1}</ScrollableTabGroup.TabCenter>
              {index % 3 === 0 && (
                <ScrollableTabGroup.TabTrailing>
                  <span style={{
                    backgroundColor: '#ff4444', color: 'white', borderRadius: '50%',
                    width: '18px', height: '18px', fontSize: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                  }}>
                    {index + 1}
                  </span>
                </ScrollableTabGroup.TabTrailing>
              )}
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Vercel 스타일: 배포 환경 탭 필터
   Vercel Dashboard의 Deployments 페이지처럼 환경별 탭 필터링 패턴
-------------------------------------------------------------------------- */
const environments = [
  { id: 'all', label: 'All', count: 128 },
  { id: 'production', label: 'Production', count: 42 },
  { id: 'preview', label: 'Preview', count: 83 },
  { id: 'development', label: 'Development', count: 3 },
]

const deployments = [
  { id: 1, env: 'production', branch: 'main', status: 'Ready', hash: 'a1b2c3d', time: '2m ago', duration: '47s' },
  { id: 2, env: 'preview', branch: 'feat/new-button', status: 'Ready', hash: 'e4f5a6b', time: '15m ago', duration: '52s' },
  { id: 3, env: 'preview', branch: 'fix/tooltip-z-index', status: 'Building', hash: 'c7d8e9f', time: '22m ago', duration: '—' },
  { id: 4, env: 'production', branch: 'main', status: 'Ready', hash: 'a0b1c2d', time: '1h ago', duration: '44s' },
  { id: 5, env: 'development', branch: 'dev', status: 'Error', hash: 'f3e2d1c', time: '2h ago', duration: '12s' },
  { id: 6, env: 'preview', branch: 'feat/dark-mode', status: 'Ready', hash: 'b9a8c7d', time: '3h ago', duration: '61s' },
]

const statusColors: Record<string, string> = {
  Ready: '#22c55e',
  Building: '#f59e0b',
  Error: '#ef4444',
}

const VercelDeploymentTabsRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeEnv = environments[activeIdx]
  const filtered = activeEnv.id === 'all'
    ? deployments
    : deployments.filter((d) => d.env === activeEnv.id)

  return (
    <div style={{ width: '600px', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Deployments</span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>자동 새로고침 30초</span>
      </div>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {environments.map((env) => (
          <ScrollableTabGroup.Tab key={env.id} value={env.id}>
            <ScrollableTabGroup.TabCenter>{env.label}</ScrollableTabGroup.TabCenter>
            <ScrollableTabGroup.TabTrailing>
              <span style={{
                fontSize: '11px', fontWeight: '600', color: '#94a3b8',
                background: '#f1f5f9', borderRadius: '100px', padding: '1px 6px',
              }}>{env.count}</span>
            </ScrollableTabGroup.TabTrailing>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div>
        {filtered.map((dep, i) => (
          <div key={dep.id} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 20px',
            borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: statusColors[dep.status] ?? '#94a3b8', flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '2px' }}>
                {dep.branch}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                {dep.hash}
              </div>
            </div>
            <span style={{
              fontSize: '11px', fontWeight: '600',
              color: statusColors[dep.status] ?? '#94a3b8',
              background: `${statusColors[dep.status] ?? '#94a3b8'}14`,
              padding: '2px 8px', borderRadius: '100px',
            }}>{dep.status}</span>
            <span style={{ fontSize: '11px', color: '#94a3b8', minWidth: '48px', textAlign: 'right' }}>{dep.time}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
            해당 환경의 배포 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export const Vercel_배포환경_탭: typeof 기본 = {
  render() {
    return <VercelDeploymentTabsRender />
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui 스타일: 이커머스 카테고리 필터 탭
   상품 카테고리를 스크롤 가능한 탭으로 필터링하는 e-commerce 패턴
-------------------------------------------------------------------------- */
const productCategories = [
  { id: 'all', label: '전체', badge: null },
  { id: 'new', label: '신상품', badge: 'NEW' },
  { id: 'best', label: 'BEST', badge: null },
  { id: 'sale', label: '세일', badge: '-30%' },
  { id: 'ui-kit', label: 'UI Kit', badge: null },
  { id: 'icons', label: '아이콘', badge: null },
  { id: 'templates', label: '템플릿', badge: null },
  { id: 'fonts', label: '폰트', badge: null },
  { id: 'motion', label: '모션', badge: null },
]

const productItems = [
  { id: 1, category: 'ui-kit', name: 'Orbit Design Kit', price: '₩89,000', badge: 'best', color: '#6366f1' },
  { id: 2, category: 'icons', name: 'Orbit Icons Pro', price: '₩39,000', badge: 'new', color: '#10b981' },
  { id: 3, category: 'templates', name: 'Admin Dashboard Kit', price: '₩129,000', badge: 'sale', color: '#f59e0b' },
  { id: 4, category: 'ui-kit', name: 'Mobile Component Kit', price: '₩69,000', badge: null, color: '#8b5cf6' },
  { id: 5, category: 'motion', name: 'Lottie Animation Pack', price: '₩49,000', badge: 'new', color: '#ef4444' },
  { id: 6, category: 'fonts', name: 'Korean Type System', price: '₩29,000', badge: 'sale', color: '#06b6d4' },
]

const badgeColorMap = { best: '#f59e0b', new: '#22c55e', sale: '#ef4444' } as const

const EcommerceTabFilterRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeId = productCategories[activeIdx]?.id ?? 'all'
  const filtered = activeId === 'all' ? productItems : productItems.filter((p) => p.category === activeId)

  return (
    <div style={{ width: '380px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>디자인 에셋</span>
        <span style={{ fontSize: '12px', color: '#64748b' }}>{filtered.length}개 상품</span>
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', background: '#fff' }}>
        <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
          {productCategories.map((cat) => (
            <ScrollableTabGroup.Tab key={cat.id} value={cat.id}>
              <ScrollableTabGroup.TabCenter>{cat.label}</ScrollableTabGroup.TabCenter>
              {cat.badge && (
                <ScrollableTabGroup.TabTrailing>
                  <span style={{
                    fontSize: '9px', fontWeight: '800', color: '#ef4444',
                    letterSpacing: '0.04em',
                  }}>{cat.badge}</span>
                </ScrollableTabGroup.TabTrailing>
              )}
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
              해당 카테고리의 상품이 없습니다.
            </div>
          )}
          {filtered.map((item) => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px', borderRadius: '10px',
              border: '1px solid #f1f5f9', cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: `${item.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: item.color, opacity: 0.8 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '2px' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{item.price}</div>
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '10px', fontWeight: '700',
                  color: badgeColorMap[item.badge as keyof typeof badgeColorMap] ?? '#94a3b8',
                  background: `${badgeColorMap[item.badge as keyof typeof badgeColorMap] ?? '#94a3b8'}14`,
                  padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase',
                }}>{item.badge}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const 이커머스_카테고리_필터: typeof 기본 = {
  render() {
    return <EcommerceTabFilterRender />
  },
}

/* --------------------------------------------------------------------------
   대화 분류 탭 패턴 (Inbox / Sent / Drafts)
   이메일/메시지 앱처럼 상태별 필터 탭과 읽지않음 카운트 표시
-------------------------------------------------------------------------- */
const inboxTabs = [
  { id: 'inbox', label: '받은 편지함', unread: 12 },
  { id: 'sent', label: '보낸 편지함', unread: null },
  { id: 'drafts', label: '임시 보관함', unread: 3 },
  { id: 'archive', label: '보관됨', unread: null },
  { id: 'spam', label: '스팸', unread: 1 },
  { id: 'trash', label: '휴지통', unread: null },
]

const messages = [
  { id: 1, folder: 'inbox', sender: 'Orbit UI 팀', subject: '[공지] v2.0 업데이트 안내', preview: '안녕하세요! Orbit UI v2.0이 출시되었습니다.', time: '오전 10:32', unread: true },
  { id: 2, folder: 'inbox', sender: 'GitHub', subject: 'New pull request: feat/dark-mode', preview: 'hjunkim opened a pull request in orbit-ui/orbit-ui...', time: '오전 9:15', unread: true },
  { id: 3, folder: 'inbox', sender: '디자인팀', subject: '피그마 파일 업데이트 완료', preview: '버튼 컴포넌트 토큰 재정의가 완료되었습니다.', time: '어제', unread: false },
  { id: 4, folder: 'drafts', sender: '(나)', subject: '팀 회고 양식 초안', preview: '이번 스프린트 회고를 위한...', time: '3일 전', unread: false },
  { id: 5, folder: 'spam', sender: 'unknown@spam.co', subject: '당신이 선택되었습니다!!', preview: '지금 바로 클릭하세요...', time: '1주일 전', unread: true },
]

const InboxTabsRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeId = inboxTabs[activeIdx]?.id ?? 'inbox'
  const filtered = messages.filter((m) => m.folder === activeId)

  return (
    <div style={{ width: '420px', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>메일함</span>
      </div>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {inboxTabs.map((tab) => (
          <ScrollableTabGroup.Tab key={tab.id} value={tab.id}>
            <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
            {tab.unread !== null && (
              <ScrollableTabGroup.TabTrailing>
                <span style={{
                  background: '#ef4444', color: '#fff',
                  borderRadius: '100px', padding: '1px 5px',
                  fontSize: '10px', fontWeight: '700',
                  minWidth: '16px', textAlign: 'center',
                }}>{tab.unread}</span>
              </ScrollableTabGroup.TabTrailing>
            )}
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div>
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
            메시지가 없습니다.
          </div>
        )}
        {filtered.map((msg, i) => (
          <div key={msg.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            padding: '14px 20px',
            borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
            background: msg.unread ? 'rgba(99,102,241,0.03)' : 'transparent',
            cursor: 'pointer',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#6366f118', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '13px', fontWeight: '700',
              color: '#6366f1', flexShrink: 0,
            }}>
              {msg.sender.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '13px', fontWeight: msg.unread ? '700' : '500', color: '#0f172a' }}>
                  {msg.sender}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{msg.time}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: msg.unread ? '600' : '400', color: '#1e293b', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {msg.subject}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {msg.preview}
              </div>
            </div>
            {msg.unread && (
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, marginTop: '4px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const 메일함_탭패턴: typeof 기본 = {
  render() {
    return <InboxTabsRender />
  },
}

/* --------------------------------------------------------------------------
   Mantine 수평 스크롤 네비게이션 패턴
   Mantine Tabs scrollable: 많은 탭을 좌우 스크롤로 탐색, 뱃지 카운트 포함
-------------------------------------------------------------------------- */
const MantineNavTabsRender = () => {
  const [active, setActive] = useState(0)

  const navItems = [
    { label: '전체', count: 128 },
    { label: '진행 중', count: 24 },
    { label: '검토 중', count: 7 },
    { label: '완료', count: 89 },
    { label: '보류', count: 3 },
    { label: '취소됨', count: 5 },
    { label: '아카이브', count: 0 },
    { label: '즐겨찾기', count: 12 },
  ]

  const statusColors: Record<string, string> = {
    '진행 중': '#10b981',
    '검토 중': '#f59e0b',
    '완료': '#6366f1',
    '보류': '#94a3b8',
    '취소됨': '#ef4444',
  }

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      <ScrollableTabGroup selectedIndex={active} onTabChange={setActive}>
        {navItems.map((item) => (
          <ScrollableTabGroup.Tab key={item.label} value={item.label}>
            <ScrollableTabGroup.TabCenter>{item.label}</ScrollableTabGroup.TabCenter>
            {item.count > 0 && (
              <ScrollableTabGroup.TabTrailing>
                <span style={{
                  padding: '1px 6px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                  background: statusColors[item.label] ? `${statusColors[item.label]}18` : '#f1f5f9',
                  color: statusColors[item.label] || '#64748b',
                }}>
                  {item.count}
                </span>
              </ScrollableTabGroup.TabTrailing>
            )}
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
          {navItems[active].label} ({navItems[active].count}건)
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>
          Mantine Tabs scrollable 패턴 — 상태별 이슈 필터링
        </div>
      </div>
    </div>
  )
}

export const Mantine_상태별_이슈_필터: typeof 기본 = {
  render() {
    return <MantineNavTabsRender />
  },
}

/* --------------------------------------------------------------------------
   Chakra UI 제품 카테고리 탭 패턴
   Chakra Tabs fitted: 각 탭이 동일 너비, 아이콘+텍스트 조합, 선택 강조
-------------------------------------------------------------------------- */
const ChakraCategoryTabsRender = () => {
  const [active, setActive] = useState(1)

  const categories = [
    { label: '패션', icon: '👕', items: 2340 },
    { label: '전자', icon: '📱', items: 1820 },
    { label: '식품', icon: '🍎', items: 980 },
    { label: '뷰티', icon: '💄', items: 1240 },
    { label: '스포츠', icon: '⚽', items: 760 },
    { label: '홈', icon: '🏠', items: 1100 },
    { label: '도서', icon: '📚', items: 3400 },
    { label: '여행', icon: '✈️', items: 520 },
  ]

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <ScrollableTabGroup selectedIndex={active} onTabChange={setActive}>
        {categories.map((cat) => (
          <ScrollableTabGroup.Tab key={cat.label} value={cat.label}>
            <ScrollableTabGroup.TabLeading>
              <span style={{ fontSize: 14 }}>{cat.icon}</span>
            </ScrollableTabGroup.TabLeading>
            <ScrollableTabGroup.TabCenter>{cat.label}</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
              {categories[active].icon} {categories[active].label}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
              {categories[active].items.toLocaleString()}개 상품
            </div>
          </div>
          <span style={{
            padding: '4px 12px', borderRadius: 20,
            background: '#6366f118', color: '#6366f1',
            fontSize: 12, fontWeight: 700,
          }}>
            필터 적용
          </span>
        </div>
      </div>
    </div>
  )
}

export const Chakra_상품_카테고리_탭: typeof 기본 = {
  render() {
    return <ChakraCategoryTabsRender />
  },
}

/* --------------------------------------------------------------------------
   MUI 언어/로케일 선택 탭 패턴
   MUI Tabs scrollButtons: 국제화 언어 선택 탭, 국기+이름 조합
-------------------------------------------------------------------------- */
const MuiLocaleTabsRender = () => {
  const [active, setActive] = useState(0)

  const locales = [
    { code: 'ko', label: '한국어', flag: '🇰🇷', rtl: false },
    { code: 'en', label: 'English', flag: '🇺🇸', rtl: false },
    { code: 'ja', label: '日本語', flag: '🇯🇵', rtl: false },
    { code: 'zh', label: '中文', flag: '🇨🇳', rtl: false },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', rtl: false },
    { code: 'fr', label: 'Français', flag: '🇫🇷', rtl: false },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', rtl: true },
    { code: 'es', label: 'Español', flag: '🇪🇸', rtl: false },
  ]

  const sampleText: Record<string, string> = {
    ko: '안녕하세요! Orbit UI에 오신 것을 환영합니다.',
    en: 'Hello! Welcome to Orbit UI.',
    ja: 'こんにちは！Orbit UIへようこそ。',
    zh: '你好！欢迎使用 Orbit UI。',
    de: 'Hallo! Willkommen bei Orbit UI.',
    fr: 'Bonjour ! Bienvenue sur Orbit UI.',
    ar: 'مرحبًا! أهلاً بك في Orbit UI.',
    es: '¡Hola! Bienvenido a Orbit UI.',
  }

  const current = locales[active]

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <ScrollableTabGroup selectedIndex={active} onTabChange={setActive}>
        {locales.map((loc) => (
          <ScrollableTabGroup.Tab key={loc.code} value={loc.code}>
            <ScrollableTabGroup.TabLeading>
              <span style={{ fontSize: 14 }}>{loc.flag}</span>
            </ScrollableTabGroup.TabLeading>
            <ScrollableTabGroup.TabCenter>{loc.label}</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div
        style={{
          padding: 20,
          direction: current.rtl ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ fontSize: 22, marginBottom: 8 }}>{current.flag}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
          {sampleText[current.code]}
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          MUI Tabs scrollButtons 패턴 — 국제화 로케일 탭{current.rtl ? ' (RTL)' : ''}
        </div>
      </div>
    </div>
  )
}

export const MUI_국제화_로케일_탭: typeof 기본 = {
  render() {
    return <MuiLocaleTabsRender />
  },
}

// ─── Cycle 62: Tailwind UI + MUI ───────────────────────────────────────────

const TAILWIND_SECTIONS = [
  { id: 'overview', label: '개요', badge: null, summary: '프로젝트 전체 현황과 최근 활동을 확인합니다.', items: ['전체 태스크 48개', '완료 31개', '진행 중 12개', '지연 5개'] },
  { id: 'tasks', label: '태스크', badge: 17, summary: '할당된 태스크 목록과 우선순위를 관리합니다.', items: ['긴급 3개', '높음 6개', '보통 5개', '낮음 3개'] },
  { id: 'members', label: '팀원', badge: null, summary: '프로젝트에 참여 중인 팀원 현황을 확인합니다.', items: ['개발자 4명', '디자이너 2명', 'PM 1명', 'QA 2명'] },
  { id: 'milestones', label: '마일스톤', badge: 2, summary: '주요 마일스톤과 달성률을 추적합니다.', items: ['베타 배포 D-12', '정식 출시 D-34', '리트로 D-8', '플래닝 D-2'] },
  { id: 'docs', label: '문서', badge: null, summary: '프로젝트 관련 문서와 가이드를 관리합니다.', items: ['API 문서', '디자인 가이드', 'PRD', '온보딩'] },
  { id: 'settings', label: '설정', badge: null, summary: '프로젝트 기본 정보와 권한을 설정합니다.', items: ['알림 설정', '멤버 권한', '연동 서비스', '보안'] },
]

const TailwindProjectNavRender = () => {
  const [activeId, setActiveId] = useState('overview')
  const activeIdx = TAILWIND_SECTIONS.findIndex(s => s.id === activeId)
  const current = TAILWIND_SECTIONS[activeIdx]

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '16px 20px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>프로젝트 대시보드</div>
        <ScrollableTabGroup
          selectedIndex={activeIdx}
          onTabChange={(i) => setActiveId(TAILWIND_SECTIONS[i].id)}
        >
          {TAILWIND_SECTIONS.map((s) => (
            <ScrollableTabGroup.Tab key={s.id} value={s.id}>
              <ScrollableTabGroup.TabCenter>{s.label}</ScrollableTabGroup.TabCenter>
              {s.badge !== null && (
                <ScrollableTabGroup.TabTrailing>
                  <span style={{ background: '#6366f1', color: '#fff', borderRadius: 100, padding: '1px 6px', fontSize: 10, fontWeight: 700 }}>{s.badge}</span>
                </ScrollableTabGroup.TabTrailing>
              )}
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, marginBottom: 8 }}>{current?.label?.toUpperCase()}</div>
        <div style={{ fontSize: 13, color: '#475569', marginBottom: 14, lineHeight: 1.5 }}>{current?.summary}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {current?.items.map((item, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#334155', fontWeight: 500 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Tailwind_프로젝트_내비게이션_탭: Story = {
  name: 'Tailwind UI - 프로젝트 섹션 내비게이션 탭',
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI의 수평 탭 내비게이션 패턴. 배지 카운터가 달린 섹션 탭으로 프로젝트 대시보드 내부를 구조화합니다. 활성 탭 콘텐츠가 아래 패널에 즉시 반영됩니다.',
      },
    },
  },
  render: () => <TailwindProjectNavRender />,
}

const MUI_METRICS = [
  { id: 'revenue', label: '매출', unit: '원', value: 8420000, prev: 7100000, color: '#22c55e' },
  { id: 'users', label: '사용자', unit: '명', value: 23410, prev: 19200, color: '#6366f1' },
  { id: 'orders', label: '주문', unit: '건', value: 1837, prev: 2100, color: '#f59e0b' },
  { id: 'refunds', label: '환불', unit: '건', value: 42, prev: 38, color: '#ef4444' },
]

const MUI_PERIODS = [
  { id: '1d', label: '1일' },
  { id: '1w', label: '1주' },
  { id: '1m', label: '1개월' },
  { id: '3m', label: '3개월' },
  { id: '6m', label: '6개월' },
  { id: '1y', label: '1년' },
]

const MuiMetricsDashboardRender = () => {
  const [period, setPeriod] = useState('1m')
  const periodIdx = MUI_PERIODS.findIndex(p => p.id === period)
  const multiplier = [0.15, 0.4, 1, 2.5, 5, 10][periodIdx] ?? 1

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '16px 20px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>지표 대시보드</div>
        </div>
        <ScrollableTabGroup
          selectedIndex={periodIdx}
          onTabChange={(i) => setPeriod(MUI_PERIODS[i].id)}
        >
          {MUI_PERIODS.map((p) => (
            <ScrollableTabGroup.Tab key={p.id} value={p.id}>
              <ScrollableTabGroup.TabCenter>{p.label}</ScrollableTabGroup.TabCenter>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {MUI_METRICS.map((m) => {
          const val = Math.round(m.value * multiplier)
          const prev = Math.round(m.prev * multiplier)
          const diff = val - prev
          const pct = ((diff / prev) * 100).toFixed(1)
          const up = diff >= 0
          return (
            <div key={m.id} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                {m.id === 'revenue' ? `${(val / 10000).toFixed(0)}만` : val.toLocaleString()}
                <span style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8' }}> {m.unit}</span>
              </div>
              <div style={{ fontSize: 11, marginTop: 4, color: up ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                {up ? '+' : ''}{pct}% vs 이전
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const MUI_기간별_지표_대시보드: Story = {
  name: 'MUI - 기간별 지표 대시보드 탭',
  parameters: {
    docs: {
      description: {
        story: 'MUI Tabs의 scrollButtons="auto" 패턴. 1일~1년 기간 탭을 선택하면 매출/사용자/주문/환불 지표가 비례 계산되어 즉시 업데이트됩니다. 증감률을 색상으로 직관적으로 표현합니다.',
      },
    },
  },
  render: () => <MuiMetricsDashboardRender />,
}

const APPLE_APPS = [
  { id: 'mail', label: '메일', count: 14, content: ['받은 편지함 14개 미읽음', '보낸 편지함', '스팸 3개', '임시보관함 2개'] },
  { id: 'notes', label: '메모', count: null, content: ['오늘 추가된 메모 3개', '최근 7일 12개', '폴더 5개', '태그된 메모 8개'] },
  { id: 'calendar', label: '캘린더', count: 3, content: ['오늘 일정 3개', '이번 주 9개', '다음 주 5개', '반복 일정 4개'] },
  { id: 'reminders', label: '알림', count: 7, content: ['오늘 마감 7개', '예정 12개', '완료 34개', '플래그 2개'] },
  { id: 'photos', label: '사진', count: null, content: ['최근 48장', '앨범 12개', '공유 앨범 3개', '즐겨찾기 67장'] },
  { id: 'files', label: '파일', count: null, content: ['최근 파일 8개', '공유된 파일 4개', '태그 6개', '용량 4.2GB'] },
]

const AppleHIGTabsRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = APPLE_APPS[activeIdx]

  return (
    <div style={{ width: 360, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#f2f2f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ padding: '14px 0 0', borderBottom: '1px solid #d1d5db' }}>
        <ScrollableTabGroup
          selectedIndex={activeIdx}
          onTabChange={setActiveIdx}
        >
          {APPLE_APPS.map((app) => (
            <ScrollableTabGroup.Tab key={app.id} value={app.id}>
              <ScrollableTabGroup.TabCenter>{app.label}</ScrollableTabGroup.TabCenter>
              {app.count !== null && (
                <ScrollableTabGroup.TabTrailing>
                  <span style={{ background: '#ff3b30', color: '#fff', borderRadius: 100, padding: '1px 5px', fontSize: 10, fontWeight: 700 }}>{app.count}</span>
                </ScrollableTabGroup.TabTrailing>
              )}
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e', marginBottom: 10 }}>{current?.label}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {current?.content.map((line, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: '#fff', fontSize: 13, color: '#1c1c1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{line}</span>
              <span style={{ color: '#c7c7cc', fontSize: 16 }}>{'>'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Apple_HIG_앱_섹션_탭: Story = {
  name: 'Apple HIG - iOS 앱 섹션 탭 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG의 iOS 세그먼티드/탭 패턴을 ScrollableTabGroup으로 구현. 시스템 앱 스타일의 그룹화된 콘텐츠 탭과 SF 심볼 스타일 배지를 사용해 알림 수를 빨간색으로 강조합니다.',
      },
    },
  },
  render: () => <AppleHIGTabsRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 사이클(스프린트) 탭 패턴
   Linear의 Cycles — 활성/예정/완료 사이클을 수평 탭으로 전환하는 패턴
-------------------------------------------------------------------------- */
type LinearCycleStatus = 'active' | 'upcoming' | 'completed'

const LINEAR_CYCLE_TABS: Array<{ id: LinearCycleStatus; label: string; count: number }> = [
  { id: 'active', label: '활성 사이클', count: 1 },
  { id: 'upcoming', label: '예정', count: 3 },
  { id: 'completed', label: '완료', count: 12 },
]

type CycleIssue = { id: string; title: string; progress: number; priority: 'urgent' | 'high' | 'medium' | 'low' }

const CYCLE_CONTENT: Record<LinearCycleStatus, { title: string; dates: string; issues: CycleIssue[] }> = {
  active: {
    title: 'Cycle 14 — Q2 품질 개선',
    dates: '2025-04-07 ~ 2025-04-20',
    issues: [
      { id: 'ORB-201', title: '스켈레톤 스토리 추가', progress: 80, priority: 'high' },
      { id: 'ORB-202', title: 'TextField 접근성 보강', progress: 45, priority: 'urgent' },
      { id: 'ORB-203', title: 'AnimatedBadge 색상 확장', progress: 100, priority: 'medium' },
      { id: 'ORB-204', title: '토큰 문서 고도화', progress: 20, priority: 'low' },
    ],
  },
  upcoming: {
    title: 'Cycle 15 — 성능 최적화',
    dates: '2025-04-21 ~ 2025-05-04',
    issues: [
      { id: 'ORB-210', title: 'Bundle 사이즈 감소', progress: 0, priority: 'high' },
      { id: 'ORB-211', title: 'Lazy import 도입', progress: 0, priority: 'medium' },
      { id: 'ORB-212', title: 'Tree shaking 검증', progress: 0, priority: 'medium' },
    ],
  },
  completed: {
    title: 'Cycle 13 — 디자인 토큰 통합',
    dates: '2025-03-24 ~ 2025-04-06',
    issues: [
      { id: 'ORB-189', title: '3단계 토큰 아키텍처 설계', progress: 100, priority: 'urgent' },
      { id: 'ORB-190', title: '시맨틱 토큰 매핑 완료', progress: 100, priority: 'high' },
      { id: 'ORB-191', title: '다크모드 토큰 정의', progress: 100, priority: 'high' },
    ],
  },
}

const PRIORITY_DOT: Record<CycleIssue['priority'], string> = {
  urgent: '#ef4444',
  high:   '#f97316',
  medium: '#6366f1',
  low:    '#94a3b8',
}

function LinearCycleTabsRender() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeId = LINEAR_CYCLE_TABS[activeIdx].id
  const cycle = CYCLE_CONTENT[activeId]

  return (
    <div style={{ width: 420, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Cycles</span>
      </div>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {LINEAR_CYCLE_TABS.map((tab) => (
          <ScrollableTabGroup.Tab key={tab.id} value={tab.id}>
            <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
            <ScrollableTabGroup.TabTrailing>
              <span style={{ padding: '1px 6px', borderRadius: 10, fontSize: 10, fontWeight: 700, background: '#f1f5f9', color: '#64748b' }}>{tab.count}</span>
            </ScrollableTabGroup.TabTrailing>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{cycle.title}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{cycle.dates}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cycle.issues.map((issue) => (
            <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: PRIORITY_DOT[issue.priority], flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.title}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{issue.id}</div>
              </div>
              <div style={{ width: 52, height: 4, borderRadius: 2, background: '#e2e8f0', flexShrink: 0 }}>
                <div style={{ width: `${issue.progress}%`, height: '100%', borderRadius: 2, background: issue.progress === 100 ? '#10b981' : '#6366f1', transition: 'width 0.3s' }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', width: 28, textAlign: 'right', flexShrink: 0 }}>{issue.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Linear_사이클_탭_패턴: Story = {
  name: 'Linear - Cycles 활성/예정/완료 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 Cycles 탭 패턴. 활성/예정/완료 사이클을 ScrollableTabGroup으로 전환하고 ' +
          '각 이슈에 우선순위 색상 도트, 진행률 바, 이슈 ID를 함께 표시합니다.',
      },
    },
  },
  render: () => <LinearCycleTabsRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 팀별 이슈 필터 탭
   Linear의 Team Views — 팀/프로젝트별 이슈를 탭으로 분류하는 패턴
-------------------------------------------------------------------------- */
type LinearTeamId = 'all' | 'engineering' | 'design' | 'product' | 'infra'

const LINEAR_TEAM_TABS: Array<{ id: LinearTeamId; label: string; color: string; count: number }> = [
  { id: 'all',         label: '전체',      color: '#6366f1', count: 24 },
  { id: 'engineering', label: 'Engineering', color: '#0ea5e9', count: 12 },
  { id: 'design',      label: 'Design',      color: '#ec4899', count: 5  },
  { id: 'product',     label: 'Product',     color: '#f59e0b', count: 4  },
  { id: 'infra',       label: 'Infra',       color: '#10b981', count: 3  },
]

type LinearIssue94 = { id: string; title: string; team: LinearTeamId; status: 'todo' | 'in-progress' | 'done' }

const LINEAR_ISSUES: LinearIssue94[] = [
  { id: 'ENG-01', title: 'Button 컴포넌트 접근성 보강', team: 'engineering', status: 'in-progress' },
  { id: 'ENG-02', title: 'DataTable 정렬 버그 수정', team: 'engineering', status: 'done' },
  { id: 'ENG-03', title: 'Calendar range 선택 구현', team: 'engineering', status: 'todo' },
  { id: 'DES-01', title: '디자인 토큰 갱신', team: 'design', status: 'in-progress' },
  { id: 'DES-02', title: 'Figma 컴포넌트 매핑', team: 'design', status: 'todo' },
  { id: 'PRD-01', title: 'Roadmap Q2 기획', team: 'product', status: 'done' },
  { id: 'INF-01', title: 'CI/CD 파이프라인 최적화', team: 'infra', status: 'in-progress' },
]

const STATUS_ICON: Record<LinearIssue94['status'], { icon: string; color: string }> = {
  'todo':        { icon: '○', color: '#94a3b8' },
  'in-progress': { icon: '◑', color: '#6366f1' },
  'done':        { icon: '●', color: '#10b981' },
}

function LinearTeamFilterTabsRender() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeId = LINEAR_TEAM_TABS[activeIdx].id

  const filtered = activeId === 'all' ? LINEAR_ISSUES : LINEAR_ISSUES.filter((i) => i.team === activeId)
  const team = LINEAR_TEAM_TABS[activeIdx]

  return (
    <div style={{ width: 400, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: team.color }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>이슈 — {team.label}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>{filtered.length}개</span>
      </div>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {LINEAR_TEAM_TABS.map((t) => (
          <ScrollableTabGroup.Tab key={t.id} value={t.id}>
            <ScrollableTabGroup.TabCenter>{t.label}</ScrollableTabGroup.TabCenter>
            <ScrollableTabGroup.TabTrailing>
              <span style={{ padding: '1px 5px', borderRadius: 8, fontSize: 10, fontWeight: 700, background: t.color + '18', color: t.color }}>{t.count}</span>
            </ScrollableTabGroup.TabTrailing>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>이슈가 없습니다</div>
        ) : (
          filtered.map((issue) => {
            const st = STATUS_ICON[issue.status]
            return (
              <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer' }}>
                <span style={{ fontSize: 14, color: st.color, flexShrink: 0, width: 16, textAlign: 'center' }}>{st.icon}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#334155', fontWeight: 500 }}>{issue.title}</span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>{issue.id}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export const Linear_팀별_이슈_필터_탭: Story = {
  name: 'Linear - 팀별 이슈 필터 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 Team Views 패턴. 팀별 색상 코드 도트와 카운트 배지로 구분된 탭으로 이슈를 필터링하고, ' +
          '이슈 상태를 진행 중(◑)/완료(●)/대기(○) 아이콘으로 표현합니다.',
      },
    },
  },
  render: () => <LinearTeamFilterTabsRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 로드맵 분기(Quarter) 탭
   Linear의 Roadmap — Q별 마일스톤을 탭으로 탐색하는 패턴
-------------------------------------------------------------------------- */
type LinearQuarter = 'Q1' | 'Q2' | 'Q3' | 'Q4'

const LINEAR_QUARTER_TABS: Array<{ id: LinearQuarter; label: string; year: number; status: 'past' | 'current' | 'future' }> = [
  { id: 'Q1', label: 'Q1 2025', year: 2025, status: 'past' },
  { id: 'Q2', label: 'Q2 2025', year: 2025, status: 'current' },
  { id: 'Q3', label: 'Q3 2025', year: 2025, status: 'future' },
  { id: 'Q4', label: 'Q4 2025', year: 2025, status: 'future' },
]

type RoadmapItem = { title: string; status: 'shipped' | 'in-progress' | 'planned'; team: string }

const ROADMAP: Record<LinearQuarter, RoadmapItem[]> = {
  Q1: [
    { title: '3단계 토큰 아키텍처', status: 'shipped', team: 'Engineering' },
    { title: 'Storybook 8.x 마이그레이션', status: 'shipped', team: 'Engineering' },
    { title: 'Figma 컴포넌트 동기화', status: 'shipped', team: 'Design' },
  ],
  Q2: [
    { title: 'DataTable 고도화', status: 'in-progress', team: 'Engineering' },
    { title: 'AccessibilityGuide.mdx', status: 'in-progress', team: 'Product' },
    { title: 'Calendar range 선택', status: 'planned', team: 'Engineering' },
    { title: 'shadcn/ui 마이그레이션 가이드', status: 'planned', team: 'Product' },
  ],
  Q3: [
    { title: '다크모드 전면 지원', status: 'planned', team: 'Engineering' },
    { title: 'Motion 토큰 시스템', status: 'planned', team: 'Design' },
    { title: 'React Native 버전', status: 'planned', team: 'Engineering' },
  ],
  Q4: [
    { title: 'Orbit UI 2.0 출시', status: 'planned', team: 'Product' },
    { title: 'AI 컴포넌트 추천 시스템', status: 'planned', team: 'Engineering' },
  ],
}

const ROADMAP_STATUS: Record<RoadmapItem['status'], { label: string; color: string; bg: string }> = {
  shipped:     { label: 'Shipped', color: '#10b981', bg: '#f0fdf4' },
  'in-progress': { label: 'In Progress', color: '#6366f1', bg: '#eef2ff' },
  planned:     { label: 'Planned', color: '#94a3b8', bg: '#f8fafc' },
}

function LinearRoadmapQuarterTabsRender() {
  const [activeIdx, setActiveIdx] = useState(1)
  const quarter = LINEAR_QUARTER_TABS[activeIdx]
  const items = ROADMAP[quarter.id]

  const QUARTER_STATUS_STYLE: Record<typeof quarter.status, { labelColor: string }> = {
    past:    { labelColor: '#94a3b8' },
    current: { labelColor: '#6366f1' },
    future:  { labelColor: '#64748b' },
  }

  return (
    <div style={{ width: 420, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Roadmap</span>
        {quarter.status === 'current' && (
          <span style={{ padding: '2px 8px', borderRadius: 20, background: '#eef2ff', color: '#6366f1', fontSize: 11, fontWeight: 700 }}>현재 분기</span>
        )}
      </div>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {LINEAR_QUARTER_TABS.map((q) => (
          <ScrollableTabGroup.Tab key={q.id} value={q.id}>
            <ScrollableTabGroup.TabCenter>
              <span style={{ color: QUARTER_STATUS_STYLE[q.status].labelColor }}>{q.label}</span>
            </ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
          {items.length}개 마일스톤
        </div>
        {items.map((item, i) => {
          const st = ROADMAP_STATUS[item.status]
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{item.title}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{item.team}</div>
              </div>
              <span style={{ padding: '2px 10px', borderRadius: 20, background: st.bg, color: st.color, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{st.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Linear_로드맵_분기_탭: Story = {
  name: 'Linear - Roadmap Q1/Q2/Q3/Q4 분기 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 Roadmap 분기별 탭 패턴. 과거/현재/미래 Q를 ScrollableTabGroup 탭으로 탐색하고, ' +
          '각 마일스톤을 Shipped/In Progress/Planned 상태 배지와 담당 팀으로 표시합니다.',
      },
    },
  },
  render: () => <LinearRoadmapQuarterTabsRender />,
}

/* --------------------------------------------------------------------------
   Cycle 122 — Ant Design + Mantine 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Ant Design: 탭 바 뱃지 + 오버플로우 드롭다운 패턴
   Ant Design Tabs moreIcon + badge 아이디어
-------------------------------------------------------------------------- */
export const Ant_바코드_뱃지_탭: Story = {
  name: 'Ant Design - 탭 뱃지 + 카테고리 필터 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Tabs badge 아이디어. 각 탭에 알림 카운트 배지를 표시하고 ' +
          '탭 전환 시 해당 카테고리 아이템을 필터링하여 표시하는 패턴입니다.',
      },
    },
  },
  render: function Render() {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const tabs = [
      { label: '전체', count: 42, icon: '📋' },
      { label: '진행 중', count: 8, icon: '🔄' },
      { label: '완료', count: 27, icon: '✅' },
      { label: '취소됨', count: 4, icon: '❌' },
      { label: '보류', count: 3, icon: '⏸' },
      { label: '초안', count: 0, icon: '📝' },
    ]

    const items = [
      { title: '로그인 버그 수정', status: 1, assignee: '김민준', priority: 'high' },
      { title: '다크모드 토글 구현', status: 0, assignee: '이서연', priority: 'medium' },
      { title: 'API 성능 최적화', status: 2, assignee: '박준혁', priority: 'high' },
      { title: '디자인 시스템 문서화', status: 1, assignee: '최유진', priority: 'low' },
      { title: '알림 센터 리팩토링', status: 0, assignee: '김민준', priority: 'medium' },
      { title: '레거시 코드 제거', status: 2, assignee: '이서연', priority: 'low' },
      { title: '배포 파이프라인 설정', status: 3, assignee: '박준혁', priority: 'high' },
      { title: '유닛 테스트 커버리지', status: 4, assignee: '최유진', priority: 'medium' },
    ]

    const priorityColor: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' }

    const filtered = selectedIndex === 0 ? items : items.filter((it) => it.status === selectedIndex - 1)

    return (
      <div style={{ width: 520 }}>
        <ScrollableTabGroup selectedIndex={selectedIndex} onTabChange={setSelectedIndex}>
          {tabs.map((t, i) => (
            <ScrollableTabGroup.Tab key={i}>
              <ScrollableTabGroup.TabCenter>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                  {t.count > 0 && (
                    <span style={{
                      minWidth: 18, height: 18, borderRadius: 9, padding: '0 5px',
                      background: i === selectedIndex ? '#6366f1' : '#e2e8f0',
                      color: i === selectedIndex ? '#fff' : '#64748b',
                      fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {t.count}
                    </span>
                  )}
                </span>
              </ScrollableTabGroup.TabCenter>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>항목 없음</div>
          ) : (
            filtered.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor[item.priority], flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{item.assignee}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Mantine: Tabs + Panel 연동 패턴
   Mantine Tabs keepMounted + lazy 아이디어
-------------------------------------------------------------------------- */
export const Mantine_패널_연동_탭: Story = {
  name: 'Mantine - 패널 연동 콘텐츠 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Tabs 의 패널 연동 패턴. 탭 전환 시 콘텐츠 영역이 슬라이드 전환되고 ' +
          '각 패널에 독립적인 상태(검색, 필터)를 유지하는 방식을 구현합니다.',
      },
    },
  },
  render: function Render() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [search, setSearch] = useState('')

    const panels = [
      {
        label: '컴포넌트', icon: '🧩',
        items: ['Button', 'Input', 'Modal', 'Drawer', 'Tooltip', 'Badge', 'Avatar', 'Card'],
      },
      {
        label: '훅', icon: '🪝',
        items: ['useDisclosure', 'useForm', 'useLocalStorage', 'useMediaQuery', 'useTimeout', 'useClipboard'],
      },
      {
        label: '유틸리티', icon: '🛠',
        items: ['createStyles', 'rem', 'em', 'px', 'themeToVars', 'mergeTheme', 'colorsTuple'],
      },
    ]

    const panel = panels[selectedIndex]
    const filtered = panel.items.filter((it) => it.toLowerCase().includes(search.toLowerCase()))

    return (
      <div style={{ width: 480 }}>
        <ScrollableTabGroup selectedIndex={selectedIndex} onTabChange={(i) => { setSelectedIndex(i); setSearch('') }}>
          {panels.map((p, i) => (
            <ScrollableTabGroup.Tab key={i}>
              <ScrollableTabGroup.TabCenter>
                {p.icon} {p.label}
              </ScrollableTabGroup.TabCenter>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>

        <div style={{ marginTop: 14 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`${panel.label} 검색...`}
            style={{
              width: '100%', padding: '8px 12px', borderRadius: 8,
              border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
              boxSizing: 'border-box', marginBottom: 12,
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {filtered.map((item) => (
              <div key={item} style={{
                padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                background: '#fff', fontSize: 13, fontWeight: 500, color: '#1e293b',
                cursor: 'pointer',
              }}>
                {item}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', fontSize: 13, padding: '24px 0' }}>
                검색 결과 없음
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant + Mantine: 데이터 분석 대시보드 탭 패턴
   두 시스템의 세그먼트 뷰 + 지표 카드 결합
-------------------------------------------------------------------------- */
export const Ant_Mantine_분석_대시보드_탭: Story = {
  name: 'Ant Design + Mantine - 분석 대시보드 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Tabs + Mantine StatCard 아이디어를 결합한 분석 대시보드. ' +
          '기간별 탭 전환 시 KPI 지표와 트렌드를 업데이트하는 패턴입니다.',
      },
    },
  },
  render: function Render() {
    const [selectedIndex, setSelectedIndex] = useState(1)

    const periods = [
      { label: '오늘', short: 'D' },
      { label: '7일', short: 'W' },
      { label: '30일', short: 'M' },
      { label: '분기', short: 'Q' },
      { label: '연간', short: 'Y' },
    ]

    const metrics = [
      [
        { label: '방문자', value: '1,284', delta: '+12%', up: true, color: '#6366f1' },
        { label: '전환율', value: '3.2%', delta: '-0.4%', up: false, color: '#ef4444' },
        { label: '매출', value: '₩4.2M', delta: '+8%', up: true, color: '#10b981' },
        { label: '이탈률', value: '42%', delta: '-2%', up: true, color: '#10b981' },
      ],
      [
        { label: '방문자', value: '8,912', delta: '+23%', up: true, color: '#6366f1' },
        { label: '전환율', value: '4.1%', delta: '+0.9%', up: true, color: '#10b981' },
        { label: '매출', value: '₩31.5M', delta: '+18%', up: true, color: '#10b981' },
        { label: '이탈률', value: '38%', delta: '-5%', up: true, color: '#10b981' },
      ],
      [
        { label: '방문자', value: '34,210', delta: '+7%', up: true, color: '#6366f1' },
        { label: '전환율', value: '3.8%', delta: '+0.2%', up: true, color: '#10b981' },
        { label: '매출', value: '₩128M', delta: '+15%', up: true, color: '#10b981' },
        { label: '이탈률', value: '41%', delta: '-1%', up: true, color: '#10b981' },
      ],
      [
        { label: '방문자', value: '98,450', delta: '+11%', up: true, color: '#6366f1' },
        { label: '전환율', value: '3.6%', delta: '-0.1%', up: false, color: '#ef4444' },
        { label: '매출', value: '₩385M', delta: '+9%', up: true, color: '#10b981' },
        { label: '이탈률', value: '43%', delta: '+2%', up: false, color: '#ef4444' },
      ],
      [
        { label: '방문자', value: '412K', delta: '+31%', up: true, color: '#6366f1' },
        { label: '전환율', value: '4.2%', delta: '+0.8%', up: true, color: '#10b981' },
        { label: '매출', value: '₩1.6B', delta: '+27%', up: true, color: '#10b981' },
        { label: '이탈률', value: '36%', delta: '-7%', up: true, color: '#10b981' },
      ],
    ]

    const current = metrics[selectedIndex]

    return (
      <div style={{ width: 480 }}>
        <ScrollableTabGroup selectedIndex={selectedIndex} onTabChange={setSelectedIndex}>
          {periods.map((p, i) => (
            <ScrollableTabGroup.Tab key={i}>
              <ScrollableTabGroup.TabCenter>{p.label}</ScrollableTabGroup.TabCenter>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
          {current.map((m) => (
            <div key={m.label} style={{
              padding: '16px', borderRadius: 12, border: '1px solid #f1f5f9', background: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {m.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 6 }}>{m.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: m.color }}>
                {m.up ? '▲' : '▼'} {m.delta} vs 이전 {periods[selectedIndex].label}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   MUI — 데이터 카테고리 탭 (동적 탭 추가/삭제 + 뱃지)
-------------------------------------------------------------------------- */
function MUIClosableTabsRender() {
  const [tabs, setTabs] = useState([
    { id: 1, label: '전체', count: 142 },
    { id: 2, label: '활성', count: 89 },
    { id: 3, label: '보류', count: 31 },
    { id: 4, label: '완료', count: 22 },
  ])
  const [activeIdx, setActiveIdx] = useState(0)
  const [nextId, setNextId] = useState(5)

  const addTab = () => {
    const newTab = { id: nextId, label: `커스텀 ${nextId - 4}`, count: Math.floor(Math.random() * 50) }
    setTabs((prev) => [...prev, newTab])
    setActiveIdx(tabs.length)
    setNextId((n) => n + 1)
  }

  const removeTab = (id: number, idx: number) => {
    if (tabs.length <= 1) return
    const newTabs = tabs.filter((t) => t.id !== id)
    setTabs(newTabs)
    setActiveIdx(Math.min(activeIdx, newTabs.length - 1))
    if (idx <= activeIdx && activeIdx > 0) setActiveIdx((i) => i - 1)
  }

  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
          {tabs.map((tab, idx) => (
            <ScrollableTabGroup.Tab key={tab.id} value={String(tab.id)}>
              <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
              <ScrollableTabGroup.TabTrailing>
                <span style={{ fontSize: 10, background: 'var(--sem-eclipse-color-fillPrimarySubtle)', color: 'var(--sem-eclipse-color-fillPrimary)', padding: '0px 5px', borderRadius: 10, fontWeight: 600 }}>{tab.count}</span>
                {idx > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeTab(tab.id, idx) }}
                    style={{ marginLeft: 2, width: 14, height: 14, borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--sem-eclipse-color-foregroundTertiary)', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                  >
                    ×
                  </button>
                )}
              </ScrollableTabGroup.TabTrailing>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
        <button onClick={addTab} style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', border: '1px dashed var(--sem-eclipse-color-borderDefault)', background: 'none', color: 'var(--sem-eclipse-color-foregroundTertiary)', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
      </div>
      <div style={{ marginTop: 12, padding: '14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-surfaceDefault)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', minHeight: 60 }}>
        현재 탭: <strong>{tabs[activeIdx]?.label}</strong> — 항목 {tabs[activeIdx]?.count}개
      </div>
    </div>
  )
}

export const MUI_동적_탭_추가_삭제: Story = {
  name: 'MUI — 동적 탭 추가/삭제 (클로저블 탭)',
  parameters: {
    docs: {
      description: {
        story: 'MUI 동적 탭(closable tabs) 패턴. 탭 우측 × 버튼으로 탭을 삭제하고 + 버튼으로 새 탭을 추가. 각 탭에 항목 카운트 뱃지 포함. 데이터 필터링 워크스페이스에서 활용.',
      },
    },
  },
  render: () => <MUIClosableTabsRender />,
}

/* --------------------------------------------------------------------------
   Arco Design — 대시보드 위젯 탭 (그룹별 지표 전환)
-------------------------------------------------------------------------- */
function ArcoWidgetMetricTabRender() {
  const [activeIdx, setActiveIdx] = useState(0)

  const metrics = [
    { label: '방문자', data: [1200, 1850, 1430, 2100, 1920, 2350, 2180], unit: '명', color: '#6366f1', total: 13030 },
    { label: '전환율', data: [2.1, 3.4, 2.8, 4.2, 3.9, 4.8, 4.1], unit: '%', color: '#10b981', total: 3.6 },
    { label: '매출', data: [420, 630, 510, 780, 690, 890, 820], unit: '만원', color: '#f59e0b', total: 4740 },
    { label: '이탈률', data: [45, 38, 42, 35, 37, 31, 33], unit: '%', color: '#ef4444', total: 37.3 },
  ]

  const active = metrics[activeIdx]
  const max = Math.max(...active.data)

  return (
    <div style={{ maxWidth: 500, fontFamily: 'system-ui, sans-serif' }}>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {metrics.map((m, idx) => (
          <ScrollableTabGroup.Tab key={idx} value={String(idx)}>
            <ScrollableTabGroup.TabCenter>{m.label}</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ marginTop: 12, padding: '16px', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-surfaceDefault)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>최근 7일 합계/평균</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: active.color }}>{active.total.toLocaleString()}<span style={{ fontSize: 12, marginLeft: 2 }}>{active.unit}</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
          {active.data.map((val, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: '100%', borderRadius: '3px 3px 0 0', background: active.color, opacity: 0.6 + (idx / active.data.length) * 0.4, height: `${(val / max) * 72}px`, transition: 'height 0.3s ease' }} />
              <span style={{ fontSize: 8, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>{['월', '화', '수', '목', '금', '토', '일'][idx]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Arco_대시보드_위젯_탭: Story = {
  name: 'Arco Design — 대시보드 위젯 탭 (그룹별 지표 전환)',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design 데이터 시각화 탭 패턴. 방문자/전환율/매출/이탈률 지표를 탭으로 전환하면 차트 데이터와 총합 수치가 실시간으로 업데이트. 대시보드 위젯에서 활용.',
      },
    },
  },
  render: () => <ArcoWidgetMetricTabRender />,
}

/* --------------------------------------------------------------------------
   MUI + Arco — 실시간 서버 모니터링 탭 (상태 도트 + 자동 갱신 수)
-------------------------------------------------------------------------- */
function MUIArcoServerMonitorTabRender() {
  const [activeIdx, setActiveIdx] = useState(0)

  const servers = [
    { id: 'web-01', label: 'Web-01', status: 'healthy', cpu: 34, mem: 58, req: 1240 },
    { id: 'web-02', label: 'Web-02', status: 'healthy', cpu: 41, mem: 63, req: 1180 },
    { id: 'api-01', label: 'API-01', status: 'warning', cpu: 78, mem: 82, req: 890 },
    { id: 'db-01', label: 'DB-01', status: 'critical', cpu: 92, mem: 94, req: 240 },
    { id: 'cache-01', label: 'Cache-01', status: 'healthy', cpu: 22, mem: 45, req: 3400 },
  ]

  const statusColor: Record<string, string> = { healthy: '#10b981', warning: '#f59e0b', critical: '#ef4444' }
  const active = servers[activeIdx]

  const metricColor = (val: number) => val >= 80 ? '#ef4444' : val >= 60 ? '#f59e0b' : '#10b981'

  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <ScrollableTabGroup selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {servers.map((srv, idx) => (
          <ScrollableTabGroup.Tab key={idx} value={srv.id}>
            <ScrollableTabGroup.TabLeading>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor[srv.status], display: 'inline-block' }} />
            </ScrollableTabGroup.TabLeading>
            <ScrollableTabGroup.TabCenter>{srv.label}</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
        ))}
      </ScrollableTabGroup>
      <div style={{ marginTop: 12, padding: '16px', borderRadius: 10, border: `1px solid ${statusColor[active.status]}40`, background: 'var(--sem-eclipse-color-surfaceDefault)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[active.status] }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{active.id}</span>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 10, background: `${statusColor[active.status]}20`, color: statusColor[active.status] }}>{active.status}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[{ label: 'CPU', val: active.cpu, unit: '%' }, { label: 'Memory', val: active.mem, unit: '%' }, { label: 'Req/min', val: active.req, unit: '' }].map((m) => (
            <div key={m.label} style={{ padding: '10px', borderRadius: 8, background: 'var(--sem-eclipse-color-surfaceSubtle)', textAlign: 'center' }}>
              <p style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 4 }}>{m.label}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: m.unit === '%' ? metricColor(m.val) : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{m.val.toLocaleString()}<span style={{ fontSize: 11 }}>{m.unit}</span></p>
              {m.unit === '%' && (
                <div style={{ height: 4, borderRadius: 2, background: 'var(--sem-eclipse-color-borderSubtle)', marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${m.val}%`, background: metricColor(m.val), borderRadius: 2 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const MUI_Arco_서버_모니터링_탭: Story = {
  name: 'MUI + Arco — 실시간 서버 모니터링 탭 (상태 도트)',
  parameters: {
    docs: {
      description: {
        story: 'MUI 탭 상태 표시 + Arco 데이터 시각화 조합. 각 서버 탭에 healthy/warning/critical 상태 도트 표시, 선택 시 CPU/Memory/요청수를 지표 카드로 표시. DevOps 모니터링 대시보드 패턴.',
      },
    },
  },
  render: () => <MUIArcoServerMonitorTabRender />,
}

/* --------------------------------------------------------------------------
   Cycle 177 — Mantine + Ant Design
   Benchmark:
   1. Mantine Tabs: 콘텐츠 패널 완전 분리 + 배지 인디케이터
   2. Ant Design Tabs: status 색상 도트 + count 뱃지 + 탭 필터 조합
   3. 두 시스템 공통: 탭 헤더를 "네비게이션"처럼 활용하는 패턴
-------------------------------------------------------------------------- */

function MantineAuditLogTabRender() {
  const [active, setActive] = useState(0)

  const logTabs = [
    { id: 'all', label: '전체', count: 248, color: '#6366f1' },
    { id: 'security', label: '보안', count: 12, color: '#ef4444' },
    { id: 'access', label: '접근', count: 87, color: '#f59e0b' },
    { id: 'changes', label: '변경', count: 63, color: '#3b82f6' },
    { id: 'system', label: '시스템', count: 44, color: '#8b5cf6' },
    { id: 'api', label: 'API', count: 31, color: '#10b981' },
    { id: 'export', label: '내보내기', count: 11, color: '#64748b' },
  ]

  const logEntries = [
    { time: '14:32', user: 'admin@corp.com', action: '사용자 권한 변경', severity: 'high' },
    { time: '14:18', user: 'dev@corp.com', action: 'API 키 재발급', severity: 'medium' },
    { time: '13:55', user: 'ops@corp.com', action: '서버 설정 업데이트', severity: 'low' },
    { time: '13:44', user: 'admin@corp.com', action: '팀 멤버 초대', severity: 'low' },
    { time: '13:20', user: 'qa@corp.com', action: '환경변수 접근', severity: 'medium' },
  ]

  const severityColor = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' } as const
  const current = logTabs[active]

  return (
    <div style={{ width: 420, border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
      <div style={{ padding: '14px 16px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>감사 로그</div>
        <ScrollableTabGroup selectedIndex={active} onTabChange={setActive}>
          {logTabs.map((tab) => (
            <ScrollableTabGroup.Tab key={tab.id} value={tab.id}>
              <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
              <ScrollableTabGroup.TabTrailing>
                <span style={{ fontSize: 9, fontWeight: 700, padding: '0px 5px', borderRadius: 99, background: active === logTabs.indexOf(tab) ? current.color + '20' : '#f1f5f9', color: active === logTabs.indexOf(tab) ? current.color : '#94a3b8' }}>
                  {tab.count}
                </span>
              </ScrollableTabGroup.TabTrailing>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {logEntries.map((entry, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < logEntries.length - 1 ? '1px solid #f8fafc' : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: severityColor[entry.severity as keyof typeof severityColor], flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>{entry.time}</span>
            <span style={{ fontSize: 11, color: '#64748b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.action}</span>
            <span style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{entry.user.split('@')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Mantine_감사_로그_탭: Story = {
  name: 'Mantine — 감사 로그 카테고리 탭 (count 뱃지 + 심각도 도트)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine Tabs의 우측 count indicator 패턴 적용. 각 로그 카테고리 탭에 활성 상태에 따라 색상이 변하는 count 배지 표시. 보안/접근/변경/시스템/API 분류로 감사 로그를 탐색하는 엔터프라이즈 패턴.',
      },
    },
  },
  render: () => <MantineAuditLogTabRender />,
}

function AntIssueStatusTabRender() {
  const [active, setActive] = useState(0)

  const statusTabs = [
    { id: 'open', label: '열린 이슈', count: 24, statusColor: '#3b82f6' },
    { id: 'inprogress', label: '진행 중', count: 8, statusColor: '#f59e0b' },
    { id: 'review', label: '리뷰 대기', count: 5, statusColor: '#8b5cf6' },
    { id: 'blocked', label: '차단됨', count: 3, statusColor: '#ef4444' },
    { id: 'done', label: '완료', count: 91, statusColor: '#10b981' },
    { id: 'closed', label: '닫힌 이슈', count: 147, statusColor: '#94a3b8' },
  ]

  const issues = [
    { id: 'ORB-241', title: '다크모드 전환 시 Slider 트랙 색상 깜빡임', priority: 'high', assignee: 'K', label: 'bug' },
    { id: 'ORB-238', title: 'Calendar disabled 날짜 키보드 접근성 개선', priority: 'medium', assignee: 'J', label: 'a11y' },
    { id: 'ORB-235', title: 'DataTable 헤더 고정 시 그림자 미적용 이슈', priority: 'medium', assignee: 'H', label: 'bug' },
    { id: 'ORB-232', title: 'SegmentedControl RTL 레이아웃 지원', priority: 'low', assignee: 'M', label: 'enhancement' },
  ]

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#94a3b8' } as const
  const labelColor: Record<string, { bg: string; text: string }> = {
    bug: { bg: '#fee2e2', text: '#dc2626' },
    a11y: { bg: '#ede9fe', text: '#7c3aed' },
    enhancement: { bg: '#dbeafe', text: '#2563eb' },
  }

  return (
    <div style={{ width: 440, border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
      <div style={{ padding: '14px 16px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          이슈 트래커
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: '#dbeafe', color: '#2563eb', fontWeight: 600 }}>Orbit UI</span>
        </div>
        <ScrollableTabGroup selectedIndex={active} onTabChange={setActive}>
          {statusTabs.map((tab, i) => (
            <ScrollableTabGroup.Tab key={tab.id} value={tab.id}>
              <ScrollableTabGroup.TabLeading>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: tab.statusColor }} />
              </ScrollableTabGroup.TabLeading>
              <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
              <ScrollableTabGroup.TabTrailing>
                <span style={{ fontSize: 9, color: active === i ? tab.statusColor : '#94a3b8', fontWeight: 700 }}>{tab.count}</span>
              </ScrollableTabGroup.TabTrailing>
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
      <div>
        {issues.map((issue, i) => (
          <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: i < issues.length - 1 ? '1px solid #f8fafc' : 'none', cursor: 'pointer' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor[issue.priority as keyof typeof priorityColor], flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>{issue.id}</span>
                <span style={{ fontSize: 11, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.title}</span>
              </div>
              <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 99, background: labelColor[issue.label]?.bg, color: labelColor[issue.label]?.text, fontWeight: 600 }}>{issue.label}</span>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#6366f1', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{issue.assignee}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Ant_이슈_상태_탭: Story = {
  name: 'Ant Design — 이슈 상태별 필터 탭 (상태 도트 + 담당자)',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Tabs의 상태 인디케이터 패턴 적용. 각 탭 앞에 상태 색상 도트를 배치하고 count를 탭 뒤에 표시. 이슈 트래커의 Open/InProgress/Review/Blocked/Done/Closed 6단계 상태를 탭으로 구현.',
      },
    },
  },
  render: () => <AntIssueStatusTabRender />,
}

function MantineAntAnalyticsTabRender() {
  const [active, setActive] = useState(0)

  const analyticsTabs = [
    { id: 'overview', label: '개요', icon: '◎' },
    { id: 'acquisition', label: '획득', icon: '↘' },
    { id: 'behavior', label: '행동', icon: '◇' },
    { id: 'conversion', label: '전환', icon: '↗' },
    { id: 'retention', label: '리텐션', icon: '↺' },
    { id: 'realtime', label: '실시간', icon: '●', live: true },
  ]

  const metrics = [
    [
      { label: '방문자', value: '24,831', change: +12.4, unit: '' },
      { label: '세션', value: '31,204', change: +8.1, unit: '' },
      { label: '이탈률', value: '38.2', change: -3.2, unit: '%' },
      { label: '평균 체류', value: '3:24', change: +11.0, unit: '' },
    ],
    [
      { label: '신규 사용자', value: '18,231', change: +22.1, unit: '' },
      { label: '유입 채널', value: '8', change: 0, unit: '개' },
      { label: '검색 유입', value: '42.8', change: +5.3, unit: '%' },
      { label: 'SNS 유입', value: '18.3', change: -2.1, unit: '%' },
    ],
  ]

  const currentMetrics = metrics[Math.min(active, metrics.length - 1)]

  return (
    <div style={{ width: 440, border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
      <div style={{ padding: '14px 16px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>애널리틱스</div>
        <ScrollableTabGroup selectedIndex={active} onTabChange={setActive}>
          {analyticsTabs.map((tab) => (
            <ScrollableTabGroup.Tab key={tab.id} value={tab.id}>
              <ScrollableTabGroup.TabLeading>
                <span style={{ fontSize: 10, color: tab.live ? '#ef4444' : '#94a3b8' }}>{tab.icon}</span>
              </ScrollableTabGroup.TabLeading>
              <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
              {tab.live && (
                <ScrollableTabGroup.TabTrailing>
                  <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 99, background: '#fee2e2', color: '#dc2626', fontWeight: 700 }}>LIVE</span>
                </ScrollableTabGroup.TabTrailing>
              )}
            </ScrollableTabGroup.Tab>
          ))}
        </ScrollableTabGroup>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {currentMetrics.map((m) => (
            <div key={m.label} style={{ padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{m.value}<span style={{ fontSize: 11 }}>{m.unit}</span></div>
              {m.change !== 0 && (
                <div style={{ fontSize: 10, color: m.change > 0 ? '#10b981' : '#ef4444', marginTop: 2 }}>
                  {m.change > 0 ? '▲' : '▼'} {Math.abs(m.change)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Mantine_Ant_애널리틱스_탭: Story = {
  name: 'Mantine + Ant Design — 애널리틱스 지표 탭 (LIVE 배지 + 지표 카드)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine 탭의 아이콘+텍스트 조합 + Ant Design 실시간 인디케이터 패턴. 애널리틱스 대시보드 탭 — 개요/획득/행동/전환/리텐션/실시간(LIVE 배지). 각 탭 전환 시 해당 지표 카드 그리드 표시.',
      },
    },
  },
  render: () => <MantineAntAnalyticsTabRender />,
}
