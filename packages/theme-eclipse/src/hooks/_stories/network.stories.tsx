import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { useBroadcastChannel, useFetch, useNotification, useWebSocket } from '../index'

const meta = {
  title: 'Hooks/Network',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta

export default meta
type Story = StoryObj

/* ─── shared helpers ─────────────────────────────────────── */
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

const badgeStyle = (color: string): React.CSSProperties => ({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  fontFamily: '"JetBrains Mono", monospace',
  background: `color-mix(in oklab, ${color} 12%, transparent)`,
  color,
})

/* ─── useFetch ────────────────────────────────────────────── */
type MockData = { id: number; name: string }

function FetchDemo() {
  const [url, setUrl] = useState('')
  const { status, data, error, refetch } = useFetch<MockData>(url)

  const statusColor: Record<string, string> = {
    idle: 'rgb(150,150,150)',
    loading: 'rgb(217,119,6)',
    success: 'rgb(0,132,77)',
    error: 'rgb(185,28,28)',
  }

  return (
    <Panel title="useFetch" signature="const { status, data, error, refetch } = useFetch<T>(url)">
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://... (URL 입력)"
          style={{
            width: '100%',
            height: 38,
            padding: '0 12px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 13,
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={refetch}
          disabled={!url || status === 'loading'}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: 0,
            background: !url || status === 'loading' ? 'rgba(37,99,235,0.4)' : 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontSize: 13.5,
            fontWeight: 600,
            cursor: !url || status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Loading…' : 'Refetch'}
        </button>
        <button
          type="button"
          onClick={() => setUrl('')}
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
            cursor: 'pointer',
          }}
        >
          Clear URL
        </button>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span style={badgeStyle(statusColor[status] ?? 'rgb(150,150,150)')}>{status}</span>
      </div>
      {status === 'success' && data && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: 'color-mix(in oklab, rgb(0,132,77) 8%, transparent)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            lineHeight: 1.6,
            marginBottom: 10,
            wordBreak: 'break-all',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </div>
      )}
      {status === 'error' && error && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: 'color-mix(in oklab, rgb(185,28,28) 8%, transparent)',
            color: 'rgb(185,28,28)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            marginBottom: 10,
          }}
        >
          {error.message}
        </div>
      )}
      <div
        style={{
          marginTop: 6,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.5,
        }}
      >
        주의: 실제 API 요청에 사용됩니다. URL을 입력하면 즉시 요청이 시작됩니다.
      </div>
    </Panel>
  )
}
export const Fetch: Story = { render: () => <FetchDemo /> }

/* ─── useWebSocket ────────────────────────────────────────── */
function WebSocketDemo() {
  const [wsUrl, setWsUrl] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [connected, setConnected] = useState(false)
  const [activeUrl, setActiveUrl] = useState('')

  const { status, send, close } = useWebSocket(activeUrl, {
    onMessage: (event: MessageEvent) => {
      setMessages((prev) => [`← ${String(event.data)}`, ...prev].slice(0, 10))
    },
    onOpen: () => {
      setMessages((prev) => ['[연결됨]', ...prev])
    },
    onClose: () => {
      setMessages((prev) => ['[연결 해제됨]', ...prev])
    },
  })

  const statusColor: Record<string, string> = {
    connecting: 'rgb(217,119,6)',
    open: 'rgb(0,132,77)',
    closed: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
    error: 'rgb(185,28,28)',
  }

  const handleConnect = () => {
    setMessages([])
    setActiveUrl(wsUrl)
    setConnected(true)
  }

  const handleDisconnect = () => {
    close()
    setActiveUrl('')
    setConnected(false)
  }

  const handleSend = () => {
    if (!input.trim()) return
    send(input)
    setMessages((prev) => [`→ ${input}`, ...prev].slice(0, 10))
    setInput('')
  }

  return (
    <Panel
      title="useWebSocket"
      signature="const { status, send, close } = useWebSocket(url, options)"
    >
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={wsUrl}
          onChange={(e) => setWsUrl(e.target.value)}
          placeholder="wss://... (WebSocket URL 입력)"
          style={{
            width: '100%',
            height: 38,
            padding: '0 12px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 13,
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={connected ? handleDisconnect : handleConnect}
          disabled={!wsUrl && !connected}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: 0,
            background: connected ? 'rgb(187,37,35)' : 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontSize: 13.5,
            fontWeight: 600,
            cursor: !wsUrl && !connected ? 'not-allowed' : 'pointer',
            opacity: !wsUrl && !connected ? 0.5 : 1,
          }}
        >
          {connected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span style={badgeStyle(statusColor[status] ?? 'rgb(150,150,150)')}>
          {activeUrl ? status : 'idle'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          placeholder="메시지 입력"
          disabled={status !== 'open'}
          style={{
            flex: 1,
            height: 34,
            padding: '0 10px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 13,
            opacity: status !== 'open' ? 0.5 : 1,
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={status !== 'open' || !input.trim()}
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
            cursor: status !== 'open' || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: status !== 'open' || !input.trim() ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          lineHeight: 1.7,
          minHeight: 80,
          maxHeight: 160,
          overflow: 'auto',
        }}
      >
        {messages.length === 0 ? (
          <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>(메시지 없음)</span>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              style={{
                color:
                  i === 0
                    ? 'var(--orbit-ink, rgb(24,26,28))'
                    : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
              }}
            >
              {m}
            </div>
          ))
        )}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.5,
        }}
      >
        실제 WebSocket 서버 URL이 필요합니다. Echo 서버(예: wss://echo.websocket.org)를 사용해
        테스트할 수 있습니다.
      </div>
    </Panel>
  )
}
export const WebSocketStory: Story = { render: () => <WebSocketDemo /> }

