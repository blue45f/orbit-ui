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
  ListTile,
  Loading,
  PageDots,
  PageIndicator,
  PageNumber,
  Progress,
  RadioButton,
  ScrollableTabGroup,
  SectionTitle,
  SegmentedControl,
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
import { Calendar } from '../components/Calendar'
import { SearchBar } from '../components/SearchBar'
import { Drawer } from '../components/Drawer'

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
  CalendarLineIcon,
  ChevronLeftLineIcon,
  ChevronRightLineIcon,
  TimeLineIcon,
  FilterIcon,
  GridViewLineIcon,
  ChevronDownLineIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowSortIcon,
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

/* ═══════════════════════════════════════════
   12. CalendarApp (일정 관리 앱)
   ═══════════════════════════════════════════ */

type CalEvent = {
  id: string
  time: string
  title: string
  category: 'meeting' | 'personal' | 'deadline'
  duration: string
}

const CALENDAR_EVENTS: Record<string, CalEvent[]> = {
  '2026-04-07': [
    { id: 'e1', time: '09:00', title: '팀 스탠드업', category: 'meeting', duration: '30분' },
    { id: 'e2', time: '14:00', title: '디자인 리뷰', category: 'meeting', duration: '1시간' },
  ],
  '2026-04-09': [
    { id: 'e3', time: '10:00', title: 'UI 컴포넌트 QA', category: 'deadline', duration: '2시간' },
    { id: 'e4', time: '15:00', title: '스프린트 회고', category: 'meeting', duration: '1시간' },
    { id: 'e5', time: '17:30', title: '헬스장', category: 'personal', duration: '1시간' },
  ],
  '2026-04-10': [
    { id: 'e6', time: '09:30', title: '기획 회의', category: 'meeting', duration: '1시간' },
    { id: 'e7', time: '11:00', title: '토큰 시스템 릴리즈', category: 'deadline', duration: '30분' },
    { id: 'e8', time: '13:00', title: '점심 약속', category: 'personal', duration: '1시간' },
    { id: 'e9', time: '16:00', title: 'PR 코드 리뷰', category: 'meeting', duration: '1시간 30분' },
  ],
  '2026-04-14': [
    { id: 'e10', time: '10:00', title: '분기 목표 설정', category: 'meeting', duration: '2시간' },
  ],
  '2026-04-17': [
    { id: 'e11', time: '14:00', title: '데모 데이 발표', category: 'deadline', duration: '1시간' },
  ],
}

const UPCOMING = [
  { date: '내일', title: 'UI 컴포넌트 QA', time: '10:00', category: 'deadline' as const },
  { date: '내일', title: '스프린트 회고', time: '15:00', category: 'meeting' as const },
  { date: '4월 14일', title: '분기 목표 설정', time: '10:00', category: 'meeting' as const },
  { date: '4월 17일', title: '데모 데이 발표', time: '14:00', category: 'deadline' as const },
]

const EVENT_COLORS: Record<CalEvent['category'], { bg: string; border: string; label: string; labelColor: 'sale' | 'gray' | 'benefit' }> = {
  meeting: { bg: 'rgba(99,102,241,0.08)', border: '#6366f1', label: '회의', labelColor: 'benefit' },
  personal: { bg: 'rgba(16,185,129,0.08)', border: '#10b981', label: '개인', labelColor: 'gray' },
  deadline: { bg: 'rgba(239,68,68,0.08)', border: '#ef4444', label: '마감', labelColor: 'sale' },
}

const CalendarAppRender: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2026-04-10'))

  const dateKey = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : ''

  const dayEvents = CALENDAR_EVENTS[dateKey] ?? []

  const formatSelectedDate = (d: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: tc.bg }}>
      {/* AppBar */}
      <AppBar>
        <AppBar.Leading>
          <SolidIconButton color="black" size="small">
            <MenuIcon />
          </SolidIconButton>
        </AppBar.Leading>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarLineIcon size={20} color={tc.fg} />
          <Text textStyle="subheadingMedium">캘린더</Text>
        </div>
        <AppBar.Trailing>
          <SolidIconButton color="black" size="small">
            <NotificationLineIcon />
          </SolidIconButton>
        </AppBar.Trailing>
      </AppBar>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel: Mini Calendar + Upcoming */}
        <aside style={{
          width: '300px',
          borderRight: `1px solid ${tc.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          background: tc.surface,
          padding: '16px',
          gap: '24px',
        }}>
          {/* Mini Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => d && setSelectedDate(d)}
              defaultMonth={new Date('2026-04-01')}
            />
          </div>

          <Divider />

          {/* Upcoming Events */}
          <div>
            <SectionTitle>
              <SectionTitle.Title>다가오는 일정</SectionTitle.Title>
              <SectionTitle.Trailing>
                <CounterBadge>{UPCOMING.length}</CounterBadge>
              </SectionTitle.Trailing>
            </SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {UPCOMING.map((ev, i) => (
                <ListTile
                  key={i}
                  style={{
                    borderRadius: '10px',
                    background: tc.bg,
                    border: `1px solid ${tc.border}`,
                    padding: '10px 12px',
                    cursor: 'pointer',
                  }}
                >
                  <ListTile.Leading>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: EVENT_COLORS[ev.category].bg,
                      border: `1px solid ${EVENT_COLORS[ev.category].border}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <TimeLineIcon size={14} color={EVENT_COLORS[ev.category].border} />
                    </div>
                  </ListTile.Leading>
                  <ListTile.Title fontWeight="bold">{ev.title}</ListTile.Title>
                  <ListTile.Description>{ev.date} · {ev.time}</ListTile.Description>
                  <ListTile.Trailing>
                    <LabelBadge color={EVENT_COLORS[ev.category].labelColor}>
                      {EVENT_COLORS[ev.category].label}
                    </LabelBadge>
                  </ListTile.Trailing>
                </ListTile>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Panel: Day Schedule */}
        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {/* Date Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <OutlineButton
                  color="black"
                  size="small"
                  onClick={() => {
                    const prev = new Date(selectedDate)
                    prev.setDate(prev.getDate() - 1)
                    setSelectedDate(prev)
                  }}
                >
                  <OutlineButton.Center>
                    <ChevronLeftLineIcon />
                  </OutlineButton.Center>
                </OutlineButton>
                <OutlineButton
                  color="black"
                  size="small"
                  onClick={() => {
                    const next = new Date(selectedDate)
                    next.setDate(next.getDate() + 1)
                    setSelectedDate(next)
                  }}
                >
                  <OutlineButton.Center>
                    <ChevronRightLineIcon />
                  </OutlineButton.Center>
                </OutlineButton>
              </div>
              <Text textStyle="headingMedium">{formatSelectedDate(selectedDate)}</Text>
              {dayEvents.length > 0 && (
                <CounterBadge>{dayEvents.length}</CounterBadge>
              )}
            </div>
            <SolidButton color="primary" size="small">
              <SolidButton.Leading>
                <CalendarLineIcon />
              </SolidButton.Leading>
              <SolidButton.Center>일정 추가</SolidButton.Center>
            </SolidButton>
          </div>

          {/* Event Timeline */}
          {dayEvents.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              gap: '12px',
            }}>
              <CalendarLineIcon size={48} color={tc.fgMuted} />
              <Text textStyle="subheadingSmall" style={{ color: tc.fgMuted }}>이 날에는 일정이 없습니다</Text>
              <Text textStyle="descriptionMedium" style={{ color: tc.fgMuted }}>
                일정 추가 버튼을 눌러 새 일정을 만들어보세요.
              </Text>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dayEvents.map((ev) => {
                const colors = EVENT_COLORS[ev.category]
                return (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'stretch',
                    }}
                  >
                    {/* Time column */}
                    <div style={{
                      width: '56px',
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      paddingTop: '14px',
                      gap: '4px',
                    }}>
                      <Text textStyle="descriptionLargeEmphasized" style={{ color: tc.fg }}>{ev.time}</Text>
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{ev.duration}</Text>
                    </div>

                    {/* Color bar */}
                    <div style={{
                      width: '3px',
                      borderRadius: '999px',
                      background: colors.border,
                      flexShrink: 0,
                    }} />

                    {/* Event card */}
                    <div style={{
                      flex: 1,
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: colors.bg,
                      border: `1px solid ${colors.border}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.15s',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Text textStyle="subheadingSmall">{ev.title}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <TimeLineIcon size={12} color={tc.fgMuted} />
                          <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>
                            {ev.time} · {ev.duration}
                          </Text>
                        </div>
                      </div>
                      <LabelBadge color={colors.labelColor}>
                        {colors.label}
                      </LabelBadge>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export const CalendarApp: Story = {
  render: () => <CalendarAppRender />,
}

/* ═══════════════════════════════════════════
   14. Analytics Dashboard (PC)
   미사용 컴포넌트: PageIndicator, PageNumber, SegmentedControl
   ═══════════════════════════════════════════ */

const KPI_DATA = [
  { label: '총 방문자', value: '124,892', change: '+14.2%', positive: true, color: '#6366f1' },
  { label: '전환율', value: '3.84%', change: '+0.6%', positive: true, color: '#10b981' },
  { label: '이탈율', value: '42.1%', change: '-2.3%', positive: true, color: '#f59e0b' },
  { label: '평균 세션', value: '4m 12s', change: '+18s', positive: true, color: '#8b5cf6' },
]

const TABLE_ROWS = [
  { page: '/home', visitors: 48210, bounceRate: '38%', avgTime: '2m 14s', change: '+12%' },
  { page: '/product', visitors: 31450, bounceRate: '29%', avgTime: '5m 41s', change: '+8%' },
  { page: '/pricing', visitors: 18920, bounceRate: '52%', avgTime: '1m 38s', change: '-3%' },
  { page: '/blog', visitors: 14300, bounceRate: '61%', avgTime: '6m 05s', change: '+22%' },
  { page: '/contact', visitors: 8750, bounceRate: '44%', avgTime: '3m 19s', change: '+5%' },
]

const PAGES_TOTAL = 8

const AnalyticsDashboardRender = () => {
  const [_dateRange, _setDateRange] = React.useState(0)
  const [channel, setChannel] = React.useState('all')
  const [sortCol, setSortCol] = React.useState<string | null>(null)
  const [sortAsc, setSortAsc] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [indicatorPage, setIndicatorPage] = React.useState(0)

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc((p) => !p)
    } else {
      setSortCol(col)
      setSortAsc(true)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: tc.surface, fontFamily: 'system-ui, sans-serif' }}>
      <aside style={{ width: 220, background: tc.bg, borderRight: `1px solid ${tc.border}`, display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
        <div style={{ padding: '0 20px 24px', borderBottom: `1px solid ${tc.border}` }}>
          <Text textStyle="titleLarge" style={{ color: tc.fillPrimary, fontWeight: 700 }}>Orbit Analytics</Text>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 12px', flex: 1 }}>
          {['대시보드', '트래픽', '전환', '사용자', '설정'].map((item, idx) => (
            <button
              key={item}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: idx === 0 ? 'rgba(99,102,241,0.08)' : 'transparent',
                color: idx === 0 ? tc.fillPrimary : tc.fgSub,
                fontWeight: idx === 0 ? 600 : 400, fontSize: '14px', textAlign: 'left',
              }}
            >
              {[<HomeLineIcon key="h" size={16} />, <ListLineIcon key="l" size={16} />, <ArrowRightIcon key="a" size={16} />, <PeopleLineIcon key="p" size={16} />, <SettingLineIcon key="s" size={16} />][idx]}
              {item}
              {idx === 0 && (
                <CounterBadge style={{ marginLeft: 'auto' }}>{3}</CounterBadge>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto', maxWidth: 'calc(100% - 220px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <Text textStyle="displaySmall" style={{ color: tc.fg, fontWeight: 700, display: 'block' }}>분석 대시보드</Text>
            <Text textStyle="bodyMedium" style={{ color: tc.fgSub }}>사이트 성과 요약</Text>
          </div>
          <SegmentedControl defaultValue="7d">
            <SegmentedControl.Tab value="7d"><SegmentedControl.TabCenter>7일</SegmentedControl.TabCenter></SegmentedControl.Tab>
            <SegmentedControl.Tab value="30d"><SegmentedControl.TabCenter>30일</SegmentedControl.TabCenter></SegmentedControl.Tab>
            <SegmentedControl.Tab value="90d"><SegmentedControl.TabCenter>90일</SegmentedControl.TabCenter></SegmentedControl.Tab>
          </SegmentedControl>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {KPI_DATA.map((kpi) => (
            <div key={kpi.label} style={{ background: tc.bg, borderRadius: '12px', padding: '20px', border: `1px solid ${tc.border}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: kpi.color }} />
              <Text textStyle="descriptionMedium" style={{ color: tc.fgSub, display: 'block', marginBottom: '8px' }}>{kpi.label}</Text>
              <Text textStyle="displaySmall" style={{ color: tc.fg, fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '24px' }}>{kpi.value}</Text>
              <LabelBadge color={kpi.positive ? 'benefit' : 'sale'}>{kpi.change}</LabelBadge>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <PageIndicator currentPage={indicatorPage} onPageChange={setIndicatorPage}>
            {Array.from({ length: 4 }, (_, i) => <span key={i} />)}
          </PageIndicator>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', background: tc.bg, padding: '16px', borderRadius: '12px', border: `1px solid ${tc.border}` }}>
          <FilterIcon size={16} color={tc.fgSub} />
          <Text textStyle="labelMedium" style={{ color: tc.fgSub, marginRight: '4px' }}>채널:</Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['전체', '오가닉', '유료', '소셜'].map((ch, idx) => {
              const isActive = channel === ['all', 'organic', 'paid', 'social'][idx]
              return (
                <button
                  key={ch}
                  onClick={() => setChannel(['all', 'organic', 'paid', 'social'][idx])}
                  style={{
                    padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                    background: isActive ? tc.fillPrimary : tc.surface,
                    color: isActive ? '#fff' : tc.fgSub,
                    border: `1px solid ${isActive ? tc.fillPrimary : tc.border}`,
                  }}
                >
                  {ch}
                </button>
              )
            })}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ width: '200px' }}><SearchBar placeholder="페이지 검색..." /></div>
        </div>
        <div style={{ background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}`, overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${tc.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text textStyle="titleSmall" style={{ fontWeight: 600, color: tc.fg }}>페이지별 트래픽</Text>
            <LabelBadge color="gray">{TABLE_ROWS.length}개 페이지</LabelBadge>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: tc.surface }}>
                {[{ key: 'page', label: '페이지' }, { key: 'visitors', label: '방문자' }, { key: 'bounceRate', label: '이탈율' }, { key: 'avgTime', label: '평균 체류' }, { key: 'change', label: '변화율' }].map((col) => (
                  <th key={col.key} onClick={() => handleSort(col.key)} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.fgSub, cursor: 'pointer', borderBottom: `1px solid ${tc.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {col.label}
                      {sortCol === col.key ? (sortAsc ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />) : <ArrowSortIcon size={12} color={tc.fgMuted} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, idx) => (
                <tr key={row.page} style={{ borderBottom: idx < TABLE_ROWS.length - 1 ? `1px solid ${tc.borderSub}` : 'none' }}>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 500, color: tc.fg }}>{row.page}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: tc.fg }}>{row.visitors.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: tc.fgSub }}>{row.bounceRate}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: tc.fgSub }}>{row.avgTime}</td>
                  <td style={{ padding: '14px 16px' }}><LabelBadge color={row.change.startsWith('+') ? 'benefit' : 'sale'}>{row.change}</LabelBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
          <Text textStyle="descriptionMedium" style={{ color: tc.fgSub }}>
            총 {PAGES_TOTAL * TABLE_ROWS.length}개 중 {(currentPage - 1) * TABLE_ROWS.length + 1}-{currentPage * TABLE_ROWS.length}개
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <OutlineButton color="black" size="small" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
              <OutlineButton.Leading><ChevronLeftLineIcon size={14} /></OutlineButton.Leading>
              <OutlineButton.Center>이전</OutlineButton.Center>
            </OutlineButton>
            <PageNumber current={currentPage} total={PAGES_TOTAL} />
            <OutlineButton color="black" size="small" disabled={currentPage >= PAGES_TOTAL} onClick={() => setCurrentPage((p) => Math.min(PAGES_TOTAL, p + 1))}>
              <OutlineButton.Center>다음</OutlineButton.Center>
              <OutlineButton.Trailing><ChevronRightLineIcon size={14} /></OutlineButton.Trailing>
            </OutlineButton>
          </div>
        </div>
      </main>
    </div>
  )
}

export const AnalyticsDashboard: Story = {
  render: () => <AnalyticsDashboardRender />,
}

/* ═══════════════════════════════════════════
   15. File Manager (PC)
   미사용 컴포넌트: Space, SearchBar, Drawer (필터 패널)
   ═══════════════════════════════════════════ */

const FM_FOLDERS = [
  { name: '디자인 시스템', count: 24, color: '#6366f1' },
  { name: '마케팅 자료', count: 12, color: '#10b981' },
  { name: '개발 문서', count: 38, color: '#f59e0b' },
  { name: '스프린트 자료', count: 8, color: '#8b5cf6' },
]

const FM_FILES = [
  { name: 'design-tokens.pdf', type: 'PDF', size: '2.4 MB', modified: '2일 전', color: '#ef4444' },
  { name: 'orbit-ui-spec.figma', type: 'Figma', size: '18.7 MB', modified: '1일 전', color: '#6366f1' },
  { name: 'component-list.xlsx', type: 'Excel', size: '524 KB', modified: '3일 전', color: '#10b981' },
  { name: 'README.md', type: 'Markdown', size: '12 KB', modified: '오늘', color: '#64748b' },
  { name: 'sprint-plan.pptx', type: 'PPT', size: '6.1 MB', modified: '5일 전', color: '#f59e0b' },
  { name: 'user-research.pdf', type: 'PDF', size: '3.8 MB', modified: '1주일 전', color: '#ef4444' },
]

const FmFileIcon = ({ color }: { color: string }) => (
  <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
    <rect width="32" height="40" rx="4" fill={color} fillOpacity="0.1" />
    <rect x="0" y="0" width="32" height="40" rx="4" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
    <path d="M8 10 L20 10 L24 14 L24 32 L8 32 Z" fill={color} fillOpacity="0.2" />
    <path d="M20 10 L20 14 L24 14" fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
  </svg>
)

const FmFolderIcon = ({ color }: { color: string }) => (
  <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
    <path d="M2 8 C2 6 3.34 4 5.34 4 L15 4 L18 8 L35 8 C37 8 38 9 38 11 L38 27 C38 29 37 30 35 30 L5 30 C3 30 2 29 2 27 Z" fill={color} fillOpacity="0.2" stroke={color} strokeOpacity="0.4" strokeWidth="1.5" />
  </svg>
)

