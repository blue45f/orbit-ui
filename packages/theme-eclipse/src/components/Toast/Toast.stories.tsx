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

/* --------------------------------------------------------------------------
   MUI 벤치마크: Snackbar 위치 데모
   MUI Snackbar anchorOrigin 패턴 — 6가지 위치를 UI로 선택해 확인
-------------------------------------------------------------------------- */
type ToasterPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

const POSITIONS: ToasterPosition[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
]

const SnackbarPositionRender = () => {
  const [pos, setPos] = React.useState<ToasterPosition>('bottom-center')

  return (
    <div style={{ padding: '2rem', height: '380px', fontFamily: 'system-ui, sans-serif' }}>
      <Toaster key={pos} position={pos} />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
        MUI Snackbar — anchorOrigin 위치 선택
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
        위치를 선택한 후 알림 띄우기 버튼을 눌러 해당 위치에 Toast가 나타나는 것을 확인합니다.
      </div>

      <div style={{
        position: 'relative',
        width: '300px',
        height: '160px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        background: '#f8fafc',
        marginBottom: '16px',
      }}>
        {POSITIONS.map((p) => {
          const [v, h] = p.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right']
          const style: React.CSSProperties = {
            position: 'absolute',
            [v]: 10,
            ...(h === 'left' ? { left: 10 } : h === 'right' ? { right: 10 } : { left: '50%', transform: 'translateX(-50%)' }),
          }
          return (
            <button
              key={p}
              onClick={() => setPos(p)}
              style={{
                ...style,
                padding: '5px 10px',
                borderRadius: '6px',
                border: `1.5px solid ${pos === p ? '#6366f1' : '#d1d5db'}`,
                background: pos === p ? '#6366f1' : '#fff',
                color: pos === p ? '#fff' : '#64748b',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {p}
            </button>
          )
        })}
      </div>

      <Button
        color="primary"
        size="medium"
        onClick={() => toast.info(`위치: ${pos}`, { description: 'MUI anchorOrigin 패턴' })}
      >
        <Button.Center>알림 띄우기</Button.Center>
      </Button>
    </div>
  )
}

export const MUI_Snackbar_위치_데모: Story = {
  render: () => <SnackbarPositionRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 실행취소 패턴 (Snackbar UNDO)
   MUI의 대표적인 Snackbar 패턴 — 삭제 후 UNDO 액션으로 복구
-------------------------------------------------------------------------- */
type ListItem = { id: number; text: string }

const UndoPatternRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [items, setItems] = React.useState<ListItem[]>([
    { id: 1, text: 'Orbit UI 컴포넌트 리뷰' },
    { id: 2, text: 'Storybook 스토리 작성' },
    { id: 3, text: '디자인 토큰 문서화' },
    { id: 4, text: 'TypeScript 타입 개선' },
  ])

  const deleteItem = (item: ListItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id))
    toast(`"${item.text}" 삭제됨`, {
      action: {
        label: '실행취소',
        onClick: () => setItems((prev) => [...prev, item].sort((a, b) => a.id - b.id)),
      },
      duration: 5000,
    })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '380px' }}>
      <Toaster {...args} position="bottom-center" />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
        MUI Snackbar UNDO 패턴
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
        항목을 삭제하면 실행취소 버튼이 포함된 Toast가 5초간 표시됩니다.
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
          모든 항목이 삭제되었습니다.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#fff',
              }}
            >
              <div style={{ flex: 1, fontSize: '13px', color: '#374151' }}>{item.text}</div>
              <button
                onClick={() => deleteItem(item)}
                style={{
                  padding: '4px 10px', borderRadius: '6px',
                  border: '1px solid #fecaca', background: '#fff5f5',
                  color: '#ef4444', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const MUI_실행취소_패턴: Story = {
  render: (args) => <UndoPatternRender {...args} />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: Alert 스타일 토스트
   MUI Alert severity 패턴 — error/warning/info/success variant를 Toast에 적용
   각 severity별 색상 팔레트와 아이콘을 Orbit UI Toast로 구현합니다.
-------------------------------------------------------------------------- */
type AlertSeverity = 'error' | 'warning' | 'info' | 'success'

const ALERT_CONFIGS: Record<AlertSeverity, { label: string; desc: string; icon: string; fn: (msg: string, desc: string) => void }> = {
  error: { label: 'Error', desc: '네트워크 연결이 끊어졌습니다. 재시도해 주세요.', icon: '✕', fn: (m, d) => toast.error(m, { description: d }) },
  warning: { label: 'Warning', desc: '세션이 5분 후 만료됩니다. 저장하세요.', icon: '!', fn: (m, d) => toast.warning(m, { description: d }) },
  info: { label: 'Info', desc: '새 버전 v2.5.0이 출시되었습니다.', icon: 'i', fn: (m, d) => toast.info(m, { description: d }) },
  success: { label: 'Success', desc: '변경사항이 저장되었습니다.', icon: '✓', fn: (m, d) => toast.success(m, { description: d }) },
}

const AlertStyleRender = (args: React.ComponentProps<typeof Toaster>) => (
  <div style={{ padding: '2rem', height: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Toaster {...args} position="top-right" richColors />
    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>MUI Alert severity 패턴</div>
    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
      MUI Alert의 4가지 severity(error/warning/info/success)를 Toast로 구현합니다.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      {(Object.entries(ALERT_CONFIGS) as [AlertSeverity, typeof ALERT_CONFIGS[AlertSeverity]][]).map(([severity, cfg]) => {
        const colors: Record<AlertSeverity, { border: string; bg: string; text: string }> = {
          error: { border: '#fecaca', bg: '#fff5f5', text: '#ef4444' },
          warning: { border: '#fed7aa', bg: '#fffbeb', text: '#f59e0b' },
          info: { border: '#c7d2fe', bg: '#eef2ff', text: '#6366f1' },
          success: { border: '#bbf7d0', bg: '#f0fdf4', text: '#10b981' },
        }
        const c = colors[severity]
        return (
          <button
            key={severity}
            onClick={() => cfg.fn(cfg.label, cfg.desc)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 14px', borderRadius: '10px',
              border: `1.5px solid ${c.border}`, background: c.bg,
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: c.text, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#fff', flexShrink: 0,
            }}>
              {cfg.icon}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: c.text }}>{cfg.label}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>클릭하여 Toast 확인</div>
            </div>
          </button>
        )
      })}
    </div>
  </div>
)

export const MUI_Alert_스타일_토스트: Story = {
  render: (args) => <AlertStyleRender {...args} />,
}

/* --------------------------------------------------------------------------
   Cycle 67: Mantine + Arco Design 벤치마크
-------------------------------------------------------------------------- */

/* Mantine — 로딩 후 성공 전환 알림
   Mantine의 notifications.update() 패턴. 로딩 상태 알림을 비동기 완료 후
   성공/실패로 업데이트하는 UX. 비동기 작업 피드백의 가장 자연스러운 패턴.
-------------------------------------------------------------------------- */
const MantineLoadingSuccessRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [loading, setLoading] = useState(false)

  const runAsync = (outcome: 'success' | 'error') => {
    if (loading) return
    setLoading(true)
    toast.loading('파일 업로드 중...', { id: 'upload', description: '잠시만 기다려 주세요.' })
    setTimeout(() => {
      setLoading(false)
      if (outcome === 'success') {
        toast.success('업로드 완료', { id: 'upload', description: '파일이 성공적으로 저장되었습니다.' })
      } else {
        toast.error('업로드 실패', { id: 'upload', description: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.' })
      }
    }, 2000)
  }

  return (
    <div style={{ padding: '2rem', height: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toaster {...args} position="top-right" />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Mantine — 로딩 후 성공/실패 전환</div>
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', lineHeight: 1.6 }}>
        비동기 작업 시작 시 loading Toast를 표시하고, 완료 후 동일 id로 성공/실패로 교체합니다.
        Mantine의 notifications.update() 패턴을 Toast의 id 재사용으로 구현합니다.
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => runAsync('success')}
          disabled={loading}
          style={{
            padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            background: loading ? '#f1f5f9' : '#0f172a', color: loading ? '#94a3b8' : '#fff',
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
          }}
        >
          {loading ? '업로드 중...' : '성공 시뮬레이션'}
        </button>
        <button
          onClick={() => runAsync('error')}
          disabled={loading}
          style={{
            padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            background: loading ? '#f1f5f9' : '#fef2f2', color: loading ? '#94a3b8' : '#dc2626',
            border: `1.5px solid ${loading ? '#e2e8f0' : '#fecaca'}`, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
          }}
        >
          실패 시뮬레이션
        </button>
      </div>
    </div>
  )
}

export const Mantine_로딩_성공_전환_알림: Story = {
  name: 'Mantine — 로딩 후 성공/실패 전환 알림',
  parameters: {
    docs: {
      description: {
        story: 'Mantine notifications.update() 패턴. 비동기 작업 시작 시 loading Toast를 표시하고 완료 후 동일 id로 성공/실패로 교체. 업로드, API 호출 등 비동기 작업 피드백에 최적.',
      },
    },
  },
  render: (args) => <MantineLoadingSuccessRender {...args} />,
}

/* Mantine — 알림 큐 관리
   Mantine의 notifications 큐 패턴. 여러 알림이 순차적으로 쌓이고
   자동으로 사라지는 스택 패턴. 최대 3개 동시 표시.
-------------------------------------------------------------------------- */
const QUEUE_MESSAGES = [
  { title: '새 댓글', desc: 'Alex가 PR #142에 댓글을 남겼습니다.', type: 'info' as const },
  { title: '빌드 완료', desc: 'main 브랜치 빌드가 성공했습니다.', type: 'success' as const },
  { title: '보안 경고', desc: '알 수 없는 IP에서 로그인 시도가 감지됐습니다.', type: 'warning' as const },
  { title: '배포 실패', desc: 'production 환경 배포 중 오류가 발생했습니다.', type: 'error' as const },
  { title: '구독 만료 예정', desc: '7일 후 구독이 만료됩니다. 갱신해 주세요.', type: 'info' as const },
]

const MantineQueueRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [count, setCount] = useState(0)

  const pushNotification = () => {
    const msg = QUEUE_MESSAGES[count % QUEUE_MESSAGES.length]
    const fn = {
      info: toast,
      success: toast.success,
      warning: toast.warning,
      error: toast.error,
    }[msg.type]
    fn(msg.title, { description: msg.desc, duration: 4000 })
    setCount((c) => c + 1)
  }

  const pushAll = () => {
    QUEUE_MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        const fn = {
          info: toast,
          success: toast.success,
          warning: toast.warning,
          error: toast.error,
        }[msg.type]
        fn(msg.title, { description: msg.desc, duration: 5000 })
      }, i * 300)
    })
    setCount(QUEUE_MESSAGES.length)
  }

  return (
    <div style={{ padding: '2rem', height: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toaster {...args} position="bottom-right" richColors />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Mantine — 알림 큐 관리</div>
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', lineHeight: 1.6 }}>
        Mantine의 notifications 큐처럼 여러 알림이 순차적으로 쌓입니다. 우측 하단에서 스택으로 표시됩니다.
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={pushNotification}
          style={{ padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          알림 추가 ({count % QUEUE_MESSAGES.length + 1}번째)
        </button>
        <button
          onClick={pushAll}
          style={{ padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          5개 동시 발송
        </button>
        <button
          onClick={() => toast.dismiss()}
          style={{ padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', cursor: 'pointer' }}
        >
          모두 닫기
        </button>
      </div>
      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 'auto' }}>
        실시간 알림 큐 — 각 알림은 4초 후 자동 닫힘
      </div>
    </div>
  )
}

export const Mantine_알림_큐_관리: Story = {
  name: 'Mantine — 알림 큐 관리',
  parameters: {
    docs: {
      description: {
        story: 'Mantine notifications 큐 패턴. 5가지 알림 타입(info/success/warning/error)을 순차 발송하거나 동시에 5개 쌓기. 실시간 이벤트 알림 시스템 데모.',
      },
    },
  },
  render: (args) => <MantineQueueRender {...args} />,
}

/* Arco Design — 배치 작업 진행 알림
   Arco Design의 진행률 표시 알림 패턴. 파일 다운로드, 데이터 내보내기 등
   장시간 작업의 진행률을 Toast로 실시간 업데이트.
-------------------------------------------------------------------------- */
const ArcoBatchRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)

  const startExport = () => {
    if (running) return
    setRunning(true)
    setProgress(0)
    toast('데이터 내보내기 시작', { id: 'export', description: '총 1,247개 레코드를 처리합니다.' })

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 8
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setProgress(100)
        setRunning(false)
        toast.success('내보내기 완료', { id: 'export', description: '1,247개 레코드가 CSV로 저장됐습니다.' })
      } else {
        setProgress(current)
        toast(`내보내는 중... ${current}%`, {
          id: 'export',
          description: `${Math.round(1247 * current / 100)}개 처리됨`,
        })
      }
    }, 400)
  }

  return (
    <div style={{ padding: '2rem', height: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toaster {...args} position="top-center" />
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Arco Design — 배치 작업 진행 알림</div>
      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, marginBottom: '8px' }}>
        Arco Design의 Message.loading() 패턴을 응용. 내보내기/변환 등 장시간 작업의 진행률을 동일 id Toast로 실시간 갱신합니다.
      </div>

      {/* 진행률 시각화 */}
      <div style={{ padding: '16px 20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>CSV 내보내기</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: progress === 100 ? '#16a34a' : '#6366f1' }}>
            {progress}%
          </span>
        </div>
        <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: progress === 100 ? '#22c55e' : '#6366f1',
            borderRadius: '3px', transition: 'width 0.3s ease, background 0.5s',
          }} />
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
          {progress === 0 ? '대기 중' : progress === 100 ? '완료됨' : `${Math.round(1247 * progress / 100)}개 / 1,247개 처리됨`}
        </div>
      </div>

      <button
        onClick={startExport}
        disabled={running}
        style={{
          padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
          background: running ? '#f1f5f9' : '#0f172a',
          color: running ? '#94a3b8' : '#fff',
          border: 'none', cursor: running ? 'not-allowed' : 'pointer', alignSelf: 'flex-start',
          transition: 'all 0.2s',
        }}
      >
        {running ? '처리 중...' : progress === 100 ? '다시 내보내기' : 'CSV 내보내기 시작'}
      </button>
    </div>
  )
}

