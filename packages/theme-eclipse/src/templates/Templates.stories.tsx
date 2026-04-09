import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import {
  Accordion,
  AnimatedBadge,
  AppBar,
  Avatar,
  Breadcrumb,
  Carousel,
  Checkbox,
  Chip,
  CounterBadge,
  DataTable,
  Divider,
  LabelBadge,
  Loading,
  PageDots,
  Progress,
  RadioButton,
  ScrollableTabGroup,
  Skeleton,
  Slider,
  SolidButton,
  SolidIconButton,
  SpeechBadge,
  Switch,
  Text,
  TextArea,
  TextField,
  Toggle,
  Tooltip,
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
  StarLineIcon,
  ArrowRightIcon,
  AttachmentIcon,
  EmojiGoodLineIcon,
  MoreHorizontalIcon,
  VideoLineIcon,
} from '@heejun-com/icons'

import { Command } from '../components/Command'

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

/* ═══════════════════════════════════════════
   5. E-Commerce Product Listing (PC)
   ═══════════════════════════════════════════ */
const EcommerceRender = () => {
  const [activeCategory, setActiveCategory] = useState(0)
  const [priceRange, setPriceRange] = useState([20, 80])
  const [cartCount, setCartCount] = useState(2)
  const [wishlist, setWishlist] = useState<number[]>([2])
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [sortIdx, setSortIdx] = useState(0)

  const categories = [
    { label: 'All Products' },
    { label: 'Design Tools' },
    { label: 'Components' },
    { label: 'Templates' },
    { label: 'Icons' },
    { label: 'Fonts' },
    { label: 'Illustrations' },
  ]

  const sortOptions = [
    { id: 'popular', label: '인기순' },
    { id: 'newest', label: '최신순' },
    { id: 'price_asc', label: '낮은 가격순' },
    { id: 'price_desc', label: '높은 가격순' },
  ]

  const products = [
    { id: 1, name: 'Orbit UI Component Kit', cat: 'Components', price: 49, original: 79, rating: 4.9, reviews: 284, badge: 'Best Seller', color: '#6366f1' },
    { id: 2, name: 'Eclipse Dark Theme Pack', cat: 'Templates', price: 29, original: null, rating: 4.7, reviews: 142, badge: 'New', color: '#8b5cf6' },
    { id: 3, name: 'Design Token System', cat: 'Design Tools', price: 0, original: null, rating: 4.8, reviews: 320, badge: 'Free', color: '#10b981' },
    { id: 4, name: 'Orbit Icon Library', cat: 'Icons', price: 19, original: 35, rating: 4.6, reviews: 98, badge: null, color: '#3b82f6' },
    { id: 5, name: 'Pretendard + JetBrains', cat: 'Fonts', price: 0, original: null, rating: 4.5, reviews: 210, badge: 'Free', color: '#f59e0b' },
    { id: 6, name: '3-Tier Architecture Guide', cat: 'Templates', price: 15, original: null, rating: 4.9, reviews: 67, badge: 'Popular', color: '#ef4444' },
  ]

  const handleAddToCart = (id: number) => {
    setLoadingId(id)
    setTimeout(() => {
      setCartCount(c => c + 1)
      setLoadingId(null)
    }, 800)
  }

  return (
    <Tooltip.Provider>
    <div style={{ background: tc.bg, minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* Header */}
      <header style={{
        height: '60px', background: tc.bg, borderBottom: `1px solid ${tc.border}`,
        padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '800' }}>O</div>
            <Text textStyle="titleSmall" style={{ fontWeight: '800' }}>Orbit Market</Text>
          </div>
          <div style={{ width: '280px' }}>
            <TextField placeholder="Search components, templates..." />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <GhostButton size="small" color="black">Sign In</GhostButton>
          <div style={{ position: 'relative' }}>
            <SolidButton size="small" color="black">
              🛒 Cart
            </SolidButton>
            {cartCount > 0 && (
              <CounterBadge style={{ position: 'absolute', top: '-8px', right: '-8px' }}>{cartCount}</CounterBadge>
            )}
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* Sidebar Filter */}
        <aside style={{
          width: '240px', flexShrink: 0, borderRight: `1px solid ${tc.border}`,
          padding: '24px 20px', background: tc.bg,
        }}>
          <Text textStyle="labelLargeEmphasized" style={{ display: 'block', marginBottom: '16px', color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.07em', fontSize: '11px' }}>Filters</Text>

          {/* Price Range */}
          <div style={{ marginBottom: '24px' }}>
            <Text textStyle="bodySmall" style={{ display: 'block', fontWeight: '700', marginBottom: '12px', color: tc.fg }}>Price Range</Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Text textStyle="bodySmall" style={{ color: tc.fgMuted }}>${priceRange[0]}</Text>
              <Text textStyle="bodySmall" style={{ color: tc.fgMuted }}>${priceRange[1]}</Text>
            </div>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={100} step={5} />
          </div>

          <Divider />

          {/* Rating */}
          <div style={{ margin: '20px 0' }}>
            <Text textStyle="bodySmall" style={{ display: 'block', fontWeight: '700', marginBottom: '12px', color: tc.fg }}>Minimum Rating</Text>
            {[4.5, 4.0, 3.5].map((r) => (
              <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                <RadioButton name="rating" value={String(r)} />
                <Text textStyle="bodySmall" style={{ color: tc.fgSub }}>⭐ {r}+ ({r === 4.5 ? '128' : r === 4.0 ? '246' : '312'})</Text>
              </label>
            ))}
          </div>

          <Divider />

          {/* Availability */}
          <div style={{ margin: '20px 0' }}>
            <Text textStyle="bodySmall" style={{ display: 'block', fontWeight: '700', marginBottom: '12px', color: tc.fg }}>Availability</Text>
            {[
              { label: 'Free only', val: false },
              { label: 'Include paid', val: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Text textStyle="bodySmall" style={{ color: tc.fgSub }}>{item.label}</Text>
                <Switch checked={item.val} onChange={() => {}} />
              </div>
            ))}
          </div>

          <Divider />

          <div style={{ marginTop: '20px' }}>
            <SolidButton size="small" color="black" style={{ width: '100%', justifyContent: 'center' }}>Apply Filters</SolidButton>
            <GhostButton size="small" color="black" style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}>Reset</GhostButton>
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px', minWidth: 0 }}>
          {/* Breadcrumb & Sort */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Market</Breadcrumb.Item>
              <Breadcrumb.Item>Components</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {sortOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => setSortIdx(i)}
                  style={{
                    padding: '5px 12px', borderRadius: '8px', border: `1px solid ${sortIdx === i ? '#6366f1' : tc.border}`,
                    background: sortIdx === i ? 'rgba(99,102,241,0.08)' : 'transparent',
                    color: sortIdx === i ? '#6366f1' : tc.fgSub,
                    fontSize: '12px', fontWeight: sortIdx === i ? '700' : '400', cursor: 'pointer',
                  }}
                >{opt.label}</button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ marginBottom: '20px' }}>
            <ScrollableTabGroup selectedIndex={activeCategory} onTabChange={setActiveCategory}>
              {categories.map((cat) => (
                <ScrollableTabGroup.Tab key={cat.label} value={cat.label}>
                  <ScrollableTabGroup.TabCenter>{cat.label}</ScrollableTabGroup.TabCenter>
                </ScrollableTabGroup.Tab>
              ))}
            </ScrollableTabGroup>
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {products.map((product) => (
              <div key={product.id} style={{
                borderRadius: '14px', border: `1px solid ${tc.border}`,
                background: tc.bg, overflow: 'hidden',
                transition: 'box-shadow 0.2s ease',
              }}>
                {/* Product Image */}
                <div style={{
                  aspectRatio: '4/3', position: 'relative',
                  background: `linear-gradient(135deg, ${product.color}15 0%, ${product.color}08 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px',
                    background: `linear-gradient(135deg, ${product.color}, ${product.color}bb)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', fontWeight: '800', color: '#fff',
                    boxShadow: `0 8px 24px ${product.color}40`,
                  }}>O</div>
                  {product.badge && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <LabelBadge color={product.badge === 'Free' ? 'benefit' : product.badge === 'New' ? 'gray' : 'gray'}>
                        <LabelBadge.Label>{product.badge}</LabelBadge.Label>
                      </LabelBadge>
                    </div>
                  )}
                  <button
                    onClick={() => setWishlist(w => w.includes(product.id) ? w.filter(x => x !== product.id) : [...w, product.id])}
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                      background: 'rgba(255,255,255,0.9)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px',
                    }}
                  >
                    {wishlist.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                {/* Product Info */}
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <Chip>{product.cat}</Chip>
                  </div>
                  <Text textStyle="bodyLarge" style={{ display: 'block', fontWeight: '700', marginBottom: '6px', color: tc.fg }}>{product.name}</Text>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#f59e0b' }}>★ {product.rating}</span>
                    <span style={{ fontSize: '12px', color: tc.fgMuted }}>({product.reviews} reviews)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: product.price === 0 ? '#10b981' : tc.fg }}>
                        {product.price === 0 ? 'Free' : `$${product.price}`}
                      </span>
                      {product.original && (
                        <span style={{ fontSize: '13px', color: tc.fgMuted, textDecoration: 'line-through', marginLeft: '6px' }}>${product.original}</span>
                      )}
                    </div>
                    <Tooltip>
                      <Tooltip.Trigger asChild>
                        {loadingId === product.id ? (
                          <div style={{ width: '80px', display: 'flex', justifyContent: 'center' }}>
                            <Loading size="small" />
                          </div>
                        ) : (
                          <SolidButton size="small" color="black" onClick={() => handleAddToCart(product.id)}>
                            Add to Cart
                          </SolidButton>
                        )}
                      </Tooltip.Trigger>
                      <Tooltip.Content>장바구니에 추가</Tooltip.Content>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Banner */}
          <div style={{ marginTop: '24px', borderRadius: '16px', overflow: 'hidden' }}>
            <Carousel>
              <Carousel.Item>
                <div style={{
                  padding: '32px 40px',
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Featured</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em' }}>Orbit UI Pro Bundle</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>모든 컴포넌트 + 템플릿 + 아이콘 패키지 — 40% 할인</div>
                    <SolidButton size="medium" color="black" style={{ background: '#6366f1', borderColor: '#6366f1' }}>번들 구매하기 — $89</SolidButton>
                  </div>
                  <div style={{ fontSize: '80px', opacity: 0.4 }}>🚀</div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{
                  padding: '32px 40px',
                  background: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Limited Offer</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Free Forever Plan</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>핵심 컴포넌트 50개 무료 제공 — 가입 없이 즉시 사용 가능</div>
                    <OutlineButton size="medium" color="black" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>무료로 시작하기</OutlineButton>
                  </div>
                  <div style={{ fontSize: '80px', opacity: 0.4 }}>🎁</div>
                </div>
              </Carousel.Item>
            </Carousel>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '12px 0', background: tc.surface }}>
              <PageDots selected={true} />
              <PageDots selected={false} />
            </div>
          </div>

          {/* Skeleton Loading Demo */}
          <div style={{ marginTop: '24px', padding: '20px', borderRadius: '14px', border: `1px solid ${tc.border}`, background: tc.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Text textStyle="titleSmall" style={{ fontWeight: '700' }}>Loading Preview</Text>
              <Chip>Skeleton Demo</Chip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ borderRadius: '10px', border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
                  <Skeleton width="100%" height="120px" />
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Skeleton width="70%" height="14px" />
                    <Skeleton width="100%" height="12px" />
                    <Skeleton width="50%" height="12px" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Viewed */}
          <div style={{ marginTop: '24px' }}>
            <Text textStyle="titleSmall" style={{ display: 'block', fontWeight: '700', marginBottom: '16px', color: tc.fg }}>최근 본 상품</Text>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {products.slice(0, 4).map((p) => (
                <div key={p.id} style={{
                  flexShrink: 0, width: '140px', borderRadius: '10px',
                  border: `1px solid ${tc.border}`, overflow: 'hidden', background: tc.bg,
                }}>
                  <div style={{ height: '80px', background: `linear-gradient(135deg, ${p.color}15, ${p.color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: '800' }}>O</div>
                  </div>
                  <div style={{ padding: '8px 10px' }}>
                    <Text textStyle="labelSmall" style={{ display: 'block', fontWeight: '600', color: tc.fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</Text>
                    <Text textStyle="labelSmall" style={{ color: p.price === 0 ? '#10b981' : tc.fgSub, fontWeight: '700' }}>{p.price === 0 ? 'Free' : `$${p.price}`}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Tooltip.Provider>
  )
}

export const EcommerceMarket: Story = {
  render: () => <EcommerceRender />,
}


/* =================================================================
   6. SocialFeed (Mobile)
   ================================================================= */
const SocialFeedRender = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]))
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState('for-you')

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSave = (id: number) => {
    setSavedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const feedTabs = [
    { id: 'for-you', label: '추천' },
    { id: 'following', label: '팔로잉' },
    { id: 'trending', label: '트렌딩' },
  ]

  const posts = [
    {
      id: 1,
      author: { name: 'Kim Jihye', handle: '@jihye_k', initials: 'KJ', color: '#6366f1', verified: true },
      time: '3분 전',
      content: 'Design systems are not just about components — they are about shared language. When every team speaks the same visual grammar, shipping fast becomes the default.',
      tag: '#디자인시스템',
      likes: 142,
      comments: 28,
      reposts: 14,
    },
    {
      id: 2,
      author: { name: 'Park Minjun', handle: '@minjun_dev', initials: 'PM', color: '#10b981', verified: false },
      time: '1시간 전',
      content: 'Orbit UI로 컴포넌트 개발 속도가 3배 빨라졌습니다. 특히 3단계 토큰 시스템 덕분에 테마 전환이 매우 간편해졌어요.',
      tag: '#OrbitUI',
      likes: 89,
      comments: 12,
      reposts: 7,
    },
    {
      id: 3,
      author: { name: 'Lee Soyeon', handle: '@soyeon_ux', initials: 'LS', color: '#f59e0b', verified: true },
      time: '2시간 전',
      content: 'shadcn/ui에서 영감을 받아 Orbit UI에 복사-붙여넣기 방식의 스토리를 추가했습니다. 개발자가 바로 사용할 수 있는 코드 예시가 핵심입니다.',
      tag: '#개발자경험',
      likes: 213,
      comments: 41,
      reposts: 32,
    },
    {
      id: 4,
      author: { name: 'Choi Dongwook', handle: '@dongwook_eng', initials: 'CD', color: '#ef4444', verified: false },
      time: '5시간 전',
      content: 'TypeScript strict mode + vanilla-extract 조합은 런타임 오류를 거의 완전히 제거해줍니다. 컴파일 타임에 모든 CSS 타입을 검증하는 것이 게임 체인저.',
      tag: '#TypeScript',
      likes: 67,
      comments: 9,
      reposts: 5,
    },
  ]

  const suggestions = [
    { name: 'Yoon Haerin', handle: '@haerin_design', initials: 'YH', color: '#8b5cf6' },
    { name: 'Oh Hyunjun', handle: '@hjunkim', initials: 'OH', color: '#06b6d4' },
    { name: 'Han Jiyoung', handle: '@jiyoung_ux', initials: 'HJ', color: '#ec4899' },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: tc.bg,
        display: 'flex',
        justifyContent: 'center',
        padding: '0',
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
        {/* AppBar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: tc.bg,
            borderBottom: `1px solid ${tc.border}`,
          }}
        >
          <AppBar>
            <AppBar.Leading>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                O
              </div>
            </AppBar.Leading>
            <AppBar.Center>
              <Text textStyle="subheadingMedium" style={{ color: tc.fg, fontWeight: '800' }}>
                Orbit Feed
              </Text>
            </AppBar.Center>
            <AppBar.Trailing>
              <SolidIconButton color="black" size="small">
                <NotificationLineIcon />
              </SolidIconButton>
            </AppBar.Trailing>
          </AppBar>
        </div>

        {/* Feed Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${tc.border}`,
            background: tc.bg,
            position: 'sticky',
            top: '56px',
            zIndex: 40,
          }}
        >
          {feedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '14px 0',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '700' : '500',
                color: activeTab === tab.id ? tc.fillPrimary : tc.fgMuted,
                borderBottom: activeTab === tab.id ? `2px solid ${tc.fillPrimary}` : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed Posts */}
        <div style={{ flex: 1 }}>
          {posts.map((post, index) => (
            <div key={post.id}>
              <div style={{ padding: '16px' }}>
                {/* Post Header */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: post.author.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                      }}
                    >
                      {post.author.initials}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <Text
                        textStyle="subheadingSmall"
                        style={{ color: tc.fg, fontWeight: '700' }}
                      >
                        {post.author.name}
                      </Text>
                      {post.author.verified && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#6366f1',
                            color: '#fff',
                            fontSize: '9px',
                            fontWeight: '800',
                          }}
                        >
                          V
                        </span>
                      )}
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>
                        {post.author.handle}
                      </Text>
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, marginLeft: 'auto', flexShrink: 0 }}>
                        {post.time}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div style={{ marginLeft: '52px' }}>
                  <Text
                    textStyle="bodyMedium"
                    style={{ color: tc.fg, lineHeight: '1.6', display: 'block', marginBottom: '8px' }}
                  >
                    {post.content}
                  </Text>
                  <Chip>
                    {post.tag}
                  </Chip>

                  {/* Post Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0',
                      marginTop: '12px',
                      marginLeft: '-8px',
                    }}
                  >
                    {/* Like */}
                    <button
                      onClick={() => toggleLike(post.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 8px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        color: likedPosts.has(post.id) ? '#ef4444' : tc.fgMuted,
                        fontSize: '13px',
                        fontWeight: likedPosts.has(post.id) ? '700' : '500',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </button>

                    {/* Comment */}
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 8px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        color: tc.fgMuted,
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>💬</span>
                      {post.comments}
                    </button>

                    {/* Repost */}
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 8px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        color: tc.fgMuted,
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>🔁</span>
                      {post.reposts}
                    </button>

                    {/* Save */}
                    <button
                      onClick={() => toggleSave(post.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 8px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        color: savedPosts.has(post.id) ? tc.fillPrimary : tc.fgMuted,
                        fontSize: '13px',
                        marginLeft: 'auto',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{savedPosts.has(post.id) ? '🔖' : '🏷️'}</span>
                    </button>
                  </div>
                </div>
              </div>
              {index < posts.length - 1 && (
                <Divider style={{ margin: 0 }} />
              )}
            </div>
          ))}

          {/* Suggestions Section */}
          <div
            style={{
              margin: '16px',
              padding: '16px',
              borderRadius: '16px',
              background: tc.surface,
              border: `1px solid ${tc.border}`,
            }}
          >
            <Text
              textStyle="subheadingSmall"
              style={{ color: tc.fg, fontWeight: '700', display: 'block', marginBottom: '16px' }}
            >
              팔로우 추천
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {suggestions.map((user) => (
                <div key={user.handle} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: user.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {user.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text textStyle="labelMedium" style={{ color: tc.fg, fontWeight: '600', display: 'block' }}>
                      {user.name}
                    </Text>
                    <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>
                      {user.handle}
                    </Text>
                  </div>
                  <OutlineButton color="primary" size="small">
                    <OutlineButton.Center>팔로우</OutlineButton.Center>
                  </OutlineButton>
                </div>
              ))}
            </div>
          </div>

          {/* Loading More */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
            <Loading size="small" />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: tc.bg,
            borderTop: `1px solid ${tc.border}`,
            display: 'flex',
            padding: '8px 0',
            zIndex: 50,
          }}
        >
          {[
            { icon: HomeLineIcon, label: '홈', active: true },
            { icon: SearchIcon, label: '검색', active: false },
            { icon: PeopleLineIcon, label: '팔로잉', active: false },
            { icon: NotificationLineIcon, label: '알림', active: false },
            { icon: SettingLineIcon, label: '설정', active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 0',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: active ? tc.fillPrimary : tc.fgMuted,
              }}
            >
              <Icon width={22} height={22} />
              <span style={{ fontSize: '10px', fontWeight: active ? '700' : '500' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const SocialFeed: Story = {
  render: () => <SocialFeedRender />,
}

/* ═══════════════════════════════════════════
   7. Onboarding Flow
   Ant Design Steps + Mantine Notification 패턴 참고:
   - 단계별 진행 (Progress + PageDots)
   - 각 단계에 다른 입력 컴포넌트
   - 완료 화면 + CTA
   ═══════════════════════════════════════════ */
const OnboardingRender = () => {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [emailDigest, setEmailDigest] = useState(false)
  const [interests, setInterests] = useState<string[]>([])
  const [bio, setBio] = useState('')
  const [done, setDone] = useState(false)

  const totalSteps = 4
  const progress = Math.round((step / (totalSteps - 1)) * 100)

  const roles = ['디자이너', '개발자', 'PM', '마케터', '기타']
  const interestOptions = ['UI/UX', 'Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

  const toggleInterest = (v: string) => {
    setInterests((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    )
  }

  const canNext = () => {
    if (step === 0) return name.trim().length > 0 && role !== ''
    if (step === 1) return interests.length > 0
    return true
  }

  const handleNext = () => {
    if (step < totalSteps - 1) setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const handleFinish = () => {
    setDone(true)
  }

  if (done) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '56px 48px',
          maxWidth: '440px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(99,102,241,0.12)',
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px',
          }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '28px' }}>!</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            설정 완료!
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
            <strong style={{ color: '#6366f1' }}>{name || '사용자'}</strong>님, 환영합니다.
            <br />Orbit UI 경험을 시작할 준비가 되었습니다.
          </div>
          <Progress value={100} color="success" size="small" />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
            프로필 100% 완성
          </div>
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SolidButton color="primary" size="large" style={{ width: '100%' }} onClick={() => { setDone(false); setStep(0) }}>
              <SolidButton.Center>시작하기</SolidButton.Center>
            </SolidButton>
            <GhostButton color="black" size="large" style={{ width: '100%' }} onClick={() => { setDone(false); setStep(0); setName(''); setRole(''); setInterests([]); setBio(''); setNotifications(true); setEmailDigest(false) }}>
              <GhostButton.Center>처음부터 다시</GhostButton.Center>
            </GhostButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px 40px 32px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(99,102,241,0.1)',
      }}>
        {/* 상단 진행 표시 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              단계 {step + 1} / {totalSteps}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>{progress}%</span>
          </div>
          <Progress value={progress} color="primary" size="small" />
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <PageDots
                key={i}
                selected={i === step}
                onClick={() => setStep(i)}
              />
            ))}
          </div>
        </div>

        {/* 단계별 콘텐츠 */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                안녕하세요! 소개해 주세요
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>이름과 직군을 알려주시면 맞춤 경험을 제공합니다.</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>이름</div>
              <TextField
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '10px' }}>직군</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {roles.map((r) => (
                  <label
                    key={r}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', color: '#475569' }}
                  >
                    <RadioButton
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => setRole(r)}
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                관심 분야를 선택하세요
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>여러 개 선택 가능합니다.</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {interestOptions.map((opt) => (
                <label
                  key={opt}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', color: '#475569' }}
                >
                  <Checkbox
                    checked={interests.includes(opt)}
                    onChange={() => toggleInterest(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {interests.length > 0 && (
              <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>
                {interests.length}개 선택됨: {interests.join(', ')}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                알림 설정
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>나중에 설정에서 변경할 수 있습니다.</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: '푸시 알림', desc: '중요 업데이트를 바로 받습니다.', value: notifications, onChange: setNotifications },
                { label: '이메일 다이제스트', desc: '주간 요약 이메일을 받습니다.', value: emailDigest, onChange: setEmailDigest },
              ].map(({ label, desc, value, onChange }, i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: i === 0 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>{label}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{desc}</div>
                  </div>
                  <Toggle checked={value} onCheckedChange={onChange} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                자기소개 (선택)
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>팀원들이 당신을 더 잘 알 수 있습니다.</div>
            </div>
            <TextArea
              value={bio}
              onChange={(e) => setBio((e.target as HTMLTextAreaElement).value)}
              placeholder="간략한 자기소개를 작성해 주세요..."
              rows={4}
            />
            <div style={{
              padding: '14px 16px',
              borderRadius: '10px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>입력한 정보 요약</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                <span style={{ color: '#94a3b8' }}>이름:</span> {name || '(미입력)'}<br />
                <span style={{ color: '#94a3b8' }}>직군:</span> {role || '(미선택)'}<br />
                <span style={{ color: '#94a3b8' }}>관심사:</span> {interests.length > 0 ? interests.join(', ') : '(미선택)'}<br />
                <span style={{ color: '#94a3b8' }}>알림:</span> {notifications ? '켜짐' : '꺼짐'}
              </div>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div style={{ marginTop: '32px', display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          {step > 0 ? (
            <OutlineButton color="black" size="medium" onClick={handleBack}>
              <OutlineButton.Center>이전</OutlineButton.Center>
            </OutlineButton>
          ) : (
            <div />
          )}
          {step < totalSteps - 1 ? (
            <SolidButton
              color="primary"
              size="medium"
              disabled={!canNext()}
              onClick={handleNext}
            >
              <SolidButton.Center>다음</SolidButton.Center>
            </SolidButton>
          ) : (
            <SolidButton color="primary" size="medium" onClick={handleFinish}>
              <SolidButton.Center>시작하기</SolidButton.Center>
            </SolidButton>
          )}
        </div>
      </div>
    </div>
  )
}

export const Onboarding: Story = {
  render: () => <OnboardingRender />,
}

/* ═══════════════════════════════════════════
   CommandPalette - Linear/Raycast 스타일 빠른 검색 UI
   shadcn/ui Command + Radix Dialog 접근성 패턴 반영:
   - cmdk 기반 실시간 필터링
   - 카테고리별 그룹 + 키보드 단축키 표시
   - aria-label, role="dialog" 시멘틱 구조
   ═══════════════════════════════════════════ */
const CommandPaletteRender = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const recentItems = [
    { id: 'r1', label: '대시보드', group: '최근 항목', shortcut: '' },
    { id: 'r2', label: '사용자 관리', group: '최근 항목', shortcut: '' },
    { id: 'r3', label: '결제 내역', group: '최근 항목', shortcut: '' },
  ]

  const navigationItems = [
    { id: 'n1', label: '홈', group: '페이지 이동', shortcut: 'G H' },
    { id: 'n2', label: '설정', group: '페이지 이동', shortcut: 'G S' },
    { id: 'n3', label: '프로필', group: '페이지 이동', shortcut: 'G P' },
    { id: 'n4', label: '알림 센터', group: '페이지 이동', shortcut: 'G N' },
  ]

  const actionItems = [
    { id: 'a1', label: '새 프로젝트 만들기', group: '액션', shortcut: 'C P' },
    { id: 'a2', label: '초대 링크 복사', group: '액션', shortcut: 'C I' },
    { id: 'a3', label: '내보내기 (CSV)', group: '액션', shortcut: '' },
    { id: 'a4', label: '도움말 열기', group: '액션', shortcut: '?' },
  ]

  const allItems = [...recentItems, ...navigationItems, ...actionItems]
  const filteredItems = query
    ? allItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : allItems

  const groupedItems = filteredItems.reduce<Record<string, typeof allItems>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  return (
    <div
      style={{
        minHeight: '500px',
        background: tc.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '32px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <Text textStyle="body1" style={{ fontWeight: 700, color: tc.fg, display: 'block' }}>
          Command Palette
        </Text>
        <Text textStyle="caption" style={{ color: tc.fgMuted }}>
          Linear / Raycast 스타일 검색 UI
        </Text>
      </div>

      <SolidButton
        color="primary"
        size="medium"
        onClick={() => setOpen(true)}
        aria-label="커맨드 팔레트 열기"
      >
        <SolidButton.Center>검색 열기 (Cmd+K)</SolidButton.Center>
      </SolidButton>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="커맨드 팔레트"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.4)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '120px',
            zIndex: 1000,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false)
              setQuery('')
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false)
              setQuery('')
            }
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              background: tc.bg,
              borderRadius: '16px',
              border: `1px solid ${tc.border}`,
              boxShadow: '0 25px 50px rgba(15,23,42,0.25)',
              overflow: 'hidden',
            }}
          >
            <Command className="rounded-none border-none shadow-none">
              <Command.Input
                placeholder="명령어 또는 페이지 검색..."
                value={query}
                onValueChange={setQuery}
                autoFocus
              />
              <Command.List style={{ maxHeight: '360px' }}>
                {filteredItems.length === 0 && (
                  <Command.Empty>
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>--</div>
                      <div style={{ fontSize: '14px', color: tc.fgMuted }}>
                        &quot;{query}&quot; 에 대한 결과가 없습니다
                      </div>
                    </div>
                  </Command.Empty>
                )}

                {Object.entries(groupedItems).map(([group, items]) => (
                  <Command.Group key={group} heading={group}>
                    {items.map((item) => (
                      <Command.Item
                        key={item.id}
                        onSelect={() => {
                          setOpen(false)
                          setQuery('')
                        }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {group === '최근 항목' && (
                            <span style={{ fontSize: '14px', color: tc.fgMuted }}>H</span>
                          )}
                          {group === '페이지 이동' && (
                            <ArrowRightIcon size={14} style={{ color: tc.fgMuted }} />
                          )}
                          {group === '액션' && (
                            <StarLineIcon size={14} style={{ color: tc.fgMuted }} />
                          )}
                          <span style={{ fontSize: '14px', color: tc.fg }}>{item.label}</span>
                        </div>
                        {item.shortcut && (
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {item.shortcut.split(' ').map((key, i) => (
                              <kbd
                                key={i}
                                style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  background: tc.surfaceElevated,
                                  border: `1px solid ${tc.border}`,
                                  fontSize: '11px',
                                  fontFamily: 'monospace',
                                  color: tc.fgSub,
                                  fontWeight: 600,
                                }}
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              <div style={{
                padding: '8px 12px',
                borderTop: `1px solid ${tc.border}`,
                display: 'flex',
                gap: '16px',
                background: tc.surface,
              }}>
                {[
                  { key: 'Enter', label: '선택' },
                  { key: 'Esc', label: '닫기' },
                  { key: '↑↓', label: '이동' },
                ].map(({ key, label }) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <kbd style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: tc.bg,
                      border: `1px solid ${tc.border}`,
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: tc.fgSub,
                    }}>
                      {key}
                    </kbd>
                    <span style={{ fontSize: '11px', color: tc.fgMuted }}>{label}</span>
                  </div>
                ))}
              </div>
            </Command>
          </div>
        </div>
      )}

      <div style={{
        padding: '16px 20px',
        borderRadius: '12px',
        background: tc.bg,
        border: `1px solid ${tc.border}`,
        maxWidth: '560px',
        width: '100%',
      }}>
        <Text textStyle="caption" style={{ color: tc.fgSub, display: 'block', marginBottom: '8px', fontWeight: 600 }}>
          접근성 구현 포인트 (Radix Dialog 패턴 반영)
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            'role="dialog" + aria-modal="true" 로 모달 컨텍스트 선언',
            'aria-label 으로 스크린리더에 목적 전달',
            'Escape 키로 닫기 + 포커스 자동 복원',
            'cmdk 기반 aria-selected 상태 자동 관리',
            '오버레이 클릭 시 dismiss (Radix onInteractOutside 패턴)',
          ].map((point) => (
            <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ color: '#10b981', flexShrink: 0, marginTop: '1px' }}>+</span>
              <Text textStyle="caption" style={{ color: tc.fgSub }}>{point}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const CommandPalette: Story = {
  render: () => <CommandPaletteRender />,
}

/* ===================================================
   ChatUI 템플릿: 메신저 스타일 UI
   SpeechBadge, CounterBadge 컴포넌트 활용
   =================================================== */
type ChatMessage = {
  id: number
  senderId: string
  text: string
  time: string
  isMe: boolean
}

type ChatRoom = {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  initial: string
  color: string
}

const CHAT_ROOMS: ChatRoom[] = [
  { id: '1', name: 'Design Team', lastMessage: '피그마 링크 공유드립니다', time: '10:42', unread: 3, online: true, initial: 'D', color: '#6366f1' },
  { id: '2', name: 'Park Minjun', lastMessage: '내일 미팅 시간 확인해주세요', time: '9:15', unread: 1, online: true, initial: 'M', color: '#10b981' },
  { id: '3', name: 'Product Sprint', lastMessage: '스프린트 리뷰 완료했습니다', time: '어제', unread: 0, online: false, initial: 'P', color: '#f59e0b' },
  { id: '4', name: 'Lee Soyeon', lastMessage: '확인했습니다!', time: '월요일', unread: 0, online: false, initial: 'S', color: '#ef4444' },
  { id: '5', name: 'Dev Crew', lastMessage: 'PR 리뷰 요청드립니다', time: '지난주', unread: 0, online: true, initial: 'C', color: '#8b5cf6' },
]

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, senderId: 'other', text: '안녕하세요! 피그마 파일 확인하셨나요?', time: '10:30', isMe: false },
  { id: 2, senderId: 'me', text: '네, 방금 확인했습니다. 디자인 토큰 구조가 훨씬 명확해졌네요!', time: '10:31', isMe: true },
  { id: 3, senderId: 'other', text: '감사합니다 :) 컴포넌트 레벨 토큰도 추가했어요', time: '10:32', isMe: false },
  { id: 4, senderId: 'me', text: '좋습니다. 버튼 컴포넌트에 먼저 적용해볼게요', time: '10:35', isMe: true },
  { id: 5, senderId: 'other', text: '피그마 링크 공유드립니다', time: '10:42', isMe: false },
]

const ChatUIRender = () => {
  const [activeRoom, setActiveRoom] = useState('1')
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const activeRoomData = CHAT_ROOMS.find((r) => r.id === activeRoom) ?? CHAT_ROOMS[0]

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMsg: ChatMessage = {
      id: messages.length + 1,
      senderId: 'me',
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }
    setMessages((prev) => [...prev, newMsg])
    setInputValue('')

    // 상대방 타이핑 시뮬레이션
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          senderId: 'other',
          text: '메시지 받았습니다! 확인 후 답변드릴게요.',
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        },
      ])
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: tc.bg, fontFamily: 'inherit', overflow: 'hidden' }}>
      {/* Sidebar: 대화 목록 */}
      <aside style={{
        width: '300px', flexShrink: 0,
        background: tc.bg, borderRight: `1px solid ${tc.border}`,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${tc.borderSub}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Text textStyle="body1" style={{ fontWeight: 700, color: tc.fg }}>Messages</Text>
            <SolidIconButton size="small" color="black">
              <MoreHorizontalIcon size={16} />
            </SolidIconButton>
          </div>
          <div style={{ width: '100%' }}>
            <TextField placeholder="대화 검색" />
          </div>
        </div>

        {/* Chat list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {CHAT_ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: activeRoom === room.id ? 'rgba(99,102,241,0.06)' : 'transparent',
                borderLeft: `3px solid ${activeRoom === room.id ? '#6366f1' : 'transparent'}`,
                transition: 'all 0.15s',
              }}
            >
              {/* Avatar with online indicator */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: room.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 700,
                }}>
                  {room.initial}
                </div>
                {room.online && (
                  <div style={{
                    position: 'absolute', bottom: '1px', right: '1px',
                    width: '11px', height: '11px', borderRadius: '50%',
                    background: '#10b981', border: '2px solid #fff',
                  }} />
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <Text textStyle="body2" style={{ fontWeight: 600, color: tc.fg }}>{room.name}</Text>
                  <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '11px' }}>{room.time}</Text>
                </div>
                <Text textStyle="caption" style={{
                  color: tc.fgSub, display: 'block',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px',
                }}>
                  {room.lastMessage}
                </Text>
              </div>

              {/* Unread badge */}
              {room.unread > 0 && (
                <CounterBadge style={{ flexShrink: 0 }}>
                  {room.unread}
                </CounterBadge>
              )}
            </button>
          ))}
        </div>

        {/* My profile */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${tc.borderSub}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text textStyle="body2" style={{ fontWeight: 600, color: tc.fg, display: 'block' }}>Admin User</Text>
            <Text textStyle="caption" style={{ color: '#10b981', fontSize: '11px' }}>온라인</Text>
          </div>
        </div>
      </aside>

      {/* Main: 채팅 영역 */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Chat header */}
        <div style={{
          padding: '14px 20px', borderBottom: `1px solid ${tc.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: tc.bg,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: activeRoomData.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 700,
            }}>
              {activeRoomData.initial}
            </div>
            <div>
              <Text textStyle="body2" style={{ fontWeight: 700, color: tc.fg, display: 'block' }}>{activeRoomData.name}</Text>
              <Text textStyle="caption" style={{ color: activeRoomData.online ? '#10b981' : tc.fgMuted, fontSize: '11px' }}>
                {activeRoomData.online ? '온라인' : '오프라인'}
              </Text>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <SolidIconButton size="small" color="black">
              <VideoLineIcon size={16} />
            </SolidIconButton>
            <SolidIconButton size="small" color="black">
              <SearchIcon size={16} />
            </SolidIconButton>
            <SolidIconButton size="small" color="black">
              <MoreHorizontalIcon size={16} />
            </SolidIconButton>
          </div>
        </div>

        {/* Messages area */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '12px',
          background: tc.surface,
        }}>
          {/* Date separator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0 8px' }}>
            <div style={{ flex: 1, height: '1px', background: tc.border }} />
            <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '11px', whiteSpace: 'nowrap' }}>오늘</Text>
            <div style={{ flex: 1, height: '1px', background: tc.border }} />
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: '8px',
              }}
            >
              {/* Other's avatar */}
              {!msg.isMe && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: activeRoomData.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, flexShrink: 0,
                }}>
                  {activeRoomData.initial}
                </div>
              )}

              <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', gap: '3px', alignItems: msg.isMe ? 'flex-end' : 'flex-start' }}>
                {/* SpeechBadge: 말풍선 스타일 메시지 */}
                <SpeechBadge
                  color={msg.isMe ? 'blue' : 'pink'}
                  tailPosition={msg.isMe ? 'trailing' : 'leading'}
                >
                  <Text textStyle="body2" style={{ color: msg.isMe ? '#fff' : tc.fg, fontSize: '13px', lineHeight: '1.5' }}>
                    {msg.text}
                  </Text>
                </SpeechBadge>
                <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '10px' }}>{msg.time}</Text>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: activeRoomData.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700, flexShrink: 0,
              }}>
                {activeRoomData.initial}
              </div>
              <div style={{
                padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                background: tc.bg, border: `1px solid ${tc.border}`,
                display: 'flex', gap: '4px', alignItems: 'center',
              }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: tc.fgMuted,
                    animation: `bounce 1s ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{
          padding: '12px 16px', borderTop: `1px solid ${tc.border}`,
          background: tc.bg, display: 'flex', gap: '8px', alignItems: 'center',
        }}>
          <SolidIconButton size="small" color="black">
            <EmojiGoodLineIcon size={18} />
          </SolidIconButton>
          <SolidIconButton size="small" color="black">
            <AttachmentIcon size={18} />
          </SolidIconButton>
          <div style={{ flex: 1 }}>
            <TextField
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
          </div>
          <SolidIconButton
            size="small"
            color="black"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <NotificationLineIcon size={18} />
          </SolidIconButton>
        </div>
      </main>
    </div>
  )
}

export const ChatUI: Story = {
  render: () => <ChatUIRender />,
}

/* ═══════════════════════════════════════════
   10. KanbanBoard (Linear-style)
   ═══════════════════════════════════════════ */

type KanbanPriority = 'urgent' | 'high' | 'medium' | 'low'
type KanbanStatus = 'todo' | 'inprogress' | 'done'

type KanbanCard = {
  id: string
  title: string
  priority: KanbanPriority
  assignee: string
  tag: string
  tagColor: 'gray' | 'benefit' | 'sale'
}

type KanbanColumn = {
  id: KanbanStatus
  title: string
  color: string
  cards: KanbanCard[]
}

const kanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'Todo',
    color: '#94a3b8',
    cards: [
      { id: 'k1', title: 'Audit design token hierarchy', priority: 'high', assignee: 'HJ', tag: 'Design', tagColor: 'gray' },
      { id: 'k2', title: 'Write MigrationGuide for Chakra users', priority: 'medium', assignee: 'KJ', tag: 'Docs', tagColor: 'gray' },
      { id: 'k3', title: 'Add AnimatedBadge pulse variant', priority: 'low', assignee: 'LY', tag: 'Feature', tagColor: 'benefit' },
      { id: 'k4', title: 'Update Storybook to v8', priority: 'urgent', assignee: 'PM', tag: 'Infra', tagColor: 'sale' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    color: '#6366f1',
    cards: [
      { id: 'k5', title: 'Implement compact density mode for ListTile', priority: 'urgent', assignee: 'HJ', tag: 'Feature', tagColor: 'benefit' },
      { id: 'k6', title: 'Refactor SpeechBadge CSS tokens', priority: 'high', assignee: 'CD', tag: 'Refactor', tagColor: 'gray' },
      { id: 'k7', title: 'Fix Popover z-index in Modal context', priority: 'high', assignee: 'HJ', tag: 'Bug', tagColor: 'sale' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10b981',
    cards: [
      { id: 'k8', title: 'KanbanBoard template story', priority: 'medium', assignee: 'HJ', tag: 'Docs', tagColor: 'gray' },
      { id: 'k9', title: 'UserProfile template story', priority: 'medium', assignee: 'KJ', tag: 'Docs', tagColor: 'gray' },
      { id: 'k10', title: 'Linear/Vercel benchmark analysis', priority: 'high', assignee: 'HJ', tag: 'Design', tagColor: 'benefit' },
    ],
  },
]

const priorityDots: Record<KanbanPriority, string> = {
  urgent: '#ef4444',
  high: '#f59e0b',
  medium: '#6366f1',
  low: '#94a3b8',
}

const KanbanAssigneeAvatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div style={{
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }}>
    {initials}
  </div>
)

const KanbanBoardRender: React.FC = () => {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(kanbanColumns)

  const moveCard = (cardId: string, targetColId: KanbanStatus) => {
    setColumns((prev) => {
      let movingCard: KanbanCard | null = null
      const updated = prev.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => {
          if (c.id === cardId) { movingCard = c; return false }
          return true
        }),
      }))
      if (!movingCard) return prev
      return updated.map((col) =>
        col.id === targetColId ? { ...col, cards: [...col.cards, movingCard as KanbanCard] } : col
      )
    })
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', background: tc.surface, fontFamily: 'inherit' }}>
      {/* Topbar */}
      <header style={{
        height: 52, background: tc.bg, borderBottom: `1px solid ${tc.border}`,
        padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 800,
          }}>O</div>
          <Text textStyle="body2" style={{ fontWeight: 700 }}>Orbit Board</Text>
          <SpeechBadge color="blue" tailPosition="leading">Cycle 5</SpeechBadge>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <AnimatedBadge color="club" size="small">
            <AnimatedBadge.Label>Live</AnimatedBadge.Label>
          </AnimatedBadge>
          <SolidButton size="small" color="black">
            <SolidButton.Center>+ New Issue</SolidButton.Center>
          </SolidButton>
          <Avatar>
            <Avatar.Fallback>HJ</Avatar.Fallback>
          </Avatar>
        </div>
      </header>

      {/* Board */}
      <div style={{ flex: 1, display: 'flex', gap: 12, padding: '16px 20px', overflowX: 'auto' }}>
        {columns.map((col) => (
          <div
            key={col.id}
            style={{
              flex: '0 0 300px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              background: tc.surfaceElevated,
              borderRadius: 10,
              padding: '12px',
              border: `1px solid ${tc.border}`,
              maxHeight: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Column header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: `1px solid ${tc.border}` }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: tc.fg }}>{col.title}</span>
              <CounterBadge>{col.cards.length}</CounterBadge>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', flex: 1 }}>
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    background: tc.bg,
                    borderRadius: 8,
                    padding: '10px 12px',
                    border: `1px solid ${tc.border}`,
                    cursor: 'pointer',
                  }}
                >
                  {/* Card header: priority + tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: priorityDots[card.priority] }} />
                      <span style={{ fontSize: 10, color: tc.fgMuted, fontWeight: 500, textTransform: 'capitalize' }}>{card.priority}</span>
                    </div>
                    <LabelBadge color={card.tagColor}>
                      <LabelBadge.Label>{card.tag}</LabelBadge.Label>
                    </LabelBadge>
                  </div>

                  {/* Card title */}
                  <div style={{ fontSize: 12, fontWeight: 600, color: tc.fg, lineHeight: 1.4, marginBottom: 8 }}>
                    {card.title}
                  </div>

                  {/* Card footer: assignee + move actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <KanbanAssigneeAvatar initials={card.assignee} />
                    <div style={{ display: 'flex', gap: 4 }}>
                      {(['todo', 'inprogress', 'done'] as KanbanStatus[])
                        .filter((s) => s !== col.id)
                        .map((s) => (
                          <button
                            key={s}
                            onClick={() => moveCard(card.id, s)}
                            style={{
                              fontSize: 9,
                              padding: '2px 6px',
                              borderRadius: 4,
                              border: `1px solid ${tc.border}`,
                              background: tc.surfaceElevated,
                              cursor: 'pointer',
                              color: tc.fgMuted,
                              fontWeight: 600,
                            }}
                          >
                            {s === 'todo' ? 'To Do' : s === 'inprogress' ? 'Start' : 'Done'}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const KanbanBoard: Story = {
  render: () => <KanbanBoardRender />,
}

/* ═══════════════════════════════════════════
   11. UserProfile (Vercel/GitHub-style)
   ═══════════════════════════════════════════ */

const profileProjects = [
  { name: 'Orbit UI', desc: 'React design system with 3-tier token architecture', lang: 'TypeScript', stars: 142, color: '#6366f1' },
  { name: 'Clay Kit', desc: 'Previous generation component library (archived)', lang: 'JavaScript', stars: 38, color: '#94a3b8' },
  { name: 'Token Forge', desc: 'Design token transformation pipeline', lang: 'TypeScript', stars: 67, color: '#10b981' },
  { name: 'Icon Pack', desc: 'SVG icon set optimized for React', lang: 'SVG', stars: 24, color: '#f59e0b' },
]

const activityFeed = [
  { action: 'Pushed 3 commits to', target: 'feat/kanban-template', time: '2 hours ago' },
  { action: 'Opened PR #47', target: 'Linear/Vercel benchmark stories', time: '4 hours ago' },
  { action: 'Closed issue #42', target: 'ListTile compact density', time: 'Yesterday' },
  { action: 'Released', target: 'v2.5.0', time: '3 days ago' },
  { action: 'Created repository', target: 'token-forge', time: '1 week ago' },
]

const UserProfileRender: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'projects' | 'activity' | 'settings'>('projects')

  return (
    <div style={{ minHeight: '100vh', background: tc.surface, fontFamily: 'inherit' }}>
      {/* Top nav */}
      <nav style={{
        height: 52, background: tc.bg, borderBottom: `1px solid ${tc.border}`,
        padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>O</div>
          <Text textStyle="body2" style={{ fontWeight: 700 }}>Orbit</Text>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PageDots selected={true} />
          <PageDots selected={false} />
          <PageDots selected={false} />
          <Avatar>
            <Avatar.Fallback>HJ</Avatar.Fallback>
          </Avatar>
        </div>
      </nav>

      {/* Profile header */}
      <div style={{ background: tc.bg, borderBottom: `1px solid ${tc.border}`, padding: '32px 40px 0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
            {/* Avatar */}
            <Avatar style={{ width: 80, height: 80, flexShrink: 0 }}>
              <Avatar.Fallback style={{ fontSize: 28, fontWeight: 800 }}>HJ</Avatar.Fallback>
            </Avatar>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 4 }}>
                <Text textStyle="h3" style={{ fontWeight: 800 }}>Heejun Kim</Text>
                <AnimatedBadge color="club" size="small">
                  <AnimatedBadge.Label>Pro</AnimatedBadge.Label>
                </AnimatedBadge>
              </div>
              <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginBottom: 8 }}>@heejun · Seoul, Korea</Text>
              <Text textStyle="body2" style={{ color: tc.fgSub, display: 'block', marginBottom: 12, maxWidth: 480 }}>
                Building Orbit UI — a React design system with 3-tier token architecture. Passionate about DX, accessibility, and component API design.
              </Text>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                {[
                  { label: 'Repositories', count: 14 },
                  { label: 'Followers', count: 128 },
                  { label: 'Following', count: 42 },
                  { label: 'Stars', count: 271 },
                ].map((s) => (
                  <div key={s.label} style={{ display: 'flex', gap: 4, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: tc.fg }}>{s.count}</span>
                    <span style={{ fontSize: 12, color: tc.fgMuted }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Badges row */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                <SpeechBadge color="pink" tailPosition="leading">Available for work</SpeechBadge>
                <LabelBadge color="benefit"><LabelBadge.Label>Open Source</LabelBadge.Label></LabelBadge>
                <LabelBadge color="gray"><LabelBadge.Label>TypeScript</LabelBadge.Label></LabelBadge>
                <LabelBadge color="gray"><LabelBadge.Label>React</LabelBadge.Label></LabelBadge>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <SolidButton color="primary" size="small">
                <SolidButton.Center>Follow</SolidButton.Center>
              </SolidButton>
              <OutlineButton color="black" size="small">Cancel</OutlineButton>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderTop: `1px solid ${tc.border}` }}>
            {(['projects', 'activity', 'settings'] as const).map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '12px 16px',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? tc.fg : tc.fgSub,
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'color 0.12s',
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 40px' }}>
        {activeTab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {profileProjects.map((p) => (
              <div key={p.name} style={{
                background: tc.bg,
                borderRadius: 10,
                border: `1px solid ${tc.border}`,
                padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
                    <Text textStyle="body2" style={{ fontWeight: 700 }}>{p.name}</Text>
                  </div>
                  <LabelBadge color="gray"><LabelBadge.Label>{p.lang}</LabelBadge.Label></LabelBadge>
                </div>
                <Text textStyle="caption" style={{ color: tc.fgSub, display: 'block', marginBottom: 12, lineHeight: 1.5 }}>
                  {p.desc}
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: tc.fgMuted }}>
                    <StarLineIcon size={13} />
                    <span>{p.stars}</span>
                  </div>
                  <GhostButton color="black" size="small">View</GhostButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activityFeed.map((item, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '12px 0' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: tc.surfaceElevated, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Avatar style={{ width: 32, height: 32 }}>
                      <Avatar.Fallback style={{ fontSize: 10 }}>HJ</Avatar.Fallback>
                    </Avatar>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, color: tc.fgSub }}>{item.action} </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: tc.fg }}>{item.target}</span>
                    <Text textStyle="caption" style={{ display: 'block', color: tc.fgMuted, marginTop: 2 }}>{item.time}</Text>
                  </div>
                </div>
                {i < activityFeed.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ maxWidth: 480 }}>
            <Text textStyle="h4" style={{ display: 'block', fontWeight: 700, marginBottom: 16 }}>Profile Settings</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Display name', 'Username', 'Email', 'Bio', 'Location'].map((field) => (
                <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Text textStyle="caption" style={{ fontWeight: 600, color: tc.fgSub }}>{field}</Text>
                  <TextField placeholder={`Enter ${field.toLowerCase()}...`} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <SolidButton color="primary" size="small">
                  <SolidButton.Center>Save changes</SolidButton.Center>
                </SolidButton>
                <OutlineButton color="black" size="small">Cancel</OutlineButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const UserProfile: Story = {
  render: () => <UserProfileRender />,
}

/* ═══════════════════════════════════════════
   NotificationCenter
   헤더: 알림 제목 + 전체읽음 버튼 + 설정 아이콘버튼
   필터 탭: 전체 / 읽지않음 / 언급
   알림 목록: Avatar + 내용 + 시간 + LabelBadge(읽음/안읽음)
   하단: 더보기 버튼 + PageDots 페이지네이션
   활용 컴포넌트: AnimatedBadge, SpeechBadge, CounterBadge
   ═══════════════════════════════════════════ */
type NotifTab = 'all' | 'unread' | 'mention'

type NotifItem = {
  id: string
  initial: string
  name: string
  action: string
  target: string
  time: string
  isRead: boolean
  isMention: boolean
  type: 'comment' | 'like' | 'mention' | 'system'
}

const notifData: NotifItem[] = [
  { id: 'n1', initial: 'K', name: '김지혜', action: '이 포스트에 댓글을 남겼습니다:', target: '"Orbit UI 릴리즈 노트 v2.0"', time: '2분 전', isRead: false, isMention: false, type: 'comment' },
  { id: 'n2', initial: 'P', name: '박민준', action: '회원님을 언급했습니다:', target: '"@user 디자인 토큰 확인 부탁"', time: '15분 전', isRead: false, isMention: true, type: 'mention' },
  { id: 'n3', initial: 'L', name: '이소연', action: '회원님의 컴포넌트를 즐겨찾기에 추가했습니다', target: '', time: '1시간 전', isRead: false, isMention: false, type: 'like' },
  { id: 'n4', initial: 'C', name: '최동욱', action: '새 태스크를 할당했습니다:', target: '"DataTable 접근성 개선"', time: '3시간 전', isRead: true, isMention: false, type: 'system' },
  { id: 'n5', initial: 'Y', name: '윤해린', action: '스프린트 보드에 댓글을 남겼습니다:', target: '"LGTM! 배포 준비 완료"', time: '5시간 전', isRead: true, isMention: false, type: 'comment' },
  { id: 'n6', initial: 'S', name: '시스템', action: '예약된 유지보수가 오늘 자정에 시작됩니다', target: '', time: '어제', isRead: true, isMention: false, type: 'system' },
]

const notifInitialColors: Record<string, string> = {
  K: '#6366f1', P: '#8b5cf6', L: '#ec4899', C: '#f59e0b', Y: '#10b981', S: '#64748b',
}

const notifTypeColorMap: Record<string, string> = {
  comment: '#6366f1', like: '#ef4444', mention: '#f59e0b', system: '#10b981',
}

function NotifIcon({ type }: { type: string }) {
  if (type === 'like') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'mention') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'system') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const NotificationCenterRender = () => {
  const [activeTab, setActiveTab] = React.useState<NotifTab>('all')
  const [items, setItems] = React.useState<NotifItem[]>(notifData)
  const [page, setPage] = React.useState(0)

  const tabDefs: { key: NotifTab; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'unread', label: '읽지않음' },
    { key: 'mention', label: '언급' },
  ]

  const filtered = items.filter((n) => {
    if (activeTab === 'unread') return !n.isRead
    if (activeTab === 'mention') return n.isMention
    return true
  })

  const unreadCount = items.filter((n) => !n.isRead).length

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, isRead: true })))
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n))

  return (
    <div style={{
      width: '400px', minHeight: '600px',
      background: tc.bg, border: `1px solid ${tc.border}`,
      borderRadius: '16px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', borderBottom: `1px solid ${tc.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Text textStyle="body1" style={{ fontWeight: '700', color: tc.fg }}>알림</Text>
          {unreadCount > 0 && <CounterBadge>{unreadCount}</CounterBadge>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '12px', fontWeight: 600, color: tc.fillPrimary,
                padding: '4px 8px', borderRadius: '6px',
              }}
            >
              전체 읽음
            </button>
          )}
          <SolidIconButton size="small" color="black">
            <SettingLineIcon size={16} />
          </SolidIconButton>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{
        padding: '12px 20px', borderBottom: `1px solid ${tc.borderSub}`,
        display: 'flex', gap: '4px', flexShrink: 0,
      }}>
        {tabDefs.map((tab) => {
          const isActive = activeTab === tab.key
          const count = tab.key === 'unread'
            ? items.filter((n) => !n.isRead).length
            : tab.key === 'mention'
              ? items.filter((n) => n.isMention).length
              : items.length
          return (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setPage(0) }}
              aria-pressed={isActive}
              style={{
                padding: '5px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                background: isActive ? tc.fillPrimary : tc.surface,
                color: isActive ? '#fff' : tc.fgSub,
                fontSize: '12px', fontWeight: isActive ? 700 : 500,
                transition: 'all 0.15s ease',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}
            >
              {tab.label}
              <span style={{
                fontSize: '10px', fontWeight: 700,
                background: isActive ? 'rgba(255,255,255,0.25)' : tc.surfaceElevated,
                color: isActive ? '#fff' : tc.fgMuted,
                borderRadius: '100px', padding: '1px 5px', lineHeight: '14px',
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Notification list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '48px 24px', gap: '12px',
          }}>
            <NotificationLineIcon size={32} />
            <Text textStyle="body2" style={{ color: tc.fgMuted, textAlign: 'center' as const }}>
              {activeTab === 'unread' ? '읽지 않은 알림이 없습니다' : '언급된 알림이 없습니다'}
            </Text>
          </div>
        ) : filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') markRead(notif.id) }}
            style={{
              padding: '14px 20px 14px 28px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              background: notif.isRead ? tc.bg : 'rgba(99,102,241,0.04)',
              borderBottom: `1px solid ${tc.borderSub}`,
              cursor: 'pointer', transition: 'background 0.15s',
              position: 'relative' as const,
            }}
          >
            {!notif.isRead && (
              <div style={{
                position: 'absolute' as const, top: '20px', left: '10px',
                width: '6px', height: '6px', borderRadius: '50%', background: tc.fillPrimary,
              }} />
            )}
            <div style={{ position: 'relative' as const, flexShrink: 0 }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: notifInitialColors[notif.initial] ?? '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '14px', fontWeight: 700,
              }}>
                {notif.initial}
              </div>
              <div style={{
                position: 'absolute' as const, bottom: '-2px', right: '-2px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: notifTypeColorMap[notif.type],
                border: `2px solid ${tc.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
              }}>
                <NotifIcon type={notif.type} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                <Text textStyle="body2" style={{ fontWeight: notif.isRead ? 500 : 700, color: tc.fg, fontSize: '13px' }}>
                  {notif.name}
                </Text>
                <Text textStyle="caption" style={{ color: tc.fgMuted, fontSize: '11px', flexShrink: 0 }}>
                  {notif.time}
                </Text>
              </div>
              <Text textStyle="caption" style={{ color: tc.fgSub, fontSize: '12px', lineHeight: '1.5' }}>
                {notif.action}
                {notif.target && (
                  <span style={{ color: tc.fillPrimary, fontWeight: 500 }}> {notif.target}</span>
                )}
              </Text>
              {notif.isMention && (
                <div style={{ marginTop: '8px' }}>
                  <SpeechBadge color="blue" tailPosition="leading">
                    <Text textStyle="caption" style={{ fontSize: '11px', color: '#fff' }}>
                      {notif.target}
                    </Text>
                  </SpeechBadge>
                </div>
              )}
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LabelBadge color={notif.isRead ? 'gray' : 'benefit'}>
                  <LabelBadge.Label>{notif.isRead ? '읽음' : '안읽음'}</LabelBadge.Label>
                </LabelBadge>
                {notif.isMention && (
                  <AnimatedBadge size="small" color="sale">
                    <AnimatedBadge.Label>언급</AnimatedBadge.Label>
                  </AnimatedBadge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {filtered.length > 0 && (
        <div style={{
          padding: '12px 20px', borderTop: `1px solid ${tc.border}`,
          display: 'flex', flexDirection: 'column' as const, gap: '10px', flexShrink: 0,
        }}>
          <GhostButton
            color="black"
            size="small"
            style={{ width: '100%' }}
            onClick={() => setPage((p) => Math.min(p + 1, 2))}
          >
            <GhostButton.Center>더보기</GhostButton.Center>
          </GhostButton>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {[0, 1, 2].map((i) => (
              <PageDots key={i} selected={i === page % 3} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const NotificationCenter: Story = {
  render: () => <NotificationCenterRender />,
}
