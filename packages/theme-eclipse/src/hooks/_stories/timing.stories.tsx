import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import {
  useDebounce,
  useInterval,
  useLatest,
  usePrevious,
  useThrottle,
  useTimeout,
} from '../index'

const meta = {
  title: 'Hooks/Timing',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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
    <div style={{ fontSize: 18, fontWeight: 660, letterSpacing: '-0.015em', marginBottom: 6 }}>
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 38,
  padding: '0 12px',
  borderRadius: 8,
  border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
  fontFamily: 'inherit',
  fontSize: 14,
}

const Readout = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: 10,
      padding: '6px 0',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 12,
      borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
    }}
  >
    <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>{label}</span>
    <span style={{ color: 'var(--orbit-ink, rgb(24,26,28))', fontWeight: 600 }}>{value}</span>
  </div>
)

/* useDebounce ----------------------------------------------- */
function DebounceDemo() {
  const [raw, setRaw] = useState('')
  const debounced = useDebounce(raw, 300)
  const fireCountRef = useRef(0)
  const [fires, setFires] = useState(0)
  useEffect(() => {
    fireCountRef.current += 1
    setFires(fireCountRef.current)
  }, [debounced])
  return (
    <Panel title="useDebounce" signature="useDebounce(value, 300)">
      <input
        type="text"
        placeholder="빠르게 입력해 보세요"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        style={{ ...inputStyle, marginBottom: 14 }}
      />
      <Readout label="raw" value={raw || '(empty)'} />
      <Readout label="debounced" value={debounced || '(empty)'} />
      <Readout label="effect fires" value={fires} />
    </Panel>
  )
}
export const Debounce: Story = { render: () => <DebounceDemo /> }

/* useThrottle ----------------------------------------------- */
function ThrottleDemo() {
  const [raw, setRaw] = useState(0)
  const throttled = useThrottle(raw, 200)
  return (
    <Panel title="useThrottle" signature="useThrottle(value, 200)">
      <input
        type="range"
        min={0}
        max={100}
        value={raw}
        onChange={(e) => setRaw(Number(e.target.value))}
        style={{ width: '100%', marginBottom: 14, accentColor: 'rgb(37, 99, 235)' }}
      />
      <Readout label="raw" value={raw} />
      <Readout label="throttled" value={throttled} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        값이 변하는 동안 throttled는 최대 200ms마다 1회 갱신, 마지막은 trailing call로 보존됩니다.
      </div>
    </Panel>
  )
}
export const Throttle: Story = { render: () => <ThrottleDemo /> }

/* useTimeout ------------------------------------------------ */
function TimeoutDemo() {
  const [armed, setArmed] = useState(false)
  const [fired, setFired] = useState(false)
  useTimeout(
    () => setFired(true),
    armed ? 1500 : null,
  )
  return (
    <Panel title="useTimeout" signature="useTimeout(callback, delay | null)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => {
            setFired(false)
            setArmed(true)
          }}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 8,
            background: 'rgb(37, 99, 235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          1500ms 후 fire
        </button>
        <button
          type="button"
          onClick={() => {
            setArmed(false)
            setFired(false)
          }}
          style={{
            height: 34,
            padding: '0 14px',
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            borderRadius: 8,
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      <Readout label="armed" value={String(armed)} />
      <Readout label="fired" value={fired ? '🎉 fired' : '⏳ waiting'} />
    </Panel>
  )
}
export const Timeout: Story = { render: () => <TimeoutDemo /> }

/* useInterval ----------------------------------------------- */
function IntervalDemo() {
  const [running, setRunning] = useState(true)
  const [count, setCount] = useState(0)
  useInterval(() => setCount((c) => c + 1), running ? 1000 : null)
  return (
    <Panel title="useInterval" signature="useInterval(callback, delay | null)">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 32,
            fontWeight: 660,
            minWidth: 80,
          }}
        >
          {count}s
        </div>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 8,
            background: running ? 'rgb(187, 37, 35)' : 'rgb(0, 132, 77)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          {running ? 'Pause' : 'Resume'}
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          style={{
            height: 34,
            padding: '0 14px',
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            borderRadius: 8,
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      <Readout label="delay" value={running ? '1000ms' : 'null (paused)'} />
    </Panel>
  )
}
export const Interval: Story = { render: () => <IntervalDemo /> }

/* usePrevious ----------------------------------------------- */
function PreviousDemo() {
  const [value, setValue] = useState(0)
  const prev = usePrevious(value)
  return (
    <Panel title="usePrevious" signature="const prev = usePrevious(value)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => setValue((v) => v + 1)}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 8,
            background: 'rgb(37, 99, 235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => setValue((v) => v + 5)}
          style={{
            height: 34,
            padding: '0 14px',
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            borderRadius: 8,
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          +5
        </button>
      </div>
      <Readout label="current" value={value} />
      <Readout label="previous" value={prev === undefined ? '(undefined)' : prev} />
      <Readout
        label="diff"
        value={prev === undefined ? '(initial)' : value - prev}
      />
    </Panel>
  )
}
export const Previous: Story = { render: () => <PreviousDemo /> }

/* useLatest ------------------------------------------------- */
function LatestDemo() {
  const [count, setCount] = useState(0)
  const latest = useLatest(count)
  const [staleLog, setStaleLog] = useState('(not yet)')
  const [freshLog, setFreshLog] = useState('(not yet)')

  useEffect(() => {
    // Stale: closure captures count=0 at mount
    const stale = () => setStaleLog(`stale closure said: ${count}`)
    // Fresh: read via latest ref
    const fresh = () => setFreshLog(`latest ref said: ${latest.current}`)
    const id = window.setTimeout(() => {
      stale()
      fresh()
    }, 1000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Panel title="useLatest" signature="const latest = useLatest(value)">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 8,
            background: 'rgb(37, 99, 235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          count++
        </button>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14 }}>
          current: <strong>{count}</strong>
        </div>
      </div>
      <Readout label="effect" value="ran once at mount, timer fires 1s later" />
      <Readout label="stale closure" value={staleLog} />
      <Readout label="latest ref" value={freshLog} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.5,
        }}
      >
        count을 빠르게 올린 뒤 1초 기다리세요. stale closure는 마운트 시점 값(0)을, latest ref는 최신 값을
        가리킵니다.
      </div>
    </Panel>
  )
}
export const Latest: Story = { render: () => <LatestDemo /> }
