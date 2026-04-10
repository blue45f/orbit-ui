import React from 'react'
import { ChevronRightLineIcon, CircleInfoLineIcon, CircleNewLineIcon, SettingLineIcon } from '@heejun-com/icons'
import type { Meta, StoryObj } from '@storybook/react'

import { TextButton } from '../GhostButton'
import { Typography } from '../Text'
import { LabelBadge } from '../LabelBadge'
import { CounterBadge } from '../CounterBadge'
import { Divider } from '../Divider'

import { SectionTitle } from './SectionTitle'

SectionTitle.displayName = 'SectionTitle'
SectionTitle.Title.displayName = 'SectionTitle.Title'
SectionTitle.Description.displayName = 'SectionTitle.Description'
SectionTitle.Trailing.displayName = 'SectionTitle.Trailing'

const meta = {
  title: 'eclipse/Data Display/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>
      </SectionTitle>
    </div>
  ),
}

export const 툴팁_아이콘: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>
          List Header <CircleInfoLineIcon />
        </SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>
      </SectionTitle>
    </div>
  ),
}

export const 텍스트_버튼: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>

        <SectionTitle.Trailing>
          <TextButton color="black" size="small">
            <TextButton.Center>Link Action</TextButton.Center>
            <TextButton.Trailing>
              <ChevronRightLineIcon />
            </TextButton.Trailing>
          </TextButton>
        </SectionTitle.Trailing>
      </SectionTitle>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   대시보드 섹션 구조
   Material 3 스타일 List Section Header: 콘텐츠 블록을 의미 있는 섹션으로 구분
-------------------------------------------------------------------------- */
const DashboardItem = ({
  title,
  desc,
  badge,
  badgeColor,
}: {
  title: string
  desc: string
  badge?: string
  badgeColor?: 'gray' | 'benefit' | 'sale'
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #f1f5f9',
    }}
  >
    <div>
      <Typography textStyle="descriptionLargeEmphasized" color="foregroundPrimary">{title}</Typography>
      <Typography textStyle="descriptionMedium" color="foregroundTertiary">{desc}</Typography>
    </div>
    {badge && <LabelBadge color={badgeColor ?? 'gray'}>{badge}</LabelBadge>}
  </div>
)

const DashboardSectionsRender = () => (
  <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: '0' }}>
    <SectionTitle>
      <SectionTitle.Title>진행 중인 작업</SectionTitle.Title>
      <SectionTitle.Description>현재 담당 중인 태스크 목록</SectionTitle.Description>
      <SectionTitle.Trailing>
        <CounterBadge>{3}</CounterBadge>
      </SectionTitle.Trailing>
    </SectionTitle>
    <DashboardItem title="랜딩 페이지 리뉴얼" desc="디자인 검수 단계" badge="In Progress" badgeColor="benefit" />
    <DashboardItem title="API 통합 테스트" desc="QA팀과 협업 중" badge="Review" badgeColor="sale" />
    <DashboardItem title="Storybook 문서 정리" desc="컴포넌트 5개 남음" badge="In Progress" badgeColor="benefit" />

    <div style={{ height: '24px' }} />

    <SectionTitle>
      <SectionTitle.Title>완료된 작업</SectionTitle.Title>
      <SectionTitle.Description>이번 스프린트 완료 항목</SectionTitle.Description>
      <SectionTitle.Trailing>
        <CounterBadge>{5}</CounterBadge>
      </SectionTitle.Trailing>
    </SectionTitle>
    <DashboardItem title="디자인 토큰 시스템 구축" desc="3단계 토큰 계층 완료" badge="Done" badgeColor="gray" />
    <DashboardItem title="반응형 레이아웃 적용" desc="모바일/PC 대응 완료" badge="Done" badgeColor="gray" />

    <div style={{ height: '24px' }} />

    <SectionTitle>
      <SectionTitle.Title>예정된 작업</SectionTitle.Title>
      <SectionTitle.Trailing>
        <TextButton color="black" size="small">
          <TextButton.Trailing>
            <CircleNewLineIcon />
          </TextButton.Trailing>
          <TextButton.Center>추가</TextButton.Center>
        </TextButton>
      </SectionTitle.Trailing>
    </SectionTitle>
    <DashboardItem title="다크모드 토큰 확장" desc="예정일: 2025년 5월" badge="Planned" badgeColor="sale" />
  </div>
)

