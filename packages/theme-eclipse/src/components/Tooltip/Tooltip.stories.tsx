import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

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

/* --------------------------------------------------------------------------
   MUI 벤치마크: 비활성 버튼 설명 툴팁
   MUI Tooltip의 disabled button wrapper 패턴 — span으로 래핑하여 비활성 엘리먼트에 툴팁 적용
-------------------------------------------------------------------------- */
export const MUI_비활성_버튼_툴팁: Story = {
  name: 'MUI - 비활성 버튼 설명 툴팁',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Tooltip의 disabled element 지원 패턴. ' +
          '비활성 버튼은 hover 이벤트를 발생시키지 않으므로 span으로 래핑하여 툴팁을 표시합니다. ' +
          '권한 부족, 조건 미충족 상태를 사용자에게 명확히 설명하는 UX 패턴입니다.',
      },
    },
  },
  render: () => (
    <Tooltip.Provider delayDuration={200}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '60px 40px', fontFamily: 'system-ui, sans-serif', maxWidth: 420 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: -8 }}>권한 / 상태 안내 툴팁</div>
        {[
          { label: '배포하기', reason: 'CI 검사가 아직 완료되지 않았습니다. 모든 검사 통과 후 배포 가능합니다.', disabled: true },
          { label: '삭제하기', reason: '이 리소스를 삭제하려면 Admin 권한이 필요합니다.', disabled: true },
          { label: '내보내기', reason: '엑셀 파일로 내보냅니다. 최대 10,000행까지 지원합니다.', disabled: false },
        ].map(({ label, reason, disabled }) => (
          <Tooltip key={label}>
            <Tooltip.Trigger asChild>
              <span style={{ display: 'inline-block', cursor: disabled ? 'not-allowed' : 'default' }}>
                <button
                  disabled={disabled}
                  style={{
                    padding: '8px 18px', borderRadius: 8,
                    border: disabled ? '1px solid #e2e8f0' : '1px solid #6366f1',
                    background: disabled ? '#f8fafc' : '#6366f1',
                    color: disabled ? '#94a3b8' : '#fff',
                    fontSize: 13, fontWeight: 600,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    pointerEvents: 'none',
                  }}
                >
                  {label}
                </button>
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content side="right" style={{ maxWidth: 220 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '2px 0' }}>
                {disabled && (
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fbbf24' }}>
                    비활성 이유
                  </span>
                )}
                <Typography textStyle="descriptionSmall" style={{ lineHeight: 1.6 }} className="text-white">
                  {reason}
                </Typography>
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  ),
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 색상 선택기 스와치 툴팁
   Chakra UI ColorPicker 패턴 — 각 스와치 hover 시 색상명 표시
-------------------------------------------------------------------------- */
const CHAKRA_PALETTE = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Slate', hex: '#64748b' },
  { name: 'Zinc', hex: '#71717a' },
]

const ChakraColorSwatchRender = () => {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <Tooltip.Provider delayDuration={100}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '40px 32px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>테마 색상 선택</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {CHAKRA_PALETTE.map(({ name, hex }) => (
            <Tooltip key={name}>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => setSelected(hex)}
                  aria-label={name}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', background: hex,
                    border: selected === hex ? `3px solid ${hex}` : '3px solid transparent',
                    outline: selected === hex ? '2px solid #fff' : 'none',
                    outlineOffset: selected === hex ? 1 : 0,
                    cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                  }}
                />
              </Tooltip.Trigger>
              <Tooltip.Content side="top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: hex, display: 'inline-block', flexShrink: 0 }} />
                  <Typography textStyle="descriptionLarge" className="text-white" style={{ fontWeight: 700 }}>
                    {name}
                  </Typography>
                  <Typography textStyle="descriptionSmall" className="text-white" style={{ opacity: 0.6, fontFamily: 'monospace' }}>
                    {hex}
                  </Typography>
                </div>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
        {selected && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ width: 20, height: 20, borderRadius: 4, background: selected, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#475569' }}>
              선택된 색상: <strong style={{ fontFamily: 'monospace', color: '#1e293b' }}>{selected}</strong>
            </span>
          </div>
        )}
      </div>
    </Tooltip.Provider>
  )
}

