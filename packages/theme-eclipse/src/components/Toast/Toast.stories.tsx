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
