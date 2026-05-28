import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import {
  useArray,
  useCounter,
  useDisclosure,
  useMap,
  useSet,
  useStep,
  useToggle,
} from '../index'

const meta = {
  title: 'Hooks/State',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const Panel = ({
  title,
  signature,
  children,
}: {
  title: string
  signature: string
  children: React.ReactNode
}) => (
  <div
    style={{
      width: 520,
      padding: 24,
      border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
      borderRadius: 14,
      background: 'var(--orbit-surface, rgb(255,255,255))',
      color: 'var(--orbit-ink, rgb(24,26,28))',
      fontFamily: '"Pretendard Variable", "Pretendard", system-ui, sans-serif',
    }}
  >
    <div
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 4,
      }}
    >
      Live demo
    </div>
    <div
      style={{
        fontSize: 18,
        fontWeight: 660,
        letterSpacing: '-0.015em',
        marginBottom: 6,
      }}
    >
      {title}
    </div>
    <code
      style={{
        display: 'block',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
        color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        marginBottom: 18,
      }}
    >
      {signature}
    </code>
    {children}
  </div>
)

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  disabled?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    style={{
      height: 34,
      padding: '0 14px',
      borderRadius: 8,
      border:
        variant === 'outline'
          ? '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))'
          : '1px solid transparent',
      background:
        variant === 'primary'
          ? 'rgb(37, 99, 235)'
          : variant === 'outline'
            ? 'transparent'
            : 'transparent',
      color: variant === 'primary' ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 160ms cubic-bezier(0.2,0,0,1)',
    }}
  >
    {children}
  </button>
)

const Tag = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      height: 26,
      padding: '0 12px',
      borderRadius: 999,
      border: active ? '1px solid transparent' : '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
      background: active ? 'rgb(24, 26, 28)' : 'transparent',
      color: active ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
      fontFamily: 'inherit',
      fontSize: 12.5,
      fontWeight: 500,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

/* ============================================================ */
/* useDisclosure                                                */
/* ============================================================ */
function DisclosureDemo() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <Panel
      title="useDisclosure"
      signature="const { isOpen, onOpen, onClose, onToggle } = useDisclosure()"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button onClick={onOpen}>Open</Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="ghost" onClick={onToggle}>
          Toggle
        </Button>
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
        }}
      >
        isOpen: <strong style={{ color: isOpen ? 'rgb(0, 132, 77)' : 'rgb(187, 37, 35)' }}>{String(isOpen)}</strong>
      </div>
    </Panel>
  )
}
export const Disclosure: Story = { render: () => <DisclosureDemo /> }

/* ============================================================ */
/* useToggle                                                    */
/* ============================================================ */
function ToggleDemo() {
  const [expanded, toggle] = useToggle(false)
  return (
    <Panel title="useToggle" signature="const [value, toggle] = useToggle(initial)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button onClick={() => toggle()}>Toggle</Button>
        <Button variant="outline" onClick={() => toggle(true)}>
          Force true
        </Button>
        <Button variant="ghost" onClick={() => toggle(false)}>
          Force false
        </Button>
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
        }}
      >
        expanded: <strong>{String(expanded)}</strong>
      </div>
    </Panel>
  )
}
export const Toggle: Story = { render: () => <ToggleDemo /> }

/* ============================================================ */
/* useCounter                                                   */
/* ============================================================ */
function CounterDemo() {
  const { count, increment, decrement, reset, isAtMin, isAtMax } = useCounter({
    initial: 1,
    min: 0,
    max: 5,
    step: 1,
  })
  return (
    <Panel
      title="useCounter"
      signature="useCounter({ initial: 1, min: 0, max: 5, step: 1 })"
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <Button variant="outline" onClick={decrement} disabled={isAtMin}>
          −
        </Button>
        <div
          style={{
            minWidth: 60,
            textAlign: 'center',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 24,
            fontWeight: 660,
          }}
        >
          {count}
        </div>
        <Button variant="outline" onClick={increment} disabled={isAtMax}>
          +
        </Button>
        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        isAtMin: <strong>{String(isAtMin)}</strong> · isAtMax: <strong>{String(isAtMax)}</strong>
      </div>
    </Panel>
  )
}
export const Counter: Story = { render: () => <CounterDemo /> }

/* ============================================================ */
/* useArray                                                     */
/* ============================================================ */
function ArrayDemo() {
  const filters = useArray<string>(['최근'])
  const all = ['최근', '내 글', '북마크', '댓글', '좋아요']
  return (
    <Panel title="useArray" signature="filters.toggle(item) · filters.clear() · filters.set([...])">
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {all.map((label) => (
          <Tag
            key={label}
            active={filters.items.includes(label)}
            onClick={() => filters.toggle(label)}
          >
            {label}
          </Tag>
        ))}
        <Button variant="ghost" onClick={() => filters.clear()}>
          Clear
        </Button>
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          lineHeight: 1.6,
        }}
      >
        items: [{filters.items.map((s) => `"${s}"`).join(', ')}]
      </div>
    </Panel>
  )
}
export const Array: Story = { render: () => <ArrayDemo /> }