export const Chakra_색상_스와치_툴팁: Story = {
  name: 'Chakra UI - 색상 선택기 스와치 툴팁',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI ColorPicker 패턴. 색상 스와치 위에 hover하면 색상명과 HEX 값을 툴팁으로 표시합니다. ' +
          '선택된 색상은 링 아웃라인으로 강조, 아래 영역에 선택 결과를 반영합니다.',
      },
    },
  },
  render: () => <ChakraColorSwatchRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 사용자 아바타 호버 카드 툴팁
   MUI Tooltip + Avatar 조합 — 사용자 정보 호버 카드 패턴
-------------------------------------------------------------------------- */
const MUI_MEMBERS = [
  { initials: 'AK', name: 'Alice Kim', role: 'Product Designer', color: '#6366f1', online: true },
  { initials: 'BL', name: 'Bob Lee', role: 'Frontend Engineer', color: '#10b981', online: false },
  { initials: 'CJ', name: 'Clara Jung', role: 'UX Researcher', color: '#f59e0b', online: true },
  { initials: 'DJ', name: 'Daniel Jo', role: 'Backend Engineer', color: '#ef4444', online: true },
]

export const MUI_아바타_호버카드_툴팁: Story = {
  name: 'MUI - 사용자 아바타 호버카드 툴팁',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Tooltip + Avatar 패턴. 아바타 hover 시 이름/역할/온라인 상태를 호버 카드로 표시합니다. ' +
          'delayDuration=300으로 의도치 않은 툴팁 노출을 방지합니다.',
      },
    },
  },
  render: () => (
    <Tooltip.Provider delayDuration={300}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '40px 32px', fontFamily: 'system-ui, sans-serif' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            팀 멤버
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {MUI_MEMBERS.map((m, i) => (
              <Tooltip key={m.initials}>
                <Tooltip.Trigger asChild>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: m.color, border: '2px solid #fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: 13, fontWeight: 700,
                      cursor: 'pointer', zIndex: MUI_MEMBERS.length - i,
                      marginLeft: i > 0 ? -10 : 0,
                      position: 'relative', boxShadow: '0 0 0 2px #fff',
                    }}
                  >
                    {m.initials}
                    {m.online && (
                      <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '2px solid #fff' }} />
                    )}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content side="top">
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '2px 0' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {m.initials}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Typography textStyle="descriptionLarge" className="text-white" style={{ fontWeight: 700 }}>
                        {m.name}
                      </Typography>
                      <Typography textStyle="descriptionSmall" className="text-white" style={{ opacity: 0.7 }}>
                        {m.role}
                      </Typography>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.online ? '#22c55e' : '#94a3b8', flexShrink: 0 }} />
                        <Typography textStyle="descriptionSmall" className="text-white" style={{ opacity: 0.6 }}>
                          {m.online ? '온라인' : '오프라인'}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Tooltip.Content>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  ),
}

// ============================================================
// Cycle 131 — shadcn/ui + Radix UI 벤치마크 반영
// ============================================================

// Raycast 커맨드 팔레트 스타일 액션 힌트 툴팁
const RAYCAST_ACTIONS: { Icon: React.FC<{ size?: number }>; label: string; shortcut: string; desc: string }[] = [
  { Icon: SearchIcon, label: '검색', shortcut: '⌘K', desc: '전역 검색 열기' },
  { Icon: StarLineIcon, label: '즐겨찾기', shortcut: '⌘D', desc: '현재 항목 즐겨찾기' },
  { Icon: NotificationLineIcon, label: '알림', shortcut: '⌘N', desc: '알림 패널 열기' },
  { Icon: SettingLineIcon, label: '설정', shortcut: '⌘,', desc: '환경 설정' },
]

