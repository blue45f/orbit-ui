import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import {
  useAbortController,
  useAsync,
  useCallbackRef,
  useDeepCompareEffect,
  useEventEmitter,
  useForceUpdate,
  useIsMounted,
  useIsFirstRender,
  useIsomorphicLayoutEffect,
  useMount,
  useObjectUrl,
  useSafeState,
  useUnmount,
  useUpdateEffect,
  useWebWorker,
} from '../index'

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
      border: variant === 'outline' ? '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))' : 0,
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
  const log = (line: string) =>
    setLogs((prev) => [...prev, `${new Date().toISOString().slice(11, 19)}  ${line}`])
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
  const log = (line: string) =>
    setLogs((prev) => [...prev, `${new Date().toISOString().slice(11, 19)}  ${line}`])
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

/* useAsync ----------------------------------------------- */
type MockPost = { id: number; title: string; body: string }

const fakeFetch = (shouldFail: boolean): Promise<MockPost> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network error: 서버에 연결할 수 없습니다'))
      } else {
        resolve({ id: 1, title: '비동기 데이터 로드 성공', body: '이 내용은 1초 뒤 도착했습니다.' })
      }
    }, 1000)
  )

function AsyncDemo() {
  const [fail, setFail] = useState(false)
  const { data, isPending, isError, isSuccess, isIdle, error, run, reset } = useAsync<MockPost>(
    () => fakeFetch(fail)
  )

  return (
    <Panel
      title="useAsync"
      signature="const { data, isPending, isError, run, reset } = useAsync(asyncFn)"
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => void run()}
          disabled={isPending}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: 0,
            background: isPending ? 'rgba(37,99,235,0.5)' : 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontSize: 13.5,
            fontWeight: 600,
            cursor: isPending ? 'wait' : 'pointer',
          }}
        >
          {isPending ? 'Loading…' : 'Run async (1s)'}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={isIdle}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontSize: 13.5,
            fontWeight: 600,
            cursor: isIdle ? 'not-allowed' : 'pointer',
            opacity: isIdle ? 0.5 : 1,
          }}
        >
          Reset
        </button>
        <label
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}
        >
          <input
            type="checkbox"
            checked={fail}
            onChange={(e) => {
              reset()
              setFail(e.target.checked)
            }}
            style={{ accentColor: 'rgb(185,28,28)' }}
          />
          Simulate error
        </label>
      </div>

      {isSuccess && data && (
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            background: 'color-mix(in oklab, rgb(0,132,77) 8%, transparent)',
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 660, fontSize: 14, marginBottom: 4 }}>{data.title}</div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            }}
          >
            id: {data.id}
          </div>
        </div>
      )}

      {isError && error && (
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            background: 'color-mix(in oklab, rgb(217,45,32) 8%, transparent)',
            color: 'rgb(185,28,28)',
            marginBottom: 12,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
          }}
        >
          {error.message}
        </div>
      )}

      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        status:{' '}
        <strong>
          {isPending ? 'pending' : isSuccess ? 'success' : isError ? 'error' : 'idle'}
        </strong>
      </div>
    </Panel>
  )
}
export const Async: Story = { render: () => <AsyncDemo /> }

/* ============================================================ */
/* useForceUpdate                                               */
/* ============================================================ */
// externalStore: simulates a value that lives outside React state
const externalStore = { value: '0.000000' }