const FileManagerRender = () => {
  const [viewMode, _setViewMode] = React.useState('grid')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedFolder, setSelectedFolder] = React.useState('디자인 시스템')
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [fileType, setFileType] = React.useState<string[]>([])

  const filteredFiles = FM_FILES.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (fileType.length === 0 || fileType.includes(f.type))
  )

  return (
    <div style={{ display: 'flex', height: '100vh', background: tc.surface, fontFamily: 'system-ui, sans-serif' }}>
      <aside style={{ width: 240, background: tc.bg, borderRight: `1px solid ${tc.border}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px 12px', borderBottom: `1px solid ${tc.border}` }}>
          <Text textStyle="titleMedium" style={{ color: tc.fg, fontWeight: 700 }}>파일 관리자</Text>
        </div>
        <nav style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
          <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.08em', padding: '0 8px', display: 'block', marginBottom: '8px' }}>
            폴더
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {FM_FOLDERS.map((folder) => (
              <ListTile
                key={folder.name}
                onClick={() => setSelectedFolder(folder.name)}
                style={{ background: selectedFolder === folder.name ? 'rgba(99,102,241,0.08)' : 'transparent', borderRadius: '8px', padding: '8px 10px' }}
              >
                <ListTile.Leading><FmFolderIcon color={folder.color} /></ListTile.Leading>
                <ListTile.Title style={{ fontSize: '13px', fontWeight: selectedFolder === folder.name ? 600 : 400, color: selectedFolder === folder.name ? tc.fillPrimary : tc.fg }}>
                  {folder.name}
                </ListTile.Title>
                <ListTile.Trailing>
                  <CounterBadge>{folder.count}</CounterBadge>
                </ListTile.Trailing>
              </ListTile>
            ))}
          </div>
        </nav>
      </aside>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AppBar>
          <AppBar.Leading>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <Text textStyle="descriptionMedium" style={{ color: tc.fgMuted }}>파일 관리자</Text>
              <ChevronDownLineIcon size={14} color={tc.fgMuted} />
              <Text textStyle="descriptionMedium" style={{ color: tc.fg, fontWeight: 500 }}>{selectedFolder}</Text>
            </div>
          </AppBar.Leading>
          <AppBar.Center>
            <div style={{ width: '280px' }}>
              <SearchBar
                placeholder="파일 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              />
            </div>
          </AppBar.Center>
          <AppBar.Trailing>
            <SegmentedControl defaultValue="grid">
              <SegmentedControl.Tab value="grid"><SegmentedControl.TabCenter><GridViewLineIcon size={14} /></SegmentedControl.TabCenter></SegmentedControl.Tab>
              <SegmentedControl.Tab value="list"><SegmentedControl.TabCenter><ListLineIcon size={14} /></SegmentedControl.TabCenter></SegmentedControl.Tab>
            </SegmentedControl>
            <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
              <Drawer.Trigger asChild>
                <OutlineButton color="black" size="small">
                  <OutlineButton.Leading><FilterIcon size={14} /></OutlineButton.Leading>
                  <OutlineButton.Center>필터</OutlineButton.Center>
                </OutlineButton>
              </Drawer.Trigger>
              <Drawer.Content side="right">
                <Drawer.Header>
                  <Drawer.Title>파일 필터</Drawer.Title>
                  <Drawer.Description>파일 타입을 선택하여 필터링합니다.</Drawer.Description>
                </Drawer.Header>
                <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['PDF', 'Figma', 'Excel', 'PPT', 'Markdown'].map((type) => (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Checkbox
                        checked={fileType.includes(type)}
                        onChange={() => setFileType((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])}
                      />
                      <Text textStyle="bodyMedium">{type}</Text>
                    </div>
                  ))}
                </div>
                <Drawer.Footer>
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <OutlineButton color="gray" size="medium" style={{ flex: 1 }} onClick={() => setFileType([])}>
                      <OutlineButton.Center>초기화</OutlineButton.Center>
                    </OutlineButton>
                    <Drawer.Close asChild>
                      <SolidButton color="primary" size="medium" style={{ flex: 1 }}>
                        <SolidButton.Center>적용{fileType.length > 0 ? ` (${fileType.length})` : ''}</SolidButton.Center>
                      </SolidButton>
                    </Drawer.Close>
                  </div>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer>
          </AppBar.Trailing>
        </AppBar>
        <div style={{ padding: '12px 24px', borderBottom: `1px solid ${tc.border}`, background: tc.bg }}>
          <Breadcrumb>
            <Breadcrumb.Item>파일 관리자</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedFolder}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {filteredFiles.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px' }}>
              <Text textStyle="titleSmall" style={{ color: tc.fgMuted }}>검색 결과가 없습니다</Text>
              <Text textStyle="bodyMedium" style={{ color: tc.fgMuted }}>{searchQuery}와 일치하는 파일이 없어요</Text>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
              {filteredFiles.map((file) => (
                <div key={file.name} style={{ background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}`, padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <FmFileIcon color={file.color} />
                  <div style={{ textAlign: 'center' }}>
                    <Text textStyle="labelSmall" style={{ color: tc.fg, fontWeight: 500, display: 'block', wordBreak: 'break-word', fontSize: '12px' }}>{file.name}</Text>
                    <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontSize: '11px' }}>{file.size}</Text>
                  </div>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 500 }}>{file.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
              {filteredFiles.map((file, idx) => (
                <div key={file.name} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 20px', cursor: 'pointer', borderBottom: idx < filteredFiles.length - 1 ? `1px solid ${tc.borderSub}` : 'none' }}>
                  <FmFileIcon color={file.color} />
                  <div style={{ flex: 1 }}>
                    <Text textStyle="bodyMedium" style={{ fontWeight: 500, color: tc.fg, display: 'block' }}>{file.name}</Text>
                    <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{file.modified} · {file.size}</Text>
                  </div>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 500, fontSize: '12px' }}>{file.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: '10px 24px', borderTop: `1px solid ${tc.border}`, background: tc.bg, display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{filteredFiles.length}개 파일</Text>
          <div style={{ flex: 1 }} />
          {fileType.length > 0 && (
            <LabelBadge color="sale">필터 적용: {fileType.join(', ')}</LabelBadge>
          )}
        </div>
      </main>
    </div>
  )
}

export const FileManager: Story = {
  render: () => <FileManagerRender />,
}

/* ═══════════════════════════════════════════
   16. DeploymentHub (Vercel-inspired)
   Vercel Design: 모노크롬 팔레트, 컴팩트 밀도, 배포 현황 대시보드
   Components: SolidButton, OutlineButton, GhostButton, LabelBadge,
               CounterBadge, Toggle, Text, Tooltip, Breadcrumb, Avatar
   ═══════════════════════════════════════════ */

type DeployStatus = 'ready' | 'building' | 'error' | 'canceled'

const DEPLOY_STATUS_CFG: Record<DeployStatus, { color: string; label: string }> = {
  ready:    { color: '#10b981', label: 'Ready' },
  building: { color: '#f59e0b', label: 'Building' },
  error:    { color: '#ef4444', label: 'Error' },
  canceled: { color: '#94a3b8', label: 'Canceled' },
}

const DEPLOY_LIST = [
  { id: 'dpl-8ax9', commit: 'a3f9b2c', message: 'feat: add Raycast slider story',    branch: 'main',           author: 'HJ', status: 'ready'    as DeployStatus, duration: '1m 24s', ago: '2m ago',  env: 'Production' },
  { id: 'dpl-7kc3', commit: 'e71c4d8', message: 'fix: password strength meter',      branch: 'feat/password',  author: 'MJ', status: 'building' as DeployStatus, duration: '--',    ago: '8m ago',  env: 'Preview' },
  { id: 'dpl-6rb1', commit: 'b50f912', message: 'chore: update dependencies',        branch: 'chore/deps',     author: 'SY', status: 'error'    as DeployStatus, duration: '0m 38s', ago: '32m ago', env: 'Preview' },
  { id: 'dpl-5wq8', commit: 'd2a8e61', message: 'refactor: 3-tier token system',     branch: 'refactor/tok',   author: 'HJ', status: 'ready'    as DeployStatus, duration: '2m 05s', ago: '1h ago',  env: 'Production' },
  { id: 'dpl-4mt6', commit: 'f9c3b47', message: 'test: add DataTable unit tests',    branch: 'test/datatable', author: 'DW', status: 'canceled' as DeployStatus, duration: '--',    ago: '3h ago',  env: 'Preview' },
  { id: 'dpl-3xk2', commit: '77de021', message: 'docs: update BenchmarkComparison', branch: 'main',           author: 'HJ', status: 'ready'    as DeployStatus, duration: '1m 51s', ago: '6h ago',  env: 'Production' },
]

const HUB_INTEGRATIONS = [
  { name: 'GitHub', connected: true,  lastSync: '1m ago' },
  { name: 'Slack',  connected: true,  lastSync: '5m ago' },
  { name: 'Sentry', connected: false, lastSync: 'Never' },
]

const HUB_ENV_VARS = [
  { key: 'NEXT_PUBLIC_API_URL',    value: 'https://api.orbit-ui.dev',  env: 'Production' },
  { key: 'NEXT_PUBLIC_SENTRY_DSN', value: 'https://...@sentry.io/123', env: 'All' },
  { key: 'DATABASE_URL',           value: '•••••••••••••',             env: 'Production' },
]

const DeploymentHubRender: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deployments' | 'settings' | 'env'>('deployments')
  const [filterStatus, setFilterStatus] = useState<DeployStatus | 'all'>('all')
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true)
  const [previewEnabled, setPreviewEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = DEPLOY_LIST.filter((d) => {
    const matchStatus = filterStatus === 'all' || d.status === filterStatus
    const matchSearch = searchQuery === '' || d.message.toLowerCase().includes(searchQuery.toLowerCase()) || d.commit.includes(searchQuery)
    return matchStatus && matchSearch
  })

  const errorCount = DEPLOY_LIST.filter((d) => d.status === 'error').length

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#fafafa', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: tc.bg, borderRight: `1px solid ${tc.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${tc.borderSub}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>O</div>
          <div>
            <Text textStyle="bodyMedium" style={{ fontWeight: 700, color: tc.fg, display: 'block', lineHeight: '1.2' }}>orbit-ui</Text>
            <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontSize: '11px' }}>heejun / main</Text>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {(['deployments', 'settings', 'env'] as const).map((id) => {
            const isActive = activeTab === id
            const label = id === 'deployments' ? 'Deployments' : id === 'settings' ? 'Settings' : 'Environment'
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  background: isActive ? '#f1f5f9' : 'transparent',
                  color: isActive ? tc.fg : tc.fgSub,
                  fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  textAlign: 'left', width: '100%',
                }}
              >
                {label}
                {id === 'deployments' && errorCount > 0 && (
                  <CounterBadge style={{ marginLeft: 'auto', fontSize: '10px' }}>{errorCount}</CounterBadge>
                )}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${tc.borderSub}` }}>
          {[
            { label: 'Total deploys', value: String(DEPLOY_LIST.length) },
            { label: 'Success rate', value: `${Math.round((DEPLOY_LIST.filter((d) => d.status === 'ready').length / DEPLOY_LIST.length) * 100)}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
              <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{label}</Text>
              <Text textStyle="descriptionSmall" style={{ color: tc.fg, fontWeight: 600 }}>{value}</Text>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: 52, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: tc.bg, borderBottom: `1px solid ${tc.border}`, flexShrink: 0 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Orbit</Breadcrumb.Item>
            <Breadcrumb.Item>orbit-ui</Breadcrumb.Item>
            <Breadcrumb.Item>{activeTab === 'deployments' ? 'Deployments' : activeTab === 'settings' ? 'Settings' : 'Environment'}</Breadcrumb.Item>
          </Breadcrumb>
          <Avatar style={{ width: 28, height: 28 }}>
            <Avatar.Fallback style={{ fontSize: '11px' }}>HJ</Avatar.Fallback>
          </Avatar>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Deployments tab */}
          {activeTab === 'deployments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 900 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <Text textStyle="titleLarge" style={{ fontWeight: 700, color: tc.fg, display: 'block', marginBottom: '4px' }}>Deployments</Text>
                  <Text textStyle="bodyMedium" style={{ color: tc.fgSub }}>All deployments for orbit-ui</Text>
                </div>
                <SolidButton color="primary" size="medium">
                  <SolidButton.Center>Deploy</SolidButton.Center>
                </SolidButton>
              </div>

              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {(['all', 'ready', 'error', 'building'] as const).map((s) => {
                  const count = s === 'all' ? DEPLOY_LIST.length : DEPLOY_LIST.filter((d) => d.status === s).length
                  const cfg = s !== 'all' ? DEPLOY_STATUS_CFG[s] : null
                  const isActive = filterStatus === s
                  return (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      style={{
                        padding: '12px 14px', borderRadius: '8px',
                        border: `1.5px solid ${isActive ? (cfg?.color ?? tc.fillPrimary) : tc.border}`,
                        background: isActive ? `${cfg?.color ?? tc.fillPrimary}08` : tc.bg,
                        cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        {cfg && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: cfg.color }} />}
                        <Text textStyle="descriptionSmall" style={{ color: tc.fgSub, textTransform: 'capitalize' }}>{s}</Text>
                      </div>
                      <Text textStyle="titleLarge" style={{ fontWeight: 700, color: tc.fg, fontSize: '20px' }}>{String(count)}</Text>
                    </button>
                  )
                })}
              </div>

              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search deployments..."
                    aria-label="Search deployments"
                    style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '8px', border: `1px solid ${tc.border}`, fontSize: '13px', outline: 'none', boxSizing: 'border-box', background: tc.bg }}
                  />
                  <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: tc.fgMuted }} width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, marginLeft: 'auto' }}>
                  {filtered.length} of {DEPLOY_LIST.length}
                </Text>
              </div>

              {/* List */}
              <div style={{ borderRadius: '8px', border: `1px solid ${tc.border}`, background: tc.bg, overflow: 'hidden' }}>
                {filtered.map((deploy, idx) => {
                  const cfg = DEPLOY_STATUS_CFG[deploy.status]
                  return (
                    <div key={deploy.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', borderBottom: idx < filtered.length - 1 ? `1px solid ${tc.borderSub}` : 'none' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cfg.color, flexShrink: 0, boxShadow: deploy.status === 'building' ? `0 0 0 3px ${cfg.color}25` : 'none' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                          <code style={{ fontFamily: 'monospace', fontSize: '11px', color: tc.fillPrimary, background: `${tc.fillPrimary}12`, padding: '1px 5px', borderRadius: '3px' }}>{deploy.commit}</code>
                          <Text textStyle="bodyMedium" style={{ color: tc.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deploy.message}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{deploy.branch}</Text>
                          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: tc.fgMuted }} />
                          <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{deploy.ago}</Text>
                        </div>
                      </div>
                      <LabelBadge color={deploy.env === 'Production' ? 'benefit' : 'gray'}>
                        <LabelBadge.Label>{deploy.env}</LabelBadge.Label>
                      </LabelBadge>
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontFamily: 'monospace', minWidth: '56px', textAlign: 'right' }}>{deploy.duration}</Text>
                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            <Avatar style={{ width: 24, height: 24, cursor: 'pointer' }}>
                              <Avatar.Fallback style={{ fontSize: '9px' }}>{deploy.author}</Avatar.Fallback>
                            </Avatar>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>{deploy.author}</Tooltip.Content>
                      </Tooltip>
                    </div>
                  )
                })}
                {filtered.length === 0 && (
                  <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                    <Text textStyle="bodyMedium" style={{ color: tc.fgMuted }}>No deployments match your filters</Text>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings tab */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 640 }}>
              <div>
                <Text textStyle="titleLarge" style={{ fontWeight: 700, color: tc.fg, display: 'block', marginBottom: '4px' }}>Project Settings</Text>
                <Text textStyle="bodyMedium" style={{ color: tc.fgSub }}>Manage deployment configuration</Text>
              </div>
              <div style={{ background: tc.bg, borderRadius: '8px', border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${tc.borderSub}`, background: tc.surface }}>
                  <Text textStyle="bodyMedium" style={{ fontWeight: 700, color: tc.fg }}>Git Integration</Text>
                </div>
                {[
                  { key: 'auto',    label: 'Auto Deploy',         desc: 'Deploy automatically on every push to main branch', value: autoDeployEnabled, toggle: () => setAutoDeployEnabled((v) => !v) },
                  { key: 'preview', label: 'Preview Deployments', desc: 'Deploy preview builds for every pull request',       value: previewEnabled,    toggle: () => setPreviewEnabled((v) => !v) },
                ].map((item, i, arr) => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: i < arr.length - 1 ? `1px solid ${tc.borderSub}` : 'none' }}>
                    <div>
                      <Text textStyle="bodyMedium" style={{ fontWeight: 500, color: tc.fg, display: 'block' }}>{item.label}</Text>
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, marginTop: '2px' }}>{item.desc}</Text>
                    </div>
                    <Toggle checked={item.value} onCheckedChange={item.toggle} />
                  </div>
                ))}
              </div>
              <div style={{ background: tc.bg, borderRadius: '8px', border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${tc.borderSub}`, background: tc.surface }}>
                  <Text textStyle="bodyMedium" style={{ fontWeight: 700, color: tc.fg }}>Integrations</Text>
                </div>
                {HUB_INTEGRATIONS.map((item, i) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: i < HUB_INTEGRATIONS.length - 1 ? `1px solid ${tc.borderSub}` : 'none' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: item.connected ? '#f0fdf4' : tc.surface, border: `1px solid ${item.connected ? '#bbf7d0' : tc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Text textStyle="descriptionSmall" style={{ fontWeight: 700, color: item.connected ? '#10b981' : tc.fgMuted, fontSize: '11px' }}>{item.name.charAt(0)}</Text>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text textStyle="bodyMedium" style={{ fontWeight: 500, color: tc.fg, display: 'block' }}>{item.name}</Text>
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>{item.connected ? `Synced ${item.lastSync}` : 'Not connected'}</Text>
                    </div>
                    {item.connected ? (
                      <LabelBadge color="benefit"><LabelBadge.Label>Connected</LabelBadge.Label></LabelBadge>
                    ) : (
                      <OutlineButton color="black" size="small">Connect</OutlineButton>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ background: tc.bg, borderRadius: '8px', border: '1.5px solid #fecaca', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #fecaca', background: '#fff5f5' }}>
                  <Text textStyle="bodyMedium" style={{ fontWeight: 700, color: '#dc2626' }}>Danger Zone</Text>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text textStyle="bodyMedium" style={{ fontWeight: 500, color: tc.fg, display: 'block' }}>Delete Project</Text>
                    <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted }}>Once deleted, this project cannot be recovered</Text>
                  </div>
                  <OutlineButton color="black" size="small" style={{ borderColor: '#ef4444', color: '#ef4444' }}>Delete</OutlineButton>
                </div>
              </div>
            </div>
          )}

          {/* Environment tab */}
          {activeTab === 'env' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 720 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text textStyle="titleLarge" style={{ fontWeight: 700, color: tc.fg, display: 'block', marginBottom: '4px' }}>Environment Variables</Text>
                  <Text textStyle="bodyMedium" style={{ color: tc.fgSub }}>Manage secrets and configuration</Text>
                </div>
                <SolidButton color="primary" size="medium">
                  <SolidButton.Center>Add Variable</SolidButton.Center>
                </SolidButton>
              </div>
              <div style={{ background: tc.bg, borderRadius: '8px', border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr 80px', padding: '10px 16px', borderBottom: `1px solid ${tc.border}`, background: tc.surface }}>
                  {['Key', 'Value', 'Environment', ''].map((h) => (
                    <Text key={h} textStyle="descriptionSmall" style={{ fontWeight: 700, color: tc.fgSub, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>{h}</Text>
                  ))}
                </div>
                {HUB_ENV_VARS.map((ev, idx) => (
                  <div key={ev.key} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr 80px', padding: '12px 16px', alignItems: 'center', borderBottom: idx < HUB_ENV_VARS.length - 1 ? `1px solid ${tc.borderSub}` : 'none' }}>
                    <code style={{ fontFamily: 'monospace', fontSize: '12px', color: tc.fg, fontWeight: 600 }}>{ev.key}</code>
                    <code style={{ fontFamily: 'monospace', fontSize: '12px', color: tc.fgSub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.value}</code>
                    <LabelBadge color={ev.env === 'Production' ? 'benefit' : 'gray'}>
                      <LabelBadge.Label>{ev.env}</LabelBadge.Label>
                    </LabelBadge>
                    <GhostButton color="black" size="small" style={{ padding: '4px 8px' }}>Edit</GhostButton>
                  </div>
                ))}
              </div>
              <div style={{ padding: '14px 16px', borderRadius: '8px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '1px', flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="#6366f1" strokeWidth="1.5" />
                  <path d="M8 7v4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="5" r="0.75" fill="#6366f1" />
                </svg>
                <Text textStyle="descriptionSmall" style={{ color: '#6366f1' }}>
                  Environment variables are encrypted at rest and only decrypted at runtime. Never commit secrets to git.
                </Text>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export const DeploymentHub: Story = {
  render: () => <DeploymentHubRender />,
}

/* ═══════════════════════════════════════════
   16. Pricing Page — Vercel/shadcn 벤치마크
   ═══════════════════════════════════════════ */
const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: '개인 프로젝트와 소규모 팀을 위한 플랜',
    badge: null,
    color: '#64748b',
    features: [
      '컴포넌트 라이브러리 (50+)',
      '커뮤니티 테마 1개',
      '월 1,000 빌드 분',
      '팀 멤버 최대 3명',
      '커뮤니티 지원',
      '기본 Analytics',
    ],
    limits: ['커스텀 도메인 없음', 'SSO 미지원'],
    cta: '무료로 시작하기',
    ctaVariant: 'outline' as const,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 29000, yearly: 24000 },
    description: '성장하는 팀과 프로덕션 서비스를 위한 플랜',
    badge: 'POPULAR',
    color: '#6366f1',
    features: [
      '컴포넌트 라이브러리 (150+)',
      '모든 공식 테마',
      '월 100,000 빌드 분',
      '팀 멤버 최대 15명',
      '우선 이메일 지원',
      '고급 Analytics + 리포트',
      '피그마 연동',
      '커스텀 도메인',
    ],
    limits: ['SSO 미지원'],
    cta: 'Pro로 업그레이드',
    ctaVariant: 'solid' as const,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    description: '대규모 조직을 위한 맞춤형 엔터프라이즈 솔루션',
    badge: null,
    color: '#0f172a',
    features: [
      '모든 Pro 기능 포함',
      '무제한 팀 멤버',
      '무제한 빌드',
      '전용 슬랙 채널 지원',
      'SSO / SAML',
      '99.99% SLA 보장',
      'On-premise 옵션',
      '맞춤 계약',
    ],
    limits: [],
    cta: '영업팀에 문의',
    ctaVariant: 'outline' as const,
  },
]

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: '연간 구독과 월간 구독의 차이는 무엇인가요?',
    answer: '연간 구독 시 월간 대비 약 17% 할인된 가격으로 이용하실 수 있습니다. 연간 구독은 선불로 결제되며, 구독 기간 중 언제든지 플랜을 업그레이드할 수 있습니다.',
  },
  {
    id: 'faq-2',
    question: '무료 플랜에서 Pro로 업그레이드하면 데이터가 유지되나요?',
    answer: '네, 기존 프로젝트와 모든 데이터는 그대로 유지됩니다. 업그레이드 즉시 Pro 기능을 사용할 수 있으며, 기존 워크플로우에 영향을 주지 않습니다.',
  },
  {
    id: 'faq-3',
    question: '팀 멤버를 추가하려면 어떻게 하나요?',
    answer: '설정 > 팀 관리에서 이메일로 초대할 수 있습니다. Pro 플랜은 최대 15명, Enterprise는 무제한으로 추가할 수 있습니다. 초대받은 멤버는 이메일 인증 후 즉시 합류됩니다.',
  },
  {
    id: 'faq-4',
    question: '환불 정책은 어떻게 되나요?',
    answer: '결제 후 14일 이내에는 전액 환불을 보장합니다. 이후에는 남은 기간에 비례하여 부분 환불이 가능합니다. 환불 신청은 고객센터 또는 대시보드 설정에서 할 수 있습니다.',
  },
  {
    id: 'faq-5',
    question: 'Enterprise 플랜은 어떻게 시작하나요?',
    answer: '영업팀(sales@orbit-ui.com)으로 문의하거나 아래 "영업팀에 문의" 버튼을 클릭하세요. 요구사항 파악 후 맞춤 견적을 제안드립니다. 보통 영업일 기준 24시간 내 답변드립니다.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Orbit UI 도입 후 디자인-개발 협업 속도가 3배 향상됐습니다. 토큰 시스템이 특히 훌륭해요.',
    author: 'Kim Jihye',
    role: 'Lead Designer @ Kakao',
    initials: 'KJ',
    color: '#6366f1',
  },
  {
    quote: 'shadcn/ui 대비 한국어 지원과 접근성이 압도적입니다. Pro 플랜 ROI가 확실합니다.',
    author: 'Park Minjun',
    role: 'Frontend Lead @ Naver',
    initials: 'PM',
    color: '#10b981',
  },
  {
    quote: 'Enterprise 계약 후 온보딩부터 운영까지 전담 지원을 받고 있어 매우 만족스럽습니다.',
    author: 'Lee Soyeon',
    role: 'CTO @ Coupang',
    initials: 'LS',
    color: '#f59e0b',
  },
]

const PricingPageRender: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<string>('faq-1')

  const formatPrice = (price: number | null) => {
    if (price === null) return '견적 문의'
    if (price === 0) return '무료'
    return `₩${price.toLocaleString('ko-KR')}/월`
  }

  return (
    <div style={{ minHeight: '100vh', background: tc.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: `${tc.bg}f0`, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${tc.border}`,
        padding: '0 40px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '13px', fontWeight: '800',
          }}>O</div>
          <Text textStyle="body1" style={{ fontWeight: '800', color: tc.fg }}>Orbit UI</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {['제품', '문서', '블로그', '가격'].map((item) => (
            <button key={item} style={{
              fontSize: '14px', fontWeight: item === '가격' ? '700' : '400',
              color: item === '가격' ? '#6366f1' : tc.fgSub,
              border: 'none', background: 'transparent', cursor: 'pointer',
            }}>{item}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <OutlineButton size="small" color="black">로그인</OutlineButton>
          <SolidButton size="small" color="black">무료로 시작하기</SolidButton>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 40px 60px', maxWidth: '860px', margin: '0 auto' }}>
        <LabelBadge color="benefit" style={{ display: 'inline-flex', marginBottom: '20px' }}>
          <LabelBadge.Label>새로운 Enterprise 플랜 출시</LabelBadge.Label>
        </LabelBadge>
        <h1 style={{
          fontSize: '52px', fontWeight: '900', color: tc.fg,
          margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.03em',
        }}>
          팀을 위한 완벽한<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            플랜을 선택하세요
          </span>
        </h1>
        <p style={{ fontSize: '18px', color: tc.fgSub, margin: '0 0 36px', lineHeight: '1.6' }}>
          모든 플랜은 무료 체험으로 시작합니다. 신용카드가 필요하지 않으며,<br />
          언제든지 업그레이드하거나 취소할 수 있습니다.
        </p>

        {/* Billing Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <Text textStyle="body2" style={{ color: !isYearly ? tc.fg : tc.fgMuted, fontWeight: !isYearly ? '600' : '400' }}>월간 결제</Text>
          <Switch
            checked={isYearly}
            onChange={() => setIsYearly((v) => !v)}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Text textStyle="body2" style={{ color: isYearly ? tc.fg : tc.fgMuted, fontWeight: isYearly ? '600' : '400' }}>연간 결제</Text>
            <span style={{
              fontSize: '11px', fontWeight: '700', color: '#10b981',
              background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '100px',
            }}>17% 절약</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.price.yearly : plan.price.monthly
            const isPro = plan.id === 'pro'
            return (
              <div
                key={plan.id}
                style={{
                  borderRadius: '20px',
                  border: isPro ? '2px solid #6366f1' : `1px solid ${tc.border}`,
                  background: isPro
                    ? 'linear-gradient(180deg, rgba(99,102,241,0.04) 0%, #fff 100%)'
                    : tc.bg,
                  padding: '28px',
                  position: 'relative',
                  boxShadow: isPro ? '0 8px 32px rgba(99,102,241,0.12)' : 'none',
                }}
              >
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: '#6366f1', color: '#fff',
                    fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em',
                    padding: '4px 14px', borderRadius: '100px',
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: `${plan.color}14`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: plan.color }} />
                    </div>
                    <Text textStyle="h4" style={{ fontWeight: '800', color: tc.fg }}>{plan.name}</Text>
                  </div>
                  <Text textStyle="caption" style={{ color: tc.fgSub, display: 'block', lineHeight: '1.5', marginBottom: '20px' }}>
                    {plan.description}
                  </Text>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '42px', fontWeight: '900', color: tc.fg, letterSpacing: '-0.02em' }}>
                      {price === null ? '—' : price === 0 ? '₩0' : `₩${(isYearly ? price * 12 : price).toLocaleString('ko-KR')}`}
                    </span>
                    {price !== null && price > 0 && (
                      <span style={{ fontSize: '14px', color: tc.fgMuted, marginLeft: '4px' }}>
                        /{isYearly ? '년' : '월'}
                      </span>
                    )}
                  </div>
                  {price !== null && price > 0 && isYearly && (
                    <Text textStyle="caption" style={{ color: tc.fgMuted }}>
                      월 {formatPrice(price)} 청구
                    </Text>
                  )}
                  {price === null && (
                    <Text textStyle="caption" style={{ color: tc.fgMuted }}>맞춤 견적 제공</Text>
                  )}
                </div>

                {/* CTA */}
                <div style={{ marginBottom: '24px' }}>
                  {plan.ctaVariant === 'solid' ? (
                    <SolidButton size="medium" color="black" style={{ width: '100%', justifyContent: 'center' }}>
                      <SolidButton.Center>{plan.cta}</SolidButton.Center>
                    </SolidButton>
                  ) : (
                    <OutlineButton size="medium" color="black" style={{ width: '100%', justifyContent: 'center' }}>
                      {plan.cta}
                    </OutlineButton>
                  )}
                </div>

                <Divider />

                {/* Features */}
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: '1px', flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" fill={plan.color} opacity="0.15" />
                        <path d="M8 12l3 3 5-5" stroke={plan.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text textStyle="descriptionLarge" style={{ color: tc.fgSub, lineHeight: '1.4' }}>{feature}</Text>
                    </div>
                  ))}
                  {plan.limits.map((limit) => (
                    <div key={limit} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: '1px', flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" fill="#94a3b8" opacity="0.15" />
                        <path d="M8 12h8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <Text textStyle="descriptionLarge" style={{ color: tc.fgMuted, lineHeight: '1.4' }}>{limit}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '40px 40px 80px', background: tc.surface, borderTop: `1px solid ${tc.border}`, borderBottom: `1px solid ${tc.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Text textStyle="h3" style={{ display: 'block', fontWeight: '800', color: tc.fg, marginBottom: '8px' }}>
              전 세계 5,000+ 팀이 신뢰합니다
            </Text>
            <Text textStyle="body2" style={{ color: tc.fgSub }}>
              다양한 규모의 팀이 Orbit UI로 더 빠르게 제품을 출시합니다
            </Text>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.author} style={{
                padding: '24px', borderRadius: '16px',
                background: tc.bg, border: `1px solid ${tc.border}`,
              }}>
                <div style={{ marginBottom: '16px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                  ))}
                </div>
                <Text textStyle="body2" style={{ color: tc.fg, lineHeight: '1.6', display: 'block', marginBottom: '20px' }}>
                  &ldquo;{t.quote}&rdquo;
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar style={{ width: '36px', height: '36px', background: t.color, fontSize: '12px' }}>
                    <Avatar.Fallback style={{ background: t.color, color: '#fff', fontWeight: '700' }}>
                      {t.initials}
                    </Avatar.Fallback>
                  </Avatar>
                  <div>
                    <Text textStyle="body2" style={{ display: 'block', fontWeight: '700', color: tc.fg }}>{t.author}</Text>
                    <Text textStyle="caption" style={{ color: tc.fgMuted }}>{t.role}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Text textStyle="h3" style={{ display: 'block', fontWeight: '800', color: tc.fg, marginBottom: '8px' }}>
            플랜 상세 비교
          </Text>
          <Text textStyle="body2" style={{ color: tc.fgSub }}>모든 플랜의 기능을 자세히 비교해보세요</Text>
        </div>

        <Accordion type="multiple" defaultValue={['comp-core', 'comp-team', 'comp-support']} className="w-full">
          {[
            {
              id: 'comp-core',
              label: '핵심 기능',
              icon: '⚡',
              rows: [
                { name: '컴포넌트 수', free: '50+', pro: '150+', enterprise: '무제한' },
                { name: '공식 테마', free: '1개', pro: '전체', enterprise: '전체 + 커스텀' },
                { name: '월 빌드 분', free: '1,000', pro: '100,000', enterprise: '무제한' },
                { name: '피그마 연동', free: false, pro: true, enterprise: true },
              ],
            },
            {
              id: 'comp-team',
              label: '팀 협업',
              icon: '👥',
              rows: [
                { name: '팀 멤버', free: '최대 3명', pro: '최대 15명', enterprise: '무제한' },
                { name: '공유 라이브러리', free: false, pro: true, enterprise: true },
                { name: '역할 권한 관리', free: false, pro: true, enterprise: true },
                { name: '감사 로그', free: false, pro: false, enterprise: true },
              ],
            },
            {
              id: 'comp-support',
              label: '지원 및 보안',
              icon: '🛡️',
              rows: [
                { name: '지원 채널', free: '커뮤니티', pro: '이메일 우선', enterprise: '전용 슬랙' },
                { name: 'SLA', free: false, pro: false, enterprise: true },
                { name: 'SSO / SAML', free: false, pro: false, enterprise: true },
                { name: 'On-premise', free: false, pro: false, enterprise: true },
              ],
            },
          ].map((section) => (
            <Accordion.Item key={section.id} value={section.id}>
              <Accordion.Trigger>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>{section.icon}</span>
                  {section.label}
                </span>
              </Accordion.Trigger>
              <Accordion.Content>
                <div style={{ paddingBottom: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '8px 4px', borderBottom: `1px solid ${tc.border}` }}>
                    <div />
                    {['Free', 'Pro', 'Enterprise'].map((p) => (
                      <div key={p} style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', color: p === 'Pro' ? '#6366f1' : tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p}</div>
                    ))}
                  </div>
                  {section.rows.map((row, ri) => (
                    <div key={ri} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 4px', borderBottom: `1px solid ${tc.borderSub}`, alignItems: 'center' }}>
                      <Text textStyle="descriptionLarge" style={{ color: tc.fgSub }}>{row.name}</Text>
                      {[row.free, row.pro, row.enterprise].map((val, vi) => (
                        <div key={vi} style={{ display: 'flex', justifyContent: 'center' }}>
                          {typeof val === 'boolean' ? (
                            val ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" fill="#22c55e" />
                                <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" fill="#e2e8f0" />
                                <path d="M8 12h8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            )
                          ) : (
                            <Text textStyle="descriptionSmall" style={{ color: vi === 1 ? '#6366f1' : tc.fgSub, fontWeight: vi === 1 ? '600' : '400', textAlign: 'center' }}>{String(val)}</Text>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Text textStyle="h3" style={{ display: 'block', fontWeight: '800', color: tc.fg, marginBottom: '8px' }}>
            자주 묻는 질문
          </Text>
          <Text textStyle="body2" style={{ color: tc.fgSub }}>
            더 궁금한 사항은{' '}
            <span style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}>고객센터</span>에서 확인하세요
          </Text>
        </div>
        <Accordion
          type="single"
          collapsible
          value={openFaq}
          onValueChange={setOpenFaq}
          className="w-full"
        >
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Trigger>
                <span style={{ color: openFaq === item.id ? '#6366f1' : tc.fg }}>{item.question}</span>
              </Accordion.Trigger>
              <Accordion.Content>{item.answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: '0 40px 80px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)',
        padding: '60px 40px',
        textAlign: 'center',
        maxWidth: '1020px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Text textStyle="h3" style={{ display: 'block', fontWeight: '900', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          지금 바로 시작하세요
        </Text>
        <Text textStyle="body1" style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '32px' }}>
          14일 무료 체험 · 신용카드 불필요 · 언제든 취소 가능
        </Text>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '14px 32px', borderRadius: '12px',
            background: '#fff', color: '#6366f1',
            border: 'none', fontSize: '15px', fontWeight: '700', cursor: 'pointer',
          }}>
            무료로 시작하기
          </button>
          <button style={{
            padding: '14px 32px', borderRadius: '12px',
            background: 'transparent', color: '#fff',
            border: '2px solid rgba(255,255,255,0.4)',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer',
          }}>
            데모 요청하기
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
          {['5,000+ 팀이 사용 중', 'WCAG AA 인증', 'SOC 2 Type II'].map((badge) => (
            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px', borderTop: `1px solid ${tc.border}`, textAlign: 'center' }}>
        <Text textStyle="caption" style={{ color: tc.fgMuted }}>
          © 2025 Orbit UI · 문의: hello@orbit-ui.com
        </Text>
      </footer>
    </div>
  )
}

export const PricingPage: Story = {
  render: () => <PricingPageRender />,
}

/* ==========================================================================
   IssueTracker Template (사이클 17 — Linear/Radix 벤치마크)
   Linear-inspired issue tracker combining:
   - ScrollableTabGroup (뷰 전환)
   - ListTile (컴팩트 이슈 목록 — Linear 32px density)
   - LabelBadge (상태/우선순위 배지)
   - CounterBadge (개수)
   - SolidButton / GhostButton / OutlineButton (액션)
   Fully interactive: search, filter by cycle/priority, multi-select
========================================================================== */
type ITIssue = {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  assignee: string
  label: string
  cycle: string
  createdAt: string
}

const IT_ISSUES: ITIssue[] = [
  { id: 'ORB-301', title: 'Implement FixedTabs controlled/uncontrolled API', status: 'in_progress', priority: 'urgent', assignee: 'HJ', label: 'feat', cycle: 'C17', createdAt: '2h ago' },
  { id: 'ORB-302', title: 'Add Linear-style compact density to ListTile', status: 'in_review', priority: 'high', assignee: 'KJ', label: 'feat', cycle: 'C17', createdAt: '4h ago' },
  { id: 'ORB-303', title: 'Write Radix UI benchmark stories for TabGroup', status: 'done', priority: 'high', assignee: 'HJ', label: 'docs', cycle: 'C17', createdAt: '6h ago' },
  { id: 'ORB-304', title: 'Fix CounterBadge number type constraint', status: 'done', priority: 'medium', assignee: 'LY', label: 'fix', cycle: 'C17', createdAt: '1d ago' },
  { id: 'ORB-305', title: 'Migrate LabelBadge to semantic design tokens', status: 'todo', priority: 'medium', assignee: 'PM', label: 'refactor', cycle: 'C18', createdAt: '2d ago' },
  { id: 'ORB-306', title: 'Add MigrationGuide for antd users', status: 'todo', priority: 'low', assignee: 'CD', label: 'docs', cycle: 'C18', createdAt: '2d ago' },
  { id: 'ORB-307', title: 'Improve Tab keyboard navigation (Arrow keys)', status: 'in_progress', priority: 'high', assignee: 'HJ', label: 'a11y', cycle: 'C17', createdAt: '3h ago' },
  { id: 'ORB-308', title: 'Deprecate legacy spacing tokens', status: 'cancelled', priority: 'low', assignee: 'KJ', label: 'chore', cycle: 'C16', createdAt: '5d ago' },
  { id: 'ORB-309', title: 'Export DataTable column types from package', status: 'in_review', priority: 'medium', assignee: 'LY', label: 'feat', cycle: 'C17', createdAt: '5h ago' },
  { id: 'ORB-310', title: 'Performance: memoize heavy token computations', status: 'todo', priority: 'high', assignee: 'HJ', label: 'perf', cycle: 'C18', createdAt: '1d ago' },
]

const IT_STATUS_CONFIG: Record<ITIssue['status'], { color: string; label: string; dot: string }> = {
  todo:        { color: '#94a3b8', label: 'Todo',        dot: '#94a3b8' },
  in_progress: { color: '#6366f1', label: 'In Progress', dot: '#6366f1' },
  in_review:   { color: '#f59e0b', label: 'In Review',   dot: '#f59e0b' },
  done:        { color: '#10b981', label: 'Done',        dot: '#10b981' },
  cancelled:   { color: '#ef4444', label: 'Cancelled',   dot: '#ef4444' },
}

const IT_PRIORITY_COLOR: Record<ITIssue['priority'], 'gray' | 'benefit' | 'sale'> = {
  urgent: 'sale',
  high:   'benefit',
  medium: 'gray',
  low:    'gray',
}

const IT_LABEL_COLOR: Record<string, string> = {
  feat:    '#6366f1',
  fix:     '#ef4444',
  docs:    '#0ea5e9',
  refactor:'#8b5cf6',
  a11y:    '#10b981',
  chore:   '#94a3b8',
  perf:    '#f59e0b',
}

const IssueTrackerRender = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeCycle, setActiveCycle] = useState<string | null>(null)
  const [activePriority, setActivePriority] = useState<ITIssue['priority'] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { label: 'All', filter: (_i: ITIssue) => true },
    { label: 'Active', filter: (i: ITIssue) => i.status === 'in_progress' || i.status === 'in_review' },
    { label: 'Backlog', filter: (i: ITIssue) => i.status === 'todo' },
    { label: 'Done', filter: (i: ITIssue) => i.status === 'done' },
    { label: 'Cancelled', filter: (i: ITIssue) => i.status === 'cancelled' },
  ]

  const filtered = IT_ISSUES.filter((issue) => {
    const tabFilter = tabs[tabIndex]?.filter ?? ((_i: ITIssue) => true)
    if (!tabFilter(issue)) return false
    if (activeCycle && issue.cycle !== activeCycle) return false
    if (activePriority && issue.priority !== activePriority) return false
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) && !issue.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const cycles = Array.from(new Set(IT_ISSUES.map((i) => i.cycle))).sort()
  const priorities: ITIssue['priority'][] = ['urgent', 'high', 'medium', 'low']

  return (
    <div style={{ minHeight: '100vh', background: tc.bg, display: 'flex', flexDirection: 'column', fontFamily: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
      {/* Top header */}
      <header style={{ height: 52, borderBottom: `1px solid ${tc.border}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, background: tc.bg, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Text textStyle="descriptionLargeEmphasized" style={{ color: tc.fg }}>Orbit UI</Text>
        </div>
        <Divider orientation="vertical" style={{ height: 20, margin: '0 4px' }} />
        <Text textStyle="descriptionMedium" style={{ color: tc.fgSub }}>Issues</Text>
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <SearchIcon style={{ position: 'absolute', left: 10, color: tc.fgMuted }} size={14} />
          <input
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: 32, paddingRight: 12, paddingTop: 6, paddingBottom: 6,
              borderRadius: 8, border: `1.5px solid ${tc.border}`, fontSize: 12,
              width: 200, outline: 'none', background: tc.surface, color: tc.fg,
            }}
          />
        </div>
        <SolidButton color="primary" size="small">
          <SolidButton.Center>New Issue</SolidButton.Center>
        </SolidButton>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{ width: 196, borderRight: `1px solid ${tc.border}`, background: tc.surface, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
          <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px 6px' }}>Navigation</Text>
          {[
            { label: 'My Issues', icon: <HomeLineIcon size={14} />, count: IT_ISSUES.filter((i) => i.assignee === 'HJ').length, active: false },
            { label: 'All Issues', icon: <ListLineIcon size={14} />, count: IT_ISSUES.length, active: true },
            { label: 'Starred', icon: <StarLineIcon size={14} />, count: undefined, active: false },
            { label: 'Inbox', icon: <NotificationLineIcon size={14} />, count: 3, active: false },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
                fontSize: 13, color: item.active ? '#6366f1' : tc.fgSub,
                background: item.active ? 'rgba(99,102,241,0.08)' : 'transparent',
                fontWeight: item.active ? 600 : 400,
              }}
            >
              <span style={{ color: item.active ? '#6366f1' : tc.fgMuted }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count !== undefined && <CounterBadge>{item.count}</CounterBadge>}
            </div>
          ))}

          <div style={{ borderTop: `1px solid ${tc.border}`, margin: '8px 0', paddingTop: 8 }}>
            <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px 6px' }}>Cycles</Text>
            {cycles.map((cycle) => (
              <div
                key={cycle}
                onClick={() => setActiveCycle(activeCycle === cycle ? null : cycle)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
                  fontSize: 12,
                  color: activeCycle === cycle ? '#6366f1' : tc.fgSub,
                  background: activeCycle === cycle ? 'rgba(99,102,241,0.07)' : 'transparent',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: cycle === 'C17' ? '#6366f1' : '#94a3b8' }} />
                <span style={{ flex: 1 }}>Cycle {cycle}</span>
                <CounterBadge>{IT_ISSUES.filter((i) => i.cycle === cycle).length}</CounterBadge>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${tc.border}`, margin: '4px 0', paddingTop: 8 }}>
            <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px 6px' }}>Priority</Text>
            {priorities.map((p) => (
              <div
                key={p}
                onClick={() => setActivePriority(activePriority === p ? null : p)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
                  fontSize: 12,
                  color: activePriority === p ? '#6366f1' : tc.fgSub,
                  background: activePriority === p ? 'rgba(99,102,241,0.07)' : 'transparent',
                }}
              >
                <LabelBadge color={IT_PRIORITY_COLOR[p]}>
                  <LabelBadge.Label>{p}</LabelBadge.Label>
                </LabelBadge>
                <span style={{ flex: 1, textTransform: 'capitalize' }}>{p}</span>
                <span style={{ fontSize: 11, color: tc.fgMuted }}>{IT_ISSUES.filter((i) => i.priority === p).length}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Toolbar */}
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${tc.border}`, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, background: tc.bg }}>
            <Text textStyle="descriptionLargeEmphasized" style={{ color: tc.fg }}>
              {activeCycle ? `Cycle ${activeCycle}` : 'All Issues'}
            </Text>
            <CounterBadge>{filtered.length}</CounterBadge>
            {(activeCycle || activePriority || searchQuery) && (
              <GhostButton
                color="black"
                size="small"
                onClick={() => {
                  setActiveCycle(null)
                  setActivePriority(null)
                  setSearchQuery('')
                }}
              >
                <GhostButton.Center>Clear filters</GhostButton.Center>
              </GhostButton>
            )}
          </div>

          {/* Tab view switcher */}
          <div style={{ borderBottom: `1px solid ${tc.border}`, flexShrink: 0 }}>
            <ScrollableTabGroup selectedIndex={tabIndex} onTabChange={setTabIndex}>
              {tabs.map((tab, i) => (
                <ScrollableTabGroup.Tab key={i} value={`view-${i}`}>
                  <ScrollableTabGroup.TabCenter>{tab.label}</ScrollableTabGroup.TabCenter>
                  <ScrollableTabGroup.TabTrailing>
                    <span style={{ fontSize: 10, color: tc.fgMuted, fontWeight: 600 }}>
                      {IT_ISSUES.filter(tab.filter).length}
                    </span>
                  </ScrollableTabGroup.TabTrailing>
                </ScrollableTabGroup.Tab>
              ))}
            </ScrollableTabGroup>
          </div>

          {/* Issue list — Linear compact density (32px rows) */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {filtered.length === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180, color: tc.fgMuted, fontSize: 13 }}>
                No issues match the current filters
              </div>
            )}
            {filtered.map((issue) => {
              const cfg = IT_STATUS_CONFIG[issue.status]
              const isSelected = selectedIds.has(issue.id)
              return (
                <ListTile
                  key={issue.id}
                  as="button"
                  onClick={() => toggleSelect(issue.id)}
                  style={{
                    minHeight: 36,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 16,
                    paddingRight: 16,
                    background: isSelected ? 'rgba(99,102,241,0.05)' : 'transparent',
                    borderLeft: `3px solid ${isSelected ? '#6366f1' : 'transparent'}`,
                    borderBottom: `1px solid ${tc.borderSub}`,
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'background 0.1s, border-color 0.1s',
                  }}
                >
                  <ListTile.Leading>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: tc.fgMuted, fontFamily: 'monospace', fontWeight: 500, flexShrink: 0 }}>{issue.id}</span>
                    </div>
                  </ListTile.Leading>
                  <ListTile.Title>{issue.title}</ListTile.Title>
                  <ListTile.Trailing>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700,
                        color: IT_LABEL_COLOR[issue.label] ?? '#94a3b8',
                        background: `${IT_LABEL_COLOR[issue.label] ?? '#94a3b8'}18`,
                        padding: '2px 6px', borderRadius: 4,
                        textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0,
                      }}>
                        {issue.label}
                      </span>
                      <LabelBadge color={IT_PRIORITY_COLOR[issue.priority]}>
                        <LabelBadge.Label>{issue.priority}</LabelBadge.Label>
                      </LabelBadge>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff', fontSize: 9, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {issue.assignee}
                      </div>
                      <Text textStyle="descriptionSmall" style={{ color: tc.fgMuted, fontSize: 11, flexShrink: 0 }}>{issue.createdAt}</Text>
                    </div>
                  </ListTile.Trailing>
                </ListTile>
              )
            })}
          </div>

          {/* Multi-select status bar */}
          {selectedIds.size > 0 && (
            <div style={{ borderTop: `1px solid ${tc.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, background: tc.surface, flexShrink: 0 }}>
              <Text textStyle="descriptionSmall" style={{ color: tc.fgSub, flex: 1 }}>
                {selectedIds.size}개 선택됨
              </Text>
              <GhostButton color="black" size="small" onClick={() => setSelectedIds(new Set())}>
                <GhostButton.Center>선택 해제</GhostButton.Center>
              </GhostButton>
              <OutlineButton color="black" size="small">
                <OutlineButton.Center>상태 변경</OutlineButton.Center>
              </OutlineButton>
              <SolidButton color="primary" size="small">
                <SolidButton.Center>일괄 처리</SolidButton.Center>
              </SolidButton>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export const IssueTracker: Story = {
  render: () => <IssueTrackerRender />,
}

/* ═══════════════════════════════════════════
   DeveloperProfile Template (사이클 18 — Material 3 / Mantine 벤치마크)
   ─ 프로필 헤더 + 통계 카드 + 탭 (활동/프로젝트/설정) + 설정 폼
   포함 컴포넌트: SolidButton, OutlineButton, Switch, RadioButton
   ═══════════════════════════════════════════ */

// SVG 이니셜 아바타 — 외부 이미지 URL 없이 인라인으로 렌더링
const UserInitialAvatar = ({ initials, size, bg }: { initials: string; size: number; bg: string }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={bg} />
    <text
      x={size / 2}
      y={size / 2 + size * 0.13}
      textAnchor="middle"
      fill="#fff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize={size * 0.38}
      fontWeight="700"
    >
      {initials}
    </text>
  </svg>
)

const DeveloperProfileRender = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'projects' | 'settings'>('activity')
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [darkModeOn, setDarkModeOn] = useState(false)
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public')
  const [followed, setFollowed] = useState(false)

  const stats = [
    { label: '프로젝트', value: '24' },
    { label: '팔로워', value: '1.2K' },
    { label: '팔로잉', value: '348' },
  ]

  const activities = [
    { type: 'commit', message: 'feat: Material 3 컬러 시스템 적용', project: 'Orbit UI', time: '2시간 전', color: '#10b981' },
    { type: 'review', message: 'PR #142 코드 리뷰 완료', project: 'Design System', time: '4시간 전', color: '#6366f1' },
    { type: 'issue', message: 'Chip 컴포넌트 접근성 이슈 제보', project: 'Orbit UI', time: '어제', color: '#f59e0b' },
    { type: 'release', message: 'v3.2.0 릴리즈 배포', project: 'Orbit UI', time: '3일 전', color: '#8b5cf6' },
    { type: 'comment', message: '디자인 토큰 가이드 문서 작성', project: 'Docs', time: '5일 전', color: '#64748b' },
  ]

  const projects = [
    { name: 'Orbit UI', desc: 'React 기반 디자인 시스템 라이브러리', lang: 'TypeScript', stars: 284, forks: 42, color: '#6366f1' },
    { name: 'Eclipse Theme', desc: '다크/라이트 테마 패키지', lang: 'CSS', stars: 128, forks: 19, color: '#8b5cf6' },
    { name: 'Figma Tokens Plugin', desc: '디자인 토큰 Figma 동기화 플러그인', lang: 'JavaScript', stars: 96, forks: 14, color: '#0ea5e9' },
  ]

  // 활동 타입별 아이콘 (인라인 SVG)
  const activityIconNode = (type: string, color: string) => {
    const stroke = color
    if (type === 'commit') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" />
      </svg>
    )
    if (type === 'review') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    )
    if (type === 'issue') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
    if (type === 'release') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
      </svg>
    )
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  }

  const tabLabels: Record<'activity' | 'projects' | 'settings', string> = {
    activity: '활동',
    projects: '프로젝트',
    settings: '설정',
  }

  return (
    <div style={{ minHeight: '100vh', background: tc.surface, fontFamily: 'inherit' }}>

      {/* ── 프로필 헤더 ── */}
      <div style={{ background: tc.bg, borderBottom: `1px solid ${tc.border}` }}>
        {/* 커버 */}
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #3b82f6 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
        </div>

        <div style={{ padding: '0 32px 24px', maxWidth: '800px', margin: '0 auto' }}>
          {/* 아바타 + 이름 행 */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginTop: '-40px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ borderRadius: '50%', border: '4px solid #fff', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', flexShrink: 0, lineHeight: 0 }}>
              <UserInitialAvatar initials="HK" size={80} bg="#6366f1" />
            </div>
            <div style={{ paddingBottom: '4px', flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: tc.fg, letterSpacing: '-0.02em' }}>Heejun Kim</span>
                <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '99px', background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
                  Core Maintainer
                </span>
              </div>
              <div style={{ fontSize: '14px', color: tc.fgSub, marginTop: '2px' }}>Frontend Engineer · Orbit UI 오픈소스 기여자</div>
            </div>
            {/* 액션 버튼 */}
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
              <OutlineButton color="black" size="small">
                <OutlineButton.Center>메시지</OutlineButton.Center>
              </OutlineButton>
              <SolidButton
                color={followed ? 'gray' : 'primary'}
                size="small"
                onClick={() => setFollowed((v) => !v)}
              >
                <SolidButton.Center>{followed ? '팔로잉' : '팔로우'}</SolidButton.Center>
              </SolidButton>
            </div>
          </div>

          {/* 통계 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: tc.fg, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: tc.fgMuted }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* 바이오 */}
          <div style={{ fontSize: '13px', color: tc.fgSub, lineHeight: 1.6, marginBottom: '14px', maxWidth: '560px' }}>
            디자인 시스템과 컴포넌트 라이브러리 개발에 열정을 가지고 있습니다. Orbit UI 오픈소스를 메인테이닝하며 접근성과 개발자 경험 개선에 집중합니다.
          </div>

          {/* 메타 정보 */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { icon: '📍', text: 'Seoul, South Korea' },
              { icon: '🔗', text: 'orbit-ui.com' },
              { icon: '📅', text: '2022년 4월 가입' },
            ].map((meta) => (
              <div key={meta.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: tc.fgSub }}>
                <span>{meta.icon}</span>
                <span>{meta.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 탭 네비게이션 ── */}
      <div style={{ background: tc.bg, borderBottom: `1px solid ${tc.border}`, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px', display: 'flex' }}>
          {(['activity', 'projects', 'settings'] as const).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '14px 20px', border: 'none', background: 'transparent', cursor: 'pointer',
                  fontSize: '14px', fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#6366f1' : tc.fgSub,
                  borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {tabLabels[tab]}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 탭 콘텐츠 ── */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 32px' }}>

        {/* 활동 탭 */}
        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: tc.fg, marginBottom: '4px' }}>최근 활동</div>
            {activities.map((act, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '16px', background: tc.bg, borderRadius: '12px',
                  border: `1px solid ${tc.border}`,
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: `${act.color}18`, color: act.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {activityIconNode(act.type, act.color)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: tc.fg, marginBottom: '2px' }}>{act.message}</div>
                  <div style={{ fontSize: '12px', color: tc.fgMuted }}>
                    <span style={{ color: act.color, fontWeight: '600' }}>{act.project}</span>
                    {' · '}
                    {act.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 프로젝트 탭 */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: tc.fg, marginBottom: '4px' }}>공개 저장소</div>
            {projects.map((proj) => (
              <div
                key={proj.name}
                style={{
                  padding: '20px', background: tc.bg, borderRadius: '12px',
                  border: `1px solid ${tc.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#6366f1' }}>{proj.name}</span>
                  <span style={{ fontSize: '11px', padding: '1px 8px', borderRadius: '99px', border: `1px solid ${tc.border}`, color: tc.fgMuted }}>Public</span>
                </div>
                <div style={{ fontSize: '13px', color: tc.fgSub, marginBottom: '12px' }}>{proj.desc}</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: tc.fgSub }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: proj.color }} />
                    {proj.lang}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: tc.fgSub }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {proj.stars}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: tc.fgSub }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
                      <path d="M18 9a9 9 0 0 1-9 9M6 9a9 9 0 0 0 9 9" />
                    </svg>
                    {proj.forks}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 설정 탭 */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: tc.fg }}>계정 설정</div>

            {/* 기본 정보 폼 */}
            <div style={{ padding: '24px', background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}` }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: tc.fg, marginBottom: '20px' }}>기본 정보</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>표시 이름</label>
                    <input defaultValue="Heejun Kim" style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${tc.border}`, fontSize: '14px', outline: 'none', background: tc.bg, color: tc.fg }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>사용자명</label>
                    <input defaultValue="@hjunkim" style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${tc.border}`, fontSize: '14px', outline: 'none', background: tc.bg, color: tc.fg }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>이메일</label>
                  <input defaultValue="heejun@orbit-ui.com" style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${tc.border}`, fontSize: '14px', outline: 'none', background: tc.bg, color: tc.fg }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>소개</label>
                  <textarea
                    defaultValue="디자인 시스템과 컴포넌트 라이브러리 개발에 열정을 가지고 있습니다."
                    rows={3}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${tc.border}`, fontSize: '14px', outline: 'none', background: tc.bg, color: tc.fg, resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <OutlineButton color="gray" size="small">
                    <OutlineButton.Center>취소</OutlineButton.Center>
                  </OutlineButton>
                  <SolidButton color="primary" size="small">
                    <SolidButton.Center>저장</SolidButton.Center>
                  </SolidButton>
                </div>
              </div>
            </div>

            {/* 알림 / 외관 설정 (Switch) */}
            <div style={{ padding: '24px', background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}` }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: tc.fg, marginBottom: '20px' }}>알림 및 외관</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {([
                  { label: '이메일 알림', desc: '새 팔로워, 댓글, 멘션 알림을 이메일로 받습니다', value: notificationsOn, onChange: setNotificationsOn },
                  { label: '다크 모드', desc: '어두운 색상 테마를 사용합니다', value: darkModeOn, onChange: setDarkModeOn },
                ] as const).map((item, idx, arr) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 0', borderBottom: idx < arr.length - 1 ? `1px solid ${tc.borderSub}` : 'none',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: tc.fg }}>{item.label}</div>
                      <div style={{ fontSize: '12px', color: tc.fgMuted, marginTop: '2px' }}>{item.desc}</div>
                    </div>
                    <Switch checked={item.value} onCheckedChange={item.onChange} />
                  </div>
                ))}
              </div>
            </div>

            {/* 공개 범위 설정 (RadioButton) */}
            <div style={{ padding: '24px', background: tc.bg, borderRadius: '12px', border: `1px solid ${tc.border}` }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: tc.fg, marginBottom: '16px' }}>프로필 공개 범위</div>
              <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {([
                  { value: 'public', label: '전체 공개', desc: '누구나 프로필을 볼 수 있습니다' },
                  { value: 'friends', label: '팔로워 공개', desc: '팔로워만 프로필을 볼 수 있습니다' },
                  { value: 'private', label: '비공개', desc: '나만 프로필을 볼 수 있습니다' },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
                      border: `1.5px solid ${privacy === opt.value ? 'rgba(99,102,241,0.3)' : tc.border}`,
                      background: privacy === opt.value ? 'rgba(99,102,241,0.04)' : 'transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <RadioButton
                      value={opt.value}
                      name="privacy"
                      checked={privacy === opt.value}
                      onChange={() => setPrivacy(opt.value)}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: privacy === opt.value ? '600' : '500', color: tc.fg }}>{opt.label}</div>
                      <div style={{ fontSize: '11px', color: tc.fgMuted, marginTop: '2px' }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </fieldset>
            </div>

            {/* 위험 영역 */}
            <div style={{ padding: '24px', background: tc.bg, borderRadius: '12px', border: '1px solid #fecaca' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>위험 구역</div>
              <div style={{ fontSize: '13px', color: tc.fgSub, marginBottom: '16px' }}>
                계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
              </div>
              <OutlineButton color="black" size="small">
                <OutlineButton.Center>계정 삭제</OutlineButton.Center>
              </OutlineButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const DeveloperProfile: Story = {
  name: 'DeveloperProfile',
  render: () => <DeveloperProfileRender />,
}

/* ═══════════════════════════════════════════════════════════════════════════
   OnboardingFlow (사이클 20)
   단계 표시기 + 환영 화면 → 프로필 → 팀 초대 → 완료 흐름.
   Progress + SolidButton + OutlineButton 활용.
   Notion/Figma 벤치마크: 아바타 색상 선택 + 인라인 편집 패턴.
   ═══════════════════════════════════════════════════════════════════════════ */
const OnboardingFlowRender = () => {
  const [step, setStep] = useState(0)
  const [profileName, setProfileName] = useState('')
  const [profileRole, setProfileRole] = useState('')
  const [inviteEmails, setInviteEmails] = useState([''])
  const [profileColor, setProfileColor] = useState('#6366f1')

  const steps = [
    { id: 'welcome', title: '환영합니다', subtitle: 'Orbit UI에 오신 것을 환영합니다' },
    { id: 'profile', title: '프로필 설정', subtitle: '팀원들에게 보여질 정보를 입력하세요' },
    { id: 'invite', title: '팀 초대', subtitle: '함께 일할 팀원을 초대하세요' },
    { id: 'done', title: '준비 완료!', subtitle: '이제 Orbit UI를 사용할 수 있습니다' },
  ]

  const total = steps.length
  const progressValue = Math.round((step / (total - 1)) * 100)

  const avatarColors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

  const addEmail = () => setInviteEmails((prev) => [...prev, ''])
  const updateEmail = (i: number, val: string) => {
    setInviteEmails((prev) => prev.map((e, idx) => (idx === i ? val : e)))
  }
  const removeEmail = (i: number) => {
    setInviteEmails((prev) => prev.filter((_e, idx) => idx !== i))
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: tc.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: tc.bg,
          borderRadius: '24px',
          boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}
      >
        {/* 상단 Progress 바 */}
        <div style={{ padding: '28px 40px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Orbit UI
            </span>
            <span style={{ fontSize: '12px', color: tc.fgMuted }}>
              {step + 1} / {total}
            </span>
          </div>
          <Progress value={progressValue} color={step === total - 1 ? 'success' : 'primary'} size="small" />

          {/* 단계 인디케이터 */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            {steps.map((s, i) => (
              <div
                key={s.id}
                style={{
                  flex: 1,
                  height: '3px',
                  borderRadius: '2px',
                  background: i <= step ? (step === total - 1 ? '#10b981' : '#6366f1') : '#e2e8f0',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div style={{ padding: '32px 40px 40px' }}>
          {/* Step 0: 환영 화면 */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                  }}
                >
                  O
                </div>
                <h2 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: '800', color: tc.fg, letterSpacing: '-0.03em' }}>
                  {steps[0].title}
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: tc.fgSub, lineHeight: '1.6' }}>
                  {steps[0].subtitle}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: 'D', label: '3단계 토큰 기반 디자인 시스템', desc: 'Reference → Semantic → Component 계층 구조' },
                  { icon: 'C', label: '70+ 컴포넌트 즉시 사용 가능', desc: 'Storybook으로 인터랙티브하게 탐색' },
                  { icon: 'T', label: 'Eclipse 테마 + 다크모드 지원', desc: 'CSS Variable 기반으로 쉬운 커스터마이징' },
                ].map(({ icon, label, desc }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: tc.surface,
                      border: `1px solid ${tc.border}`,
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: tc.fg, marginBottom: '3px' }}>{label}</div>
                      <div style={{ fontSize: '12px', color: tc.fgSub }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: 프로필 설정 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: tc.fg, letterSpacing: '-0.03em' }}>
                  {steps[1].title}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: tc.fgSub }}>{steps[1].subtitle}</p>
              </div>

              {/* 아바타 선택 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>아바타 색상</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: profileColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#fff',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                  >
                    {profileName ? profileName.slice(0, 2).toUpperCase() : 'ME'}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {avatarColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setProfileColor(color)}
                        aria-label={`아바타 색상 ${color}`}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: color,
                          border: profileColor === color ? '2px solid #fff' : '2px solid transparent',
                          boxShadow: profileColor === color ? `0 0 0 2px ${color}` : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 이름 입력 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>
                  이름 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <TextField
                  placeholder="홍길동"
                  value={profileName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setProfileName(e.target.value)
                  }
                />
              </div>

              {/* 역할 입력 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: tc.fgSub }}>역할</label>
                <TextField
                  placeholder="Frontend Developer"
                  value={profileRole}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setProfileRole(e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* Step 2: 팀 초대 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: tc.fg, letterSpacing: '-0.03em' }}>
                  {steps[2].title}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: tc.fgSub }}>{steps[2].subtitle}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {inviteEmails.map((email, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <TextField
                        placeholder={`teammate${i + 1}@company.com`}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          updateEmail(i, e.target.value)
                        }
                      />
                    </div>
                    {inviteEmails.length > 1 && (
                      <button
                        onClick={() => removeEmail(i)}
                        aria-label="이메일 제거"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: '#fff',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          flexShrink: 0,
                        }}
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {inviteEmails.length < 5 && (
                <button
                  onClick={addEmail}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: `1.5px dashed ${tc.border}`,
                    background: 'transparent',
                    color: tc.fgSub,
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span>
                  팀원 추가
                </button>
              )}

              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(99,102,241,0.04)',
                  border: '1px solid rgba(99,102,241,0.12)',
                  fontSize: '12px',
                  color: '#6366f1',
                }}
              >
                초대를 건너뛰고 나중에 설정에서 추가할 수 있습니다.
              </div>
            </div>
          )}

          {/* Step 3: 완료 */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}>
              <div>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'rgba(16,185,129,0.1)',
                    border: '3px solid #10b981',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: '800', color: tc.fg, letterSpacing: '-0.03em' }}>
                  {steps[3].title}
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: tc.fgSub, lineHeight: '1.6' }}>
                  {steps[3].subtitle}
                </p>
              </div>

              {/* 프로필 요약 */}
              {(profileName || profileRole) && (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: tc.surface,
                    border: `1px solid ${tc.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: profileColor,
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {profileName ? profileName.slice(0, 2).toUpperCase() : 'ME'}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: tc.fg }}>
                      {profileName || '이름 미입력'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: '500' }}>
                      {profileRole || '역할 미입력'}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '초대된 팀원', value: `${inviteEmails.filter((e) => e.trim()).length}명` },
                  { label: '시작 준비', value: '완료' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: tc.surface,
                    }}
                  >
                    <span style={{ fontSize: '13px', color: tc.fgSub }}>{label}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '32px' }}>
            {step > 0 && step < total - 1 && (
              <OutlineButton
                color="black"
                size="medium"
                onClick={() => setStep((s) => s - 1)}
              >
                <OutlineButton.Center>이전</OutlineButton.Center>
              </OutlineButton>
            )}

            {step < total - 1 && (
              <>
                {step > 0 && (
                  <OutlineButton
                    color="black"
                    size="medium"
                    onClick={() => setStep((s) => s + 1)}
                  >
                    <OutlineButton.Center>건너뛰기</OutlineButton.Center>
                  </OutlineButton>
                )}
                <SolidButton
                  color="primary"
                  size="medium"
                  style={{ flex: step === 0 ? 1 : undefined }}
                  onClick={() => setStep((s) => s + 1)}
                >
                  <SolidButton.Center>
                    {step === 0 ? '시작하기' : step === total - 2 ? '초대 보내기' : '계속하기'}
                  </SolidButton.Center>
                </SolidButton>
              </>
            )}

            {step === total - 1 && (
              <SolidButton
                color="primary"
                size="medium"
                style={{ flex: 1 }}
                onClick={() => setStep(0)}
              >
                <SolidButton.Center>Storybook 탐색 시작</SolidButton.Center>
              </SolidButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const OnboardingFlow: Story = {
  name: 'OnboardingFlow',
  render: () => <OnboardingFlowRender />,
}

// ─────────────────────────────────────────────────────────────────────────────
// SocialFeed 템플릿
// Arco Design 피드 카드 + Tailwind UI 사이드바 레이아웃을 조합한 소셜 피드 UI
// ─────────────────────────────────────────────────────────────────────────────

type FeedFilter = 'all' | 'following' | 'popular'

type FeedPost = {
  id: string
  authorInitials: string
  authorName: string
  authorHandle: string
  timeAgo: string
  content: string
  likes: number
  comments: number
  shares: number
  tags: string[]
  liked: boolean
}

const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'p1',
    authorInitials: 'HJ',
    authorName: '김준혁',
    authorHandle: '@hjunkim',
    timeAgo: '2분 전',
    content:
      'Orbit UI의 SegmentedControl에 Arco Design 패턴을 적용했습니다. 통계 카드 기간 선택 UI가 훨씬 직관적이 되었어요. 디자인 시스템을 벤치마크할 때는 단순히 따라하는 것이 아니라 우리 컨텍스트에 맞게 재해석하는 것이 중요합니다.',
    likes: 24,
    comments: 6,
    shares: 3,
    tags: ['디자인시스템', 'OrbitUI'],
    liked: false,
  },
  {
    id: 'p2',
    authorInitials: 'SY',
    authorName: '박서연',
    authorHandle: '@soyeon.p',
    timeAgo: '18분 전',
    content:
      'Tailwind UI의 3열 폼 레이아웃은 정말 잘 설계되어 있어요. 레이블 + 설명 + 입력 구조는 복잡한 설정 화면에서 인지 부하를 크게 낮춰줍니다. 우리 팀에서도 이 패턴을 도입할 예정입니다.',
    likes: 41,
    comments: 12,
    shares: 8,
    tags: ['TailwindUI', 'UX패턴'],
    liked: true,
  },
  {
    id: 'p3',
    authorInitials: 'JW',
    authorName: '이지원',
    authorHandle: '@jiwon.dev',
    timeAgo: '1시간 전',
    content:
      'Switch 컴포넌트에 Apple HIG 설정 화면 패턴을 구현했는데, 전체 행을 탭 타겟으로 만드는 것이 모바일 UX에서 핵심이더군요. 작은 토글을 정확하게 누르기 어렵다는 사실을 테스트 후에야 깨달았습니다.',
    likes: 18,
    comments: 4,
    shares: 2,
    tags: ['모바일UX', 'AppleHIG'],
    liked: false,
  },
  {
    id: 'p4',
    authorInitials: 'MK',
    authorName: '최민규',
    authorHandle: '@minkyu.c',
    timeAgo: '3시간 전',
    content:
      'ListTile Linear 스타일 컴팩트 이슈 목록을 구현했어요. 32px 행 높이에서 상태 표시, ID, 우선순위, 담당자까지 모두 담는 게 쉽지 않았습니다. 정보 밀도와 가독성 사이의 균형을 잡는 것이 핵심입니다.',
    likes: 33,
    comments: 9,
    shares: 5,
    tags: ['Linear', 'DataDensity'],
    liked: false,
  },
]

const SUGGESTED_FOLLOWS = [
  { initials: 'AR', name: '안지수', handle: '@areum.design', color: '#8b5cf6' },
  { initials: 'DK', name: '권도현', handle: '@dohyeon.k', color: '#06b6d4' },
  { initials: 'YJ', name: '송유진', handle: '@yujin.s', color: '#f59e0b' },
]

function AvatarCircle({
  initials,
  color,
  size = 40,
}: {
  initials: string
  color: string
  size?: number
}) {
  return (
    <div
      style={{
        alignItems: 'center',
        background: color,
        borderRadius: '50%',
        color: '#fff',
        display: 'flex',
        flexShrink: 0,
        fontSize: size * 0.32,
        fontWeight: 700,
        height: size,
        justifyContent: 'center',
        width: size,
      }}
    >
      {initials}
    </div>
  )
}

function PostCard({
  post,
  onLike,
}: {
  post: FeedPost
  onLike: (id: string) => void
}) {
  return (
    <div
      style={{
        background: tc.bg,
        border: `1px solid ${tc.border}`,
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '18px',
      }}
    >
      {/* Header */}
      <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
        <AvatarCircle
          initials={post.authorInitials}
          color={
            post.authorInitials === 'HJ'
              ? '#6366f1'
              : post.authorInitials === 'SY'
                ? '#10b981'
                : post.authorInitials === 'JW'
                  ? '#f59e0b'
                  : '#ef4444'
          }
          size={38}
        />
        <div style={{ flex: 1 }}>
          <div style={{ color: tc.fg, fontSize: '14px', fontWeight: 600 }}>{post.authorName}</div>
          <div style={{ color: tc.fgMuted, fontSize: '12px' }}>
            {post.authorHandle} · {post.timeAgo}
          </div>
        </div>
        <OutlineButton color="gray" size="small">
          <OutlineButton.Center>팔로우</OutlineButton.Center>
        </OutlineButton>
      </div>

      {/* Content */}
      <div
        style={{
          color: tc.fgSub,
          fontSize: '14px',
          lineHeight: 1.65,
        }}
      >
        {post.content}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: '6px',
                color: '#6366f1',
                fontSize: '12px',
                fontWeight: 500,
                padding: '2px 8px',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          borderTop: `1px solid ${tc.borderSub}`,
          display: 'flex',
          gap: '0',
          paddingTop: '10px',
        }}
      >
        {[
          { label: post.liked ? `좋아요 ${post.likes + 1}` : `좋아요 ${post.likes}`, active: post.liked, action: () => onLike(post.id) },
          { label: `댓글 ${post.comments}`, active: false, action: () => {} },
          { label: `공유 ${post.shares}`, active: false, action: () => {} },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: btn.active ? '#6366f1' : tc.fgMuted,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: btn.active ? 600 : 400,
              padding: '6px 12px',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function SkeletonPost() {
  return (
    <div
      style={{
        background: tc.bg,
        border: `1px solid ${tc.border}`,
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '18px',
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
        <Skeleton width={38} height={38} style={{ borderRadius: '50%' }} />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '6px' }}>
          <Skeleton width={120} height={14} />
          <Skeleton width={80} height={12} />
        </div>
      </div>
      <Skeleton width="100%" height={14} />
      <Skeleton width="85%" height={14} />
      <Skeleton width="60%" height={14} />
    </div>
  )
}

function SocialFeedV2Render() {
  const feedFilters: FeedFilter[] = ['all', 'following', 'popular']
  const [filterIndex, setFilterIndex] = useState(0)
  const _filter = feedFilters[filterIndex]
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const handleFilterChange = (newIndex: number) => {
    setFilterIndex(newIndex)
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    )
  }

  const filteredPosts = posts.filter((p) =>
    query.length === 0 ||
    p.content.includes(query) ||
    p.tags.some((t) => t.includes(query))
  )

  return (
    <div
      style={{
        background: tc.surface,
        display: 'flex',
        fontFamily:
          '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          background: tc.bg,
          borderRight: `1px solid ${tc.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '28px 20px',
          width: '240px',
        }}
      >
        {/* My Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <AvatarCircle initials="HJ" color="#6366f1" size={56} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: tc.fg, fontSize: '15px', fontWeight: 700 }}>김준혁</div>
            <div style={{ color: tc.fgMuted, fontSize: '12px' }}>@hjunkim</div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
            {[
              { label: '팔로잉', value: '128' },
              { label: '팔로워', value: '342' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ color: tc.fg, fontSize: '14px', fontWeight: 700 }}>{stat.value}</div>
                <div style={{ color: tc.fgMuted, fontSize: '11px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Suggested Follows */}
        <div>
          <div
            style={{
              color: tc.fgMuted,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            팔로우 추천
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SUGGESTED_FOLLOWS.map((user) => (
              <div key={user.handle} style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
                <AvatarCircle initials={user.initials} color={user.color} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: tc.fg, fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </div>
                  <div style={{ color: tc.fgMuted, fontSize: '11px' }}>{user.handle}</div>
                </div>
                <OutlineButton color="primary" size="small">
                  <OutlineButton.Center>팔로우</OutlineButton.Center>
                </OutlineButton>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Tags */}
        <div>
          <div
            style={{
              color: tc.fgMuted,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '10px',
              textTransform: 'uppercase',
            }}
          >
            인기 태그
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['디자인시스템', 'OrbitUI', 'TailwindUI', 'UX패턴', 'Linear'].map((tag) => (
              <span
                key={tag}
                style={{
                  background: tc.surfaceElevated,
                  border: `1px solid ${tc.border}`,
                  borderRadius: '6px',
                  color: tc.fgSub,
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 500,
                  padding: '3px 8px',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          maxWidth: '680px',
          padding: '24px',
        }}
      >
        {/* Search + Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          <SearchBar
            value={query}
            placeholder="피드 검색..."
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setQuery(e.target.value)
            }
          />
          <SegmentedControl
            selectedIndex={filterIndex}
            onTabChange={handleFilterChange}
          >
            <SegmentedControl.Tab value="all">
              <SegmentedControl.TabCenter>전체</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
            <SegmentedControl.Tab value="following">
              <SegmentedControl.TabCenter>팔로잉</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
            <SegmentedControl.Tab value="popular">
              <SegmentedControl.TabCenter>인기</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
          </SegmentedControl>
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))
          ) : (
            <div
              style={{
                alignItems: 'center',
                background: tc.bg,
                border: `1px solid ${tc.border}`,
                borderRadius: '14px',
                color: tc.fgMuted,
                display: 'flex',
                flexDirection: 'column',
                fontSize: '14px',
                gap: '8px',
                padding: '48px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px' }}>검색 결과 없음</div>
              <div>&ldquo;{query}&rdquo;에 대한 결과가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const SocialFeedV2: Story = {
  name: 'SocialFeed (Arco + Tailwind UI 사이드바)',
  render: () => <SocialFeedV2Render />,
}

/* --------------------------------------------------------------------------
   FinanceDashboard 템플릿
   Linear + Vercel 스타일 모노크롬 금융 대시보드
   SegmentedControl(selectedIndex/onTabChange), TextField, SolidButton, ListTile 조합
-------------------------------------------------------------------------- */
const FINANCE_TABS = ['전체', '수입', '지출']

const TRANSACTIONS = [
  { id: 1, desc: '월급 입금', amount: 3_200_000, type: 'income', date: '04-10', category: '급여' },
  { id: 2, desc: '카페 결제', amount: -6_400, type: 'expense', date: '04-10', category: '식비' },
  { id: 3, desc: '구독 서비스', amount: -9_900, type: 'expense', date: '04-09', category: '구독' },
  { id: 4, desc: '프리랜서 수입', amount: 850_000, type: 'income', date: '04-08', category: '부업' },
  { id: 5, desc: '식료품 구입', amount: -78_000, type: 'expense', date: '04-07', category: '식비' },
  { id: 6, desc: '교통비', amount: -15_000, type: 'expense', date: '04-06', category: '교통' },
]

const SUMMARY_CARDS = [
  { label: '총 잔액', value: '8,420,000', sub: '+3.2% 이번 달', color: '#1e293b', accent: '#10b981' },
  { label: '총 수입', value: '4,050,000', sub: '이번 달', color: '#10b981', accent: '#10b981' },
  { label: '총 지출', value: '1,209,300', sub: '이번 달', color: '#ef4444', accent: '#ef4444' },
]

function FinanceDashboardRender() {
  const [tabIndex, setTabIndex] = useState(0)
  const [transferAmount, setTransferAmount] = useState('')

  const filtered = TRANSACTIONS.filter((t) => {
    if (tabIndex === 0) return true
    if (tabIndex === 1) return t.type === 'income'
    return t.type === 'expense'
  })

  const fmt = (n: number) => Math.abs(n).toLocaleString('ko-KR')

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        background: '#f8fafc',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      <div style={{ background: '#0f172a', padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Orbit Finance
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginTop: 2 }}>
              8,420,000원
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            HJ
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {SUMMARY_CARDS.map((card) => (
            <div
              key={card.label}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 10,
                padding: '10px 12px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                {card.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: card.color === '#1e293b' ? '#fff' : card.color }}>
                {card.value}
              </div>
              <div style={{ fontSize: 10, color: card.accent, marginTop: 2 }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>
            빠른 이체
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <TextField
                placeholder="이체 금액 입력"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
            </div>
            <SolidButton color="primary" size="medium">
              <SolidButton.Center>이체</SolidButton.Center>
            </SolidButton>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>거래 내역</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <LabelBadge color="gray">
                <LabelBadge.Label>{filtered.length}건</LabelBadge.Label>
              </LabelBadge>
            </div>
          </div>

          <SegmentedControl selectedIndex={tabIndex} onTabChange={setTabIndex}>
            {FINANCE_TABS.map((tab) => (
              <SegmentedControl.Tab key={tab} value={tab}>
                <SegmentedControl.TabCenter>{tab}</SegmentedControl.TabCenter>
              </SegmentedControl.Tab>
            ))}
          </SegmentedControl>
        </div>

        <div
          style={{
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {filtered.map((tx, i) => (
            <ListTile
              key={tx.id}
              style={{
                borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
              }}
            >
              <ListTile.Leading>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: tx.type === 'income' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  {tx.type === 'income' ? '+' : '-'}
                </div>
              </ListTile.Leading>
              <ListTile.Title>{tx.desc}</ListTile.Title>
              <ListTile.Description>
                {tx.date} · {tx.category}
              </ListTile.Description>
              <ListTile.Trailing>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: tx.type === 'income' ? '#10b981' : '#ef4444',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {fmt(tx.amount)}
                </span>
              </ListTile.Trailing>
            </ListTile>
          ))}
        </div>
      </div>
    </div>
  )
}

export const FinanceDashboard: Story = {
  name: 'Finance Dashboard (Linear + Vercel 모노크롬 스타일)',
  render: () => <FinanceDashboardRender />,
}

/* --------------------------------------------------------------------------
   EmailClient — Tailwind UI + Radix UI 벤치마크 기반
   3-패널 레이아웃: 폴더 사이드바 / 메일 목록 / 메일 상세
   Tailwind UI의 인박스 패턴 + Radix의 접근성 중심 상호작용
-------------------------------------------------------------------------- */

const EMAIL_FOLDERS = [
  { id: 'inbox', label: '받은 편지함', count: 12, icon: '📥' },
  { id: 'sent', label: '보낸 편지함', count: 0, icon: '📤' },
  { id: 'drafts', label: '임시 보관함', count: 3, icon: '📝' },
  { id: 'starred', label: '중요 메일', count: 5, icon: '⭐' },
  { id: 'trash', label: '휴지통', count: 0, icon: '🗑️' },
]

const EMAIL_LIST = [
  {
    id: 1,
    from: 'Heejun Kim',
    fromInitial: 'HK',
    fromColor: '#6366f1',
    subject: '[Orbit UI] 사이클 33 완료 보고',
    preview: 'Tailwind UI + Radix UI 벤치마크 기반 HoverCard, Breadcrumb, EmailClient 템플릿 추가가 완료되었습니다.',
    time: '오전 10:42',
    read: false,
    starred: true,
    tag: '개발',
    tagColor: '#6366f1',
  },
  {
    id: 2,
    from: 'Sumin Lee',
    fromInitial: 'SL',
    fromColor: '#f59e0b',
    subject: '디자인 리뷰 요청 — SegmentedControl 다크모드',
    preview: '안녕하세요, SegmentedControl 컴포넌트의 다크모드 대응 디자인 리뷰를 요청드립니다. 피그마 링크 첨부합니다.',
    time: '오전 9:15',
    read: false,
    starred: false,
    tag: '디자인',
    tagColor: '#f59e0b',
  },
  {
    id: 3,
    from: 'Jinho Park',
    fromInitial: 'JP',
    fromColor: '#10b981',
    subject: 'DataTable 가상 스크롤 PR 머지 완료',
    preview: '안녕하세요, DataTable 가상 스크롤 성능 개선 PR이 머지되었습니다. 스테이징 환경에서 확인 부탁드립니다.',
    time: '어제',
    read: true,
    starred: true,
    tag: '개발',
    tagColor: '#6366f1',
  },
  {
    id: 4,
    from: 'Orbit CI Bot',
    fromInitial: 'CI',
    fromColor: '#94a3b8',
    subject: '[성공] main 브랜치 빌드 완료 — orbit-ui@2.1.4',
    preview: 'All checks passed. 12 packages built successfully. Storybook deployed to orbit-ui-pink.vercel.app.',
    time: '어제',
    read: true,
    starred: false,
    tag: '자동화',
    tagColor: '#94a3b8',
  },
  {
    id: 5,
    from: 'Figma',
    fromInitial: 'F',
    fromColor: '#ef4444',
    subject: '디자인 파일 공유: Orbit UI v2 Components',
    preview: 'Sumin Lee가 Figma 파일 "Orbit UI v2 Components"을 공유했습니다. 파일을 열려면 링크를 클릭하세요.',
    time: '2일 전',
    read: true,
    starred: false,
    tag: '디자인',
    tagColor: '#f59e0b',
  },
]

function EmailClientRender() {
  const [selectedFolder, setSelectedFolder] = useState('inbox')
  const [selectedEmail, setSelectedEmail] = useState<typeof EMAIL_LIST[0] | null>(EMAIL_LIST[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [composing, setComposing] = useState(false)

  const filteredEmails = EMAIL_LIST.filter(
    (e) =>
      selectedFolder !== 'starred' ||
      e.starred
  ).filter(
    (e) =>
      !searchQuery ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.from.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', height: '720px', background: tc.bg, fontFamily: 'inherit', overflow: 'hidden', borderRadius: 12, border: `1px solid ${tc.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

      {/* Sidebar — 폴더 목록 */}
      <div style={{ width: 220, borderRight: `1px solid ${tc.border}`, display: 'flex', flexDirection: 'column', background: tc.surface, flexShrink: 0 }}>
        {/* 로고 + 새 메일 */}
        <div style={{ padding: '20px 16px 12px', borderBottom: `1px solid ${tc.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: tc.fg, marginBottom: 12 }}>Mail</div>
          <SolidButton
            color="primary"
            size="small"
            width="100%"
            onClick={() => setComposing(true)}
          >
            <SolidButton.Center>+ 편지 쓰기</SolidButton.Center>
          </SolidButton>
        </div>

        {/* 검색 */}
        <div style={{ padding: '12px 12px 8px' }}>
          <div style={{ position: 'relative' }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="메일 검색..."
              style={{ width: '100%', padding: '6px 10px 6px 28px', borderRadius: 6, border: `1px solid ${tc.border}`, fontSize: 12, outline: 'none', background: tc.bg, color: tc.fg, boxSizing: 'border-box' }}
            />
            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: tc.fgMuted }}>🔍</span>
          </div>
        </div>

        {/* 폴더 목록 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
          {EMAIL_FOLDERS.map((folder) => {
            const isActive = selectedFolder === folder.id
            return (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 10px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: isActive ? tc.fillPrimary + '12' : 'transparent',
                  marginBottom: 2,
                  transition: 'background 0.1s',
                }}
              >
                <span style={{ fontSize: 14 }}>{folder.icon}</span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? tc.fillPrimary : tc.fg }}>
                  {folder.label}
                </span>
                {folder.count > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? '#fff' : tc.fgMuted, background: isActive ? tc.fillPrimary : tc.surfaceElevated, padding: '1px 6px', borderRadius: 10 }}>
                    {folder.count}
                  </span>
                )}
              </div>
            )
          })}

          <div style={{ margin: '12px 10px 6px', fontSize: 10, fontWeight: 700, color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>태그</div>
          {[{ label: '개발', color: '#6366f1' }, { label: '디자인', color: '#f59e0b' }, { label: '자동화', color: '#94a3b8' }].map((tag) => (
            <div key={tag.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 2 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: tag.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: tc.fgSub }}>{tag.label}</span>
            </div>
          ))}
        </div>

        {/* 프로필 */}
        <div style={{ padding: '12px 14px', borderTop: `1px solid ${tc.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            HK
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: tc.fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Heejun Kim</div>
            <div style={{ fontSize: 10, color: tc.fgMuted }}>heejun@orbit.dev</div>
          </div>
        </div>
      </div>

      {/* 메일 목록 */}
      <div style={{ width: 300, borderRight: `1px solid ${tc.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* 헤더 */}
        <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${tc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: tc.fg }}>
            {EMAIL_FOLDERS.find((f) => f.id === selectedFolder)?.label}
          </span>
          <span style={{ fontSize: 11, color: tc.fgMuted }}>{filteredEmails.length}개</span>
        </div>

        {/* 메일 항목들 */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredEmails.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: tc.fgMuted, fontSize: 13 }}>메일이 없습니다.</div>
          ) : (
            filteredEmails.map((email) => {
              const isSelected = selectedEmail?.id === email.id
              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    padding: '12px 14px',
                    borderBottom: `1px solid ${tc.borderSub}`,
                    cursor: 'pointer',
                    background: isSelected ? tc.fillPrimary + '08' : email.read ? tc.bg : tc.surface,
                    borderLeft: `3px solid ${isSelected ? tc.fillPrimary : 'transparent'}`,
                    transition: 'all 0.1s',
                  }}
                >
                  {/* 발신자 행 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: email.fromColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
                      {email.fromInitial}
                    </div>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: email.read ? 500 : 700, color: tc.fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {email.from}
                    </span>
                    <span style={{ fontSize: 10, color: tc.fgMuted, flexShrink: 0 }}>{email.time}</span>
                    {email.starred && <span style={{ fontSize: 10, flexShrink: 0 }}>⭐</span>}
                  </div>

                  {/* 제목 */}
                  <div style={{ fontSize: 12, fontWeight: email.read ? 500 : 700, color: email.read ? tc.fgSub : tc.fg, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {email.subject}
                  </div>

                  {/* 미리보기 + 태그 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, color: tc.fgMuted, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {email.preview}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 8, background: email.tagColor + '15', color: email.tagColor, flexShrink: 0 }}>
                      {email.tag}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 메일 상세 + 작성 패널 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {composing ? (
          /* 편지 작성 패널 */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${tc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: tc.fg }}>새 메일 작성</span>
              <button onClick={() => setComposing(false)} style={{ background: 'none', border: 'none', fontSize: 16, color: tc.fgMuted, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderBottom: `1px solid ${tc.border}` }}>
              {['받는 사람', '참조', '제목'].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${tc.borderSub}` }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: tc.fgMuted, padding: '10px 16px', width: 80, flexShrink: 0 }}>{label}</span>
                  <input style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, padding: '10px 0', background: 'transparent', color: tc.fg }} placeholder={label === '제목' ? '제목을 입력하세요' : '이메일 주소'} />
                </div>
              ))}
            </div>
            <textarea
              style={{ flex: 1, border: 'none', outline: 'none', padding: 20, fontSize: 13, color: tc.fg, background: 'transparent', resize: 'none', lineHeight: 1.7 }}
              placeholder="메일 내용을 입력하세요..."
            />
            <div style={{ padding: '12px 20px', borderTop: `1px solid ${tc.border}`, display: 'flex', gap: 8 }}>
              <SolidButton color="primary" size="small" onClick={() => setComposing(false)}>
                <SolidButton.Center>보내기</SolidButton.Center>
              </SolidButton>
              <OutlineButton color="black" size="small" onClick={() => setComposing(false)}>
                <OutlineButton.Center>임시 저장</OutlineButton.Center>
              </OutlineButton>
            </div>
          </div>
        ) : selectedEmail ? (
          /* 메일 상세 */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {/* 헤더 */}
            <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${tc.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: tc.fg, lineHeight: 1.4 }}>
                    {selectedEmail.subject}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: selectedEmail.fromColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                      {selectedEmail.fromInitial}
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: tc.fg }}>{selectedEmail.from}</span>
                      <span style={{ fontSize: 12, color: tc.fgMuted, marginLeft: 8 }}>{selectedEmail.time}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {['답장', '전달'].map((action) => (
                    <OutlineButton key={action} color="black" size="small">
                      <OutlineButton.Center>{action}</OutlineButton.Center>
                    </OutlineButton>
                  ))}
                </div>
              </div>

              {/* 태그 + Progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <LabelBadge color="gray">
                  <LabelBadge.Label>{selectedEmail.tag}</LabelBadge.Label>
                </LabelBadge>
                {!selectedEmail.read && (
                  <LabelBadge color="benefit">
                    <LabelBadge.Label>새 메일</LabelBadge.Label>
                  </LabelBadge>
                )}
              </div>
            </div>

            {/* 메일 본문 */}
            <div style={{ flex: 1, padding: '24px', lineHeight: 1.8, fontSize: 14, color: tc.fg }}>
              <p style={{ margin: '0 0 16px' }}>안녕하세요,</p>
              <p style={{ margin: '0 0 16px' }}>{selectedEmail.preview}</p>
              <p style={{ margin: '0 0 16px' }}>자세한 내용은 아래를 참고해 주세요:</p>
              <ul style={{ margin: '0 0 16px', padding: '0 0 0 20px', color: tc.fgSub }}>
                <li>HoverCard 컴포넌트 — Tailwind UI, Radix UI, shadcn/ui 패턴 각 1개 추가</li>
                <li>Breadcrumb 컴포넌트 — 파일시스템, 설정 계층, 이커머스 패턴 추가</li>
                <li>EmailClient 템플릿 — 3-패널 레이아웃, 폴더/목록/상세/작성 기능 포함</li>
              </ul>
              <p style={{ margin: 0, color: tc.fgMuted, fontSize: 13 }}>감사합니다.<br />Orbit UI 자동화 시스템</p>
            </div>

            {/* 답장 영역 */}
            <div style={{ margin: '0 24px 24px', border: `1px solid ${tc.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', background: tc.surface, borderBottom: `1px solid ${tc.border}`, fontSize: 12, color: tc.fgMuted }}>
                {selectedEmail.from}에게 답장
              </div>
              <textarea
                style={{ width: '100%', minHeight: 80, border: 'none', outline: 'none', padding: '12px 14px', fontSize: 13, color: tc.fg, background: tc.bg, resize: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                placeholder="답장 내용을 입력하세요..."
              />
              <div style={{ padding: '8px 12px', background: tc.surface, borderTop: `1px solid ${tc.border}`, display: 'flex', gap: 8 }}>
                <SolidButton color="primary" size="small">
                  <SolidButton.Center>보내기</SolidButton.Center>
                </SolidButton>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tc.fgMuted, fontSize: 14 }}>
            메일을 선택하세요
          </div>
        )}
      </div>
    </div>
  )
}

export const EmailClient: Story = {
  name: 'Email Client (Tailwind UI + Radix UI 벤치마크)',
  render: () => <EmailClientRender />,
}

/* --------------------------------------------------------------------------
   Monitoring Dashboard — Vercel/Linear 벤치마크
   시스템 상태 모니터링 대시보드 — 실시간 서비스 헬스, 인시던트 타임라인,
   배포 이력, 지역별 레이턴시 맵을 포함한 Vercel-style SRE 도구
-------------------------------------------------------------------------- */
const MonitoringDashboardRender = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [incidentOpen, setIncidentOpen] = useState(false)

  const tc = {
    bg: '#0a0a0a',
    surface: '#111111',
    surfaceElevated: '#1a1a1a',
    border: '#2a2a2a',
    borderSub: '#1e1e1e',
    fg: '#ededed',
    fgMuted: '#888888',
    fgSubtle: '#555555',
    green: '#22c55e',
    greenBg: '#052e16',
    greenBorder: '#15803d',
    yellow: '#f59e0b',
    yellowBg: '#2d1f00',
    yellowBorder: '#b45309',
    red: '#ef4444',
    redBg: '#2d0d0d',
    redBorder: '#b91c1c',
    blue: '#6366f1',
    blueBg: '#1a1a3e',
    blueBorder: '#4338ca',
  }

  const services = [
    { name: 'API Gateway', status: 'operational', p99: '42ms', uptime: '99.98%', region: 'iad1' },
    { name: 'Edge Network', status: 'operational', p99: '8ms', uptime: '100%', region: 'all' },
    { name: 'Build System', status: 'degraded', p99: '2100ms', uptime: '99.81%', region: 'sfo1' },
    { name: 'Storage', status: 'operational', p99: '18ms', uptime: '99.99%', region: 'cdg1' },
    { name: 'Auth Service', status: 'operational', p99: '67ms', uptime: '99.97%', region: 'iad1' },
    { name: 'Analytics', status: 'operational', p99: '124ms', uptime: '99.95%', region: 'hkg1' },
    { name: 'CDN Cache', status: 'operational', p99: '3ms', uptime: '100%', region: 'all' },
    { name: 'Database Proxy', status: 'incident', p99: '8400ms', uptime: '99.23%', region: 'sfo1' },
  ]

  const regions = ['all', 'iad1', 'sfo1', 'cdg1', 'hkg1']

  const filteredServices = selectedRegion === 'all'
    ? services
    : services.filter((s) => s.region === selectedRegion || s.region === 'all')

  const deployments = [
    { sha: '6138f84', branch: 'main', time: '2분 전', status: 'ready', duration: '1m 42s' },
    { sha: '1b0d7a9', branch: 'main', time: '18분 전', status: 'error', duration: '32s' },
    { sha: '32265de', branch: 'main', time: '34분 전', status: 'ready', duration: '2m 11s' },
    { sha: 'ac7a6f3', branch: 'feat/cycle-33', time: '1시간 전', status: 'ready', duration: '1m 58s' },
    { sha: 'bef6617', branch: 'main', time: '3시간 전', status: 'ready', duration: '1m 44s' },
  ]

  const incidents = [
    {
      id: 'INC-2847',
      title: 'Database Proxy 응답 지연',
      severity: 'critical',
      started: '14분 전',
      updates: [
        { time: '14분 전', msg: '인시던트 감지 — sfo1 Database Proxy 응답 지연 시작' },
        { time: '11분 전', msg: '조사 중 — 엔지니어링 팀 대응 시작' },
        { time: '6분 전', msg: '원인 식별 — 연결 풀 소진으로 인한 지연 확인' },
      ],
    },
  ]

  const latencyData = [
    { region: 'IAD (us-east-1)', p50: 12, p99: 42, color: tc.green },
    { region: 'SFO (us-west-2)', p50: 18, p99: 2100, color: tc.yellow },
    { region: 'CDG (eu-west-3)', p50: 24, p99: 89, color: tc.green },
    { region: 'HKG (ap-east-1)', p50: 31, p99: 124, color: tc.green },
    { region: 'SYD (ap-southeast-2)', p50: 45, p99: 167, color: tc.green },
  ]

  const statusColor = (s: string) => {
    if (s === 'operational') return tc.green
    if (s === 'degraded') return tc.yellow
    return tc.red
  }

  const statusLabel = (s: string) => {
    if (s === 'operational') return 'Operational'
    if (s === 'degraded') return 'Degraded'
    return 'Incident'
  }

  const overallStatus = services.some((s) => s.status === 'incident')
    ? 'incident'
    : services.some((s) => s.status === 'degraded')
    ? 'degraded'
    : 'operational'

  return (
    <div style={{ minHeight: '100vh', background: tc.bg, color: tc.fg, fontFamily: '"Geist", "Inter", system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${tc.border}`, padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, background: tc.fg, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 10, height: 10, background: tc.bg, borderRadius: 2 }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 14 }}>orbit-ui</span>
            </div>
            <span style={{ color: tc.fgSubtle }}>/</span>
            <span style={{ fontSize: 14, color: tc.fgMuted }}>Monitoring</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 20,
              background: overallStatus === 'incident' ? tc.redBg : overallStatus === 'degraded' ? tc.yellowBg : tc.greenBg,
              border: `1px solid ${overallStatus === 'incident' ? tc.redBorder : overallStatus === 'degraded' ? tc.yellowBorder : tc.greenBorder}`,
              fontSize: 12, fontWeight: 600,
              color: overallStatus === 'incident' ? tc.red : overallStatus === 'degraded' ? tc.yellow : tc.green,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: overallStatus === 'incident' ? tc.red : overallStatus === 'degraded' ? tc.yellow : tc.green,
              }} />
              {overallStatus === 'incident' ? 'Service Disruption' : overallStatus === 'degraded' ? 'Partial Degradation' : 'All Systems Operational'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>
        {/* Active Incident Banner */}
        {overallStatus === 'incident' && (
          <div style={{
            marginBottom: 24, padding: '14px 18px', borderRadius: 10,
            background: tc.redBg, border: `1px solid ${tc.redBorder}`,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: tc.red, marginTop: 6, flexShrink: 0, animation: 'pulse 2s infinite' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: tc.red }}>{incidents[0].id}</span>
                <span style={{ fontSize: 12, color: tc.fgMuted }}>{incidents[0].started} 시작</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: tc.fg }}>{incidents[0].title}</p>
            </div>
            <button
              onClick={() => setIncidentOpen(!incidentOpen)}
              style={{ background: 'none', border: 'none', color: tc.fgMuted, cursor: 'pointer', fontSize: 12, padding: 0 }}
            >
              {incidentOpen ? '접기' : '상세 보기'}
            </button>
          </div>
        )}

        {/* Incident Timeline */}
        {incidentOpen && (
          <div style={{
            marginBottom: 24, padding: '16px 18px', borderRadius: 10,
            background: tc.surface, border: `1px solid ${tc.border}`,
          }}>
            <p style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 700, color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              인시던트 타임라인
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {incidents[0].updates.map((u, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? tc.red : tc.fgSubtle, flexShrink: 0 }} />
                    {i < incidents[0].updates.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: tc.border, minHeight: 20 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < incidents[0].updates.length - 1 ? 12 : 0 }}>
                    <span style={{ fontSize: 11, color: tc.fgMuted }}>{u.time}</span>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: tc.fg }}>{u.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: '전체 가용성', value: '99.94%', sub: '최근 30일', color: tc.green },
            { label: '평균 응답 시간', value: '38ms', sub: 'P50 글로벌', color: tc.fg },
            { label: '오늘 배포 수', value: '5', sub: '3 Ready / 1 Error', color: tc.fg },
            { label: '활성 인시던트', value: '1', sub: '1 Critical', color: tc.red },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '16px 20px', borderRadius: 10,
              background: tc.surface, border: `1px solid ${tc.border}`,
            }}>
              <p style={{ margin: '0 0 6px', fontSize: 12, color: tc.fgMuted }}>{m.label}</p>
              <p style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 700, color: m.color, letterSpacing: '-0.02em' }}>{m.value}</p>
              <p style={{ margin: 0, fontSize: 11, color: tc.fgSubtle }}>{m.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
          {/* Left: Services */}
          <div>
            {/* Region Filter */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: tc.fg }}>서비스 상태</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    style={{
                      padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                      background: selectedRegion === r ? tc.blue : tc.surface,
                      color: selectedRegion === r ? '#fff' : tc.fgMuted,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderRadius: 10, border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
              {filteredServices.map((svc, i) => (
                <div key={svc.name} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '12px 18px',
                  borderBottom: i < filteredServices.length - 1 ? `1px solid ${tc.borderSub}` : 'none',
                  background: tc.surface,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: statusColor(svc.status),
                  }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: tc.fg }}>{svc.name}</span>
                    <span style={{
                      marginLeft: 8, fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: tc.surfaceElevated, color: tc.fgMuted,
                      textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em',
                    }}>
                      {svc.region}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: tc.fgMuted, minWidth: 60, textAlign: 'right' }}>
                    P99 {svc.p99}
                  </span>
                  <span style={{ fontSize: 12, color: tc.fgMuted, minWidth: 50, textAlign: 'right' }}>
                    {svc.uptime}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, minWidth: 72, textAlign: 'right',
                    color: statusColor(svc.status),
                  }}>
                    {statusLabel(svc.status)}
                  </span>
                </div>
              ))}
            </div>

            {/* Latency by Region */}
            <div style={{ marginTop: 20 }}>
              <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, color: tc.fg }}>지역별 레이턴시</p>
              <div style={{ borderRadius: 10, border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
                {latencyData.map((r, i) => (
                  <div key={r.region} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                    borderBottom: i < latencyData.length - 1 ? `1px solid ${tc.borderSub}` : 'none',
                    background: tc.surface,
                  }}>
                    <span style={{ fontSize: 12, color: tc.fgMuted, minWidth: 160 }}>{r.region}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: tc.surfaceElevated, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: r.color,
                        width: `${Math.min((r.p99 / 8400) * 100, 100)}%`,
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: r.color, minWidth: 56, textAlign: 'right' }}>
                      {r.p99}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Deployments */}
          <div>
            <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, color: tc.fg }}>최근 배포</p>
            <div style={{ borderRadius: 10, border: `1px solid ${tc.border}`, overflow: 'hidden' }}>
              {deployments.map((d, i) => (
                <div key={d.sha} style={{
                  padding: '12px 16px',
                  borderBottom: i < deployments.length - 1 ? `1px solid ${tc.borderSub}` : 'none',
                  background: tc.surface,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: d.status === 'ready' ? tc.green : tc.red,
                    }} />
                    <code style={{ fontSize: 12, color: tc.fg, fontFamily: 'monospace', fontWeight: 600 }}>
                      {d.sha}
                    </code>
                    <span style={{
                      fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: tc.surfaceElevated, color: tc.fgMuted,
                      fontWeight: 600,
                    }}>
                      {d.branch}
                    </span>
                    <span style={{ fontSize: 11, color: tc.fgSubtle, marginLeft: 'auto' }}>{d.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: d.status === 'ready' ? tc.green : tc.red,
                    }}>
                      {d.status === 'ready' ? 'Ready' : 'Error'}
                    </span>
                    <span style={{ fontSize: 11, color: tc.fgSubtle }}>{d.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Uptime Graph placeholder */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: tc.fg }}>가용성 (90일)</p>
                <span style={{ fontSize: 12, color: tc.green, fontWeight: 600 }}>99.94%</span>
              </div>
              <div style={{ display: 'flex', gap: 2, height: 32, alignItems: 'flex-end' }}>
                {Array.from({ length: 90 }, (_, i) => {
                  const isIncident = i === 72 || i === 58
                  const isDegraded = i === 61 || i === 71
                  const h = isIncident ? 12 : isDegraded ? 20 : 28 + Math.sin(i * 0.4) * 4
                  const bg = isIncident ? tc.red : isDegraded ? tc.yellow : tc.green
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1, borderRadius: 1, background: bg,
                        height: `${Math.max(h, 4)}px`, opacity: 0.8,
                      }}
                    />
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 10, color: tc.fgSubtle }}>90일 전</span>
                <span style={{ fontSize: 10, color: tc.fgSubtle }}>오늘</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MonitoringDashboard: Story = {
  name: 'Monitoring Dashboard (Vercel + Linear 벤치마크)',
  render: () => <MonitoringDashboardRender />,
}