export const Arco_배치_작업_진행_알림: Story = {
  name: 'Arco Design — 배치 작업 진행 알림',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design Message.loading 패턴. 데이터 내보내기 등 장시간 작업의 진행률을 동일 id Toast로 실시간 갱신. 진행률 바와 처리 건수를 함께 표시.',
      },
    },
  },
  render: (args) => <ArcoBatchRender {...args} />,
}

export const Linear_이슈_상태_변경_알림: Story = {
  name: 'Linear - 이슈 상태 변경 Toast 패턴',
  render: (args) => {
    const showStatusChange = () => {
      toast.success('ENG-101 상태 변경됨', {
        description: 'Backlog → In Progress',
        action: {
          label: '실행 취소',
          onClick: () => toast.info('변경이 취소되었습니다'),
        },
        duration: 4000,
      })
    }

    const showIssueCreate = () => {
      toast('새 이슈 생성됨', {
        description: 'ENG-142: 다크모드 색상 토큰 최종 검토',
        action: {
          label: '이슈 열기',
          onClick: () => toast.info('이슈 페이지로 이동합니다'),
        },
      })
    }

    const showIssueClose = () => {
      toast.success('이슈 완료 처리됨', {
        description: 'ENG-99: 접근성 키보드 탐색 개선 완료',
        duration: 3000,
      })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Toaster {...args} />
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>Linear 이슈 Toast 패턴</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button color="black" size="small" onClick={showStatusChange}>
            <Button.Center>상태 변경</Button.Center>
          </Button>
          <Button color="black" size="small" onClick={showIssueCreate}>
            <Button.Center>이슈 생성</Button.Center>
          </Button>
          <Button color="black" size="small" onClick={showIssueClose}>
            <Button.Center>이슈 완료</Button.Center>
          </Button>
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>Linear의 이슈 액션 Toast — 실행 취소 액션 버튼 포함</div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Linear 이슈 상태 변경 Toast 패턴. 상태 변경/이슈 생성/완료 처리 시 action 버튼(실행 취소/이슈 열기)을 포함한 Toast를 표시합니다. Linear 특유의 간결한 피드백 + 즉시 실행 취소 UX를 구현합니다.',
      },
    },
  },
}

