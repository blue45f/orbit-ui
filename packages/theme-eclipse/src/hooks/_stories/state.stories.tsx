import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import {
  useArray,
  useControllableState,
  useCounter,
  useDisclosure,
  useMap,
  useObjectState,
  usePagination,
  useQueue,
  useSet,
  useStateHistory,
  useStep,
  useToggle,
  useUncontrolled,
  useUndoable,
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
        isOpen:{' '}
        <strong style={{ color: isOpen ? 'rgb(0, 132, 77)' : 'rgb(187, 37, 35)' }}>
          {String(isOpen)}
        </strong>
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
    <Panel title="useCounter" signature="useCounter({ initial: 1, min: 0, max: 5, step: 1 })">
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
    <Panel
      title="useStep"
      signature="useStep({ total: 4 }) · step.next() · step.prev() · step.goTo(n)"
    >
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
              background: step.current === i + 1 ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
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

/* useStateHistory ----------------------------------------- */
function StateHistoryDemo() {
  const { state, set, undo, redo, reset, canUndo, canRedo, index, length } =
    useStateHistory('hello, world')
  return (
    <Panel
      title="useStateHistory"
      signature="const { state, set, undo, redo, canUndo, canRedo } = useStateHistory(initial)"
    >
      <textarea
        value={state}
        onChange={(e) => set(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 12,
          borderRadius: 8,
          border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
          fontFamily: 'inherit',
          fontSize: 14,
          lineHeight: 1.55,
          resize: 'vertical',
        }}
      />
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        <button
          type="button"
          disabled={!canUndo}
          onClick={() => undo()}
          style={{
            height: 30,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: canUndo
              ? 'var(--orbit-ink, rgb(24,26,28))'
              : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
            fontFamily: 'inherit',
            fontSize: 12.5,
            fontWeight: 600,
            cursor: canUndo ? 'pointer' : 'not-allowed',
          }}
        >
          ⌫ Undo
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={() => redo()}
          style={{
            height: 30,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: canRedo
              ? 'var(--orbit-ink, rgb(24,26,28))'
              : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
            fontFamily: 'inherit',
            fontSize: 12.5,
            fontWeight: 600,
            cursor: canRedo ? 'pointer' : 'not-allowed',
          }}
        >
          Redo ⤴
        </button>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            height: 30,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontSize: 12.5,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Clear history
        </button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        index: <strong>{index}</strong> / {length - 1} · canUndo: <strong>{String(canUndo)}</strong>{' '}
        · canRedo: <strong>{String(canRedo)}</strong>
      </div>
    </Panel>
  )
}
export const StateHistory: Story = { render: () => <StateHistoryDemo /> }

/* useUncontrolled ----------------------------------------- */
function UncontrolledChip({
  selected: selectedProp,
  defaultSelected,
  onChange,
  label,
}: {
  selected?: string
  defaultSelected?: string
  onChange?: (value: string) => void
  label: string
}) {
  const [selected, setSelected, isControlled] = useUncontrolled<string>({
    value: selectedProp,
    defaultValue: defaultSelected,
    finalValue: 'apple',
    onChange,
  })

  return (
    <div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}
      >
        {label} ({isControlled ? 'controlled' : 'uncontrolled'})
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
        {(['apple', 'banana', 'cherry'] as const).map((opt) => (
          <Tag key={opt} active={selected === opt} onClick={() => setSelected(opt)}>
            {opt}
          </Tag>
        ))}
      </div>
    </div>
  )
}

function UncontrolledDemo() {
  const [controlled, setControlled] = useState<string>('banana')
  return (
    <Panel
      title="useUncontrolled"
      signature="const [value, setValue, isControlled] = useUncontrolled({ value, defaultValue, onChange })"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 14 }}>
        <UncontrolledChip label="Uncontrolled (defaultSelected=apple)" defaultSelected="apple" />
        <UncontrolledChip
          label="Controlled by parent"
          selected={controlled}
          onChange={setControlled}
        />
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        같은 컴포넌트가 controlled/uncontrolled 양쪽에서 그대로 동작합니다. 부모는 어느 쪽이든
        onChange로 변화 관찰 가능.
      </div>
    </Panel>
  )
}
export const Uncontrolled: Story = { render: () => <UncontrolledDemo /> }

