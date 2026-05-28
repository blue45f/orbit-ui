import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'

import { useIntersectionObserver, useResizeObserver } from '../index'

const meta = {
  title: 'Hooks/Observer',
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
      gridTemplateColumns: '140px 1fr',
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

/* useIntersectionObserver ---------------------------------- */
function IntersectionDemo() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const { isIntersecting, entry } = useIntersectionObserver(sentinelRef, {
    threshold: 0.5,
  })
  return (
    <Panel
      title="useIntersectionObserver"
      signature="const { isIntersecting } = useIntersectionObserver(ref, { threshold })"
    >
      <div
        style={{
          height: 200,
          overflow: 'auto',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          borderRadius: 10,
          padding: 16,
          marginBottom: 14,
          fontSize: 13,
          lineHeight: 1.6,
          color: 'var(--orbit-ink-2, rgba(24,26,28,0.78))',
        }}
      >
        <div style={{ marginBottom: 12 }}>스크롤을 아래로 내려 sentinel을 만나게 하세요.</div>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>line {i + 1}</div>
        ))}
        <div
          ref={sentinelRef}
          style={{
            marginTop: 30,
            padding: '14px 16px',
            borderRadius: 8,
            background: isIntersecting
              ? 'rgba(0, 132, 77, 0.12)'
              : 'rgba(24, 26, 28, 0.04)',
            color: isIntersecting ? 'rgb(0, 132, 77)' : 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12.5,
            transition: 'background-color 200ms cubic-bezier(0.2,0,0,1)',
          }}
        >
          {isIntersecting ? '✓ sentinel is visible' : '⏳ scroll to reveal sentinel'}
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>after {i + 1}</div>
        ))}
      </div>
      <Readout label="isIntersecting" value={String(isIntersecting)} />
      <Readout
        label="ratio"
        value={entry ? (entry.intersectionRatio * 100).toFixed(0) + '%' : '–'}
      />
    </Panel>
  )
}
export const Intersection: Story = { render: () => <IntersectionDemo /> }

/* useResizeObserver ---------------------------------------- */
function ResizeDemo() {
  const boxRef = useRef<HTMLDivElement>(null)
  const { size } = useResizeObserver(boxRef)
  const [width, setWidth] = useState(320)
  return (
    <Panel title="useResizeObserver" signature="const { size } = useResizeObserver(ref)">
      <div style={{ marginBottom: 14 }}>
        <input
          type="range"
          min={120}
          max={480}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'rgb(37, 99, 235)' }}
        />
      </div>
      <div
        ref={boxRef}
        style={{
          width: width,
          height: 80,
          borderRadius: 10,
          background: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid rgb(37, 99, 235)',
          color: 'rgb(37, 99, 235)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 14,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          transition: 'width 100ms linear',
        }}
      >
        {size ? `${Math.round(size.width)} × ${Math.round(size.height)}` : 'measuring…'}
      </div>
      <Readout label="width" value={size ? Math.round(size.width) + 'px' : '–'} />
      <Readout label="height" value={size ? Math.round(size.height) + 'px' : '–'} />
    </Panel>
  )
}
export const Resize: Story = { render: () => <ResizeDemo /> }
