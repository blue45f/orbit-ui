import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import {
  Accordion,
  AppBar,
  Avatar,
  Breadcrumb,
  Carousel,
  Chip,
  DataTable,
  Divider,
  LabelBadge,
  PageDots,
  Progress,
  RadioButton,
  Slider,
  SolidButton,
  SolidIconButton,
  Switch,
  Text,
  TextField,
} from '../index'

import { OutlineButton } from '../components/OutlineButton'
import { GhostButton } from '../components/GhostButton'

import {
  MenuIcon,
  SearchIcon,
  HomeLineIcon,
  SettingLineIcon,
  PeopleLineIcon,
  NotificationLineIcon,
  ChevronRightLineIcon,
  ListLineIcon,
} from '@orbit-ui/icons'

const meta: Meta = {
  title: 'Templates/Showcase',
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj

/*
 * Theme-aware semantic colors using CSS variables.
 * These fall back to light-mode values for safety.
 */
const tc = {
  bg: 'var(--sem-color-background-primary, #ffffff)',
  surface: 'var(--sem-color-surface-container, #f8fafc)',
  fg: 'var(--sem-color-foreground-primary, #1e293b)',
  fgSub: 'var(--sem-color-foreground-secondary, #64748b)',
  fgMuted: 'var(--sem-color-foreground-tertiary, #94a3b8)',
  border: 'var(--sem-color-border-primary, #e2e8f0)',
  borderSub: 'var(--sem-color-border-secondary, #f1f5f9)',
}

/* ═══════════════════════════════════════════
   1. Admin Dashboard (PC)
   ═══════════════════════════════════════════ */
const AdminDashboardRender = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard')

    const metrics = [
      { label: 'Total Users', value: '12,847', change: '+12.5%', progress: 78 },
      { label: 'Revenue', value: '$48,290', change: '+8.2%', progress: 65 },
      { label: 'Active Sessions', value: '1,429', change: '+23.1%', progress: 90 },
    ]

    const users = [
      { id: 1, name: 'Kim Jihye', email: 'jihye@company.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Park Minjun', email: 'minjun@company.com', role: 'Editor', status: 'Active' },
      { id: 3, name: 'Lee Soyeon', email: 'soyeon@company.com', role: 'Viewer', status: 'Pending' },
      { id: 4, name: 'Choi Dongwook', email: 'dongwook@company.com', role: 'Editor', status: 'Active' },
      { id: 5, name: 'Yoon Haerin', email: 'haerin@company.com', role: 'Viewer', status: 'Inactive' },
    ]

    const menuItems = [
      { id: 'dashboard', icon: HomeLineIcon, label: 'Dashboard' },
      { id: 'users', icon: PeopleLineIcon, label: 'Users' },
      { id: 'settings', icon: SettingLineIcon, label: 'Settings' },
    ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: tc.surface }}>
      {/* Sidebar */}
        <aside style={{
          width: '260px', background: tc.bg, borderRight: `1px solid ${tc.border}`,
          display: 'flex', flexDirection: 'column', padding: '24px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', padding: '0 12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', fontSize: '14px', fontWeight: '800',
            }}>O</div>
            <Text textStyle="h4">Orbit Admin</Text>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: isActive ? '#6366f1' : 'transparent',
                    color: isActive ? '#ffffff' : tc.fgSub,
                    fontSize: '14px', fontWeight: isActive ? '600' : '400',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', padding: '0 12px' }}>
            <Avatar />
            <div>
              <Text textStyle="body2" style={{ display: 'block', fontWeight: '600' }}>Admin User</Text>
              <Text textStyle="caption" color="gray-500">admin@orbit.io</Text>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <header style={{
            height: '64px', background: tc.bg, borderBottom: `1px solid ${tc.border}`,
            padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '220px' }}>
                <TextField placeholder="Search..." />
              </div>
              <SolidIconButton color="black" size="small">
                <NotificationLineIcon size={20} />
              </SolidIconButton>
            </div>
          </header>

          <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <Text textStyle="h2" style={{ display: 'block', marginBottom: '4px' }}>Overview</Text>
                <Text textStyle="body2" color="gray-500">{'Welcome back. Here\'s your dashboard summary.'}</Text>
              </div>
              <SolidButton size="medium" color="black">Export Report</SolidButton>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
              {metrics.map((m, i) => (
                <div key={i} style={{
                  padding: '24px', borderRadius: '16px', background: tc.bg,
                  border: `1px solid ${tc.border}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <Text textStyle="caption" color="gray-500" style={{ display: 'block', marginBottom: '6px' }}>{m.label}</Text>
                      <Text textStyle="h2" style={{ display: 'block' }}>{m.value}</Text>
                    </div>
                    <span style={{
                      padding: '4px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '600',
                      background: 'rgba(16, 185, 129, 0.1)', color: '#10b981',
                    }}>{m.change}</span>
                  </div>
                  <Progress value={m.progress} />
                </div>
              ))}
            </div>

            <div style={{
              background: tc.bg, borderRadius: '16px', border: `1px solid ${tc.border}`,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Text textStyle="h4">Team Members</Text>
                <OutlineButton size="small" color="black">View All</OutlineButton>
              </div>
              <DataTable
                columns={[
                  { accessorKey: 'name', header: 'Name' },
                  { accessorKey: 'email', header: 'Email' },
                  { accessorKey: 'role', header: 'Role', cell: (info: any) => <Chip>{String(info.getValue())}</Chip> },
                  {
                    accessorKey: 'status', header: 'Status',
                    cell: (info: any) => {
                      const status = String(info.getValue())
                      const colorMap = { Active: 'benefit', Pending: 'gray', Inactive: 'gray' } as const
                      const color = colorMap[status as keyof typeof colorMap] ?? 'gray'
                      return <LabelBadge color={color}><LabelBadge.Label>{status}</LabelBadge.Label></LabelBadge>
                    }
                  },
                ]}
                data={users}
              />
            </div>
          </main>
        </div>
      </div>
    )
}

export const AdminDashboard: Story = {
  render: () => <AdminDashboardRender />,
}

/* ═══════════════════════════════════════════
   2. Mobile App (Mobile)
   ═══════════════════════════════════════════ */
const MobileAppRender = () => {
    const [activeTab, setActiveTab] = useState('foryou')
    const [activeNav, setActiveNav] = useState('home')

    const tabs = [
      { id: 'foryou', label: 'For You' },
      { id: 'trending', label: 'Trending' },
      { id: 'news', label: 'News' },
      { id: 'sports', label: 'Sports' },
    ]

    const feedItems = [
      { name: 'Kim Yeji', desc: 'New post about design systems', time: '2m ago' },
      { name: 'Park Seonghun', desc: 'Shared a project update', time: '15m ago' },
      { name: 'Lee Jimin', desc: 'Commented on your review', time: '1h ago' },
      { name: 'Choi Yuna', desc: 'Published a new article', time: '3h ago' },
    ]

    const navItems = [
      { id: 'home', icon: HomeLineIcon, label: 'Home' },
      { id: 'explore', icon: SearchIcon, label: 'Explore' },
      { id: 'list', icon: ListLineIcon, label: 'List' },
      { id: 'settings', icon: SettingLineIcon, label: 'Settings' },
    ]

    return (
      <div style={{
        width: '375px', height: '812px', background: tc.bg,
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${tc.border}`, borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      }}>
        <div style={{
          height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: '600', color: tc.fg,
        }}>
          9:41
        </div>

        <AppBar>
          <AppBar.Leading>
            <GhostButton size="small" color="black"><MenuIcon size={24} /></GhostButton>
          </AppBar.Leading>
          <AppBar.Center>Feed</AppBar.Center>
          <AppBar.Trailing>
            <GhostButton size="small" color="black"><SearchIcon size={24} /></GhostButton>
          </AppBar.Trailing>
        </AppBar>

        <div style={{
          display: 'flex', borderBottom: `1px solid ${tc.borderSub}`,
          padding: '0 16px',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 16px', border: 'none', cursor: 'pointer',
                background: 'transparent', fontSize: '14px',
                fontWeight: activeTab === tab.id ? '700' : '400',
                color: activeTab === tab.id ? tc.fg : tc.fgMuted,
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >{tab.label}</button>
          ))}
        </div>

        <div style={{ height: 'calc(100% - 172px)', overflowY: 'auto', paddingBottom: '80px' }}>
          <Carousel style={{ margin: '16px 0' }}>
            <Carousel.Item>
              <div style={{
                height: '160px', margin: '0 16px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '8px',
              }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>Spring Campaign</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Check out the latest updates</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{
                height: '160px', margin: '0 16px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '8px',
              }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>New Feature</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Dark mode is here</span>
              </div>
            </Carousel.Item>
          </Carousel>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
            <PageDots selected={true} />
            <PageDots selected={false} />
          </div>

          {feedItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '14px',
                cursor: 'pointer',
              }}>
                <Avatar />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <Text textStyle="body2" style={{ fontWeight: '600' }}>{item.name}</Text>
                    <Text textStyle="caption" color="gray-400">{item.time}</Text>
                  </div>
                  <Text textStyle="body2" color="gray-500" style={{
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block',
                  }}>{item.desc}</Text>
                </div>
                <ChevronRightLineIcon size={20} color={tc.fgMuted} />
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '80px', background: tc.bg,
          borderTop: `1px solid ${tc.borderSub}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingBottom: '16px',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 12px',
                }}
              >
                <Icon size={24} color={isActive ? '#6366f1' : tc.fgMuted} />
                <span style={{
                  fontSize: '10px', fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#6366f1' : tc.fgMuted,
                }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
}

export const MobileApp: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <MobileAppRender />,
}

/* ═══════════════════════════════════════════
   3. Settings Page (Tablet/PC)
   ═══════════════════════════════════════════ */
const SettingsPageRender = () => {
    const [emailNotif, setEmailNotif] = useState(true)
    const [pushNotif, setPushNotif] = useState(false)

    const cardStyle: React.CSSProperties = {
      padding: '28px', borderRadius: '16px', background: tc.bg,
      border: `1px solid ${tc.border}`,
    }

    return (
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: '36px' }}>
          <Text textStyle="h2" style={{ display: 'block', marginBottom: '4px' }}>Account Settings</Text>
          <Text textStyle="body2" color="gray-500">Manage your account preferences and personal information.</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px' }}>Profile</Text>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar />
                <GhostButton size="small" color="black" style={{ marginTop: '8px', fontSize: '12px' }}>
                  Change
                </GhostButton>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <TextField label="Display Name" placeholder="Enter your name" />
                <TextField label="Email" value="user@example.com" disabled />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <SolidButton size="medium" color="black">Save Changes</SolidButton>
                  <OutlineButton size="medium" color="black">Cancel</OutlineButton>
                </div>
              </div>
            </div>
          </section>

          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px' }}>Notifications</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text textStyle="body1" style={{ display: 'block', fontWeight: '500' }}>Email Notifications</Text>
                  <Text textStyle="body2" color="gray-500">Receive updates and alerts via email.</Text>
                </div>
                <Switch checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text textStyle="body1" style={{ display: 'block', fontWeight: '500' }}>Push Notifications</Text>
                  <Text textStyle="body2" color="gray-500">Receive push notifications on your device.</Text>
                </div>
                <Switch checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
              </div>
            </div>
          </section>

          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px' }}>Preferences</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <Text textStyle="body1" style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Theme</Text>
                <Text textStyle="body2" color="gray-500" style={{ display: 'block', marginBottom: '12px' }}>Choose your preferred appearance.</Text>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  {['Light', 'Dark', 'System'].map((v) => (
                    <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <RadioButton name="theme-setting" value={v.toLowerCase()} defaultChecked={v === 'Light'} />
                      <Text textStyle="body2">{v}</Text>
                    </label>
                  ))}
                </div>
              </div>
              <Divider />
              <div>
                <Text textStyle="body1" style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Content Filter</Text>
                <Text textStyle="body2" color="gray-500" style={{ display: 'block', marginBottom: '12px' }}>Adjust content sensitivity level.</Text>
                <Slider defaultValue={[50]} min={0} max={100} />
              </div>
            </div>
          </section>

          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px' }}>FAQ</Text>
            <Accordion type="single" collapsible>
              <Accordion.Item value="1" title="How do I change my password?">
                {'Navigate to Security settings and click "Change Password". You\'ll need to verify your current password first.'}
              </Accordion.Item>
              <Accordion.Item value="2" title="Where can I find my invoices?">
                Invoices are emailed monthly and can be downloaded from the Billing section in your account.
              </Accordion.Item>
              <Accordion.Item value="3" title="How do I delete my account?">
                Please contact support at help@orbit.io. Account deletion is permanent and cannot be undone.
              </Accordion.Item>
            </Accordion>
          </section>
        </div>
      </div>
    )
}

export const SettingsPage: Story = {
  render: () => <SettingsPageRender />,
}

/* ═══════════════════════════════════════════
   4. Landing Page (PC)
   ═══════════════════════════════════════════ */
const PcLandingRender = () => {
    return (
      <div style={{ background: tc.bg, minHeight: '100vh' }}>
        <header style={{
          padding: '0 48px', height: '64px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: `1px solid ${tc.borderSub}`,
          position: 'sticky', top: 0, background: tc.bg, zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', fontSize: '12px', fontWeight: '800',
            }}>O</div>
            <Text textStyle="h4">Orbit UI</Text>
          </div>
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {['Components', 'Templates', 'Docs'].map((item) => (
              <Text key={item} textStyle="body2" color="gray-500" style={{ cursor: 'pointer' }}>{item}</Text>
            ))}
            <SolidButton size="small" color="primary">Get Started</SolidButton>
          </nav>
        </header>

        <section style={{
          padding: '100px 48px 80px', textAlign: 'center',
          background: tc.surface,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            marginBottom: '24px', fontSize: '13px', fontWeight: '600', color: '#6366f1',
          }}>
            v2.0 Released
          </div>
          <h1 style={{
            fontSize: '56px', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.1',
            margin: '0 0 20px', color: tc.fg,
          }}>
            Build Beautiful Interfaces<br/>Faster Than Ever
          </h1>
          <p style={{
            fontSize: '18px', color: tc.fgSub, lineHeight: '1.7',
            maxWidth: '560px', margin: '0 auto 40px',
          }}>
            A production-ready React design system with 50+ components,
            built for scale, performance, and delightful user experiences.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <SolidButton size="large" color="primary">Documentation</SolidButton>
            <OutlineButton size="large" color="black">View on GitHub</OutlineButton>
          </div>
        </section>

        <section style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <Text textStyle="caption" style={{ color: '#6366f1', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Features</Text>
            <Text textStyle="h2" style={{ display: 'block' }}>Everything you need</Text>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { title: 'Accessible', desc: 'WAI-ARIA compliant with keyboard navigation and screen reader support.', color: '#6366f1' },
              { title: 'Customizable', desc: 'Headless 3-tier architecture with design token system for full control.', color: '#8b5cf6' },
              { title: 'Developer Experience', desc: 'Full TypeScript support, compound components, and Storybook docs.', color: '#3b82f6' },
              { title: 'Performance', desc: 'Tree-shakeable, code-split, and optimized for smallest bundle size.', color: '#10b981' },
              { title: 'Dark Mode', desc: 'First-class dark mode via EclipseProvider with seamless switching.', color: '#f59e0b' },
              { title: 'SSR Ready', desc: 'Built-in Next.js support with getTheme() for flash-free rendering.', color: '#ef4444' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '28px', borderRadius: '16px',
                border: `1px solid ${tc.border}`,
                background: tc.bg,
              }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: f.color, marginBottom: '16px',
                }} />
                <Text textStyle="body1" style={{ display: 'block', fontWeight: '700', marginBottom: '8px' }}>{f.title}</Text>
                <Text textStyle="body2" color="gray-500">{f.desc}</Text>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '80px 48px', textAlign: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Start building today
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: '0 0 32px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get Orbit UI up and running in minutes with a single install command.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '14px 24px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', color: '#e2e8f0',
          }}>
            pnpm add @orbit-ui/theme-eclipse
          </div>
        </section>
      </div>
    )
}

export const PcLanding: Story = {
  render: () => <PcLandingRender />,
}