/* ─── useBroadcastChannel ────────────────────────────────── */
function BroadcastChannelDemo() {
  const CHANNEL = 'orbit-demo-channel'
  const { postMessage } = useBroadcastChannel<string>(CHANNEL)
  const [input, setInput] = useState('')
  const [sentLog, setSentLog] = useState<string[]>([])
  const [receivedLog, setReceivedLog] = useState<string[]>([])

  // Subscribe to incoming messages via a separate BroadcastChannel listener
  // so we can observe messages sent from other tabs (not the sender tab itself)
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const listener = new BroadcastChannel(CHANNEL)
    listener.onmessage = (event: MessageEvent<string>) => {
      const ts = new Date().toISOString().slice(11, 19)
      setReceivedLog((prev) => [`${ts}  ${event.data}`, ...prev].slice(0, 8))
    }
    return () => {
      listener.close()
    }
  }, [])

  const handleBroadcast = () => {
    if (!input.trim()) return
    postMessage(input)
    const ts = new Date().toISOString().slice(11, 19)
    setSentLog((prev) => [`${ts}  ${input}`, ...prev].slice(0, 8))
    setInput('')
  }

  return (
    <Panel
      title="useBroadcastChannel"
      signature='const { lastMessage, postMessage } = useBroadcastChannel<T>("channel")'
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleBroadcast()
          }}
          placeholder="브로드캐스트할 메시지"
          style={{
            flex: 1,
            height: 34,
            padding: '0 10px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 13,
          }}
        />
        <button
          type="button"
          onClick={handleBroadcast}
          disabled={!input.trim()}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: 0,
            background: !input.trim() ? 'rgba(37,99,235,0.4)' : 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontSize: 13.5,
            fontWeight: 600,
            cursor: !input.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          Broadcast
        </button>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 6,
            }}
          >
            Sent (이 탭)
          </div>
          <div
            style={{
              padding: 10,
              borderRadius: 8,
              background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
              border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11.5,
              lineHeight: 1.7,
              minHeight: 80,
              maxHeight: 120,
              overflow: 'auto',
            }}
          >
            {sentLog.length === 0 ? (
              <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>(없음)</span>
            ) : (
              sentLog.map((m, i) => (
                <div
                  key={i}
                  style={{
                    color: i === 0 ? 'rgb(37,99,235)' : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
                  }}
                >
                  {m}
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 6,
            }}
          >
            Received (다른 탭)
          </div>
          <div
            style={{
              padding: 10,
              borderRadius: 8,
              background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
              border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11.5,
              lineHeight: 1.7,
              minHeight: 80,
              maxHeight: 120,
              overflow: 'auto',
            }}
          >
            {receivedLog.length === 0 ? (
              <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>(없음)</span>
            ) : (
              receivedLog.map((m, i) => (
                <div
                  key={i}
                  style={{
                    color: i === 0 ? 'rgb(0,132,77)' : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
                  }}
                >
                  {m}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Readout label="channel" value={CHANNEL} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.5,
        }}
      >
        동일 출처의 다른 탭에서도 메시지를 수신합니다. 같은 채널명을 사용한 다른 탭에서 전송해
        보세요.
      </div>
    </Panel>
  )
}
export const BroadcastChannelStory: Story = { render: () => <BroadcastChannelDemo /> }
BroadcastChannelStory.storyName = 'BroadcastChannel'

/* ─── useNotification ─────────────────────────────────────── */
function NotificationDemo() {
  const { isSupported, permission, requestPermission, notify } = useNotification()

  const permColor: Record<string, string> = {
    default: 'rgb(217,119,6)',
    granted: 'rgb(0,132,77)',
    denied: 'rgb(185,28,28)',
  }

  return (
    <Panel
      title="useNotification"
      signature="const { permission, requestPermission, notify } = useNotification()"
    >
      <div style={{ marginBottom: 14 }}>
        <span style={badgeStyle(permColor[permission] ?? 'rgb(150,150,150)')}>{permission}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => {
            void requestPermission()
          }}
          disabled={!isSupported || permission === 'granted' || permission === 'denied'}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: 0,
            background: 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontSize: 13.5,
            fontWeight: 600,
            cursor:
              !isSupported || permission === 'granted' || permission === 'denied'
                ? 'not-allowed'
                : 'pointer',
            opacity: !isSupported || permission === 'granted' || permission === 'denied' ? 0.5 : 1,
          }}
        >
          권한 요청
        </button>
        <button
          type="button"
          onClick={() => {
            notify('Orbit UI 알림', {
              body: '이것은 useNotification 훅의 테스트 알림입니다.',
              icon: undefined,
            })
          }}
          disabled={permission !== 'granted'}
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
            cursor: permission !== 'granted' ? 'not-allowed' : 'pointer',
            opacity: permission !== 'granted' ? 0.5 : 1,
          }}
        >
          알림 보내기
        </button>
      </div>
      <Readout label="isSupported" value={String(isSupported)} />
      <Readout label="permission" value={permission} />
      {!isSupported && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 8,
            background: 'color-mix(in oklab, rgb(185,28,28) 8%, transparent)',
            color: 'rgb(185,28,28)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11.5,
          }}
        >
          이 브라우저는 Notification API를 지원하지 않습니다.
        </div>
      )}
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.5,
        }}
      >
        브라우저 알림 권한이 &quot;granted&quot; 상태여야 알림이 전송됩니다. &quot;denied&quot;
        상태에서는 브라우저 설정에서 직접 변경해야 합니다.
      </div>
    </Panel>
  )
}
export const NotificationStory: Story = { render: () => <NotificationDemo /> }
