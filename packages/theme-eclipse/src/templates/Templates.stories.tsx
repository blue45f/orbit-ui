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
  ListLineIcon,
} from '@heejun-com/icons'

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
  bg: 'var(--sem-eclipse-color-backgroundPrimary, #ffffff)',
  surface: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)',
  surfaceElevated: 'var(--sem-eclipse-color-surfaceContainerHigh, #f1f5f9)',
  fg: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)',
  fgSub: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)',
  fgMuted: 'var(--sem-eclipse-color-foregroundTertiary, #94a3b8)',
  border: 'var(--sem-eclipse-color-borderPrimary, #e2e8f0)',
  borderSub: 'var(--sem-eclipse-color-borderSecondary, #f1f5f9)',
  separator: 'var(--sem-eclipse-color-separatorPrimary, #e2e8f0)',
  fillPrimary: 'var(--sem-eclipse-color-fillPrimary, #6366f1)',
}

/* ═══════════════════════════════════════════
   1. Admin Dashboard (PC)
   ═══════════════════════════════════════════ */
const AdminDashboardRender = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const metrics = [
    { label: 'Total Users', value: '12,847', change: '+12.5%', changeColor: '#10b981', changeBg: 'rgba(16,185,129,0.1)', progress: 78, icon: '👥' },
    { label: 'Monthly Revenue', value: '$48,290', change: '+8.2%', changeColor: '#10b981', changeBg: 'rgba(16,185,129,0.1)', progress: 65, icon: '💰' },
    { label: 'Active Sessions', value: '1,429', change: '+23.1%', changeColor: '#10b981', changeBg: 'rgba(16,185,129,0.1)', progress: 90, icon: '🔴' },
    { label: 'Bounce Rate', value: '24.3%', change: '-3.2%', changeColor: '#ef4444', changeBg: 'rgba(239,68,68,0.1)', progress: 24, icon: '📉' },
  ]

  const users = [
    { id: 1, name: 'Kim Jihye', email: 'jihye@company.com', role: 'Admin', status: 'Active', joined: 'Jan 2024' },
    { id: 2, name: 'Park Minjun', email: 'minjun@company.com', role: 'Editor', status: 'Active', joined: 'Feb 2024' },
    { id: 3, name: 'Lee Soyeon', email: 'soyeon@company.com', role: 'Viewer', status: 'Pending', joined: 'Mar 2024' },
    { id: 4, name: 'Choi Dongwook', email: 'dongwook@company.com', role: 'Editor', status: 'Active', joined: 'Mar 2024' },
    { id: 5, name: 'Yoon Haerin', email: 'haerin@company.com', role: 'Viewer', status: 'Inactive', joined: 'Apr 2024' },
  ]

  const menuItems = [
    { id: 'dashboard', icon: HomeLineIcon, label: 'Dashboard' },
    { id: 'users', icon: PeopleLineIcon, label: 'Users' },
    { id: 'notifications', icon: NotificationLineIcon, label: 'Notifications' },
    { id: 'settings', icon: SettingLineIcon, label: 'Settings' },
  ]

  const recentActivity = [
    { user: 'Kim Jihye', action: 'Updated team settings', time: '2m ago', type: 'settings' },
    { user: 'Park Minjun', action: 'Published new content', time: '15m ago', type: 'publish' },
    { user: 'Lee Soyeon', action: 'Joined the workspace', time: '1h ago', type: 'join' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: tc.surface, fontFamily: 'inherit' }}>
      {/* Sidebar */}
      <aside style={{
        width: '256px', background: tc.bg, borderRight: `1px solid ${tc.border}`,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${tc.borderSub}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '15px', fontWeight: '800', flexShrink: 0,
            }}>O</div>
            <div>
              <Text textStyle="body1" style={{ display: 'block', fontWeight: '700', lineHeight: '1.2' }}>Orbit Admin</Text>
              <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '11px' }}>v2.0 Pro</Text>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 8px 4px' }}>Main</Text>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                  color: isActive ? '#6366f1' : tc.fgSub,
                  fontSize: '14px', fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.15s ease', textAlign: 'left', width: '100%',
                }}
              >
                <Icon size={18} />
                {item.label}
                {item.id === 'notifications' && (
                  <span style={{
                    marginLeft: 'auto', background: '#ef4444', color: '#fff',
                    fontSize: '10px', fontWeight: '700', borderRadius: '100px',
                    padding: '1px 6px', lineHeight: '16px',
                  }}>3</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '12px 16px 20px', borderTop: `1px solid ${tc.borderSub}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text textStyle="body2" style={{ display: 'block', fontWeight: '600', lineHeight: '1.3' }}>Admin User</Text>
              <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '11px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>admin@orbit.io</Text>
            </div>
            <SolidIconButton size="small" color="black" style={{ flexShrink: 0 }}>
              <SettingLineIcon size={16} />
            </SolidIconButton>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{
          height: '60px', background: tc.bg, borderBottom: `1px solid ${tc.border}`,
          padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '200px' }}>
              <TextField placeholder="Search..." />
            </div>
            <SolidIconButton color="black" size="small">
              <NotificationLineIcon size={18} />
            </SolidIconButton>
            <Avatar />
          </div>
        </header>

        {/* Page Body */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <Text textStyle="h2" style={{ display: 'block', marginBottom: '4px' }}>Overview</Text>
              <Text textStyle="body2" style={{ color: tc.fgSub }}>{'Welcome back! Here\'s your dashboard summary.'}</Text>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <OutlineButton size="small" color="black">Filter</OutlineButton>
              <SolidButton size="small" color="black">Export Report</SolidButton>
            </div>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px', background: tc.bg,
                border: `1px solid ${tc.border}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <Text textStyle="caption" style={{ color: tc.fgMuted, display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</Text>
                    <Text textStyle="h3" style={{ display: 'block', fontWeight: '800' }}>{m.value}</Text>
                  </div>
                  <span style={{ fontSize: '20px' }}>{m.icon}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: '700', background: m.changeBg, color: m.changeColor }}>{m.change} vs last month</span>
                </div>
                <Progress value={m.progress} />
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
            {/* Table */}
            <div style={{ background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}`, padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Text textStyle="h4" style={{ fontWeight: '700' }}>Team Members</Text>
                <OutlineButton size="small" color="black">View All</OutlineButton>
              </div>
              <DataTable
                columns={[
                  { accessorKey: 'name', header: 'Name' },
                  { accessorKey: 'email', header: 'Email' },
                  { accessorKey: 'role', header: 'Role', cell: (info: any) => <Chip>{String(info.getValue())}</Chip> },
                  { accessorKey: 'joined', header: 'Joined' },
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

            {/* Activity Feed */}
            <div style={{ background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}`, padding: '20px' }}>
              <Text textStyle="h4" style={{ display: 'block', fontWeight: '700', marginBottom: '16px' }}>Recent Activity</Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {recentActivity.map((item, i) => (
                  <React.Fragment key={i}>
                    <div style={{ display: 'flex', gap: '12px', padding: '12px 0' }}>
                      <Avatar />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text textStyle="body2" style={{ display: 'block', fontWeight: '600', marginBottom: '2px' }}>{item.user}</Text>
                        <Text textStyle="caption" style={{ color: tc.fgSub, display: 'block', marginBottom: '4px' }}>{item.action}</Text>
                        <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '11px' }}>{item.time}</Text>
                      </div>
                    </div>
                    {i < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${tc.borderSub}` }}>
                <GhostButton size="small" color="black" style={{ width: '100%', justifyContent: 'center' }}>View All Activity</GhostButton>
              </div>
            </div>
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
   2. Mobile App (Mobile) — Tab-based feed
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

  const navItems = [
    { id: 'home', icon: HomeLineIcon, label: 'Home' },
    { id: 'explore', icon: SearchIcon, label: 'Explore' },
    { id: 'list', icon: ListLineIcon, label: 'List' },
    { id: 'settings', icon: SettingLineIcon, label: 'Settings' },
  ]

  const tabContent: Record<string, React.ReactNode> = {
    foryou: (
      <div>
        {/* Hero Banner Carousel */}
        <Carousel style={{ margin: '16px 0 0' }}>
          <Carousel.Item>
            <div style={{
              height: '156px', margin: '0 16px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px',
            }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Featured</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff', lineHeight: '1.2' }}>Spring Design Campaign</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{
              height: '156px', margin: '0 16px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px',
            }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>New</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff', lineHeight: '1.2' }}>Dark Mode is Here</span>
            </div>
          </Carousel.Item>
        </Carousel>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', margin: '10px 0 16px' }}>
          <PageDots selected={true} />
          <PageDots selected={false} />
        </div>

        {/* Section Header */}
        <div style={{ padding: '0 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text textStyle="body2" style={{ fontWeight: '700' }}>Following</Text>
          <Text textStyle="caption" style={{ color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>See all</Text>
        </div>

        {/* Feed Items */}
        {[
          { name: 'Kim Yeji', role: 'Designer', action: 'Published a design system guide', time: '2m ago', tag: 'Design' },
          { name: 'Park Seonghun', role: 'Engineer', action: 'Shared a React performance tip', time: '15m ago', tag: 'Dev' },
          { name: 'Lee Jimin', role: 'PM', action: 'Posted a new product roadmap', time: '1h ago', tag: 'Product' },
          { name: 'Choi Yuna', role: 'Writer', action: 'Published: "UX Writing in 2025"', time: '3h ago', tag: 'UX' },
        ].map((item, idx, arr) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 16px', gap: '12px', cursor: 'pointer' }}>
              <Avatar />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <div>
                    <Text textStyle="body2" style={{ fontWeight: '700' }}>{item.name}</Text>
                    <Text textStyle="caption" style={{ color: tc.fgMuted, marginLeft: '6px' }}>{item.role}</Text>
                  </div>
                  <Text textStyle="caption" style={{ color: tc.fgMuted }}>{item.time}</Text>
                </div>
                <Text textStyle="body2" style={{ color: tc.fgSub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', marginBottom: '8px' }}>{item.action}</Text>
                <Chip>{item.tag}</Chip>
              </div>
            </div>
            {idx < arr.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    ),

    trending: (
      <div style={{ padding: '16px' }}>
        <Text textStyle="body2" style={{ display: 'block', fontWeight: '700', marginBottom: '12px', color: tc.fg }}>Trending Now 🔥</Text>
        {[
          { rank: 1, topic: '#DesignSystems', posts: '24.5K posts', color: '#6366f1', growth: '+142%' },
          { rank: 2, topic: '#ReactNative', posts: '18.2K posts', color: '#8b5cf6', growth: '+89%' },
          { rank: 3, topic: '#AI_UX', posts: '15.8K posts', color: '#3b82f6', growth: '+76%' },
          { rank: 4, topic: '#OrbitUI', posts: '9.1K posts', color: '#10b981', growth: '+234%' },
          { rank: 5, topic: '#TypeScript', posts: '7.3K posts', color: '#f59e0b', growth: '+45%' },
        ].map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '14px', borderRadius: '12px', marginBottom: '8px',
            border: `1px solid ${tc.border}`, background: tc.bg, cursor: 'pointer',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', background: `${t.color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '800', color: t.color, flexShrink: 0,
            }}>{t.rank}</div>
            <div style={{ flex: 1 }}>
              <Text textStyle="body2" style={{ display: 'block', fontWeight: '700', color: t.color }}>{t.topic}</Text>
              <Text textStyle="caption" style={{ color: tc.fgMuted }}>{t.posts}</Text>
            </div>
            <span style={{
              fontSize: '11px', fontWeight: '700', color: '#10b981',
              background: 'rgba(16,185,129,0.1)', padding: '2px 7px', borderRadius: '100px',
            }}>{t.growth}</span>
          </div>
        ))}

        <Text textStyle="body2" style={{ display: 'block', fontWeight: '700', marginBottom: '12px', marginTop: '20px', color: tc.fg }}>Suggested Creators</Text>
        {[
          { name: 'Design Weekly', followers: '128K', tag: 'Design' },
          { name: 'Code.log', followers: '86K', tag: 'Dev' },
          { name: 'UX Academy', followers: '54K', tag: 'UX' },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px', borderRadius: '12px', marginBottom: '8px',
            border: `1px solid ${tc.border}`, background: tc.bg,
          }}>
            <Avatar />
            <div style={{ flex: 1 }}>
              <Text textStyle="body2" style={{ display: 'block', fontWeight: '600' }}>{c.name}</Text>
              <Text textStyle="caption" style={{ color: tc.fgMuted }}>{c.followers} followers</Text>
            </div>
            <Chip>{c.tag}</Chip>
          </div>
        ))}
      </div>
    ),

    news: (
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <Text textStyle="body2" style={{ fontWeight: '700' }}>Top Stories</Text>
          <LabelBadge color="benefit"><LabelBadge.Label>Live</LabelBadge.Label></LabelBadge>
        </div>

        {/* Featured Story */}
        <div style={{
          borderRadius: '14px', overflow: 'hidden', marginBottom: '16px',
          border: `1px solid ${tc.border}`, background: tc.bg, cursor: 'pointer',
        }}>
          <div style={{
            height: '120px', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px',
          }}>
            <LabelBadge color="benefit" style={{ marginBottom: '8px' }}><LabelBadge.Label>Breaking</LabelBadge.Label></LabelBadge>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff', lineHeight: '1.3' }}>Global Tech Summit 2025 Kicks Off in Seoul</span>
          </div>
          <div style={{ padding: '12px 14px' }}>
            <Text textStyle="caption" style={{ color: tc.fgSub }}>World leaders and tech executives gather to discuss AI regulation and digital infrastructure. 500K+ watching live.</Text>
            <Text textStyle="caption" style={{ color: tc.fgMuted, display: 'block', marginTop: '8px' }}>TechNews · 3 min ago</Text>
          </div>
        </div>

        {/* Story List */}
        {[
          { headline: 'Orbit UI v2 Tops ProductHunt with 4,200 upvotes', source: 'Design Weekly', time: '12m ago', category: 'Design' },
          { headline: 'TypeScript 6.0 Release Brings Improved Type Inference', source: 'Dev.to', time: '45m ago', category: 'Dev' },
          { headline: 'Remote Work Adoption Surges 34% in Asia Pacific', source: 'Business Insider', time: '2h ago', category: 'Business' },
          { headline: 'New Study: 78% of Users Prefer Dark Mode Applications', source: 'UX Research', time: '4h ago', category: 'UX' },
        ].map((item, i, arr) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', gap: '12px', padding: '12px 0', cursor: 'pointer' }}>
              <div style={{
                width: '72px', height: '56px', borderRadius: '8px', flexShrink: 0,
                background: `linear-gradient(135deg, ${['#6366f1','#8b5cf6','#3b82f6','#10b981'][i]}40 0%, ${['#8b5cf6','#3b82f6','#06b6d4','#059669'][i]}40 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
              }}>{['💻','⚙️','🏢','🌙'][i]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text textStyle="body2" style={{ fontWeight: '600', display: 'block', lineHeight: '1.3', marginBottom: '4px' }}>{item.headline}</Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Text textStyle="caption" style={{ color: tc.fgMuted }}>{item.source}</Text>
                  <span style={{ color: tc.fgMuted, fontSize: '10px' }}>·</span>
                  <Text textStyle="caption" style={{ color: tc.fgMuted }}>{item.time}</Text>
                </div>
              </div>
            </div>
            {i < arr.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    ),

    sports: (
      <div style={{ padding: '16px' }}>
        <Text textStyle="body2" style={{ display: 'block', fontWeight: '700', marginBottom: '12px' }}>Live Scores 🏆</Text>

        {/* Live Match Cards */}
        {[
          { home: 'Seoul FC', away: 'Busan United', homeScore: 2, awayScore: 1, time: "72'", status: 'live', league: 'K-League' },
          { home: 'Jeju Stars', away: 'Incheon City', homeScore: 0, awayScore: 0, time: "HT", status: 'halftime', league: 'K-League' },
        ].map((match, i) => (
          <div key={i} style={{
            borderRadius: '14px', padding: '16px', marginBottom: '10px',
            border: `1px solid ${tc.border}`, background: tc.bg,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text textStyle="caption" style={{ color: tc.fgMuted }}>{match.league}</Text>
              <span style={{
                fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '100px',
                background: match.status === 'live' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                color: match.status === 'live' ? '#ef4444' : '#f59e0b',
              }}>{match.status === 'live' ? `● LIVE ${match.time}` : 'HT'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text textStyle="body2" style={{ fontWeight: '700', flex: 1 }}>{match.home}</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px' }}>
                <Text textStyle="h3" style={{ fontWeight: '800', color: match.homeScore > match.awayScore ? '#6366f1' : tc.fg }}>{match.homeScore}</Text>
                <Text textStyle="caption" style={{ color: tc.fgMuted }}>vs</Text>
                <Text textStyle="h3" style={{ fontWeight: '800', color: match.awayScore > match.homeScore ? '#6366f1' : tc.fg }}>{match.awayScore}</Text>
              </div>
              <Text textStyle="body2" style={{ fontWeight: '700', flex: 1, textAlign: 'right' }}>{match.away}</Text>
            </div>
          </div>
        ))}

        <Text textStyle="body2" style={{ display: 'block', fontWeight: '700', marginBottom: '12px', marginTop: '20px' }}>Top Stories</Text>

        {[
          { headline: 'K-League MVP Race: Who Takes the Crown?', source: 'SportZone', time: '30m ago' },
          { headline: 'National Team Qualifies for World Cup Semifinals', source: 'SportsKorea', time: '2h ago' },
          { headline: 'Record Attendance at Seoul Stadium This Season', source: 'Daily Sport', time: '5h ago' },
        ].map((item, i, arr) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', gap: '12px', padding: '12px 0', cursor: 'pointer' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '10px', flexShrink: 0,
                background: `linear-gradient(135deg, ${['#6366f1','#10b981','#f59e0b'][i]}20 0%, ${['#8b5cf6','#059669','#d97706'][i]}20 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
              }}>{['⚽','🏅','🏟️'][i]}</div>
              <div style={{ flex: 1 }}>
                <Text textStyle="body2" style={{ fontWeight: '600', display: 'block', lineHeight: '1.3', marginBottom: '4px' }}>{item.headline}</Text>
                <Text textStyle="caption" style={{ color: tc.fgMuted }}>{item.source} · {item.time}</Text>
              </div>
            </div>
            {i < arr.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    ),
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '32px', background: tc.surface, minHeight: '100vh' }}>
      <div style={{
        width: '375px', height: '812px', background: tc.bg,
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${tc.border}`, borderRadius: '40px',
        boxShadow: '0 32px 64px -12px rgba(0,0,0,0.2)',
      }}>
        {/* Status Bar */}
        <div style={{
          height: '44px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 24px',
          background: tc.bg,
        }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: tc.fg }}>9:41</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: tc.fgSub }}>●●●</span>
            <span style={{ fontSize: '10px', color: tc.fgSub }}>WiFi</span>
            <span style={{ fontSize: '10px', color: tc.fgSub }}>🔋</span>
          </div>
        </div>

        {/* App Bar */}
        <AppBar>
          <AppBar.Leading>
            <GhostButton size="small" color="black"><MenuIcon size={22} /></GhostButton>
          </AppBar.Leading>
          <AppBar.Center>Orbit Feed</AppBar.Center>
          <AppBar.Trailing>
            <GhostButton size="small" color="black"><SearchIcon size={22} /></GhostButton>
          </AppBar.Trailing>
        </AppBar>

        {/* Tab Bar */}
        <div style={{
          display: 'flex', borderBottom: `1px solid ${tc.borderSub}`,
          background: tc.bg,
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '11px 4px', border: 'none', cursor: 'pointer',
                background: 'transparent', fontSize: '13px',
                fontWeight: activeTab === tab.id ? '700' : '400',
                color: activeTab === tab.id ? '#6366f1' : tc.fgMuted,
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Scrollable Tab Content */}
        <div style={{ height: 'calc(812px - 44px - 56px - 45px - 80px)', overflowY: 'auto' }}>
          {tabContent[activeTab]}
        </div>

        {/* Bottom Nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '80px', background: tc.bg,
          borderTop: `1px solid ${tc.borderSub}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingBottom: '20px',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                  border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 14px',
                }}
              >
                <Icon size={22} color={isActive ? '#6366f1' : tc.fgMuted} />
                <span style={{
                  fontSize: '10px', fontWeight: isActive ? '700' : '400',
                  color: isActive ? '#6366f1' : tc.fgMuted,
                }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const MobileApp: Story = {
  render: () => <MobileAppRender />,
}

/* ═══════════════════════════════════════════
   3. Settings Page (Tablet/PC)
   ═══════════════════════════════════════════ */
const SettingsPageRender = () => {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [marketingNotif, setMarketingNotif] = useState(true)
  const [activeSection, setActiveSection] = useState('profile')

  const sideNav = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'preferences', label: 'Preferences', icon: '🎨' },
    { id: 'billing', label: 'Billing', icon: '💳' },
  ]

  const cardStyle: React.CSSProperties = {
    padding: '28px', borderRadius: '14px', background: tc.bg,
    border: `1px solid ${tc.border}`, marginBottom: '16px',
  }

  return (
    <div style={{ background: tc.surface, minHeight: '100vh' }}>
      {/* Top Nav */}
      <header style={{
        height: '56px', background: tc.bg, borderBottom: `1px solid ${tc.border}`,
        padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '7px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '12px', fontWeight: '800',
          }}>O</div>
          <Text textStyle="body1" style={{ fontWeight: '700' }}>Orbit UI</Text>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Avatar />
          <div>
            <Text textStyle="body2" style={{ display: 'block', fontWeight: '600' }}>Admin User</Text>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto', padding: '40px 24px', gap: '28px' }}>
        {/* Side Nav */}
        <aside style={{ width: '200px', flexShrink: 0 }}>
          <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Account</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sideNav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: activeSection === item.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                  color: activeSection === item.id ? '#6366f1' : tc.fgSub,
                  fontSize: '14px', fontWeight: activeSection === item.id ? '600' : '400',
                  transition: 'all 0.15s', textAlign: 'left', width: '100%',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <Text textStyle="h2" style={{ display: 'block', marginBottom: '4px' }}>Account Settings</Text>
            <Text textStyle="body2" style={{ color: tc.fgSub }}>Manage your account preferences and personal information.</Text>
          </div>

          {/* Profile Section */}
          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px', fontWeight: '700' }}>Profile Information</Text>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar />
                  <div style={{
                    position: 'absolute', bottom: '-2px', right: '-2px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#6366f1', border: '2px solid white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', color: '#fff', cursor: 'pointer',
                  }}>✎</div>
                </div>
                <Text textStyle="caption" style={{ color: '#6366f1', display: 'block', marginTop: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Change Photo</Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <TextField label="First Name" placeholder="Kim" />
                  <TextField label="Last Name" placeholder="Minsu" />
                </div>
                <TextField label="Display Name" placeholder="Enter your display name" />
                <TextField label="Email" value="user@example.com" disabled />
                <TextField label="Bio" placeholder="Tell us about yourself..." />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <SolidButton size="medium" color="black">Save Changes</SolidButton>
                  <OutlineButton size="medium" color="black">Cancel</OutlineButton>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '4px', fontWeight: '700' }}>Notification Preferences</Text>
            <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginBottom: '20px' }}>Choose how and when you want to be notified.</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Email Notifications', desc: 'Receive updates and alerts via email.', state: emailNotif, toggle: () => setEmailNotif(!emailNotif) },
                { label: 'Push Notifications', desc: 'Receive push notifications on your device.', state: pushNotif, toggle: () => setPushNotif(!pushNotif) },
                { label: 'Marketing Emails', desc: 'Receive news, tips, and promotional content.', state: marketingNotif, toggle: () => setMarketingNotif(!marketingNotif) },
              ].map((item, i, arr) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
                    <div>
                      <Text textStyle="body1" style={{ display: 'block', fontWeight: '500', marginBottom: '2px' }}>{item.label}</Text>
                      <Text textStyle="body2" style={{ color: tc.fgSub }}>{item.desc}</Text>
                    </div>
                    <Switch checked={item.state} onChange={item.toggle} />
                  </div>
                  {i < arr.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Preferences Section */}
          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px', fontWeight: '700' }}>Preferences</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ paddingBottom: '20px' }}>
                <Text textStyle="body1" style={{ display: 'block', fontWeight: '500', marginBottom: '2px' }}>Appearance</Text>
                <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginBottom: '14px' }}>Choose your preferred color scheme.</Text>
                <div style={{ display: 'flex', gap: '24px' }}>
                  {['Light', 'Dark', 'System'].map((v) => (
                    <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <RadioButton name="theme-setting" value={v.toLowerCase()} defaultChecked={v === 'Light'} />
                      <Text textStyle="body2">{v}</Text>
                    </label>
                  ))}
                </div>
              </div>
              <Divider />
              <div style={{ paddingTop: '20px' }}>
                <Text textStyle="body1" style={{ display: 'block', fontWeight: '500', marginBottom: '2px' }}>Content Sensitivity</Text>
                <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginBottom: '14px' }}>Adjust the level of content filtering.</Text>
                <Slider defaultValue={[50]} min={0} max={100} />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section style={cardStyle}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '20px', fontWeight: '700' }}>Frequently Asked Questions</Text>
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
              <Accordion.Item value="4" title="Can I transfer my account to another email?">
                Yes, you can update your email address from Profile settings. A verification link will be sent to the new address.
              </Accordion.Item>
            </Accordion>
          </section>

          {/* Danger Zone */}
          <section style={{ ...cardStyle, borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.02)' }}>
            <Text textStyle="h4" style={{ display: 'block', marginBottom: '4px', fontWeight: '700', color: '#ef4444' }}>Danger Zone</Text>
            <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginBottom: '16px' }}>These actions are irreversible. Please proceed with caution.</Text>
            <div style={{ display: 'flex', gap: '10px' }}>
              <OutlineButton size="medium" color="black">Export Data</OutlineButton>
              <OutlineButton size="medium" color="black" style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#ef4444' }}>Delete Account</OutlineButton>
            </div>
          </section>
        </div>
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
      {/* Sticky Header */}
      <header style={{
        padding: '0 48px', height: '64px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${tc.borderSub}`,
        position: 'sticky', top: 0, background: tc.bg, zIndex: 10,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', fontSize: '13px', fontWeight: '800',
          }}>O</div>
          <Text textStyle="h4" style={{ fontWeight: '800' }}>Orbit UI</Text>
        </div>
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {['Components', 'Templates', 'Docs', 'Blog'].map((item) => (
            <Text key={item} textStyle="body2" style={{ color: tc.fgSub, cursor: 'pointer', fontWeight: '500' }}>{item}</Text>
          ))}
          <OutlineButton size="small" color="black">Log in</OutlineButton>
          <SolidButton size="small" color="black">Get Started</SolidButton>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '96px 48px 80px', textAlign: 'center',
        background: `linear-gradient(180deg, ${tc.surface} 0%, ${tc.bg} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '100px',
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
          marginBottom: '28px', fontSize: '13px', fontWeight: '600', color: '#6366f1',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
          v2.0 — Now with Dark Mode & SSR Support
        </div>

        <h1 style={{
          fontSize: '60px', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1.08',
          margin: '0 0 24px', color: tc.fg,
        }}>
          Build Beautiful Interfaces<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Faster Than Ever
          </span>
        </h1>

        <p style={{
          fontSize: '19px', color: tc.fgSub, lineHeight: '1.7',
          maxWidth: '580px', margin: '0 auto 44px',
        }}>
          A production-ready React design system with 50+ components, full dark mode, TypeScript-first APIs, and SSR support for Next.js.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '56px' }}>
          <SolidButton size="large" color="black">Get Started Free</SolidButton>
          <OutlineButton size="large" color="black">View Components →</OutlineButton>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
          {[
            { value: '50+', label: 'Components' },
            { value: '3-Tier', label: 'Architecture' },
            { value: '100%', label: 'TypeScript' },
            { value: 'SSR', label: 'Ready' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#6366f1', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: tc.fgMuted, fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Text textStyle="caption" style={{ color: '#6366f1', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Why Orbit UI</Text>
          <Text textStyle="h2" style={{ display: 'block', fontWeight: '800' }}>Everything you need to ship faster</Text>
          <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
            Built by designers and engineers who care deeply about developer experience and end-user delight.
          </Text>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '♿', title: 'Accessible by Default', desc: 'WAI-ARIA compliant with full keyboard navigation and screen reader support out of the box.', color: '#6366f1' },
            { icon: '🎨', title: 'Fully Customizable', desc: 'Headless 3-tier architecture with a semantic design token system for complete visual control.', color: '#8b5cf6' },
            { icon: '⚡', title: 'Performance First', desc: 'Tree-shakeable, code-split, and optimized for the smallest possible bundle size.', color: '#3b82f6' },
            { icon: '🌙', title: 'Dark Mode Native', desc: 'First-class dark mode via EclipseProvider with CSS variables — zero flash on load.', color: '#10b981' },
            { icon: '📦', title: 'SSR & Next.js Ready', desc: 'Built-in getTheme() server utility for flash-free rendering in Next.js App Router.', color: '#f59e0b' },
            { icon: '🔷', title: 'TypeScript Native', desc: 'Full TypeScript support with exported types, generics, and discriminated union props.', color: '#ef4444' },
          ].map((f, i) => (
            <div key={i} style={{
              padding: '28px', borderRadius: '16px',
              border: `1px solid ${tc.border}`, background: tc.bg,
              transition: 'box-shadow 0.2s ease',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${f.color}14`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px', marginBottom: '16px',
              }}>{f.icon}</div>
              <Text textStyle="body1" style={{ display: 'block', fontWeight: '700', marginBottom: '8px' }}>{f.title}</Text>
              <Text textStyle="body2" style={{ color: tc.fgSub, lineHeight: '1.6' }}>{f.desc}</Text>
            </div>
          ))}
        </div>
      </section>

      {/* Component Preview */}
      <section style={{ padding: '80px 48px', background: tc.surface }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Text textStyle="caption" style={{ color: '#6366f1', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Components</Text>
            <Text textStyle="h2" style={{ display: 'block', fontWeight: '800' }}>50+ Production-Ready Components</Text>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {['Button', 'TextField', 'Dropdown', 'Modal', 'Toast', 'DataTable', 'Calendar', 'Accordion', 'Slider', 'Progress', 'Carousel', 'AppBar', 'Breadcrumb', 'Chip', 'Avatar', 'Badge', 'Switch', 'Checkbox', 'RadioButton', 'Tooltip'].map((comp) => (
              <Chip key={comp}>{comp}</Chip>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 48px', textAlign: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Ready to build something beautiful?
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 40px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get Orbit UI up and running in minutes. Free and open source forever.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <SolidButton size="large" color="black" style={{ background: '#6366f1', borderColor: '#6366f1' }}>Start Building</SolidButton>
            <OutlineButton size="large" color="black" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }}>Read the Docs</OutlineButton>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '12px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', color: '#e2e8f0', gap: '12px',
          }}>
            <span style={{ color: '#94a3b8' }}>$</span>
            pnpm add @heejun-com/theme-eclipse
            <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '5px', padding: '3px 8px', color: '#e2e8f0', fontSize: '11px', cursor: 'pointer' }}>Copy</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export const PcLanding: Story = {
  render: () => <PcLandingRender />,
}
