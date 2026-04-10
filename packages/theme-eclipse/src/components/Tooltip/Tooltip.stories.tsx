import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Tooltip } from './Tooltip'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'
import { SolidIconButton } from '../SolidIconButton'

import {
  CircleInfoLineIcon,
  SettingLineIcon,
  NotificationLineIcon,
  StarLineIcon,
  SearchIcon,
} from '@heejun-com/icons'

const meta = {
  title: 'eclipse/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>마우스 오버</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography textStyle="descriptionLarge" className="text-white">
              도움말 메시지입니다.
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  ),
}

// 다양한 위치 데모 (Chakra UI 접근성 강화 패턴)
export const 위치변형: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '16px',
        padding: '80px 60px',
        alignItems: 'center',
        justifyItems: 'center',
      }}>
        {/* Top row */}
        <div />
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Top</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              위쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>
        <div />

        {/* Middle row */}
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Left</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="left">
            <Typography textStyle="descriptionLarge" className="text-white">
              왼쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <div style={{
          width: '80px', height: '80px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '12px', fontWeight: 700,
        }}>
          Center
        </div>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Right</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <Typography textStyle="descriptionLarge" className="text-white">
              오른쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        {/* Bottom row */}
        <div />
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="small">
              <Button.Center>Bottom</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom">
            <Typography textStyle="descriptionLarge" className="text-white">
              아래쪽 툴팁
            </Typography>
          </Tooltip.Content>
        </Tooltip>
        <div />
      </div>
    </Tooltip.Provider>
  ),
}

// 아이콘 버튼 + 툴팁 조합 (접근성 강화)
export const 아이콘버튼조합: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{
        display: 'flex', gap: '12px', padding: '60px 40px',
        alignItems: 'center',
      }}>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="정보 보기"
            >
              <CircleInfoLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              정보 보기
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="설정"
            >
              <SettingLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              설정
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="알림"
            >
              <NotificationLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              알림 (3)
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="즐겨찾기"
            >
              <StarLineIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              즐겨찾기에 추가
            </Typography>
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <SolidIconButton
              size="medium"
              color="black"
              aria-label="검색"
            >
              <SearchIcon size={20} />
            </SolidIconButton>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <Typography textStyle="descriptionLarge" className="text-white">
              검색 (Cmd+K)
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </Tooltip.Provider>
  ),
}

// 딜레이 설정 데모
const DelayDemoRender = () => {
  const [activeDelay, setActiveDelay] = useState(300)

  const delayOptions = [
    { label: '즉시 (0ms)', value: 0 },
    { label: '기본 (300ms)', value: 300 },
    { label: '느림 (700ms)', value: 700 },
    { label: '매우 느림 (1000ms)', value: 1000 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '40px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {delayOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveDelay(opt.value)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: `1.5px solid ${activeDelay === opt.value ? '#6366f1' : '#e2e8f0'}`,
              background: activeDelay === opt.value ? 'rgba(99,102,241,0.08)' : '#fff',
              color: activeDelay === opt.value ? '#6366f1' : '#64748b',
              fontSize: '12px',
              fontWeight: activeDelay === opt.value ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <Tooltip.Provider delayDuration={activeDelay}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {(['primary', 'gray', 'black'] as const).map((color) => (
            <Tooltip key={color}>
              <Tooltip.Trigger asChild>
                <Button color={color} size="medium">
                  <Button.Center>{color}</Button.Center>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Typography textStyle="descriptionLarge" className="text-white">
                  딜레이: {activeDelay}ms
                </Typography>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </Tooltip.Provider>
      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
        버튼 위에 마우스를 올려 딜레이를 체험해보세요
      </p>
    </div>
  )
}

export const 딜레이설정: Story = {
  render: () => <DelayDemoRender />,
}

/* --------------------------------------------------------------------------
   Vercel 스타일: 키보드 단축키 표시 툴팁
   Vercel/Linear가 많이 쓰는 "액션 + 단축키" 조합 툴팁 패턴
-------------------------------------------------------------------------- */
const KbdKey = ({ keys }: { keys: string[] }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
    {keys.map((key, i) => (
      <kbd
        key={i}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          minWidth: '18px', height: '18px', padding: '0 4px',
          borderRadius: '4px', background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          fontSize: '11px', fontWeight: '600', fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1,
        }}
      >
        {key}
      </kbd>
    ))}
  </span>
)

export const 키보드_단축키_툴팁: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Tooltip.Provider>
      <div style={{ display: 'flex', gap: '8px', padding: '80px 40px', alignItems: 'center' }}>
        {[
          { label: '검색', keys: ['⌘', 'K'], icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )},
          { label: '새 파일', keys: ['⌘', 'N'], icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )},
          { label: '저장', keys: ['⌘', 'S'], icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 21 17 13 7 13 7 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 3 7 8 15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )},
          { label: '되돌리기', keys: ['⌘', 'Z'], icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 14L4 9l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 9h10.5a5.5 5.5 0 010 11H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )},
          { label: '다시 실행', keys: ['⌘', '⇧', 'Z'], icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 14l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 9H9.5a5.5 5.5 0 000 11H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )},
        ].map(({ label, keys, icon }) => (
          <Tooltip key={label}>
            <Tooltip.Trigger asChild>
              <button
                aria-label={label}
                style={{
                  width: '40px', height: '40px', borderRadius: '8px',
                  border: '1px solid #e2e8f0', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748b', cursor: 'pointer',
                }}
              >
                {icon}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography textStyle="descriptionLarge" className="text-white">
                  {label}
                </Typography>
                <KbdKey keys={keys} />
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  ),
}