/* usePagination ------------------------------------------- */
function PaginationDemo() {
  const { page, total, items, prev, next, setPage, isFirst, isLast } = usePagination({
    total: 20,
    initialPage: 1,
    siblings: 1,
  })
  return (
    <Panel
      title="usePagination"
      signature="const { page, items, next, prev, setPage } = usePagination({ total, siblings })"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={prev}
          disabled={isFirst}
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: isFirst
              ? 'var(--orbit-ink-4, rgba(24,26,28,0.33))'
              : 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: isFirst ? 'not-allowed' : 'pointer',
          }}
        >
          ‹ 이전
        </button>

        {items.map((item, idx) =>
          item.type === 'ellipsis' ? (
            <span
              key={item.key}
              style={{
                width: 32,
                textAlign: 'center',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
              }}
            >
              …
            </span>
          ) : (
            <button
              key={`${item.value}-${idx}`}
              type="button"
              onClick={() => setPage(item.value)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: item.isActive
                  ? '1px solid transparent'
                  : '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
                background: item.isActive ? 'rgb(37, 99, 235)' : 'transparent',
                color: item.isActive ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: item.isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'background-color 120ms',
              }}
            >
              {item.value}
            </button>
          )
        )}

        <button
          type="button"
          onClick={next}
          disabled={isLast}
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: isLast
              ? 'var(--orbit-ink-4, rgba(24,26,28,0.33))'
              : 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: isLast ? 'not-allowed' : 'pointer',
          }}
        >
          다음 ›
        </button>
      </div>

      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        page: <strong>{page}</strong> / {total} · isFirst: <strong>{String(isFirst)}</strong> ·
        isLast: <strong>{String(isLast)}</strong>
      </div>
    </Panel>
  )
}
export const Pagination: Story = { render: () => <PaginationDemo /> }

/* ============================================================ */
/* useQueue                                                     */
/* ============================================================ */
function QueueDemo() {
  const { queue, enqueue, dequeue, peek, clear, size, isEmpty } = useQueue<string>([])
  const [input, setInput] = useState('')

  const handleEnqueue = () => {
    if (!input.trim()) return
    enqueue(input.trim())
    setInput('')
  }

  return (
    <Panel
      title="useQueue"
      signature="const { queue, enqueue, dequeue, peek, size, isEmpty } = useQueue<T>()"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
          placeholder="항목 입력..."
          style={{
            flex: 1,
            height: 36,
            padding: '0 12px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 13,
          }}
        />
        <Button onClick={handleEnqueue}>Enqueue</Button>
        <Button variant="outline" onClick={dequeue} disabled={isEmpty}>
          Dequeue
        </Button>
        <Button variant="ghost" onClick={clear} disabled={isEmpty}>
          Clear
        </Button>
      </div>

      <div
        style={{
          minHeight: 60,
          padding: 12,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          marginBottom: 10,
        }}
      >
        {isEmpty ? (
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
            }}
          >
            (비어 있음)
          </span>
        ) : (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {queue.map((item, i) => (
              <span
                key={`${item}-${i}`}
                style={{
                  height: 26,
                  padding: '0 12px',
                  borderRadius: 999,
                  background:
                    i === 0 ? 'rgb(37, 99, 235)' : 'var(--orbit-line, rgba(24,26,28,0.08))',
                  color: i === 0 ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i === 0 && <span style={{ marginRight: 4, fontSize: 10 }}>HEAD</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        size: <strong>{size}</strong> · isEmpty: <strong>{String(isEmpty)}</strong>
        {!isEmpty && (
          <>
            {' '}
            · peek: <strong>&quot;{peek()}&quot;</strong>
          </>
        )}
      </div>
    </Panel>
  )
}
export const Queue: Story = { render: () => <QueueDemo /> }

/* ============================================================ */
/* useControllableState                                         */
/* ============================================================ */
function ControllableStateDemo() {
  const [externalState, setExternalState] = useState(false)

  // Uncontrolled instance — no value prop, only defaultValue
  const [uncontrolledValue, setUncontrolled] = useControllableState<boolean>({
    defaultValue: false,
  })

  // Controlled instance — value driven by externalState
  const [controlledValue, setControlled] = useControllableState<boolean>({
    value: externalState,
    onChange: setExternalState,
  })

  return (
    <Panel
      title="useControllableState"
      signature="const [value, setValue] = useControllableState({ value?, defaultValue?, onChange? })"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 14 }}>
        {/* Uncontrolled */}
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          }}
        >
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 8,
            }}
          >
            Uncontrolled (defaultValue=false)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button onClick={() => setUncontrolled(!uncontrolledValue)}>Toggle</Button>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                fontWeight: 600,
                color: uncontrolledValue ? 'rgb(0, 132, 77)' : 'rgb(187, 37, 35)',
              }}
            >
              value: {String(uncontrolledValue)}
            </span>
          </div>
        </div>

        {/* Controlled */}
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          }}
        >
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 8,
            }}
          >
            Controlled (value=externalState)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button onClick={() => setControlled(!controlledValue)}>Toggle via hook</Button>
            <Button variant="outline" onClick={() => setExternalState((prev) => !prev)}>
              Toggle external
            </Button>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                fontWeight: 600,
                color: controlledValue ? 'rgb(0, 132, 77)' : 'rgb(187, 37, 35)',
              }}
            >
              value: {String(controlledValue)}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        externalState: <strong>{String(externalState)}</strong>
      </div>
    </Panel>
  )
}
export const ControllableState: Story = { render: () => <ControllableStateDemo /> }