function ForceUpdateDemo() {
  const forceUpdate = useForceUpdate()

  return (
    <Panel title="useForceUpdate" signature="const forceUpdate = useForceUpdate()">
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          marginBottom: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        <div>
          외부 store 값: <strong>{externalStore.value}</strong>
        </div>
        <div
          style={{ marginTop: 4, fontSize: 11.5, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}
        >
          버튼을 클릭하면 외부 값이 갱신되고 강제 리렌더가 트리거됩니다.
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          externalStore.value = String(Math.random().toFixed(6))
          forceUpdate()
        }}
        style={{
          height: 34,
          padding: '0 16px',
          borderRadius: 8,
          border: '1px solid transparent',
          background: 'rgb(37, 99, 235)',
          color: 'rgb(255,255,255)',
          fontFamily: 'inherit',
          fontSize: 13.5,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        외부 값 변경 + 강제 리렌더
      </button>
    </Panel>
  )
}
export const ForceUpdate: Story = { render: () => <ForceUpdateDemo /> }

/* ============================================================ */
/* useIsFirstRender                                             */
/* ============================================================ */
function IsFirstRenderDemo() {
  const isFirstRender = useIsFirstRender()
  const [count, setCount] = useState(0)
  return (
    <Panel title="useIsFirstRender" signature="const isFirstRender = useIsFirstRender()">
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          marginBottom: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        isFirstRender:{' '}
        <strong style={{ color: isFirstRender ? 'rgb(0,132,77)' : 'rgb(37,99,235)' }}>
          {String(isFirstRender)}
        </strong>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <Button onClick={() => setCount((c) => c + 1)}>Re-render ({count})</Button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        렌더 횟수: {count + 1} — 첫 번째 렌더에서만 true
      </div>
    </Panel>
  )
}
export const IsFirstRender: Story = { render: () => <IsFirstRenderDemo /> }

/* ============================================================ */
/* useCallbackRef                                               */
/* ============================================================ */
function CallbackRefDemo() {
  const [log, setLog] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const stableCallback = useCallbackRef(() => {
    setLog((prev) => [...prev.slice(-4), `호출 #${count + 1} (count=${count})`])
  })
  return (
    <Panel title="useCallbackRef" signature="const stableCallback = useCallbackRef(callback)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button
          onClick={() => {
            setCount((c) => c + 1)
            stableCallback()
          }}
        >
          호출 + 카운터 증가
        </Button>
        <Button variant="outline" onClick={() => setLog([])}>
          Clear log
        </Button>
      </div>
      <div
        style={{
          marginBottom: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        count: <strong>{count}</strong>
      </div>
      <LogList items={log} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        콜백은 매 렌더마다 새 함수를 받지만, 참조(ref)는 안정적으로 유지됩니다.
      </div>
    </Panel>
  )
}
export const CallbackRef: Story = { render: () => <CallbackRefDemo /> }

/* ============================================================ */
/* useDeepCompareEffect                                         */
/* ============================================================ */
function DeepCompareEffectDemo() {
  const [runCount, setRunCount] = useState(0)
  const [a, setA] = useState(1)
  const [b, setB] = useState(2)
  const [, setTick] = useState(0)
  const filters = { a, b }

  useDeepCompareEffect(() => {
    setRunCount((c) => c + 1)
  }, [filters])

  return (
    <Panel title="useDeepCompareEffect" signature="useDeepCompareEffect(effect, deps)">
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          marginBottom: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.8,
        }}
      >
        <div>
          effect 실행 횟수: <strong>{runCount}</strong>
        </div>
        <div style={{ fontSize: 12, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}>
          filters: {JSON.stringify(filters)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => setA((v) => v + 1)}>a 변경 (+{a})</Button>
        <Button onClick={() => setB((v) => v + 1)}>b 변경 (+{b})</Button>
        <Button variant="outline" onClick={() => setTick((t) => t + 1)}>
          강제 리렌더 (값 불변)
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
        &quot;강제 리렌더&quot; 버튼은 a/b를 바꾸지 않으므로 effect가 재실행되지 않습니다.
      </div>
    </Panel>
  )
}
export const DeepCompareEffect: Story = { render: () => <DeepCompareEffectDemo /> }

/* ============================================================ */
/* useAbortController                                           */
/* ============================================================ */
function AbortControllerDemo() {
  const { signal, abort, reset } = useAbortController()
  const [abortCount, setAbortCount] = useState(0)
  const [, setTick] = useState(0)

  const handleAbort = () => {
    abort()
    setAbortCount((c) => c + 1)
    setTick((t) => t + 1)
  }

  const handleReset = () => {
    reset()
    setTick((t) => t + 1)
  }

  return (
    <Panel
      title="useAbortController"
      signature="const { signal, abort, reset } = useAbortController()"
    >
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          marginBottom: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.8,
        }}
      >
        <div>
          signal.aborted:{' '}
          <strong style={{ color: signal.aborted ? 'rgb(185,28,28)' : 'rgb(0,132,77)' }}>
            {String(signal.aborted)}
          </strong>
        </div>
        <div style={{ fontSize: 12, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}>
          abort 호출 횟수: {abortCount}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={handleAbort}>Abort</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Panel>
  )
}
export const AbortController: Story = { render: () => <AbortControllerDemo /> }

/* ============================================================ */
/* useSafeState                                                 */
/* ============================================================ */
function SafeStateChild({ onDone }: { onDone: () => void }) {
  const [safeValue, setSafeValue] = useSafeState<string>('idle')

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSafeValue('done')
      onDone()
    }, 1000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background:
          safeValue === 'done'
            ? 'color-mix(in oklab, rgb(0,132,77) 8%, transparent)'
            : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
        lineHeight: 1.7,
        marginBottom: 10,
      }}
    >
      <div>
        safeValue: <strong>{safeValue}</strong>
      </div>
      <div style={{ color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))', fontSize: 11.5 }}>
        {safeValue === 'idle'
          ? '1초 후 "done"으로 변경됩니다...'
          : '✓ 정상적으로 업데이트되었습니다'}
      </div>
    </div>
  )
}

