import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { useEclipseTheme } from '../../components/EclipseProvider'
import {
  useBattery,
  useBreakpoint,
  useClipboard,
  useColorScheme,
  useCssVariable,
  useDevicePixelRatio,
  useDocumentTitle,
  useFavicon,
  useGeolocation,
  useHash,
  useIdle,
  useLocalStorage,
  useMediaQuery,
  useNetwork,
  useOnline,
  useOrientation,
  useOs,
  usePageVisibility,
  usePermission,
  usePrefersReducedMotion,
  useScrollPosition,
  useSessionStorage,
  useVibrate,
  useWindowFocus,
  useWindowSize,
} from '../index'

const meta = {
  title: 'Hooks/Environment',
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

const Readout = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
      gap: 10,
      padding: '6px 0',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 12,
      borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
    }}
  >
    <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>{label}</span>
    <span style={{ fontWeight: 600 }}>{value}</span>
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

/* useEclipseTheme ----------------------------------------- */
function EclipseThemeDemo() {
  const theme = useEclipseTheme()
  return (
    <Panel
      title="useEclipseTheme"
      signature="const { mode, platform, baseTextSize } = useEclipseTheme()"
    >
      <Readout label="mode" value={theme.mode} />
      <Readout label="platform" value={theme.platform} />
      <Readout label="baseTextSize" value={theme.baseTextSize} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        Storybook 툴바의 mode·platform·baseTextSize 토글로 값을 바꿔 보세요.
      </div>
    </Panel>
  )
}
export const EclipseTheme: Story = { render: () => <EclipseThemeDemo /> }

/* useMediaQuery ------------------------------------------- */
function MediaQueryDemo() {
  const isCompact = useMediaQuery('(max-width: 640px)')
  const isTouch = useMediaQuery('(pointer: coarse)')
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  return (
    <Panel title="useMediaQuery" signature="useMediaQuery('(max-width: 640px)')">
      <Readout label="(max-width: 640px)" value={String(isCompact)} />
      <Readout label="(pointer: coarse)" value={String(isTouch)} />
      <Readout label="(prefers-color-scheme: dark)" value={String(isDark)} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저 창을 좁히거나 OS 다크모드 설정을 바꾸면 즉시 반영됩니다.
      </div>
    </Panel>
  )
}
export const MediaQuery: Story = { render: () => <MediaQueryDemo /> }

