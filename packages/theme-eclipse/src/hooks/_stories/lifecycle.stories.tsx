import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { useIsMounted, useMount, useUnmount, useUpdateEffect } from '../index'

const meta = {
  title: 'Hooks/Lifecycle',
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

const Button = ({
  children,
  onClick,
  variant = 'primary',
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline'
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      height: 34,
      padding: '0 14px',
      borderRadius: 8,
      border:
        variant === 'outline' ? '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))' : 0,
      background: variant === 'primary' ? 'rgb(37, 99, 235)' : 'transparent',
      color: variant === 'primary' ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 600,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const LogList = ({ items }: { items: string[] }) => (
  <div
    style={{
      padding: 12,
      borderRadius: 8,
      background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11.5,
      lineHeight: 1.7,
      maxHeight: 180,
      overflow: 'auto',
      border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
    }}
  >
    {items.length === 0 ? (
      <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>(no entries)</span>
    ) : (
      items.map((line, i) => <div key={`${line}-${i}`}>{line}</div>)
    )}
  </div>
)

/* useMount -------------------------------------------------- */
function MountedChild({ id, log }: { id: number; log: (line: string) => void }) {
  useMount(() => {
    log(`mounted child #${id}`)
  })
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        background: 'rgba(37, 99, 235, 0.08)',
        color: 'rgb(37, 99, 235)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
      }}
    >
      child #{id} alive
    </div>
  )
}

function MountDemo() {
  const [counter, setCounter] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const log = (line: string) => setLogs((prev) => [...prev, `${new Date().toISOString().slice(11, 19)}  ${line}`])
  return (
    <Panel title="useMount" signature="useMount(() => { fireOnce() })">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button onClick={() => setCounter((c) => c + 1)}>Mount new child</Button>
        <Button variant="outline" onClick={() => setLogs([])}>
          Clear log
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {Array.from({ length: counter }).map((_, i) => (
          <MountedChild key={i} id={i + 1} log={log} />
        ))}
      </div>
      <LogList items={logs} />
    </Panel>
  )
}
export const Mount: Story = { render: () => <MountDemo /> }

/* useUnmount ----------------------------------------------- */
function UnmountChild({ log }: { log: (line: string) => void }) {
  useUnmount(() => {
    log('child unmounted')
  })
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        background: 'rgba(255, 132, 0, 0.1)',
        color: 'rgb(187, 69, 0)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
      }}
    >
      child rendered
    </div>
  )
}

function UnmountDemo() {
  const [show, setShow] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const log = (line: string) => setLogs((prev) => [...prev, `${new Date().toISOString().slice(11, 19)}  ${line}`])
  return (
    <Panel title="useUnmount" signature="useUnmount(() => { cleanup() })">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button onClick={() => setShow((v) => !v)}>{show ? 'Unmount' : 'Mount'}</Button>
        <Button variant="outline" onClick={() => setLogs([])}>
          Clear log
        </Button>
      </div>
      <div style={{ marginBottom: 14 }}>{show && <UnmountChild log={log} />}</div>
      <LogList items={logs} />
    </Panel>
  )
}
export const Unmount: Story = { render: () => <UnmountDemo /> }

/* useIsMounted --------------------------------------------- */
function IsMountedChild() {
  const isMounted = useIsMounted()
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
      }}
    >
      isMounted.current: <strong>{String(isMounted.current)}</strong>
      <br />
      <span style={{ color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}>
        (true while alive, false in async callbacks after unmount)
      </span>
    </div>
  )
}

function IsMountedDemo() {
  const [show, setShow] = useState(true)
  return (
    <Panel title="useIsMounted" signature="const isMounted = useIsMounted()">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button onClick={() => setShow((v) => !v)}>{show ? 'Hide' : 'Show'}</Button>
      </div>
      {show ? (
        <IsMountedChild />
      ) : (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
          }}
        >
          (child unmounted)
        </div>
      )}
    </Panel>
  )
}
export const IsMounted: Story = { render: () => <IsMountedDemo /> }

/* useUpdateEffect ------------------------------------------ */
function UpdateEffectDemo() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  useUpdateEffect(() => {
    setLogs((prev) => [...prev, `count changed to ${count}`])
  }, [count])

  return (
    <Panel
      title="useUpdateEffect"
      signature="useUpdateEffect(() => { ... }, [deps])  // skips mount"
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <Button onClick={() => setCount((c) => c + 1)}>count++</Button>
        <Button variant="outline" onClick={() => setLogs([])}>
          Clear log
        </Button>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            marginLeft: 'auto',
          }}
        >
          count: <strong>{count}</strong>
        </span>
      </div>
      <LogList items={logs} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        useEffect와 달리 마운트 시점에는 로그가 비어 있고, 첫 변경부터 기록됩니다.
      </div>
    </Panel>
  )
}
export const UpdateEffect: Story = { render: () => <UpdateEffectDemo /> }
