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

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 날짜 범위 선택 패턴
   Mantine DatePicker range 패턴 — 시작/종료일 선택 UI
-------------------------------------------------------------------------- */
export const Mantine_날짜_범위_선택: Story = {
  name: 'Mantine - 날짜 범위 선택 패턴',
  render: function Render() {
    type DateRange = { from: Date | undefined; to: Date | undefined }
    const [range, setRange] = React.useState<DateRange>({ from: undefined, to: undefined })

    const fmt = (d: Date | undefined) =>
      d ? d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '선택 안 됨'

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>기간 선택</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase' }}>시작일</div>
            <Calendar
              mode="single"
              selected={range.from}
              onSelect={(d) => setRange((prev) => ({ ...prev, from: d }))}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase' }}>종료일</div>
            <Calendar
              mode="single"
              selected={range.to}
              onSelect={(d) => setRange((prev) => ({ ...prev, to: d }))}
              disabled={range.from ? { before: range.from } : undefined}
            />
          </div>
        </div>
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            fontSize: 13,
            color: '#475569',
            width: '100%',
          }}
        >
          <span style={{ fontWeight: 700 }}>선택된 기간: </span>
          {range.from && range.to ? (
            <span style={{ color: '#6366f1' }}>
              {fmt(range.from)} ~ {fmt(range.to)}
            </span>
          ) : (
            <span style={{ color: '#94a3b8' }}>
              {fmt(range.from)} ~ {fmt(range.to)}
            </span>
          )}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 이벤트 마킹 달력 패턴
   Ant Design Calendar + 이벤트 닷(dot) 표시 — 날짜별 일정 현황
-------------------------------------------------------------------------- */
export const Ant_이벤트_마킹_달력: Story = {
  name: 'Ant Design - 이벤트 마킹 달력 패턴',
  render: function Render() {
    const today = new Date()
    const [selected, setSelected] = React.useState<Date | undefined>(today)

    const events: Record<string, { label: string; color: string }[]> = {
      [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toDateString()]: [
        { label: '팀 미팅', color: '#6366f1' },
      ],
      [new Date(today.getFullYear(), today.getMonth(), today.getDate()).toDateString()]: [
        { label: '배포 예정', color: '#10b981' },
        { label: '코드 리뷰', color: '#f59e0b' },
      ],
      [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toDateString()]: [
        { label: '스프린트 종료', color: '#ef4444' },
      ],
      [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toDateString()]: [
        { label: '회고 미팅', color: '#6366f1' },
      ],
    }

    const selectedEvents = selected ? events[selected.toDateString()] || [] : []

    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiers={{
            hasEvent: Object.keys(events).map((d) => new Date(d)),
          }}
          modifiersStyles={{
            hasEvent: {
              fontWeight: 700,
              textDecoration: 'underline',
              textDecorationColor: '#6366f1',
              textUnderlineOffset: '3px',
            },
          }}
        />
        <div style={{ minWidth: 220 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>
            {selected ? selected.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) : '날짜 선택'} 일정
          </div>
          {selectedEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {selectedEvents.map((ev, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${ev.color}33`,
                    background: `${ev.color}0d`,
                  }}
                >
                  <span
                    style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{ev.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#94a3b8', padding: '8px 0' }}>
              {selected ? '일정이 없습니다.' : '날짜를 선택하세요.'}
            </div>
          )}
          <div style={{ marginTop: 16, fontSize: 11, color: '#94a3b8' }}>
            밑줄 표시된 날짜에 일정이 있습니다.
          </div>
        </div>
      </div>
    )
  },
}

/* -------------------------------------------------------------------------- */

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