/* usePrefersReducedMotion --------------------------------- */
function ReducedMotionDemo() {
  const reduce = usePrefersReducedMotion()
  return (
    <Panel title="usePrefersReducedMotion" signature="const reduce = usePrefersReducedMotion()">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 96,
          marginBottom: 14,
          borderRadius: 10,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgb(37, 99, 235)',
            animation: reduce ? 'none' : 'spin-demo 2s linear infinite',
          }}
        />
        <style>{`@keyframes spin-demo { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
      <Readout label="reduce" value={String(reduce)} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        OS의 모션 줄임 설정에 따라 회전이 멈춥니다 (macOS 시스템 환경설정·접근성·동작).
      </div>
    </Panel>
  )
}
export const ReducedMotion: Story = { render: () => <ReducedMotionDemo /> }

/* useWindowSize ------------------------------------------- */
function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  return (
    <Panel title="useWindowSize" signature="const { width, height } = useWindowSize()">
      <Readout label="width" value={`${width}px`} />
      <Readout label="height" value={`${height}px`} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        브라우저 창 크기를 조절하면 실시간으로 갱신됩니다. (반응형 분기는 useMediaQuery 권장)
      </div>
    </Panel>
  )
}
export const WindowSize: Story = { render: () => <WindowSizeDemo /> }

/* useLocalStorage ---------------------------------------- */
function LocalStorageDemo() {
  const [note, setNote, removeNote] = useLocalStorage<string>(
    'orbit-demo-note',
    '여기에 입력한 내용은 새로고침 후에도 유지됩니다.'
  )
  return (
    <Panel
      title="useLocalStorage"
      signature="const [note, setNote, removeNote] = useLocalStorage('key', initial)"
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        style={{
          ...inputStyle,
          height: 'auto',
          padding: 12,
          resize: 'vertical',
          fontFamily: 'inherit',
          lineHeight: 1.6,
          marginBottom: 10,
        }}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => removeNote()}
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
          Clear & reset to initial
        </button>
      </div>
      <Readout label="storage key" value="orbit-demo-note" />
      <Readout label="length" value={`${note.length} chars`} />
    </Panel>
  )
}
export const LocalStorage: Story = { render: () => <LocalStorageDemo /> }

/* useClipboard -------------------------------------------- */
function ClipboardDemo() {
  const { onCopy, hasCopied, value } = useClipboard()
  const [text, setText] = useState('https://orbit-ui.example.com/share/abc-123')
  return (
    <Panel title="useClipboard" signature="const { onCopy, hasCopied } = useClipboard()">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ ...inputStyle, marginBottom: 10 }}
      />
      <button
        type="button"
        onClick={() => onCopy(text)}
        style={{
          height: 34,
          padding: '0 14px',
          border: 0,
          borderRadius: 8,
          background: hasCopied ? 'rgb(0, 132, 77)' : 'rgb(37, 99, 235)',
          color: 'rgb(255,255,255)',
          fontFamily: 'inherit',
          fontWeight: 600,
          fontSize: 13.5,
          cursor: 'pointer',
          marginBottom: 14,
        }}
      >
        {hasCopied ? '✓ 복사됨' : '복사'}
      </button>
      <Readout label="hasCopied" value={String(hasCopied)} />
      <Readout label="last copied" value={value ?? '(none)'} />
    </Panel>
  )
}
export const Clipboard: Story = { render: () => <ClipboardDemo /> }

/* useSessionStorage -------------------------------------- */
function SessionStorageDemo() {
  const [draft, setDraft, clearDraft] = useSessionStorage<string>(
    'orbit-demo-session-draft',
    '이 탭에서만 유지됩니다. 새 탭을 열면 초기값으로 시작합니다.'
  )
  return (
    <Panel
      title="useSessionStorage"
      signature="const [draft, setDraft, clearDraft] = useSessionStorage('key', initial)"
    >
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        style={{
          ...inputStyle,
          height: 'auto',
          padding: 12,
          resize: 'vertical',
          fontFamily: 'inherit',
          lineHeight: 1.6,
          marginBottom: 10,
        }}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => clearDraft()}
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
          Clear draft
        </button>
      </div>
      <Readout label="storage key" value="orbit-demo-session-draft" />
      <Readout label="length" value={`${draft.length} chars`} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        새 탭을 열어 같은 페이지를 띄우면 초기값으로 시작합니다 — sessionStorage는 탭 단위.
      </div>
    </Panel>
  )
}
export const SessionStorage: Story = { render: () => <SessionStorageDemo /> }

/* useOnline ----------------------------------------------- */
function OnlineDemo() {
  const online = useOnline()
  return (
    <Panel title="useOnline" signature="const isOnline = useOnline()">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          marginBottom: 14,
          borderRadius: 10,
          background: online
            ? 'color-mix(in oklab, rgb(0, 132, 77) 12%, transparent)'
            : 'color-mix(in oklab, rgb(217, 45, 32) 14%, transparent)',
          color: online ? 'rgb(0, 132, 77)' : 'rgb(217, 45, 32)',
          fontWeight: 660,
          fontSize: 14,
          letterSpacing: '-0.01em',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'currentColor',
            boxShadow: '0 0 0 4px color-mix(in oklab, currentColor 20%, transparent)',
          }}
        />
        {online ? 'Online' : 'Offline'}
      </div>
      <Readout label="navigator.onLine" value={String(online)} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        DevTools → Network → Offline 으로 토글해 보세요.
      </div>
    </Panel>
  )
}
export const Online: Story = { render: () => <OnlineDemo /> }

/* usePageVisibility --------------------------------------- */
function PageVisibilityDemo() {
  const visibility = usePageVisibility()
  return (
    <Panel title="usePageVisibility" signature="const state = usePageVisibility()">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          marginBottom: 14,
          borderRadius: 10,
          background:
            visibility === 'visible'
              ? 'color-mix(in oklab, rgb(37, 99, 235) 10%, transparent)'
              : 'color-mix(in oklab, rgb(24,26,28) 8%, transparent)',
          color:
            visibility === 'visible'
              ? 'rgb(37, 99, 235)'
              : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          fontWeight: 660,
          fontSize: 14,
          letterSpacing: '-0.01em',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'currentColor',
          }}
        />
        {visibility === 'visible'
          ? 'Visible — 폴링/애니메이션 진행'
          : 'Hidden — 백그라운드 작업 일시정지'}
      </div>
      <Readout label="document.visibilityState" value={visibility} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        다른 탭으로 전환하거나 창을 최소화하면 hidden 으로 바뀝니다.
      </div>
    </Panel>
  )
}
export const PageVisibility: Story = { render: () => <PageVisibilityDemo /> }

/* useDocumentTitle --------------------------------------- */
function DocumentTitleDemo() {
  const [title, setTitle] = useState('Orbit Hooks Demo · useDocumentTitle')
  useDocumentTitle(title)
  return (
    <Panel title="useDocumentTitle" signature="useDocumentTitle(title)">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ ...inputStyle, marginBottom: 14 }}
      />
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저 탭 제목이 실시간으로 바뀝니다. 이 스토리에서 다른 곳으로 이동하면 자동 복원.
      </div>
    </Panel>
  )
}
export const DocumentTitle: Story = { render: () => <DocumentTitleDemo /> }

/* useIdle ------------------------------------------------- */
function IdleDemo() {
  const idle = useIdle({ timeout: 5000 })
  return (
    <Panel title="useIdle" signature="const isIdle = useIdle({ timeout: 5000 })">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          marginBottom: 14,
          borderRadius: 10,
          background: idle
            ? 'color-mix(in oklab, rgb(217, 119, 6) 12%, transparent)'
            : 'color-mix(in oklab, rgb(0, 132, 77) 12%, transparent)',
          color: idle ? 'rgb(217, 119, 6)' : 'rgb(0, 132, 77)',
          fontWeight: 660,
          fontSize: 14,
          letterSpacing: '-0.01em',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'currentColor',
            boxShadow: '0 0 0 4px color-mix(in oklab, currentColor 20%, transparent)',
          }}
        />
        {idle ? 'Idle — 5초 동안 아무 활동 없음' : 'Active — 활동 감지됨'}
      </div>
      <Readout label="isIdle" value={String(idle)} />
      <Readout label="timeout" value="5000ms" />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        5초 동안 마우스 · 키보드 · 스크롤 활동이 없으면 idle. 한 번이라도 움직이면 즉시 active.
      </div>
    </Panel>
  )
}
export const Idle: Story = { render: () => <IdleDemo /> }

/* useScrollPosition --------------------------------------- */
function ScrollPositionDemo() {
  const { x, y } = useScrollPosition()
  return (
    <Panel title="useScrollPosition" signature="const { x, y } = useScrollPosition()">
      <Readout label="window.scrollX" value={`${x}px`} />
      <Readout label="window.scrollY" value={`${y}px`} />
      <div
        style={{
          marginTop: 14,
          padding: 14,
          borderRadius: 10,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          color: 'var(--orbit-ink-2, rgba(24,26,28,0.72))',
          fontSize: 13.5,
          lineHeight: 1.55,
        }}
      >
        문서를 스크롤하면 즉시 갱신됩니다. 내부적으로 <code>requestAnimationFrame</code> 으로 묶어
        리렌더는 프레임당 1회.
      </div>
    </Panel>
  )
}
export const ScrollPosition: Story = { render: () => <ScrollPositionDemo /> }

/* useFavicon ---------------------------------------------- */
function FaviconDemo() {
  const icons = [
    { label: '기본 (favicon.ico)', href: '/favicon.ico' },
    {
      label: '⭕ 빨간 원',
      href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23d92d20'/></svg>",
    },
    {
      label: '💚 초록 원',
      href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%2300844d'/></svg>",
    },
    {
      label: '🔵 파란 원',
      href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563eb'/></svg>",
    },
  ] as const

  const [selected, setSelected] = useState<string>(icons[0].href)
  useFavicon(selected, {
    type: selected.startsWith('data:image/svg') ? 'image/svg+xml' : undefined,
  })

  return (
    <Panel title="useFavicon" signature="useFavicon(href, { rel?: string, type?: string })">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {icons.map(({ label, href }) => (
          <label
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 8,
              border:
                selected === href
                  ? '1px solid rgb(37, 99, 235)'
                  : '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              background: selected === href ? 'rgba(37, 99, 235, 0.06)' : 'transparent',
              cursor: 'pointer',
              fontSize: 13.5,
            }}
          >
            <input
              type="radio"
              name="favicon-pick"
              value={href}
              checked={selected === href}
              onChange={() => setSelected(href)}
              style={{ accentColor: 'rgb(37, 99, 235)' }}
            />
            {label}
          </label>
        ))}
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        선택하면 브라우저 탭의 favicon 이 즉시 바뀝니다. 알림 뱃지, 상태 아이콘 등 동적 favicon 에
        활용.
      </div>
    </Panel>
  )
}
export const Favicon: Story = { render: () => <FaviconDemo /> }

/* usePermission ------------------------------------------- */
const PERMISSION_NAMES: PermissionName[] = ['geolocation', 'notifications', 'camera', 'microphone']

const permissionColor = (state: string) => {
  if (state === 'granted') return 'rgb(0, 132, 77)'
  if (state === 'denied') return 'rgb(185, 28, 28)'
  if (state === 'unsupported') return 'var(--orbit-ink-4, rgba(24,26,28,0.33))'
  return 'rgb(217, 119, 6)' // prompt
}

function PermissionRow({ name }: { name: PermissionName }) {
  const state = usePermission(name)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: 10,
        padding: '8px 0',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
        borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
        alignItems: 'center',
      }}
    >
      <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>{name}</span>
      <span style={{ fontWeight: 700, color: permissionColor(state) }}>{state}</span>
    </div>
  )
}

function PermissionDemo() {
  return (
    <Panel title="usePermission" signature="const state = usePermission(name)">
      {PERMISSION_NAMES.map((name) => (
        <PermissionRow key={name} name={name} />
      ))}
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저 주소창에서 권한을 변경하면 즉시 반영됩니다. HTTPS 컨텍스트에서만 동작.
      </div>
    </Panel>
  )
}
export const Permission: Story = { render: () => <PermissionDemo /> }

/* useGeolocation ------------------------------------------ */
function GeolocationDemo() {
  const { loading, error, coords, timestamp } = useGeolocation({ enableHighAccuracy: false })
  return (
    <Panel
      title="useGeolocation"
      signature="const { loading, error, coords } = useGeolocation(options)"
    >
      {loading && (
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            background: 'color-mix(in oklab, rgb(37,99,235) 8%, transparent)',
            color: 'rgb(37,99,235)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            marginBottom: 12,
          }}
        >
          위치 정보 요청 중…
        </div>
      )}

      {error && (
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            background: 'color-mix(in oklab, rgb(217,45,32) 8%, transparent)',
            color: 'rgb(185,28,28)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            marginBottom: 12,
          }}
        >
          {error.message} (code: {error.code})
        </div>
      )}

      {coords && (
        <div style={{ marginBottom: 12 }}>
          {(
            [
              ['latitude', coords.latitude.toFixed(6)],
              ['longitude', coords.longitude.toFixed(6)],
              ['accuracy', `${coords.accuracy.toFixed(0)}m`],
              ['altitude', coords.altitude !== null ? `${coords.altitude.toFixed(0)}m` : 'null'],
            ] as [string, string][]
          ).map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 10,
                padding: '6px 0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
              }}
            >
              <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>{key}</span>
              <span style={{ fontWeight: 700 }}>{val}</span>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && !coords && (
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            marginBottom: 12,
          }}
        >
          Geolocation API 를 지원하지 않는 환경입니다.
        </div>
      )}

      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저에서 위치 권한을 허용하면 실시간으로 갱신됩니다.
        {timestamp && ` · ${new Date(timestamp).toLocaleTimeString()}`}
      </div>
    </Panel>
  )
}
export const Geolocation: Story = { render: () => <GeolocationDemo /> }

/* useNetwork --------------------------------------------- */
function NetworkDemo() {
  const { supported, online, effectiveType, downlink, rtt, saveData } = useNetwork()
  return (
    <Panel
      title="useNetwork"
      signature="const { effectiveType, downlink, rtt, online } = useNetwork()"
    >
      {!supported && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
            fontSize: 13,
            color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          }}
        >
          이 브라우저는 Network Information API를 지원하지 않습니다.
        </div>
      )}
      {supported && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              fontWeight: 660,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: online ? 'rgb(0,132,77)' : 'rgb(185,28,28)',
                display: 'inline-block',
              }}
            />
            {online ? 'Online' : 'Offline'}
          </div>
          {/* Readout rows */}
          {[
            ['effectiveType', effectiveType ?? '–'],
            ['downlink', downlink !== null ? `${downlink} Mbps` : '–'],
            ['rtt', rtt !== null ? `${rtt} ms` : '–'],
            ['saveData', saveData !== null ? String(saveData) : '–'],
          ].map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 10,
                padding: '6px 0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
              }}
            >
              <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>{key}</span>
              <span style={{ fontWeight: 700 }}>{val}</span>
            </div>
          ))}
        </>
      )}
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        DevTools → Network → Throttling 으로 속도를 바꾸면 effectiveType 이 갱신됩니다.
      </div>
    </Panel>
  )
}
export const Network: Story = { render: () => <NetworkDemo /> }

/* useHash ------------------------------------------------- */
function HashDemo() {
  const { hash, setHash } = useHash()
  const sections = ['#intro', '#features', '#pricing', '#contact']
  return (
    <Panel title="useHash" signature="const { hash, setHash } = useHash()">
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setHash(s)}
            style={{
              height: 28,
              padding: '0 12px',
              borderRadius: 6,
              border:
                hash === s
                  ? '1px solid rgb(37,99,235)'
                  : '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              background: hash === s ? 'rgba(37,99,235,0.08)' : 'transparent',
              color: hash === s ? 'rgb(37,99,235)' : 'var(--orbit-ink, rgb(24,26,28))',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setHash('')}
          style={{
            height: 28,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12.5,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        hash: <strong>&quot;{hash}&quot;</strong>
      </div>
    </Panel>
  )
}
export const Hash: Story = { render: () => <HashDemo /> }

/* useOrientation ------------------------------------------ */
function OrientationDemo() {
  const { type, angle } = useOrientation()
  const isLandscape = type.startsWith('landscape')
  return (
    <Panel title="useOrientation" signature="const { type, angle } = useOrientation()">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: isLandscape ? 80 : 48,
            height: isLandscape ? 48 : 80,
            borderRadius: 10,
            border: '3px solid rgb(37,99,235)',
            background: 'rgba(37,99,235,0.08)',
            transition: 'width 300ms, height 300ms',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: 'rgb(37,99,235)',
            fontWeight: 600,
          }}
        >
          {isLandscape ? '⟺' : '⟹'}
        </div>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.8,
        }}
      >
        type: <strong>{type}</strong>
        <br />
        angle: <strong>{angle}°</strong>
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
        }}
      >
        모바일 기기를 회전하면 즉시 반영됩니다. 데스크탑은 landscape-primary 고정.
      </div>
    </Panel>
  )
}
export const Orientation: Story = { render: () => <OrientationDemo /> }

/* useVibrate ---------------------------------------------- */
function VibrateDemo() {
  const { vibrate, supported } = useVibrate()
  return (
    <Panel title="useVibrate" signature="const { vibrate, supported } = useVibrate()">
      {!supported && (
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(187,37,35,0.06)',
            border: '1px solid rgba(187,37,35,0.15)',
            color: 'rgb(187,37,35)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            marginBottom: 14,
          }}
        >
          Vibration API 미지원 환경 (supported: false)
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => vibrate()}
          style={{
            height: 36,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid transparent',
            background: 'rgb(37, 99, 235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Buzz (200ms)
        </button>
        <button
          type="button"
          onClick={() => vibrate([100, 50, 100])}
          style={{
            height: 36,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Pattern [100, 50, 100]
        </button>
        <button
          type="button"
          onClick={() => vibrate([50, 30, 50, 30, 50])}
          style={{
            height: 36,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Triple [50,30,50,30,50]
        </button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        supported: <strong>{String(supported)}</strong>
        {supported && ' · 모바일 기기에서 직접 진동을 확인하세요.'}
      </div>
    </Panel>
  )
}
export const Vibrate: Story = { render: () => <VibrateDemo /> }

/* useColorScheme ------------------------------------------ */
function ColorSchemeDemo() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  return (
    <Panel title="useColorScheme" signature="const colorScheme = useColorScheme()">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: isDark ? 'rgb(24,26,28)' : 'rgb(255,255,255)',
            border: '2px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {colorScheme}
        </span>
      </div>
      <Readout label="colorScheme" value={colorScheme} />
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        OS 시스템 설정 → 다크/라이트 모드 변경 시 즉시 반영됩니다.
      </div>
    </Panel>
  )
}
export const ColorScheme: Story = { render: () => <ColorSchemeDemo /> }

/* useOs --------------------------------------------------- */
function OsDemo() {
  const os = useOs()
  const osEmoji: Record<string, string> = {
    macos: '🍎',
    windows: '🪟',
    linux: '🐧',
    ios: '📱',
    android: '🤖',
    undetermined: '❓',
  }
  const emoji = osEmoji[os] ?? '❓'
  return (
    <Panel title="useOs" signature="const os = useOs()">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 20px',
          marginBottom: 14,
          borderRadius: 10,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        }}
      >
        <span style={{ fontSize: 32, lineHeight: 1 }}>{emoji}</span>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          {os}
        </span>
      </div>
      <Readout label="os" value={os} />
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        navigator.userAgent 를 파싱해 OS를 반환합니다. SSR 환경에서는 &quot;undetermined&quot;.
      </div>
    </Panel>
  )
}
export const Os: Story = { render: () => <OsDemo /> }

/* useBattery ---------------------------------------------- */
function BatteryDemo() {
  const { supported, loading, level, charging, chargingTime, dischargingTime } = useBattery()

  if (!supported) {
    return (
      <Panel
        title="useBattery"
        signature="const { supported, loading, level, charging } = useBattery()"
      >
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'color-mix(in oklab, rgb(217,119,6) 10%, transparent)',
            color: 'rgb(161,84,0)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12.5,
          }}
        >
          Battery Status API is not supported in this browser.
        </div>
      </Panel>
    )
  }

  if (loading) {
    return (
      <Panel
        title="useBattery"
        signature="const { supported, loading, level, charging } = useBattery()"
      >
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
            color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12.5,
          }}
        >
          Loading…
        </div>
      </Panel>
    )
  }

  const pct = level !== null ? Math.round(level * 100) : null

  return (
    <Panel
      title="useBattery"
      signature="const { supported, loading, level, charging } = useBattery()"
    >
      {pct !== null && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 6,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            }}
          >
            <span>level</span>
            <span style={{ fontWeight: 700, color: 'var(--orbit-ink, rgb(24,26,28))' }}>
              {pct}%
            </span>
          </div>
          <div
            style={{
              height: 10,
              borderRadius: 5,
              background: 'var(--orbit-line, rgba(24,26,28,0.08))',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                borderRadius: 5,
                background: pct > 20 ? 'rgb(0,132,77)' : 'rgb(217,45,32)',
                transition: 'width 400ms ease',
              }}
            />
          </div>
        </div>
      )}
      <Readout label="supported" value={String(supported)} />
      <Readout label="charging" value={charging !== null ? String(charging) : '–'} />
      <Readout
        label="chargingTime"
        value={chargingTime !== null ? (chargingTime === Infinity ? '∞' : `${chargingTime}s`) : '–'}
      />
      <Readout
        label="dischargingTime"
        value={
          dischargingTime !== null
            ? dischargingTime === Infinity
              ? '∞'
              : `${dischargingTime}s`
            : '–'
        }
      />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        충전 상태가 변경되면 자동으로 갱신됩니다. Chrome·Edge 지원, Safari·Firefox 미지원.
      </div>
    </Panel>
  )
}
export const Battery: Story = { render: () => <BatteryDemo /> }

/* useBreakpoint ------------------------------------------- */
const BP_NAMES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const BP_WIDTHS: Record<string, string> = {
  xs: '< 640px',
  sm: '≥ 640px',
  md: '≥ 768px',
  lg: '≥ 1024px',
  xl: '≥ 1280px',
  '2xl': '≥ 1536px',
}

function BreakpointDemo() {
  const { breakpoint, isAtLeast } = useBreakpoint()

  return (
    <Panel
      title="useBreakpoint"
      signature="const { breakpoint, isAtLeast, isAtMost } = useBreakpoint()"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 30,
            padding: '0 12px',
            borderRadius: 20,
            background: 'var(--orbit-accent, rgb(37,99,235))',
            color: 'rgb(255,255,255)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {breakpoint}
        </div>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          }}
        >
          {BP_WIDTHS[breakpoint]}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
        {BP_NAMES.map((bp) => {
          const active = isAtLeast(bp)
          return (
            <div
              key={bp}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 100px 1fr',
                gap: 10,
                padding: '5px 8px',
                borderRadius: 6,
                background: active
                  ? 'color-mix(in oklab, var(--orbit-accent, rgb(37,99,235)) 8%, transparent)'
                  : 'transparent',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: active
                    ? 'var(--orbit-accent, rgb(37,99,235))'
                    : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
                }}
              >
                {bp}
              </span>
              <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>
                {BP_WIDTHS[bp]}
              </span>
              <span
                style={{
                  color: active ? 'rgb(0,132,77)' : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
                  fontWeight: 600,
                }}
              >
                {active ? '✓ active' : '–'}
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저 창 너비를 조절하면 현재 브레이크포인트가 즉시 바뀝니다.
      </div>
    </Panel>
  )
}
export const Breakpoint: Story = { render: () => <BreakpointDemo /> }

/* useCssVariable ------------------------------------------ */
const ACCENT_SWATCHES = [
  { label: 'Blue', value: 'rgb(37, 99, 235)' },
  { label: 'Green', value: 'rgb(0, 132, 77)' },
  { label: 'Red', value: 'rgb(217, 45, 32)' },
  { label: 'Purple', value: 'rgb(124, 58, 237)' },
  { label: 'Orange', value: 'rgb(217, 119, 6)' },
] as const

function CssVariableDemo() {
  const [accentValue, setAccentValue] = useCssVariable('--orbit-accent')

  return (
    <Panel
      title="useCssVariable"
      signature="const [value, setValue] = useCssVariable('--orbit-accent')"
    >
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: accentValue || 'var(--orbit-accent, rgb(37,99,235))',
          marginBottom: 16,
          transition: 'background 300ms ease',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 14,
        }}
      >
        {ACCENT_SWATCHES.map(({ label, value }) => (
          <button
            key={label}
            type="button"
            onClick={() => setAccentValue(value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              height: 32,
              padding: '0 12px',
              borderRadius: 8,
              border:
                accentValue === value
                  ? `2px solid ${value}`
                  : '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              background: 'transparent',
              color: 'var(--orbit-ink, rgb(24,26,28))',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: value,
                flexShrink: 0,
              }}
            />
            {label}
          </button>
        ))}
      </div>

      <Readout label="--orbit-accent" value={accentValue || '(inherited)'} />

      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        색상 버튼을 누르면 <code>document.documentElement</code>의 CSS 변수가 즉시 바뀝니다.
      </div>
    </Panel>
  )
}
export const CssVariable: Story = { render: () => <CssVariableDemo /> }

/* useDevicePixelRatio ------------------------------------- */
function DevicePixelRatioDemo() {
  const dpr = useDevicePixelRatio()
  return (
    <Panel title="useDevicePixelRatio" signature="const dpr = useDevicePixelRatio()">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          padding: '20px 24px',
          marginBottom: 14,
          borderRadius: 10,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {dpr.toFixed(2)}
        </span>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          }}
        >
          dppx
        </span>
      </div>

      <Readout label="devicePixelRatio" value={dpr.toFixed(4)} />

      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        브라우저 줌(Cmd +/−)을 변경하거나, 다른 해상도 모니터로 창을 이동하면 DPR이 즉시 갱신됩니다.
        Retina 디스플레이는 2.0, 일반 화면은 1.0을 반환합니다.
      </div>
    </Panel>
  )
}
export const DevicePixelRatio: Story = { render: () => <DevicePixelRatioDemo /> }

/* useWindowFocus ------------------------------------------ */
function WindowFocusDemo() {
  const focused = useWindowFocus()
  return (
    <Panel title="useWindowFocus" signature="const focused = useWindowFocus()">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          marginBottom: 14,
          borderRadius: 10,
          background: focused
            ? 'color-mix(in oklab, rgb(0,132,77) 12%, transparent)'
            : 'color-mix(in oklab, rgb(24,26,28) 8%, transparent)',
          color: focused ? 'rgb(0,132,77)' : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          fontWeight: 660,
          fontSize: 14,
          letterSpacing: '-0.01em',
          transition: 'background 250ms, color 250ms',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'currentColor',
            flexShrink: 0,
            boxShadow: focused
              ? '0 0 0 4px color-mix(in oklab, currentColor 20%, transparent)'
              : 'none',
          }}
        />
        {focused ? 'Window focused' : 'Window blurred'}
      </div>

      <Readout label="focused" value={String(focused)} />

      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        다른 탭이나 창으로 전환하면 즉시 <code>false</code>로 바뀝니다. 다시 이 탭을 클릭하면{' '}
        <code>true</code>로 복귀.
      </div>
    </Panel>
  )
}
export const WindowFocus: Story = { render: () => <WindowFocusDemo /> }