export const Raycast_커맨드_팔레트_액션_힌트: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={300}>
      <div style={{
        background: '#1c1c1e', borderRadius: 12, padding: '8px',
        display: 'flex', gap: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {RAYCAST_ACTIONS.map(({ Icon, label, shortcut, desc }) => (
          <Tooltip key={label}>
            <Tooltip.Trigger asChild>
              <button
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  borderRadius: 8, padding: '8px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4, color: '#e5e5e7', minWidth: 56,
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <Icon size={18} />
                <span style={{ fontSize: 10, color: '#98989d' }}>{label}</span>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={6}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 120 }}>
                <Typography textStyle="descriptionLarge" className="text-white" style={{ fontWeight: 600 }}>
                  {desc}
                </Typography>
                <span style={{
                  display: 'inline-flex', alignSelf: 'flex-start',
                  background: 'rgba(255,255,255,0.15)', borderRadius: 4,
                  padding: '1px 6px', fontSize: 11, color: '#e5e5e7', fontFamily: 'monospace',
                }}>
                  {shortcut}
                </span>
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  ),
}

// Radix UI 제어 컴포넌트 패턴 — 외부에서 open 상태 제어
const RadixControlledTooltipRender = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const STEPS = [
    { label: '프로젝트 생성', done: true },
    { label: '팀원 초대', done: true },
    { label: '역할 설정', done: false },
    { label: '출시', done: false },
  ]
  return (
    <div style={{ padding: '40px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
        {STEPS.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip.Provider>
              <Tooltip open={openIndex === i} onOpenChange={(open) => setOpenIndex(open ? i : null)}>
                <Tooltip.Trigger asChild>
                  <button
                    style={{
                      width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
                      background: step.done ? '#0f172a' : openIndex === i ? '#f1f5f9' : '#e2e8f0',
                      color: step.done ? '#fff' : '#64748b',
                      fontWeight: 700, fontSize: 14,
                      boxShadow: openIndex === i ? '0 0 0 3px #3b82f6' : 'none',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {step.done ? '✓' : i + 1}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content side="top" sideOffset={8}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography textStyle="descriptionLarge" className="text-white" style={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                    <Typography textStyle="descriptionSmall" className="text-white" style={{ opacity: 0.7 }}>
                      {step.done ? '완료됨' : '진행 예정'}
                    </Typography>
                  </div>
                </Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 60, height: 2,
                background: i < STEPS.filter((s) => s.done).length - 1 ? '#0f172a' : '#e2e8f0',
                margin: '0 4px', transition: 'background 300ms ease',
              }} />
            )}
          </div>
        ))}
      </div>
      <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8', marginTop: 16, display: 'block', textAlign: 'center' }}>
        각 단계 클릭 시 툴팁 표시 (Radix 제어 패턴)
      </Typography>
    </div>
  )
}

export const Radix_제어_스텝퍼_툴팁: Story = {
  render: () => <RadixControlledTooltipRender />,
}

// shadcn/ui 스타일 — 데이터 테이블 컬럼 헤더 정보 툴팁
const TABLE_COLS: { key: string; label: string; info: string; align: 'left' | 'right' }[] = [
  { key: 'name', label: '프로젝트명', info: '배포된 Vercel 프로젝트 이름', align: 'left' },
  { key: 'status', label: '상태', info: '현재 빌드 및 배포 상태', align: 'left' },
  { key: 'p99', label: 'P99 응답 (ms)', info: '상위 1% 응답 시간. 낮을수록 성능 우수', align: 'right' },
  { key: 'errors', label: '에러율 (%)', info: '지난 24시간 기준 HTTP 5xx 비율', align: 'right' },
]
const TABLE_ROWS = [
  { name: 'orbit-ui', status: '정상', p99: 142, errors: 0.1 },
  { name: 'storybook', status: '빌드 중', p99: 210, errors: 0.3 },
  { name: 'api-proxy', status: '경고', p99: 891, errors: 2.4 },
]