/* ============================================================ */
/* useSet                                                       */
/* ============================================================ */
function SetDemo() {
  const selected = useSet<string>([])
  const rows = ['row-1', 'row-2', 'row-3', 'row-4']
  return (
    <Panel title="useSet" signature="selected.toggle(id) · selected.has(id) · selected.clear()">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
        {rows.map((id) => (
          <label
            key={id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 8,
              background: selected.has(id)
                ? 'rgba(37, 99, 235, 0.08)'
                : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            <input
              type="checkbox"
              checked={selected.has(id)}
              onChange={() => selected.toggle(id)}
              style={{ accentColor: 'rgb(37, 99, 235)' }}
            />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{id}</span>
          </label>
        ))}
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        selected: <strong>{selected.set.size}</strong> of {rows.length}
      </div>
    </Panel>
  )
}
export const Set: Story = { render: () => <SetDemo /> }

/* ============================================================ */
/* useMap                                                       */
/* ============================================================ */
function MapDemo() {
  const errors = useMap<string, string>([])
  const [emailRaw, setEmail] = useState('')
  const [name, setName] = useState('')

  const validateEmail = (value: string) => {
    setEmail(value)
    if (!value) errors.set('email', '이메일을 입력해 주세요.')
    else if (!value.includes('@')) errors.set('email', '@가 빠진 형식입니다.')
    else errors.remove('email')
  }
  const validateName = (value: string) => {
    setName(value)
    if (!value) errors.set('name', '이름을 입력해 주세요.')
    else errors.remove('name')
  }

  const inputStyle = (key: string): React.CSSProperties => ({
    width: '100%',
    height: 38,
    padding: '0 12px',
    borderRadius: 8,
    border: errors.has(key)
      ? '1px solid rgb(255, 64, 62)'
      : '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
    fontFamily: 'inherit',
    fontSize: 14,
  })

  return (
    <Panel title="useMap" signature="errors.set(key, value) · errors.get(key) · errors.has(key)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
        <div>
          <input
            type="text"
            placeholder="이메일"
            value={emailRaw}
            onChange={(e) => validateEmail(e.target.value)}
            style={inputStyle('email')}
          />
          {errors.has('email') && (
            <div style={{ marginTop: 4, fontSize: 12, color: 'rgb(187, 37, 35)' }}>
              {errors.get('email')}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => validateName(e.target.value)}
            style={inputStyle('name')}
          />
          {errors.has('name') && (
            <div style={{ marginTop: 4, fontSize: 12, color: 'rgb(187, 37, 35)' }}>
              {errors.get('name')}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mons", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        errors.size: <strong>{errors.map.size}</strong>
      </div>
    </Panel>
  )
}
export const Map: Story = { render: () => <MapDemo /> }

/* ============================================================ */
/* useStep                                                      */
/* ============================================================ */
function StepDemo() {
  const step = useStep({ total: 4 })
  const labels = ['정보', '확인', '결제', '완료']
  return (
    <Panel title="useStep" signature="useStep({ total: 4 }) · step.next() · step.prev() · step.goTo(n)">
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          alignItems: 'center',
        }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => step.goTo(i + 1)}
            style={{
              height: 26,
              padding: '0 10px',
              borderRadius: 999,
              border:
                step.current === i + 1
                  ? '1px solid rgb(37, 99, 235)'
                  : '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
              background:
                step.current === i + 1 ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
              color:
                step.current === i + 1
                  ? 'rgb(37, 99, 235)'
                  : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>
      <div
        style={{
          height: 4,
          borderRadius: 2,
          background: 'var(--orbit-line, rgba(24,26,28,0.08))',
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${step.progress * 100}%`,
            background: 'rgb(37, 99, 235)',
            transition: 'width 200ms cubic-bezier(0.2,0,0,1)',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline" onClick={step.prev} disabled={step.isFirst}>
          이전
        </Button>
        <Button onClick={step.next} disabled={step.isLast && step.isCompleted}>
          {step.isLast ? '완료' : '다음'}
        </Button>
        <Button variant="ghost" onClick={step.reset}>
          Reset
        </Button>
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        step {step.current}/{step.total} · progress {Math.round(step.progress * 100)}%
        {step.isCompleted && ' · ✓ completed'}
      </div>
    </Panel>
  )
}
export const Step: Story = { render: () => <StepDemo /> }