const ArcoAsyncToastRender = (args: React.ComponentProps<typeof Toaster>) => {
  const [running, setRunning] = useState(false)

  const simulateImport = async () => {
    setRunning(true)
    const id = toast.loading('파일 임포트 중...')
    await new Promise<void>(res => setTimeout(res, 1500))
    toast.success('임포트 완료', {
      id,
      description: '총 1,248건의 레코드가 추가되었습니다',
      action: {
        label: '결과 보기',
        onClick: () => toast.info('임포트 결과 페이지로 이동'),
      },
    })
    setRunning(false)
  }

  const simulateError = async () => {
    setRunning(true)
    const id = toast.loading('데이터 동기화 중...')
    await new Promise<void>(res => setTimeout(res, 1500))
    toast.error('동기화 실패', {
      id,
      description: 'API 연결 시간이 초과되었습니다 (timeout: 30s)',
      action: {
        label: '재시도',
        onClick: () => { void simulateError() },
      },
    })
    setRunning(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>Arco Design 비동기 작업 알림</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button color="black" size="small" onClick={() => { void simulateImport() }} disabled={running}>
          <Button.Center>임포트 시뮬레이션</Button.Center>
        </Button>
        <Button color="black" size="small" onClick={() => { void simulateError() }} disabled={running}>
          <Button.Center>에러 시뮬레이션</Button.Center>
        </Button>
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>loading → success/error 전환 + 동일 id Toast 업데이트</div>
    </div>
  )
}

export const Arco_작업_결과_알림_패턴: Story = {
  name: 'Arco Design - 비동기 작업 결과 알림 패턴',
  render: (args) => <ArcoAsyncToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Arco Design Message 패턴. 비동기 작업(임포트/동기화)의 loading 상태를 먼저 표시하고 완료 시 동일 Toast id를 success/error로 전환합니다. 재시도 액션 버튼으로 오류 복구 흐름을 지원합니다.',
      },
    },
  },
}