export const Shadcn_테이블_컬럼_정보_툴팁: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={200}>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', minWidth: 480 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              {TABLE_COLS.map((col) => (
                <th key={col.key} style={{ padding: '10px 14px', textAlign: col.align, fontWeight: 600, color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start' }}>
                    {col.label}
                    <Tooltip>
                      <Tooltip.Trigger asChild>
                        <span style={{ cursor: 'pointer', color: '#94a3b8', display: 'inline-flex' }}>
                          <CircleInfoLineIcon size={13} />
                        </span>
                      </Tooltip.Trigger>
                      <Tooltip.Content side="top" sideOffset={4}>
                        <Typography textStyle="descriptionSmall" className="text-white">
                          {col.info}
                        </Typography>
                      </Tooltip.Content>
                    </Tooltip>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, i) => (
              <tr key={row.name} style={{ borderBottom: i < TABLE_ROWS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <td style={{ padding: '10px 14px', color: '#1e293b', fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                    background: row.status === '정상' ? '#dcfce7' : row.status === '빌드 중' ? '#fef9c3' : '#fee2e2',
                    color: row.status === '정상' ? '#166534' : row.status === '빌드 중' ? '#92400e' : '#991b1b',
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: row.p99 > 500 ? '#dc2626' : '#0f172a' }}>{row.p99}</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: row.errors > 1 ? '#dc2626' : '#0f172a' }}>{row.errors.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tooltip.Provider>
  ),
}

// ─── Cycle 154: MUI + Chakra UI ────────────────────────────────────────────

function MuiInfoTooltipRender() {
  const fields = [
    { label: '프로젝트 이름', hint: '영문, 숫자, 하이픈만 사용 가능합니다. 최대 32자.' },
    { label: '공개 범위', hint: '팀 공개: 팀원만 접근 / 전체 공개: 링크 보유자 누구나 접근' },
    { label: '기본 브랜치', hint: 'PR이 머지되는 기본 브랜치입니다. 일반적으로 main을 사용합니다.' },
  ]
  return (
    <div style={{ width: 340, fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b' }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>MUI 정보 툴팁 패턴</div>
      <Tooltip.Provider delayDuration={200}>
        {fields.map(field => (
          <div key={field.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#374151' }}>{field.label}</span>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: '#e0f2fe', cursor: 'pointer' }}>
                  <CircleInfoLineIcon size={12} style={{ color: '#0284c7' }} />
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content side="right" sideOffset={6}>
                <span style={{ fontSize: 11, maxWidth: 200, lineHeight: 1.5, display: 'block' }}>{field.hint}</span>
              </Tooltip.Content>
            </Tooltip>
          </div>
        ))}
      </Tooltip.Provider>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>{'MUI Tooltip placement="right" + info 아이콘 패턴'}</div>
    </div>
  )
}

export const MUI_정보_툴팁_시스템: Story = {
  name: 'MUI - 폼 필드 정보 툴팁 시스템',
  render: () => <MuiInfoTooltipRender />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'MUI Tooltip + InfoIcon 패턴. 폼 필드 옆에 정보 아이콘을 배치하고 우측(right)으로 툴팁을 표시합니다. ' +
          'MUI placement 옵션과 maxWidth 제한을 Radix 기반 Tooltip으로 재현합니다.',
      },
    },
  },
}

function ChakraFormHelpRender() {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const formFields = [
    { id: 'username', label: '사용자명', placeholder: 'orbit_user', tip: '3-20자, 영문/숫자/밑줄만 허용' },
    { id: 'email', label: '이메일', placeholder: 'user@example.com', tip: '인증 메일이 이 주소로 발송됩니다' },
    { id: 'password', label: '비밀번호', placeholder: '••••••••', tip: '최소 8자, 대소문자+숫자 포함 권장' },
  ]
  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b' }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Chakra UI 폼 도움말 툴팁</div>
      <Tooltip.Provider delayDuration={300}>
        {formFields.map(field => (
          <div key={field.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{field.label}</label>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <span style={{ cursor: 'help', color: '#94a3b8' }}>
                    <CircleInfoLineIcon size={12} />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content sideOffset={4}>
                  <span style={{ fontSize: 11 }}>{field.tip}</span>
                </Tooltip.Content>
              </Tooltip>
            </div>
            <input
              type={field.id === 'password' ? 'password' : 'text'}
              placeholder={field.placeholder}
              onFocus={() => setFocusedField(field.id)}
              onBlur={() => setFocusedField(null)}
              style={{
                width: '100%', padding: '7px 10px', fontSize: 13, boxSizing: 'border-box',
                border: `1.5px solid ${focusedField === field.id ? '#0284c7' : '#e2e8f0'}`,
                borderRadius: 6, outline: 'none', transition: 'border-color 0.15s',
              }}
            />
          </div>
        ))}
      </Tooltip.Provider>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Chakra UI FormHelperText + Tooltip 결합 패턴</div>
    </div>
  )
}

export const Chakra_폼_도움말_툴팁: Story = {
  name: 'Chakra UI - 폼 도움말 툴팁 (포커스 강조)',
  render: () => <ChakraFormHelpRender />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Chakra UI FormHelperText + Tooltip 패턴. 라벨 옆 물음표 아이콘에 커서를 올리면 입력 규칙이 툴팁으로 표시됩니다. ' +
          '필드 포커스 시 테두리 색상 전환으로 활성 상태를 강조합니다.',
      },
    },
  },
}

