import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import {
  useEventListener,
  useFocusVisible,
  useHotkey,
  useHover,
  useOnClickOutside,
  useScrollLock,
} from '../index'

const meta = {
  title: 'Hooks/Interaction',
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

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd
    style={{
      display: 'inline-block',
      padding: '2px 8px',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: 'var(--orbit-ink, rgb(24,26,28))',
      background: 'var(--orbit-surface, rgb(255,255,255))',
      border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
      borderBottomWidth: 2,
      borderRadius: 5,
    }}
  >
    {children}
  </kbd>
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

/* useEventListener ----------------------------------------- */
function EventListenerDemo() {
  const [count, setCount] = useState(0)
  useEventListener('keydown', (event) => {
    if ((event as KeyboardEvent).key === 'ArrowDown') {
      setCount((c) => c + 1)
    }
  })
  return (
    <Panel title="useEventListener" signature="useEventListener('keydown', handler)">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 14 }}>
          이 패널이 마운트된 동안 <Kbd>↓</Kbd> 키를 누르세요.
        </span>
      </div>
      <Readout label="arrow-down count" value={count} />
    </Panel>
  )
}
export const EventListener: Story = { render: () => <EventListenerDemo /> }

/* useHotkey ------------------------------------------------ */
function HotkeyDemo() {
  const [opens, setOpens] = useState(0)
  const [submits, setSubmits] = useState(0)
  useHotkey('mod+k', () => setOpens((n) => n + 1))
  useHotkey('mod+enter', () => setSubmits((n) => n + 1))
  return (
    <Panel title="useHotkey" signature="useHotkey('mod+k', handler)">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14 }}>지금 누르세요:</span>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <span style={{ marginLeft: 8 }}>또는</span>
        <Kbd>⌘</Kbd>
        <Kbd>Enter</Kbd>
      </div>
      <Readout label="⌘K count" value={opens} />
      <Readout label="⌘Enter count" value={submits} />
      <div
        style={{
          marginTop: 8,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        Windows·Linux에서는 <Kbd>Ctrl</Kbd>이 mod로 자동 매핑됩니다.
      </div>
    </Panel>
  )
}
export const Hotkey: Story = { render: () => <HotkeyDemo /> }

/* useOnClickOutside ---------------------------------------- */
function ClickOutsideDemo() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  useOnClickOutside([triggerRef, panelRef], () => setOpen(false))
  return (
    <Panel
      title="useOnClickOutside"
      signature="useOnClickOutside([trigger, content], () => close())"
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
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
          {open ? '드롭다운 열림' : '드롭다운 열기'}
        </button>
        {open && (
          <div
            ref={panelRef}
            style={{
              padding: 12,
              border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              borderRadius: 8,
              background: 'var(--orbit-surface, rgb(255,255,255))',
              fontSize: 13,
              minWidth: 200,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ padding: '6px 0' }}>옵션 1</div>
            <div style={{ padding: '6px 0' }}>옵션 2</div>
            <div style={{ padding: '6px 0' }}>옵션 3</div>
          </div>
        )}
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        드롭다운 밖을 클릭하면 닫힙니다. trigger/panel 내부 클릭은 유지.
      </div>
    </Panel>
  )
}
export const ClickOutside: Story = { render: () => <ClickOutsideDemo /> }

/* useHover ------------------------------------------------- */
function HoverDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const hovering = useHover(ref)
  return (
    <Panel title="useHover" signature="const isHovering = useHover(ref)">
      <div
        ref={ref}
        style={{
          padding: 24,
          borderRadius: 10,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 600,
          transition: 'background-color 160ms cubic-bezier(0.2,0,0,1)',
          background: hovering ? 'rgba(37, 99, 235, 0.08)' : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          color: hovering ? 'rgb(37, 99, 235)' : 'var(--orbit-ink, rgb(24,26,28))',
          marginBottom: 14,
          cursor: 'pointer',
        }}
      >
        {hovering ? 'hovering' : 'hover over me'}
      </div>
      <Readout label="isHovering" value={String(hovering)} />
    </Panel>
  )
}
export const Hover: Story = { render: () => <HoverDemo /> }

/* useFocusVisible ------------------------------------------ */
function FocusVisibleDemo() {
  const { isFocusVisible } = useFocusVisible()
  return (
    <Panel title="useFocusVisible" signature="const { isFocusVisible } = useFocusVisible()">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <button
          type="button"
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
            outline: isFocusVisible
              ? '2px solid rgba(37, 99, 235, 0.85)'
              : 'none',
            outlineOffset: 2,
          }}
        >
          포커스 가능한 버튼
        </button>
        <span style={{ fontSize: 13, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}>
          <Kbd>Tab</Kbd>으로 포커스 vs 마우스 클릭으로 포커스
        </span>
      </div>
      <Readout label="isFocusVisible" value={String(isFocusVisible)} />
      <div
        style={{
          marginTop: 8,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        키보드(Tab)로 포커스했을 때만 outline이 보이고, 마우스 클릭으로 포커스했을 때는 outline이 사라집니다.
      </div>
    </Panel>
  )
}
export const FocusVisible: Story = { render: () => <FocusVisibleDemo /> }

/* useScrollLock -------------------------------------------- */
function ScrollLockChild() {
  useScrollLock()
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: 'rgba(37, 99, 235, 0.08)',
        color: 'rgb(37, 99, 235)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
      }}
    >
      🔒 scroll locked (body.style.overflow = &apos;hidden&apos;)
    </div>
  )
}

function ScrollLockDemo() {
  const [locked, setLocked] = useState(false)
  const [bodyOverflow, setBodyOverflow] = useState('')
  useEffect(() => {
    setBodyOverflow(document.body.style.overflow || '(default)')
    const observer = new MutationObserver(() => {
      setBodyOverflow(document.body.style.overflow || '(default)')
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
    return () => observer.disconnect()
  }, [])
  return (
    <Panel title="useScrollLock" signature="useScrollLock({ enabled: open })">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => setLocked((v) => !v)}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 8,
            background: locked ? 'rgb(187, 37, 35)' : 'rgb(37, 99, 235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          {locked ? 'Unlock' : 'Lock body scroll'}
        </button>
        <span style={{ fontSize: 13, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}>
          외부 스크롤을 시도해 보세요.
        </span>
      </div>
      {locked && <ScrollLockChild />}
      <Readout label="body.style.overflow" value={bodyOverflow} />
    </Panel>
  )
}
export const ScrollLock: Story = { render: () => <ScrollLockDemo /> }