export const Linear_커밋_배포_알림: Story = {
  name: 'Linear + Vercel - 커밋 배포 완료 알림 패턴',
  render: (args) => {
    const deployStages = [
      { label: '빌드 시작', type: 'info' as const },
      { label: '빌드 완료', type: 'success' as const },
      { label: '배포 시작', type: 'info' as const },
      { label: '배포 완료', type: 'success' as const },
    ]

    const runDeployPipeline = async () => {
      for (const stage of deployStages) {
        await new Promise(res => setTimeout(res, 800))
        if (stage.type === 'success') {
          toast.success(stage.label, {
            description: stage.label.includes('배포') ? 'orbit-ui.vercel.app' : '0 errors · 2 warnings',
          })
        } else {
          toast(stage.label, {
            description: stage.label.includes('빌드') ? 'pnpm build:storybook' : 'vercel deploy --scope blue45fs-projects',
          })
        }
      }
    }

    const showMerge = () => {
      toast.success('PR #148 머지됨', {
        description: 'feat(stories): Cycle 99 스토리 추가 by hjunkim',
        action: {
          label: 'PR 보기',
          onClick: () => toast.info('GitHub PR 페이지로 이동'),
        },
        duration: 5000,
      })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Toaster {...args} />
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>커밋 + 배포 파이프라인 알림</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button color="black" size="small" onClick={runDeployPipeline}>
            <Button.Center>배포 파이프라인 시뮬레이션</Button.Center>
          </Button>
          <Button color="black" size="small" onClick={showMerge}>
            <Button.Center>PR 머지 알림</Button.Center>
          </Button>
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>순차적 Toast 시퀀스 — 배포 단계별 피드백</div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Linear + Vercel 배포 파이프라인 Toast 패턴. 빌드 시작 → 빌드 완료 → 배포 시작 → 배포 완료의 4단계 순차적 Toast 시퀀스로 CI/CD 진행 상황을 실시간 알립니다. PR 머지 알림에는 action 버튼을 포함합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 상태 기반 알림 패턴
   Chakra useToast — 커스텀 상태 전환(대기/진행/완료/오류) Toast 시퀀스
-------------------------------------------------------------------------- */
function ChakraStatusToastRender(args: React.ComponentProps<typeof Toaster>) {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'done'>('idle')

  const runFlow = async () => {
    setStatus('loading')
    toast.loading('파일 업로드 중...', { id: 'upload', description: '최대 5MB까지 업로드 가능합니다.' })
    await new Promise(r => setTimeout(r, 1800))
    toast.success('업로드 완료', {
      id: 'upload',
      description: 'profile-photo.png 저장됨',
      action: { label: '보기', onClick: () => toast.info('파일 뷰어 열림') },
    })
    setStatus('done')
  }

  const showError = () => {
    toast.error('업로드 실패', {
      description: '파일 크기가 5MB를 초과합니다.',
      action: { label: '재시도', onClick: () => runFlow() },
      duration: 6000,
    })
    setStatus('idle')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>파일 업로드 상태 Toast</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button color="black" size="small" onClick={runFlow} disabled={status === 'loading'}>
          <Button.Center>업로드 시작</Button.Center>
        </Button>
        <Button color="gray" size="small" onClick={showError}>
          <Button.Center>오류 시뮬레이션</Button.Center>
        </Button>
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>loading → success id 재사용 + error action 재시도 버튼</div>
    </div>
  )
}

export const Chakra_파일_업로드_상태_알림: Story = {
  name: 'Chakra UI - 파일 업로드 상태 알림 패턴',
  render: (args) => <ChakraStatusToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI useToast 패턴. 파일 업로드의 loading → success 상태 전환을 동일 Toast id로 관리합니다. ' +
          '오류 발생 시 action 버튼으로 재시도 흐름을 제공합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 글로벌 알림 위치 제어 패턴
   Arco Message maxCount & position — 다중 알림 위치별 표시 데모
-------------------------------------------------------------------------- */
function ArcoPositionToastRender(args: React.ComponentProps<typeof Toaster>) {
  const positions = [
    { pos: 'top-left' as const, label: '좌상단' },
    { pos: 'top-center' as const, label: '상단 중앙' },
    { pos: 'top-right' as const, label: '우상단' },
    { pos: 'bottom-left' as const, label: '좌하단' },
    { pos: 'bottom-center' as const, label: '하단 중앙' },
    { pos: 'bottom-right' as const, label: '우하단' },
  ] as const

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>알림 위치 선택</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {positions.map(({ pos, label }) => (
          <Button
            key={pos}
            color="gray"
            size="small"
            onClick={() => toast.info(`${label} 알림`, { description: pos, position: pos })}
          >
            <Button.Center>{label}</Button.Center>
          </Button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>Arco Design Message position 옵션 대응 — 6방향 위치 선택</div>
    </div>
  )
}

export const Arco_알림_위치_제어_패턴: Story = {
  name: 'Arco Design - 알림 위치 제어 패턴',
  render: (args) => <ArcoPositionToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Message position 옵션 패턴. 6방향(top-left/center/right, bottom-left/center/right)에서 알림을 표시합니다. ' +
          'Sonner의 position 파라미터를 활용해 Arco의 글로벌 알림 위치 제어를 재현합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Chakra + Arco 복합: 다단계 폼 제출 알림 워크플로우
   폼 유효성 검사 → 저장 중 → 완료/오류 다단계 Toast 체인
-------------------------------------------------------------------------- */
function ChakraArcoFormToastRender(args: React.ComponentProps<typeof Toaster>) {
  const [step, setStep] = React.useState<'idle' | 'validating' | 'saving' | 'done'>('idle')

  const submitForm = async () => {
    setStep('validating')
    toast.loading('입력값 검증 중...', { id: 'form', duration: Infinity })
    await new Promise(r => setTimeout(r, 1000))

    toast.loading('서버에 저장 중...', { id: 'form', duration: Infinity })
    setStep('saving')
    await new Promise(r => setTimeout(r, 1500))

    toast.success('프로필이 저장되었습니다', {
      id: 'form',
      description: '변경사항이 즉시 반영됩니다.',
      action: { label: '확인', onClick: () => toast.dismiss() },
      duration: 4000,
    })
    setStep('done')
  }

  const reset = () => {
    toast.dismiss()
    setStep('idle')
  }

  const stepLabels: Record<typeof step, string> = {
    idle: '대기',
    validating: '검증 중',
    saving: '저장 중',
    done: '완료',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>다단계 폼 저장 워크플로우</div>
      <div style={{ fontSize: 11, color: '#6b7280' }}>현재 단계: <strong>{stepLabels[step]}</strong></div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button color="black" size="small" onClick={submitForm} disabled={step !== 'idle' && step !== 'done'}>
          <Button.Center>폼 제출</Button.Center>
        </Button>
        <Button color="gray" size="small" onClick={reset}>
          <Button.Center>초기화</Button.Center>
        </Button>
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>검증 → 저장 → 완료 3단계 Toast 체인 (동일 id 재사용)</div>
    </div>
  )
}

export const Chakra_Arco_다단계_폼_제출_알림: Story = {
  name: 'Chakra UI + Arco Design - 다단계 폼 제출 알림 워크플로우',
  render: (args) => <ChakraArcoFormToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI + Arco Design 복합 패턴. 폼 제출 시 유효성 검증 → 서버 저장 → 완료의 3단계 Toast 체인을 동일 id로 관리합니다. ' +
          'Chakra useToast의 update 패턴과 Arco Message.loading의 비동기 처리 방식을 Sonner API로 재현합니다.',
      },
    },
  },
}

// ─── Cycle 153: Mantine + Notion ───────────────────────────────────────────

function MantineNotificationStackRender(args: React.ComponentProps<typeof Toaster>) {
  const [count, setCount] = useState(0)
  const notifications = [
    { title: '파일 업로드 완료', desc: 'report_q4.pdf 업로드됨', type: 'success' as const },
    { title: '빌드 실패', desc: 'main 브랜치 CI 오류', type: 'error' as const },
    { title: '새 댓글', desc: '홍길동이 문서에 댓글을 남겼습니다', type: 'info' as const },
    { title: '동기화 중', desc: '변경 사항을 저장 중...', type: 'loading' as const },
  ]
  const addNotification = () => {
    const n = notifications[count % notifications.length]
    setCount(c => c + 1)
    if (n.type === 'success') toast.success(n.title, { description: n.desc })
    else if (n.type === 'error') toast.error(n.title, { description: n.desc })
    else if (n.type === 'loading') toast.loading(n.title, { description: n.desc })
    else toast.info(n.title, { description: n.desc })
  }
  const clearAll = () => toast.dismiss()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>Mantine 알림 스택 관리</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button color="black" size="small" onClick={addNotification}>
          <Button.Center>알림 추가</Button.Center>
        </Button>
        <Button color="gray" size="small" onClick={clearAll}>
          <Button.Center>전체 닫기</Button.Center>
        </Button>
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>성공 → 오류 → 정보 → 로딩 순환 (Mantine useNotifications 패턴)</div>
    </div>
  )
}

export const Mantine_알림_스택_관리: Story = {
  name: 'Mantine - 알림 스택 관리 시스템',
  render: (args) => <MantineNotificationStackRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Mantine useNotifications 패턴. 성공·오류·정보·로딩 4종 알림을 스택 방식으로 축적하고 전체 일괄 해제를 지원합니다. ' +
          'Mantine Notifications의 limit·autoClose·closeOnClick 옵션을 Sonner API로 재현합니다.',
      },
    },
  },
}

