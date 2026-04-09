import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { FixedTabs } from './TabGroup'

const meta = {
  title: 'eclipse/Actions/Tabs/FixedTabs',
  component: FixedTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof FixedTabs>

type Story = StoryObj<typeof meta>

export default meta

const contentByIndex: Record<number, React.ReactNode> = {
  0: (
    <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>Overview</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)', lineHeight: '1.6' }}>
        This tab shows the general overview. View key metrics, recent updates, and project summaries.
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
        {[{ label: 'Total', value: '48' }, { label: 'Done', value: '32' }, { label: 'Active', value: '10' }].map((s) => (
          <div key={s.label} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)', border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)', textAlign: 'center' }}>
            <div style={{ fontWeight: '800', fontSize: '20px', color: '#6366f1' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--sem-eclipse-color-foregroundTertiary, #94a3b8)', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  1: (
    <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '10px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>Components</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Button', 'TextField', 'Modal', 'Dropdown', 'Calendar', 'DataTable', 'Slider', 'Progress', 'Accordion', 'Chip'].map((name) => (
          <span key={name} style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>{name}</span>
        ))}
      </div>
    </div>
  ),
  2: (
    <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>Settings</div>
      {['Dark Mode', 'Compact Layout', 'Analytics', 'Notifications'].map((setting, i) => (
        <div key={setting} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--sem-eclipse-color-borderSecondary, #f1f5f9)' : 'none' }}>
          <span style={{ fontSize: '14px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>{setting}</span>
          <div style={{ width: '38px', height: '20px', borderRadius: '10px', background: '#6366f1', position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', right: '2px', top: '2px' }} />
          </div>
        </div>
      ))}
    </div>
  ),
}

const FixedTabsInteractiveDemo = () => {
  const [selected, setSelected] = useState(0)
  return (
    <div style={{ width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
        <FixedTabs.Tab value="overview">
          <FixedTabs.TabCenter>Overview</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="components">
          <FixedTabs.TabCenter>Components</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="settings">
          <FixedTabs.TabCenter>Settings</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
      <div style={{ minHeight: '140px', transition: 'all 0.2s ease' }}>
        {contentByIndex[selected]}
      </div>
    </div>
  )
}

export const 기본 = {
  render() {
    return <FixedTabsInteractiveDemo />
  },
} satisfies Story

export const 디자인QA = {
  args: {
    tabCount: 3,
    defaultValue: 'tab-0',
  },
  argTypes: {
    tabCount: {
      control: 'number',
      min: 1,
      max: 5,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render({ tabCount, defaultValue }: any) {
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <FixedTabs defaultValue={defaultValue}>
          {Array.from({ length: tabCount }).map((_, index) => (
            <FixedTabs.Tab key={index} value={`tab-${index}`}>
              <FixedTabs.TabCenter>Tab {index + 1}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
    )
  },
}