function SafeStateDemo() {
  const [show, setShow] = useState(true)
  const [log, setLog] = useState<string[]>([])
  const [key, setKey] = useState(0)

  const handleDone = () => {
    setLog((prev) => [
      ...prev,
      `${new Date().toISOString().slice(11, 19)}  setState called — component was mounted`,
    ])
  }

  return (
    <Panel title="useSafeState" signature="const [value, setValue] = useSafeState(initial)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button
          onClick={() => {
            setShow(true)
            setKey((k) => k + 1)
          }}
        >
          Mount (restart)
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setShow(false)
            setLog((prev) => [
              ...prev,
              `${new Date().toISOString().slice(11, 19)}  component unmounted (pending setState ignored)`,
            ])
          }}
        >
          Unmount (mid-async)
        </Button>
      </div>
      {show && <SafeStateChild key={key} onDone={handleDone} />}
      <LogList items={log} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.5,
        }}
      >
        언마운트 후에도 setTimeout 콜백이 setSafeState를 호출하지만 경고 없이 무시됩니다.
      </div>
    </Panel>
  )
}
export const SafeState: Story = { render: () => <SafeStateDemo /> }

/* ============================================================ */
/* useIsomorphicLayoutEffect                                    */
/* ============================================================ */
function IsomorphicLayoutEffectDemo() {
  const [mountedBy, setMountedBy] = useState<string>('(waiting...)')

  useIsomorphicLayoutEffect(() => {
    setMountedBy('useIsomorphicLayoutEffect')
  }, [])

  return (
    <Panel
      title="useIsomorphicLayoutEffect"
      signature="useIsomorphicLayoutEffect(() => { ... }, [deps])"
    >
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'color-mix(in oklab, rgb(37,99,235) 8%, transparent)',
          marginBottom: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.8,
        }}
      >
        <div>
          mounted by: <strong style={{ color: 'rgb(37,99,235)' }}>{mountedBy}</strong>
        </div>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저에서는 useLayoutEffect, SSR에서는 useEffect로 자동 전환됩니다.
        <br />
        SSR 환경에서의 &quot;useLayoutEffect does nothing on the server&quot; 경고를 방지합니다.
      </div>
    </Panel>
  )
}
export const IsomorphicLayoutEffect: Story = { render: () => <IsomorphicLayoutEffectDemo /> }

/* ============================================================ */
/* useObjectUrl                                                 */
/* ============================================================ */
function ObjectUrlDemo() {
  const [blob, setBlob] = useState<Blob | null>(null)
  const url = useObjectUrl(blob)

  const handleCreate = () => {
    setBlob(new Blob(['hello world — from useObjectUrl'], { type: 'text/plain' }))
  }

  const handleClear = () => {
    setBlob(null)
  }

  return (
    <Panel title="useObjectUrl" signature="const url = useObjectUrl(blob)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Button onClick={handleCreate}>Create Blob</Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          marginBottom: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          lineHeight: 1.8,
          wordBreak: 'break-all',
        }}
      >
        <div>
          url:{' '}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'rgb(37,99,235)', textDecoration: 'underline' }}
            >
              {url}
            </a>
          ) : (
            <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>null</span>
          )}
        </div>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        blob이 변경되거나 언마운트될 때 URL.revokeObjectURL()이 자동으로 호출됩니다.
      </div>
    </Panel>
  )
}
export const ObjectUrl: Story = { render: () => <ObjectUrlDemo /> }

/* ============================================================ */
/* useEventEmitter                                              */
/* ============================================================ */
type EmitterEvent = { type: string; payload: string }

