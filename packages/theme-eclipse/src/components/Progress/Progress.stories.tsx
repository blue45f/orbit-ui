import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@heejun-com/core'

import { Progress } from './Progress'

const meta = {
  title: 'eclipse/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 50,
    size: 'medium',
    color: 'primary',
    indeterminate: false,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', letterSpacing: '-0.01em' }}>
    {children}
  </div>
)

const InteractiveProgress = (args: any) => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Flex flexDirection="column" gap="2.5rem" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Interactive (Auto-animate)</SectionLabel>
        <Progress {...args} value={progress} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Sizes</SectionLabel>
        <Flex flexDirection="column" gap="16px">
          <Progress size="small" value={30} />
          <Progress size="medium" value={50} />
          <Progress size="large" value={80} />
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Colors</SectionLabel>
        <Flex flexDirection="column" gap="16px">
          <Progress color="primary" value={70} />
          <Progress color="success" value={90} />
          <Progress color="warning" value={40} />
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Indeterminate (Loading)</SectionLabel>
        <Progress indeterminate />
      </div>
    </Flex>
  )
}

export const 기본: Story = {
  render: (args) => <InteractiveProgress {...args} />,
}

export const 사이즈: Story = {
  render: () => (
    <Flex flexDirection="column" gap="16px" style={{ width: '100%', maxWidth: '480px' }}>
      <Progress size="small" value={40} />
      <Progress size="medium" value={60} />
      <Progress size="large" value={80} />
    </Flex>
  ),
}

export const 색상: Story = {
  render: () => (
    <Flex flexDirection="column" gap="16px" style={{ width: '100%', maxWidth: '480px' }}>
      <Progress color="primary" value={60} />
      <Progress color="success" value={80} />
      <Progress color="warning" value={45} />
    </Flex>
  ),
}

export const 로딩: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <Progress indeterminate />
    </div>
  ),
}

/* --------------------------------------------------------------------------
   단계별 진행 인터랙티브 데모
   Ant Design Steps 패턴: 이전/다음 버튼으로 단계를 이동하며 진행률 표시
-------------------------------------------------------------------------- */
const StepProgressRender = (args: any) => {
  const steps = [
    { label: '기본 정보', desc: '이름과 이메일을 입력합니다.' },
    { label: '계획 선택', desc: '사용할 플랜을 선택합니다.' },
    { label: '결제 수단', desc: '결제 정보를 입력합니다.' },
    { label: '완료', desc: '모든 설정이 완료되었습니다.' },
  ]
  const [current, setCurrent] = useState(0)
  const progress = Math.round((current / (steps.length - 1)) * 100)
  const isComplete = current === steps.length - 1

  return (
    <Flex flexDirection="column" gap="24px" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
            단계 {current + 1} / {steps.length}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: isComplete ? '#10b981' : '#6366f1' }}>
            {progress}%
          </span>
        </div>
        <Progress
          {...args}
          value={progress}
          color={isComplete ? 'success' : 'primary'}
        />
      </div>

      <div style={{
        padding: '20px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
          {steps[current].label}
        </div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>{steps[current].desc}</div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1.5px solid #e2e8f0',
            background: current === 0 ? '#f1f5f9' : '#fff',
            color: current === 0 ? '#94a3b8' : '#1e293b',
            fontWeight: 600,
            fontSize: '13px',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          이전
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          disabled={isComplete}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: isComplete ? '#10b981' : '#6366f1',
            color: '#fff',
            fontWeight: 600,
            fontSize: '13px',
            cursor: isComplete ? 'default' : 'pointer',
          }}
        >
          {isComplete ? '완료!' : '다음'}
        </button>
        {current > 0 && !isComplete && (
          <button
            onClick={() => setCurrent(0)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              background: '#fff',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            처음으로
          </button>
        )}
      </div>
    </Flex>
  )
}

export const 단계별진행: Story = {
  render: (args) => <StepProgressRender {...args} />,
}

/* --------------------------------------------------------------------------
   상태 표현 (성공 / 에러 / 로딩)
   Ant Design Steps 패턴: 각 상태에 따른 색상 및 인디케이터 표현
-------------------------------------------------------------------------- */
const StatusProgressRender = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'warning'>('loading')

  return (
    <Flex flexDirection="column" gap="24px" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {(['loading', 'success', 'warning'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: `1.5px solid ${status === s ? '#6366f1' : '#e2e8f0'}`,
              background: status === s ? '#6366f118' : '#fff',
              color: status === s ? '#6366f1' : '#64748b',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <Flex flexDirection="column" gap="16px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SectionLabel>
            {status === 'loading' ? '업로드 중...' : status === 'success' ? '업로드 완료' : '업로드 경고'}
          </SectionLabel>
          {status === 'loading' ? (
            <Progress indeterminate />
          ) : (
            <Progress
              value={100}
              color={status === 'success' ? 'success' : 'warning'}
            />
          )}
        </div>

        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          background: status === 'loading' ? '#f8fafc' : status === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
          border: `1px solid ${status === 'loading' ? '#e2e8f0' : status === 'success' ? '#10b981' : '#f59e0b'}`,
          fontSize: '13px',
          color: status === 'loading' ? '#64748b' : status === 'success' ? '#10b981' : '#f59e0b',
          fontWeight: 500,
        }}>
          {status === 'loading' && '파일을 서버에 업로드하고 있습니다...'}
          {status === 'success' && '3개 파일이 성공적으로 업로드되었습니다.'}
          {status === 'warning' && '2개 파일 업로드 중 권한 오류가 발생했습니다.'}
        </div>
      </Flex>
    </Flex>
  )
}

export const 상태표현: Story = {
  render: () => <StatusProgressRender />,
}
