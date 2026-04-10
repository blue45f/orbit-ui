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

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 접근성 다중 날짜 선택기
   Radix 패턴: 명시적 label, aria-live 영역, 키보드 네비게이션 힌트
-------------------------------------------------------------------------- */
export const Radix_접근성_다중_날짜_선택기: Story = {
  name: 'Radix UI - 접근성 다중 날짜 선택기 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 접근성 우선 패턴 적용. aria-live 영역으로 선택 상태를 스크린리더에 전달하고, ' +
          '키보드 단축키 힌트를 제공합니다. 프로젝트 휴일/마감일 다중 선택 시나리오입니다.',
      },
    },
  },
  render: function Render() {
    const [dates, setDates] = React.useState<Date[]>([])
    const maxSelect = 5

    const fmt = (d: Date) =>
      d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })

    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime())

    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <div
            style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}
            id="cal-label"
          >
            프로젝트 마감일 선택 ({dates.length}/{maxSelect})
          </div>
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={(d) => setDates(d ?? [])}
            max={maxSelect}
            aria-labelledby="cal-label"
          />
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, display: 'flex', gap: 12 }}>
            <span>Space/Enter: 선택</span>
            <span>Arrow: 이동</span>
            <span>최대 {maxSelect}일</span>
          </div>
        </div>
        <div style={{ minWidth: 200 }}>
          <div
            aria-live="polite"
            style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}
          >
            선택된 마감일 {dates.length > 0 ? `(${dates.length}개)` : '없음'}
          </div>
          {sortedDates.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sortedDates.map((d, i) => (
                <div
                  key={d.toISOString()}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px', borderRadius: 8,
                    border: '1px solid #e2e8f0', background: '#fafafa',
                  }}
                >
                  <span
                    style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: '#6366f1', color: '#fff',
                      fontSize: 10, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 13, color: '#1e293b' }}>{fmt(d)}</span>
                </div>
              ))}
              <button
                onClick={() => setDates([])}
                style={{
                  marginTop: 4, padding: '6px 12px', borderRadius: 7,
                  border: '1px solid #fee2e2', background: '#fff5f5',
                  color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                전체 해제
              </button>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#94a3b8' }}>날짜를 클릭해 마감일을 추가하세요.</div>
          )}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 태스크 마감일 인라인 설정 패턴
   Notion DB에서 Date 속성을 인라인 편집하는 UX — 태스크 리스트 + 달력
-------------------------------------------------------------------------- */
type NotionTask = {
  id: string
  title: string
  deadline: Date | undefined
  done: boolean
}

const NOTION_TASKS_INIT: NotionTask[] = [
  { id: 't1', title: '디자인 토큰 가이드 문서화', deadline: undefined, done: false },
  { id: 't2', title: 'Storybook autodocs 보강', deadline: undefined, done: false },
  { id: 't3', title: '접근성 키보드 테스트', deadline: undefined, done: false },
  { id: 't4', title: '다크모드 색상 검수', deadline: undefined, done: false },
]