/* ============================================================ */
/* useObjectState                                                */
/* ============================================================ */
function ObjectStateDemo() {
  const [form, setForm, resetForm] = useObjectState({ name: '', age: 0, active: true })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 38,
    padding: '0 12px',
    borderRadius: 8,
    border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
    fontFamily: 'inherit',
    fontSize: 14,
    background: 'var(--orbit-surface, rgb(255,255,255))',
    color: 'var(--orbit-ink, rgb(24,26,28))',
    boxSizing: 'border-box',
  }

  return (
    <Panel
      title="useObjectState"
      signature="const [state, setState, reset] = useObjectState({ name, age, active })"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
              marginBottom: 4,
            }}
          >
            name
          </div>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
              marginBottom: 4,
            }}
          >
            age
          </div>
          <input
            type="number"
            min={0}
            max={150}
            value={form.age}
            onChange={(e) => setForm({ age: Number(e.target.value) })}
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            }}
          >
            active
          </div>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ active: e.target.checked })}
            style={{ accentColor: 'rgb(37, 99, 235)', width: 16, height: 16 }}
          />
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: form.active ? 'rgb(0, 132, 77)' : 'rgb(187, 37, 35)',
            }}
          >
            {String(form.active)}
          </span>
        </div>
        <Button variant="outline" onClick={resetForm}>
          Reset
        </Button>
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          lineHeight: 1.7,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          wordBreak: 'break-all',
        }}
      >
        {JSON.stringify(form, null, 2)}
      </div>
    </Panel>
  )
}
export const ObjectState: Story = { render: () => <ObjectStateDemo /> }

/* ============================================================ */
/* useUndoable                                                   */
/* ============================================================ */
function UndoableDemo() {
  const { value, set, undo, redo, canUndo, canRedo, history, future } = useUndoable('')

  return (
    <Panel
      title="useUndoable"
      signature="const { value, set, undo, redo, canUndo, canRedo } = useUndoable(initial)"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder="타이핑하면 history에 쌓입니다..."
        style={{
          width: '100%',
          height: 38,
          padding: '0 12px',
          borderRadius: 8,
          border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
          fontFamily: 'inherit',
          fontSize: 14,
          marginBottom: 12,
          background: 'var(--orbit-surface, rgb(255,255,255))',
          color: 'var(--orbit-ink, rgb(24,26,28))',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          disabled={!canUndo}
          onClick={undo}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: canUndo
              ? 'var(--orbit-ink, rgb(24,26,28))'
              : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: canUndo ? 'pointer' : 'not-allowed',
          }}
        >
          ⌫ Undo
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={redo}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: canRedo
              ? 'var(--orbit-ink, rgb(24,26,28))'
              : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: canRedo ? 'pointer' : 'not-allowed',
          }}
        >
          Redo ⤴
        </button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.8,
        }}
      >
        <div>
          value: <strong>&quot;{value}&quot;</strong>
        </div>
        <div>
          history.length: <strong>{history.length}</strong> · future.length:{' '}
          <strong>{future.length}</strong>
        </div>
        <div>
          canUndo: <strong>{String(canUndo)}</strong> · canRedo: <strong>{String(canRedo)}</strong>
        </div>
      </div>
    </Panel>
  )
}
export const Undoable: Story = { render: () => <UndoableDemo /> }
