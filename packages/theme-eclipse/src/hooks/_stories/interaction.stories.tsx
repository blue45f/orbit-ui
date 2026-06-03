import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import {
  useClipboardPaste,
  useDrag,
  useEventListener,
  useEyeDropper,
  useFocusTrap,
  useFocusVisible,
  useFocusWithin,
  useFullscreen,
  useGamepad,
  useHotkey,
  useHover,
  useKeyPress,
  useLongPress,
  useMergeRefs,
  useMouse,
  useOnClickOutside,
  usePointerLock,
  useReadingProgress,
  useScrollLock,
  useScrollTo,
  useSearchParam,
  useSelection,
  useShareAPI,
  useWakeLock,
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

const Readout = ({
  label,
  value,
  testId,
}: {
  label: string
  value: React.ReactNode
  testId?: string
}) => (
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
    <span style={{ fontWeight: 600 }} data-testid={testId}>
      {value}
    </span>
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
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginBottom: 14,
          flexWrap: 'wrap',
        }}
      >
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
          background: hovering
            ? 'rgba(37, 99, 235, 0.08)'
            : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
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
            outline: isFocusVisible ? '2px solid rgba(37, 99, 235, 0.85)' : 'none',
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
        키보드(Tab)로 포커스했을 때만 outline이 보이고, 마우스 클릭으로 포커스했을 때는 outline이
        사라집니다.
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
  const [bodyOverflow, setBodyOverflow] = useState<string>('(default)')
  useEffect(() => {
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
      <Readout label="body.style.overflow" value={bodyOverflow} testId="body-overflow-readout" />
    </Panel>
  )
}
export const ScrollLock: Story = { render: () => <ScrollLockDemo /> }

/* useLongPress ------------------------------------------- */
function LongPressDemo() {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)

  const handlers = useLongPress(
    () => {
      setCount((c) => c + 1)
      setProgress(0)
    },
    { delay: 600 }
  )

  const startProgress = () => {
    setProgress(0)
    const started = Date.now()
    if (timerRef.current !== null) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      const ratio = Math.min(1, (Date.now() - started) / 600)
      setProgress(ratio)
      if (ratio >= 1 && timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }, 16)
  }
  const stopProgress = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setProgress(0)
  }

  return (
    <Panel title="useLongPress" signature="useLongPress(onLongPress, { delay: 600 })">
      <button
        type="button"
        {...handlers}
        onPointerDown={(e) => {
          startProgress()
          handlers.onPointerDown(e)
        }}
        onPointerUp={(e) => {
          stopProgress()
          handlers.onPointerUp(e)
        }}
        onPointerCancel={(e) => {
          stopProgress()
          handlers.onPointerCancel(e)
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: 76,
          border: 0,
          borderRadius: 12,
          background: 'rgb(24,26,28)',
          color: 'rgb(255,255,255)',
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 660,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          overflow: 'hidden',
          marginBottom: 14,
          touchAction: 'none',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgb(37, 99, 235)',
            transformOrigin: 'left center',
            transform: `scaleX(${progress})`,
            transition: progress === 0 ? 'transform 160ms ease-out' : 'none',
          }}
        />
        <span style={{ position: 'relative' }}>
          {progress === 0 ? '0.6초 동안 길게 누르세요' : '계속 누르고 계세요…'}
        </span>
      </button>
      <Readout label="fired count" value={count} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        터치·마우스·펜 모두 동일하게 동작합니다. 8px 이상 끌면 자동 취소.
      </div>
    </Panel>
  )
}
export const LongPress: Story = { render: () => <LongPressDemo /> }