function NotionTaskConfirmRender(args: React.ComponentProps<typeof Toaster>) {
  const TASKS = ['디자인 시스템 토큰 정리', '컴포넌트 문서 업데이트', '스프린트 회고 작성', 'API 엔드포인트 명세']
  const [completed, setCompleted] = useState<string[]>([])
  const completeTask = (task: string) => {
    setCompleted(prev => [...prev, task])
    toast.success(`완료: ${task}`, {
      description: '작업이 완료 목록으로 이동되었습니다',
      action: { label: '실행 취소', onClick: () => setCompleted(prev => prev.filter(t => t !== task)) },
    })
  }
  return (
    <div style={{ width: 300, fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>오늘의 작업</div>
      {TASKS.map(task => (
        <div key={task} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
          <input
            type="checkbox"
            checked={completed.includes(task)}
            onChange={() => { if (!completed.includes(task)) completeTask(task) }}
            style={{ accentColor: '#000', width: 14, height: 14, cursor: 'pointer' }}
          />
          <span style={{ fontSize: 13, color: completed.includes(task) ? '#94a3b8' : '#1e293b', textDecoration: completed.includes(task) ? 'line-through' : 'none' }}>
            {task}
          </span>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 8 }}>{completed.length}/{TASKS.length} 완료 — Notion 체크박스 패턴</div>
    </div>
  )
}

export const Notion_작업_완료_확인_토스트: Story = {
  name: 'Notion - 작업 완료 확인 Toast (실행 취소 지원)',
  render: (args) => <NotionTaskConfirmRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Notion 체크박스 완료 패턴. 작업 체크 시 완료 Toast가 표시되며 "실행 취소" 액션으로 체크 해제를 지원합니다. ' +
          'Notion의 인라인 체크박스 UX와 undo 패턴을 재현합니다.',
      },
    },
  },
}