function NotionDeadlineRender() {
  const [tasks, setTasks] = React.useState<NotionTask[]>(NOTION_TASKS_INIT)
  const [openId, setOpenId] = React.useState<string | null>(null)

  const setDeadline = (id: string, d: Date | undefined) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, deadline: d } : t)))
    setOpenId(null)
  }

  const toggleDone = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div style={{ width: 420, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'visible', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#fafafa', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
        태스크 마감일 설정
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tasks.map((task) => {
          const isOverdue = task.deadline && task.deadline < today && !task.done
          return (
            <div key={task.id} style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px',
                  borderBottom: '1px solid #f8fafc',
                  background: task.done ? '#f8fafc' : '#fff',
                }}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  style={{ width: 15, height: 15, accentColor: '#6366f1', cursor: 'pointer', flexShrink: 0 }}
                />
                <span style={{
                  flex: 1, fontSize: 13, color: task.done ? '#94a3b8' : '#1e293b',
                  textDecoration: task.done ? 'line-through' : 'none',
                }}>
                  {task.title}
                </span>
                <button
                  onClick={() => setOpenId(openId === task.id ? null : task.id)}
                  style={{
                    padding: '3px 10px', borderRadius: 6,
                    border: `1px solid ${isOverdue ? '#fecaca' : '#e2e8f0'}`,
                    background: isOverdue ? '#fef2f2' : '#f8fafc',
                    color: isOverdue ? '#ef4444' : task.deadline ? '#6366f1' : '#94a3b8',
                    fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {task.deadline
                    ? task.deadline.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
                    : '날짜 설정'}
                </button>
              </div>
              {openId === task.id && (
                <div style={{
                  position: 'absolute', right: 12, top: '100%', zIndex: 10,
                  border: '1px solid #e2e8f0', borderRadius: 12,
                  background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: 4,
                }}>
                  <Calendar
                    mode="single"
                    selected={task.deadline}
                    onSelect={(d) => setDeadline(task.id, d)}
                    disabled={{ before: today }}
                  />
                  {task.deadline && (
                    <div style={{ padding: '4px 8px', borderTop: '1px solid #f1f5f9' }}>
                      <button
                        onClick={() => setDeadline(task.id, undefined)}
                        style={{ width: '100%', padding: '6px', borderRadius: 6, border: 'none', background: '#fef2f2', color: '#ef4444', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                      >
                        날짜 제거
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Notion_태스크_마감일_설정: Story = {
  name: 'Notion - 태스크 마감일 인라인 설정 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Notion Database Date 속성 인라인 편집 패턴. 각 태스크 행에서 날짜 버튼을 클릭해 ' +
          '달력 팝오버로 마감일을 설정합니다. 오늘 이전 날짜 비활성화, 기한 초과 시 경고 표시.',
      },
    },
  },
  render: () => <NotionDeadlineRender />,
}

/* --------------------------------------------------------------------------
   Shadcn/ui 벤치마크: 월별 지출 추적기 패턴
   shadcn Calendar + 데이터 입력 조합 — 날짜별 지출 기록 및 월합계
-------------------------------------------------------------------------- */
function ShadcnExpenseTrackerRender() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date())
  const [expenses, setExpenses] = React.useState<Record<string, number>>({})
  const [input, setInput] = React.useState('')

  const key = (d: Date) => d.toDateString()

  const addExpense = () => {
    if (!selected || !input) return
    const val = parseFloat(input)
    if (isNaN(val) || val <= 0) return
    setExpenses((prev) => ({ ...prev, [key(selected)]: (prev[key(selected)] || 0) + val }))
    setInput('')
  }

  const total = Object.values(expenses).reduce((s, v) => s + v, 0)
  const expenseDates = Object.keys(expenses).map((k) => new Date(k))

  const fmt = (n: number) => n.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiers={{ hasExpense: expenseDates }}
          modifiersStyles={{
            hasExpense: {
              fontWeight: 800,
              color: '#059669',
              textDecoration: 'underline',
              textDecorationColor: '#059669',
              textUnderlineOffset: '3px',
            },
          }}
        />
      </div>
      <div style={{ minWidth: 220, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fafafa' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
            {selected
              ? selected.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
              : '날짜 선택'} 지출
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>
            {selected && expenses[key(selected)] ? fmt(expenses[key(selected)]) : fmt(0)}
          </div>
        </div>
        {selected && (
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addExpense()}
              placeholder="금액 (원)"
              min={0}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 8,
                border: '1.5px solid #e2e8f0', fontSize: 13, color: '#1e293b',
                outline: 'none',
              }}
            />
            <button
              onClick={addExpense}
              style={{
                padding: '8px 14px', borderRadius: 8,
                border: 'none', background: '#6366f1',
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              추가
            </button>
          </div>
        )}
        <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid #d1fae5', background: '#f0fdf4' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>이번 달 총 지출</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#047857' }}>{fmt(total)}</div>
          <div style={{ fontSize: 11, color: '#6ee7b7', marginTop: 2 }}>{Object.keys(expenses).length}일 기록됨</div>
        </div>
        {Object.keys(expenses).length > 0 && (
          <button
            onClick={() => setExpenses({})}
            style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
          >
            기록 초기화
          </button>
        )}
      </div>
    </div>
  )
}

export const Shadcn_월별_지출_추적기: Story = {
  name: 'shadcn/ui - 월별 지출 추적 달력 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Calendar + 데이터 입력 조합 패턴. 날짜 선택 후 지출 금액을 입력하면 ' +
          '달력에 기록 표시(초록 밑줄)되고 월합계를 집계합니다.',
      },
    },
  },
  render: () => <ShadcnExpenseTrackerRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 예약 가능 시간 슬롯 선택
   Chakra UI의 SimpleGrid + Badge 패턴을 활용한 날짜+시간 선택 플로우
-------------------------------------------------------------------------- */
const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const BOOKED = new Set(['10:00', '13:00', '16:00'])

function ChakraTimeSlotPickerRender() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [slot, setSlot] = React.useState<string | null>(null)
  const [confirmed, setConfirmed] = React.useState(false)

  const handleConfirm = () => {
    if (date && slot) setConfirmed(true)
  }

  const reset = () => {
    setDate(undefined)
    setSlot(null)
    setConfirmed(false)
  }

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>날짜 선택</div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => { setDate(d); setSlot(null); setConfirmed(false) }}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>시간 선택</div>
          {date ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {TIME_SLOTS.map((t) => {
                const isBooked = BOOKED.has(t)
                const isSelected = slot === t
                return (
                  <button
                    key={t}
                    disabled={isBooked}
                    onClick={() => { setSlot(t); setConfirmed(false) }}
                    style={{
                      padding: '8px 0',
                      borderRadius: 8,
                      border: `2px solid ${isSelected ? '#6366f1' : isBooked ? '#f1f5f9' : '#e2e8f0'}`,
                      background: isSelected ? '#eef2ff' : isBooked ? '#f8fafc' : '#fff',
                      color: isSelected ? '#6366f1' : isBooked ? '#cbd5e1' : '#334155',
                      fontSize: 13,
                      fontWeight: isSelected ? 700 : 500,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      transition: 'all 0.12s',
                      textDecoration: isBooked ? 'line-through' : 'none',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#94a3b8', padding: '12px 0' }}>날짜를 먼저 선택하세요</div>
          )}
        </div>
        {date && slot && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {confirmed ? (
              <div style={{ padding: '12px 16px', borderRadius: 10, background: '#f0fdf4', border: '1.5px solid #bbf7d0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                {date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} {slot} 예약 완료
              </div>
            ) : (
              <button
                onClick={handleConfirm}
                style={{ padding: '10px', borderRadius: 10, border: 'none', background: '#6366f1', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                {date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} {slot} 예약
              </button>
            )}
            <button onClick={reset} style={{ padding: '8px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>
              초기화
            </button>
          </div>
        )}
        <div style={{ fontSize: 11, color: '#94a3b8' }}>취소선 = 예약 불가</div>
      </div>
    </div>
  )
}

export const Chakra_예약_시간_슬롯_선택기: Story = {
  name: 'Chakra UI - 날짜·시간 슬롯 예약 선택기',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI SimpleGrid + Badge 패턴. 날짜 선택 후 시간 슬롯 그리드를 표시합니다. ' +
          '예약 불가 슬롯은 비활성화, 선택된 슬롯은 강조 표시됩니다.',
      },
    },
  },
  render: () => <ChakraTimeSlotPickerRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 날짜 기반 작업 플래너
   Chakra UI의 Stack + Checkbox 조합 패턴 — 날짜 선택 + 할 일 관리
-------------------------------------------------------------------------- */
type PlannerTask = { id: number; text: string; done: boolean }

function ChakraTaskPlannerRender() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [tasks, setTasks] = React.useState<Record<string, PlannerTask[]>>({})
  const [input, setInput] = React.useState('')

  const dayKey = (d: Date) => d.toISOString().split('T')[0]
  const currentKey = date ? dayKey(date) : ''
  const currentTasks = currentKey ? (tasks[currentKey] ?? []) : []

  const addTask = () => {
    if (!input.trim() || !currentKey) return
    setTasks((prev) => ({
      ...prev,
      [currentKey]: [...(prev[currentKey] ?? []), { id: Date.now(), text: input.trim(), done: false }],
    }))
    setInput('')
  }

  const toggleTask = (id: number) => {
    setTasks((prev) => ({
      ...prev,
      [currentKey]: (prev[currentKey] ?? []).map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }))
  }

  const daysWithTasks = new Set(Object.keys(tasks).filter((k) => tasks[k].length > 0))

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>날짜</div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={{ hasTasks: Array.from(daysWithTasks).map((k) => new Date(k)) }}
          modifiersStyles={{ hasTasks: { fontWeight: 800, color: '#6366f1', textDecoration: 'underline', textUnderlineOffset: 3 } }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
          {date ? date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }) : '날짜 선택'}
          <span style={{ marginLeft: 8, fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
            {currentTasks.length > 0 ? `${currentTasks.filter((t) => t.done).length}/${currentTasks.length} 완료` : ''}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="할 일 추가..."
            disabled={!date}
            style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, color: '#1e293b', outline: 'none' }}
          />
          <button onClick={addTask} disabled={!date || !input.trim()} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: !date || !input.trim() ? 0.4 : 1 }}>
            추가
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {currentTasks.length === 0 && (
            <div style={{ fontSize: 13, color: '#94a3b8', padding: '8px 0' }}>이 날 할 일이 없습니다.</div>
          )}
          {currentTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: task.done ? '#f0fdf4' : '#fff', cursor: 'pointer' }}
            >
              <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${task.done ? '#10b981' : '#d1d5db'}`, background: task.done ? '#10b981' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {task.done && <span style={{ fontSize: 10, color: '#fff', fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, color: task.done ? '#94a3b8' : '#1e293b', textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>밑줄 날짜 = 할 일 있음</div>
      </div>
    </div>
  )
}

export const Chakra_날짜별_작업_플래너: Story = {
  name: 'Chakra UI - 날짜 기반 작업 플래너',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Stack + Checkbox 조합 패턴. 날짜 선택 후 해당 날짜의 할 일을 추가·완료 처리합니다. ' +
          'modifiers로 할 일이 있는 날짜에 밑줄 표시합니다.',
      },
    },
  },
  render: () => <ChakraTaskPlannerRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 생년월일 검증 입력기
   Chakra UI의 FormControl + FormErrorMessage 패턴 — 날짜 유효성 검사 포함
-------------------------------------------------------------------------- */
function ChakraBirthDatePickerRender() {
  const today = new Date()
  const [selected, setSelected] = React.useState<Date | undefined>()
  const [submitted, setSubmitted] = React.useState(false)

  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
  const maxDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate())

  const ageYears = selected ? Math.floor((today.getTime() - selected.getTime()) / (365.25 * 24 * 3600 * 1000)) : null
  const isValid = selected !== undefined && selected >= minDate && selected <= maxDate
  const error = submitted && !isValid
    ? selected === undefined ? '생년월일을 선택하세요.' : '14세 이상 120세 이하만 가입 가능합니다.'
    : null

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', maxWidth: 600 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>생년월일</div>
        <div style={{ border: `2px solid ${error ? '#ef4444' : selected ? '#6366f1' : '#e2e8f0'}`, borderRadius: 12, padding: 4, transition: 'border-color 0.15s' }}>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d) => { setSelected(d); setSubmitted(false) }}
            disabled={(d) => d > maxDate || d < minDate}
            fromYear={today.getFullYear() - 120}
            toYear={today.getFullYear() - 14}
            captionLayout="dropdown"
          />
        </div>
        {error && (
          <div style={{ fontSize: 12, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>!</span> {error}
          </div>
        )}
        {selected && isValid && ageYears !== null && (
          <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>
            만 {ageYears}세 · 가입 가능
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 28 }}>
        <div style={{ padding: '14px 18px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 13, color: '#64748b', lineHeight: 1.6, maxWidth: 220 }}>
          <strong style={{ color: '#1e293b', display: 'block', marginBottom: 4 }}>안내사항</strong>
          14세 미만 또는 120세 초과는 선택 불가합니다. 드롭다운으로 연도를 빠르게 선택할 수 있습니다.
        </div>
        <button
          onClick={() => setSubmitted(true)}
          style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#6366f1', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          확인
        </button>
        {submitted && isValid && selected && (
          <div style={{ padding: '10px 16px', borderRadius: 10, background: '#f0fdf4', border: '1.5px solid #bbf7d0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
            {selected.toLocaleDateString('ko-KR')} 확인됨 (만 {ageYears}세)
          </div>
        )}
      </div>
    </div>
  )
}

export const Chakra_생년월일_유효성_검사: Story = {
  name: 'Chakra UI - 생년월일 유효성 검사 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI FormControl + FormErrorMessage 패턴. captionLayout="dropdown"으로 연도를 빠르게 선택하고 ' +
          '14세 미만·120세 초과 날짜를 비활성화합니다. 제출 시 유효성 오류를 인라인으로 표시합니다.',
      },
    },
  },
  render: () => <ChakraBirthDatePickerRender />,
}

/* --------------------------------------------------------------------------
   Cycle 122 — Ant Design + Mantine 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Ant Design: 다중 날짜 선택 + 일괄 작업 패턴
   Ant Design DatePicker 의 multiple selection 아이디어 — 수동 날짜 목록 관리
-------------------------------------------------------------------------- */
export const Ant_다중_날짜_선택: Story = {
  name: 'Ant Design - 다중 날짜 선택 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design DatePicker multiple 모드 아이디어. 날짜를 클릭할 때마다 목록에 추가/제거하고, ' +
          '선택된 날짜들에 대해 일괄 작업(일정 추가/내보내기)을 수행하는 패턴입니다.',
      },
    },
  },
  render: function Render() {
    const [selected, setSelected] = React.useState<Date[]>([])

    const toggle = (d: Date) => {
      setSelected((prev) => {
        const idx = prev.findIndex((p) => p.toDateString() === d.toDateString())
        return idx >= 0 ? prev.filter((_, i) => i !== idx) : [...prev, d]
      })
    }

    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Calendar
          mode="single"
          selected={undefined}
          onSelect={(d) => d && toggle(d)}
          modifiers={{ chosen: selected }}
          modifiersStyles={{
            chosen: {
              backgroundColor: '#6366f1',
              color: '#fff',
              borderRadius: '50%',
              fontWeight: 700,
            },
          }}
        />
        <div style={{ minWidth: 220 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>
            선택된 날짜 ({selected.length}개)
          </div>
          {selected.length === 0 ? (
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>날짜를 클릭하여 선택하세요.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              {[...selected]
                .sort((a, b) => a.getTime() - b.getTime())
                .map((d) => (
                  <div
                    key={d.toDateString()}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '6px 10px', borderRadius: 8,
                      background: '#f0f0ff', border: '1px solid #c7d2fe', fontSize: 13,
                    }}
                  >
                    <span style={{ color: '#4338ca', fontWeight: 600 }}>
                      {d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })}
                    </span>
                    <button
                      onClick={() => toggle(d)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 16, lineHeight: 1 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              disabled={selected.length === 0}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                background: selected.length > 0 ? '#6366f1' : '#e2e8f0',
                color: selected.length > 0 ? '#fff' : '#94a3b8',
                fontSize: 13, fontWeight: 600, cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              일정 추가
            </button>
            <button
              disabled={selected.length === 0}
              onClick={() => setSelected([])}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8,
                border: '1px solid #e2e8f0', background: '#fff',
                color: '#475569', fontSize: 13, fontWeight: 600,
                cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Mantine: DatePickerInput 인라인 확인 다이얼로그 패턴
   Mantine DatePickerInput의 확인 버튼(clearable + confirmable) 아이디어
-------------------------------------------------------------------------- */
export const Mantine_날짜_확인_다이얼로그: Story = {
  name: 'Mantine - 날짜 선택 확인 다이얼로그 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine DatePickerInput clearable + confirmable 아이디어. 날짜 선택 후 명시적 "확인" 버튼으로 ' +
          '값을 커밋하고, 현재 선택 중인 날짜와 확정된 날짜를 구분하여 표시합니다.',
      },
    },
  },
  render: function Render() {
    const [draft, setDraft] = React.useState<Date | undefined>(undefined)
    const [confirmed, setConfirmed] = React.useState<Date | undefined>(undefined)
    const [open, setOpen] = React.useState(false)

    const fmt = (d?: Date) =>
      d ? d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'

    return (
      <div style={{ width: 340 }}>
        {/* Input trigger */}
        <div
          onClick={() => setOpen((v) => !v)}
          style={{
            padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0',
            cursor: 'pointer', fontSize: 14, fontWeight: 500,
            color: confirmed ? '#1e293b' : '#94a3b8',
            background: '#fff', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <span>{confirmed ? fmt(confirmed) : '날짜를 선택하세요'}</span>
          <span style={{ fontSize: 18, color: '#94a3b8' }}>📅</span>
        </div>

        {/* Popover-style calendar */}
        {open && (
          <div style={{
            padding: 16, borderRadius: 14, border: '1.5px solid #e2e8f0',
            background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}>
            <Calendar
              mode="single"
              selected={draft}
              onSelect={setDraft}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button
                onClick={() => { setDraft(undefined); setOpen(false) }}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 8,
                  border: '1px solid #e2e8f0', background: '#f8fafc',
                  fontSize: 13, fontWeight: 600, color: '#64748b', cursor: 'pointer',
                }}
              >
                취소
              </button>
              <button
                disabled={!draft}
                onClick={() => { setConfirmed(draft); setOpen(false) }}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                  background: draft ? '#6366f1' : '#e2e8f0',
                  color: draft ? '#fff' : '#94a3b8',
                  fontSize: 13, fontWeight: 600, cursor: draft ? 'pointer' : 'not-allowed',
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}

        {confirmed && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
            ✓ 확정: {fmt(confirmed)}
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant + Mantine: 팀 스프린트 계획 달력
   두 시스템의 범위 선택 + 이벤트 표시 패턴 결합
-------------------------------------------------------------------------- */
export const Ant_Mantine_스프린트_계획_달력: Story = {
  name: 'Ant Design + Mantine - 팀 스프린트 계획 달력',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design 이벤트 마킹 + Mantine DateRangePicker 아이디어를 결합한 스프린트 계획 달력. ' +
          '스프린트 기간을 범위로 선택하고 팀원 업무를 날짜별로 표시합니다.',
      },
    },
  },
  render: function Render() {
    const today = new Date()
    const [range, setRange] = React.useState<{ from: Date; to?: Date }>({
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13),
    })

    const sprintDays = range.from && range.to
      ? Math.ceil((range.to.getTime() - range.from.getTime()) / 86400000) + 1
      : 0

    const members = [
      { name: '김민준', role: 'Frontend', color: '#6366f1', tasks: 5 },
      { name: '이서연', role: 'Backend', color: '#10b981', tasks: 4 },
      { name: '박준혁', role: 'Design', color: '#f59e0b', tasks: 3 },
      { name: '최유진', role: 'QA', color: '#ef4444', tasks: 6 },
    ]

    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Calendar
          mode="range"
          selected={range}
          onSelect={(r) => r?.from && setRange({ from: r.from, to: r.to })}
          numberOfMonths={1}
        />
        <div style={{ minWidth: 240 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>스프린트 기간</div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
            {range.from?.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ~{' '}
            {range.to?.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}{' '}
            <span style={{ color: '#6366f1', fontWeight: 700 }}>({sprintDays}일)</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>팀원 배정</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {members.map((m) => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {m.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{m.role} · {m.tasks}개 태스크</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: `${m.color}18`, color: m.color }}>
                  {Math.round(m.tasks / sprintDays * 10) / 10}/일
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b' }}>
            총 {members.reduce((s, m) => s + m.tasks, 0)}개 태스크 · {members.length}명 배정
          </div>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui — 날짜 범위 선택 (여행 일정 예약)
-------------------------------------------------------------------------- */
export const Shadcn_날짜_범위_예약: Story = {
  name: 'shadcn/ui — 날짜 범위 선택 (여행 일정 예약)',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui DateRangePicker 패턴. 체크인/체크아웃 날짜를 순차적으로 선택. 선택된 범위의 박 수와 예상 금액을 실시간으로 계산. 숙박/예약 폼에서 활용.',
      },
    },
  },
  render: function Render() {
    const [checkIn, setCheckIn] = React.useState<Date | undefined>()
    const [checkOut, setCheckOut] = React.useState<Date | undefined>()
    const [step, setStep] = React.useState<'checkin' | 'checkout'>('checkin')

    const handleSelect = (date: Date | undefined) => {
      if (step === 'checkin') {
        setCheckIn(date)
        setCheckOut(undefined)
        setStep('checkout')
      } else {
        if (date && checkIn && date <= checkIn) {
          setCheckIn(date)
          setCheckOut(undefined)
          setStep('checkout')
        } else {
          setCheckOut(date)
        }
      }
    }

    const nights = checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0
    const pricePerNight = 89000

    return (
      <div style={{ maxWidth: 520, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: `2px solid ${step === 'checkin' ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`, cursor: 'pointer', background: step === 'checkin' ? 'var(--sem-eclipse-color-fillPrimarySubtle)' : 'transparent' }} onClick={() => setStep('checkin')}>
            <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2 }}>체크인</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{checkIn ? checkIn.toLocaleDateString('ko-KR') : '날짜 선택'}</p>
          </div>
          <div style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: `2px solid ${step === 'checkout' ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`, cursor: 'pointer', background: step === 'checkout' ? 'var(--sem-eclipse-color-fillPrimarySubtle)' : 'transparent' }} onClick={() => checkIn && setStep('checkout')}>
            <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2 }}>체크아웃</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{checkOut ? checkOut.toLocaleDateString('ko-KR') : '날짜 선택'}</p>
          </div>
        </div>
        <Calendar mode="single" selected={step === 'checkin' ? checkIn : checkOut} onSelect={handleSelect} />
        {nights > 0 && (
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 8, background: 'var(--sem-eclipse-color-surfaceSubtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>₩{pricePerNight.toLocaleString()} x {nights}박</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>₩{(pricePerNight * nights).toLocaleString()}</span>
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear Design — 마일스톤 일정 계획 달력 (목표일 설정)
-------------------------------------------------------------------------- */
export const Linear_마일스톤_일정_계획: Story = {
  name: 'Linear Design — 마일스톤 일정 계획 달력 (목표일 설정)',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 마일스톤 due date 선택 패턴. 오늘 이전 날짜 선택 방지, 마일스톤 색상 구분, 남은 일수 표시. 프로젝트 플래닝 UI에서 활용.',
      },
    },
  },
  render: function Render() {
    const today = new Date()
    const [milestones, setMilestones] = React.useState([
      { id: 1, name: 'Alpha 출시', date: undefined as Date | undefined, color: '#6366f1' },
      { id: 2, name: 'Beta 출시', date: undefined as Date | undefined, color: '#0ea5e9' },
      { id: 3, name: 'v1.0 정식 출시', date: undefined as Date | undefined, color: '#10b981' },
    ])
    const [activeId, setActiveId] = React.useState(1)
    const active = milestones.find((m) => m.id === activeId)!

    const daysUntil = (date: Date | undefined) => {
      if (!date) return null
      const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return diff
    }

    const handleDateSelect = (date: Date | undefined) => {
      if (date && date < today) return
      setMilestones((prev) => prev.map((m) => m.id === activeId ? { ...m, date } : m))
    }

    return (
      <div style={{ maxWidth: 480, fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 12 }}>마일스톤 일정 설정</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
          {milestones.map((m) => {
            const days = daysUntil(m.date)
            return (
              <div key={m.id} onClick={() => setActiveId(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: `2px solid ${activeId === m.id ? m.color : 'var(--sem-eclipse-color-borderSubtle)'}`, background: activeId === m.id ? `${m.color}10` : 'var(--sem-eclipse-color-surfaceDefault)', cursor: 'pointer', transition: 'all 0.15s' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{m.name}</span>
                {m.date ? (
                  <span style={{ fontSize: 11, color: m.color, fontWeight: 600 }}>
                    {days !== null && days >= 0 ? `D-${days}` : '기한 초과'}
                  </span>
                ) : (
                  <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>미설정</span>
                )}
                {m.date && <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{m.date.toLocaleDateString('ko-KR')}</span>}
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: 11, color: active.color, fontWeight: 600, marginBottom: 6 }}>▸ {active.name} 목표일 선택</p>
        <Calendar mode="single" selected={active.date} onSelect={handleDateSelect} disabled={{ before: today }} />
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui + Linear — 반복 이벤트 스케줄러
-------------------------------------------------------------------------- */
export const Shadcn_Linear_반복_이벤트_스케줄러: Story = {
  name: 'shadcn/ui + Linear — 반복 이벤트 스케줄러',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui DatePicker + Linear 반복 설정 패턴. 날짜 선택 후 반복 주기(없음/매일/매주/매월)와 종료 조건을 설정. 캘린더 앱 이벤트 생성 폼 패턴.',
      },
    },
  },
  render: function Render() {
    const [startDate, setStartDate] = React.useState<Date | undefined>()
    const [repeat, setRepeat] = React.useState<'none' | 'daily' | 'weekly' | 'monthly'>('none')
    const [saved, setSaved] = React.useState(false)

    const repeatLabels = { none: '반복 없음', daily: '매일', weekly: '매주', monthly: '매월' }

    const handleSave = () => {
      if (startDate) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      }
    }

    return (
      <div style={{ maxWidth: 460, fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 14 }}>이벤트 스케줄 설정</p>
        <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
        <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['none', 'daily', 'weekly', 'monthly'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRepeat(r)}
              style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: `1px solid ${repeat === r ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)'}`, background: repeat === r ? 'var(--sem-eclipse-color-fillPrimarySubtle)' : 'transparent', color: repeat === r ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-foregroundSecondary)', cursor: 'pointer', fontWeight: repeat === r ? 600 : 400, transition: 'all 0.15s' }}
            >
              {repeatLabels[r]}
            </button>
          ))}
        </div>
        {startDate && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-surfaceSubtle)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
            {startDate.toLocaleDateString('ko-KR')} 시작
            {repeat !== 'none' && ` · ${repeatLabels[repeat]} 반복`}
          </div>
        )}
        <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => { setStartDate(undefined); setRepeat('none') }} style={{ fontSize: 12, padding: '7px 14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'transparent', color: 'var(--sem-eclipse-color-foregroundSecondary)', cursor: 'pointer' }}>초기화</button>
          <button onClick={handleSave} disabled={!startDate} style={{ fontSize: 12, padding: '7px 14px', borderRadius: 8, border: 'none', background: startDate ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)', color: '#fff', cursor: startDate ? 'pointer' : 'not-allowed', fontWeight: 600, transition: 'all 0.15s' }}>
            {saved ? '저장 완료!' : '일정 저장'}
          </button>
        </div>
      </div>
    )
  },
}

