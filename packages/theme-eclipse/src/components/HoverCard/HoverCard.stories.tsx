import type { Meta, StoryObj } from '@storybook/react'

import { HoverCard } from './HoverCard'
import { Avatar } from '../Avatar'
import { Typography } from '../Text'
import { SolidButton } from '../SolidButton'
import { CounterBadge } from '../CounterBadge'
import { Divider } from '../Divider'

const meta = {
  title: 'eclipse/Feedback/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

/* --------------------------------------------------------------------------
   기본 - GitHub 스타일 유저 프로필 미리보기
-------------------------------------------------------------------------- */
export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <HoverCard>
        <HoverCard.Trigger asChild>
          <a
            href="#"
            style={{ fontSize: '14px', fontWeight: 600, color: '#6366f1', textDecoration: 'underline', textUnderlineOffset: '4px' }}
          >
            @orbit-ui
          </a>
        </HoverCard.Trigger>
        <HoverCard.Content style={{ width: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <Avatar>
              <Avatar.Fallback>OR</Avatar.Fallback>
            </Avatar>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography textStyle="subheadingSmall">Orbit UI</Typography>
              <Typography textStyle="descriptionLarge" color="foregroundSecondary">
                2026년을 위한 모던 React 디자인 시스템 프레임워크입니다.
              </Typography>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
                Joined December 2024
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   사용자 프로필 미리보기
   Mantine HoverCard 패턴: 아바타 호버 시 상세 프로필 카드 표시
-------------------------------------------------------------------------- */
const UserAvatarSvg = ({ color = '#6366f1', size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="20" fill={color} fillOpacity="0.15" />
    <circle cx="20" cy="16" r="6" fill={color} fillOpacity="0.8" />
    <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const UserProfileCardRender = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 40px' }}>
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Typography textStyle="descriptionLarge" color="foregroundSecondary">담당자:</Typography>
      {[
        { name: 'Kim Jihye', role: 'Product Designer', color: '#6366f1', followers: 128, following: 64 },
        { name: 'Park Minjun', role: 'Frontend Engineer', color: '#8b5cf6', followers: 256, following: 32 },
        { name: 'Lee Soyeon', role: 'Backend Engineer', color: '#10b981', followers: 89, following: 45 },
      ].map((user) => (
        <HoverCard key={user.name} openDelay={200}>
          <HoverCard.Trigger asChild>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                borderRadius: '50%',
                outline: 'none',
              }}
              aria-label={user.name}
            >
              <UserAvatarSvg color={user.color} size={36} />
            </button>
          </HoverCard.Trigger>
          <HoverCard.Content style={{ width: 280 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <UserAvatarSvg color={user.color} size={48} />
                <div>
                  <Typography textStyle="subheadingSmall">{user.name}</Typography>
                  <Typography textStyle="descriptionMedium" color="foregroundSecondary">
                    {user.role}
                  </Typography>
                </div>
              </div>
              <Divider />
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <CounterBadge>{user.followers}</CounterBadge>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>팔로워</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <CounterBadge>{user.following}</CounterBadge>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>팔로잉</div>
                </div>
              </div>
              <SolidButton color="primary" size="small" style={{ width: '100%' }}>
                <SolidButton.Center>팔로우</SolidButton.Center>
              </SolidButton>
            </div>
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  </div>
)

export const 사용자_프로필_미리보기: Story = {
  render: () => <UserProfileCardRender />,
}

/* --------------------------------------------------------------------------
   링크 미리보기 카드
   Mantine HoverCard 패턴: 링크 호버 시 메타데이터 미리보기 카드 표시
-------------------------------------------------------------------------- */
const LinkPreviewIcon = ({ color = '#6366f1' }: { color?: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill={color} fillOpacity="0.1" />
    <rect x="10" y="14" width="28" height="4" rx="2" fill={color} fillOpacity="0.6" />
    <rect x="10" y="22" width="20" height="3" rx="1.5" fill={color} fillOpacity="0.3" />
    <rect x="10" y="29" width="24" height="3" rx="1.5" fill={color} fillOpacity="0.3" />
    <rect x="10" y="36" width="16" height="3" rx="1.5" fill={color} fillOpacity="0.2" />
  </svg>
)

const links = [
  {
    title: 'Orbit UI - React Design System',
    domain: 'orbit-ui.vercel.app',
    desc: '3-tier 아키텍처 기반의 모던 React 컴포넌트 라이브러리. Base → Theme → Custom 계층 구조.',
    color: '#6366f1',
    label: 'Orbit UI 공식 문서',
  },
  {
    title: 'Eclipse Theme Token Reference',
    domain: 'orbit-ui.vercel.app/tokens',
    desc: 'Reference → Semantic → Component 3단계 디자인 토큰 시스템 전체 레퍼런스.',
    color: '#8b5cf6',
    label: '토큰 레퍼런스',
  },
]

const LinkPreviewRender = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '60px 40px' }}>
    {links.map((link) => (
      <HoverCard key={link.domain} openDelay={300}>
        <HoverCard.Trigger asChild>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 500,
              color: link.color,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 8.5l5-5M8 3.5h3v3" stroke={link.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 8.5V11a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h2.5" stroke={link.color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {link.label}
          </a>
        </HoverCard.Trigger>
        <HoverCard.Content style={{ width: 340 }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <LinkPreviewIcon color={link.color} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Typography textStyle="subheadingSmall">{link.title}</Typography>
              <Typography textStyle="descriptionMedium" color="foregroundTertiary">
                {link.domain}
              </Typography>
              <Typography textStyle="descriptionMedium" color="foregroundSecondary">
                {link.desc}
              </Typography>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard>
    ))}
  </div>
)

export const 링크_미리보기: Story = {
  render: () => <LinkPreviewRender />,
}

/* --------------------------------------------------------------------------
   이미지 미리보기
   인라인 SVG 썸네일 + HoverCard로 확대 이미지 표시 패턴
-------------------------------------------------------------------------- */
const ThumbnailSvg = ({
  color,
  size = 48,
  label,
}: {
  color: string
  size?: number
  label: string
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill={color} fillOpacity="0.15" />
    <circle cx="18" cy="18" r="5" fill={color} fillOpacity="0.5" />
    <path d="M4 36l10-12 8 10 6-7 12 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="24" y="44" textAnchor="middle" fontSize="7" fill={color} fontFamily="sans-serif" fontWeight="600">{label}</text>
  </svg>
)

const LargePreviewSvg = ({ color, width = 240, height = 160, label }: { color: string; width?: number; height?: number; label: string }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width={width} height={height} rx="8" fill={color} fillOpacity="0.12" />
    <rect x="8" y="8" width={width - 16} height={height - 16} rx="6" fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
    <circle cx="70" cy="70" r="24" fill={color} fillOpacity="0.35" />
    <path d={`M20 ${height - 20} l40-50 32 40 24-28 ${width - 60} 38`} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x={width / 2} y={height - 8} textAnchor="middle" fontSize="11" fill={color} fontFamily="sans-serif" fontWeight="600">{label}</text>
  </svg>
)

const ImagePreviewRender = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', padding: '80px 40px' }}>
    {[
      { color: '#6366f1', label: 'Banner A' },
      { color: '#10b981', label: 'Banner B' },
      { color: '#f59e0b', label: 'Banner C' },
    ].map((item) => (
      <HoverCard key={item.label} openDelay={100}>
        <HoverCard.Trigger asChild>
          <button
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '8px' }}
            aria-label={`${item.label} 미리보기`}
          >
            <ThumbnailSvg color={item.color} size={64} label={item.label} />
          </button>
        </HoverCard.Trigger>
        <HoverCard.Content style={{ padding: 0, overflow: 'hidden' }}>
          <LargePreviewSvg color={item.color} label={`${item.label} - 확대 미리보기`} />
        </HoverCard.Content>
      </HoverCard>
    ))}
  </div>
)

export const 이미지_미리보기: Story = {
  render: () => <ImagePreviewRender />,
}

/* --------------------------------------------------------------------------
   통계 데이터 미리보기
   Material 3 Tooltip 확장 패턴: 지표 숫자 호버 시 상세 차트/데이터 팝오버
-------------------------------------------------------------------------- */
const MiniBarSvg = ({ values, color }: { values: number[]; color: string }) => {
  const max = Math.max(...values)
  const barW = 16
  const gap = 4
  const totalW = values.length * (barW + gap) - gap
  const h = 40

  return (
    <svg width={totalW} height={h} viewBox={`0 0 ${totalW} ${h}`} fill="none">
      {values.map((v, i) => {
        const barH = Math.round((v / max) * (h - 4))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - barH}
            width={barW}
            height={barH}
            rx="3"
            fill={color}
            fillOpacity={i === values.length - 1 ? 0.9 : 0.4}
          />
        )
      })}
    </svg>
  )
}

const stats = [
  {
    label: 'DAU',
    value: '12,847',
    trend: '+12.5%',
    trendColor: '#10b981',
    color: '#6366f1',
    chartValues: [80, 95, 70, 110, 88, 120, 128],
    desc: '지난 7일 일간 활성 사용자 추이',
  },
  {
    label: 'Revenue',
    value: '$48,290',
    trend: '+8.2%',
    trendColor: '#10b981',
    color: '#8b5cf6',
    chartValues: [200, 310, 280, 390, 350, 420, 483],
    desc: '지난 7일 매출 추이 (USD)',
  },
]

const StatPreviewRender = () => (
  <div style={{ display: 'flex', gap: '24px', padding: '60px 40px' }}>
    {stats.map((stat) => (
      <HoverCard key={stat.label} openDelay={150}>
        <HoverCard.Trigger asChild>
          <button
            style={{
              cursor: 'pointer',
              padding: '14px 20px',
              borderRadius: '12px',
              border: `1.5px solid ${stat.color}30`,
              background: `${stat.color}08`,
              textAlign: 'left',
            }}
          >
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: stat.trendColor, fontWeight: 600, marginTop: '2px' }}>{stat.trend}</div>
          </button>
        </HoverCard.Trigger>
        <HoverCard.Content style={{ width: 260 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <Typography textStyle="subheadingSmall">{stat.label} 상세</Typography>
              <Typography textStyle="descriptionMedium" color="foregroundTertiary">
                {stat.desc}
              </Typography>
            </div>
            <Divider />
            <MiniBarSvg values={stat.chartValues} color={stat.color} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography textStyle="descriptionLarge" color="foregroundSecondary">현재 값</Typography>
              <Typography textStyle="subheadingSmall">{stat.value}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography textStyle="descriptionLarge" color="foregroundSecondary">전주 대비</Typography>
              <Typography textStyle="descriptionLarge" style={{ color: stat.trendColor, fontWeight: 600 }}>
                {stat.trend}
              </Typography>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard>
    ))}
  </div>
)

export const 통계_데이터_미리보기: Story = {
  render: () => <StatPreviewRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 팀 멤버 카드 호버 패턴
   Tailwind UI Contact card — 아바타 + 상세 정보 팝업 패턴
-------------------------------------------------------------------------- */
const TEAM = [
  { name: 'Heejun Kim', role: 'Frontend Lead', dept: 'Engineering', joined: '2024-03', projects: 12, color: '#6366f1' },
  { name: 'Sumin Lee', role: 'Product Designer', dept: 'Design', joined: '2024-06', projects: 8, color: '#f59e0b' },
  { name: 'Jinho Park', role: 'Backend Engineer', dept: 'Engineering', joined: '2023-11', projects: 15, color: '#10b981' },
]

export const Tailwind_팀_멤버_카드: Story = {
  name: 'Tailwind UI - 팀 멤버 연락처 카드',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {TEAM.map((member) => (
        <HoverCard key={member.name} openDelay={200}>
          <HoverCard.Trigger asChild>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', cursor: 'pointer', background: '#fff' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{member.name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{member.role}</div>
              </div>
            </div>
          </HoverCard.Trigger>
          <HoverCard.Content side="bottom" align="start" style={{ width: 260 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <Typography textStyle="subheadingSmall">{member.name}</Typography>
                  <Typography textStyle="descriptionLarge" color="foregroundSecondary">{member.role}</Typography>
                  <Typography textStyle="descriptionSmall" color="foregroundSecondary">{member.dept}</Typography>
                </div>
              </div>
              <Divider />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[{ label: '합류일', value: member.joined }, { label: '프로젝트', value: `${member.projects}개` }].map((item) => (
                  <div key={item.label}>
                    <Typography textStyle="descriptionSmall" color="foregroundSecondary">{item.label}</Typography>
                    <Typography textStyle="descriptionLarge" style={{ fontWeight: 600 }}>{item.value}</Typography>
                  </div>
                ))}
              </div>
              <SolidButton color="primary" size="small" width="100%">
                <SolidButton.Center>메시지 보내기</SolidButton.Center>
              </SolidButton>
            </div>
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 링크 미리보기 패턴
   Radix HoverCard primitive — URL 미리보기 + 메타데이터 표시 패턴
-------------------------------------------------------------------------- */
const LINKS = [
  { text: 'Orbit UI 시작하기', url: 'docs/getting-started', desc: '설치 방법, 첫 컴포넌트 사용법, EclipseProvider 설정', tag: '문서', color: '#6366f1' },
  { text: '디자인 토큰 가이드', url: 'docs/design-tokens', desc: '3-tier 토큰 아키텍처, Reference→Semantic→Component 흐름', tag: '가이드', color: '#10b981' },
  { text: 'BenchmarkComparison', url: 'docs/benchmark', desc: 'shadcn, MUI, Mantine 대비 Orbit UI 장단점 비교 분석', tag: '분석', color: '#f59e0b' },
]

export const Radix_링크_미리보기: Story = {
  name: 'Radix UI - 링크 미리보기 패턴',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360, padding: 24, background: '#f8fafc', borderRadius: 12 }}>
      <Typography textStyle="subheadingSmall" style={{ marginBottom: 8 }}>관련 문서</Typography>
      {LINKS.map((link) => (
        <HoverCard key={link.url} openDelay={300}>
          <HoverCard.Trigger asChild>
            <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: link.color, fontSize: 13, fontWeight: 600, textDecoration: 'none', cursor: 'pointer', padding: '4px 0' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: link.color, flexShrink: 0 }} />
              {link.text}
            </a>
          </HoverCard.Trigger>
          <HoverCard.Content side="right" align="start" style={{ width: 280 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: link.color + '15', color: link.color }}>{link.tag}</span>
                <Typography textStyle="descriptionSmall" color="foregroundSecondary" style={{ fontFamily: 'monospace' }}>
                  /{link.url}
                </Typography>
              </div>
              <Typography textStyle="subheadingSmall">{link.text}</Typography>
              <Typography textStyle="descriptionLarge" color="foregroundSecondary" style={{ lineHeight: 1.6 }}>
                {link.desc}
              </Typography>
            </div>
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 이슈 상세 미리보기 패턴
   shadcn/ui Hover Card — 이슈 번호 위에 호버 시 상세 정보 팝업 패턴
-------------------------------------------------------------------------- */
const ISSUES = [
  { id: 'ORB-142', title: 'Avatar 컴포넌트 size prop 추가', status: '완료', priority: '보통', assignee: 'HK', color: '#10b981' },
  { id: 'ORB-178', title: 'SegmentedControl 다크모드 지원', status: '진행 중', priority: '높음', assignee: 'SL', color: '#6366f1' },
  { id: 'ORB-203', title: 'DataTable 가상 스크롤 성능 개선', status: '검토 중', priority: '긴급', assignee: 'JP', color: '#f59e0b' },
]

export const shadcn_이슈_미리보기: Story = {
  name: 'shadcn/ui - 이슈 미리보기 호버 카드 패턴',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
      <Typography textStyle="subheadingSmall" style={{ marginBottom: 4 }}>연관 이슈</Typography>
      {ISSUES.map((issue) => (
        <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: issue.color, flexShrink: 0 }} />
          <HoverCard openDelay={200}>
            <HoverCard.Trigger asChild>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#6366f1', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 3 }}>
                {issue.id}
              </span>
            </HoverCard.Trigger>
            <HoverCard.Content side="top" align="start" style={{ width: 280 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Typography textStyle="bodyLarge" style={{ fontWeight: 700 }}>{issue.title}</Typography>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {[{ label: '상태', value: issue.status, color: issue.color }, { label: '우선순위', value: issue.priority, color: '#475569' }, { label: '담당자', value: issue.assignee, color: '#475569' }, { label: '이슈 ID', value: issue.id, color: '#94a3b8' }].map((f) => (
                    <div key={f.label}>
                      <Typography textStyle="descriptionSmall" color="foregroundSecondary">{f.label}</Typography>
                      <Typography textStyle="descriptionLarge" style={{ fontWeight: 600, color: f.color }}>{f.value}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCard.Content>
          </HoverCard>
          <Typography textStyle="descriptionLarge" style={{ flex: 1, color: '#1e293b' }}>{issue.title}</Typography>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10, background: issue.color + '15', color: issue.color }}>{issue.status}</span>
        </div>
      ))}
    </div>
  ),
}