/* useFocusTrap ------------------------------------------- */
function FocusTrapDemo() {
  const [open, setOpen] = useState(false)
  const trapRef = useRef<HTMLDivElement>(null)
  useFocusTrap(trapRef, { enabled: open })

  return (
    <Panel title="useFocusTrap" signature="useFocusTrap(ref, { enabled: open })">
      <button
        type="button"
        onClick={() => setOpen(true)}
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
          marginBottom: 14,
        }}
      >
        Open dialog
      </button>
      {open && (
        <div
          ref={trapRef}
          role="dialog"
          aria-label="Focus trap demo"
          style={{
            position: 'relative',
            padding: 18,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            borderRadius: 10,
            background: 'var(--orbit-surface, rgb(255,255,255))',
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08), 0 4px 8px -2px rgba(0,0,0,0.04)',
            marginBottom: 14,
          }}
        >
          <div style={{ fontWeight: 660, fontSize: 14, marginBottom: 10 }}>
            Tab 키를 눌러 순환을 확인하세요.
          </div>
          <input
            placeholder="Name"
            style={{
              width: '100%',
              height: 32,
              padding: '0 10px',
              marginBottom: 8,
              borderRadius: 6,
              border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              fontFamily: 'inherit',
              fontSize: 13.5,
            }}
          />
          <input
            placeholder="Email"
            style={{
              width: '100%',
              height: 32,
              padding: '0 10px',
              marginBottom: 12,
              borderRadius: 6,
              border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              fontFamily: 'inherit',
              fontSize: 13.5,
            }}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
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
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                height: 30,
                padding: '0 12px',
                borderRadius: 6,
                border: 0,
                background: 'rgb(37, 99, 235)',
                color: 'rgb(255,255,255)',
                fontFamily: 'inherit',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Confirm
            </button>
          </div>
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
        다이얼로그를 열면 Tab·Shift+Tab 이 내부 두 input · Cancel · Confirm 만 순환합니다. 닫으면
        Open dialog 버튼으로 포커스가 복원됩니다.
      </div>
    </Panel>
  )
}
export const FocusTrap: Story = { render: () => <FocusTrapDemo /> }