/* --------------------------------------------------------------------------
   Portfolio Page — shadcn/ui + Radix UI 벤치마크
   개발자/디자이너 포트폴리오 — 프로젝트 그리드, 기술 스택 태그,
   경력 타임라인, 연락처 섹션을 포함한 개인 브랜딩 페이지
-------------------------------------------------------------------------- */
const PortfolioPageRender = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const tc = {
    bg: '#fafafa',
    surface: '#ffffff',
    border: '#e5e7eb',
    fg: '#111827',
    fgMuted: '#6b7280',
    fgSubtle: '#9ca3af',
    accent: '#6366f1',
    accentBg: '#eef2ff',
    accentBorder: '#c7d2fe',
  }

  const filters = ['all', 'web', 'mobile', 'design-system', 'open-source']

  const projects = [
    {
      id: 'orbit-ui',
      title: 'Orbit UI',
      desc: 'React 기반 3-tier 디자인 시스템 — 50+ 컴포넌트, Storybook 통합, Vercel 자동 배포',
      tags: ['React', 'TypeScript', 'Storybook', 'vanilla-extract'],
      filter: 'design-system',
      color: '#6366f1',
      stars: 248,
      year: '2024',
    },
    {
      id: 'orbit-icons',
      title: 'Orbit Icons',
      desc: '200+ SVG 아이콘 라이브러리 — 라인/필드 variant, tree-shakeable ESM 번들',
      tags: ['SVG', 'Vite', 'pnpm workspace'],
      filter: 'open-source',
      color: '#8b5cf6',
      stars: 91,
      year: '2024',
    },
    {
      id: 'eclipse-theme',
      title: 'Eclipse Theme',
      desc: 'Orbit UI의 기본 테마 패키지 — 다크/라이트 모드, SSR 지원, 프리셋 토큰 시스템',
      tags: ['CSS-in-JS', 'Dark Mode', 'SSR'],
      filter: 'design-system',
      color: '#10b981',
      stars: 67,
      year: '2025',
    },
    {
      id: 'deploy-hub',
      title: 'Deploy Hub',
      desc: 'GitHub Actions + Vercel 통합 자동화 도구 — PR 미리보기, 배포 상태 알림',
      tags: ['GitHub Actions', 'Vercel', 'Node.js'],
      filter: 'web',
      color: '#f59e0b',
      stars: 142,
      year: '2025',
    },
    {
      id: 'mobile-kit',
      title: 'Mobile Kit',
      desc: 'React Native 컴포넌트 라이브러리 — Orbit UI 디자인 토큰 기반 크로스플랫폼 UI',
      tags: ['React Native', 'Expo', 'TypeScript'],
      filter: 'mobile',
      color: '#ef4444',
      stars: 38,
      year: '2025',
    },
    {
      id: 'figma-sync',
      title: 'Figma Token Sync',
      desc: 'Figma 토큰을 Orbit UI 디자인 토큰으로 자동 변환하는 CLI 도구',
      tags: ['CLI', 'Figma API', 'JSON'],
      filter: 'open-source',
      color: '#06b6d4',
      stars: 53,
      year: '2024',
    },
  ]

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Storybook'] },
    { category: 'Design System', items: ['Figma', 'vanilla-extract', 'Design Tokens', 'Radix UI'] },
    { category: 'Tooling', items: ['Vite', 'pnpm', 'Vitest', 'ESLint', 'GitHub Actions'] },
    { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'Vercel', 'Redis'] },
  ]

  const timeline = [
    { year: '2025', role: 'Senior Frontend Engineer', company: 'Startup A', desc: 'Orbit UI 디자인 시스템 구축 및 전사 적용' },
    { year: '2024', role: 'Frontend Engineer', company: 'Tech Corp', desc: '컴포넌트 라이브러리 설계 및 Storybook 인프라 구축' },
    { year: '2023', role: 'Junior Developer', company: 'Agency B', desc: 'React 기반 웹 애플리케이션 개발 및 유지보수' },
  ]

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((p) => p.filter === activeFilter)

  return (
    <div style={{ minHeight: '100vh', background: tc.bg, fontFamily: '"Inter", system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${tc.border}`, background: tc.surface, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: tc.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff' }}>
              K
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: tc.fg }}>Kim Heejun</span>
          </div>
          <nav style={{ display: 'flex', gap: 24 }}>
            {['Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
              <a key={item} href="#" style={{ fontSize: 13, color: tc.fgMuted, textDecoration: 'none', fontWeight: 500 }}>{item}</a>
            ))}
          </nav>
          <SolidButton color="primary" size="small">
            <SolidButton.Center>Resume</SolidButton.Center>
          </SolidButton>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
        {/* Hero */}
        <section style={{ marginBottom: 72, display: 'flex', alignItems: 'center', gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
              borderRadius: 20, background: tc.accentBg, border: `1px solid ${tc.accentBorder}`,
              fontSize: 12, fontWeight: 600, color: tc.accent, marginBottom: 20,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
              Available for work
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 900, color: tc.fg, margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Frontend Engineer<br />
              <span style={{ color: tc.accent }}>& Design Systems</span>
            </h1>
            <p style={{ fontSize: 16, color: tc.fgMuted, lineHeight: 1.7, margin: '0 0 28px', maxWidth: 480 }}>
              React, TypeScript, 디자인 시스템 전문. Orbit UI 오픈소스 메인테이너.
              확장 가능한 컴포넌트 라이브러리와 개발자 경험 향상에 집중합니다.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <SolidButton color="primary" size="medium">
                <SolidButton.Center>View Projects</SolidButton.Center>
              </SolidButton>
              <OutlineButton size="medium" color="black">
                <OutlineButton.Center>Get in touch</OutlineButton.Center>
              </OutlineButton>
            </div>
          </div>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 미니 스탯 카드 */}
            {[
              { label: 'GitHub Stars', value: '639+', color: '#f59e0b' },
              { label: 'Components', value: '50+', color: tc.accent },
              { label: 'Open Source', value: '6 repos', color: '#10b981' },
            ].map((stat) => (
              <div key={stat.label} style={{
                padding: '14px 20px', borderRadius: 12,
                background: tc.surface, border: `1px solid ${tc.border}`,
                minWidth: 160,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: tc.fgMuted, marginTop: 2, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: tc.fg, margin: 0, letterSpacing: '-0.02em' }}>Projects</h2>
            <div style={{ display: 'flex', gap: 6 }}>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '5px 12px', borderRadius: 20, border: `1px solid ${activeFilter === f ? tc.accent : tc.border}`,
                    background: activeFilter === f ? tc.accentBg : tc.surface,
                    fontSize: 11, fontWeight: 600, cursor: 'pointer', color: activeFilter === f ? tc.accent : tc.fgMuted,
                    textTransform: activeFilter === 'all' ? 'none' : 'none',
                  }}
                >
                  {f === 'all' ? 'All' : f === 'design-system' ? 'Design System' : f === 'open-source' ? 'Open Source' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  padding: '20px', borderRadius: 12,
                  background: tc.surface,
                  border: `1.5px solid ${hoveredProject === project.id ? project.color + '44' : tc.border}`,
                  boxShadow: hoveredProject === project.id ? `0 4px 20px ${project.color}18` : 'none',
                  transition: 'all 0.2s ease', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: project.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 900, color: '#fff',
                  }}>
                    {project.title[0]}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: tc.fgMuted }}>
                    <span>{'★'}</span>
                    <span>{project.stars}</span>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tc.fg, marginBottom: 6 }}>{project.title}</div>
                <div style={{ fontSize: 12, color: tc.fgMuted, lineHeight: 1.6, marginBottom: 14 }}>{project.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 10, padding: '2px 7px', borderRadius: 20,
                      background: tc.bg, border: `1px solid ${tc.border}`,
                      color: tc.fgMuted, fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: tc.fg, margin: '0 0 24px', letterSpacing: '-0.02em' }}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {skills.map((group) => (
              <div key={group.category} style={{
                padding: '20px', borderRadius: 12,
                background: tc.surface, border: `1px solid ${tc.border}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: tc.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  {group.category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {group.items.map((skill) => (
                    <div key={skill} style={{ fontSize: 13, color: tc.fg, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: tc.accentBorder, flexShrink: 0 }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: tc.fg, margin: '0 0 24px', letterSpacing: '-0.02em' }}>Experience</h2>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 8, top: 8, bottom: 0, width: 2, background: tc.border, borderRadius: 2 }} />
            {timeline.map((item, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: 32 }}>
                <div style={{
                  position: 'absolute', left: -28, top: 4, width: 12, height: 12, borderRadius: '50%',
                  background: tc.accent, border: `3px solid ${tc.bg}`, zIndex: 1,
                }} />
                <div style={{
                  padding: '18px 20px', borderRadius: 12,
                  background: tc.surface, border: `1px solid ${tc.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 11, padding: '2px 8px', borderRadius: 20,
                      background: tc.accentBg, color: tc.accent, fontWeight: 700,
                    }}>
                      {item.year}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: tc.fg }}>{item.role}</span>
                    <span style={{ fontSize: 12, color: tc.fgMuted }}>@ {item.company}</span>
                  </div>
                  <div style={{ fontSize: 13, color: tc.fgMuted, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{
          padding: '40px', borderRadius: 20, textAlign: 'center',
          background: `linear-gradient(135deg, ${tc.accentBg} 0%, #f5f3ff 100%)`,
          border: `1.5px solid ${tc.accentBorder}`,
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: tc.fg, marginBottom: 8, letterSpacing: '-0.02em' }}>
            함께 만들고 싶은 것이 있나요?
          </div>
          <div style={{ fontSize: 14, color: tc.fgMuted, marginBottom: 24, lineHeight: 1.7 }}>
            디자인 시스템, 컴포넌트 라이브러리, 또는 멋진 제품에 대해 이야기해 봐요.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <SolidButton color="primary" size="medium">
              <SolidButton.Center>연락하기</SolidButton.Center>
            </SolidButton>
            <OutlineButton size="medium" color="black">
              <OutlineButton.Center>GitHub</OutlineButton.Center>
            </OutlineButton>
          </div>
        </section>
      </main>
    </div>
  )
}

export const PortfolioPage: Story = {
  name: 'Portfolio Page (shadcn/ui + Radix UI 벤치마크)',
  render: () => <PortfolioPageRender />,
}

/* ═══════════════════════════════════════════
   26. Document Editor (Notion + Linear 벤치마크)
   ═══════════════════════════════════════════ */
const DocumentEditorRender = () => {
  const [activeBlock, setActiveBlock] = useState<number | null>(null)
  const [wordCount] = useState(1247)
  const [saved, setSaved] = useState(true)
  const [showOutline, setShowOutline] = useState(true)

  const outline = [
    { level: 1, label: 'Orbit UI 디자인 토큰 아키텍처', id: 'h1-1' },
    { level: 2, label: '3단계 토큰 계층', id: 'h2-1' },
    { level: 3, label: 'Reference Tokens', id: 'h3-1' },
    { level: 3, label: 'Semantic Tokens', id: 'h3-2' },
    { level: 2, label: '테마 적용 방법', id: 'h2-2' },
    { level: 3, label: 'CSS Variables', id: 'h3-3' },
    { level: 2, label: '마이그레이션 가이드', id: 'h2-3' },
  ]

  const blocks = [
    { id: 1, type: 'h1', content: 'Orbit UI 디자인 토큰 아키텍처' },
    { id: 2, type: 'meta', content: '작성자: Kim Heejun  •  최종 수정: 2026년 4월 10일  •  읽기 시간: 8분' },
    { id: 3, type: 'callout', content: '이 문서는 Orbit UI의 3단계 토큰 시스템을 설명합니다. Reference → Semantic → Component 순서로 토큰이 계층화됩니다.' },
    { id: 4, type: 'h2', content: '3단계 토큰 계층' },
    { id: 5, type: 'p', content: '디자인 토큰은 세 단계로 나뉩니다. 각 단계는 명확한 역할을 가지며, 하위 단계의 값을 상위 단계가 참조합니다.' },
    { id: 6, type: 'h3', content: 'Reference Tokens' },
    { id: 7, type: 'p', content: 'Reference Token은 원시 값을 담습니다. colorBlue500, spacing8, radiusMd 같은 토큰이 여기에 해당합니다.' },
    { id: 8, type: 'code', content: 'export const colorBlue500 = "#6366f1"\nexport const spacing8 = "8px"' },
    { id: 9, type: 'h3', content: 'Semantic Tokens' },
    { id: 10, type: 'p', content: 'Semantic Token은 의미 기반 이름을 사용합니다. fillPrimary, foregroundMuted처럼 용도가 명확합니다.' },
    { id: 11, type: 'h2', content: '테마 적용 방법' },
    { id: 12, type: 'p', content: 'EclipseProvider에 theme prop을 전달하거나 CSS Variables를 루트에서 오버라이드하면 전체 테마를 변경할 수 있습니다.' },
    { id: 13, type: 'h2', content: '마이그레이션 가이드' },
    { id: 14, type: 'p', content: 'Ant Design에서 Orbit UI로 마이그레이션할 때는 Modal.confirm → Alert, Button type="danger" → color="primary" 등의 변경이 필요합니다.' },
  ]

  const handleSave = () => {
    setSaved(false)
    setTimeout(() => setSaved(true), 800)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: tc.bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 16px',
          height: 48,
          borderBottom: `1px solid ${tc.border}`,
          background: tc.bg,
          flexShrink: 0,
        }}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 6,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: tc.fgSub,
            fontSize: 13,
          }}
        >
          <ChevronLeftLineIcon style={{ width: 16, height: 16 }} />
          <span>Docs</span>
        </button>
        <span style={{ color: tc.border }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: tc.fg }}>
          Orbit UI 디자인 토큰 아키텍처
        </span>
        <div style={{ flex: 1 }} />
        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {['B', 'I', 'U'].map((f) => (
            <button
              key={f}
              style={{
                width: 28,
                height: 28,
                borderRadius: 5,
                border: '1px solid transparent',
                background: 'none',
                cursor: 'pointer',
                fontWeight: f === 'B' ? 800 : f === 'I' ? 400 : 500,
                fontStyle: f === 'I' ? 'italic' : 'normal',
                textDecoration: f === 'U' ? 'underline' : 'none',
                color: tc.fg,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {f}
            </button>
          ))}
          <div style={{ width: 1, height: 18, background: tc.border, margin: '0 4px' }} />
          {['H1', 'H2', 'H3'].map((h) => (
            <button
              key={h}
              style={{
                padding: '2px 6px',
                borderRadius: 5,
                border: '1px solid transparent',
                background: 'none',
                cursor: 'pointer',
                color: tc.fgSub,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {h}
            </button>
          ))}
          <div style={{ width: 1, height: 18, background: tc.border, margin: '0 4px' }} />
          <button
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: 'none',
              background: saved ? '#f0fdf4' : '#fef3c7',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              color: saved ? '#16a34a' : '#92400e',
            }}
            onClick={handleSave}
          >
            {saved ? '✓ 저장됨' : '저장 중...'}
          </button>
          <button
            onClick={() => setShowOutline((v) => !v)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: `1px solid ${tc.border}`,
              background: showOutline ? tc.surface : 'none',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              color: tc.fgSub,
            }}
          >
            목차
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Outline sidebar */}
        {showOutline && (
          <aside
            style={{
              width: 220,
              padding: '24px 16px',
              borderRight: `1px solid ${tc.border}`,
              overflowY: 'auto',
              flexShrink: 0,
            }}
          >
            <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              목차
            </p>
            <nav>
              {outline.map((item) => (
                <button
                  key={item.id}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: `4px ${item.level === 1 ? 0 : item.level === 2 ? 12 : 24}px`,
                    paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 12 : 24,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: item.level === 1 ? 12 : 11,
                    fontWeight: item.level === 1 ? 700 : 500,
                    color: item.level === 1 ? tc.fg : tc.fgSub,
                    borderLeft: item.level > 1 ? `2px solid ${tc.border}` : 'none',
                    marginLeft: item.level > 1 ? 0 : 0,
                    lineHeight: 1.6,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Editor */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px',
          }}
        >
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {blocks.map((block) => {
              const isActive = activeBlock === block.id
              return (
                <div
                  key={block.id}
                  onClick={() => setActiveBlock(block.id)}
                  style={{
                    position: 'relative',
                    marginBottom: block.type === 'h1' ? 4 : block.type.startsWith('h') ? 8 : 4,
                    borderRadius: 6,
                    padding: '2px 8px',
                    background: isActive ? `${tc.fillPrimary}08` : 'transparent',
                    cursor: 'text',
                    outline: 'none',
                  }}
                >
                  {block.type === 'h1' && (
                    <h1 style={{ margin: '16px 0 4px', fontSize: 30, fontWeight: 800, color: tc.fg, letterSpacing: '-0.03em' }}>
                      {block.content}
                    </h1>
                  )}
                  {block.type === 'h2' && (
                    <h2 style={{ margin: '28px 0 4px', fontSize: 20, fontWeight: 700, color: tc.fg, letterSpacing: '-0.02em' }}>
                      {block.content}
                    </h2>
                  )}
                  {block.type === 'h3' && (
                    <h3 style={{ margin: '20px 0 4px', fontSize: 15, fontWeight: 700, color: tc.fg }}>
                      {block.content}
                    </h3>
                  )}
                  {block.type === 'meta' && (
                    <p style={{ margin: '0 0 20px', fontSize: 12, color: tc.fgMuted }}>
                      {block.content}
                    </p>
                  )}
                  {block.type === 'callout' && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 12,
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: `${tc.fillPrimary}10`,
                        border: `1px solid ${tc.fillPrimary}30`,
                        margin: '12px 0',
                      }}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
                      <p style={{ margin: 0, fontSize: 13, color: tc.fg, lineHeight: 1.7 }}>{block.content}</p>
                    </div>
                  )}
                  {block.type === 'p' && (
                    <p style={{ margin: '6px 0', fontSize: 14, color: tc.fg, lineHeight: 1.8 }}>
                      {block.content}
                    </p>
                  )}
                  {block.type === 'code' && (
                    <pre
                      style={{
                        margin: '8px 0',
                        padding: '14px 16px',
                        borderRadius: 8,
                        background: '#1e1e2e',
                        color: '#cdd6f4',
                        fontSize: 12,
                        fontFamily: 'monospace',
                        lineHeight: 1.6,
                        overflowX: 'auto',
                      }}
                    >
                      {block.content}
                    </pre>
                  )}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 16,
                        height: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: tc.fgMuted,
                        fontSize: 14,
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right panel – doc stats */}
        <aside
          style={{
            width: 200,
            padding: '24px 16px',
            borderLeft: `1px solid ${tc.border}`,
            flexShrink: 0,
          }}
        >
          <p style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 700, color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            문서 정보
          </p>
          {[
            { label: '단어 수', value: wordCount.toLocaleString() },
            { label: '블록 수', value: blocks.length },
            { label: '섹션', value: outline.filter((o) => o.level === 2).length },
            { label: '최종 저장', value: saved ? '방금 전' : '저장 중...' },
          ].map((stat) => (
            <div key={stat.label} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: tc.fgMuted, marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: tc.fg }}>{stat.value}</div>
            </div>
          ))}
          <div style={{ marginTop: 24, padding: '12px', borderRadius: 8, background: tc.surface }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: tc.fgSub }}>공유</p>
            {['편집자', '댓글 가능', '읽기 전용'].map((role) => (
              <div
                key={role}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 0',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: `hsl(${role.length * 40}, 60%, 70%)`,
                    fontSize: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  {role[0]}
                </div>
                <span style={{ fontSize: 12, color: tc.fgSub }}>{role}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '0 24px',
          height: 32,
          borderTop: `1px solid ${tc.border}`,
          background: tc.surface,
          flexShrink: 0,
          fontSize: 11,
          color: tc.fgMuted,
        }}
      >
        <span>{wordCount.toLocaleString()}단어</span>
        <span>•</span>
        <span>{blocks.length}개 블록</span>
        <span>•</span>
        <span style={{ color: saved ? '#16a34a' : '#92400e' }}>{saved ? '저장됨' : '저장 중...'}</span>
        <div style={{ flex: 1 }} />
        <span>Notion + Linear 벤치마크</span>
      </div>
    </div>
  )
}