/* --------------------------------------------------------------------------
   shadcn/ui 스타일: 풍부한 컨텐츠 툴팁
   텍스트 외에도 아바타, 상태 배지, 링크 등을 포함한 Rich Tooltip 패턴
-------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Vercel Design: 배포 파이프라인 상태 툴팁
   Vercel의 배포 상태를 아이콘 위에 hover하면 상세 정보를 보여주는 패턴
   tabular-nums 패턴으로 숫자 정렬, monospace 폰트로 기술 정보 표시
-------------------------------------------------------------------------- */
const deployments = [
  { env: 'Production', status: 'ready', duration: '47s', time: '2분 전', url: 'orbit-ui.vercel.app', icon: '●', color: '#22c55e' },
  { env: 'Preview', status: 'building', duration: '...', time: '진행중', url: 'orbit-ui-preview.vercel.app', icon: '◌', color: '#f59e0b' },
  { env: 'Development', status: 'error', duration: '12s', time: '1시간 전', url: 'localhost:6007', icon: '✕', color: '#ef4444' },
]

export const Vercel_배포_파이프라인_툴팁: Story = {
  name: 'Vercel Design — 배포 파이프라인 상태 툴팁',
  parameters: { layout: 'centered' },
  render: () => (
    <Tooltip.Provider>
      <div style={{ display: 'flex', gap: '8px', padding: '80px 40px', alignItems: 'center', fontFamily: 'system-ui, sans-serif' }}>
        {deployments.map((dep) => (
          <Tooltip key={dep.env}>
            <Tooltip.Trigger asChild>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px', borderRadius: '8px',
                border: '1px solid #e2e8f0', background: '#fff',
                cursor: 'pointer', transition: 'border-color 0.15s',
              }}>
                <span style={{ color: dep.color, fontSize: '14px', lineHeight: 1 }}>{dep.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{dep.env}</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom">
              <div style={{ padding: '2px 0', minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ color: dep.color, fontSize: '12px' }}>{dep.icon}</span>
                  <Typography textStyle="descriptionLarge" style={{ fontWeight: 700 }} className="text-white">
                    {dep.env}
                  </Typography>
                </div>
                {[
                  { label: '상태', value: dep.status },
                  { label: '빌드 시간', value: dep.duration },
                  { label: '배포 일시', value: dep.time },
                  { label: 'URL', value: dep.url },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '3px' }}>
                    <Typography textStyle="descriptionSmall" style={{ opacity: 0.6 }} className="text-white">{label}</Typography>
                    <Typography textStyle="descriptionSmall" style={{ opacity: 0.9, fontFamily: label === 'URL' ? 'monospace' : 'inherit', fontVariantNumeric: 'tabular-nums' }} className="text-white">{value}</Typography>
                  </div>
                ))}
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  ),
}