function MuiChakraDashboardTooltipRender() {
  const stats = [
    { label: '배포 수', value: '52', icon: <StarLineIcon size={14} />, tip: '이번 달 총 배포 횟수. 무료 플랜 한도: 100회/일' },
    { label: '빌드 시간', value: '34s', icon: <SettingLineIcon size={14} />, tip: '평균 Storybook 빌드 소요 시간' },
    { label: '알림', value: '3', icon: <NotificationLineIcon size={14} />, tip: '미확인 시스템 알림 3건' },
    { label: '검색 횟수', value: '128', icon: <SearchIcon size={14} />, tip: '이번 주 컴포넌트 검색 쿼리 수' },
  ]
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b' }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>MUI + Chakra 대시보드 툴팁</div>
      <Tooltip.Provider delayDuration={150}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {stats.map(stat => (
            <Tooltip key={stat.label}>
              <Tooltip.Trigger asChild>
                <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', cursor: 'default', transition: 'background 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: '#6b7280' }}>
                    {stat.icon}
                    <span style={{ fontSize: 11, fontWeight: 500 }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{stat.value}</div>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={6}>
                <span style={{ fontSize: 11, maxWidth: 180, display: 'block' }}>{stat.tip}</span>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </Tooltip.Provider>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>MUI + Chakra — 카드 호버 툴팁 대시보드 패턴</div>
    </div>
  )
}

export const MUI_Chakra_대시보드_카드_툴팁: Story = {
  name: 'MUI + Chakra UI - 대시보드 통계 카드 툴팁',
  render: () => <MuiChakraDashboardTooltipRender />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'MUI + Chakra UI 복합 패턴. 대시보드 통계 카드 전체에 툴팁을 적용해 수치의 의미와 단위를 보충 설명합니다. ' +
          'MUI Tooltip followCursor 없이 카드 하단 중앙에 고정 표시하는 패턴을 재현합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Cycle 180 — shadcn/ui + Apple HIG
   Benchmark:
   1. shadcn/ui: 툴팁 내부에 아이콘 + 제목 + 설명 구조적 콘텐츠 배치
   2. Apple HIG: 기능 설명 중심 툴팁 — 단순 레이블이 아닌 "무엇을 하는지" 설명
   3. shadcn + Apple: 키보드 단축키 조합을 툴팁으로 표시하는 패턴
-------------------------------------------------------------------------- */

function ShadcnRichContentTooltipRender() {
  const actions = [
    {
      icon: <StarLineIcon size={18} />,
      label: '즐겨찾기',
      title: '즐겨찾기에 추가',
      desc: '이 컴포넌트를 즐겨찾기 목록에 추가합니다. 언제든지 빠르게 접근할 수 있습니다.',
    },
    {
      icon: <SearchIcon size={18} />,
      label: '검색',
      title: '전체 검색',
      desc: '컴포넌트명, props, 스토리 이름으로 전체 스토리북을 검색합니다.',
    },
    {
      icon: <SettingLineIcon size={18} />,
      label: '설정',
      title: '스토리북 설정',
      desc: '패널 레이아웃, 배경색, 뷰포트 등 스토리북 환경을 커스텀합니다.',
    },
    {
      icon: <NotificationLineIcon size={18} />,
      label: '알림',
      title: '업데이트 알림',
      desc: '새 컴포넌트 배포, 버전 업데이트, 브레이킹 체인지를 알려드립니다.',
    },
  ]

  return (
    <div style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip.Provider>
        <div style={{ display: 'flex', gap: 12 }}>
          {actions.map((action) => (
            <Tooltip key={action.label}>
              <Tooltip.Trigger asChild>
                <SolidIconButton color="black" size="medium" aria-label={action.label}>
                  {action.icon}
                </SolidIconButton>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={8} style={{ maxWidth: 220 }}>
                <div style={{ padding: '2px 0' }}>
                  <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4, color: '#fff' }}>{action.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{action.desc}</div>
                </div>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </Tooltip.Provider>
    </div>
  )
}

export const Shadcn_구조화된_콘텐츠_툴팁: Story = {
  name: 'shadcn/ui — 구조화된 콘텐츠 툴팁 (제목 + 설명 2단 구조)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'shadcn/ui 툴팁의 rich content 패턴. Tooltip.Content 내부에 제목(bold)+설명(muted) 2단 구조 배치. Apple HIG "기능을 설명하는 툴팁" 원칙에 따라 레이블만 보여주는 대신 구체적인 동작 설명 포함.',
      },
    },
  },
  render: () => <ShadcnRichContentTooltipRender />,
}

function AppleContextualHintTooltipRender() {
  const [progress, setProgress] = useState(65)

  const fields = [
    {
      label: '프로젝트명',
      value: 'Orbit UI',
      hint: '영문, 숫자, 하이픈만 허용됩니다. 공백은 사용할 수 없습니다.',
      side: 'right' as const,
    },
    {
      label: '공개 범위',
      value: '팀 내부',
      hint: '팀 내부: 워크스페이스 멤버만 접근 가능. 공개: 누구든 열람 가능.',
      side: 'right' as const,
    },
    {
      label: '빌드 캐시',
      value: '활성화',
      hint: '이전 빌드 아티팩트를 재사용해 빌드 시간을 단축합니다. 캐시 무효화는 수동으로 실행하세요.',
      side: 'right' as const,
    },
  ]

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 16 }}>프로젝트 설정</div>
        <Tooltip.Provider>
          {fields.map((field) => (
            <div key={field.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: '#374151' }}>{field.label}</span>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                      <CircleInfoLineIcon size={14} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side={field.side} sideOffset={6} style={{ maxWidth: 200 }}>
                    <span style={{ fontSize: 11, lineHeight: 1.5 }}>{field.hint}</span>
                  </Tooltip.Content>
                </Tooltip>
              </div>
              <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 500 }}>{field.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#374151' }}>빌드 진행률</span>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9ca3af' }}>
                    <CircleInfoLineIcon size={14} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content sideOffset={6} style={{ maxWidth: 200 }}>
                  <span style={{ fontSize: 11 }}>현재 빌드 사이클의 완료율입니다. 100%에 도달하면 배포가 시작됩니다.</span>
                </Tooltip.Content>
              </Tooltip>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f3f4f6', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#6366f1', borderRadius: 3, transition: 'width 0.3s' }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', flexShrink: 0 }}>{progress}%</span>
            </div>
            <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} style={{ width: '100%', marginTop: 6 }} />
          </div>
        </Tooltip.Provider>
      </div>
    </div>
  )
}