/* useScrollIntoView -------------------------------------- */
function ScrollIntoViewDemo() {
  const targets = Array.from({ length: 12 }, (_, i) => i)
  const [selected, setSelected] = useState(0)
  const refs = useRef<Array<HTMLDivElement | null>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // We invoke the hook inside an effect when selection changes.
  const scrollToSelected = (idx: number) => {
    const node = refs.current[idx]
    if (!node || !containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const targetRect = node.getBoundingClientRect()
    const offset = targetRect.top - containerRect.top - 8
    containerRef.current.scrollTo({
      top: containerRef.current.scrollTop + offset,
      behavior: 'smooth',
    })
  }

  return (
    <Panel
      title="useScrollIntoView"
      signature="const scrollIntoView = useScrollIntoView(ref, { offset })"
    >
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {[0, 4, 8, 11].map((idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setSelected(idx)
              scrollToSelected(idx)
            }}
            style={{
              height: 30,
              padding: '0 12px',
              borderRadius: 6,
              border:
                selected === idx
                  ? '1px solid transparent'
                  : '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              background: selected === idx ? 'rgb(24, 26, 28)' : 'transparent',
              color: selected === idx ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
              fontFamily: 'inherit',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Scroll to {idx}
          </button>
        ))}
      </div>
      <div
        ref={containerRef}
        style={{
          height: 200,
          overflow: 'auto',
          borderRadius: 10,
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          padding: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        }}
      >
        {targets.map((idx) => (
          <div
            key={idx}
            ref={(el) => {
              refs.current[idx] = el
            }}
            style={{
              padding: 14,
              marginBottom: 8,
              borderRadius: 8,
              background:
                selected === idx ? 'rgb(37, 99, 235)' : 'var(--orbit-surface, rgb(255,255,255))',
              color: selected === idx ? 'rgb(255,255,255)' : 'var(--orbit-ink, rgb(24,26,28))',
              border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
              fontSize: 13.5,
              fontWeight: 600,
              transition: 'background-color 160ms cubic-bezier(0.2,0,0,1)',
            }}
          >
            Item #{idx}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        useScrollIntoView 자체는 window 스크롤을 다룹니다. 이 데모는 같은 API 패턴을 컨테이너
        스크롤로 보여줍니다.
      </div>
    </Panel>
  )
}
export const ScrollIntoView: Story = { render: () => <ScrollIntoViewDemo /> }

/* useKeyPress -------------------------------------------- */
function KeyPressDemo() {
  const isShift = useKeyPress('Shift')
  const isMeta = useKeyPress('Meta')
  const isSpace = useKeyPress(' ')
  return (
    <Panel title="useKeyPress" signature="const isShift = useKeyPress('Shift')">
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <KeyIndicator label="Shift" active={isShift} />
        <KeyIndicator label="⌘ Meta" active={isMeta} />
        <KeyIndicator label="Space" active={isSpace} />
      </div>
      <Readout label="Shift" value={String(isShift)} />
      <Readout label="Meta" value={String(isMeta)} />
      <Readout label="Space" value={String(isSpace)} />
      <div
        style={{
          marginTop: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.55,
        }}
      >
        키를 누르고 있는 동안 true, 떼면 false. input 안에서는 기본적으로 무시.
      </div>
    </Panel>
  )
}

function KeyIndicator({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        padding: '14px 12px',
        borderRadius: 10,
        textAlign: 'center',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        fontWeight: 660,
        border: active
          ? '1px solid transparent'
          : '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
        background: active
          ? 'rgb(37, 99, 235)'
          : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        color: active ? 'rgb(255,255,255)' : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        transition: 'background-color 80ms ease, color 80ms ease',
      }}
    >
      {label}
    </div>
  )
}

export const KeyPress: Story = { render: () => <KeyPressDemo /> }

/* useMergeRefs ------------------------------------------- */
function MergeRefsDemo() {
  const internalRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [refAttached, setRefAttached] = useState(false)
  const mergedRef = useMergeRefs<HTMLButtonElement>(internalRef, (el) => {
    setRefAttached(el !== null)
  })
  useEffect(() => {
    const el = internalRef.current
    if (!el) return
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])
  return (
    <Panel title="useMergeRefs" signature="const ref = useMergeRefs(refA, refB, callbackRef)">
      <button
        ref={mergedRef}
        type="button"
        style={{
          height: 44,
          padding: '0 20px',
          borderRadius: 10,
          border: 0,
          background: hovered ? 'rgb(37,99,235)' : 'rgba(37,99,235,0.1)',
          color: hovered ? 'rgb(255,255,255)' : 'rgb(37,99,235)',
          fontFamily: 'inherit',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 160ms, color 160ms',
        }}
      >
        hover me
      </button>
      <div
        style={{
          marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        internalRef attached: <strong>{refAttached ? 'HTMLButtonElement' : 'null'}</strong>
        <br />
        hovered: <strong>{String(hovered)}</strong>
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 13,
          color: 'var(--orbit-ink-2, rgba(24,26,28,0.72))',
          lineHeight: 1.55,
        }}
      >
        두 개의 ref(RefObject + RefCallback)가 동일한 DOM 노드를 동시에 참조합니다. forwardRef
        컴포넌트의 내부+외부 ref 병합 패턴.
      </div>
    </Panel>
  )
}
export const MergeRefs: Story = { render: () => <MergeRefsDemo /> }

/* useMouse ----------------------------------------------- */
function MouseDemo() {
  const { ref, mouse } = useMouse<HTMLDivElement>()
  return (
    <Panel title="useMouse" signature="const { ref, mouse } = useMouse()  // mouse.x/y, elementX/Y">
      <div
        ref={ref}
        style={{
          height: 160,
          borderRadius: 12,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          position: 'relative',
          cursor: 'crosshair',
          overflow: 'hidden',
        }}
      >
        {mouse.elementX !== null && (
          <div
            style={{
              position: 'absolute',
              left: mouse.elementX,
              top: mouse.elementY ?? 0,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgb(37,99,235)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        )}
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          }}
        >
          박스 안에서 마우스를 움직여 보세요
        </span>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.8,
        }}
      >
        viewport:{' '}
        <strong>
          {mouse.x}, {mouse.y}
        </strong>
        <br />
        element:{' '}
        <strong>
          {mouse.elementX ?? '–'}, {mouse.elementY ?? '–'}
        </strong>
      </div>
    </Panel>
  )
}
export const Mouse: Story = { render: () => <MouseDemo /> }