function EventEmitterPanelA({
  emitter,
}: {
  emitter: ReturnType<typeof useEventEmitter<EmitterEvent>>
}) {
  const events = [
    { type: 'click', payload: '버튼을 클릭했습니다' },
    { type: 'hover', payload: '요소에 마우스가 올라갔습니다' },
    { type: 'submit', payload: '폼이 제출되었습니다' },
  ]
  return (
    <div
      style={{
        flex: 1,
        padding: 14,
        borderRadius: 10,
        border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
        background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 10,
        }}
      >
        Panel A — Emit
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {events.map((ev) => (
          <button
            key={ev.type}
            type="button"
            onClick={() => emitter.emit(ev)}
            style={{
              height: 30,
              padding: '0 12px',
              borderRadius: 6,
              border: 0,
              background: 'rgb(37,99,235)',
              color: 'rgb(255,255,255)',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            emit: {ev.type}
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        구독자 수: {emitter.listenerCount}
      </div>
    </div>
  )
}

function EventEmitterPanelB({
  emitter,
}: {
  emitter: ReturnType<typeof useEventEmitter<EmitterEvent>>
}) {
  const [received, setReceived] = useState<EmitterEvent[]>([])

  useEffect(() => {
    return emitter.on((ev) => {
      setReceived((prev) => [ev, ...prev].slice(0, 6))
    })
  }, [emitter])

  return (
    <div
      style={{
        flex: 1,
        padding: 14,
        borderRadius: 10,
        border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
        background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 10,
        }}
      >
        Panel B — Receive
      </div>
      <div
        style={{
          minHeight: 100,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          lineHeight: 1.7,
        }}
      >
        {received.length === 0 ? (
          <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>(이벤트 없음)</span>
        ) : (
          received.map((ev, i) => (
            <div
              key={i}
              style={{
                color: i === 0 ? 'rgb(37,99,235)' : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
              }}
            >
              [{ev.type}] {ev.payload}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function EventEmitterDemo() {
  const emitter = useEventEmitter<EmitterEvent>()
  return (
    <Panel title="useEventEmitter" signature="const { emit, on, off } = useEventEmitter<T>()">
      <div style={{ display: 'flex', gap: 12 }}>
        <EventEmitterPanelA emitter={emitter} />
        <EventEmitterPanelB emitter={emitter} />
      </div>
    </Panel>
  )
}
export const EventEmitter: Story = { render: () => <EventEmitterDemo /> }

/* ============================================================ */
/* useWebWorker                                                 */
/* ============================================================ */
const fibFn = (n: number): number => {
  let a = 0
  let b = 1
  for (let i = 0; i < n; i++) {
    const tmp = b
    b = a + b
    a = tmp
  }
  return a
}

function WebWorkerDemo() {
  const { result, status, error, run } = useWebWorker<number>(
    fibFn as (...args: unknown[]) => number
  )
  const [n, setN] = useState(40)

  const statusColor: Record<string, string> = {
    idle: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
    running: 'rgb(217,119,6)',
    success: 'rgb(0,132,77)',
    error: 'rgb(185,28,28)',
    terminated: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
  }

  return (
    <Panel title="useWebWorker" signature="const { run, result, status } = useWebWorker(fn)">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>n =</span>
        <input
          type="number"
          min={1}
          max={80}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{
            width: 80,
            height: 34,
            padding: '0 10px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 14,
          }}
        />
        <Button onClick={() => run(n)}>{status === 'running' ? 'Running…' : 'Run fib(n)'}</Button>
      </div>
      <div
        style={{
          padding: 14,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.8,
        }}
      >
        <div>
          status: <strong style={{ color: statusColor[status] ?? 'inherit' }}>{status}</strong>
        </div>
        <div>
          result: <strong>{result !== null ? String(result) : '(null)'}</strong>
        </div>
        {error && (
          <div style={{ color: 'rgb(185,28,28)', fontSize: 12 }}>error: {error.message}</div>
        )}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        피보나치 계산을 Web Worker에서 실행합니다. 메인 스레드가 블로킹되지 않습니다.
        <br />
        함수는 순수 함수여야 합니다 (클로저 변수 접근 불가).
      </div>
    </Panel>
  )
}
export const WebWorker: Story = { render: () => <WebWorkerDemo /> }