export const Apple_HIG_컨텍스트_힌트_툴팁: Story = {
  name: 'Apple HIG — 컨텍스트 힌트 툴팁 (설정 필드 정보 아이콘)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Apple HIG 컨텍스트 힌트 원칙 적용. 설정 폼 각 필드 옆 정보(i) 아이콘에 툴팁으로 제약 조건/동작 설명을 제공. 단순 레이블 대신 "왜 이 설정이 있는지"를 설명하는 Apple 스타일 UX.',
      },
    },
  },
  render: () => <AppleContextualHintTooltipRender />,
}

function ShadcnAppleShortcutTooltipRender() {
  const toolbarItems = [
    { icon: <StarLineIcon size={16} />, label: '즐겨찾기', keys: ['⌘', 'D'] },
    { icon: <SearchIcon size={16} />, label: '검색', keys: ['⌘', 'K'] },
    { icon: <SettingLineIcon size={16} />, label: '설정', keys: ['⌘', ','] },
    { icon: <NotificationLineIcon size={16} />, label: '알림', keys: ['⌘', 'N'] },
    { icon: <CircleInfoLineIcon size={16} />, label: '도움말', keys: ['?'] },
  ]

  return (
    <div style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip.Provider>
        <div style={{ display: 'flex', gap: 4, padding: '6px 8px', background: '#111827', borderRadius: 10 }}>
          {toolbarItems.map((item) => (
            <Tooltip key={item.label}>
              <Tooltip.Trigger asChild>
                <button style={{ width: 34, height: 34, borderRadius: 7, background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={10}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#fff' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {item.keys.map((key) => (
                      <span key={key} style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.15)', color: '#e5e7eb', fontFamily: 'monospace', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </Tooltip.Provider>
    </div>
  )
}

export const Shadcn_Apple_단축키_툴팁: Story = {
  name: 'shadcn/ui + Apple HIG — 키보드 단축키 툴팁 (다크 툴바)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'shadcn/ui 툴팁 + Apple HIG 단축키 힌트 패턴. 다크 툴바 아이콘에 hover 시 기능명 + kbd 스타일 단축키 조합 표시. Notion/Linear/Figma의 툴바 단축키 힌트 UX를 Orbit UI Tooltip으로 구현.',
      },
    },
  },
  render: () => <ShadcnAppleShortcutTooltipRender />,
}