function MantineNotionCollabRender(args: React.ComponentProps<typeof Toaster>) {
  const [active, setActive] = useState(false)
  const events = [
    { user: '김민준', action: '페이지를 편집 중', icon: '✏️' },
    { user: '이서연', action: '댓글을 남겼습니다', icon: '💬' },
    { user: '박도현', action: '파일을 업로드했습니다', icon: '📎' },
    { user: '최지아', action: '멘션했습니다', icon: '@' },
  ]
  const simulateCollab = () => {
    if (active) return
    setActive(true)
    events.forEach((ev, i) => {
      setTimeout(() => {
        toast(`${ev.icon} ${ev.user}`, { description: ev.action, duration: 3000 })
        if (i === events.length - 1) setTimeout(() => setActive(false), 500)
      }, i * 1200)
    })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>Mantine + Notion 실시간 협업 알림</div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>4명의 팀원이 순차적으로 활동합니다</div>
      <Button color="black" size="small" onClick={simulateCollab} disabled={active}>
        <Button.Center>{active ? '시뮬레이션 중...' : '협업 시뮬레이션'}</Button.Center>
      </Button>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>Mantine Notifications + Notion 실시간 협업 UI 패턴</div>
    </div>
  )
}

export const Mantine_Notion_실시간_협업_알림: Story = {
  name: 'Mantine + Notion - 실시간 협업 알림 스트림',
  render: (args) => <MantineNotionCollabRender {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Mantine + Notion 복합 패턴. 여러 팀원의 실시간 활동(편집·댓글·업로드·멘션)이 1.2초 간격으로 Toast 스트림으로 전달됩니다. ' +
          'Notion 협업 공간의 실시간 알림 UX와 Mantine 알림 지속시간 설정을 재현합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Cycle 179 — Tailwind UI + Vercel Design
   Benchmark:
   1. Tailwind UI: 폼 저장 패턴 — 저장 완료 + 실행 취소 액션 토스트
   2. Vercel Design: 배포 완료/실패 알림 — URL 링크 + 상태 색상
   3. Tailwind + Vercel: 일괄 작업 순차 토스트 — 진행 단계별 알림 시퀀스
-------------------------------------------------------------------------- */

function TailwindFormSaveToastRender(args: React.ComponentProps<typeof Toaster>) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    toast.success('설정이 저장되었습니다.', {
      description: '변경 사항이 적용되기까지 약 30초가 소요됩니다.',
      action: {
        label: '실행 취소',
        onClick: () => {
          setSaved(false)
          toast('설정 변경이 취소되었습니다.')
        },
      },
      duration: 5000,
    })
  }

  return (
    <div style={{ width: 360, padding: '20px', border: '1px solid #e5e7eb', borderRadius: 12, fontFamily: 'system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 16 }}>계정 설정</div>
      {[
        { label: '표시 이름', value: 'Orbit UI Team' },
        { label: '이메일 알림', value: '활성화됨' },
        { label: '언어', value: '한국어' },
      ].map((field) => (
        <div key={field.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{field.label}</span>
          <span style={{ fontSize: 12, color: '#111827', fontWeight: 500 }}>{field.value}</span>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <Button color={saved ? 'black' : 'primary'} size="medium" onClick={handleSave}>
          <Button.Center>{saved ? '저장됨' : '변경사항 저장'}</Button.Center>
        </Button>
      </div>
    </div>
  )
}

export const Tailwind_폼_저장_알림: Story = {
  name: 'Tailwind UI — 폼 저장 완료 토스트 (실행 취소 액션)',
  render: (args) => <TailwindFormSaveToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI Form 저장 패턴 구현. 저장 성공 시 toast.success() + 실행 취소 액션 버튼. 취소 클릭 시 상태를 되돌리고 취소 확인 토스트를 추가 표시. 5초 자동 닫기.',
      },
    },
  },
}

function VercelDeployToastRender(args: React.ComponentProps<typeof Toaster>) {
  const triggerDeploy = (success: boolean) => {
    const id = toast.loading('배포 시작 중...')
    setTimeout(() => {
      if (success) {
        toast.success('배포가 완료되었습니다.', {
          id,
          description: 'orbit-ui-preview.vercel.app — 빌드 시간: 38초',
          action: { label: '사이트 열기', onClick: () => undefined },
          duration: 6000,
        })
      } else {
        toast.error('배포에 실패했습니다.', {
          id,
          description: 'ESLint 오류 3개 발견. 로그를 확인하세요.',
          action: { label: '로그 보기', onClick: () => undefined },
          duration: 8000,
        })
      }
    }, 2000)
  }

  return (
    <div style={{ display: 'flex', gap: 8, padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <Toaster {...args} />
      <Button color="primary" size="medium" onClick={() => triggerDeploy(true)}>
        <Button.Center>배포 성공 시뮬레이션</Button.Center>
      </Button>
      <Button color="black" size="medium" onClick={() => triggerDeploy(false)}>
        <Button.Center>배포 실패 시뮬레이션</Button.Center>
      </Button>
    </div>
  )
}

export const Vercel_배포_완료_알림: Story = {
  name: 'Vercel Design — 배포 완료/실패 토스트 (로딩 → 결과)',
  render: (args) => <VercelDeployToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Vercel 배포 UI 패턴 구현. toast.loading()으로 배포 시작 알림 후 2초 뒤 동일 id로 성공/실패 토스트로 업데이트. 성공 시 사이트 URL + 빌드 시간, 실패 시 오류 수 + 로그 보기 액션.',
      },
    },
  },
}

const BATCH_STEPS = [
  { msg: '컴포넌트 타입 체크 중...', type: 'loading' as const },
  { msg: 'ESLint 검사 완료 (0 경고)', type: 'success' as const },
  { msg: '스토리북 빌드 중...', type: 'loading' as const },
  { msg: '스토리북 빌드 완료 (38초)', type: 'success' as const },
  { msg: 'Vercel 배포 업로드 중...', type: 'loading' as const },
  { msg: '모든 작업이 완료되었습니다.', type: 'success' as const },
]

function TailwindVercelBatchToastRender(args: React.ComponentProps<typeof Toaster>) {
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const runBatch = () => {
    setRunning(true)
    setStep(0)
    let current = 0
    const run = () => {
      if (current >= BATCH_STEPS.length) {
        setRunning(false)
        return
      }
      const s = BATCH_STEPS[current]
      if (s.type === 'loading') {
        toast.loading(s.msg, { duration: 1200 })
      } else {
        toast.success(s.msg)
      }
      setStep(current + 1)
      current++
      setTimeout(run, 1300)
    }
    run()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <Toaster {...args} />
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>일괄 배포 파이프라인</div>
      <div style={{ fontSize: 11, color: '#9ca3af' }}>typecheck → lint → build → deploy 순차 실행</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {BATCH_STEPS.map((s, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < step ? '#10b981' : '#e5e7eb', transition: 'background 0.3s' }} />
        ))}
        <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 4 }}>{step}/{BATCH_STEPS.length}</span>
      </div>
      <Button color="primary" size="medium" onClick={runBatch} disabled={running}>
        <Button.Center>{running ? '실행 중...' : '파이프라인 실행'}</Button.Center>
      </Button>
    </div>
  )
}

export const Tailwind_Vercel_일괄_작업_알림: Story = {
  name: 'Tailwind UI + Vercel — 일괄 작업 순차 토스트 (파이프라인)',
  render: (args) => <TailwindVercelBatchToastRender {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI 진행 피드백 + Vercel CI/CD 파이프라인 패턴. typecheck→lint→build→deploy 6단계 작업을 1.3초 간격으로 토스트 스트림으로 표시. loading→success 전환, 단계 진행 도트 인디케이터 동반.',
      },
    },
  },
}
