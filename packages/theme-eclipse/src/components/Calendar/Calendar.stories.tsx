import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './Calendar'

const meta = {
  title: 'eclipse/Inputs/Pickers/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

const StoryWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: 'fit-content' }}>
    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'inherit', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {title}
    </h4>
    {children}
  </div>
)

export const 기본: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        <StoryWrapper title="Single Select">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
          <p style={{ fontSize: '14px', marginTop: '0.5rem', fontWeight: 500 }}>
            Selected: <span style={{ color: 'var(--sem-eclipse-color-fillPrimary, #6366f1)' }}>{date?.toLocaleDateString() || 'None'}</span>
          </p>
        </StoryWrapper>

        <StoryWrapper title="Multiple Select">
          <Calendar
            mode="multiple"
          />
        </StoryWrapper>
      </div>
    )
  },
}

export const 범위선택: Story = {
  render: function Render() {
    return (
      <StoryWrapper title="Range Selection">
        <Calendar
          mode="range"
          numberOfMonths={2}
        />
      </StoryWrapper>
    )
  }
}

/**
 * 모바일 풀스크린 달력 예시입니다.
 *
 * Calendar 컴포넌트 자체에 fullscreen prop은 없지만,
 * 래퍼를 사용하여 전체 화면 레이아웃을 구성할 수 있습니다.
 * 실제 앱에서는 Modal 또는 Drawer 내부에 배치하여 사용하세요.
 */
export const 모바일_풀스크린: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [view, setView] = React.useState<'calendar' | 'confirm'>('calendar')

    return (
      <div style={{
        width: '375px', height: '812px', margin: '0 auto',
        background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)',
        display: 'flex', flexDirection: 'column',
        border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)',
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 20px 12px',
          borderBottom: '1px solid var(--sem-eclipse-color-borderSecondary, #f1f5f9)',
          background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', fontSize: '14px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)', cursor: 'pointer', padding: '4px 0' }}>
              Cancel
            </button>
            <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>
              Select Date
            </span>
            <button
              onClick={() => setView('confirm')}
              style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#6366f1', cursor: 'pointer', padding: '4px 0' }}>
              Done
            </button>
          </div>
          {date && (
            <div style={{
              marginTop: '12px', padding: '10px 14px', borderRadius: '10px',
              background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#6366f1' }}>
                {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </span>
            </div>
          )}
        </div>

        {/* Calendar - fullscreen fill */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            style={{ width: '100%' }}
          />
        </div>

        {/* Footer CTA */}
        <div style={{
          padding: '16px 20px 32px',
          borderTop: '1px solid var(--sem-eclipse-color-borderSecondary, #f1f5f9)',
          background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)',
        }}>
          {view === 'confirm' && date ? (
            <div style={{
              padding: '14px', borderRadius: '12px', marginBottom: '12px',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              textAlign: 'center', fontSize: '13px', color: '#10b981', fontWeight: '600',
            }}>
              ✓ Date confirmed: {date.toLocaleDateString('ko-KR')}
            </div>
          ) : null}
          <button
            onClick={() => setView('confirm')}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px',
              background: '#6366f1', color: '#fff', border: 'none',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            }}
          >
            {date ? `Confirm — ${date.toLocaleDateString()}` : 'Select a date'}
          </button>
        </div>
      </div>
    )
  }
}