export const DocumentEditor: Story = {
  name: 'Document Editor (Notion + Linear 벤치마크)',
  render: () => <DocumentEditorRender />,
}

/* ═══════════════════════════════════════════
   27. Search Results (Mantine + Chakra UI 벤치마크)
   ═══════════════════════════════════════════ */
const SearchResultsRender = () => {
  const [query, setQuery] = useState('design system')
  const [activeFilter, setActiveFilter] = useState('전체')
  const [sortBy, setSortBy] = useState<'관련도' | '최신' | '인기'>('관련도')
  const [page, setPage] = useState(1)

  const filters = ['전체', '컴포넌트', '문서', '스토리', '템플릿', 'MDX']
  const results = [
    { type: '컴포넌트', title: 'Button — SolidButton, OutlineButton, GhostButton', desc: '6가지 색상 variant, 3가지 크기, Leading/Center/Trailing 슬롯으로 구성된 버튼 컴포넌트 시리즈.', tags: ['actions', 'buttons', 'interactive'], updated: '2일 전', relevance: 98 },
    { type: '문서', title: 'DesignToken — 3단계 토큰 시스템', desc: 'Reference → Semantic → Component 계층의 토큰 아키텍처 설명. CSS Variables 기반 런타임 테마 변경.', tags: ['tokens', 'theme', 'architecture'], updated: '5일 전', relevance: 92 },
    { type: '템플릿', title: 'AdminDashboard — 관리자 대시보드', desc: '사이드바 네비게이션, 지표 카드, 데이터 테이블을 포함한 완성형 관리자 UI 레이아웃.', tags: ['template', 'dashboard', 'admin'], updated: '1주 전', relevance: 88 },
    { type: '스토리', title: 'Command — Raycast 스포트라이트 패턴', desc: '다크 배경 스포트라이트 런처. 앱/파일/액션 카테고리 + 아이콘 + 서브텍스트 + 단축키 힌트.', tags: ['command', 'search', 'spotlight'], updated: '3일 전', relevance: 85 },
    { type: 'MDX', title: 'GettingStarted — 시작 가이드', desc: 'pnpm 설치, Provider 설정, SSR 서버 컴포넌트 사용법, 첫 컴포넌트 렌더링 4단계 가이드.', tags: ['guide', 'setup', 'quickstart'], updated: '1주 전', relevance: 80 },
    { type: '컴포넌트', title: 'TextField — 텍스트 입력 필드', desc: '레이블, 헬퍼 텍스트, 에러 상태, Leading/Trailing 아이콘 슬롯을 포함한 입력 컴포넌트.', tags: ['input', 'form', 'text'], updated: '4일 전', relevance: 76 },
    { type: '문서', title: 'MigrationGuide — Ant Design 마이그레이션', desc: 'Ant Design에서 Orbit UI로 전환하는 방법. 컴포넌트 매핑, 코드 변환 예시 10개 포함.', tags: ['migration', 'antd', 'guide'], updated: '6일 전', relevance: 72 },
    { type: '스토리', title: 'DataTable — 정렬/페이지네이션 인터랙션', desc: '헤더 클릭 정렬, 행 선택 체크박스, 페이지네이션 컨트롤을 포함한 데이터 테이블 인터랙션.', tags: ['table', 'sort', 'pagination'], updated: '2일 전', relevance: 68 },
  ]

  const typeColor: Record<string, string> = {
    '컴포넌트': '#6366f1',
    '문서': '#10b981',
    '템플릿': '#8b5cf6',
    '스토리': '#f59e0b',
    'MDX': '#06b6d4',
  }

  const filtered = results
    .filter((r) => activeFilter === '전체' || r.type === activeFilter)
    .sort((a, b) => {
      if (sortBy === '관련도') return b.relevance - a.relevance
      return 0
    })

  const perPage = 5
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: tc.bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Search header */}
      <div style={{ borderBottom: `1px solid ${tc.border}`, background: tc.bg }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SearchIcon style={{ width: 18, height: 18, color: tc.fgMuted, flexShrink: 0 }} />
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="검색어를 입력하세요..."
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 20, fontWeight: 600, color: tc.fg, background: 'transparent',
              }}
            />
            <span style={{ fontSize: 12, color: tc.fgMuted }}>{filtered.length}개 결과</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px', display: 'flex', gap: 24 }}>
        {/* Left sidebar filters */}
        <aside style={{ width: 180, flexShrink: 0 }}>
          <div style={{ marginBottom: 24 }}>
            <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              유형
            </p>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setPage(1) }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '6px 10px', borderRadius: 6, border: 'none',
                  background: activeFilter === f ? `${tc.fillPrimary}12` : 'none',
                  cursor: 'pointer', marginBottom: 2,
                  fontSize: 13, fontWeight: activeFilter === f ? 700 : 500,
                  color: activeFilter === f ? tc.fillPrimary : tc.fgSub,
                  textAlign: 'left',
                }}
              >
                <span>{f}</span>
                <span style={{ fontSize: 11, color: tc.fgMuted }}>
                  {f === '전체' ? results.length : results.filter((r) => r.type === f).length}
                </span>
              </button>
            ))}
          </div>

          <div>
            <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: tc.fgMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              정렬
            </p>
            {(['관련도', '최신', '인기'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                style={{
                  display: 'block', width: '100%', padding: '6px 10px', borderRadius: 6,
                  border: 'none', background: sortBy === s ? `${tc.fillPrimary}12` : 'none',
                  cursor: 'pointer', marginBottom: 2, fontSize: 13, textAlign: 'left',
                  fontWeight: sortBy === s ? 700 : 500,
                  color: sortBy === s ? tc.fillPrimary : tc.fgSub,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </aside>

        {/* Results list */}
        <div style={{ flex: 1 }}>
          {paged.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: tc.fgMuted }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>검색 결과가 없습니다</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>다른 유형 필터를 선택해 보세요</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {paged.map((result, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '18px 20px', borderRadius: 12,
                    border: `1px solid ${tc.border}`,
                    background: tc.bg,
                    cursor: 'pointer',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${tc.fillPrimary}44`
                    e.currentTarget.style.boxShadow = `0 2px 12px rgba(99,102,241,0.08)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tc.border
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span
                      style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                        color: typeColor[result.type] || '#64748b',
                        background: `${typeColor[result.type] || '#64748b'}14`,
                        border: `1px solid ${typeColor[result.type] || '#64748b'}28`,
                        flexShrink: 0, marginTop: 2,
                      }}
                    >
                      {result.type}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: tc.fg, marginBottom: 6 }}>
                        {result.title}
                      </div>
                      <div style={{ fontSize: 13, color: tc.fgSub, lineHeight: 1.6, marginBottom: 10 }}>
                        {result.desc}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {result.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '1px 8px', borderRadius: 20,
                              background: tc.surface, border: `1px solid ${tc.border}`,
                              fontSize: 11, color: tc.fgSub, fontWeight: 500,
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: tc.fgMuted }}>
                          {result.updated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 28 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: '6px 12px', borderRadius: 6, border: `1px solid ${tc.border}`,
                  background: 'none', cursor: page === 1 ? 'not-allowed' : 'pointer',
                  color: page === 1 ? tc.fgMuted : tc.fgSub, fontSize: 13, fontWeight: 600,
                }}
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 34, height: 34, borderRadius: 6,
                    border: `1px solid ${p === page ? tc.fillPrimary : tc.border}`,
                    background: p === page ? tc.fillPrimary : 'none',
                    cursor: 'pointer', fontSize: 13, fontWeight: 700,
                    color: p === page ? '#fff' : tc.fgSub,
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: '6px 12px', borderRadius: 6, border: `1px solid ${tc.border}`,
                  background: 'none', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  color: page === totalPages ? tc.fgMuted : tc.fgSub, fontSize: 13, fontWeight: 600,
                }}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const SearchResults: Story = {
  name: 'Search Results (Mantine + Chakra UI 벤치마크)',
  render: () => <SearchResultsRender />,
}

