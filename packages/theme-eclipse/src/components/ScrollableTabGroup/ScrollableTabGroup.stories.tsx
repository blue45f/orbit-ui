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
