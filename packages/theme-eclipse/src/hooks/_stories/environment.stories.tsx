import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { useEclipseTheme } from '../../components/EclipseProvider'
import {
  useClipboard,
  useDocumentTitle,
  useLocalStorage,
  useMediaQuery,
  usePrefersReducedMotion,
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
    <Panel title="useEclipseTheme" signature="const { mode, platform, baseTextSize } = useEclipseTheme()">
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
    '여기에 입력한 내용은 새로고침 후에도 유지됩니다.',
  )
  return (
    <Panel title="useLocalStorage" signature="const [note, setNote, removeNote] = useLocalStorage('key', initial)">
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
