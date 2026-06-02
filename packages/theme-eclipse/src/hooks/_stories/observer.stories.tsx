import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'

import {
  useElementSize,
  useInfiniteScroll,
  useIntersectionObserver,
  useMutationObserver,
  useResizeObserver,
  useInViewport,
} from '../index'

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
            background: isIntersecting ? 'rgba(0, 132, 77, 0.12)' : 'rgba(24, 26, 28, 0.04)',
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

/* useElementSize ------------------------------------------- */
function ElementSizeDemo() {
  const { ref, width, height } = useElementSize<HTMLTextAreaElement>()
  return (
    <Panel title="useElementSize" signature="const { ref, width, height } = useElementSize()">
      <textarea
        ref={ref}
        defaultValue="이 textarea를 크기 조절해 보세요..."
        rows={4}
        style={{
          width: '100%',
          padding: 12,
          borderRadius: 8,
          border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
          fontFamily: 'inherit',
          fontSize: 14,
          resize: 'both',
          marginBottom: 14,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          color: 'var(--orbit-ink-2, rgba(24,26,28,0.78))',
          lineHeight: 1.8,
        }}
      >
        width: <strong>{Math.round(width)}px</strong> &middot; height:{' '}
        <strong>{Math.round(height)}px</strong>
      </div>
    </Panel>
  )
}
export const ElementSize: Story = { render: () => <ElementSizeDemo /> }

/* useMutationObserver -------------------------------------- */
function MutationObserverDemo() {
  const [log, setLog] = useState<string[]>([])
  const [items, setItems] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    for (const m of mutations) {
      if (m.addedNodes.length)
        setLog((prev) => [...prev.slice(-4), `+${m.addedNodes.length}개 추가`])
      if (m.removedNodes.length)
        setLog((prev) => [...prev.slice(-4), `−${m.removedNodes.length}개 제거`])
    }
  })

  return (
    <Panel
      title="useMutationObserver"
      signature="useMutationObserver(ref, callback, { childList: true })"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => setItems((prev) => [...prev, `항목 ${prev.length + 1}`])}
          style={{
            height: 34,
            padding: '0 14px',
            border: 0,
            borderRadius: 8,
            background: 'rgb(0, 132, 77)',
            color: 'rgb(255,255,255)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
        >
          + 항목 추가
        </button>
        <button
          type="button"
          onClick={() => setItems((prev) => prev.slice(0, -1))}
          disabled={items.length === 0}
          style={{
            height: 34,
            padding: '0 14px',
            border: '1px solid var(--orbit-line-2, rgba(24,26,28,0.14))',
            borderRadius: 8,
            background: 'transparent',
            color:
              items.length === 0
                ? 'var(--orbit-ink-4, rgba(24,26,28,0.33))'
                : 'var(--orbit-ink, rgb(24,26,28))',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: items.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          − 마지막 제거
        </button>
      </div>
      <div
        ref={ref}
        style={{
          minHeight: 60,
          padding: 12,
          borderRadius: 8,
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          background: 'var(--orbit-surface-sunken, rgba(24,26,28,0.025))',
          fontSize: 13,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          marginBottom: 14,
        }}
      >
        {items.length === 0 ? (
          <span style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>
            (항목이 없습니다)
          </span>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '6px 10px',
                borderRadius: 6,
                background: 'var(--orbit-surface, rgb(255,255,255))',
                border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
              }}
            >
              {item}
            </div>
          ))
        )}
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11.5,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          lineHeight: 1.8,
        }}
      >
        <strong>Mutation log (최근 5건):</strong>
        {log.length === 0 ? (
          <div style={{ color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))' }}>(없음)</div>
        ) : (
          log.map((entry, i) => <div key={i}>{entry}</div>)
        )}
      </div>
    </Panel>
  )
}
export const MutationObserver: Story = { render: () => <MutationObserverDemo /> }

