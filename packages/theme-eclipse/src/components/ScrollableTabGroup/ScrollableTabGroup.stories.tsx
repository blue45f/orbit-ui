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