// ──────────────────────────────────────────────────────────────────────────────
// Cycle 176: Chakra UI + Arco Design
// ──────────────────────────────────────────────────────────────────────────────

export const Chakra_생일_기념일_달력: Story = {
  name: 'Chakra UI — 생일/기념일 마킹 달력 (이벤트 하이라이트)',
  render: function ChakraBirthdayCalendarRender() {
    const today = new Date()
    const [selected, setSelected] = React.useState<Date | undefined>(undefined)
    const anniversaries = [3, 8, 14, 21, 28].map((d) => new Date(today.getFullYear(), today.getMonth(), d))
    const birthdays = [5, 12, 19, 26].map((d) => new Date(today.getFullYear(), today.getMonth(), d))

    const isAnniversary = (d: Date) => anniversaries.some((a) => a.toDateString() === d.toDateString())
    const isBirthday = (d: Date) => birthdays.some((b) => b.toDateString() === d.toDateString())

    const selectedLabel = selected
      ? isAnniversary(selected) ? '기념일' : isBirthday(selected) ? '생일' : '일반 날짜'
      : '날짜를 선택하세요'

    return (
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiers={{ anniversary: anniversaries, birthday: birthdays }}
          modifiersStyles={{
            anniversary: { background: '#fef3c720', border: '2px solid #f59e0b', borderRadius: 4 },
            birthday: { background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: 4 },
          }}
        />
        <div style={{ width: 180, background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)', padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>범례</div>
          {[{ color: '#f59e0b', bg: '#fef3c7', label: '기념일' }, { color: '#3b82f6', bg: '#eff6ff', label: '생일' }].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: item.bg, border: `2px solid ${item.color}` }} />
              <span style={{ fontSize: 12, color: '#64748b' }}>{item.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 7, background: '#fff', border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)' }}>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>선택:</div>
            <div style={{ fontSize: 12, color: '#0f172a', fontWeight: 600, marginTop: 2 }}>{selected?.toLocaleDateString('ko-KR') ?? '—'}</div>
            <div style={{ fontSize: 11, color: selected ? (isAnniversary(selected) ? '#f59e0b' : isBirthday(selected) ? '#3b82f6' : '#64748b') : '#94a3b8' }}>{selectedLabel}</div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI date picker 이벤트 마킹 패턴. 기념일(주황)/생일(파랑) 날짜 custom modifier로 하이라이트. 선택 날짜 이벤트 타입 자동 분류.',
      },
    },
  },
}

