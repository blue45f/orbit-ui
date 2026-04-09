import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Toaster, toast } from './Toast'
import { FilledButton as Button } from '../SolidButton'

const meta = {
  title: 'eclipse/Feedback/Toast',
  component: Toaster,
  tags: ['autodocs'],
  args: {
    position: 'bottom-center',
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <div
      style={{
        padding: '2rem',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Toaster {...args} />
      <Button color="primary" size="medium" onClick={() => toast('기본 토스트입니다.')}>
        <Button.Center>기본 토스트 띄우기</Button.Center>
      </Button>
      <div style={{ height: 16 }} />
      <Button
        color="black"
        size="medium"
        onClick={() =>
          toast('성공적으로 저장되었습니다.', {
            description: '일요일 오후 2시 예약이 확정되었습니다.',
            action: {
              label: '취소',
              onClick: () => undefined,
            },
          })
        }
      >
        <Button.Center>액션 토스트 띄우기</Button.Center>
      </Button>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   타입별 인터랙티브 스위처
   Mantine Notification 패턴: 4가지 알림 타입을 한 화면에서 전환
-------------------------------------------------------------------------- */
const TypeSwitcherRender = (args: React.ComponentProps<typeof Toaster>) => {
  const types: Array<{ label: string; color: string; fn: () => void }> = [
    {
      label: 'Success',
      color: '#10b981',
      fn: () =>
        toast.success('작업이 성공적으로 완료되었습니다.', {
          description: '변경사항이 자동으로 저장됩니다.',
        }),
    },
    {
      label: 'Error',
      color: '#ef4444',
      fn: () =>
        toast.error('오류가 발생했습니다.', {
          description: '잠시 후 다시 시도해 주세요.',
        }),
    },
    {
      label: 'Warning',
      color: '#f59e0b',
      fn: () =>
        toast.warning('주의가 필요합니다.', {
          description: '이 작업은 되돌릴 수 없습니다.',
        }),
    },
    {
      label: 'Info',
      color: '#6366f1',
      fn: () =>
        toast.info('새로운 업데이트가 있습니다.', {
          description: '버전 2.3.0이 릴리즈되었습니다.',
        }),
    },
  ]

  return (
    <div style={{ padding: '2rem', height: '320px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Toaster {...args} />
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
        타입별 알림 스위처
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {types.map(({ label, color, fn }) => (
          <button
            key={label}
            onClick={fn}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1.5px solid ${color}`,
              background: `${color}18`,
              color,
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export const 타입별스위처: Story = {
  render: (args) => <TypeSwitcherRender {...args} />,
}

/* --------------------------------------------------------------------------
   알림 큐 데모
   Mantine Notification 패턴: 여러 알림을 순서대로 쌓고 제거
-------------------------------------------------------------------------- */
const NotificationQueueRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [count, setCount] = useState(0)

  const addNotification = () => {
    const next = count + 1
    setCount(next)
    toast(`알림 #${next} 추가됨`, {
      description: `총 ${next}개의 알림이 표시되었습니다.`,
      duration: 8000,
    })
  }

  const dismissAll = () => {
    toast.dismiss()
    setCount(0)
  }

  return (
    <div style={{ padding: '2rem', height: '360px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Toaster {...args} expand richColors />
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
        알림 큐 데모 — 여러 알림을 차례로 추가하거나 한 번에 제거합니다
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button color="primary" size="medium" onClick={addNotification}>
          <Button.Center>알림 추가</Button.Center>
        </Button>
        <Button color="black" size="medium" onClick={dismissAll}>
          <Button.Center>전체 닫기</Button.Center>
        </Button>
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
        현재 누적 횟수: {count}
      </div>
    </div>
  )
}

export const 알림큐: Story = {
  render: (args) => <NotificationQueueRender {...args} />,
}

/* --------------------------------------------------------------------------
   폼 제출 플로우
   실무 조합: 폼 제출 -> 로딩 -> 성공/실패 알림 표시
-------------------------------------------------------------------------- */
const FormSubmitFlowRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error('입력 오류', { description: '이름과 이메일을 모두 입력해 주세요.' })
      return
    }
    if (!email.includes('@')) {
      toast.warning('이메일 형식 오류', { description: '올바른 이메일 주소를 입력해 주세요.' })
      return
    }

    setIsLoading(true)
    const id = toast.loading('제출 중...')

    setTimeout(() => {
      setIsLoading(false)
      toast.success('제출 완료!', {
        id,
        description: `${name}님의 정보가 저장되었습니다.`,
        action: { label: '확인', onClick: () => undefined },
      })
      setName('')
      setEmail('')
    }, 1800)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '360px' }}>
      <Toaster {...args} />
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
        폼 제출 플로우 데모
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1.5px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1.5px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <Button color="primary" size="medium" disabled={isLoading}>
          <Button.Center>{isLoading ? '처리 중...' : '제출하기'}</Button.Center>
        </Button>
      </form>
    </div>
  )
}

export const 폼제출플로우: Story = {
  render: (args) => <FormSubmitFlowRender {...args} />,
}

/* --------------------------------------------------------------------------
   Apple HIG 스타일: 시스템 알림 배너 시뮬레이션
   Apple HIG의 Banner Notification 패턴:
   - 상단 슬라이드인 애니메이션
   - 앱 아이콘 + 제목 + 서브텍스트 구조
   - 자동 dismiss (4초)
-------------------------------------------------------------------------- */
const AppleHIGBannerRender = (args: React.ComponentProps<typeof Toaster>) => {
  const bannerTypes = [
    {
      label: '캘린더 알림',
      fn: () =>
        toast('오후 3시 팀 미팅', {
          description: '30분 후 시작됩니다. 지금 참여하시겠습니까?',
          action: { label: '참여', onClick: () => undefined },
          duration: 5000,
        }),
    },
    {
      label: '메시지 알림',
      fn: () =>
        toast.info('Park Minjun', {
          description: '피그마 링크 공유드립니다. 확인해주세요.',
          duration: 5000,
        }),
    },
    {
      label: '시스템 경고',
      fn: () =>
        toast.warning('배터리 부족', {
          description: '배터리 잔량이 20% 미만입니다. 충전기를 연결하세요.',
          duration: 5000,
        }),
    },
    {
      label: '업데이트 완료',
      fn: () =>
        toast.success('Orbit UI 2.3.0 설치 완료', {
          description: '새로운 버전이 설치되었습니다. 지금 재시작하세요.',
          action: { label: '재시작', onClick: () => undefined },
          duration: 6000,
        }),
    },
  ]

  return (
    <div style={{ padding: '2rem', height: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toaster {...args} position="top-center" richColors />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
        Apple HIG — 시스템 알림 배너
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
        iOS/macOS 스타일 알림 배너를 시뮬레이션합니다. 각 버튼을 눌러 상단 슬라이드인 알림을 확인하세요.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {bannerTypes.map(({ label, fn }) => (
          <button
            key={label}
            onClick={fn}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              background: '#f8fafc',
              color: '#1e293b',
              fontWeight: 500,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export const Apple_HIG_시스템_알림_배너: Story = {
  render: (args) => <AppleHIGBannerRender {...args} />,
}

/* --------------------------------------------------------------------------
   Raycast 스타일: 커맨드 실행 결과 알림
   Raycast의 Toast 패턴:
   - 간결한 단일 라인 메시지
   - 빠른 연속 실행 알림
   - 진행 중 / 완료 상태 전환 패턴
-------------------------------------------------------------------------- */
const RaycastCommandToastRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [running, setRunning] = useState(false)

  const runCommand = (name: string, cmd: string) => {
    if (running) return
    setRunning(true)
    const id = toast.loading(`${name} 실행 중...`)
    setTimeout(() => {
      toast.success(`${name} 완료`, {
        id,
        description: `${cmd} — 0 errors, 0 warnings`,
        duration: 4000,
      })
      setRunning(false)
    }, 1600)
  }

  const commands = [
    { name: 'Typecheck', cmd: 'pnpm typecheck' },
    { name: 'Lint Fix', cmd: 'pnpm lint:fix' },
    { name: 'Test', cmd: 'pnpm test --run' },
    { name: 'Build', cmd: 'pnpm build' },
  ]

  return (
    <div style={{ padding: '2rem', height: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toaster {...args} position="bottom-right" />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
        Raycast — 커맨드 실행 결과 알림
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
        명령어를 실행하면 진행 중 상태에서 완료로 전환되는 Toast를 확인합니다.
      </div>
      <div style={{
        borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden',
        background: '#0f172a',
      }}>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
            <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
          ))}
          <span style={{ fontSize: '11px', color: '#475569', marginLeft: '6px', fontFamily: 'monospace' }}>orbit-ui — zsh</span>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {commands.map(({ name, cmd }) => (
            <div
              key={name}
              onClick={() => runCommand(name, cmd)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: running ? '#0f172a' : 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                cursor: running ? 'not-allowed' : 'pointer',
                opacity: running ? 0.5 : 1,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '12px', color: '#6366f1', fontFamily: 'monospace' }}>$</span>
              <span style={{ fontSize: '12px', color: '#e2e8f0', fontFamily: 'monospace', flex: 1 }}>{cmd}</span>
              <span style={{ fontSize: '10px', color: '#475569' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Raycast_커맨드_실행_알림: Story = {
  render: (args) => <RaycastCommandToastRender {...args} />,
}