/* --------------------------------------------------------------------------
   Ant Design: 폼 필드 도움말 툴팁
   Ant Design의 label + 물음표 아이콘 + 툴팁 패턴
   각 입력 필드 옆에 도움말 아이콘을 두고 hover 시 설명 표시
-------------------------------------------------------------------------- */
const FormHelpTooltipRender = () => {
  const fields = [
    {
      label: '사용자명',
      placeholder: 'username',
      help: '영문, 숫자, 밑줄(_)만 허용됩니다. 3~20자 이내로 입력하세요.',
    },
    {
      label: 'API 키',
      placeholder: 'sk-...',
      help: 'Orbit UI 대시보드에서 발급받은 API 키를 입력하세요. 타인에게 공유하지 마세요.',
    },
    {
      label: '웹훅 URL',
      placeholder: 'https://your-app.com/webhook',
      help: '이벤트 발생 시 POST 요청을 전송할 URL입니다. HTTPS만 지원됩니다.',
    },
  ]

  return (
    <Tooltip.Provider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px', fontFamily: 'system-ui, sans-serif', maxWidth: '360px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>API 연동 설정</div>
        {fields.map(({ label, placeholder, help }) => (
          <div key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{label}</label>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <button
                    style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      border: '1.5px solid #94a3b8', background: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', color: '#94a3b8', cursor: 'pointer', fontWeight: 700,
                    }}
                    aria-label={`${label} 도움말`}
                  >
                    ?
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content side="right" style={{ maxWidth: '220px' }}>
                  <Typography textStyle="descriptionSmall" style={{ lineHeight: 1.6 }} className="text-white">
                    {help}
                  </Typography>
                </Tooltip.Content>
              </Tooltip>
            </div>
            <input
              type="text"
              placeholder={placeholder}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: '8px',
                border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none',
                boxSizing: 'border-box', color: '#1e293b', background: '#fafafa',
              }}
            />
          </div>
        ))}
      </div>
    </Tooltip.Provider>
  )
}

export const Ant_폼_도움말_툴팁: Story = {
  name: 'Ant Design — 폼 필드 도움말 툴팁',
  render: () => <FormHelpTooltipRender />,
}

/* --------------------------------------------------------------------------
   Ant Design: 데이터 테이블 잘린 텍스트 툴팁
   Ant Design Table의 ellipsis + tooltip 패턴
   셀 텍스트가 잘릴 때 hover 시 전체 내용 표시
-------------------------------------------------------------------------- */
const tableData = [
  { id: 'ORB-301', title: '디자인 토큰 시스템 Reference → Semantic → Component 3단계 구조 마이그레이션 완료', assignee: '김민준', status: 'Done', priority: 'Urgent' },
  { id: 'ORB-298', title: 'Storybook 8.6 autodocs 설정 및 컴포넌트 JSDoc 일괄 업데이트', assignee: '이서연', status: 'In Progress', priority: 'High' },
  { id: 'ORB-287', title: '다크모드 테마 토큰 정의 및 vanilla-extract 스타일 적용', assignee: '박지호', status: 'Backlog', priority: 'Medium' },
  { id: 'ORB-271', title: 'TypeScript strict 모드 활성화 및 기존 타입 오류 수정', assignee: '최준혁', status: 'Done', priority: 'Low' },
]

const statusColors: Record<string, { color: string; bg: string }> = {
  Done: { color: '#10b981', bg: '#f0fdf4' },
  'In Progress': { color: '#6366f1', bg: '#eff6ff' },
  Backlog: { color: '#94a3b8', bg: '#f8fafc' },
}