/* ═══════════════════════════════════════════
   28. Mobile Checkout (Tailwind UI + Apple HIG 벤치마크)
   ═══════════════════════════════════════════ */
const MobileCheckoutRender = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [address, setAddress] = useState({ name: '김희준', phone: '010-1234-5678', addr: '서울시 강남구 테헤란로 123' })
  const [payMethod, setPayMethod] = useState<'card' | 'kakao' | 'naver'>('card')
  const [agreed, setAgreed] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const items = [
    { name: 'SolidButton 컴포넌트 팩', qty: 1, price: 29000 },
    { name: 'Eclipse 테마 라이선스', qty: 2, price: 59000 },
    { name: 'Storybook 스타터킷', qty: 1, price: 15000 },
  ]
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = 0
  const total = subtotal + shipping

  const payMethods = [
    { key: 'card' as const, label: '신용카드', icon: '💳' },
    { key: 'kakao' as const, label: '카카오페이', icon: '🟡' },
    { key: 'naver' as const, label: '네이버페이', icon: '🟢' },
  ]

  if (ordered) {
    return (
      <div style={{ width: 390, minHeight: '100vh', background: tc.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4', border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✓</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: tc.fg, marginBottom: 8 }}>주문 완료!</div>
          <div style={{ fontSize: 14, color: tc.fgSub, lineHeight: 1.6 }}>
            주문이 성공적으로 접수되었습니다.<br />
            배송은 2~3 영업일 이내에 시작됩니다.
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderRadius: 12, background: tc.surface, border: `1px solid ${tc.border}`, fontSize: 13, color: tc.fgSub, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, color: tc.fg, marginBottom: 4 }}>총 결제 금액</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: tc.fillPrimary }}>{total.toLocaleString()}원</div>
        </div>
        <button onClick={() => { setOrdered(false); setStep(1) }} style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: tc.fillPrimary, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          쇼핑 계속하기
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: 390, minHeight: '100vh', background: tc.bg, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: tc.bg, borderBottom: `1px solid ${tc.border}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        {step > 1 && (
          <button onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tc.fgSub, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
            <ChevronLeftLineIcon style={{ width: 16, height: 16 }} />
            뒤로
          </button>
        )}
        <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: tc.fg, textAlign: step > 1 ? 'center' : 'left' }}>
          {step === 1 ? '장바구니' : step === 2 ? '배송 정보' : '결제'}
        </span>
      </div>

      {/* Step indicator */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
        {(['주문확인', '배송정보', '결제'] as const).map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: i + 1 <= step ? tc.fillPrimary : tc.surface, color: i + 1 <= step ? '#fff' : tc.fgMuted, border: `1px solid ${i + 1 <= step ? tc.fillPrimary : tc.border}` }}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 11, color: i + 1 <= step ? tc.fg : tc.fgMuted, fontWeight: i + 1 === step ? 700 : 400 }}>{label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 1, background: i + 1 < step ? tc.fillPrimary : tc.border }} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Cart */}
      {step === 1 && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px', borderRadius: 12, border: `1px solid ${tc.border}`, background: tc.bg }}>
                <div style={{ width: 56, height: 56, borderRadius: 8, background: `linear-gradient(135deg, hsl(${i * 60 + 220}, 70%, 85%), hsl(${i * 60 + 240}, 70%, 75%))`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {['🎨', '🎭', '📦'][i]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: tc.fg, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: tc.fgSub }}>수량 {item.qty}개</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tc.fg }}>{(item.price * item.qty).toLocaleString()}원</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px', borderRadius: 12, background: tc.surface, border: `1px solid ${tc.border}`, marginBottom: 20 }}>
            {[{ label: '소계', value: subtotal }, { label: '배송비', value: shipping, isFree: true }].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: tc.fgSub }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'isFree' in row && row.isFree ? '#10b981' : tc.fg }}>
                  {'isFree' in row && row.isFree ? '무료' : `${row.value.toLocaleString()}원`}
                </span>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${tc.border}`, paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: tc.fg }}>합계</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: tc.fillPrimary }}>{total.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Delivery */}
      {step === 2 && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: '수령인', key: 'name' as const, placeholder: '이름 입력' },
              { label: '연락처', key: 'phone' as const, placeholder: '010-0000-0000' },
              { label: '주소', key: 'addr' as const, placeholder: '주소 검색' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: tc.fgSub, marginBottom: 6 }}>{field.label}</label>
                <input
                  value={address[field.key]}
                  onChange={(e) => setAddress((a) => ({ ...a, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${tc.border}`, fontSize: 14, color: tc.fg, outline: 'none', background: tc.bg, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: tc.fg, marginBottom: 10 }}>결제 수단</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {payMethods.map((pm) => (
                <button
                  key={pm.key}
                  onClick={() => setPayMethod(pm.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderRadius: 12,
                    border: `2px solid ${payMethod === pm.key ? tc.fillPrimary : tc.border}`,
                    background: payMethod === pm.key ? `${tc.fillPrimary}08` : tc.bg,
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{pm.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: tc.fg }}>{pm.label}</span>
                  {payMethod === pm.key && <span style={{ marginLeft: 'auto', fontSize: 16, color: tc.fillPrimary }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '14px 16px', borderRadius: 12, background: tc.surface, border: `1px solid ${tc.border}`, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: tc.fgSub, marginBottom: 4 }}>최종 결제 금액</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: tc.fillPrimary }}>{total.toLocaleString()}원</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
            <label htmlFor="agree" style={{ fontSize: 13, color: tc.fgSub, cursor: 'pointer' }}>
              구매 조건 및 개인정보 처리에 동의합니다
            </label>
          </div>
        </div>
      )}

      {/* CTA button */}
      <div style={{ padding: '12px 16px 32px', background: tc.bg, borderTop: `1px solid ${tc.border}` }}>
        <SolidButton
          color="primary"
          size="medium"
          style={{ width: '100%' }}
          disabled={step === 3 && !agreed}
          onClick={() => {
            if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3)
            else setOrdered(true)
          }}
        >
          <SolidButton.Center>
            {step === 1 ? `${total.toLocaleString()}원 · 배송 정보 입력` : step === 2 ? '결제 수단 선택' : `${payMethods.find((p) => p.key === payMethod)?.label}으로 결제`}
          </SolidButton.Center>
        </SolidButton>
      </div>
    </div>
  )
}

export const MobileCheckout: Story = {
  name: 'Mobile Checkout (Tailwind UI + Apple HIG 벤치마크)',
  render: () => <MobileCheckoutRender />,
}

// ─── Cycle 39: Radix UI + Google Material 3 — Activity Feed ──────────────

type FeedCategory = 'all' | 'mentions' | 'updates' | 'alerts'
type FeedItem = {
  id: number
  category: 'mentions' | 'updates' | 'alerts'
  title: string
  body: string
  time: string
  read: boolean
  avatar: string
  color: string
}

const FEED_ITEMS: FeedItem[] = [
  { id: 1, category: 'mentions', title: '김민준이 멘션했습니다', body: '@you 이 PR 리뷰 부탁드립니다 — auth 모듈 리팩토링', time: '방금 전', read: false, avatar: '김', color: '#6366f1' },
  { id: 2, category: 'alerts', title: '빌드 실패', body: 'main 브랜치 CI 파이프라인이 실패했습니다. 확인이 필요합니다.', time: '3분 전', read: false, avatar: '!', color: '#ef4444' },
  { id: 3, category: 'updates', title: '디자인 시스템 v2.1 릴리즈', body: 'GhostButton, TextArea 컴포넌트가 업데이트되었습니다.', time: '1시간 전', read: false, avatar: '✦', color: '#8b5cf6' },
  { id: 4, category: 'mentions', title: '이서연이 댓글을 남겼습니다', body: '토큰 시스템 정말 좋네요! Reference → Semantic → Component 구조가 명확해요.', time: '2시간 전', read: true, avatar: '이', color: '#0ea5e9' },
  { id: 5, category: 'updates', title: '스프린트 리뷰 일정', body: '다음 주 금요일 오후 3시 스프린트 리뷰 미팅이 확정되었습니다.', time: '5시간 전', read: true, avatar: '📅', color: '#f59e0b' },
  { id: 6, category: 'alerts', title: '스토리지 90% 사용', body: '프로젝트 스토리지가 90%에 도달했습니다. 정리가 필요합니다.', time: '어제', read: true, avatar: '⚠', color: '#f97316' },
  { id: 7, category: 'mentions', title: '박지호가 태그했습니다', body: '@you 컴포넌트 문서 업데이트 확인 부탁드립니다.', time: '어제', read: true, avatar: '박', color: '#10b981' },
  { id: 8, category: 'updates', title: 'Storybook 배포 완료', body: 'Storybook이 Vercel에 성공적으로 배포되었습니다. 미리보기 링크를 확인하세요.', time: '2일 전', read: true, avatar: '✓', color: '#6366f1' },
]

const FEED_CATEGORIES: { key: FeedCategory; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'mentions', label: '멘션' },
  { key: 'updates', label: '업데이트' },
  { key: 'alerts', label: '알림' },
]

function ActivityFeedRender() {
  const [activeCategory, setActiveCategory] = useState<FeedCategory>('all')
  const [feedItems, setFeedItems] = useState<FeedItem[]>(FEED_ITEMS)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const unreadCount = feedItems.filter((n) => !n.read).length

  const filtered = feedItems.filter((n) => {
    const catMatch = activeCategory === 'all' || n.category === activeCategory
    const readMatch = !showUnreadOnly || !n.read
    return catMatch && readMatch
  })

  const markAllRead = () => setFeedItems((prev) => prev.map((n) => ({ ...n, read: true })))
  const markRead = (id: number) => setFeedItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  const dismiss = (id: number) => setFeedItems((prev) => prev.filter((n) => n.id !== id))

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: 680, fontFamily: 'system-ui, sans-serif', background: '#f8fafc' }}>
      {/* 사이드바 */}
      <div style={{ width: 220, background: '#fff', borderRight: '1px solid #e2e8f0', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 4 }}>활동 피드</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : '모두 읽음'}</div>
        </div>
        <nav style={{ padding: '12px 8px' }}>
          {FEED_CATEGORIES.map((cat) => {
            const catUnread = cat.key === 'all' ? unreadCount : feedItems.filter((n) => n.category === cat.key && !n.read).length
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: activeCategory === cat.key ? '#eff6ff' : 'transparent',
                  color: activeCategory === cat.key ? '#2563eb' : '#475569',
                  fontWeight: activeCategory === cat.key ? 600 : 400, fontSize: 13,
                  marginBottom: 2, transition: 'background 0.15s',
                }}
              >
                <span>{cat.label}</span>
                {catUnread > 0 && (
                  <span style={{ background: '#ef4444', color: '#fff', borderRadius: 10, fontSize: 10, fontWeight: 700, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>
                    {catUnread}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Radix UI 스타일 필터 토글 */}
        <div style={{ margin: '12px 16px 0', padding: '12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: '#64748b', fontWeight: 500 }}>
            <div
              role="switch"
              aria-checked={showUnreadOnly}
              onClick={() => setShowUnreadOnly((v) => !v)}
              style={{
                width: 32, height: 18, borderRadius: 9, border: 'none', cursor: 'pointer',
                background: showUnreadOnly ? '#6366f1' : '#cbd5e1', transition: 'background 0.2s',
                position: 'relative', flexShrink: 0,
              }}
            >
              <div style={{
                width: 14, height: 14, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 2, transition: 'left 0.2s',
                left: showUnreadOnly ? 16 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </div>
            읽지 않음만
          </label>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              {FEED_CATEGORIES.find((c) => c.key === activeCategory)?.label} 알림
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{filtered.length}개의 알림</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <GhostButton size="small" color="black" onClick={markAllRead} disabled={unreadCount === 0}>
              <GhostButton.Center>모두 읽음 처리</GhostButton.Center>
            </GhostButton>
          </div>
        </div>

        {/* 알림 목록 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#94a3b8' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>알림이 없습니다</div>
              <div style={{ fontSize: 13 }}>모든 알림을 확인했습니다.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 12,
                    background: item.read ? '#fff' : '#f0f4ff',
                    border: `1px solid ${item.read ? '#e2e8f0' : '#c7d7fd'}`,
                    transition: 'box-shadow 0.15s', cursor: 'pointer',
                  }}
                  onClick={() => markRead(item.id)}
                >
                  {/* 아바타 */}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: item.color,
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, flexShrink: 0,
                  }}>
                    {item.avatar}
                  </div>

                  {/* 콘텐츠 */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: item.read ? 500 : 700, color: '#1e293b' }}>{item.title}</span>
                      {!item.read && (
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', flexShrink: 0, display: 'inline-block' }} />
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.body}
                    </p>
                    <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.time}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 10,
                        background: item.category === 'alerts' ? '#fef2f2' : item.category === 'mentions' ? '#eff6ff' : '#f0fdf4',
                        color: item.category === 'alerts' ? '#ef4444' : item.category === 'mentions' ? '#2563eb' : '#16a34a',
                      }}>
                        {item.category === 'alerts' ? '알림' : item.category === 'mentions' ? '멘션' : '업데이트'}
                      </span>
                    </div>
                  </div>

                  {/* 삭제 버튼 */}
                  <GhostButton
                    size="small"
                    color="gray"
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); dismiss(item.id) }}
                  >
                    <GhostButton.Center>✕</GhostButton.Center>
                  </GhostButton>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* M3 스타일 하단 요약 바 */}
        <div style={{ padding: '12px 24px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            {[
              { label: '멘션', count: feedItems.filter((n) => n.category === 'mentions').length, color: '#2563eb' },
              { label: '업데이트', count: feedItems.filter((n) => n.category === 'updates').length, color: '#16a34a' },
              { label: '알림', count: feedItems.filter((n) => n.category === 'alerts').length, color: '#ef4444' },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: stat.color }} />
                <span style={{ fontSize: 12, color: '#64748b' }}>{stat.label}: <strong style={{ color: '#334155' }}>{stat.count}</strong></span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Radix UI + Material 3 패턴 적용</span>
        </div>
      </div>
    </div>
  )
}

export const ActivityFeed: Story = {
  name: 'Activity Feed (Radix UI + Google Material 3 벤치마크)',
  render: () => <ActivityFeedRender />,
}
