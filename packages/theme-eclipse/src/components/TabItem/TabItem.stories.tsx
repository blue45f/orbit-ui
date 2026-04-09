import { AwesomeIcon, HomeLineIcon, PeopleLineIcon, SettingLineIcon, NotificationLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Tab } from './TabItem'

Tab.displayName = 'Tab'
Tab.Leading.displayName = 'Tab.Leading'
Tab.Center.displayName = 'Tab.Center'
Tab.Trailing.displayName = 'Tab.Trailing'

const meta = {
  title: 'eclipse/Actions/Tabs/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    selected: false,
  },
} satisfies Meta<typeof Tab>

type Story = StoryObj<typeof meta>

export default meta

const navTabs = [
  { value: 'home', label: 'Home', Icon: HomeLineIcon },
  { value: 'people', label: 'People', Icon: PeopleLineIcon },
  { value: 'notif', label: 'Alerts', Icon: NotificationLineIcon },
  { value: 'settings', label: 'Settings', Icon: SettingLineIcon },
]

const tabContent: Record<string, React.ReactNode> = {
  home: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>🏠 Home</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>{'Welcome to your dashboard. Check out what\'s new today.'}</div>
    </div>
  ),
  people: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>👥 People</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>Manage your team members and collaborators here.</div>
    </div>
  ),
  notif: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>🔔 Alerts</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>You have 3 unread notifications. Tap to view them.</div>
    </div>
  ),
  settings: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>⚙️ Settings</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>Customize your preferences, theme, and account details.</div>
    </div>
  ),
}

const TabInteractiveDemo = () => {
  const [active, setActive] = useState('home')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--sem-eclipse-color-borderSecondary, #f1f5f9)' }}>
        {navTabs.map(({ value, label, Icon }) => (
          <Tab
            key={value}
            value={value}
            selected={active === value}
            onClick={() => setActive(value)}
          >
            <Tab.Leading>
              <Icon size={18} />
            </Tab.Leading>
            <Tab.Center>{label}</Tab.Center>
          </Tab>
        ))}
      </div>
      <div style={{ minHeight: '80px' }}>
        {tabContent[active]}
      </div>
    </div>
  )
}

export const 기본 = {
  render: (_args: React.ComponentProps<typeof Tab>) => {
    return <TabInteractiveDemo />
  },
} satisfies Story

export const 디자인QA = {
  args: {
    value: '기본탭',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading, trailing, ...args }: any) => {
    return (
      <Tab {...args}>
        {leading && (
          <Tab.Leading>
            <AwesomeIcon size={24} />
          </Tab.Leading>
        )}
        <Tab.Center>{args.value}</Tab.Center>
        {trailing && (
          <Tab.Trailing>
            <AwesomeIcon size={24} />
          </Tab.Trailing>
        )}
      </Tab>
    )
  },
}
