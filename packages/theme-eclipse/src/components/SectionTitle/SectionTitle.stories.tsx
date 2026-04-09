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
