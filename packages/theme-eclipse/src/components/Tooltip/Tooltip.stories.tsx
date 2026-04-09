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