export const Ant_테이블_잘린텍스트_툴팁: Story = {
  name: 'Ant Design — 데이터 테이블 잘린 텍스트 툴팁',
  render: () => (
    <Tooltip.Provider>
      <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '620px', padding: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>이슈 목록</div>
        <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px 90px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {['ID', '제목', '담당자', '상태'].map((h) => (
              <div key={h} style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</div>
            ))}
          </div>
          {tableData.map((row, i) => (
            <div
              key={row.id}
              style={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px 90px', borderBottom: i < tableData.length - 1 ? '1px solid #f1f5f9' : 'none', background: '#fff' }}
            >
              <div style={{ padding: '10px 12px', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>{row.id}</div>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <div style={{ padding: '10px 12px', fontSize: '12px', color: '#1e293b', display: 'flex', alignItems: 'center', cursor: 'default' }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.title}
                    </span>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content side="top" style={{ maxWidth: '300px' }}>
                  <Typography textStyle="descriptionSmall" style={{ lineHeight: 1.6 }} className="text-white">
                    {row.title}
                  </Typography>
                </Tooltip.Content>
              </Tooltip>
              <div style={{ padding: '10px 12px', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>{row.assignee}</div>
              <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontSize: '10px', fontWeight: 700,
                  color: (statusColors[row.status] ?? { color: '#94a3b8' }).color,
                  background: (statusColors[row.status] ?? { bg: '#f8fafc' }).bg,
                  padding: '2px 8px', borderRadius: '6px',
                }}>
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8', textAlign: 'right' }}>
          Ant Design Table ellipsis + tooltip 패턴
        </div>
      </div>
    </Tooltip.Provider>
  ),
}

export const 리치_컨텐츠_툴팁: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Tooltip.Provider>
      <div style={{ display: 'flex', gap: '24px', padding: '100px 60px', alignItems: 'center' }}>
        {/* 사용자 정보 툴팁 */}
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#6366f1', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff', fontWeight: '700',
              fontSize: '14px', cursor: 'pointer',
            }}>KJ</div>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '2px 0' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#6366f1', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff', fontWeight: '700',
                fontSize: '12px', flexShrink: 0,
              }}>KJ</div>
              <div>
                <Typography textStyle="descriptionLarge" style={{ display: 'block', fontWeight: '700' }} className="text-white">
                  Kim Jihye
                </Typography>
                <Typography textStyle="descriptionSmall" style={{ display: 'block', opacity: 0.7 }} className="text-white">
                  Senior Designer · 온라인
                </Typography>
                <Typography textStyle="descriptionSmall" style={{ display: 'block', opacity: 0.6, marginTop: '2px' }} className="text-white">
                  jihye@orbit-ui.com
                </Typography>
              </div>
            </div>
          </Tooltip.Content>
        </Tooltip>

        {/* 상태 정보 툴팁 */}
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '20px',
              border: '1px solid #e2e8f0', background: '#f8fafc',
              cursor: 'pointer', fontSize: '13px', color: '#22c55e', fontWeight: '600',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
              배포 완료
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom">
            <div style={{ padding: '2px 0' }}>
              <Typography textStyle="descriptionLarge" style={{ display: 'block', fontWeight: '700', marginBottom: '6px' }} className="text-white">
                배포 상태 상세
              </Typography>
              {[
                { label: '빌드 시간', value: '47초' },
                { label: '배포 URL', value: 'orbit-ui.vercel.app' },
                { label: '배포 일시', value: '2분 전' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '3px' }}>
                  <Typography textStyle="descriptionSmall" style={{ opacity: 0.6 }} className="text-white">{label}</Typography>
                  <Typography textStyle="descriptionSmall" style={{ opacity: 0.9 }} className="text-white">{value}</Typography>
                </div>
              ))}
            </div>
          </Tooltip.Content>
        </Tooltip>

        {/* 진행 상태 툴팁 */}
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div style={{
              width: '120px', height: '8px', borderRadius: '100px',
              background: '#e2e8f0', cursor: 'pointer', overflow: 'hidden',
            }}>
              <div style={{
                width: '68%', height: '100%', borderRadius: '100px',
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              }} />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            <div style={{ textAlign: 'center', padding: '2px 4px' }}>
              <Typography textStyle="descriptionLarge" style={{ display: 'block', fontWeight: '700' }} className="text-white">
                완료율 68%
              </Typography>
              <Typography textStyle="descriptionSmall" style={{ opacity: 0.7 }} className="text-white">
                34 / 50 태스크 완료
              </Typography>
            </div>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </Tooltip.Provider>
  ),
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 데이터 시각화 레이블 툴팁 패턴
   shadcn Chart Tooltip 패턴 — 차트 바/원소 hover 시 데이터 레이블 표시
