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

/* --------------------------------------------------------------------------
   Tailwind UI 빠른 선택 사이드바 패턴
   Tailwind UI DatePicker: 프리셋 버튼 + 캘린더 조합
-------------------------------------------------------------------------- */
export const TailwindUI_빠른_날짜_선택: Story = {
  name: 'Tailwind UI - 프리셋 + 캘린더 조합 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI DatePicker 패턴. 좌측 프리셋 버튼(오늘/이번 주/이번 달 등)과 우측 캘린더를 ' +
          '조합하여 빠른 날짜 선택을 지원합니다.',
      },
    },
  },
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [activePreset, setActivePreset] = React.useState<string>('today')

    const presets = [
      { key: 'today', label: '오늘', getDate: () => new Date() },
      { key: 'tomorrow', label: '내일', getDate: () => { const d = new Date(); d.setDate(d.getDate() + 1); return d } },
      { key: 'next7', label: '7일 후', getDate: () => { const d = new Date(); d.setDate(d.getDate() + 7); return d } },
      { key: 'next30', label: '30일 후', getDate: () => { const d = new Date(); d.setDate(d.getDate() + 30); return d } },
      { key: 'eom', label: '이번 달 말일', getDate: () => { const d = new Date(); d.setMonth(d.getMonth() + 1, 0); return d } },
      { key: 'eoy', label: '연말', getDate: () => new Date(new Date().getFullYear(), 11, 31) },
    ]

    const handlePreset = (key: string, getDate: () => Date) => {
      setActivePreset(key)
      setDate(getDate())
    }

    return (
      <div style={{ display: 'flex', gap: 0, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff', width: 'fit-content' }}>
        {/* Preset sidebar */}
        <div style={{ width: 120, borderRight: '1px solid #f1f5f9', background: '#f8fafc', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, paddingLeft: 4 }}>
            빠른 선택
          </div>
          {presets.map((p) => (
            <button
              key={p.key}
              onClick={() => handlePreset(p.key, p.getDate)}
              style={{
                padding: '7px 10px',
                borderRadius: 7,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: activePreset === p.key ? 700 : 500,
                textAlign: 'left',
                color: activePreset === p.key ? '#6366f1' : '#475569',
                background: activePreset === p.key ? '#ede9fe' : 'transparent',
                transition: 'all 0.12s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { setDate(d); setActivePreset('') }}
          />
          {date && (
            <div style={{ padding: '8px 16px', borderTop: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
              {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
            </div>
          )}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Apple HIG 인라인 생일 입력 패턴
   iOS 생일 날짜 선택: 월/일/년 드럼롤 없이 타이핑 입력 + 캘린더 확인
-------------------------------------------------------------------------- */
export const AppleHIG_생일_날짜_입력: Story = {
  name: 'Apple HIG - 생일 입력 + 캘린더 확인 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Apple HIG 생년월일 입력 패턴. 텍스트 입력(YYYY-MM-DD)과 캘린더를 연동하여 ' +
          '날짜를 시각적으로 확인합니다. 미래 날짜는 비활성화됩니다.',
      },
    },
  },
  render: function Render() {
    const [inputVal, setInputVal] = React.useState('')
    const [date, setDate] = React.useState<Date | undefined>()
    const [error, setError] = React.useState('')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      setInputVal(v)
      setError('')
      if (v.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const parsed = new Date(v)
        if (isNaN(parsed.getTime())) {
          setError('올바른 날짜를 입력해 주세요.')
          setDate(undefined)
        } else if (parsed > new Date()) {
          setError('미래 날짜는 생년월일로 입력할 수 없습니다.')
          setDate(undefined)
        } else {
          setDate(parsed)
        }
      } else {
        setDate(undefined)
      }
    }

    const today = new Date()

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', width: 'fit-content' }}>
        <div style={{ width: '100%' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
            생년월일
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={handleInput}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              border: `1.5px solid ${error ? '#ef4444' : date ? '#6366f1' : '#e2e8f0'}`,
              fontSize: 15,
              fontWeight: 600,
              color: '#1e293b',
              outline: 'none',
              transition: 'border-color 0.15s',
              fontFamily: 'monospace',
              boxSizing: 'border-box',
            }}
          />
          {error && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{error}</div>}
          {date && !error && (
            <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, marginTop: 4 }}>
              {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </div>
          )}
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            if (d) setInputVal(d.toISOString().slice(0, 10))
          }}
          disabled={{ after: today }}
          defaultMonth={date ?? new Date(1995, 0, 1)}
        />

        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', width: '100%' }}>
          <strong>나이:</strong>{' '}
          {date
            ? `${today.getFullYear() - date.getFullYear()}세`
            : '날짜를 선택하거나 입력해 주세요'}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Tailwind UI 예약 예정일 선택 패턴
   예약/스케줄링에서 사용: 오늘 이후만 선택 가능, 주말 비활성화, 확인 버튼
-------------------------------------------------------------------------- */
export const TailwindUI_예약_일정_선택: Story = {
  name: 'Tailwind UI - 예약 스케줄링 + 시간 선택 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI 예약 캘린더 패턴. 오늘 이후만 선택 가능, 주말 비활성화. ' +
          '날짜 선택 후 시간 슬롯 선택까지 이어지는 2단계 예약 UX입니다.',
      },
    },
  },
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>()
    const [timeSlot, setTimeSlot] = React.useState<string | null>(null)
    const [confirmed, setConfirmed] = React.useState(false)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

    const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6

    const handleConfirm = () => {
      if (date && timeSlot) setConfirmed(true)
    }

    if (confirmed && date && timeSlot) {
      return (
        <div style={{ width: 320, padding: 24, borderRadius: 16, border: '1px solid #bbf7d0', background: '#f0fdf4', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#15803d', marginBottom: 4 }}>예약 완료</div>
          <div style={{ fontSize: 14, color: '#166534', marginBottom: 16 }}>
            {date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })} {timeSlot}
          </div>
          <button
            onClick={() => { setConfirmed(false); setDate(undefined); setTimeSlot(null) }}
            style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #16a34a', background: 'none', color: '#16a34a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            다시 예약
          </button>
        </div>
      )
    }

    return (
      <div style={{ width: 320, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>날짜 선택</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>오늘 이후, 평일만 선택 가능합니다</div>
        </div>

        <div style={{ padding: '8px 0' }}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { setDate(d); setTimeSlot(null) }}
            disabled={[{ before: new Date() }, isWeekend]}
          />
        </div>

        {date && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8 }}>
              {date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })} 시간 선택
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: `1.5px solid ${timeSlot === slot ? '#6366f1' : '#e2e8f0'}`,
                    background: timeSlot === slot ? '#6366f1' : '#fff',
                    color: timeSlot === slot ? '#fff' : '#475569',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={handleConfirm}
            disabled={!date || !timeSlot}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: 10,
              border: 'none',
              background: date && timeSlot ? '#6366f1' : '#f1f5f9',
              color: date && timeSlot ? '#fff' : '#94a3b8',
              fontSize: 13,
              fontWeight: 700,
              cursor: date && timeSlot ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {date && timeSlot
              ? `${date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ${timeSlot} 예약 확정`
              : '날짜와 시간을 선택해 주세요'}
          </button>
        </div>
      </div>
    )
  },
}