export const 대시보드_섹션_구조: Story = {
  render: () => <DashboardSectionsRender />,
}

/* --------------------------------------------------------------------------
   설정 페이지 그룹화
   Material 3 Settings 패턴: 관련 설정 항목을 섹션별로 구분
-------------------------------------------------------------------------- */
const SettingRow = ({
  label,
  desc,
  control,
}: {
  label: string
  desc?: string
  control?: React.ReactNode
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid #f8fafc',
    }}
  >
    <div>
      <Typography textStyle="descriptionLargeEmphasized" color="foregroundPrimary">{label}</Typography>
      {desc && (
        <Typography textStyle="descriptionSmall" color="foregroundTertiary">{desc}</Typography>
      )}
    </div>
    {control && <div>{control}</div>}
  </div>
)

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 12l4-4-4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ToggleSwitch = ({ on = false }: { on?: boolean }) => (
  <div
    style={{
      width: '36px',
      height: '20px',
      borderRadius: '10px',
      background: on ? '#6366f1' : '#e2e8f0',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '2px',
        left: on ? '18px' : '2px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'left 0.2s',
      }}
    />
  </div>
)

const SettingsPageRender = () => (
  <div style={{ width: 420 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      <SettingLineIcon size={20} color="#1e293b" />
      <Typography textStyle="headingMedium" color="foregroundPrimary">설정</Typography>
    </div>

    <SectionTitle>
      <SectionTitle.Title>알림 설정</SectionTitle.Title>
      <SectionTitle.Description>푸시 알림 및 이메일 수신 방법을 설정합니다</SectionTitle.Description>
    </SectionTitle>
    <SettingRow label="푸시 알림" desc="새 메시지 및 업데이트 알림" control={<ToggleSwitch on />} />
    <SettingRow label="이메일 뉴스레터" desc="주간 업데이트 이메일" control={<ToggleSwitch />} />
    <SettingRow label="마케팅 알림" desc="프로모션 및 이벤트 알림" control={<ToggleSwitch />} />

    <div style={{ height: '24px' }} />
    <Divider />
    <div style={{ height: '24px' }} />

    <SectionTitle>
      <SectionTitle.Title>보안 설정</SectionTitle.Title>
      <SectionTitle.Description>계정 보안 및 인증 방법을 관리합니다</SectionTitle.Description>
    </SectionTitle>
    <SettingRow label="2단계 인증" control={<ToggleSwitch on />} />
    <SettingRow label="비밀번호 변경" control={<ChevronIcon />} />
    <SettingRow label="로그인 세션 관리" control={<ChevronIcon />} />

    <div style={{ height: '24px' }} />
    <Divider />
    <div style={{ height: '24px' }} />

    <SectionTitle>
      <SectionTitle.Title>앱 설정</SectionTitle.Title>
    </SectionTitle>
    <SettingRow label="언어" desc="한국어" control={<ChevronIcon />} />
    <SettingRow label="테마" desc="시스템 기본값" control={<ChevronIcon />} />
    <SettingRow label="폰트 크기" desc="보통" control={<ChevronIcon />} />
  </div>
)

export const 설정_페이지_그룹화: Story = {
  render: () => <SettingsPageRender />,
}

/* --------------------------------------------------------------------------
   Material 3 스타일 List Section Header
   Material 3 패턴: 색상 강조 레이블로 섹션 구분 (Surface/Container 계층 활용)
-------------------------------------------------------------------------- */
const M3SectionItem = ({
  icon,
  title,
  meta,
}: {
  icon: React.ReactNode
  title: string
  meta: string
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 0',
      borderBottom: '1px solid #f1f5f9',
      cursor: 'pointer',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: 'rgba(99,102,241,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <Typography textStyle="descriptionLargeEmphasized" color="foregroundPrimary">{title}</Typography>
      <Typography textStyle="descriptionSmall" color="foregroundTertiary">{meta}</Typography>
    </div>
    <ChevronIcon />
  </div>
)

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2l1.8 5.2H17l-5 3.6 1.8 5.2L9 13l-4.8 3 1.8-5.2-5-3.6h6.2z" fill="#6366f1" fillOpacity="0.7" />
  </svg>
)
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.7" />
    <path d="M9 5v4l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
  </svg>
)
const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 5a2 2 0 012-2h3l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" fill="#6366f1" fillOpacity="0.5" />
  </svg>
)