export const Arco_다중_달력_비교_뷰: Story = {
  name: 'Arco Design — 이전/다음 월 비교 달력 (기간 선택)',
  render: function ArcoRangeCalendarRender() {
    const [range, setRange] = React.useState<{ from?: Date; to?: Date }>({})
    const now = new Date()
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const handleSelect = (d: Date | undefined) => {
      if (!d) return
      if (!range.from || (range.from && range.to)) {
        setRange({ from: d, to: undefined })
      } else {
        const [start, end] = d < range.from ? [d, range.from] : [range.from, d]
        setRange({ from: start, to: end })
      }
    }

    const daysBetween = range.from && range.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000)
      : 0

    return (
      <div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Calendar
            mode="single"
            selected={range.from}
            onSelect={handleSelect}
            defaultMonth={prevMonth}
            modifiers={range.from && range.to
              ? { inRange: { from: range.from, to: range.to } }
              : undefined
            }
          />
          <Calendar
            mode="single"
            selected={range.to}
            onSelect={handleSelect}
            defaultMonth={nextMonth}
          />
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)', display: 'flex', gap: 16, fontSize: 12 }}>
          <div><span style={{ color: '#94a3b8' }}>시작:</span> <strong>{range.from?.toLocaleDateString('ko-KR') ?? '—'}</strong></div>
          <div><span style={{ color: '#94a3b8' }}>종료:</span> <strong>{range.to?.toLocaleDateString('ko-KR') ?? '—'}</strong></div>
          {daysBetween > 0 && <div style={{ color: '#6366f1', fontWeight: 700 }}>{daysBetween}일 선택됨</div>}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Arco Design 이중 달력 범위 선택 패턴. 이전월/다음월 나란히 표시, 클릭 두 번으로 시작-종료 날짜 설정, 선택 기간 일수 자동 계산.',
      },
    },
  },
}