/* useFocusWithin ------------------------------------------ */
function FocusWithinDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const isFocusWithin = useFocusWithin(ref)
  return (
    <Panel title="useFocusWithin" signature="const isFocusWithin = useFocusWithin(ref)">
      <div
        ref={ref}
        style={{
          padding: 16,
          borderRadius: 10,
          border: `2px solid ${isFocusWithin ? 'rgb(37,99,235)' : 'var(--orbit-line, rgba(24,26,28,0.08))'}`,
          background: isFocusWithin
            ? 'rgba(37,99,235,0.04)'
            : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          transition: 'border-color 160ms, background 160ms',
          marginBottom: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <input
          placeholder="이름"
          style={{
            height: 36,
            padding: '0 12px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <input
          placeholder="이메일"
          style={{
            height: 36,
            padding: '0 12px',
            borderRadius: 8,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 14,
            outline: 'none',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        isFocusWithin:{' '}
        <strong style={{ color: isFocusWithin ? 'rgb(37,99,235)' : 'inherit' }}>
          {String(isFocusWithin)}
        </strong>
      </div>
    </Panel>
  )
}
export const FocusWithin: Story = { render: () => <FocusWithinDemo /> }

/* useSelection -------------------------------------------- */
function SelectionDemo() {
  const { text, rects } = useSelection()
  return (
    <Panel title="useSelection" signature="const { text, rects } = useSelection()">
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: 'var(--orbit-ink-2, rgba(24,26,28,0.78))',
          marginTop: 0,
          marginBottom: 16,
          userSelect: 'text',
        }}
      >
        이 텍스트를 마우스로 선택해 보세요. 드래그해서 원하는 부분을 선택하면 아래에 즉시
        반영됩니다. 다양한 위치에서 텍스트를 선택하면 rects 개수도 달라집니다.
      </p>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          lineHeight: 1.8,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          marginBottom: 14,
        }}
      >
        <div>
          선택된 텍스트:{' '}
          <strong style={{ color: 'var(--orbit-ink, rgb(24,26,28))' }}>
            {text ? `&quot;${text}&quot;` : '(없음)'}
          </strong>
        </div>
        <div>
          rects 개수:{' '}
          <strong style={{ color: 'var(--orbit-ink, rgb(24,26,28))' }}>{rects.length}</strong>
        </div>
      </div>
      <Readout label="text.length" value={text.length} />
      <Readout label="rects.length" value={rects.length} />
    </Panel>
  )
}
export const Selection: Story = { render: () => <SelectionDemo /> }

/* useClipboardPaste --------------------------------------- */
function ClipboardPasteDemo() {
  const { text, files } = useClipboardPaste()
  return (
    <Panel title="useClipboardPaste" signature="const { text, files } = useClipboardPaste()">
      <div
        style={{
          padding: 24,
          borderRadius: 10,
          border: '2px dashed var(--orbit-line-2, rgba(24,26,28,0.14))',
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          textAlign: 'center',
          fontSize: 14,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          marginBottom: 14,
        }}
      >
        {text ? (
          <span style={{ color: 'var(--orbit-ink, rgb(24,26,28))' }}>붙여넣기 감지됨</span>
        ) : (
          <span>이 영역에 포커스 후 Ctrl/⌘ + V 를 눌러 붙여넣기 하세요</span>
        )}
      </div>
      <Readout label="text" value={text || '(없음)'} />
      <Readout label="files.length" value={files.length} />
    </Panel>
  )
}
export const ClipboardPaste: Story = { render: () => <ClipboardPasteDemo /> }

/* useDrag ------------------------------------------------- */
function DragDemo() {
  const { isDragging, dragProps } = useDrag()
  return (
    <Panel title="useDrag" signature="const { isDragging, dragProps } = useDrag()">
      <div
        {...dragProps}
        style={{
          padding: '18px 24px',
          borderRadius: 10,
          background: isDragging
            ? 'rgba(37,99,235,0.12)'
            : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          border: isDragging
            ? '2px solid rgba(37,99,235,0.5)'
            : '2px dashed var(--orbit-line-2, rgba(24,26,28,0.14))',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 600,
          color: isDragging ? 'rgb(37,99,235)' : 'var(--orbit-ink, rgb(24,26,28))',
          cursor: 'grab',
          transition: 'background 160ms, border-color 160ms, color 160ms',
          marginBottom: 14,
          userSelect: 'none',
        }}
      >
        {isDragging ? '드래그 중…' : '이 박스를 드래그해 보세요'}
      </div>
      <Readout label="isDragging" value={String(isDragging)} />
    </Panel>
  )
}
export const Drag: Story = { render: () => <DragDemo /> }

/* useFullscreen ------------------------------------------ */
function FullscreenDemo() {
  const boxRef = useRef<HTMLDivElement>(null)
  const { isFullscreen, enter, exit, supported } = useFullscreen(boxRef)
  return (
    <Panel
      title="useFullscreen"
      signature="const { isFullscreen, enter, exit, supported } = useFullscreen(ref)"
    >
      <div
        ref={boxRef}
        style={{
          padding: 24,
          borderRadius: 10,
          background: isFullscreen
            ? 'rgb(24,26,28)'
            : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          marginBottom: 14,
          transition: 'background 200ms',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: isFullscreen
              ? 'rgba(255,255,255,0.7)'
              : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          }}
        >
          {isFullscreen ? '전체화면 모드입니다.' : '전체화면으로 전환해 보세요.'}
        </div>
        <button
          type="button"
          onClick={isFullscreen ? exit : enter}
          style={{
            height: 32,
            padding: '0 14px',
            border: 0,
            borderRadius: 7,
            background: 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13,
            cursor: supported ? 'pointer' : 'not-allowed',
            opacity: supported ? 1 : 0.4,
          }}
          disabled={!supported}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      </div>
      <Readout label="isFullscreen" value={String(isFullscreen)} />
      <Readout label="isSupported" value={String(supported)} />
    </Panel>
  )
}
export const Fullscreen: Story = { render: () => <FullscreenDemo /> }

/* usePointerLock ----------------------------------------- */
function PointerLockDemo() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { isLocked, lock, unlock, supported } = usePointerLock(targetRef)
  const [delta, setDelta] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isLocked) return
    const handleMove = (e: MouseEvent) => {
      setDelta((d) => ({ x: d.x + e.movementX, y: d.y + e.movementY }))
    }
    document.addEventListener('mousemove', handleMove)
    return () => document.removeEventListener('mousemove', handleMove)
  }, [isLocked])

  return (
    <Panel
      title="usePointerLock"
      signature="const { isLocked, lock, unlock, supported } = usePointerLock(ref)"
    >
      <div
        ref={targetRef}
        onClick={isLocked ? unlock : supported ? lock : undefined}
        style={{
          padding: '28px 0',
          borderRadius: 10,
          background: isLocked
            ? 'rgba(37,99,235,0.1)'
            : 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          border: isLocked
            ? '2px solid rgba(37,99,235,0.4)'
            : '1px dashed var(--orbit-line-2, rgba(24,26,28,0.14))',
          textAlign: 'center',
          fontSize: 13.5,
          fontWeight: 600,
          color: isLocked ? 'rgb(37,99,235)' : 'var(--orbit-ink, rgb(24,26,28))',
          cursor: supported ? 'pointer' : 'not-allowed',
          marginBottom: 14,
          transition: 'background 160ms, border-color 160ms, color 160ms',
        }}
      >
        {isLocked ? '잠금 중 — 클릭하면 해제' : '클릭하면 포인터 잠금'}
      </div>
      <Readout label="isLocked" value={String(isLocked)} />
      <Readout label="isSupported" value={String(supported)} />
      <Readout label="movement delta X" value={delta.x} />
      <Readout label="movement delta Y" value={delta.y} />
    </Panel>
  )
}
export const PointerLock: Story = { render: () => <PointerLockDemo /> }