const Material3ListRender = () => (
  <div style={{ width: 360, display: 'flex', flexDirection: 'column' }}>
    <div
      style={{
        padding: '8px 16px',
        background: 'rgba(99,102,241,0.06)',
        borderRadius: '8px 8px 0 0',
        borderLeft: '3px solid #6366f1',
      }}
    >
      <SectionTitle>
        <SectionTitle.Title>
          <span style={{ color: '#6366f1', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            즐겨찾기
          </span>
        </SectionTitle.Title>
      </SectionTitle>
    </div>
    <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
      <M3SectionItem icon={<StarIcon />} title="디자인 시스템 온보딩" meta="5분 전 수정" />
      <M3SectionItem icon={<StarIcon />} title="컴포넌트 API 가이드" meta="어제 수정" />
    </div>

    <div style={{ height: '16px' }} />

    <div
      style={{
        padding: '8px 16px',
        background: 'rgba(16,185,129,0.06)',
        borderRadius: '8px 8px 0 0',
        borderLeft: '3px solid #10b981',
      }}
    >
      <SectionTitle>
        <SectionTitle.Title>
          <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            최근 항목
          </span>
        </SectionTitle.Title>
      </SectionTitle>
    </div>
    <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
      <M3SectionItem icon={<ClockIcon />} title="토큰 시스템 마이그레이션" meta="1시간 전" />
      <M3SectionItem icon={<ClockIcon />} title="접근성 가이드라인 검토" meta="3시간 전" />
      <M3SectionItem icon={<FolderIcon />} title="스프린트 27 회고록" meta="어제" />
    </div>
  </div>
)

export const Material3_List_Section_Header: Story = {
  render: () => <Material3ListRender />,
}

export const 광고_뱃지: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
        <SectionTitle.Description>Description</SectionTitle.Description>
        <SectionTitle.Trailing>
          <LabelBadge color="gray">AD</LabelBadge>
        </SectionTitle.Trailing>
      </SectionTitle>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    title: 'List Header',
    description: 'Description',
    longTitle: false,
    hasTooltip: false,
    hasADBadge: false,
    hasLinkActionButton: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title 영역에 표시할 텍스트',
    },
    longTitle: {
      control: 'boolean',
      description: 'Title을 두 줄로 표시할지 여부 (true일 경우 긴 텍스트로 자동 변경)',
    },
    description: {
      control: 'text',
      description: 'Description 영역에 표시할 텍스트',
    },
    hasTooltip: {
      control: 'boolean',
      description: 'Title 뒤에 툴팁 아이콘 표시 여부',
    },
    hasADBadge: {
      control: 'boolean',
      description: 'Trailing 영역에 광고 뱃지 표시 여부',
    },
    hasLinkActionButton: {
      control: 'boolean',
      description: 'Trailing 영역에 LinkActionButton 표시 여부',
    },
  },
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ title, longTitle, description, hasTooltip, hasADBadge, hasLinkActionButton }: any) => {
    const displayTitle = longTitle ? '이것은 정말 길고 길고 긴~~~~~~~~~~ 타이틀이랍니다' : title

    return (
      <div style={{ width: 375 }}>
        <SectionTitle>
          <SectionTitle.Title>
            <Typography>{displayTitle}</Typography>
            {hasTooltip && <CircleInfoLineIcon />}
          </SectionTitle.Title>
          {description && <SectionTitle.Description>{description}</SectionTitle.Description>}
          {(hasADBadge || hasLinkActionButton) && (
            <SectionTitle.Trailing>
              {hasLinkActionButton && (
                <TextButton color="black" size="small">
                  <TextButton.Center>Link Action</TextButton.Center>
                  <TextButton.Trailing>
                    <ChevronRightLineIcon />
                  </TextButton.Trailing>
                </TextButton>
              )}
              {hasADBadge && <LabelBadge color="gray">AD</LabelBadge>}
            </SectionTitle.Trailing>
          )}
        </SectionTitle>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 탭 기반 섹션 네비게이션
   Tailwind UI의 Stacked Layout — 상단 섹션 헤더 + 탭 네비게이션 패턴
-------------------------------------------------------------------------- */
const TW_TABS = [
  { id: 'overview', label: '개요', count: null },
  { id: 'members', label: '멤버', count: 12 },
  { id: 'settings', label: '설정', count: null },
  { id: 'billing', label: '결제', count: null },
]

function TailwindSectionNavDemo() {
  const [activeTab, setActiveTab] = React.useState('overview')

  return (
    <div style={{ width: 480 }}>
      <SectionTitle>
        <SectionTitle.Title>팀 워크스페이스</SectionTitle.Title>
        <SectionTitle.Description>프로젝트 협업 공간을 관리하세요</SectionTitle.Description>
        <SectionTitle.Trailing>
          <TextButton color="black" size="small">
            <TextButton.Center>
              <ChevronRightLineIcon />
            </TextButton.Center>
          </TextButton>
        </SectionTitle.Trailing>
      </SectionTitle>
      <Divider />
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e2e8f0', marginBottom: 16 }}>
        {TW_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? '#6366f1' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
            {tab.count !== null && (
              <span style={{ padding: '1px 7px', borderRadius: 10, fontSize: 11, fontWeight: 700, background: activeTab === tab.id ? '#eef2ff' : '#f1f5f9', color: activeTab === tab.id ? '#6366f1' : '#94a3b8' }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 0', fontSize: 13, color: '#64748b' }}>
        {activeTab === 'overview' && '팀 활동 요약, 최근 프로젝트 현황을 확인하세요.'}
        {activeTab === 'members' && '12명의 팀 멤버를 관리하고 역할을 설정하세요.'}
        {activeTab === 'settings' && '워크스페이스 이름, 아이콘, 공개 여부를 설정하세요.'}
        {activeTab === 'billing' && '구독 플랜 및 결제 수단을 관리하세요.'}
      </div>
    </div>
  )
}

export const Tailwind_탭_섹션_네비게이션: Story = {
  name: 'Tailwind UI - 탭 기반 섹션 네비게이션 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Stacked Layout 패턴. SectionTitle로 페이지 헤더를 구성하고 ' +
          '하단에 탭 네비게이션을 결합합니다. 탭에 CounterBadge를 삽입해 항목 수를 표시합니다.',
      },
    },
  },
  render: () => <TailwindSectionNavDemo />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 다단계 설정 그룹
   Arco의 Descriptions + Collapse 패턴 — 설정 항목을 그룹별로 접을 수 있는 섹션 구성
-------------------------------------------------------------------------- */
const ARCO_SETTING_GROUPS = [
  {
    id: 'general',
    title: '일반 설정',
    description: '기본 앱 동작 방식을 설정합니다',
    icon: <SettingLineIcon />,
    items: ['언어 설정', '시간대 설정', '날짜 형식', '기본 화폐'],
    badge: null,
  },
  {
    id: 'notifications',
    title: '알림 설정',
    description: '이메일·푸시·Slack 채널 알림을 관리합니다',
    icon: <CircleInfoLineIcon />,
    items: ['이메일 알림', '푸시 알림', 'Slack 연동', '주간 요약'],
    badge: 4,
  },
  {
    id: 'new',
    title: '실험적 기능',
    description: '베타 기능을 미리 사용해보세요',
    icon: <CircleNewLineIcon />,
    items: ['AI 자동 완성', '실시간 협업', '오프라인 모드'],
    badge: null,
  },
]

function ArcoSettingGroupsDemo() {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set(['general']))

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 460, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {ARCO_SETTING_GROUPS.map((group) => {
        const isOpen = expanded.has(group.id)
        return (
          <div key={group.id} style={{ borderRadius: 10, border: `1.5px solid ${isOpen ? '#6366f1' : '#e2e8f0'}`, overflow: 'hidden', transition: 'border-color 0.15s' }}>
            <SectionTitle style={{ cursor: 'pointer' }} onClick={() => toggle(group.id)}>
              <SectionTitle.Title>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: isOpen ? '#6366f1' : '#64748b', display: 'flex', alignItems: 'center' }}>{group.icon}</span>
                  {group.title}
                  {group.badge !== null && (
                    <CounterBadge>{group.badge}</CounterBadge>
                  )}
                </span>
              </SectionTitle.Title>
              <SectionTitle.Description>{group.description}</SectionTitle.Description>
              <SectionTitle.Trailing>
                <span style={{ color: '#94a3b8', fontSize: 12, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>▶</span>
              </SectionTitle.Trailing>
            </SectionTitle>
            {isOpen && (
              <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Divider />
                {group.items.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                    <Typography textStyle="descriptionLarge" style={{ color: '#334155' }}>{item}</Typography>
                    <TextButton color="black" size="small">
                      <TextButton.Center>편집</TextButton.Center>
                    </TextButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const Arco_다단계_설정_그룹: Story = {
  name: 'Arco Design - 아코디언 설정 그룹 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Collapse + Descriptions 패턴. SectionTitle을 아코디언 헤더로 활용해 ' +
          '설정 항목을 그룹별로 접고 펼 수 있습니다. 배지로 변경 항목 수를 표시합니다.',
      },
    },
  },
  render: () => <ArcoSettingGroupsDemo />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 필터링 섹션 헤더
   Tailwind UI의 Application Shell — 리스트 위에 검색/필터 컨트롤을 배치하는 패턴
-------------------------------------------------------------------------- */
const FILTER_OPTIONS = ['전체', '진행 중', '완료', '보류'] as const
type FilterOption = typeof FILTER_OPTIONS[number]

function TailwindFilterSectionDemo() {
  const [activeFilter, setActiveFilter] = React.useState<FilterOption>('전체')
  const [searchValue, setSearchValue] = React.useState('')

  const items = [
    { name: '디자인 시스템 문서화', status: '진행 중', owner: 'HJ' },
    { name: 'API 성능 최적화', status: '완료', owner: 'SY' },
    { name: '모바일 앱 리팩터링', status: '진행 중', owner: 'JH' },
    { name: 'CI/CD 파이프라인 설정', status: '보류', owner: 'EA' },
    { name: '접근성 감사', status: '완료', owner: 'HJ' },
  ]

  const filtered = items.filter((item) => {
    const matchFilter = activeFilter === '전체' || item.status === activeFilter
    const matchSearch = searchValue === '' || item.name.includes(searchValue)
    return matchFilter && matchSearch
  })

  const statusColor: Record<string, string> = {
    '진행 중': '#6366f1',
    '완료': '#10b981',
    '보류': '#f59e0b',
  }

  return (
    <div style={{ width: 480 }}>
      <SectionTitle>
        <SectionTitle.Title>프로젝트 ({items.length})</SectionTitle.Title>
        <SectionTitle.Description>팀 프로젝트 현황을 확인하고 필터링하세요</SectionTitle.Description>
        <SectionTitle.Trailing>
          <LabelBadge color="benefit">
            <LabelBadge.Label>NEW</LabelBadge.Label>
          </LabelBadge>
        </SectionTitle.Trailing>
      </SectionTitle>
      <div style={{ display: 'flex', gap: 8, margin: '12px 0', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="프로젝트 검색..."
          style={{ flex: 1, minWidth: 160, padding: '6px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, color: '#1e293b', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              style={{
                padding: '5px 12px',
                borderRadius: 8,
                border: `1.5px solid ${activeFilter === opt ? '#6366f1' : '#e2e8f0'}`,
                background: activeFilter === opt ? '#eef2ff' : '#fff',
                color: activeFilter === opt ? '#6366f1' : '#64748b',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>검색 결과가 없습니다</div>
        )}
        {filtered.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[item.status] ?? '#94a3b8', flexShrink: 0 }} />
            <Typography textStyle="descriptionLarge" style={{ flex: 1, color: '#1e293b', fontWeight: 500 }}>{item.name}</Typography>
            <Typography textStyle="descriptionSmall" color="foregroundSecondary">{item.owner}</Typography>
            <Typography textStyle="descriptionSmall" style={{ color: statusColor[item.status] ?? '#94a3b8', fontWeight: 700 }}>{item.status}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Tailwind_필터링_섹션_헤더: Story = {
  name: 'Tailwind UI - 검색·필터 섹션 헤더 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Application Shell 패턴. SectionTitle 하단에 검색 입력 + 상태 필터 버튼을 결합합니다. ' +
          '실시간 필터링으로 리스트를 업데이트하는 실무 패턴입니다.',
      },
    },
  },
  render: () => <TailwindFilterSectionDemo />,
}