-------------------------------------------------------------------------- */
const CHART_DATA = [
  { month: '1월', value: 42, prev: 38 },
  { month: '2월', value: 68, prev: 51 },
  { month: '3월', value: 55, prev: 62 },
  { month: '4월', value: 87, prev: 71 },
  { month: '5월', value: 73, prev: 68 },
  { month: '6월', value: 91, prev: 79 },
]

export const Shadcn_데이터_시각화_레이블: Story = {
  name: 'shadcn/ui - 데이터 시각화 차트 레이블 툴팁 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn Chart Tooltip 패턴. 막대 차트의 각 바에 Tooltip을 연결, ' +
          '현재 값과 전월 대비를 리치 컨텐츠로 표시합니다.',
      },
    },
  },
  render: () => (
    <Tooltip.Provider delayDuration={100}>
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>월별 활성 사용자</div>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: '#6366f1', display: 'inline-block' }} />이번 달
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: '#e2e8f0', display: 'inline-block' }} />전월
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140, paddingBottom: 0 }}>
          {CHART_DATA.map((d) => {
            const maxVal = Math.max(...CHART_DATA.map((x) => Math.max(x.value, x.prev)))
            const diff = d.value - d.prev
            return (
              <div key={d.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', cursor: 'pointer' }}>
                      <div style={{
                        flex: 1, borderRadius: '4px 4px 0 0',
                        height: `${(d.prev / maxVal) * 100}px`,
                        background: '#e2e8f0',
                        transition: 'background 0.15s',
                      }} />
                      <div style={{
                        flex: 1, borderRadius: '4px 4px 0 0',
                        height: `${(d.value / maxVal) * 100}px`,
                        background: '#6366f1',
                        transition: 'background 0.15s',
                      }} />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="top">
                    <div style={{ padding: '4px 2px', minWidth: 100 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 12 }}>{d.month}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                        <span style={{ opacity: 0.7 }}>이번 달</span>
                        <span style={{ fontWeight: 700 }}>{d.value}명</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                        <span style={{ opacity: 0.7 }}>전월</span>
                        <span>{d.prev}명</span>
                      </div>
                      <div style={{
                        fontSize: 11, fontWeight: 700,
                        color: diff >= 0 ? '#10b981' : '#ef4444',
                        paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.2)',
                      }}>
                        {diff >= 0 ? '+' : ''}{diff}명 ({diff >= 0 ? '+' : ''}{Math.round((diff / d.prev) * 100)}%)
                      </div>
                    </div>
                  </Tooltip.Content>
                </Tooltip>
                <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{d.month}</span>
              </div>
            )
          })}
        </div>
      </div>
    </Tooltip.Provider>
  ),
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 컴팩트 액션 힌트 툴팁 패턴
   Vercel Dashboard 아이콘 버튼 툴팁 — 단축키 포함 컴팩트 힌트
-------------------------------------------------------------------------- */
const VERCEL_ACTIONS: { key: string; label: string; shortcut: string; Icon: React.FC<{ size?: number }> }[] = [
  { key: 'search', label: '검색', shortcut: '⌘K', Icon: SearchIcon },
  { key: 'notif', label: '알림', shortcut: '⌘N', Icon: NotificationLineIcon },
  { key: 'star', label: '즐겨찾기', shortcut: '⌘S', Icon: StarLineIcon },
  { key: 'settings', label: '설정', shortcut: '⌘,', Icon: SettingLineIcon },
  { key: 'info', label: '도움말', shortcut: '⌘/', Icon: CircleInfoLineIcon },
]