export const Chakra_Arco_예약_일정_달력: Story = {
  name: 'Chakra + Arco — 예약/일정 달력 (불가 날짜 + 카운트 표시)',
  render: function ChakraArcoBookingCalendarRender() {
    const today = new Date()
    const [selected, setSelected] = React.useState<Date | undefined>(undefined)

    const bookedDates = [2, 5, 9, 13, 16, 22, 27].map(
      (d) => new Date(today.getFullYear(), today.getMonth(), d)
    )
    const unavailableDates = [1, 6, 7, 14, 15, 20, 21, 28].map(
      (d) => new Date(today.getFullYear(), today.getMonth(), d)
    )
    const highDemandDates = [10, 11, 17, 18, 24, 25].map(
      (d) => new Date(today.getFullYear(), today.getMonth(), d)
    )

    const isBooked = (d: Date) => bookedDates.some((b) => b.toDateString() === d.toDateString())
    const _isUnavailable = (d: Date) => unavailableDates.some((u) => u.toDateString() === d.toDateString())
    const isHighDemand = (d: Date) => highDemandDates.some((h) => h.toDateString() === d.toDateString())

    const available = 31 - bookedDates.length - unavailableDates.length - highDemandDates.length

    return (
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabled={unavailableDates}
          modifiers={{ booked: bookedDates, highDemand: highDemandDates }}
          modifiersStyles={{
            booked: { background: '#dcfce7', color: '#16a34a', fontWeight: 700 },
            highDemand: { background: '#fef3c7', color: '#92400e' },
          }}
        />
        <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { color: '#16a34a', bg: '#dcfce7', label: '예약 가능', count: bookedDates.length },
            { color: '#92400e', bg: '#fef3c7', label: '인기', count: highDemandDates.length },
            { color: '#94a3b8', bg: '#f1f5f9', label: '이용 불가', count: unavailableDates.length },
            { color: '#6366f1', bg: '#eff6ff', label: '잔여 가능', count: available },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: item.bg, border: `1px solid ${item.color}30` }}>
              <div style={{ flex: 1, fontSize: 12, color: '#475569' }}>{item.label}</div>
              <span style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.count}</span>
            </div>
          ))}
          {selected && (
            <div style={{ marginTop: 4, padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>선택 날짜</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{selected.toLocaleDateString('ko-KR')}</div>
              <div style={{ fontSize: 11, color: isBooked(selected) ? '#16a34a' : isHighDemand(selected) ? '#f59e0b' : '#64748b', marginTop: 2 }}>
                {isBooked(selected) ? '예약 가능' : isHighDemand(selected) ? '인기 날짜' : '일반'}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI + Arco Design 예약 달력 패턴. 예약 가능(초록)/인기(노랑)/불가(회색) 3상태 modifier 적용. 날짜 유형별 카운트 사이드 패널 표시.',
      },
    },
  },
}