/* useScrollTo -------------------------------------------- */
function ScrollToDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollTo } = useScrollTo()
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const items = Array.from({ length: 20 }, (_, i) => i)
  return (
    <Panel title="useScrollTo" signature="const { scrollTo } = useScrollTo()">
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => topRef.current && scrollTo(topRef.current)}
          style={{
            height: 32,
            padding: '0 14px',
            border: 0,
            borderRadius: 7,
            background: 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Scroll to top
        </button>
        <button
          type="button"
          onClick={() => bottomRef.current && scrollTo(bottomRef.current)}
          style={{
            height: 32,
            padding: '0 14px',
            border: 0,
            borderRadius: 7,
            background: 'rgb(24,26,28)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Scroll to bottom
        </button>
      </div>
      <div
        ref={containerRef}
        style={{
          height: 220,
          overflow: 'auto',
          borderRadius: 10,
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          padding: 8,
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
        }}
      >
        <div
          ref={topRef}
          style={{
            padding: '10px 12px',
            borderRadius: 7,
            background: 'rgba(37,99,235,0.1)',
            marginBottom: 6,
            fontSize: 12.5,
            fontWeight: 600,
            color: 'rgb(37,99,235)',
          }}
        >
          Top ↑
        </div>
        {items.map((i) => (
          <div
            key={i}
            style={{
              padding: '10px 12px',
              borderRadius: 7,
              marginBottom: 6,
              background: 'var(--orbit-surface, rgb(255,255,255))',
              border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
              fontSize: 13,
            }}
          >
            아이템 #{i}
          </div>
        ))}
        <div
          ref={bottomRef}
          style={{
            padding: '10px 12px',
            borderRadius: 7,
            background: 'rgba(37,99,235,0.1)',
            fontSize: 12.5,
            fontWeight: 600,
            color: 'rgb(37,99,235)',
          }}
        >
          Bottom ↓
        </div>
      </div>
    </Panel>
  )
}
export const ScrollTo: Story = { render: () => <ScrollToDemo /> }

/* useSearchParam ----------------------------------------- */
function SearchParamDemo() {
  const [q, setQ] = useSearchParam('q')
  const [inputValue, setInputValue] = useState('')
  return (
    <Panel title="useSearchParam" signature="const [value, setValue] = useSearchParam('q')">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어 입력"
          style={{
            flex: 1,
            height: 34,
            padding: '0 12px',
            borderRadius: 7,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            fontFamily: 'inherit',
            fontSize: 13.5,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => setQ(inputValue || null)}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 7,
            background: 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Set
        </button>
        <button
          type="button"
          onClick={() => {
            setQ(null)
            setInputValue('')
          }}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 7,
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            background: 'transparent',
            color: 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
      <Readout label="useSearchParam('q')" value={q ?? '(null)'} />
      <div
        style={{
          marginTop: 8,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
        }}
      >
        search: {typeof window !== 'undefined' ? window.location.search || '(empty)' : ''}
      </div>
    </Panel>
  )
}
export const SearchParam: Story = { render: () => <SearchParamDemo /> }

/* useShareAPI -------------------------------------------- */
function ShareAPIDemo() {
  const { isSupported, share } = useShareAPI()
  const [status, setStatus] = useState<string | null>(null)

  const handleShare = async () => {
    try {
      await share({ title: '훅 데모', text: 'Orbit UI hooks 데모 페이지입니다.' })
      setStatus('공유 성공')
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (e.name !== 'AbortError') setStatus(`오류: ${e.message}`)
      else setStatus('취소됨')
    }
  }

  return (
    <Panel title="useShareAPI" signature="const { isSupported, share } = useShareAPI()">
      <Readout label="isSupported" value={String(isSupported)} />
      {isSupported ? (
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={handleShare}
            style={{
              height: 34,
              padding: '0 16px',
              border: 0,
              borderRadius: 8,
              background: 'rgb(37,99,235)',
              color: 'rgb(255,255,255)',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: 13.5,
              cursor: 'pointer',
            }}
          >
            공유하기
          </button>
          {status && (
            <div
              style={{
                marginTop: 8,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
              }}
            >
              {status}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{ marginTop: 10, fontSize: 13, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}
        >
          이 브라우저는 Web Share API를 지원하지 않습니다.
        </div>
      )}
    </Panel>
  )
}
export const ShareAPI: Story = { render: () => <ShareAPIDemo /> }

/* useWakeLock -------------------------------------------- */
function WakeLockDemo() {
  const { isSupported, isActive, request, release, error } = useWakeLock()
  return (
    <Panel
      title="useWakeLock"
      signature="const { isSupported, isActive, request, release, error } = useWakeLock()"
    >
      <Readout label="isSupported" value={String(isSupported)} />
      <Readout label="isActive" value={String(isActive)} />
      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          onClick={isActive ? release : request}
          disabled={!isSupported}
          style={{
            height: 34,
            padding: '0 16px',
            border: 0,
            borderRadius: 8,
            background: isActive ? 'rgb(187,37,35)' : 'rgb(37,99,235)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: isSupported ? 'pointer' : 'not-allowed',
            opacity: isSupported ? 1 : 0.4,
          }}
        >
          {isActive ? '해제' : '화면 유지'}
        </button>
      </div>
      {error && (
        <div
          style={{
            marginTop: 8,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'rgb(187,37,35)',
          }}
        >
          오류: {error.message}
        </div>
      )}
    </Panel>
  )
}
export const WakeLock: Story = { render: () => <WakeLockDemo /> }

/* useReadingProgress ------------------------------------- */
function ReadingProgressDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useReadingProgress(containerRef)
  const items = Array.from({ length: 15 }, (_, i) => i)
  return (
    <Panel title="useReadingProgress" signature="const progress = useReadingProgress(containerRef)">
      <div
        style={{
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 3,
            width: `${progress}%`,
            background: 'var(--orbit-accent, rgb(37,99,235))',
            transition: 'width 60ms linear',
            zIndex: 1,
          }}
        />
        <div
          ref={containerRef}
          style={{
            height: 280,
            overflowY: 'auto',
            padding: 16,
            background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          }}
        >
          {items.map((i) => (
            <div
              key={i}
              style={{
                padding: 14,
                marginBottom: 8,
                borderRadius: 8,
                background: 'var(--orbit-surface, rgb(255,255,255))',
                border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
                fontSize: 13.5,
                lineHeight: 1.6,
              }}
            >
              섹션 {i + 1}. 스크롤을 내려 독서 진행률을 확인하세요.
            </div>
          ))}
        </div>
      </div>
      <Readout label="progress (%)" value={`${progress.toFixed(1)}%`} />
    </Panel>
  )
}
export const ReadingProgress: Story = { render: () => <ReadingProgressDemo /> }

/* useEyeDropper ------------------------------------------ */
function EyeDropperDemo() {
  const { isSupported, sRGBHex, open, error } = useEyeDropper()
  return (
    <Panel
      title="useEyeDropper"
      signature="const { isSupported, sRGBHex, open, error } = useEyeDropper()"
    >
      <Readout label="isSupported" value={String(isSupported)} />
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, marginBottom: 8 }}
      >
        {sRGBHex && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: sRGBHex,
              border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
              flexShrink: 0,
            }}
          />
        )}
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            color: 'var(--orbit-ink, rgb(24,26,28))',
          }}
        >
          {sRGBHex ?? '(색상 없음)'}
        </span>
      </div>
      <button
        type="button"
        onClick={open}
        disabled={!isSupported}
        style={{
          height: 34,
          padding: '0 16px',
          border: 0,
          borderRadius: 8,
          background: 'rgb(37,99,235)',
          color: 'rgb(255,255,255)',
          fontFamily: 'inherit',
          fontWeight: 600,
          fontSize: 13.5,
          cursor: isSupported ? 'pointer' : 'not-allowed',
          opacity: isSupported ? 1 : 0.4,
        }}
      >
        색상 선택 (Eye Dropper)
      </button>
      {!isSupported && (
        <div
          style={{ marginTop: 8, fontSize: 13, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}
        >
          이 브라우저는 EyeDropper API를 지원하지 않습니다.
        </div>
      )}
      {error && (
        <div
          style={{
            marginTop: 8,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'rgb(187,37,35)',
          }}
        >
          오류: {error.message}
        </div>
      )}
    </Panel>
  )
}
export const EyeDropper: Story = { render: () => <EyeDropperDemo /> }

/* useGamepad --------------------------------------------- */
function GamepadDemo() {
  const { isSupported, gamepads } = useGamepad()
  const connected = gamepads.filter(Boolean) as Gamepad[]
  return (
    <Panel title="useGamepad" signature="const { isSupported, gamepads } = useGamepad()">
      <Readout label="isSupported" value={String(isSupported)} />
      <Readout label="connected gamepads" value={connected.length} />
      {connected.length === 0 ? (
        <div
          style={{ marginTop: 10, fontSize: 13, color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))' }}
        >
          게임패드를 연결한 후 아무 버튼이나 눌러 보세요.
        </div>
      ) : (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {connected.map((gp) => (
            <div
              key={gp.index}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
                background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                lineHeight: 1.7,
              }}
            >
              <div>
                <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>id: </span>
                {gp.id}
              </div>
              <div>
                <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>buttons: </span>
                {gp.buttons.length}
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  )
}
export const Gamepad: Story = { render: () => <GamepadDemo /> }