export const Vercel_컴팩트_액션_힌트: Story = {
  name: 'Vercel - 컴팩트 아이콘 버튼 액션 힌트 툴팁 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Dashboard 툴팁 패턴. 아이콘 버튼 위 hover 시 레이블 + 단축키를 함께 표시. ' +
          'delayDuration=300, 컴팩트 레이아웃으로 밀도 있는 네비게이션 표현.',
      },
    },
  },
  render: () => (
    <Tooltip.Provider delayDuration={300}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        {/* Dark nav bar */}
        <div style={{
          display: 'flex', gap: 4, padding: '8px 12px', borderRadius: 12,
          background: '#0f172a', border: '1px solid #1e293b',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          {VERCEL_ACTIONS.map(({ key, label, shortcut, Icon }) => (
            <Tooltip key={key}>
              <Tooltip.Trigger asChild>
                <SolidIconButton
                  color="black"
                  size="small"
                  style={{
                    background: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                  }}
                >
                  <Icon size={16} />
                </SolidIconButton>
              </Tooltip.Trigger>
              <Tooltip.Content side="bottom">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 4px' }}>
                  <span style={{ fontWeight: 600 }}>{label}</span>
                  <kbd style={{
                    padding: '1px 5px', borderRadius: 4,
                    background: 'rgba(255,255,255,0.15)',
                    fontSize: 10, fontFamily: 'monospace',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    {shortcut}
                  </kbd>
                </div>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>

        {/* Light version */}
        <div style={{
          display: 'flex', gap: 4, padding: '6px 10px', borderRadius: 10,
          background: '#fff', border: '1px solid #e2e8f0',
        }}>
          {VERCEL_ACTIONS.slice(0, 3).map(({ key, label, shortcut, Icon }) => (
            <Tooltip key={key}>
              <Tooltip.Trigger asChild>
                <SolidIconButton color="black" size="small">
                  <Icon size={15} />
                </SolidIconButton>
              </Tooltip.Trigger>
              <Tooltip.Content side="top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 4px' }}>
                  <span style={{ fontWeight: 600 }}>{label}</span>
                  <kbd style={{
                    padding: '1px 5px', borderRadius: 4,
                    background: 'rgba(255,255,255,0.15)',
                    fontSize: 10, fontFamily: 'monospace',
                  }}>
                    {shortcut}
                  </kbd>
                </div>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </div>
    </Tooltip.Provider>
  ),
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 단축키 레퍼런스 카드 툴팁 패턴
   Linear 단축키 힌트 — 복수 단축키를 카드 형태로 그룹화
-------------------------------------------------------------------------- */
type ShortcutGroup = {
  group: string
  items: { action: string; keys: string[] }[]
}

const LINEAR_SHORTCUTS: ShortcutGroup[] = [
  {
    group: '이슈',
    items: [
      { action: '새 이슈 생성', keys: ['C'] },
      { action: '이슈 완료', keys: ['⌘', 'Enter'] },
      { action: '담당자 배정', keys: ['A'] },
    ],
  },
  {
    group: '뷰',
    items: [
      { action: '목록 뷰', keys: ['L'] },
      { action: '보드 뷰', keys: ['B'] },
      { action: '타임라인', keys: ['T'] },
    ],
  },
]

export const Linear_단축키_레퍼런스_툴팁: Story = {
  name: 'Linear - 단축키 레퍼런스 카드 툴팁 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 단축키 힌트 패턴. 기능 설명 버튼에 hover 시 관련 단축키 그룹을 카드로 표시. ' +
          '여러 단축키 항목을 그룹화하여 컨텍스트 기반 단축키 레퍼런스를 제공합니다.',
      },
    },
  },
  render: () => (
    <Tooltip.Provider delayDuration={200}>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        {LINEAR_SHORTCUTS.map((group) => (
          <Tooltip key={group.group}>
            <Tooltip.Trigger asChild>
              <Button color="gray" size="medium" style={{ minWidth: 120 }}>
                {group.group} 단축키
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', minWidth: 200 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.08em', opacity: 0.6, marginBottom: 10,
                }}>
                  {group.group} 단축키
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {group.items.map((item) => (
                    <div
                      key={item.action}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
                    >
                      <span style={{ fontSize: 12, opacity: 0.9 }}>{item.action}</span>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {item.keys.map((key) => (
                          <kbd
                            key={key}
                            style={{
                              padding: '2px 6px', borderRadius: 4, fontSize: 10,
                              background: 'rgba(255,255,255,0.15)',
                              border: '1px solid rgba(255,255,255,0.25)',
                              fontFamily: 'monospace', fontWeight: 600,
                            }}
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  ),
}