/* useInViewport -------------------------------------------- */
function InViewportDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isInViewport = useInViewport(sentinelRef, { threshold: 0.5 })

  return (
    <Panel title="useInViewport" signature="const isInViewport = useInViewport(ref, { threshold })">
      <div
        style={{
          fontSize: 12,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          marginBottom: 8,
        }}
      >
        컨테이너를 스크롤해 하단 sentinel 박스를 화면에 띄워 보세요.
      </div>
      <div
        ref={containerRef}
        style={{
          height: 300,
          overflow: 'auto',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          borderRadius: 10,
          padding: 16,
          marginBottom: 14,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
            }}
          >
            row {i + 1}
          </div>
        ))}
        <div
          ref={sentinelRef}
          style={{
            marginTop: 20,
            padding: '16px 20px',
            borderRadius: 8,
            background: isInViewport ? 'rgba(0, 132, 77, 0.12)' : 'rgba(24, 26, 28, 0.04)',
            border: isInViewport
              ? '1px solid rgba(0, 132, 77, 0.3)'
              : '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
            color: isInViewport ? 'rgb(0, 132, 77)' : 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12.5,
            fontWeight: 600,
            textAlign: 'center',
            transition: 'all 200ms cubic-bezier(0.2,0,0,1)',
          }}
        >
          {isInViewport ? '✓ sentinel is in viewport' : '⏳ sentinel is out of viewport'}
        </div>
      </div>
      <Readout label="isInViewport" value={String(isInViewport)} />
    </Panel>
  )
}
export const InViewport: Story = { render: () => <InViewportDemo /> }

/* useInfiniteScroll ---------------------------------------- */
const PAGE_SIZE = 10
const MAX_ITEMS = 50

function InfiniteScrollDemo() {
  const [items, setItems] = useState<number[]>(() =>
    Array.from({ length: PAGE_SIZE }, (_, i) => i + 1)
  )
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const hasMore = items.length < MAX_ITEMS

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setItems((prev) => {
        const next = Array.from(
          { length: Math.min(PAGE_SIZE, MAX_ITEMS - prev.length) },
          (_, i) => prev.length + i + 1
        )
        return [...prev, ...next]
      })
      setIsLoadingMore(false)
    }, 200)
  }

  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    onLoadMore: handleLoadMore,
    rootMargin: '40px',
  })

  return (
    <Panel
      title="useInfiniteScroll"
      signature="const { sentinelRef, isLoading } = useInfiniteScroll({ hasMore, onLoadMore })"
    >
      <div
        style={{
          fontSize: 12,
          color: 'var(--orbit-ink-3, rgba(24,26,28,0.56))',
          marginBottom: 8,
        }}
      >
        리스트 하단으로 스크롤하면 항목을 추가로 불러옵니다 (최대 {MAX_ITEMS}개).
      </div>
      <div
        style={{
          height: 300,
          overflow: 'auto',
          border: '1px solid var(--orbit-line, rgba(24,26,28,0.08))',
          borderRadius: 10,
          padding: '0 16px',
          marginBottom: 14,
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: '10px 0',
              borderBottom: '1px dashed var(--orbit-line, rgba(24,26,28,0.08))',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12.5,
              color: 'var(--orbit-ink, rgb(24,26,28))',
            }}
          >
            항목 #{item}
          </div>
        ))}
        <div
          ref={sentinelRef}
          style={{
            padding: '14px 0',
            textAlign: 'center',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: 'var(--orbit-ink-4, rgba(24,26,28,0.33))',
          }}
        >
          {isLoadingMore
            ? '불러오는 중…'
            : hasMore
              ? '스크롤해서 더 보기'
              : '모든 항목을 불러왔습니다'}
        </div>
      </div>
      <Readout label="items.length" value={items.length} />
      <Readout label="hasMore" value={String(hasMore)} />
      <Readout label="isLoadingMore" value={String(isLoadingMore)} />
    </Panel>
  )
}
export const InfiniteScroll: Story = { render: () => <InfiniteScrollDemo /> }
